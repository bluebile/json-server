# JSON Server MBA

Bem-vindo ao *JSON Server 1.0 MBA* Release!

## INSTALAÇÃO

Para instalação do JSON Server em um servidor:

#### REQUISITOS DE SISTEMA

JSON Server 1 requer Node 0.12 ou maior, recomendável utilizar a última versão instável.

```console
$ npm install
```

#### Iniciar o JSON Server

Para iniciar o servidor utilizar o comando

```console
$ node bin/index.js
```

## INCLUINDO UM NOVO PROJETO NO JSON Server

Para cada projeto que será adicionando no JSON Server:

#### Estrutura de pastas

Na pasta `data` criar a pasta do cliente se não existir.
Exemplo:
+ data/mec
+ data/capes
+ data/nome-do-cliente


Dentro da pasta do cliente criar a pasta do projeto.
Exemplo:
+ data/mec/sisu
+ data/mec/prouni
+ data/mec/sisutec
+ data/mec/appaluno

Para cada projeto adicionar o arquivo 

Criar o arquivo `db.json` com a estrutura dos serviços do projeto:
```json
{
  "inscricao": [
    { "id": 1, "curso": "Engenharia Florestal", "modalidade": "Ampla concorrência", "numeroEnem" : 12312312312323 }
  ],
  "candidato": [
    { "id": 1, "nome": "Nome do Aluno", "email": "teste@teste.com", "numeroEnem" : 12312312312323}
  ],
  "cronograma": { "name": "Inscrição", "dataInicio" : "1456495609481", "dataFim" : "1456499609481" }
}
```

Criar o arquivo `routes.js` com a estrutura de rotas do projeto.
O ideal é que a rota seja a mesma utilizada nos serviços do cliente, para evitar retrabalho no aplicativo.

```js

var path     = require('path'),
    dataJson = require ('./data.json');
    express = require('express'),
    route  = express.Router();

router.get('/inscricao', function(req, res, next) {
    res.send('Test Inscricao');
    next();
});

router.get('/cronograma', function(req, res, next) {
    res.send('Test Cronograma');
    next();
});

router.get('/candidato', function(req, res, next) {
    res.send('Test Candidato');
    next();
});

module.exports = route;

```

## DISPONIBILIZAÇÃO DO SERVIÇO

Entrar em com contato com a equipe de arquitetura para que os arquivos sejam colocados no servidor atual de MOCK.
Atualmente está sendo utilizado um servidor na Digital Ocean no IP:

#### Digital Ocean

+ HOST: http://162.243.124.216:3000/
+ PORT: 3000






