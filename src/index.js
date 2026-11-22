import express from 'express';

const PORT = process.env.PORT || 3000
const app = express();


app.use((req, res, next) => {
   console.log(req.method, req.url)
   next()
});


app.use(express.json())


app.use(express.static('public'))



app.post('/about', (req,res) => {
    res.status(201);
    res.json(req.body);

});

app.get('/her', (req,res) => {
    res.json({
        "name":"elisse"
    })
});



app.use((req, res) => {
  res.status(404);
  res.send('404: Page or subdirectory not found');
});

app.listen(PORT, () => {
    console.log("Listening to port " + PORT)
})

