const HTTP = require('http');
const PORT = 3000;
const URL = require('url').URL;

function dieRoll(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function allRolls(rolls, sides) {
  let body = '';

  for (let count = 0; count < rolls; count++) {
    body += `${dieRoll(1, sides)}\n`;
  }
  return body;
}

const SERVER = HTTP.createServer((req, res) => {
  let method = req.method;
  let path = req.url;

  if (path === '/favicon.ico') {
    res.statusCode = 404;
    res.end();
  } else {
    const myURL = new URL(path, 'http://localhost:3000/')
    let params = myURL.searchParams;
    let numRolls = Number(params.get('rolls'));
    let numSides = Number(params.get('sides'));

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write(`${allRolls(numRolls, numSides)}`);
    res.write(`${method} ${path}\n`);
    res.end();
  }
});

SERVER.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});