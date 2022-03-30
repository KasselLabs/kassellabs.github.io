import get from 'lodash/get';
import queryString from 'query-string';

const internalPaths = {
  home: '/',
  introCreators: '/#introCreators',
  blog: '/#blog',
  about: '/about',
  contact: '/contact',
};

const externalPaths = {
  faq: 'https://help.kassellabs.io',
  instagram: 'https://www.instagram.com/kassellabs/',
  facebook: 'https://www.facebook.com/KasselLabs/',
  twitter: 'https://twitter.com/KasselLabs',
  linkedin: 'https://linkedin.com/company/kassellabs',
  privacyPolicy: 'https://help.kassellabs.io/privacy/',
  starWarsIntroCreator: 'https://starwarsintrocreator.kassellabs.io',
  strangerThingsIntroCreator: 'https://strangerthingsintrocreator.kassellabs.io/',
  westworldIntroCreator: 'https://westworldintrocreator.kassellabs.io/',
  gameOfThronesIntroCreator: 'https://gameofthronesintrocreator.kassellabs.io',
  ejector: 'https://ejector.kassellabs.io',
  breakingBad: 'https://breakingbadintrocreator.kassellabs.io',
  brunoLinkedin: 'https://www.linkedin.com/in/brorlandi/',
  niheyLinkedin: 'https://www.linkedin.com/in/nihey/',
};

const getPath = ({ pathName, query, paths }) => {
  const path = get(paths, pathName);

  if (!path) {
    throw new Error(`Path '${pathName}' is not defined`);
  }

  if (query) {
    return `${path}?${queryString.stringify(query)}`;
  }

  return path;
};

export const internalPath = (pathName, query) => (
  getPath({ pathName, query, paths: internalPaths })
);

export const externalPath = (pathName, query) => (
  getPath({ pathName, query, paths: externalPaths })
);
