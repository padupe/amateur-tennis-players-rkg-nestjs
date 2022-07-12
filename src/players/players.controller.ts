import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import { CreatePlayerDTO } from './dtos/createPlayer.dto'
import { UpdatePlayerDTO } from './dtos/updatePlayer.dto'
import { Player } from './interfaces/player.interface'
import { PlayersService } from './players.service'
import { ValidationParametersPipe } from '../common/pipes/validation-parameters.pipe'

@Controller('api/v1/players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createPlayer(
        @Body() createPlayerDTO: CreatePlayerDTO
    ): Promise<Player> {
        return await this.playersService.createPlayer(createPlayerDTO)
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async updatePlayer(
        @Body() updatePlayerDTO: UpdatePlayerDTO,
        @Param('_id', ValidationParametersPipe) _id: string
    ): Promise<void> {
        await this.playersService.updatePlayer(_id, updatePlayerDTO)
    }

    @Get()
    async getAllPlayers(): Promise<Player[]> {
        return this.playersService.getAllPlayers()
    }

    @Get('/:_id')
    async getPlayerByID(
        @Param('_id', ValidationParametersPipe) _id: string
    ): Promise<Player[] | Player> {
        return await this.playersService.getPlayerByID(_id)
    }

    @Delete('/:_id')
    async deletePlayer(
        @Param('_id', ValidationParametersPipe) _id: string
    ): Promise<void> {
        await this.playersService.deletePlayerById(_id)
    }
}
