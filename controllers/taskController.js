const express = require('express');
const taskModel = require('../models/taskModel');
const router = express.Router();


// Rota para inserir uma nova tarefa
router.post('/tasks', async (req, res) => {
  try {
    var taskData = req.body;
    // Verifica se o corpo da solicitação é um objeto válido de tarefa
    if (!taskModel.isValidTask(taskData)) {
      res.status(400).send('O corpo da solicitação não é uma tarefa válida.');
      return;
    }

    await taskModel.insertTasks(taskData);
    res.status(201).send('Tarefa adicionada com sucesso!');
  } catch (error) {
    console.error('Erro ao adicionar tarefa:', error);
    res.status(500).send('Erro interno ao adicionar tarefa.');
  }
});

// Rota para listar todas as tarefas
router.get('/tasks', async (req, res) => {
    try {
      const tasks = await taskModel.getAllTasks();
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      res.status(500).send('Erro interno ao buscar tarefas.');
    }
  });
  

module.exports = router;