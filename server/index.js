require('dotenv').config();
require('./database/db')();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/user', require('./routes/user'));

app.get('/', (_req, res) => {
  res.send('Task Tracker API!');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
