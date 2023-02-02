const messages = {
  ...require('./user.messages'),
};

const getMessage = (key) => {
  const message = messages[key];

  if (!message) return 'No Such Key Found!';

  return message;
}

module.exports = { getMessage };