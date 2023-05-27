window.onload = function () {
  mostrarRecados();
};
const api = axios.create({
  baseURL: "http://localhost:8081/"
})

let page = 1
let pages = 0
let totalRecados =0


function paginaAnterior(){
  mostrarRecados()
  if(page > 1){
      page--
      mostrarRecados(page)
  }
}

function proximaPagina(){
  if(pages > page)
  page++
  mostrarRecados(page)
}

function mostrarRecados(page){
  document.getElementById("mostrarRecados").style.display = "block"

  
  api.get("/recados", {params: { page }})

  .then((res) => {
      const recados = res.data.data;
      totalRecados = res.data.total
      pages = res.data.pages

      let cards = document.getElementById("messagesList");
      cards.innerHTML = "";
      recados.forEach((recado) => {
          cards.innerHTML += `<div class="card"> <span>${recado.titulo}</span><p>${recado.recado}</p><button onclick="mostrarEdicaoRecados(\'${recado.titulo}\', \'${recado.recado}\')">Editar</button></div>`
      });
  })
  .catch((err)=>{
      alert(err)
  })

  
}


//criar usuario
function criarUsuario(event){
  event.preventDefault();
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value
  const senha = document.getElementById("password").value

  const form = {
      nome: nome,
      email: email,
      senha: senha
  }

  api
  .post("/criar", form)
  .then((res)=>{alert("Usuário criado com sucesso.")})
  .catch((err)=>{alert("usuario já existe")})
}




//login
function login(event){
  event.preventDefault();

  const email = document.getElementById("email").value
  const senha = document.getElementById("password").value
  
  const form = {
      email: email,
      senha: senha
  }

  api
  .post("/login", form)
  .then((res)=>{
    alert("Usuario logado com sucesso!")
    window.location.href = "listar.html"
    localStorage.setItem("usuario",email)
  })
  .catch((err)=>{alert("Usuario não encontrado.")})

  
  mostrarRecados();
  
  
}

function criarRecados(event){
  event.preventDefault();

  const titulo = document.getElementById("tituloRecado").value
  const recado = document.getElementById("descricaoRecado").value
  const form = {
      titulo:titulo,
      recado:recado
  }

  api.post("/criarRecados", form)
  .then((res)=>{})
    .catch((error) => {
      console.error('Erro ao obter os recados:', error);
    });
    mostrarRecados();
}


function mostrarEdicaoRecados(titulo, recado){
 
}

