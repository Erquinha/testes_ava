const { getUserById, connection } = require('./db');

describe('Testes para getUserById', () => {
 
  beforeAll(async () => {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        name VARCHAR(255), 
        matricula VARCHAR(255)
       
      )
    `);

    await connection.query(`
      INSERT INTO users (name, matricula) VALUES 
      ('Erica Silva', '88546975'), 
      ('Natalia Santos', '66565887')
    `);
  });

  
  test('deve retornar o usuário correto pelo ID', async () => {
    const user = await getUserById(1);
    expect(user).toHaveProperty('name', 'Erica Silva'); 
    expect(user).toHaveProperty('matricula', '88546975');
  });

  
  test('deve retornar undefined se o usuário não existir', async () => {
    const user = await getUserById(999); 
    expect(user).toBeUndefined();
  });

  afterAll(async () => {
    await connection.query('DROP TABLE IF EXISTS users'); 
    await connection.end();
  });
});
