require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const { AppDataSource } = require('./src/config/database');

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
    const server = http.createServer(app);
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Stop the other process and try again.`);
      } else {
        console.error('Server error:', err);
      }
      process.exit(1);
    });
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
  });
