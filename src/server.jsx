// eslint-disable-next-line no-undef
const express = require("express");
// eslint-disable-next-line no-undef
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Proxy request to the target API
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://menuapp.ru",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // Rewrite the '/api' path to ''
    },
  })
);

app.listen(5000, () => {
  console.log("Proxy server running on http://localhost:5000");
});
