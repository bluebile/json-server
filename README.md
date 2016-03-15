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

Por padrão a porta a ser utilizada é a 3000, mas no caso de modificação de porta utilizar o parâmetro `-p`

```console
$ node bin/index.js -p 99999
```

Pode ser especificada a pasta onde estão localizados os arquivos routes.js (rotas customizadas com express.Router()) e
db.json (arquivo utilizado pelo JSON SERVER para representação do RESTFull)

```console
$ node bin/index.js -f data/cliente/projeto/
```

Caso necessite subir a estrutura de mais projetos (Ex: Digital Ocean) com isto gera-se o contexto http://<ip>/cliente_proteto/
```console
$ node bin/index.js -f data/ -s
```


## INCLUINDO UM NOVO PROJETO NO JSON Server

Para cada projeto que será adicionando no JSON Server:

#### Estrutura de pastas

Na pasta `especificada  a pasta do cliente se não existir.
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

#### Em caso de simular RESTFull
Para o projeto em questão adicionar o arquivo

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

#### Em caso de rotas customizadas
Criar o arquivo `routes.js` com a estrutura de rotas do projeto.
O ideal é que a rota seja a mesma utilizada nos serviços do cliente, para evitar retrabalho no aplicativo.

##### Exemplo 1
- Este arquivo recebe o argumento `db` que é representação do db.json(caso seja utilizado), retorna o express.Router().
```js

var path     = require('path'),
    express = require('express'),
    router  = express.Router();


module.exports = function(db) {
    router.get('/inscricao', function(req, res, next) {
        res.json(db('posts'));
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

    return router;
};

```
##### Exemplo 2
- Caso haja a necessidade de customizar o retorno do JSON-SERVER RESTFull deve ser retornado o render.

```js

var path     = require('path'),
    express = require('express'),
    router  = express.Router();


module.exports = function(db) {
    router.get('/inscricao', function(req, res, next) {
        res.json(db('posts'));
        next();
    });

    return {
        router: router,
        render: function(res, req) {
            res.send(res.locals.data);
        }
    };
};

```

## DISPONIBILIZAÇÃO DO SERVIÇO

Entrar em com contato com a equipe de arquitetura para que os arquivos sejam colocados no servidor atual de MOCK.
Atualmente está sendo utilizado um servidor na Digital Ocean no IP:

#### Digital Ocean

+ HOST: http://162.243.124.216:3000/
+ PORT: 3000






