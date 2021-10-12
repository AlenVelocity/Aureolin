import { EventEmitter } from 'events'
import { AureolinEventEmitter } from './types'

const Emitter = EventEmitter as unknown as new () => AureolinEventEmitter

export default Emitter
