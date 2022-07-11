import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { CreatePlayerDTO } from './dtos/createPlayer.dto'
import { UpdatePlayerDTO } from './dtos/updatePlayer.dto'
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
        updatePlayerDTO: UpdatePlayerDTO
    ): Promise<void> {
        const findPlayer = await this.playerModel.findOne({ _id }).exec()

        if (!findPlayer) {
            throw new NotFoundException(`Player with id ${_id} not found!`)
        }

        await this.playerModel
            .findOneAndUpdate({ _id }, { $set: updatePlayerDTO })
            .exec()
    }

    async getAllPlayers(): Promise<Player[]> {
        return await this.playerModel.find().exec()
    }

    async getPlayerByID(_id: string): Promise<Player> {
        return await this.findPlayerById(_id)
    }

    async deletePlayerById(_id: string): Promise<any> {
        await this.findPlayerById(_id)

        return await this.playerModel.deleteOne({ _id })
    }

    private async findPlayerById(_id: string): Promise<Player> {
        const player = await this.playerModel.findOne({ _id }).exec()
        console.log(`ALORA: ${player}`)

        if (!player) {
            throw new NotFoundException(`Player with id "${_id}" not found.`)
        }

        return player
    }
}
