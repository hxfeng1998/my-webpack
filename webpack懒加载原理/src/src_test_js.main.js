// webpackChunk + package.json文件中的name拼接而成
(self["webpackChunkmy_webpack"] = self["webpackChunkmy_webpack"] || []).push([
  ["src_test_js"],
  {
    "./src/test.js": (module, exports, require) => {
      // Object.defineProperty(exports, "default", {
      //   enumerable: true,
      //   get: () => WEBPACK_DEFAULT_EXPORT
      // });
      const WEBPACK_DEFAULT_EXPORT = () => {
        console.log("按钮点击了");
      };
      exports.default = () => WEBPACK_DEFAULT_EXPORT;
    }
  }
]);
