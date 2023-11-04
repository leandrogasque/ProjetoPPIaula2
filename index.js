import express from 'express';

const porta = 3000;
const host = '0.0.0.0';

var listaUsuarios = [];

function processarCadastroUsuario(requisicao, resposta) {
    const usuario = {
        ra: requisicao.query.ra,
        nome: requisicao.query.nome,
        sobrenome: requisicao.query.sobrenome,
        cidade: requisicao.query.cidade,
        estado: requisicao.query.estado,
        cep: requisicao.query.cep,
        telefone: requisicao.query.telefone,
        email: requisicao.query.email,
        evento: requisicao.query.evento,
        dataInicio: requisicao.query.dataInicio,
        dataFim: requisicao.query.dataFim,
    }
    listaUsuarios.push(usuario);
    //retorna a lista de usuarios para o cliente
    let conteudoResposta = `
    <!doctype html>
    <html lang="pt-br">
    <head>
      <title>Listagem de Cadastro em Eventos</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
      <header>
      </header>
      <main class="background">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <h1>Lista de Pessoas Cadastradas em Eventos Da Unoeste</h1>
              <div class="cotainer">
                <table class="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th scope="col">RA</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Sobrenome</th>
                        <th scope="col">Cidade</th>
                        <th scope="col">UF</th>
                        <th scope="col">CEP</th>
                        <th scope="col">Telefone</th>
                        <th scope="col">Email</th>
                        <th scope="col">Evento</th>
                        <th scope="col">Inicio</th>
                        <th scope="col">Fim</th>
                      </tr>
                    </thead>
                    <tbody> `;
    for (const usuario of listaUsuarios) {
        conteudoResposta += `
                        <tr>
                            <td>${usuario.ra}</td>
                            <td>${usuario.nome}</td>
                            <td>${usuario.sobrenome}</td>
                            <td>${usuario.cidade}</td>
                            <td>${usuario.estado}</td>
                            <td>${usuario.cep}</td>
                            <td>${usuario.telefone}</td>
                            <td>${usuario.email}</td>
                            <td>${usuario.evento}</td>
                            <td>${usuario.dataInicio}</td>
                            <td>${usuario.dataFim}</td>
                        </tr>
                        `;
    }

    conteudoResposta += `
                    </tbody>
                </table>
                <a class="btn btn-danger" href="/" role="button">Voltar</a>
                <a class="btn btn-primary" href="/cadastro.html" role="button">Continuar Cadastrando</a>
            </div>
        </div>
    </div>
    </main>
    <footer>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
      integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js"
      integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
    </script>
  </body>
  </html>`;
    resposta.end(conteudoResposta);

}
const app = express();
app.use(express.static("./paginas"));

app.get('/', (requisicao, resposta) => {
    resposta.end(` <!doctype html>
    <html lang="pt-br">
    <head>
      <title>TESTE</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
        <link rel="stylesheet" href="style2.css">
    </head>
    <body>
      <header>
      </header>
      <main class="background">
        <div class="container">
          <div class="row">
            <div class="col-10 text-center">
              <h1>   Escolha a Opção desejada</h1>
            </div>
          <div>
            <a class="btn btn-primary col-5" href="/cadastro.html">Cadastro</a>
            <a class="btn btn-danger col-5" href="/cadastro?">Consulta</a>
          </div>
        </div>
      </main>
      <footer>
      </footer>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
        integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous">
      </script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js"
        integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
      </script>
    </body>
    </html>
    `);
})

//rota para processar o cadastro de usuario endpoint = /cadastro
app.get('/cadastro', processarCadastroUsuario);


app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});

