const request = require('supertest')
const app = require('../app')
require('../models')

const URL_BASE = '/api/v1/users'
let TOKEN

beforeAll( async () => {
    const user = {
        email:"maria.becerra@mail.com",
        password:"maria12345"
    }

    const res = await request(app)
        .post(`${URL_BASE}/login`)
        .send(user)

        TOKEN = res.body.token
})

test("GET -> 'baseUrl', should return send status 200, res.body id defined, res.body.firstName === user.name and res.body.length === 1",
    async () => {
        const res = await request(app)
        .get(URL_BASE)
        .set('Authorization', `Bearer ${TOKEN}`)

        console.log(res.body);

        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)
    });