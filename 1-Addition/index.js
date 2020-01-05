const add = ({ num1, num2 }) => {
  return num1 + num2;
};

const main = async event => {
  console.log('Event:', event);
  return add(event);
};
exports.handler = main;