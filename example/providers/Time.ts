import { Provider } from '../../src'

@Provider('time')
export default class Time {
    constructor() {}

    public get = (): string => {
        return new Date().toLocaleTimeString()
    }
}
