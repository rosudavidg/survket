const validator = require("validator");

const { ServerError } = require("../errors");

const http = require("http");

const validateFields = (fields) => {
  for (let fieldName in fields) {
    let fieldValue = fields[fieldName].value;
    const fieldType = fields[fieldName].type;

    if (!fieldValue) {
      throw new ServerError(`Lipseste campul ${fieldName}`, 400);
    }

    switch (fieldType) {
      case "ascii":
        fieldValue += "";
        if (!validator.isAscii(fieldValue)) {
          throw new ServerError(`Campul ${fieldName} trebuie sa contina doar caractere ascii`, 400);
        }
        break;
      case "alpha":
        fieldValue += "";
        if (!validator.isAlpha(fieldValue)) {
          throw new ServerError(`Campul ${fieldName} trebuie sa contina doar litere`, 400);
        }
        break;
      case "int":
        fieldValue += "";
        if (!validator.isInt(fieldValue)) {
          throw new ServerError(`Campul ${fieldName} trebuie sa fie un numar intreg`, 400);
        }
        break;
      case "jwt":
        fieldValue += "";
        if (!validator.isJWT(fieldValue)) {
          throw new ServerError(`Campul ${fieldName} trebuie sa fie jwt`, 400);
        }
        break;
      case "date":
        fieldValue += "";
        if (!validator.toDate(fieldValue)) {
          throw new ServerError(`Campul ${fieldName} trebuie sa fie date`, 400);
        }
        break;
      case "email":
        fieldValue += "";
        if (!validator.isEmail(fieldValue)) {
          throw new ServerError(`Campul ${fieldName} trebuie sa fie email`, 400);
        }
        break;
      case "gender":
        fieldValue += "";
        if (fieldValue !== "M" && fieldValue !== "F") {
          throw new ServerError(`Campul ${fieldName} trebuie sa fie gender`, 400);
        }
        break;
      case "password":
        fieldValue += "";
        if (!validator.isAscii(fieldValue)) {
          throw new ServerError(`Campul ${fieldName} trebuie sa fie gender`, 400);
        }
        break;
      case "array":
        if (!Array.isArray(fieldValue)) {
          throw new ServerError(`Campul ${fieldName} trebuie sa fie array`, 400);
        }
        break;
    }
  }
};

const sendConfirmationLink = async (email, token) => {
  const options = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    path: `/?email=${email}&token=${token}`,
    method: "GET",
  };

  await http
    .request(options, function (res) {
      console.log("STATUS: " + res.statusCode);
      console.log("HEADERS: " + JSON.stringify(res.headers));
      res.setEncoding("utf8");
      res.on("data", function (chunk) {
        console.log("BODY: " + chunk);
      });
    })
    .end();
};

function generateToken() {
  // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 64; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = {
  validateFields,
  sendConfirmationLink,
  generateToken,
};
