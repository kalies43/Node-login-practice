import express from 'express';
import path from 'path';

const PORT = process.env.PORT
const app = express();

app.use(express.static('public'))

app.listen(PORT, () => {
    console.log("Listening to port " + PORT)
})