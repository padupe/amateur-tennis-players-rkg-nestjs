import {
    Body,
    Controller,
    Get,
    Logger,
    Param,
    Post,
    Query,
    Put,
    UsePipes,
    ValidationPipe,
    Delete,
} from '@nestjs/common'
import { ChallengesService } from './challenges.service'
import { AssignChallengeToMatchDTO } from './dtos/assignChallengeToMatch.dto'
import { CreateChallengeDTO } from './dtos/createChallenge.dto'
import { UpdateChallengeDTO } from './dtos/updateChallenge.dto'
import { Challenge } from './interfaces/challenge.interface'
import { ChallengeStatusValidationPipe } from './pipes/challengeStatusValidation.pipe'

@Controller('api/v1/challenges')
export class ChallengesController {
    constructor(private readonly challengesService: ChallengesService) {}

    private readonly logger = new Logger(ChallengesController.name)

    @Post()
    @UsePipes(ValidationPipe)
    async createChallenge(
        @Body() createChallengeDTO: CreateChallengeDTO
    ): Promise<Challenge> {
        this.logger.log(
            `createChallengeDTO: ${JSON.stringify(createChallengeDTO)}.`
        )
        return await this.challengesService.createChallenge(createChallengeDTO)
    }

    @Get()
    async getChallenges(@Query('idPlayer') _id: string): Promise<Challenge[]> {
        /*
            If a query parameter is passed, the endpoint will display a player's challenges,
            otherwise it will display all challenges

            Example:
            With Query Parameter: http://localhost:8080/api/v1/challenges?idPlayer=62cc32646a1471176b2e43dc
        */
        return _id
            ? await this.challengesService.getChallengesByPlayer(_id)
            : await this.challengesService.getAllChallenges()
    }

    @Put('/:challenge')
    async updateChallenge(
        @Body(ChallengeStatusValidationPipe)
        updateChallengeDTO: UpdateChallengeDTO,
        @Param('challenge') _id: string
    ): Promise<void> {
        await this.challengesService.updateChallengeById(
            _id,
            updateChallengeDTO
        )
    }

    @Post('/:challenge/match')
    async assignChallengeToMatch(
        @Body(ValidationPipe)
        assigndChallengeToMatchDTO: AssignChallengeToMatchDTO,
        @Param('challenge') _id: string
    ): Promise<void> {
        return await this.challengesService.assignChallengeToMatch(
            _id,
            assigndChallengeToMatchDTO
        )
    }

    @Delete('/:_id')
    async deleteChallenge(@Param('_id') _id: string): Promise<void> {
        await this.challengesService.deleteChallengeById(_id)
    }
}
