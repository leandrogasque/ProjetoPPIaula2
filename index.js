import  express  from 'express';

const porta = 3000;
const host = '0.0.0.0';

const app = express();
app.use(express.static("./paginas"));

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});

