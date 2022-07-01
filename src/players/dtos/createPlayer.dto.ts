import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreatePlayerDTO {
    @IsNotEmpty()
    readonly name: string

    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    readonly phoneNumber: string
}
