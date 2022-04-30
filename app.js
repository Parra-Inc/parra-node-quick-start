const assert = require("assert");
const express = require("express");

const { AccessToken } = require("@parra/access-token");

// TODO: - Replace with your keys
const parraTenantId = process.env.PARRA_TENANT_ID;
const parraApiKeyId = process.env.PARRA_API_KEY_ID;
const parraApiKeySecret = process.env.PARRA_API_SECRET;

assert(parraTenantId, parraApiKeyId, parraApiKeySecret);

const app = express();

// TODO: - Replace with your authentication middleware
const authenticationMiddleware = (req, res, next) => {
  // Fake auth
  req.user = {
    id: "not-a-real-user-id",
  };

  next();
};

app.use(authenticationMiddleware);

app.post("/v1/parra/auth/token", (req, res) => {
  // TODO: - Extract user id from request using your authentication method
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
