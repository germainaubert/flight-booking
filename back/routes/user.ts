import express from 'express'
export const user = express()

user.post('/', (req, res) => {
  res.send('Hello World!')
})