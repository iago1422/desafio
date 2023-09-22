#!/usr/bin/env node
const yargs = require('yargs');
const taskModel = require('./models/taskModel'); // Importe a classe TaskModel
const taskView = require('./views/taskView');

taskView.displayMenu();

// Configuração do Yargs para interpretar comandos da linha de comando
yargs.command({
  command: 'insert',
  describe: 'Inserir tarefas',
  builder: {
    input: {
      describe: 'Caminho do arquivo JSON ou JSON como string',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    const input = JSON.parse(argv.input);
    taskModel.insertTasks(input); // Chame o método na instância da classe TaskModel
  },
});

yargs.command({
  command: 'show',
  describe: 'Mostrar todas as tarefas',
  handler: async () => {
    const tasks = await taskModel.getAllTasks(); // Chame o método na instância da classe TaskModel
    taskView.displayTasks(tasks);
  },
});

// Parse dos comandos Yargs
yargs.argv;
