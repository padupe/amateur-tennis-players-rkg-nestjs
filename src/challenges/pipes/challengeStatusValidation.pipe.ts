import { BadRequestException, PipeTransform } from '@nestjs/common'
import { ChallengeStatus } from '../interfaces/challengeStatus.enum'

export class ChallengeStatusValidationPipe implements PipeTransform {
    readonly statusAllowed = [
        ChallengeStatus.ACCEPTED,
        ChallengeStatus.DENIED,
        ChallengeStatus.CANCELED,
    ]

    transform(value: any) {
        const status = value.status.toUpperCase()

        if (!this.isAValidStatus(status)) {
            throw new BadRequestException(`${status} it's an invalid status.`)
        }

        return value
    }

    private isAValidStatus(status: any) {
        const index = this.statusAllowed.indexOf(status)
        // If the element is not found
        return index !== -1
    }
}
