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
      url: 'http://localhost:3333',
      contentRequirements: [
        {
          type: 'text',
          value: 'google',
        },
      ],
    },
  ],
  interval: 10, //seconds
};
