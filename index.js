const customExpress = require("./config/customExpress");

const conexao = require("./infraestrutura/conexao");
conexao.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    const app = customExpress();

    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
    console.log("Banco conectado com sucesso");
  }
});
