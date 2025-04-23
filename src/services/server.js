const express = require('express');
const routes = require('../routes/devices');
const config = require('../config');

const app = express();

app.use(express.json());

app.use('/api/devices', routes);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});