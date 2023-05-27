
window.onload = function () {


  };
  
const api = axios.create({
    baseURL: "http://localhost:8080/",
  });
  
  function enviarForm(event) {
    event.preventDefault();
    const nome = document.getElementById("nome_id").value;
    const email = document.getElementById("email_id").value;
    const senha = document.getElementById("senha_id").value;
    const form = {
      nome: nome,
      email: email,
      senha: senha,
    };
    api
      .post("/user", form)
      .then((res) => alert(res)) // certo
      .catch((err) => {
        return console.log(err)
      }); //errado
  }
  function entrar(event) {
    event.preventDefault();
 
    
    const email = document.getElementById("userName").value;
    const senha = document.getElementById("senhaLogin").value;
    const form = {
      email: email,
      senha: senha
    };
    
    api
      .post("/login", form)
      .then(() => {
        alert("Usuario Logado!")
        sessionStorage.setItem("UserName",email)
        sessionStorage.setItem("UserName",senha)
        window.location.href = "recados.html"
        })
      .catch((err) => alert(err.response.data)); 
   }
   
  
  function criarRecado() {
    
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
  
    api
      .post("/recados",{ titulo, descricao })
      .then((res) => alert("recado criado"))
      .catch((err) => alert(err.response.data));
  }
  function listarRecados(event) {
    event.preventDefault();
    api
      .get("/list")
      .then((res) => {
        const recados = res.data;
        let tabela  = document.getElementById("result");
        let conteudoTabela = "";
        recados.forEach((recado) => {
          conteudoTabela += `<tr><td>${recado.titulo}</td><td>${recado.descricao} </td></tr>`;
        });
        tabela.innerHTML = conteudoTabela;
      })
      .catch((err) => {
        alert(err);
      });
  }