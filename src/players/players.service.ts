import { Injectable, Logger, NotFoundException } from '@nestjs/common'
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

    async createUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {
        const { email } = createPlayerDTO

        const findPlayer = await this.playerModel.findOne({ email }).exec()

        if (findPlayer) {
            this.update(createPlayerDTO)
        } else {
            this.create(createPlayerDTO)
        }
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
        return await this.playerModel.remove({ email }).exec()
    }

    private async create(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
        const { name, email, phoneNumber } = createPlayerDTO

        const playerCreated = new this.playerModel(createPlayerDTO)
        return await playerCreated.save()
    }

    private async update(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
        return await this.playerModel
            .findOneAndUpdate(
                { email: createPlayerDTO.email },
                { $set: createPlayerDTO }
            )
            .exec()
    }
}
