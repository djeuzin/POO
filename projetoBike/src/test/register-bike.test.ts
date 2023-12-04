import request from 'supertest'
import server from '../server'
import prisma from '../external/db'

describe('Register Bike route', () => {
  beforeEach(async() => {
    await prisma.bike.deleteMany({})
  })

  afterAll(async() => {
    await prisma.bike.deleteMany({})
  })

  it('registers a bike', async () => {
    await request(server)
      .post('/api/bikes')
      .send({
        name: 'Bike 1',
        type: 'Mountain',
        bodysize: 1.5,
        maxLoad: 100,
        rate: 10,
        description: 'A bike',
        ratings: 5,
        available: true,
        latitude: '0',
        longitude: '0'
      })
      .expect(201)
      .then( (res: { body: { id: any } }) => {
        expect(res.body.id).toBeDefined()
      })
  })
})