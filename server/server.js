const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const cookie = require('cookie-parser')

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookie())


app.use(cors({
    origin: ["http://0.0.0.0:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true
}));


app.use(
    session({
        key: "userId",
        secret: "nodejsemuitobom",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 3600000
        },
    })
);

app.use(express.static(path.join(__dirname, '/../client/build')));

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'teste',
});



app.get('/api/v1/getUsers', (req, res) => {
    const sqlSelect = "SELECT username, id, nivel FROM usuario";
    db.query(sqlSelect, (err, result) => {
        if (result != "") {
            res.send(result);
        }else{
            res.send("Não localizada no banco");
        }

    })
})

app.get('/api/v1/getEmpresas', (req, res) => {
    const sqlSelect = "SELECT * FROM empresa";
    db.query(sqlSelect, (err, result) => {
        if (result != "") {
            res.send(result);
        }else{
            res.send("Não localizada no banco");
        }

    })

})

app.get('/api/v1/getTipoDeclara', (req, res) => {
    const sqlSelect = "SELECT * FROM tipodeclaracao";
    db.query(sqlSelect, (err, result) => {
        if (result != "") {
            res.send(result);
        }else{
            res.send("Não localizada no banco");
        }
 
    })

})

app.get('/api/v1/getDeclaracao', (req, res) => {
    const sqlSelect = `select d.id id, d.nome mes, t.nome tipo, e.nome empresa, e.CNPJ CNPJ, 
    DATE_FORMAT(d.data_cadastro, '%d/%m/%Y - %H:%i') as data, u.username usuario 
    from declaracao d 
    join tipodeclaracao t 
    on t.id = d.tipoID 
    join usuario u 
    on d.usuario_id = u.id 
    join empresa e 
    on d.empresa_id = e.id;`;
    db.query(sqlSelect, (err, result) => {
        if (result != "") {
            res.send(result);
        }else{
            res.send("Não localizada no banco");
        }

    })

})

app.post('/api/v1/getDeclaracaoUser', (req, res) => {
    const id = req.body.id;
    const sqlSelect = `select d.id id, d.nome mes, t.nome tipo, e.nome empresa, e.CNPJ CNPJ, 
  DATE_FORMAT(d.data_cadastro, '%d/%m/%Y - %H:%i') as data, u.username usuario 
  from declaracao d 
  join tipodeclaracao t 
  on t.id = d.tipoID 
  join usuario u 
  on d.usuario_id = u.id 
  join empresa e 
  on d.empresa_id = e.id where usuario_id = ?;`;
    db.query(sqlSelect, [id], (err, result) => {
        if (result != "") {
            res.send(result);
        }else{
            res.send(result);
        }
    })

})

app.post('/api/v1/getEmpresa', (req, res) => {
    const id = req.body.id;
    const sqlSelect = `select * from empresa where id = ?;`;
    db.query(sqlSelect, [id], (err, result) => {
        if (result != "") {
            res.send(result);
        } else {
            res.send("Não localizada no banco");
        }
    })


})


app.get('/api/v1/logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy();
        res.send({ loggedIn: false, user: null });
    }

})

app.post('/api/v1/postUsers', (req, res) => {
    const nome = req.body.nome;
    const senha = req.body.senha;
    const nivel = req.body.nivel;
    const imagem = "null.png";

    const sqlInsert = "INSERT INTO usuario (username, senha, nivel, imagem) VALUES (?,?,?,?)";
    db.query(sqlInsert, [nome, senha, nivel, imagem], (err, result) => {
        
        
        if (result != undefined) {
            res.send({
                "result": true,
                "content": "Usuario inserido com sucesso",
                "tipo": "success",
            })
            
        } else {
            res.send({
                "result": true,
                "content": "Erro ao realizar inserção",
                "tipo": "error",
            })
            
        }

    })

})

app.post('/api/v1/postEmpresa', (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const ativo = req.body.ativo;
    const declara = req.body.declara;
    const cnpj = req.body.CNPJ;

    const sqlInsert = "INSERT INTO empresa (nome, email, telefone, ativo, declara, cnpj) VALUES (?,?,?,?,?,?)";
    db.query(sqlInsert, [nome, email, telefone, ativo, declara, cnpj], (err, result) => {
        if (result != undefined) {
            res.send({
                "result": true,
                "content": "Empresa inserida com sucesso",
                "tipo": "success",
            })
            
        } else {
            res.send({
                "result": true,
                "content": "Erro ao realizar inserção",
                "tipo": "error",
            })
            
        }
    })

})

app.post('/api/v1/postDeclaracao', (req, res) => {
    const nome = req.body.nome;
    const tipoID = req.body.tipoID;
    const empresa_id = req.body.empresa_id;
    const usuario_id = req.body.usuario_id;

    const sqlInsert = "INSERT INTO declaracao (nome, usuario_id, empresa_id, tipoID, data_cadastro) VALUES (?,?,?,?,now())";
    db.query(sqlInsert, [nome, usuario_id, empresa_id, tipoID], (err, result) => {
        if (result != undefined) {
            res.send({
                "result": true,
                "content": "Declaração inserida com sucesso",
                "tipo": "success",
            })
            
        } else {
            res.send({
                "result": true,
                "content": "Erro ao realizar inserção",
                "tipo": "error",
            })
            
        }
    })

})

app.post('/api/v1/postTipoDeclara', (req, res) => {
    const nome = req.body.nome;

    const sqlInsert = "INSERT INTO tipodeclaracao (nome) VALUES (?)";
    db.query(sqlInsert, [nome], (err, result) => {
        if (result != undefined) {
            res.send({
                "result": true,
                "content": "Tipo declaração inserida com sucesso",
                "tipo": "success",
            })
            
        } else {
            res.send({
                "result": true,
                "content": "Erro ao realizar inserção",
                "tipo": "error",
            })
            
        }
    })

})

app.post('/api/v1/login', (req, res) => {
    const username = req.body.username;
    const senha = req.body.senha;

    const sqlInsert = "select username, id, imagem, nivel from usuario where username = ? and senha = ?";
    db.query(sqlInsert, [username, senha], (err, result) => {
        if (result != undefined) {
            req.session.user = result
            res.send({
                "result": true,
                "content": "",
            })
        } else {
            res.send({
                "result": false,
                "content": "Usuário ou senha inválido",
            })
        }
        console.log(err);
    })
})

app.get('/api/v1/login', (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user })
    } else {
        res.send({ loggedIn: false })
    }
})

app.put('/api/v1/postAtualizaEstado', (req, res) => {
    const id = req.body.id;
    const ativo = req.body.ativo;

    const sqlInsert = "UPDATE empresa SET ativo = ? WHERE id = ?";
    db.query(sqlInsert, [ativo, id], (err, result) => {
        if (result != undefined) {
            res.send({
                "result": true,
                "content": "Empresa atualizada com sucesso",
                "tipo": "success",
            })
            
        } else {
            res.send({
                "result": true,
                "content": "Erro ao realizar atualização",
                "tipo": "error",
            })
            
        }
    })
})

app.put('/api/v1/postPromoveUser', (req, res) => {
    const id = req.body.id;
    const nivel = req.body.nivel;

    const sqlInsert = "UPDATE usuario SET nivel = ? WHERE id = ?";
    db.query(sqlInsert, [nivel, id], (err, result) => {
        if (result != undefined) {
            res.send({
                "result": true,
                "content": "Usuário promovido com sucesso",
                "tipo": "success",
            })
            
        } else {
            res.send({
                "result": true,
                "content": "Erro ao realizar promover",
                "tipo": "error",
            })
            
        }
    })
})

app.put('/api/v1/postAtualizaEmpresa', (req, res) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const ativo = req.body.ativo;
    const declara = req.body.declara;
    const cnpj = req.body.CNPJ;

    const sqlInsert = "UPDATE empresa SET nome = ?, email = ?, telefone = ?, ativo = ?, declara = ?, cnpj = ? WHERE id = ?";
    db.query(sqlInsert, [nome, email, telefone, ativo, declara, cnpj, id], (err, result) => {
        if (result != undefined) {
            res.send({
                "result": true,
                "content": "Empresa atualizada com sucesso",
                "tipo": "success",
            })
            
        } else {
            res.send({
                "result": true,
                "content": "Erro ao realizar atualização",
                "tipo": "error",
            })
            
        }
    })
})

app.put('/api/v1/postAtualizaUser', (req, res) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const senha = req.body.senha;
    const nivel = req.body.nivel;

    if (senha == '' || senha == null || senha == undefined) {
        const sqlInsert = "UPDATE usuario SET username = ?, nivel = ? WHERE id = ?";
        db.query(sqlInsert, [nome, nivel, id], (err, result) => {
            if (result != undefined) {
                res.send({
                    "result": true,
                    "content": "Usuário atualizado com sucesso",
                    "tipo": "success",
                })
                
            } else {
                res.send({
                    "result": true,
                    "content": "Erro ao realizar inserção",
                    "tipo": "error",
                })
                
            }
        })
    } else {
        const sqlInsert = "UPDATE usuario SET username = ?, senha = ?, nivel = ? WHERE id = ?";
        db.query(sqlInsert, [nome, senha, nivel, id], (err, result) => {
            if (result != undefined) {
                res.send({
                    "result": true,
                    "content": "Usuário atualizado com sucesso",
                    "tipo": "success",
                })
                
            } else {
                res.send({
                    "result": true,
                    "content": "Erro ao realizar inserção",
                    "tipo": "error",
                })
                
            }
        })
    }

})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/../client/build/index.html'))
})

app.listen(8086, () => {
    console.log('Rodando na porta 8086')

})