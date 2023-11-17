import {IsString} from "class-validator";

export class LoginValidations{
    @IsString({ message: 'wallet should be defined' })
    public wallet: string
}
