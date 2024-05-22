const OTHER_INTROS = [
  {
    title: 'Marvel Studios',
    slug: 'marvel-studios',
    deliveryTime: '2-3 Days',
    youtubePreviewCode: 'FbtNCJUwDJg',
    price: () => 40,
    resolution: 'Full HD (1920x1080)',
    optionals: [
      {
        id: '4k-resolution',
        label: '4K Ultra HD Resolution',
        description: '\n  - Your intro will come in Ultra HD resolution (3840x2160)',
        price: 10,
      },
      {
        id: 'image-and-video-customization',
        label: 'Change Images and Videos within the intro',
        description: `
  - Change up to 20 Images in 1280×720 px for the initial comic before the characters appear.
  - Change up to 10 Images of characters representing the Marvel Characters.
  - Change up to 10 Videos inside the letters in the final part of the clip.
  - These videos and images can be sent after the purchase
`,
        price: 20,
      },
    ],
    fields: [
      {
        id: 'left-title',
        type: 'text',
        label: 'Left Title',
        placeholder: 'Kassel',
        required: true,
        maxLength: 10,
      },
      {
        id: 'right-title',
        type: 'text',
        label: 'Right Title',
        placeholder: 'Labs',
        required: true,
        maxLength: 10,
      },
    ],
  },
  {
    title: 'Harry Potter',
    slug: 'harry-potter',
    deliveryTime: '1-2 Days',
    youtubePreviewCode: '_OYC9GST2Ac',
    price: () => 14,
    resolution: 'Full HD (1920x1080)',
    optionals: [
      {
        id: '4k-resolution',
        label: '4K Ultra HD Resolution',
        description: '\n  - Your intro will come in Ultra HD resolution (3840x2160)',
        price: 6,
      },
      {
        id: 'colors-customization',
        label: 'Change the colors of your text',
        description: '\n  - You can customize your text and intro to the color of your choice',
        price: 6,
      },
    ],
    fields: [
      {
        id: 'title',
        type: 'text',
        label: 'Title',
        placeholder: 'Kassel Labs',
        required: true,
        maxLength: 25,
      },
    ],
  },
  {
    title: 'Pixar',
    slug: 'pixar',
    deliveryTime: '1-2 Days',
    youtubePreviewCode: '1TJ6c8Vudq0',
    price: () => 20,
    resolution: 'Full HD (1920x1080)',
    optionals: [
      {
        id: '4k-resolution',
        label: '4K Ultra HD Resolution',
        description: '\n  - Your intro will come in Ultra HD resolution (3840x2160)',
        price: 6,
      },
    ],
    fields: [
      {
        id: 'title',
        type: 'text',
        label: 'Title',
        placeholder: 'Kassel Labs',
        required: true,
        maxLength: 10,
      },
      {
        id: 'subtitle',
        type: 'text',
        label: 'Subtitle',
        placeholder: '(appearing right below Labs)',
        required: true,
        maxLength: 25,
      },
    ],
  },
  {
    title: 'Avengers - Infinity War',
    slug: 'avengers-infinity-war',
    deliveryTime: '1-2 Days',
    youtubePreviewCode: 'Jgf52hmKso8',
    price: () => 20,
    resolution: 'Full HD (1920x1080)',
    optionals: [
      {
        id: '4k-resolution',
        label: '4K Ultra HD Resolution',
        description: '\n  - Your intro will come in Ultra HD resolution (3840x2160)',
        price: 6,
      },
    ],
    fields: [
      {
        id: 'title',
        type: 'text',
        label: 'Title',
        placeholder: 'Kassel Labs',
        required: true,
        maxLength: 10,
      },
      {
        id: 'subtitle',
        type: 'text',
        label: 'Subtitle',
        placeholder: 'Custom Intros',
        required: true,
        maxLength: 20,
      },
    ],
  },
  {
    title: 'Spider Man Far From Home',
    slug: 'spider-man-far-from-home',
    deliveryTime: '1-2 Days',
    youtubePreviewCode: 'K33boOl7DkE',
    price: () => 20,
    resolution: 'Full HD (1920x1080)',
    optionals: [
      {
        id: '4k-resolution',
        label: '4K Ultra HD Resolution',
        description: '\n  - Your intro will come in Ultra HD resolution (3840x2160)',
        price: 6,
      },
    ],
    fields: [
      {
        id: 'title',
        type: 'text',
        label: 'Title',
        placeholder: 'Kassel Labs',
        required: true,
        maxLength: 10,
      },
      {
        id: 'subtitle',
        type: 'text',
        label: 'Subtitle',
        placeholder: 'Custom Intros',
        required: true,
        maxLength: 12,
      },
    ],
  },
  {
    title: 'Loki',
    slug: 'loki',
    deliveryTime: '1-2 Days',
    youtubePreviewCode: 'Gu198AY0qYI',
    price: () => 10,
    resolution: 'Full HD (1920x1080)',
    optionals: [
      {
        id: '4k-resolution',
        label: '4K Ultra HD Resolution',
        description: '\n  - Your intro will come in Ultra HD resolution (3840x2160)',
        price: 5,
      },
    ],
    fields: [
      {
        id: 'title',
        type: 'text',
        label: 'Title',
        placeholder: 'Kassel',
        required: true,
        maxLength: 10,
      },
      {
        id: 'subtitle',
        type: 'text',
        label: 'Subtitle',
        placeholder: 'Labs',
        required: true,
        maxLength: 10,
      },
    ],
  },
];

// Has to be done this way to be compatible with Gatsby Node
module.exports = {
  // eslint-disable-next-line import/prefer-default-export
  OTHER_INTROS,
};
