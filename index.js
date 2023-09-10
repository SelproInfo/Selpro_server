const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const port = process.env.PORT ?? 8080

conn.sync({ alter: true }).then(() => {
  server.listen(port, () => {
    console.log(`%s listening at ${port}`);
  });
}); 
