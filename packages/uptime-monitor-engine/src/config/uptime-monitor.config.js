module.exports = {
  checks: [
    {
      url: 'http://www.google.com',
      contentRequirements: [
        {
          type: 'text',
          value: 'google',
        },
      ],
    },
    {
      url: 'https://youtube.com',
      contentRequirements: [
        {
          type: 'text',
          value: 'youtube',
        },
      ],
    },
  ],
  interval: 60, //seconds
};
