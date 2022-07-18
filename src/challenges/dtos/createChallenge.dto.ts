import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsDateString,
    IsNotEmpty,
} from 'class-validator'
import { Player } from 'src/players/interfaces/player.interface'

export class CreateChallengeDTO {
    @IsNotEmpty()
    @IsDateString()
    dateHourChallenge: Date

    @IsNotEmpty()
    requester: Player

    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    players: Array<Player>
}
