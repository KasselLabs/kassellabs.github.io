const fs = require('fs');
const path = require('path');
const { NotionAPI } = require('notion-client');
const axios = require('axios');

const PAGES = {
  fa8f3e0647af4384862471b606d6a35a: path.join(__dirname, 'src', 'contants', 'ventures.json'),
  ef891e94750245adaed2f72f262168b0: path.join(__dirname, 'src', 'contants', 'vagas.json'),
};

const notion = new NotionAPI();

const main = async () => {
  await Promise.all(Object.entries(PAGES).map(async ([pageId, jsonPath]) => {
    const recordMap = await notion.getPage(pageId);

    await Promise.all(Object.entries(recordMap.signed_urls).map(async ([urlID, signedURL]) => {
      const response = await axios.request({
        responseType: 'arraybuffer',
        url: signedURL,
      });

      const url = signedURL.split('?')[0];
      const { name, ext } = path.parse(url);
      const filename = `${name}${ext}`;
      const filepath = path.join(__dirname, 'static', 'assets', filename);
      fs.writeFileSync(filepath, response.data);

      recordMap.signed_urls[urlID] = `https://kassellabs.io/assets/${filename}`;
    }));

    const recordMapString = JSON.stringify(recordMap, null, 2);
    fs.writeFileSync(jsonPath, recordMapString);
  }));
  console.log('Notion Pages JSONs Updated');
};
main();
