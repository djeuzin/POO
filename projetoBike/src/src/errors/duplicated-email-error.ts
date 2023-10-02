export class DuplicatedEmailError extends Error {
    public readonly name = 'DuplicatedEmailError'

    constructor () {
        super('Email already in use.')
    }
}