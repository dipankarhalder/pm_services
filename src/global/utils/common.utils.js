const { StatusCodes } = require('http-status-codes');
const { msgConst } = require('../constant');

const globalError = (res, error) => {
  res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR);
  res.json({
    error: { message: error.message },
  });
};

const missingRoutes = (next) => {
  const error = new Error(msgConst.server.notFound);
  error.status = StatusCodes.NOT_FOUND;
  next(error);
};

const sendErrorResponse = (res, error) => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    message: msgConst.server.somethingWrong,
    error: error.message,
  });
};

const validateFields = (res, messages) => {
  return res.status(StatusCodes.BAD_REQUEST).json({
    status: StatusCodes.BAD_REQUEST,
    message: messages,
  });
};

const notFoundItem = (res, messages) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    status: StatusCodes.NOT_FOUND,
    message: messages,
  });
};

module.exports = {
  globalError,
  missingRoutes,
  sendErrorResponse,
  validateFields,
  notFoundItem,
};
