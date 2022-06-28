import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { CreatePlayerDTO } from './dtos/createPlayer.dto'
import { Player } from './interfaces/player.interface'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class PlayersService {
    private players: Player[] = []

    private readonly logger = new Logger(PlayersService.name)

    async createUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {
        const { email } = createPlayerDTO
        const findPlayer = this.players.find((player) => player.email === email)

        if (findPlayer) {
            this.update(findPlayer, createPlayerDTO)
        } else {
            this.create(createPlayerDTO)
        }
    }

    async getAllPlayers(): Promise<Player[]> {
        return this.players
    }

    async getPlayerByEmail(email: string): Promise<Player> {
        const findPlayerByEmail = await this.players.find(
            (player) => player.email === email
        )

        if (!findPlayerByEmail) {
            throw new NotFoundException(
                `Player with e-mail adress "${email}" not found.`
            )
        }

        return findPlayerByEmail
    }

    private create(createPlayerDTO: CreatePlayerDTO): void {
        const { name, email, phoneNumber } = createPlayerDTO

        const player: Player = {
            _id: uuidv4(),
            name,
            email,
            phoneNumber,
            ranking: 'A',
            positionRanking: 1,
            urlAvatarPlayer: 'http://www.google.com/image1',
        }
        this.logger.log(`createPlayerDTO: ${JSON.stringify(player)}`)
        this.players.push(player)
    }

    private update(findPlayer: Player, createPlayerDTO: CreatePlayerDTO): void {
        const { name } = createPlayerDTO

        findPlayer.name = name
    }
}
