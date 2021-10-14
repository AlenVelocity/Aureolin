import { EventEmitter } from 'events'
import { AureolinEventEmitter } from './types'

/**
 * EventEmitter for Aureolin
 * @class
 * @extends EventEmitter
 * @implements AureolinEventEmitter
 */
const Emitter = EventEmitter as unknown as new () => AureolinEventEmitter

export default Emitter
