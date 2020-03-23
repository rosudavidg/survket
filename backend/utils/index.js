const validator = require("validator");

const { ServerError } = require("../errors");

const validateFields = fields => {
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
          throw new ServerError(
            `Campul ${fieldName} trebuie sa contina doar caractere ascii`,
            400
          );
        }
        break;
      case "alpha":
        fieldValue += "";
        if (!validator.isAlpha(fieldValue)) {
          throw new ServerError(
            `Campul ${fieldName} trebuie sa contina doar litere`,
            400
          );
        }
        break;
      case "int":
        fieldValue += "";
        if (!validator.isInt(fieldValue)) {
          throw new ServerError(
            `Campul ${fieldName} trebuie sa fie un numar intreg`,
            400
          );
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
          throw new ServerError(
            `Campul ${fieldName} trebuie sa fie email`,
            400
          );
        }
        break;
      case "gender":
        fieldValue += "";
        if (fieldValue !== "M" && fieldValue !== "F") {
          throw new ServerError(
            `Campul ${fieldName} trebuie sa fie gender`,
            400
          );
        }
        break;
      case "password":
        fieldValue += "";
        if (!validator.isAscii(fieldValue)) {
          throw new ServerError(
            `Campul ${fieldName} trebuie sa fie gender`,
            400
          );
        }
        break;
      case "array":
        if (!Array.isArray(fieldValue)) {
          throw new ServerError(
            `Campul ${fieldName} trebuie sa fie array`,
            400
          );
        }
        break;
    }
  }
};

module.exports = {
  validateFields
};
