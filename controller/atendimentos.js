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

  app.patch('/atendimentos/:id', (req, res) => { //Criar app.patch com '/atendimentos/:id
    const id = parseInt(req.params.id) //Converter id para int
    const valores = req.body //Criar variável para receber os valores da requisição do body
    Atendimento.altera(id, valores, res) //Chamar o altera passando o id, valores e a resposta
  });
  app.delete('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    Atendimento.deleta(id, res)
  })
};



/*
  GET
  *Chamar a listagem do models enviando o res
  *Novo get para mostrar por id
    *Converter o id para inteiro
    *Chamar o buscaPorId do models enviando id e res
*/
/*UPDATE
  *Diferença de PUT para PATCH
  *PUT: Quando vier ou for mudar todo o objeto
  *PATCH: Quando for mudar apenas um atributo do objeto
  *Criar app.patch com '/atendimentos/:id
    *Converter id para int
    *Criar variável para receber os valores da requisição do body
    *Chamar o altera passando o id, valores e a resposta
*/
/*
 *Criar rota delete
  *Converter id
  *Chamar deleta passando id e res
*/