import swaggerAutogen from "swagger-autogen"

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'localhost:3001',
  schemes: ['http'],
};

const outputFile = './swagger_output.json'
const endpointsFiles = ['./index.ts']

swaggerAutogen(outputFile, endpointsFiles, doc)