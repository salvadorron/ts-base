import { v4 as uuidv4 } from 'uuid';

export class Credentials {
    public wallet: string
    public message:string
    public status: boolean

    constructor(wallet: string) {
        this.wallet = wallet
        this.message = this.generateMessage()
        this.status = true
    }

    private generateMessage(): string {
        return uuidv4()
    }
}
