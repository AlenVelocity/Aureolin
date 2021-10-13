import { Provider } from '../../src'

@Provider('package')
export default class Package {
    constructor() {}

    public get = async () => {
        return import('../../package.json')
    }
}
