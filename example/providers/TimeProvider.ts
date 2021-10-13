import { Provider } from '../../src'

@Provider('time')
export default class TimeProvider {
    constructor() {}

    public get = (): string => {
        return new Date().toLocaleTimeString()
    }
}
