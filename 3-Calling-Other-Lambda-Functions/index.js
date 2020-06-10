const AWS = require("aws-sdk");
const lambda = new AWS.Lambda({ region: "us-east-1" });

const add = async (num1, num2) => {
  return await new Promise((resolve, reject) => {
    const params = {
      FunctionName: "add-function",
      Payload: JSON.stringify({
        num1,
        num2,
      }),
    };

    lambda.invoke(params, (err, results) => {
      if (err) reject(err);
      else resolve(results.Payload);
    });
  });
};

const main = async (event) => {
  console.log("Event:", event);
  return add(event.num1, event.num2);
};
exports.handler = main;
