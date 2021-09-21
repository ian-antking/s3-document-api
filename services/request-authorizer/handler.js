exports.run = async (event) => {
  const { PASSWORD } = process.env;
  const { authorization } = event.headers;

  return {
    principalId: 'user',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: PASSWORD === authorization ? 'Allow' : 'Deny',
          Resource: event.routeArn,
        },
      ],
    },
  };
};
