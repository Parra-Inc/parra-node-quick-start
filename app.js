const assert = require("assert");
const express = require("express");

const { AccessToken } = require("@parra/access-token");

// TODO: - Replace with your keys
const parraTenantId = process.env.PARRA_TENANT_ID;
const parraApiKeyId = process.env.PARRA_API_KEY_ID;
const parraApiKeySecret = process.env.PARRA_API_SECRET;

assert(parraTenantId, parraApiKeyId, parraApiKeySecret);

const app = express();

const authenticationMiddleware = (req, res, next) => {
  const token = req.headers['Authorization'];

  if (!token) {
    const err = new Error('Authorization header missing');
    err.statusCode = 401; // Unauthorized

    return next(err);
  }

  // To keep the example simple, the app is just sending a user id as the authorization
  // header. Normally, you would use your app's own authorization API to obtain an access
  // token. This access token would be passed as the authorization header to this
  // endpoint, and would be decoded to access the user id.
  const [_, userId] = token.split(' ');

  // Fake auth
  req.user = {
    id: userId,
  };

  next();
};

app.use(authenticationMiddleware);

app.post("/v1/parra/auth/token", (req, res) => {
  const userId = req.user.id;

  console.log(`Generating access token for user: ${userId}`);

  // Create an access token which we will sign and return to the client
  const token = new AccessToken(
    parraTenantId,
    parraApiKeyId,
    parraApiKeySecret,
    { identity: userId }
  );

  // Create a JWT from the Access Token
  res.json({
    access_token: token.toJwt(),
  });
});

module.exports = app;
