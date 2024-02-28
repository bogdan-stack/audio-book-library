require('dotenv').config();

const generateMagicLink = (token) => {
    const url = `${process.env.URL}/verify?token=${token}`;
    return url;
  };

  module.exports = generateMagicLink;