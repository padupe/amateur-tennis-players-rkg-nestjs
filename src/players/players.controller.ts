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
import { Player } from './interfaces/player.interface'
import { PlayersService } from './players.service'
import { PlayersValidationParametersPipe } from './pipes/players-validation-parameters.pipe'

@Controller('api/v1/players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createPlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
        await this.playersService.createPlayer(createPlayerDTO)
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async updatePlayer(
        @Body() createPlayerDTO: CreatePlayerDTO,
        @Param('_id', PlayersValidationParametersPipe) _id: string
    ): Promise<void> {
        await this.playersService.updatePlayer(_id, createPlayerDTO)
    }

    @Get()
    async getAllPlayers(): Promise<Player[]> {
        return this.playersService.getAllPlayers()
    }

    @Get('/:_id')
    async getPlayerByID(
        @Param('_id', PlayersValidationParametersPipe) _id: string
    ): Promise<Player[] | Player> {
        return this.playersService.getPlayerById(_id)
    }

    @Delete('/:_id')
    async deletePlayer(
        @Param('_id', PlayersValidationParametersPipe) _id: string
    ): Promise<void> {
        this.playersService.deletePlayerByEmail(_id)
    }
}
