const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../server/public"),
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5005",
      },
    },
  },
};

//const { defineConfig } = require('@vue/cli-service')
//module.exports = defineConfig({
//transpileDependencies: true
//})
