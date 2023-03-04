const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();


const fileMappings = {
  "name": "title.jpg",
  "another-name": "image.png",

};


app.get('/:name', (req, res) => {
  const requestedName = req.params.name;


  if (fileMappings.hasOwnProperty(requestedName)) {
    const originalName = fileMappings[requestedName];
    const extension = path.extname(originalName);

    
    const contentType = getContentType(extension);


    const filePath = path.join(__dirname, 'public', originalName);
    const readStream = fs.createReadStream(filePath);
    res.set('Content-Type', contentType);
    readStream.pipe(res);
  } else {
    
    res.status(404).send('File not found');
  }
});

// Start the server
const server = http.createServer(app);
const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


function getContentType(extension) {
  switch (extension) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.png':
      return 'image/png';
    case '.jpg':
      return 'image/jpeg';
    case '.gif':
      return 'image/gif';
    default:
      return 'application/octet-stream';
  }
}
const mongoose = require('mongoose');



const fileMappingSchema = new mongoose.Schema({
  name: String,
})
