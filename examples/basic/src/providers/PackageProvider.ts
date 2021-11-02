import { Provider } from 'aureolin'

@Provider('package')
export default class PackageProvider {
    constructor() {}

    public get = async () => {
        return require('../../package.json')
    }
}
