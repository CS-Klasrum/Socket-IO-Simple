const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const filePath = path.resolve(__dirname, './chat.html');
  const fileContent = fs.readFileSync(filePath);
  
  res.writeHead(200, {
    'content-type': 'html'
  });
  res.write(fileContent);
  res.end();
});

const io = require('socket.io')(server);

// Event Handler for our Connection
io.on('connection', socket => {
  console.log('user logged in');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('message', (message) => {
    console.log('user says: ', message);
    io.emit('message', message);
  });
});

// Open our http server
server.listen(3000);