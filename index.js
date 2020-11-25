const express = require('express');

const server = express();

server.use(express.json());

const users = ['Matheus', 'João', 'Tiago', 'Miguel'];

// Middleware para verificar se a informação no corpo da requisição e verdadeira 
function checkUserExists(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({ error: 'User name is required '});
    }

    return next();
}
// Fim...


// Middleware para verificar se existe o usuário 
function checkUserInArray(req, res, next) {
    const user = users[req.params.index];

    if (!user) {
        return res.status(400).json({ error: 'User does not exists '});
    }

    req.user = user;

    return next();
}
// Fim...


// Criar um usuário
server.post('/users', checkUserExists,  (req, res) => {
    const { name } = req.body;
    
    users.push(name);

    return res.json(users);
});
// Fim...


// Listar usuário
server.get('/users/:index', checkUserInArray, (req, res) => {
    return res.json(req.user);
})
// Fim...


// Alterar usuário
server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users);
})
// Fim...


// Excluir usuário
server.delete('/users/:index', checkUserInArray,  (req, res) => {
    const { index } = req.params;
    
    users.splice(index, 1);

    return res.send('Usuário deletado com sucesso!');
})
// Fim...


// Listar todos os usuários
server.get('/users', (req, res) => {
    return res.json(users);
})
// Fim...


server.listen(3000);