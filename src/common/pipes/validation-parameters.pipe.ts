import {
    ArgumentMetadata,
    BadRequestException,
    PipeTransform,
} from '@nestjs/common'

export class ValidationParametersPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (!value) {
            throw new BadRequestException(
                `The parameter value ${metadata.data} must be informed.`
            )
        }

        return value
    }
}
