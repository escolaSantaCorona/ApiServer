const express = require('express');
const cors = require('cors');
const { read, createOrUpdate, append } = require('./crud');

const app = express();
const port = process.env.PORT || 3000;

// Permitir solicitações de diferentes origens
app.use(cors());

// Configurar o servidor para aceitar JSON
app.use(express.json());

const keys = [
"id",
  "nome_do_aluno",
  "data_de_nascimento",
  "certidao_cpf_rg",
  "folha",
  "livro",
  "mae",
  "pai",
  "turma_em_2022",
  "ano_fundamental",
  "turno",
  "movimentacao",
  "data_movimento",
  "naturalidade",
  "Raça",
  "observações",
];

// Função para transformar os dados
const transformData = (data) => {
  return data.map(item => {
    let obj = {};
    keys.forEach((key, i) => {
      obj[key] = item[i] || '';
    });
    return obj;
  });
};

// Endpoint para ler dados da planilha
app.get('/api/read/:sheetName/:range', async (req, res) => {
  try {
    const { sheetName, range } = req.params;
    const rawData = await read(sheetName, range);
    const transformedData = transformData(rawData);
    res.json(transformedData);
  } catch (error) {
    console.error('Error reading data:', error);
    res.status(500).send('Error reading data');
  }
});

// Endpoint para atualizar ou criar dados na planilha
app.put('/api/update/:sheetName/:range', async (req, res) => {
  try {
    const { sheetName, range } = req.params;
    let values = req.body;
    values = transformData(values);
    await createOrUpdate(sheetName, range, values);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).send('Error updating data');
  }
});

// Endpoint para anexar dados à planilha
app.post('/api/append/:sheetName/:range', async (req, res) => {
  try {
    const { sheetName, range } = req.params;
    let values = req.body;
    values = transformData(values);
    await append(sheetName, range, values);
    res.sendStatus(201);
  } catch (error) {
    console.error('Error appending data:', error);
    res.status(500).send('Error appending data');
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

