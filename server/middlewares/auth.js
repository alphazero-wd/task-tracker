const jwt = require('jsonwebtoken');
const auth = async (req, res, next) => {
  try {
    const authHeaders = req.headers.authorization;
    if (!authHeaders || !authHeaders.startsWith('Bearer '))
      return res.status(400).json({
        message: 'No Token Provided',
      });

    const token = authHeaders.split(' ')[1];
    const isCustomToken = token.length < 500;
    let decodedData;
    if (token && isCustomToken) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = auth;
