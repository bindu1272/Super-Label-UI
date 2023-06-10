const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api/*",
    createProxyMiddleware({
      target: "http://localhost:9300/api/v1/register",
      changeOrigin: true,
    })
  );
};
