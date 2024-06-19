/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const main = async () => {
  console.log('Fetching Intros...');
  const response = await axios.request({
    url: 'https://api.kassellabs.io/api/intro-types',
  });

  fs.writeFileSync(
    path.join(__dirname, 'src', 'contants', 'intros.json'),
    JSON.stringify(response.data, null, 2),
  );
  console.log('Updated Intros!');
};
main();
