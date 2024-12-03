// 模块懒加载整体思路
/**
 * 1.通过jsonp的方式加载对应模块的文件
 * 2.执行加载回来的文件，把这个新的模块加到webpack的modules中
 * 3.通过require去加载这个模块
 * 4.拿到模块导出的内容
 */

const modules = {
  "./src/main.js": (module, exports, require) => {
    const buttonEle = document.getElementById("button");
    buttonEle.onclick = function () {
      //src_test_js是test.js打包后的chunkName
      require
        .e("src_test_js")
        .then(require.bind(require, "./src/test.js"))
        .then(module => {
          const print = module.default;
          print();
        });
    };
  }
};

const cache = {};

// 已经安装好的代码块，0表示已经加载成功
const installedChunks = {
  main: 0
};

function require(moduleId) {
  if (cache[moduleId] !== undefined) {
    return cache[moduleId].exports;
  }
  const module = (cache[moduleId] = {
    exports: {}
  });
  modules[moduleId](module, module.exports, require);
  return module.exports;
}

require.defineProperty = function (exports, definition) {
  for (const key in definition) {
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: definition[key]
    });
  }
};

require.e = function (chunkId) {
  let promises = [];
  require.j(chunkId, promises);
  return Promise.all(promises);
};

// 这里传入的是src_text_js
require.j = function (chunkId, promises) {
  if (installedChunks[chunkId] === 0) {
    return;
  }
  let promise = new Promise((resolve, reject) => {
    installedChunks[chunkId] = [resolve, reject]; //此时installedChunks={ main: 0, "src_test_js":[ resolve, reject ]}
  });
  promises.push(promise);

  const url = "./webpack懒加载原理/src/src_test_js.main.js";
  const script = document.createElement("script");
  script.src = url;
  document.head.append(script);
};

function webpackJsonpCallback([chunkIds, moreModules]) {
  const resolves = [];
  for (let i = 0; i < chunkIds.length; i++) {
    const chunkId = chunkIds[i];
    resolves.push(installedChunks[chunkId][0]);
    installedChunks[chunkId] = 0;
  }

  for (const moduleId in moreModules) {
    modules[moduleId] = moreModules[moduleId];
  }

  while (resolves.length) {
    resolves.shift()();
  }
}

window.webpackChunkmy_webpack = [];

window.webpackChunkmy_webpack.push = webpackJsonpCallback;

require("./src/main.js");
