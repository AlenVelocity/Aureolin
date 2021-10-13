import { strict as assert } from 'assert'
import axios from 'axios'

describe('Aureolin', () => {
    // start example
    it('should be able to create a new Aureolin instance', async () => {
        assert.ok(await (await import('./App')).start())
    })

    it('should fetch', async () => {
        const response = await axios.get('http://localhost:3000')
        assert.equal(response.status, 200)
        assert.equal(response.data, 'Welcome to Aureolin!')
    })

    it('should fetch name and age', async () => {
        const response = await axios.get('http://localhost:3000/hello/Aureolin/1')
        assert.equal(response.status, 200)
        assert.equal(response.data, "Hello Aureolin, You're Probably 1 years old!")
    })
})
