const express = require('express');
const fsbrowse = require('./index');

const app = express();
const PORT = process.env.PORT || 3000;
const BASEPATH = ('BASEPATH' in process.env ? process.env.BASEPATH : 'BASE_PATH' in process.env ? process.env.BASE_PATH : '/files').replace(/\/$/, '');

app.use(BASEPATH || '/', fsbrowse({ baseDir: process.env.BASE_DIR }));

if (BASEPATH && BASEPATH !== '/') {
  app.get('/', (req, res) => res.redirect(BASEPATH));
}

app.listen(PORT, () => {
  console.log(`fsbrowse running at http://localhost:${PORT}${BASEPATH}`);
});
