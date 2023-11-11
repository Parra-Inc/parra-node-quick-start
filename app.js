const assert = require("assert");
const express = require("express");
const uuid = require("uuid").v4;

const { AccessToken } = require("@parra/access-token");

// TODO: - Replace with your keys
const parraTenantId = "4caab3fe-d0e7-4bc3-9d0a-4b36f32bd1b7"; // process.env.PARRA_TENANT_ID;
const parraApiKeyId = "d7aabbc8-674d-4a13-8e15-1c51fa06aff8"; // process.env.PARRA_API_KEY_ID;
const parraApiKeySecret =
  "sk_live_X9MylRzJUYZJbkQ3TzyPoh6wdVkpVGh9SmnRDfrxkl3vxXFFeXOmH01tEijhlKRz"; // process.env.PARRA_API_SECRET;

assert(parraTenantId, parraApiKeyId, parraApiKeySecret);

const app = express();
const userId = uuid();

// TODO: - Replace with your authentication middleware
const authenticationMiddleware = (req, res, next) => {
  // Fake auth
  req.user = {
    id: userId,
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
