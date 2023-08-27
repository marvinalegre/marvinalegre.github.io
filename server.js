const express = require('express')

const app = express()

app.use('/public', express.static(process.cwd() + '/docs/public'))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/docs/index.html')
})

app.use((req, res) => {
  res.sendFile(process.cwd() + '/docs/404.html')
})

app.listen(3000, () => {
  console.log('Now listening at 3000...')
})