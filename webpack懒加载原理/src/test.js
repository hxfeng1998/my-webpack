self["webpackChunkstudy"].push([
  ["src_test_js"],
  {
    "./src/test.js": (modules, exports, require) => {
      require.defineProperty(exports, {
        default: () => WEBPACK_DEFAULT_EXPORT,
      });
      const WEBPACK_DEFAULT_EXPORT = () => {
        console.log("按钮点击了");
      };
    },
  },
]);
