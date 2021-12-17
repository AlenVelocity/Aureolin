import { Provider } from 'aureolin'

@Provider('package')
export default class PackageProvider {

    public get = async () => {
        return require('../../package.json')
    }
}
