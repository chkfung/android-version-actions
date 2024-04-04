/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 396:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 716:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(396);
const github = __nccwpck_require__(716);
const fs = __nccwpck_require__(147);

// versionCode — A positive integer [...] -> https://developer.android.com/studio/publish/versioning
const versionCodeRegexPattern = /(versionCode(?:\s|=)*)(.*)/;
// versionName — A string used as the version number shown to users [...] -> https://developer.android.com/studio/publish/versioning
const versionNameRegexPattern = /(versionName(?:\s|=)*)(.*)/;

try {
    const gradlePath = core.getInput('gradlePath');
    const versionCode = core.getInput('versionCode');
    const versionName = core.getInput('versionName');
    console.log(`Gradle Path : ${gradlePath}`);
    console.log(`Version Code : ${versionCode}`);
    console.log(`Version Name : ${versionName}`);

    fs.readFile(gradlePath, 'utf8', function (err, data) {
        newGradle = data;
        if (versionCode.length > 0)
            newGradle = newGradle.replace(versionCodeRegexPattern, `$1${versionCode}`);
        if (versionName.length > 0)
            newGradle = newGradle.replace(versionNameRegexPattern, `$1\"${versionName}\"`);
        fs.writeFile(gradlePath, newGradle, function (err) {
            if (err) throw err;
            if (versionCode.length > 0)
                console.log(`Successfully override version code ${versionCode}`)
            if (versionName.length > 0)
                console.log(`Successfully override version code ${versionName}`)
            core.setOutput("result", `Done`);
        });
    });

} catch (error) {
    core.setFailed(error.message);
}

})();

module.exports = __webpack_exports__;
/******/ })()
;