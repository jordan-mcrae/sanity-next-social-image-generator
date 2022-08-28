const { generateImage } = require('../lib/index.js');

(async() => {
  await generateImage({
    id: '123',
    fit: 'cover',
    backgroundImageUrl: 'https://i.picsum.photos/id/946/1200/600.jpg?hmac=UrGWW9DtBMLM25iDKJ7zqbYKkzfc50TFUmjX-o9coOk',
    text: 'Some Really Long Title That Might Have To Break Onto Multiple Lines',
    fontSize: 50
  });
})();