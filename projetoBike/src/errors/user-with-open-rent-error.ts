export class UserWithOpenRent extends Error {
    public readonly name = 'UserWithOpenRent'

    constructor() {
        super('User has a rent open.')
    }
}