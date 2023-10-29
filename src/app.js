const getUsers = require('./modules/Users.js');
const http = require('http');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1');
  const searchParams = url.searchParams;
  const users = searchParams.has('users');
  const hello = searchParams.has('hello');
  const allParams = Array.from(searchParams.keys());
  const checkParams = ['users', 'hello'];
  const check = allParams.every((param) => checkParams.includes(param));

  if (users) {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('Content-Type', 'application/json');
    res.write(getUsers());
    res.end();
    return;
  }

  if (hello) {
    if (searchParams.get('hello')) {
      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.setHeader('Content-Type', 'text/plain');
      res.write('Hello ' + searchParams.get('hello') + '\n');
      res.end();
      return;
    }
    res.statusCode = 400;
    res.statusMessage = 'Bad Request';
    res.setHeader('Content-Type', 'text/plain');
    res.write('Enter a name\n');
    res.end();
  }

  if (!check && searchParams.toString !== '') {
    res.statusCode = 500;
    res.statusMessage = 'Bad Request';
    res.setHeader('Content-Type', 'text/plain');
    res.write(' ');
    res.end();
    return;
  }

  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'text/plain');
  res.write('Hello World\n');
  res.end();
});

server.listen(3003, '127.0.0.1', () => {
  console.log('Server running at http://127.0.0.1:3003/');
});
