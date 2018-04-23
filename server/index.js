import express from 'express';
import path from 'path';

const port = process.env.PORT || 3000;
const app = express();

// serve static assets normally
app.use(express.static(__dirname + '/dist'));

// handle every other route with index.html, which will contain
// a script tag to our application's JavaScript file(s).
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname,'index.html'));
});

app.listen(port, () => console.log("Server started on port " + port));