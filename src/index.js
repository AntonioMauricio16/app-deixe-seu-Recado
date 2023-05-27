
import express, { request, response } from 'express';
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors("*"));



let usuarios = []
let recados = []

app.post("/criar", (request, response)=>{
 
    let usuario = request.body

    let validaUser = usuarios.find(user => user.email === usuario.email)
    
    if(validaUser){
      return response.status(400).json("Usuario já existe")
    }else{
      usuarios.push({
        id: Math.floor(Math.random()*67676),
        email: usuario.email,
        senha: usuario.senha    
      })
      return response.status(201).json();
    }    
})

app.post("/login", (request, response)=>{
    let login = request.body

    let entrarEmail = usuarios.some(user => user.email === login.email)

    if(entrarEmail){
        let index = usuarios.findIndex(user => user.email === login.email)
        let entrar = login.senha === usuarios[index].senha
        if(entrar){
            return response.status(202).json("ok.") 
        }else{
            return response.status(404).json("Email ou senha não existe.")
        }
           
    }
})

// Rota para adicionar um novo recado
app.post("/criarRecados", (request, response) => {
  let recado = request.body;
  recados.push(recado);
  return response.status(201).json(recados);
});

// Rota para listar os recados paginados de um usuário
app.get("/recados", (request, response) => {
  //page 2
  const page = request.query.page || 1;
  const pages = Math.ceil(recados?.length / 10);
  
  const indice = (page - 1) * 10;
  const aux = [...recados];
  const result = aux.splice(indice, 10);

  return response.status(201).json({count: recados.length, data: result, pages});
});



app.listen(8081, () => console.log("Servidor iniciado"));