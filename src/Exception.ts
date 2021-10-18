export class Exception extends Error {
    constructor(public message = 'Internal Server Error', private _status = 500) {
        super(message)
    }

    get status() {
        return this._status
    }

    set status(status) {
        this._status = status
    }
}
