const { read, createOrUpdate, append } = require('./crud');

async function runTests() {
  const sheetName = 'pagina1';
  const range = 'A1:p10';

  // Lendo dados da planilha.
  const data = await read(sheetName, range);
  console.log('Dados lidos:', data);

  // Atualizando ou criando dados na planilha.
  const newData = [['Hello', 'World', 'Node.js']];
  await createOrUpdate(sheetName, 'A1:C1', newData);
  console.log('Dados atualizados ou criados.');

  // Anexando dados à planilha.
  const appendedData = [['Appended', 'Data', 'Example']];
  await append(sheetName, range, appendedData);
  console.log('Dados anexados.');
}

runTests().catch((error) => console.error('Error during tests:', error));
