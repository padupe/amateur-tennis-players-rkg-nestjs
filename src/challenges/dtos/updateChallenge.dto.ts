import { IsDate, IsOptional } from 'class-validator'
import { ChallengeStatus } from '../interfaces/challengeStatus.enum'

export class UpdateChallengeDTO {
    @IsOptional()
    @IsDate()
    dateHourChallenge: Date

    @IsOptional()
    status: ChallengeStatus
}
