exports.goodResponse = (response, message) => {
  return {
    statusCode: 200,
    message,
    isError: false,
    responseException: null,
    ...response,
  };
};

exports.failedResponse = (
  message,
  statusCode = 401,
  responseException = ''
) => {
  return {
    statusCode,
    message,
    isError: true,
    responseException,
    result: null,
  };
};
