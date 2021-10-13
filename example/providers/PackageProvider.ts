import { Provider } from '../../src'

@Provider('package')
export default class PackageProvider {
    constructor() {}

    public get = async () => {
        return import('../../package.json')
    }
}
