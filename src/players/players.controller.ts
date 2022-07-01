import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import { CreatePlayerDTO } from './dtos/createPlayer.dto'
import { Player } from './interfaces/player.interface'
import { PlayersService } from './players.service'

@Controller('api/v1/players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createUpdatePlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
        await this.playersService.createUpdatePlayer(createPlayerDTO)
    }

    @Get()
    async getPlayers(
        @Query('email') email: string
    ): Promise<Player[] | Player> {
        if (email) {
            return this.playersService.getPlayerByEmail(email)
        } else {
            return this.playersService.getAllPlayers()
        }
    }

    @Delete()
    async deletePlayer(@Query('email') email: string): Promise<void> {
        this.playersService.deletePlayerByEmail(email)
    }
}
