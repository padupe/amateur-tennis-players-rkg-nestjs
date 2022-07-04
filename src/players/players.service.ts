import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { CreatePlayerDTO } from './dtos/createPlayer.dto'
import { Player } from './interfaces/player.interface'
import { v4 as uuidv4 } from 'uuid'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class PlayersService {
    constructor(
        @InjectModel('Player') private readonly playerModel: Model<Player>
    ) {}

    async createPlayer(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
        const { email } = createPlayerDTO

        const findPlayer = await this.playerModel.findOne({ email }).exec()

        if (findPlayer) {
            throw new BadRequestException(
                `Player already exists with email ${email}.`
            )
        }

        const playerCreated = new this.playerModel(createPlayerDTO)
        return await playerCreated.save()
    }

    async updatePlayer(
        _id: string,
        createPlayerDTO: CreatePlayerDTO
    ): Promise<void> {
        const findPlayer = await this.playerModel.findOne({ _id }).exec()

        if (!findPlayer) {
            throw new NotFoundException(`Player with id ${_id} not found!`)
        }

        await this.playerModel
            .findOneAndUpdate({ _id }, { $set: createPlayerDTO })
            .exec()
    }

    async getAllPlayers(): Promise<Player[]> {
        return await this.playerModel.find().exec()
    }

    async getPlayerByEmail(email): Promise<Player> {
        const findPlayerByEmail = this.playerModel.findOne({ email }).exec()

        if (!findPlayerByEmail) {
            throw new NotFoundException(
                `Player with e-mail adress "${email}" not found.`
            )
        }

        return findPlayerByEmail
    }

    async deletePlayerByEmail(email): Promise<any> {
        return await this.playerModel.deleteOne({ email }).exec()
    }
}
