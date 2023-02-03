const messages = {
  ...require('./user.messages'),
};

const getMessage = (key) => {
  const message = messages[key];

  // If no such message key is found return this message.
  if (!message) return 'No Such Key Found!';

  return message;
}

module.exports = { getMessage };