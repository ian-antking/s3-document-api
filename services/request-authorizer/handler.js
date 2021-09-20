exports.run = async (event) => {
  const { PASSWORD } = process.env;
  const { authorization } = event.headers;

  const response = { isAuthorized: PASSWORD === authorization };

  return response;
};
