const Atendimento = require("../models/atendimentos");

module.exports = (app) => {
  app.get("/atendimentos", (req, res) =>{
    Atendimento.lista(res) //Chamar a listagem do models enviando o res
  });
  
app.get('/atendimentos/:id', (req, res) => { //Novo get para mostrar por id
  const id = parseInt(req.params.id) //Converter o id para inteiro
  Atendimento.buscarPorId(id, res) //Chamar o buscaPorId do models enviando id e res
})

  app.post("/atendimentos", (req, res) => {
    const atendimento = req.body;
    Atendimento.adiciona(atendimento, res);
  });
};

/*
  GET
  *Chamar a listagem do models enviando o res
  *Novo get para mostrar por id
    *Converter o id para inteiro
    *Chamar o buscaPorId do models enviando id e res
*/