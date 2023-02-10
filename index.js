const express = require('express');
const ytdl = require('youtube-dl-exec');
const path = require("path");
const app = express();

app.use(express.json());

app.post('/download', (req, res) => {
  console.log("Received request to download video at URL:", req.body.url);
  const url = req.body.url;
  ytdl.exec(url, ['-o', 'video.mp4'], {}, (error, stdout, stderr) => {
    if (error) {
      return res.status(400).json({error: error.message});
    } else {
      const file = path.join(__dirname, 'video.mp4');
      res.sendFile(file, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Could not send file');
        }
      });
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
