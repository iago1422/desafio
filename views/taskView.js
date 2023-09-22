//Função inicial do projeto
function displayMenu() {
    console.log('=== Task Manager CLI ===');
    console.log('Comandos:');
    console.log('tmanager insert "<JSON>" - Inserir tarefas a partir de uma string JSON');
    console.log('tmanager insert < caminho/do/arquivo.json - Inserir tarefas a partir de um arquivo JSON');
    console.log('tmanager show - Listar todas as tarefas');
}

// Função para exibir a lista de tarefas
async function displayTasks(tasksPromise) {
    try {
        const tasks = await tasksPromise;
        if (tasks.length === 0) {
            console.log('Nenhuma tarefa encontrada.');
        } else {
            console.log('Lista de Tarefas:');
            console.log('ID - Descrição - Responsável - Status - Computador');
            tasks.forEach((task) => {
                console.log(`${task.Id} - ${task.description} - ${task.responsable} - ${task.status} - ${task.computer}`);
            });
        }
    } catch (error) {
        console.error('Erro ao obter tarefas:', error);
    }
}

  
  module.exports = {
    displayTasks,
    displayMenu,
  };
  