import { ParameterDefinition } from '..'

class ParamStore {
    private params = new Array<ParameterDefinition>()

    public register = (param: ParameterDefinition) => {
        this.params.push(param)
    }

    public getParams = (args: Pick<ParameterDefinition, 'controller' | 'propertyKey'>) => {
        return this.params.filter((param) => {
            return param.controller === args.controller && param.propertyKey === args.propertyKey
        })
    }
}

export const paramStore = new ParamStore()

export default paramStore
