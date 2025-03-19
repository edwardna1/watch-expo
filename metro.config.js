const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

// Allow `.cjs` files to be resolved
defaultConfig.resolver.sourceExts.push("cjs");

// Enable network debugging and proxying for local API requests
defaultConfig.server = {
  enhanceMiddleware: (middleware, server) => {
    return (req, res, next) => {
      // Allow CORS for debugging
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

      return middleware(req, res, next);
    };
  },
};

module.exports = defaultConfig;
