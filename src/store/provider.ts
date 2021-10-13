import { IInject, IProvider } from '..'

class ProviderStore {
    private readonly providers = new Map<string, IProvider>()

    private readonly inject = new Array<IInject>()

    public registerProvider = (provider: IProvider) => {
        if (this.providers.has(provider.provide)) throw new Error(`Provider ${provider.provide} already registered`)
        this.providers.set(provider.provide, new provider.target() as IProvider)
    }

    public getProvider = (provide: string): IProvider => {
        if (!this.providers.has(provide)) throw new Error(`Provider ${provide} not registered`)
        return this.providers.get(provide) as IProvider
    }

    public registerInject = (inject: IInject) => {
        this.inject.push(inject)
    }

    public getInject = (controller: string): IInject[] => {
        return this.inject.filter((i) => i.controller === controller)
    }
}

const providerStore = new ProviderStore()

export default providerStore
