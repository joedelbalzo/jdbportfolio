const express = require('express')
const app = express()
const path = require('path')


// static middleware
app.use('/dist', express.static(path.join(__dirname, '../dist')))
app.use('/public', express.static(path.join(__dirname,'../public')))
app.use(express.json())

app.get('/', (req, res)=>res.sendFile(path.join(__dirname, '../public/index.html')))

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(500).send({ error: err.message });
});


const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));
