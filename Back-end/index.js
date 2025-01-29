import router from './routes/routes.js';
import express from 'express';
import cors from "cors";
const app = express()
const port = 3000;
app.use(express.json());
app.use(cors())
app.use('/',router)

app.listen(port, () => {
  console.log(`Example app listening on port https://localhost:${port}`)
})