const path = require("path");

module.exports = {
  mode: "development",
  devtool: false,
  entry: {
    main: "./src/main.js"
  },
  output: {
    filename: "main.js", //定义打包后的文件名称
    path: path.resolve(__dirname, "./dist") //必须是绝对路径
  }
};
