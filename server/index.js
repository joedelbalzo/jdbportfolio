const port = process.env.PORT || 3000;
const app = require('./app');

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(500).send({ error: err.message });
});


app.listen(port, ()=> console.log(`listening on port ${port}`));

// app.listen(port, async()=> {
//   console.log(`listening on port ${port}`)
//   try{
//     await seed()
//     console.log('seeded');
//   }
//   catch{
//     console.log('oooh you should seed something')
//   }
// });
