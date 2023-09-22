const fs = require('fs');
const admin = require('firebase-admin');
const os = require('os');

// Caminho para o arquivo de credenciais no diretório "config"
const serviceAccount = require('../config/firebase-credentials.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
    projectId: serviceAccount.project_id, // Adicione esta linha para especificar o ID do projeto
});

let tasks = [];

// Função para adicionar uma nova tarefa (suporta ambas as opções)
function addTask(task) {
    tasks.push(task);
    // Verifica se o Firebase Firestore está configurado e usa-o para adicionar a tarefa
    if (admin.apps.length > 0) {
        const db = admin.firestore();
        db.collection('tasks').add(task)
            .then(() => {
                console.log('Tarefa adicionada com sucesso ao Firebase Firestore!');
            })
            .catch((error) => {
                console.error('Erro ao adicionar tarefa ao Firebase Firestore:', error);
            });
    }
}

// Função para listar todas as tarefas (suporta ambas as opções)
function getAllTasks() {
    // Verifica se o Firebase Firestore está configurado e usa-o para buscar as tarefas
    if (admin.apps.length > 0) {
        const db = admin.firestore();
        return db.collection('tasks').get()
            .then((snapshot) => {
                const tasks = [];
                snapshot.forEach((doc) => {
                    tasks.push(doc.data());
                });
                return tasks;
            })
            .catch((error) => {
                console.error('Erro ao buscar tarefas do Firebase Firestore:', error);
                return tasks; // Retorna as tarefas locais em caso de erro
            });
    } else {
        return tasks; // Retorna as tarefas locais se o Firebase Firestore não estiver configurado
    }
}

function readDataFromFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        tasks = JSON.parse(data);
    } catch (error) {
        console.error('Erro ao ler o arquivo JSON:', error);
    }
}
function getComputerName() {
    return os.hostname();
}

async function insertTasks(input) {
    try {
        let tasksToAdd = [];
        // Verifique se a entrada é um caminho de arquivo existente
        if (fs.existsSync(input)) {
            // Se for um arquivo, leia o conteúdo
            const fileData = fs.readFileSync(input, 'utf8');
            tasksToAdd = JSON.parse(fileData);
        } else {
            tasksToAdd = input;
        }

        if (Array.isArray(tasksToAdd)) {
            const firestore = admin.firestore();
            const batch = firestore.batch();

            // Obtenha uma referência para a coleção "tasks"
            const tasksCollection = firestore.collection('tasks');

            tasksToAdd.forEach((task) => {
                // Adicione a propriedade "computer" com o nome do computador
                task.computer = getComputerName();

                // Crie uma nova referência para um documento na coleção "tasks"
                const newTaskRef = tasksCollection.doc();

                // Defina a propriedade "Id" com o ID gerado pelo Firestore
                task.Id = newTaskRef.id;

                // Adicione a tarefa à operação em lote
                batch.set(newTaskRef, task);
            });

            // Execute a operação em lote para inserir as tarefas no Firestore
            await batch.commit();

            console.log('Tarefas inseridas com sucesso!');
        } else {
            console.error('Entrada inválida. Certifique-se de fornecer um array JSON de tarefas.');
        }
    } catch (error) {
        console.error('Erro ao inserir tarefas:', error);
    }
}

function isValidTask(tasks) {
    if (!Array.isArray(tasks)) {
      return false; // Não é uma lista de tarefas válida
    }
  
    // Verifique cada tarefa individualmente
    for (const task of tasks) {
      if (
        !task.hasOwnProperty('description') ||
        !task.hasOwnProperty('responsable') ||
        !task.hasOwnProperty('status')
      ) {
        return false; // Pelo menos uma tarefa não é válida
      }
    }
  
    // Todas as tarefas na lista são válidas
    return true;
  }

module.exports = {
    addTask,
    getAllTasks,
    readDataFromFile,
    insertTasks,
    getComputerName,
    isValidTask
};
