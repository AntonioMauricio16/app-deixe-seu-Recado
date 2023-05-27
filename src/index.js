import  express, { request, response } from "express";
import express from 'express';
const app = express();
const bcrypt = require('bcrypt');
app.use(express.json());
app.get('/', (request, response) => {
return response.json('OK');
});
app.listen(8081, () => console.log("Servidor iniciado"));


// lista de Usuarios 
let usuarios = [];

// validando o Usuario pelo id
function  validarId(request,response,next){
   const idUsuario = request.params.id;
   const usuarioChecado = usuarios.find(usuar => usuar.id === Number(idUsuario));

   if(usuarioChecado){
    next();
   }else{
    response.status(404).send("Usuario Não Encontrado");
   }
}

app.get("/usuario", (request,response) =>{
  return response.json(usuarios);
});

// criando o usuario
app.post("/usuarios", async(request,response) =>{
  let {
    nome,
    email,
    senha
  } = request.body;

  let validarUsuario = usuarios.find(usu => usu.email === email)
 if(validarUsuario){
  response.status(490).send("Este Usuario ja esta Cdastrado")

 }else{
  let id = Math.floor(Math.random()*6767);
          let senhaCript = await bcrypt.hash(senha, 10);
          let novoUsuario = {id, nome, email, senhaCript, recado:[]};
          usuarios.push(novoUsuario);
          response.status(201).send("criado com sucesso")
  }
 });

 app.post("/usuario/login",async(request,response)=> {
  let{email,
      senha
  } = request.body;
  let verificandoEmail = usuarios.find(user => user.email === email );

  if(!verificandoEmail){
    return response.status(401).send('Email ou senha inválidos');

  }
 let verificandoSenha = await bcrypt.compare(senha, verificandoEmail.senhaCript);

 if(!verificandoSenha){
  return response.status(401).send('Email ou senha inválidos');
 }else{
  response.status(202).json(verificandoEmail.id)
 }

 });

 app.get('/usuarios', (request,response)=>{
  response.status(202).json(usuarios);
})

app.post("/usuarios/:id/recado",validarId, (request,response)=>{
  const novoRecado = request.body;
  let recadoCriado = {
      id: Math.floor(Math.random()*1425),
      titulo: novoRecado.titulo,
      descricao: novoRecado.descricao
  };
  const id = request.params.id;

  let idParaRecado = usuarios.findIndex(usuario=> usuario.id === Number(id));

  usuarios[idParaRecado].recado.push(recadoCriado);

return response.status(201).send("Recado criado com sucesso")
});

app.get("/usuarios/:id/recado", (req, res) => {
  const usuarioId = parseInt(req.params.id);

  const usuario = usuarios.find((user) => user.id === usuarioId);

  if (!usuario) {
    return res.status(404).json("Usuário não encontrado.");
  }

  const page = req.query.page || 1;
  const pages = Math.ceil(usuario.recado?.length / 3);
  const indice = (page - 1) * 3;
  const aux = [...usuario.recado]; // spread operator
  const result = aux.splice(indice, 3);

  return res
    .status(201)
    .json({ total: usuario.recado.length, recados: result, pages });
});

app.get('/recados', (request,response)=>{
  response.status(202).json(usuarios);
})

app.put('/usuarios/:id/recado/:recadoId',validarId,(req, res) => {
  const idDOUsuario = req.params.id; // obtém o ID do usuário a partir da URL
  const recadoId = req.params.recadoId; // obtém o ID do recado a partir da URL

  // Encontra o usuário pelo ID
  const usuario = usuarios.find(user => user.id === Number(idDOUsuario));

  // Encontra o recado pelo ID
  
  const recado = usuario.recado.find(recado => recado.id === Number(recadoId));

  
  if (!recado ) {
    return res.status(404).send('Recado não encontrado');
  }

  if (usuario === undefined && recado === recado) {
    return res.status(404).send('Usuario não encontrado');
  }

  // Atualiza o recado
  recado.titulo = req.body.titulo;
  recado.descricao = req.body.descricao;

  res.status(200).send('Recado atualizado com sucesso');
});

app.get('/deletar', (request,response)=>{
  response.status(202).json(usuarios);
})


app.delete('/usuarios/:id/recado/:idRecado', (request, response)=>{
  const id = Number(request.params.id);
  const idRecado = Number(request.params.idRecado);
  const indexDoUsuario = usuarios.findIndex(usuario => usuario.id === id);

  //verifica se tem o id no array usuarios
      if (indexDoUsuario < 0) {
      response.status(404).send("Usuário não encontrado.");
      return;
      }

  //pega o index do array usuarios
  const indexDoRecado = usuarios[indexDoUsuario].recado.findIndex(recado => recado.id === idRecado);

  // verifica se tem o id no array recado
      if (indexDoRecado < 0) {
      response.status(404).send("Recado não encontrado.");
      return;
      }

  //pega o id do array recado no array usuarios e exclui    
  usuarios[indexDoUsuario].recado.splice(indexDoRecado, 1);
  response.status(202).send("Recado excluído com sucesso.");
});

