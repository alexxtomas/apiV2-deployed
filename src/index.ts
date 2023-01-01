import * as dotenv from 'dotenv'
import app from './server/app.js'
dotenv.config()

app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`)
})
