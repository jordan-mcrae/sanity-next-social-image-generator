const { createImageClient } = require('../lib/index.js');
const path = require('path');
const fs = require('fs');

const client = createImageClient({
  dataset: '',
  projectId: '',
  redisUrl: '',
  token: '',
});

(async() => {
  const image = await client.generateImage({
    id: '6a48feeb-21c2-44fd-8ab9-2d05641fz1fa',
    backgroundFit: 'cover',
    backgroundImageUrl: 'https://i.picsum.photos/id/946/1200/600.jpg?hmac=UrGWW9DtBMLM25iDKJ7zqbYKkzfc50TFUmjX-o9coOk',
    text: 'Some Really Long Title That Might Have To Break Onto Multiple Lines!',
    fontSize: 50,
    fontName: 'Arial Black',
    fontColor: 'white',
    blur: 10,
    logoUrl: 'https://www.stackfive.io/images/stackfive-logo-large.png',
    logoPosition: 'bottomRight',
    // filterColor: '#07ae9d',
    // darken: 50,
    // lighten: 1.25,
  });

  fs.writeFileSync(
    path.join(__dirname, './output/sample.jpg'),
    image
  );
})();