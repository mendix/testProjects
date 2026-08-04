var __webpack_modules__ = ({});
// The module cache
var __webpack_module_cache__ = {};

// The require function
function __webpack_require__(moduleId) {

// Check if module is in cache
var cachedModule = __webpack_module_cache__[moduleId];
if (cachedModule !== undefined) {
return cachedModule.exports;
}
// Create a new module (and put it into the cache)
var module = (__webpack_module_cache__[moduleId] = {
id: moduleId,
loaded: false,
exports: {}
});
// Execute the module function
__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);

// Flag the module as loaded
module.loaded = true;
// Return the exports of the module
return module.exports;

}

// expose the modules object (__webpack_modules__)
__webpack_require__.m = __webpack_modules__;

// webpack/runtime/compat_get_default_export
(() => {
// getDefaultExport function for compatibility with non-ESM modules
__webpack_require__.n = (module) => {
	var getter = module && module.__esModule ?
		() => (module['default']) :
		() => (module);
	__webpack_require__.d(getter, { a: getter });
	return getter;
};

})();
// webpack/runtime/define_property_getters
(() => {
__webpack_require__.d = (exports, definition) => {
	for(var key in definition) {
        if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
            Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
    }
};
})();
// webpack/runtime/ensure_chunk
(() => {
__webpack_require__.f = {};
// This file contains only the entry chunk.
// The chunk loading function for additional chunks
__webpack_require__.e = (chunkId) => {
	return Promise.all(
		Object.keys(__webpack_require__.f).reduce((promises, key) => {
			__webpack_require__.f[key](chunkId, promises);
			return promises;
		}, [])
	);
};
})();
// webpack/runtime/export_webpack_require
var __webpack_require__temp = __webpack_require__;
export { __webpack_require__temp as __webpack_require__ };
// webpack/runtime/get javascript chunk filename
(() => {
// This function allow to reference chunks
__webpack_require__.u = (chunkId) => {
  // return url for filenames not based on template
  
  // return url for filenames based on template
  return "chunks/" + chunkId + "-" + "619880b7c05f756a" + ".js"
}
})();
// webpack/runtime/get mini-css chunk filename
(() => {
// This function allow to reference chunks
__webpack_require__.miniCssF = (chunkId) => {
  // return url for filenames not based on template
  
  // return url for filenames based on template
  return "" + chunkId + ".css"
}
})();
// webpack/runtime/global
(() => {
__webpack_require__.g = (() => {
	if (typeof globalThis === 'object') return globalThis;
	try {
		return this || new Function('return this')();
	} catch (e) {
		if (typeof window === 'object') return window;
	}
})();
})();
// webpack/runtime/has_own_property
(() => {
__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
})();
// webpack/runtime/make_namespace_object
(() => {
// define __esModule on exports
__webpack_require__.r = (exports) => {
	if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
	}
	Object.defineProperty(exports, '__esModule', { value: true });
};
})();
// webpack/runtime/node_module_decorator
(() => {
__webpack_require__.nmd = (module) => {
  module.paths = [];
  if (!module.children) module.children = [];
  return module;
};
})();
// webpack/runtime/auto_public_path
(() => {
var scriptUrl;

if (typeof import.meta.url === "string") scriptUrl = import.meta.url

// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration",
// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.',
if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");

__webpack_require__.p = scriptUrl + '../';

})();
// webpack/runtime/module_chunk_loading
(() => {
// no BaseURI
      // object to store loaded and loading chunks
      // undefined = chunk not loaded, null = chunk preloaded/prefetched
      // [resolve, Promise] = chunk loading, 0 = chunk loaded
      var installedChunks = {"runtime": 0,"widgets": 0,};
      var installChunk = (data) => {
    var __rspack_esm_ids = data.__rspack_esm_ids;
    var __webpack_modules__ = data.__webpack_modules__;
    var __rspack_esm_runtime = data.__rspack_esm_runtime;
    // add "modules" to the modules object,
    // then flag all "ids" as loaded and fire callback
    var moduleId, chunkId, i = 0;
    for (moduleId in __webpack_modules__) {
        if (__webpack_require__.o(__webpack_modules__, moduleId)) {
            __webpack_require__.m[moduleId] = __webpack_modules__[moduleId];
        }
    }
    if (__rspack_esm_runtime) __rspack_esm_runtime(__webpack_require__);
    for (; i < __rspack_esm_ids.length; i++) {
        chunkId = __rspack_esm_ids[i];
        if (__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
            installedChunks[chunkId][0]();
        }
        installedChunks[__rspack_esm_ids[i]] = 0;
    }
    
};
        __webpack_require__.f.j = function (chunkId, promises) {
          // import() chunk loading for javascript
var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
if (installedChunkData !== 0) { // 0 means "already installed".'
    // a Promise means "currently loading".
    if (installedChunkData) {
        promises.push(installedChunkData[1]);
    } else {
        if (!/^(runtime|widgets)$/.test(chunkId)) {
            // setup Promise in chunk cache
            var promise = import("../" + __webpack_require__.u(chunkId)).then(installChunk, (e) => {
                if (installedChunks[chunkId] !== 0) installedChunks[chunkId] = undefined;
                throw e;
            });
            var promise = Promise.race([promise, new Promise((resolve) => {
                installedChunkData = installedChunks[chunkId] = [resolve];
            })]);
            promises.push(installedChunkData[1] = promise);
        }
        else installedChunks[chunkId] = 0;

    }
}
        }
        
        __webpack_require__.C = installChunk;
        // no on chunks loaded
// no HMR
// no HMR manifest

})();
