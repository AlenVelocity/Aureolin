import { Provider } from 'aureolin'

@Provider('time')
export default class TimeProvider {

    public get = (): string => {
        return new Date().toLocaleTimeString()
    }
}
