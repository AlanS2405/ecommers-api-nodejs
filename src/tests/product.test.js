const request = require('supertest')
const app = require('../app')
require('../models')

const URL_BASE = '/api/v1/products'
const URL_BASE_USER = '/api/v1/login'
let TOKEN

beforeAll(async () => {
    const user = {
        email:"maria.becerra@mail.com",
        password:"maria12345"
    }

    const res= await request(app)
    .post(URL_BASE_USER)
    .send(user) 

    TOKEN = res.body.token
})

test("POST -> 'URL_BASE',  ")