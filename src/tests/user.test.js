const request = require('supertest')
const app = require('../app')
require('../models')

const URL_BASE = '/api/v1/users'
let TOKEN
let userId

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

test("GET -> 'URL_BASE', should return send status 200, res.body id defined, res.body.firstName === user.name and res.body.length === 1",
    async () => {
        const res = await request(app)
        .get(URL_BASE)
        .set('Authorization', `Bearer ${TOKEN}`)

        console.log(res.body);

        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)
    });

test("POST -> 'URL_BASE', should return send status 201, res.body is defined and res.body.firstName === user.firstName", async () => {

    const user = {
        firstName:"Alan",
        lastName:"Solis",
        email:"alan.solis@mail.com",
        password:"alan12345",
        phone:"+5491123456789"
    }

    const res = await request(app)
    .post(URL_BASE)
    .send(user)

    userId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)
});

test("PUT -> 'URL_BASE/:id', should return status 200, res.body is defined and res.body.firstName === user.firstName", async () => {
    const user = {
        firstName:"Alan Dario",
    }

    const res = await request(app)
    .put(`${URL_BASE}/${userId}`)
    .send(user)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)
})