import app from './App'
import { createConnection } from 'typeorm'

const port = process.env.PORT || 8080

app.listen(port, async (err) => {
  const connection = await createConnection()

  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})
