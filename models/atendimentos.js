const moment = require("moment");
const conexao = require("../infraestrutura/conexao");

class Atendimento {
  adiciona(atendimento, res) {
    const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS");
    const data = moment(atendimento.data, "DD/MM/YYYY").format(
      "YYYY-MM-DD HH:MM:SS"
    );
    const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
    const clienteEhValido = atendimento.cliente.length >= 5;

    const validacoes = [
      {
        nome: "data",
        valido: dataEhValida,
        mensagem: "Data deve ser maior ou igual a data atual",
      },
      {
        nome: "cliente",
        valido: clienteEhValido,
        mensagem: "Cliente deve ter pelo menos cinco caracteres",
      },
    ];
    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;
    if (existemErros) {
      res.status(400).json(erros);
    } else {
      const atendimentoDatado = { ...atendimento, dataCriacao, data };
      const sql = "INSERT INTO Atendimentos SET ?";

      conexao.query(sql, atendimentoDatado, (erro, resultados) => {
        if (erro) {
          res.status(400).json(erro);
        } else {
          res.status(201).json(resultados);
        }
      });
    }
  }

  lista(res) {
    //Criar método de listar que recebe res
    const sql = "SELECT* FROM atendimentos"; //*Criar variavel para receber a seleção de todos dados
    conexao.query(sql, (erro, resultados) => {
      //criar a conecção do o BD e a variavel de de seleção
      if (erro) {
        //tratamento de erro
        res.staus(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  buscarPorId(id, res) {
    const sql = `SELECT * FROM atendimentos WHERE id=${id}`;
    conexao.query(sql, (erro, resultados) => {
      const atendimento = resultados[0];
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(atendimento);
      }
    });
  }

  altera(id, valores, res){ //Criar método altera que recebe id, valores e res
    if(valores.data){ //Se existir a data nos valores
      valores.data = moment(valores.data, "DD/MM/YYYY").format(
        "YYYY-MM-DD HH:MM:SS"
      ); //Converter a data
    }
    const sql = 'UPDATE atendimentos SET ? WHERE id=?' //Criar a variável que recebe o UPDATE e set alguma coisa de algum id
    conexao.query(sql, [valores, id], (erro, resultados) => { //Cria conexao com as variáveis necessárias para o update
      if(erro){ //Tratamento de erro
        res.status(400).json(erro)
      } else {
        res.status(200).json(resultados)
      }
    })
  }
}
module.exports = new Atendimento();

/*GET
 *Criar método de listar que recebe res
 *Criar variavel para receber a seleção de todos dados
 *criar a conecção do o BD e a variavel de de seleção
 *tratamento de erro
 *Criar método buscarPorId que recebe o id e res
 *Criar variavel para receber a seleção de dados pelo id
 *Tratamento de erro
 */
/*UPDATE
 *Criar método altera que recebe id, valores e res
  *Criar a variável que recebe o UPDATE e set alguma coisa de algum id
  *Cria conexao com as variáveis necessárias para o update
  *Tratamento de erro
  *Se existir a data nos valores
  *Converter a data

*/
