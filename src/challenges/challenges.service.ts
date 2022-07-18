import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CategoriesService } from 'src/categories/categories.service'
import { PlayersService } from 'src/players/players.service'
import { AssignChallengeToMatchDTO } from './dtos/assignChallengeToMatch.dto'
import { CreateChallengeDTO } from './dtos/createChallenge.dto'
import { UpdateChallengeDTO } from './dtos/updateChallenge.dto'
import { Challenge, Match } from './interfaces/challenge.interface'
import { ChallengeStatus } from './interfaces/challengeStatus.enum'

@Injectable()
export class ChallengesService {
    constructor(
        @InjectModel('Match') private readonly matchModel: Model<Match>,
        @InjectModel('Challenge')
        private readonly challengeModel: Model<Challenge>,
        private readonly playersService: PlayersService,
        private readonly categoriesService: CategoriesService
    ) {}

    private readonly logger = new Logger(ChallengesService.name)

    async createChallenge(
        createChallengeDTO: CreateChallengeDTO
    ): Promise<Challenge> {
        const players = await this.playersService.getAllPlayers()

        // Check if the informed players are registered
        createChallengeDTO.players.map((playerDTO) => {
            const playerFilter = players.filter(
                (player) => player._id == playerDTO._id
            )

            if (playerFilter.length == 0) {
                throw new BadRequestException(
                    `The given id ${playerDTO._id} does not belong to a player.`
                )
            }
        })

        // Check if the Requeester is one of the players in the match
        const requesterIsPlayerOfTheMatch =
            await createChallengeDTO.players.filter(
                (player) => player._id == createChallengeDTO.requester
            )

        this.logger.log(
            `requesterIsPlayerOfTheMatch: ${requesterIsPlayerOfTheMatch}.`
        )

        if (requesterIsPlayerOfTheMatch.length == 0) {
            throw new BadRequestException(
                `The requester must be one of the players in the match.`
            )
        }

        // We retrieved the category based on the requesting player ID
        const validateCategoryRequester =
            await this.categoriesService.seePlayerCategory(
                createChallengeDTO.requester
            )

        // The applicant must belong to a category
        if (!validateCategoryRequester) {
            throw new BadRequestException(
                `The applicant must be registered in a category.`
            )
        }

        const challengeCreated = new this.challengeModel(createChallengeDTO)
        challengeCreated.category = validateCategoryRequester.category
        challengeCreated.dateHourSolicitation = new Date()

        this.logger.log(
            `Date and hour challenge created: ${challengeCreated.dateHourChallenge}.`
        )

        // When a challenge is created, we set the challenge status to pending
        challengeCreated.status = ChallengeStatus.PENDING

        this.logger.log(
            `Challenge created: ${JSON.stringify(challengeCreated)}.`
        )

        return await challengeCreated.save()
    }

    async getAllChallenges(): Promise<Array<Challenge>> {
        return await this.challengeModel
            .find()
            .populate('requester')
            .populate('players')
            .populate('match')
            .exec()
    }

    async getChallengesByPlayer(_id: any): Promise<Array<Challenge>> {
        const players = await this.playersService.getAllPlayers()

        const playerFilter = players.filter((player) => player._id == _id)

        if (playerFilter.length == 0) {
            throw new BadRequestException(
                `The id ${_id} does not belong to a player`
            )
        }

        return await this.challengeModel
            .find()
            .where('players')
            .in(_id)
            .populate('requester')
            .populate('players')
            .populate('match')
            .exec()
    }

    async updateChallengeById(
        _id: string,
        updateChallengeDTO: UpdateChallengeDTO
    ): Promise<void> {
        const findChallenge = await this.getChallengeById(_id)

        if (updateChallengeDTO === undefined) {
            throw new BadRequestException(`No Body`)
        }

        if (updateChallengeDTO.status) {
            findChallenge.dateHourResponse = new Date()
        }

        findChallenge.status = updateChallengeDTO.status
        findChallenge.dateHourChallenge = updateChallengeDTO.dateHourChallenge

        console.log(`CHALLENGE 2: ${findChallenge}`)

        await this.challengeModel
            .findOneAndUpdate({ _id }, { $set: findChallenge })
            .exec()
    }

    async assignChallengeToMatch(
        _id: string,
        assignChallengeToMatchDTO: AssignChallengeToMatchDTO
    ): Promise<void> {
        const findChallenge = await this.getChallengeById(_id)

        const playerFilter = findChallenge.players.filter(
            (player) => player._id == assignChallengeToMatchDTO.def
        )

        this.logger.log(`Challenge: ${findChallenge}.`)
        this.logger.log(`Player: ${playerFilter}.`)

        if (playerFilter.length == 0) {
            throw new BadRequestException(
                'The winning player is not part of the challenge!'
            )
        }

        // Create object MATCH -> matchCreated
        const matchCreated = new this.matchModel(assignChallengeToMatchDTO)

        // Assign to object MATCH the category and players
        matchCreated.category = findChallenge.category
        matchCreated.players = findChallenge.players

        const result = await matchCreated.save()

        // When a match is registered by a user, we will change the challenge status do ACCOMPLISHED
        findChallenge.status = ChallengeStatus.ACCOMPLISHED

        // Assign Id of Match to Challenge
        findChallenge.match = result._id

        try {
            await this.challengeModel
                .findOneAndUpdate({ _id }, { $set: findChallenge })
                .exec()
        } catch (error) {
            // If the Challenge update fails, we delete the match previously recorded
            await this.matchModel.deleteOne({ _id: result._id }).exec()
            throw new InternalServerErrorException()
        }
    }

    async deleteChallengeById(_id: string): Promise<void> {
        const findChallenge = await this.getChallengeById(_id)

        // We will delete the Challenge, changing its status to CANCELED
        findChallenge.status = ChallengeStatus.CANCELED

        await this.challengeModel
            .findOneAndUpdate({ _id }, { $set: findChallenge })
            .exec()
    }

    private async getChallengeById(_id: string): Promise<Challenge> {
        const challenge = await this.challengeModel.findById(_id).exec()

        if (!challenge) {
            throw new BadRequestException(`Challenge with id ${_id} not found!`)
        }

        return challenge
    }
}
