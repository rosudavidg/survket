const jwt = require("jsonwebtoken");
const { ServerError } = require("../../errors/index.js");
const { validateFields } = require("../../utils");

const secretKey = process.env.JWT_SECRET_KEY;

const options = {
  issuer: process.env.JWT_ISSUER,
  subject: process.env.JWT_SUBJECT,
  audience: process.env.JWT_AUDIENCE,
  expiresIn: process.env.JWT_EXPIRESIN
};

const generateToken = async payload => {
  try {
    const token = await jwt.sign(payload, secretKey, options);
    return token;
  } catch (err) {
    throw new ServerError("Token generation error.", 400);
  }
};

const verifyAndDecodeData = async token => {
  try {
    const decoded = await jwt.verify(token, secretKey, options);
    return decoded;
  } catch (err) {
    throw new ServerError("Eroare la decriptarea tokenului!", 400);
  }
};

const authorizeAndExtractToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new ServerError("Lipseste headerul de autorizare!", 403);
    }
    const token = req.headers.authorization.split(" ")[1];

    validateFields({
      jwt: {
        value: token,
        type: "jwt"
      }
    });

    const decoded = await verifyAndDecodeData(token);

    req.state = {
      decoded
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  generateToken,
  authorizeAndExtractToken
};
