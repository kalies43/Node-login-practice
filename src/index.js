import {readFile} from 'fs/promises';
import {readdir} from 'fs/promises';
import http from 'http';


console.log("Hello, World!");


// Read file asynchronously with callback
async function readFileExample() {
  try {
    const data = await readFile('data/exampletext.txt', 'utf8');
    console.log('File content:', data);
  } catch (err) {
  console.error('Error reading file:', err);
  }
}
readFileExample();

async function listFiles(folderPath) {
  try {
    const files = await readdir(folderPath);
    console.log(files); // Output: ['file1.txt', 'image.png', 'subfolder']
  } catch (err) {
    console.error('Error reading folder:', err);
  }
}

listFiles('./');

async function countLinesSimple(filePath) {
  const content = await readFile(filePath, 'utf8');
  if (content.length === 0) return 0;
  
  const lines = content.split(/\r?\n/);
  return lines.length;
}

countLinesSimple('data/exampletext.txt')
  .then((count) => console.log(`Total lines: ${count}`))
  .catch((err) => console.error('Error reading file:', err));

const httpServer = http.createServer((req, res) => {
  console.log(req.method, req.url);
  if (req.url === "/"){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello, World!</h1>');
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>404 Not Found</h1>');
  }

});

httpServer.listen(3000, () => {
  console.log('Server is running on port 3000');
});