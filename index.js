const express = require('express');
const app = express();
const taskController = require('./controllers/taskController');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', taskController);

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});