const request = require('supertest')
const app = require('../app')
const Category = require('../models/Category')
require('../models')

const URL_BASE = '/api/v1/products'
const URL_BASE_USER = '/api/v1/users/login'
let TOKEN
let product
let category
let productId

beforeAll(async () => {
    const user = {
        email:"maria.becerra@mail.com",
        password:"maria12345"
    }

    const res= await request(app)
    .post(URL_BASE_USER)
    .send(user) 

    TOKEN = res.body.token

    const categoryBody = {
        name: "Horror"
    }

    category = await Category.create(categoryBody)

    product = {
        title: "The Shining",
        description: "Jack Torrance's new job at the Overlook Hotel is the perfect chance for a fresh start. As the off-season caretaker at the atmospheric old hotel, he’ll have plenty of time to spend reconnecting with his family and working on his writing. But as the harsh winter weather sets in, the idyllic location feels ever more remote . . . and more sinister. And the only one to notice the strange and terrible forces gathering around the Overlook is Danny Torrance, a uniquely gifted five-year-old.",
        price: 14.90,
        categoryId: category.id
    }
});

test("POST -> 'URL_BASE', should resturn status code 201 and res.body.title = product.title", async () => {

    const res = await request(app)
        .post(URL_BASE)
        .send(product)
        .set("Authorization", `Bearer ${TOKEN}`)

    productId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)

});

test("GET -> 'URL_BASE', should resturn status code 200 and res.body.length === 1", async () => {
    const res = await request(app)
        .get(URL_BASE)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
});

test("GET ONE-> 'URL_BASE/:id', should resturn status code 200 and res.body.title = product.title", async () => {
    const res = await request(app)
        .get(`${URL_BASE}/${productId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
});

test("PUT -> 'URL_BASE/:id', should resturn status code 200 and res.body.title = product.title", async () => {

    const productUpdate = {
        title: "Shining"
    }

    const res = await request(app)
        .put(`${URL_BASE}/${productId}`)
        .send(productUpdate)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(productUpdate.title)
    await category.destroy()
});

test("DELETE -> 'URL_BASE/:id', should resturn status code 204", async () => {
    const res = await request(app)
        .delete(`${URL_BASE}/${productId}`)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)
    expect(res.body).toBeDefined()
});