# Sistema de Gerenciamento de Tarefas

Este é um sistema de gerenciamento de tarefas simples que permite inserir e listar tarefas usando uma interface de linha de comando (CLI).

## Pré-requisitos

- Node.js instalado (v18 ou superior)
- Firebase Firestore configurado com as credenciais apropriadas (consulte a seção de Configuração)

## Instalação

1. Clone o repositório para o seu computador: https://github.com/iago1422/desafio.git


2. Navegue até o diretório do projeto: cd desafio-clinicorp


3. Instale as dependências:

> npm install


## Configuração

1. As credenciais do Firebase Firestore estão em `config/firebase-credentials.json`. Caso queira alterar, siga as instruções da documentação do firebase para obter as suas credenciais.

## Uso

### Inicializar Tarefas CLI
Para inicializar, você pode usar o seguinte comando:

> tmanager start

### Inserir Tarefas CLI

Para inserir tarefas, você pode usar o seguinte comando:

> tmanager insert --input "JSON ou Caminho do arquivo JSON"

Exemplo:

> tmanager insert --input '[{\"description\":\"Criar Login\",\"responsable\":\"bruno\",\"status\":\"done\"}, {\"description\":\"Criar Menu\",\"responsable\":\"bruno\",\"status\":\"doing\"}, {\"description\":\"Criar tela de perfil\",\"responsable\":\"bruno\",\"status\":\"todo\"}]'

> tmanager insert --input data/data.json    


### Listar Tarefas CLI

Para listar todas as tarefas, você pode usar o seguinte comando:

> tmanager show


### Para rodar a API express

Utilize o seguinte comando:

> node index.js

Ela retornará a porta que o servidor está escutando.


### CURLS:

POST - Task

> curl --location 'http://localhost:3000/tasks' \
> --header 'Content-Type: application/json' \
> --data '[
>    {
>        "description": "Criar Login",
>        "responsable": "bruno",
>        "status": "done"
>    },
>    {
>        "description": "Criar Menu",
>        "responsable": "bruno",
>        "status": "doing"
>    },
>    {
>        "description": "Criar tela de perfil",
>        "responsable": "bruno",
>        "status": "todo"
>    }
> ]'

GET - Task

> curl --location 'http://localhost:3000/tasks'



### Util

Caso ocorra problema com permissões ao tentar executar os comandos "tmanager", utiize o seguinte comando no cmd, no diretório raiz do projeto:

Permissões 

Para windows
> Set-ExecutionPolicy RemoteSigned

Para Mac
> chmod +x tmanager.js