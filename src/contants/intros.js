const OTHER_INTROS = [
  {
    title: 'Marvel Studios',
    slug: 'marvel-studios',
    youtubePreviewCode: 'FbtNCJUwDJg',
    price: () => 40,
    resolution: 'Full HD (1920x1080)',
    optionals: [
      {
        id: '4k-resolution',
        label: '4K Ultra HD Resolution',
        price: 10,
      },
      {
        id: 'image-and-video-customization',
        label: 'Change Images and Videos within the intro',
        price: 20,
      },
    ],
    fields: [
      {
        id: 'left-title',
        type: 'text',
        label: 'Left Title (Up to 10 Characters)',
        placeholder: 'Kassel',
        required: true,
        maxLength: 10,
      },
      {
        id: 'right-title',
        type: 'text',
        label: 'Right Title (Up to 10 Characters)',
        placeholder: 'Labs',
        required: true,
        maxLength: 10,
      },
    ],
  },
  {
    title: 'Harry Potter',
    slug: 'harry-potter',
    youtubePreviewCode: '_OYC9GST2Ac',
    price: () => 20,
    resolution: 'Full HD (1920x1080)',
    optionals: [],
    fields: [],
  },
  {
    title: 'Pixar',
    slug: 'pixar',
    youtubePreviewCode: '1TJ6c8Vudq0',
    price: () => 20,
    resolution: 'Full HD (1920x1080)',
    optionals: [],
    fields: [],
  },
  {
    title: 'Avengers - Infinity War',
    slug: 'avengers-infinity-war',
    youtubePreviewCode: 'Jgf52hmKso8',
    price: () => 20,
    resolution: 'Full HD (1920x1080)',
    optionals: [],
    fields: [],
  },
  {
    title: 'Spider Man Far From Home',
    slug: 'spider-man-far-from-home',
    youtubePreviewCode: 'K33boOl7DkE',
    price: () => 20,
    resolution: 'Full HD (1920x1080)',
    optionals: [],
    fields: [],
  },
  {
    title: 'Loki',
    slug: 'loki',
    youtubePreviewCode: 'Gu198AY0qYI',
    price: () => 20,
    resolution: 'Full HD (1920x1080)',
    optionals: [],
    fields: [],
  },
];

// Has to be done this way to be compatible with Gatsby Node
module.exports = {
  // eslint-disable-next-line import/prefer-default-export
  OTHER_INTROS,
};
