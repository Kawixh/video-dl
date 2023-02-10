const express = require('express');
const ytdl = require('youtube-dl-exec');
const app = express();

app.use(express.json());

app.post('/download', (req, res) => {
  console.log("Received request to download video at URL:", req.body.url);
  const url = req.body.url;
  ytdl.exec(url, ['-f', 'best'], (error, stdout, stderr) => {
    if (error) {
      return res.status(400).json({error: error.message});
    }
    res.send(stdout);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
