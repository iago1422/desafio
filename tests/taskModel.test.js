// taskModel.test.js
const taskModel = require('../models/taskModel');

test('Deve validar campos obrigatórios', () => {
  const task = {
    // Campos ausentes
  };

  const result = taskModel.isValidTask(task);

  expect(result).toBe(false);
});

test('Deve validar descrição', () => {
  const task = {
    description: '', // Descrição vazia
    responsable: 'Test User',
    status: 'todo',
  };

  const result = taskModel.isValidTask(task);

  expect(result).toBe(false);
});

test('Deve validar responsável', () => {
  const task = {
    description: 'Test Task',
    responsable: '', // Responsável vazio
    status: 'todo',
  };

  const result = taskModel.isValidTask(task);

  expect(result).toBe(false);
});

test('Deve validar status', () => {
  const task = {
    description: 'Test Task',
    responsable: 'Test User',
    status: 'invalido', // Status inválido
  };

  const result = taskModel.isValidTask(task);

  expect(result).toBe(false);
});

test('Deve aceitar tarefa válida', () => {
  const task = [{
    description: 'Test Task',
    responsable: 'Test User',
    status: 'todo',
  }];

  const result = taskModel.isValidTask(task);

  expect(result).toBe(true);
});


test('Deve adicionar tarefa de arquivo deve aumentar a lista de tarefas em 3 unidades', async () => {
  // Passo 1: Obter o número inicial de tarefas
  const initialTasks = await taskModel.getAllTasks();
  const initialTaskCount = initialTasks.length;

  // Passo 2: Inserir as tarefas do arquivo usando insertTasks
  await taskModel.insertTasks("data/data.json");

  // Passo 3: Obter a lista de tarefas novamente após a inserção
  const updatedTasks = await taskModel.getAllTasks();
  const updatedTaskCount = updatedTasks.length;

  // Verificar se o número de tarefas aumentou em uma unidade
  expect(updatedTaskCount).toBe(initialTaskCount + 3);
});

test('Deve adicionar tarefa deve aumentar a lista de tarefas em 1 unidade', async () => {
    // Passo 1: Obter o número inicial de tarefas
    const initialTasks = await taskModel.getAllTasks();
    const initialTaskCount = initialTasks.length;
  
    // Passo 2: Inserir uma nova tarefa usando insertTasks
    const newTask = [{
      description: 'Nova Tarefa',
      responsable: 'Novo Usuário',
      status: 'todo',
    }];
    await taskModel.insertTasks(newTask);
  
    // Passo 3: Obter a lista de tarefas após a inserção
    const updatedTasks = await taskModel.getAllTasks();
    const updatedTaskCount = updatedTasks.length;
  
    // Verificar se o número de tarefas aumentou em uma unidade
    expect(updatedTaskCount).toBe(initialTaskCount + 1);
  
    // Verificar se a nova tarefa está na lista
    expect(updatedTasks).toContainEqual(newTask[0]);
  });
  