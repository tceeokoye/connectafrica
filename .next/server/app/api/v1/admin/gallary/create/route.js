"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/v1/admin/gallary/create/route";
exports.ids = ["app/api/v1/admin/gallary/create/route"];
exports.modules = {

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fv1%2Fadmin%2Fgallary%2Fcreate%2Froute&page=%2Fapi%2Fv1%2Fadmin%2Fgallary%2Fcreate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fv1%2Fadmin%2Fgallary%2Fcreate%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5COneDrive%5CDesktop%5Cproject2%5Cconnect%20africa%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5COneDrive%5CDesktop%5Cproject2%5Cconnect%20africa&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fv1%2Fadmin%2Fgallary%2Fcreate%2Froute&page=%2Fapi%2Fv1%2Fadmin%2Fgallary%2Fcreate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fv1%2Fadmin%2Fgallary%2Fcreate%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5COneDrive%5CDesktop%5Cproject2%5Cconnect%20africa%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5COneDrive%5CDesktop%5Cproject2%5Cconnect%20africa&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_HP_OneDrive_Desktop_project2_connect_africa_src_app_api_v1_admin_gallary_create_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/v1/admin/gallary/create/route.ts */ \"(rsc)/./src/app/api/v1/admin/gallary/create/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/v1/admin/gallary/create/route\",\n        pathname: \"/api/v1/admin/gallary/create\",\n        filename: \"route\",\n        bundlePath: \"app/api/v1/admin/gallary/create/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\HP\\\\OneDrive\\\\Desktop\\\\project2\\\\connect africa\\\\src\\\\app\\\\api\\\\v1\\\\admin\\\\gallary\\\\create\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_HP_OneDrive_Desktop_project2_connect_africa_src_app_api_v1_admin_gallary_create_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/v1/admin/gallary/create/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZ2MSUyRmFkbWluJTJGZ2FsbGFyeSUyRmNyZWF0ZSUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGdjElMkZhZG1pbiUyRmdhbGxhcnklMkZjcmVhdGUlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZ2MSUyRmFkbWluJTJGZ2FsbGFyeSUyRmNyZWF0ZSUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNIUCU1Q09uZURyaXZlJTVDRGVza3RvcCU1Q3Byb2plY3QyJTVDY29ubmVjdCUyMGFmcmljYSU1Q3NyYyU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDSFAlNUNPbmVEcml2ZSU1Q0Rlc2t0b3AlNUNwcm9qZWN0MiU1Q2Nvbm5lY3QlMjBhZnJpY2EmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQytEO0FBQzVJO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY29ubmVjdC1hZnJpY2EtbmV4dC8/OWEyZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxIUFxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXHByb2plY3QyXFxcXGNvbm5lY3QgYWZyaWNhXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXHYxXFxcXGFkbWluXFxcXGdhbGxhcnlcXFxcY3JlYXRlXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS92MS9hZG1pbi9nYWxsYXJ5L2NyZWF0ZS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3YxL2FkbWluL2dhbGxhcnkvY3JlYXRlXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS92MS9hZG1pbi9nYWxsYXJ5L2NyZWF0ZS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXEhQXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxccHJvamVjdDJcXFxcY29ubmVjdCBhZnJpY2FcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcdjFcXFxcYWRtaW5cXFxcZ2FsbGFyeVxcXFxjcmVhdGVcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL3YxL2FkbWluL2dhbGxhcnkvY3JlYXRlL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fv1%2Fadmin%2Fgallary%2Fcreate%2Froute&page=%2Fapi%2Fv1%2Fadmin%2Fgallary%2Fcreate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fv1%2Fadmin%2Fgallary%2Fcreate%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5COneDrive%5CDesktop%5Cproject2%5Cconnect%20africa%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5COneDrive%5CDesktop%5Cproject2%5Cconnect%20africa&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/v1/admin/gallary/create/route.ts":
/*!******************************************************!*\
  !*** ./src/app/api/v1/admin/gallary/create/route.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   dynamic: () => (/* binding */ dynamic)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./src/lib/db.ts\");\n/* harmony import */ var _lib_cloudinary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/cloudinary */ \"(rsc)/./src/lib/cloudinary.ts\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _config_cors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/config/cors */ \"(rsc)/./src/config/cors.ts\");\n\n\n\n\n\nconst dynamic = \"force-dynamic\";\nconst ALLOWED_CATEGORIES = [\n    \"Outreach\",\n    \"Team\",\n    \"Community\",\n    \"Elderly\",\n    \"Empowerment\",\n    \"Children\",\n    \"Education\",\n    \"Healthcare\",\n    \"Infrastructure\",\n    \"Events\",\n    \"Others\"\n];\nasync function POST(req) {\n    try {\n        /* ================= CORS ================= */ const origin = req.headers.get(\"origin\");\n        if (origin && !_config_cors__WEBPACK_IMPORTED_MODULE_4__.ALLOWED_ORIGINS.includes(origin)) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                message: \"CORS policy: Origin not allowed\"\n            }, {\n                status: 403\n            });\n        }\n        // --- AUTH ---\n        const authHeader = req.headers.get(\"authorization\");\n        const token = authHeader?.split(\" \")[1];\n        if (!token) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                message: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        try {\n            jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default().verify(token, process.env.JWT_SECRET);\n        } catch  {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                message: \"Invalid or expired token\"\n            }, {\n                status: 401\n            });\n        }\n        // --- BODY ---\n        const { title, category, type, imageBase64, videoBase64, thumbnailBase64 } = await req.json();\n        // --- VALIDATION ---\n        if (!title) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            message: \"Title is required\"\n        }, {\n            status: 400\n        });\n        if (!category || !ALLOWED_CATEGORIES.includes(category)) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            message: \"Invalid category\"\n        }, {\n            status: 400\n        });\n        if (!type || ![\n            \"image\",\n            \"video\"\n        ].includes(type)) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            message: \"Invalid media type\"\n        }, {\n            status: 400\n        });\n        if (type === \"image\" && !imageBase64) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            message: \"Image file is required\"\n        }, {\n            status: 400\n        });\n        if (type === \"video\" && !videoBase64) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            message: \"Video file is required\"\n        }, {\n            status: 400\n        });\n        // --- CLOUDINARY ---\n        let imageUrl = null;\n        let videoUrl = null;\n        let thumbnailUrl = null;\n        if (type === \"image\") {\n            const upload = await _lib_cloudinary__WEBPACK_IMPORTED_MODULE_2__[\"default\"].uploader.upload(imageBase64, {\n                folder: \"gallery/images\",\n                resource_type: \"image\"\n            });\n            imageUrl = upload.secure_url;\n        }\n        if (type === \"video\") {\n            // upload video\n            const videoUpload = await _lib_cloudinary__WEBPACK_IMPORTED_MODULE_2__[\"default\"].uploader.upload(videoBase64, {\n                folder: \"gallery/videos\",\n                resource_type: \"video\"\n            });\n            videoUrl = videoUpload.secure_url;\n            // upload optional thumbnail\n            if (thumbnailBase64) {\n                const thumbUpload = await _lib_cloudinary__WEBPACK_IMPORTED_MODULE_2__[\"default\"].uploader.upload(thumbnailBase64, {\n                    folder: \"gallery/thumbnails\",\n                    resource_type: \"image\"\n                });\n                thumbnailUrl = thumbUpload.secure_url;\n            }\n        }\n        // --- DATABASE ---\n        const client = await _lib_db__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n        const db = client.db(\"connect_africa\");\n        const collection = db.collection(\"gallery\");\n        const media = {\n            title,\n            category,\n            type,\n            src: type === \"image\" ? imageUrl : videoUrl,\n            thumbnail: thumbnailUrl,\n            createdAt: new Date(),\n            updatedAt: new Date()\n        };\n        const result = await collection.insertOne(media);\n        const createdMedia = await collection.findOne({\n            _id: result.insertedId\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            message: \"Media uploaded successfully\",\n            media: createdMedia\n        });\n    } catch (err) {\n        console.error(\"Gallery upload error:\", err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            message: err.message || \"Internal Server Error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS92MS9hZG1pbi9nYWxsYXJ5L2NyZWF0ZS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUF3RDtBQUNuQjtBQUNLO0FBQ1g7QUFDaUI7QUFFekMsTUFBTUssVUFBVSxnQkFBZ0I7QUFFdkMsTUFBTUMscUJBQXFCO0lBQ3pCO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7Q0FDRDtBQUVNLGVBQWVDLEtBQUtDLEdBQWdCO0lBQ3pDLElBQUk7UUFDRiw0Q0FBNEMsR0FDNUMsTUFBTUMsU0FBU0QsSUFBSUUsT0FBTyxDQUFDQyxHQUFHLENBQUM7UUFDL0IsSUFBSUYsVUFBVSxDQUFDTCx5REFBZUEsQ0FBQ1EsUUFBUSxDQUFDSCxTQUFTO1lBQy9DLE9BQU9ULHFEQUFZQSxDQUFDYSxJQUFJLENBQ3RCO2dCQUFFQyxTQUFTO2dCQUFPQyxTQUFTO1lBQWtDLEdBQzdEO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxlQUFlO1FBQ2YsTUFBTUMsYUFBYVQsSUFBSUUsT0FBTyxDQUFDQyxHQUFHLENBQUM7UUFDbkMsTUFBTU8sUUFBUUQsWUFBWUUsTUFBTSxJQUFJLENBQUMsRUFBRTtRQUV2QyxJQUFJLENBQUNELE9BQU87WUFDVixPQUFPbEIscURBQVlBLENBQUNhLElBQUksQ0FDdEI7Z0JBQUVDLFNBQVM7Z0JBQU9DLFNBQVM7WUFBZSxHQUMxQztnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsSUFBSTtZQUNGYiwwREFBVSxDQUFDZSxPQUFPRyxRQUFRQyxHQUFHLENBQUNDLFVBQVU7UUFDMUMsRUFBRSxPQUFNO1lBQ04sT0FBT3ZCLHFEQUFZQSxDQUFDYSxJQUFJLENBQ3RCO2dCQUFFQyxTQUFTO2dCQUFPQyxTQUFTO1lBQTJCLEdBQ3REO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxlQUFlO1FBQ2YsTUFBTSxFQUNKUSxLQUFLLEVBQ0xDLFFBQVEsRUFDUkMsSUFBSSxFQUNKQyxXQUFXLEVBQ1hDLFdBQVcsRUFDWEMsZUFBZSxFQUNoQixHQUFHLE1BQU1yQixJQUFJSyxJQUFJO1FBRWxCLHFCQUFxQjtRQUNyQixJQUFJLENBQUNXLE9BQ0gsT0FBT3hCLHFEQUFZQSxDQUFDYSxJQUFJLENBQ3RCO1lBQUVDLFNBQVM7WUFBT0MsU0FBUztRQUFvQixHQUMvQztZQUFFQyxRQUFRO1FBQUk7UUFHbEIsSUFBSSxDQUFDUyxZQUFZLENBQUNuQixtQkFBbUJNLFFBQVEsQ0FBQ2EsV0FDNUMsT0FBT3pCLHFEQUFZQSxDQUFDYSxJQUFJLENBQ3RCO1lBQUVDLFNBQVM7WUFBT0MsU0FBUztRQUFtQixHQUM5QztZQUFFQyxRQUFRO1FBQUk7UUFHbEIsSUFBSSxDQUFDVSxRQUFRLENBQUM7WUFBQztZQUFTO1NBQVEsQ0FBQ2QsUUFBUSxDQUFDYyxPQUN4QyxPQUFPMUIscURBQVlBLENBQUNhLElBQUksQ0FDdEI7WUFBRUMsU0FBUztZQUFPQyxTQUFTO1FBQXFCLEdBQ2hEO1lBQUVDLFFBQVE7UUFBSTtRQUdsQixJQUFJVSxTQUFTLFdBQVcsQ0FBQ0MsYUFDdkIsT0FBTzNCLHFEQUFZQSxDQUFDYSxJQUFJLENBQ3RCO1lBQUVDLFNBQVM7WUFBT0MsU0FBUztRQUF5QixHQUNwRDtZQUFFQyxRQUFRO1FBQUk7UUFHbEIsSUFBSVUsU0FBUyxXQUFXLENBQUNFLGFBQ3ZCLE9BQU81QixxREFBWUEsQ0FBQ2EsSUFBSSxDQUN0QjtZQUFFQyxTQUFTO1lBQU9DLFNBQVM7UUFBeUIsR0FDcEQ7WUFBRUMsUUFBUTtRQUFJO1FBR2xCLHFCQUFxQjtRQUNyQixJQUFJYyxXQUEwQjtRQUM5QixJQUFJQyxXQUEwQjtRQUM5QixJQUFJQyxlQUE4QjtRQUVsQyxJQUFJTixTQUFTLFNBQVM7WUFDcEIsTUFBTU8sU0FBUyxNQUFNL0IsdURBQVVBLENBQUNnQyxRQUFRLENBQUNELE1BQU0sQ0FBQ04sYUFBYTtnQkFDM0RRLFFBQVE7Z0JBQ1JDLGVBQWU7WUFDakI7WUFDQU4sV0FBV0csT0FBT0ksVUFBVTtRQUM5QjtRQUVBLElBQUlYLFNBQVMsU0FBUztZQUNwQixlQUFlO1lBQ2YsTUFBTVksY0FBYyxNQUFNcEMsdURBQVVBLENBQUNnQyxRQUFRLENBQUNELE1BQU0sQ0FBQ0wsYUFBYTtnQkFDaEVPLFFBQVE7Z0JBQ1JDLGVBQWU7WUFDakI7WUFDQUwsV0FBV08sWUFBWUQsVUFBVTtZQUVqQyw0QkFBNEI7WUFDNUIsSUFBSVIsaUJBQWlCO2dCQUNuQixNQUFNVSxjQUFjLE1BQU1yQyx1REFBVUEsQ0FBQ2dDLFFBQVEsQ0FBQ0QsTUFBTSxDQUFDSixpQkFBaUI7b0JBQ3BFTSxRQUFRO29CQUNSQyxlQUFlO2dCQUNqQjtnQkFDQUosZUFBZU8sWUFBWUYsVUFBVTtZQUN2QztRQUNGO1FBRUEsbUJBQW1CO1FBQ25CLE1BQU1HLFNBQVMsTUFBTXZDLCtDQUFhQTtRQUNsQyxNQUFNd0MsS0FBS0QsT0FBT0MsRUFBRSxDQUFDO1FBQ3JCLE1BQU1DLGFBQWFELEdBQUdDLFVBQVUsQ0FBQztRQUVqQyxNQUFNQyxRQUFRO1lBQ1puQjtZQUNBQztZQUNBQztZQUNBa0IsS0FBS2xCLFNBQVMsVUFBVUksV0FBV0M7WUFDbkNjLFdBQVdiO1lBQ1hjLFdBQVcsSUFBSUM7WUFDZkMsV0FBVyxJQUFJRDtRQUNqQjtRQUVBLE1BQU1FLFNBQVMsTUFBTVAsV0FBV1EsU0FBUyxDQUFDUDtRQUMxQyxNQUFNUSxlQUFlLE1BQU1ULFdBQVdVLE9BQU8sQ0FBQztZQUM1Q0MsS0FBS0osT0FBT0ssVUFBVTtRQUN4QjtRQUVBLE9BQU90RCxxREFBWUEsQ0FBQ2EsSUFBSSxDQUFDO1lBQ3ZCQyxTQUFTO1lBQ1RDLFNBQVM7WUFDVDRCLE9BQU9RO1FBQ1Q7SUFDRixFQUFFLE9BQU9JLEtBQVU7UUFDakJDLFFBQVFDLEtBQUssQ0FBQyx5QkFBeUJGO1FBQ3ZDLE9BQU92RCxxREFBWUEsQ0FBQ2EsSUFBSSxDQUN0QjtZQUFFQyxTQUFTO1lBQU9DLFNBQVN3QyxJQUFJeEMsT0FBTyxJQUFJO1FBQXdCLEdBQ2xFO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY29ubmVjdC1hZnJpY2EtbmV4dC8uL3NyYy9hcHAvYXBpL3YxL2FkbWluL2dhbGxhcnkvY3JlYXRlL3JvdXRlLnRzP2Q4MmIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5pbXBvcnQgY2xpZW50UHJvbWlzZSBmcm9tIFwiQC9saWIvZGJcIjtcclxuaW1wb3J0IGNsb3VkaW5hcnkgZnJvbSBcIkAvbGliL2Nsb3VkaW5hcnlcIjtcclxuaW1wb3J0IGp3dCBmcm9tIFwianNvbndlYnRva2VuXCI7XHJcbmltcG9ydCB7IEFMTE9XRURfT1JJR0lOUyB9IGZyb20gXCJAL2NvbmZpZy9jb3JzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgZHluYW1pYyA9IFwiZm9yY2UtZHluYW1pY1wiO1xyXG5cclxuY29uc3QgQUxMT1dFRF9DQVRFR09SSUVTID0gW1xyXG4gIFwiT3V0cmVhY2hcIixcclxuICBcIlRlYW1cIixcclxuICBcIkNvbW11bml0eVwiLFxyXG4gIFwiRWxkZXJseVwiLFxyXG4gIFwiRW1wb3dlcm1lbnRcIixcclxuICBcIkNoaWxkcmVuXCIsXHJcbiAgXCJFZHVjYXRpb25cIixcclxuICBcIkhlYWx0aGNhcmVcIixcclxuICBcIkluZnJhc3RydWN0dXJlXCIsXHJcbiAgXCJFdmVudHNcIixcclxuICBcIk90aGVyc1wiLFxyXG5dO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBOZXh0UmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICAvKiA9PT09PT09PT09PT09PT09PSBDT1JTID09PT09PT09PT09PT09PT09ICovXHJcbiAgICBjb25zdCBvcmlnaW4gPSByZXEuaGVhZGVycy5nZXQoXCJvcmlnaW5cIik7XHJcbiAgICBpZiAob3JpZ2luICYmICFBTExPV0VEX09SSUdJTlMuaW5jbHVkZXMob3JpZ2luKSkge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJDT1JTIHBvbGljeTogT3JpZ2luIG5vdCBhbGxvd2VkXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAzIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0gQVVUSCAtLS1cclxuICAgIGNvbnN0IGF1dGhIZWFkZXIgPSByZXEuaGVhZGVycy5nZXQoXCJhdXRob3JpemF0aW9uXCIpO1xyXG4gICAgY29uc3QgdG9rZW4gPSBhdXRoSGVhZGVyPy5zcGxpdChcIiBcIilbMV07XHJcblxyXG4gICAgaWYgKCF0b2tlbikge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJVbmF1dGhvcml6ZWRcIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDEgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGp3dC52ZXJpZnkodG9rZW4sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQhKTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJJbnZhbGlkIG9yIGV4cGlyZWQgdG9rZW5cIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDEgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC0tLSBCT0RZIC0tLVxyXG4gICAgY29uc3Qge1xyXG4gICAgICB0aXRsZSxcclxuICAgICAgY2F0ZWdvcnksXHJcbiAgICAgIHR5cGUsIC8vIFwiaW1hZ2VcIiB8IFwidmlkZW9cIlxyXG4gICAgICBpbWFnZUJhc2U2NCxcclxuICAgICAgdmlkZW9CYXNlNjQsXHJcbiAgICAgIHRodW1ibmFpbEJhc2U2NCxcclxuICAgIH0gPSBhd2FpdCByZXEuanNvbigpO1xyXG5cclxuICAgIC8vIC0tLSBWQUxJREFUSU9OIC0tLVxyXG4gICAgaWYgKCF0aXRsZSlcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiVGl0bGUgaXMgcmVxdWlyZWRcIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxyXG4gICAgICApO1xyXG5cclxuICAgIGlmICghY2F0ZWdvcnkgfHwgIUFMTE9XRURfQ0FURUdPUklFUy5pbmNsdWRlcyhjYXRlZ29yeSkpXHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcIkludmFsaWQgY2F0ZWdvcnlcIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxyXG4gICAgICApO1xyXG5cclxuICAgIGlmICghdHlwZSB8fCAhW1wiaW1hZ2VcIiwgXCJ2aWRlb1wiXS5pbmNsdWRlcyh0eXBlKSlcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiSW52YWxpZCBtZWRpYSB0eXBlXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAwIH1cclxuICAgICAgKTtcclxuXHJcbiAgICBpZiAodHlwZSA9PT0gXCJpbWFnZVwiICYmICFpbWFnZUJhc2U2NClcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiSW1hZ2UgZmlsZSBpcyByZXF1aXJlZFwiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XHJcbiAgICAgICk7XHJcblxyXG4gICAgaWYgKHR5cGUgPT09IFwidmlkZW9cIiAmJiAhdmlkZW9CYXNlNjQpXHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcIlZpZGVvIGZpbGUgaXMgcmVxdWlyZWRcIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxyXG4gICAgICApO1xyXG5cclxuICAgIC8vIC0tLSBDTE9VRElOQVJZIC0tLVxyXG4gICAgbGV0IGltYWdlVXJsOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcclxuICAgIGxldCB2aWRlb1VybDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XHJcbiAgICBsZXQgdGh1bWJuYWlsVXJsOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBpZiAodHlwZSA9PT0gXCJpbWFnZVwiKSB7XHJcbiAgICAgIGNvbnN0IHVwbG9hZCA9IGF3YWl0IGNsb3VkaW5hcnkudXBsb2FkZXIudXBsb2FkKGltYWdlQmFzZTY0LCB7XHJcbiAgICAgICAgZm9sZGVyOiBcImdhbGxlcnkvaW1hZ2VzXCIsXHJcbiAgICAgICAgcmVzb3VyY2VfdHlwZTogXCJpbWFnZVwiLFxyXG4gICAgICB9KTtcclxuICAgICAgaW1hZ2VVcmwgPSB1cGxvYWQuc2VjdXJlX3VybDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZSA9PT0gXCJ2aWRlb1wiKSB7XHJcbiAgICAgIC8vIHVwbG9hZCB2aWRlb1xyXG4gICAgICBjb25zdCB2aWRlb1VwbG9hZCA9IGF3YWl0IGNsb3VkaW5hcnkudXBsb2FkZXIudXBsb2FkKHZpZGVvQmFzZTY0LCB7XHJcbiAgICAgICAgZm9sZGVyOiBcImdhbGxlcnkvdmlkZW9zXCIsXHJcbiAgICAgICAgcmVzb3VyY2VfdHlwZTogXCJ2aWRlb1wiLFxyXG4gICAgICB9KTtcclxuICAgICAgdmlkZW9VcmwgPSB2aWRlb1VwbG9hZC5zZWN1cmVfdXJsO1xyXG5cclxuICAgICAgLy8gdXBsb2FkIG9wdGlvbmFsIHRodW1ibmFpbFxyXG4gICAgICBpZiAodGh1bWJuYWlsQmFzZTY0KSB7XHJcbiAgICAgICAgY29uc3QgdGh1bWJVcGxvYWQgPSBhd2FpdCBjbG91ZGluYXJ5LnVwbG9hZGVyLnVwbG9hZCh0aHVtYm5haWxCYXNlNjQsIHtcclxuICAgICAgICAgIGZvbGRlcjogXCJnYWxsZXJ5L3RodW1ibmFpbHNcIixcclxuICAgICAgICAgIHJlc291cmNlX3R5cGU6IFwiaW1hZ2VcIixcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aHVtYm5haWxVcmwgPSB0aHVtYlVwbG9hZC5zZWN1cmVfdXJsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tIERBVEFCQVNFIC0tLVxyXG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgY2xpZW50UHJvbWlzZTtcclxuICAgIGNvbnN0IGRiID0gY2xpZW50LmRiKFwiY29ubmVjdF9hZnJpY2FcIik7XHJcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gZGIuY29sbGVjdGlvbihcImdhbGxlcnlcIik7XHJcblxyXG4gICAgY29uc3QgbWVkaWEgPSB7XHJcbiAgICAgIHRpdGxlLFxyXG4gICAgICBjYXRlZ29yeSxcclxuICAgICAgdHlwZSxcclxuICAgICAgc3JjOiB0eXBlID09PSBcImltYWdlXCIgPyBpbWFnZVVybCA6IHZpZGVvVXJsLFxyXG4gICAgICB0aHVtYm5haWw6IHRodW1ibmFpbFVybCxcclxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLFxyXG4gICAgICB1cGRhdGVkQXQ6IG5ldyBEYXRlKCksXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNvbGxlY3Rpb24uaW5zZXJ0T25lKG1lZGlhKTtcclxuICAgIGNvbnN0IGNyZWF0ZWRNZWRpYSA9IGF3YWl0IGNvbGxlY3Rpb24uZmluZE9uZSh7XHJcbiAgICAgIF9pZDogcmVzdWx0Lmluc2VydGVkSWQsXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICBtZXNzYWdlOiBcIk1lZGlhIHVwbG9hZGVkIHN1Y2Nlc3NmdWxseVwiLFxyXG4gICAgICBtZWRpYTogY3JlYXRlZE1lZGlhLFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJHYWxsZXJ5IHVwbG9hZCBlcnJvcjpcIiwgZXJyKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgeyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfHwgXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIiB9LFxyXG4gICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgICk7XHJcbiAgfVxyXG59Il0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImNsaWVudFByb21pc2UiLCJjbG91ZGluYXJ5Iiwiand0IiwiQUxMT1dFRF9PUklHSU5TIiwiZHluYW1pYyIsIkFMTE9XRURfQ0FURUdPUklFUyIsIlBPU1QiLCJyZXEiLCJvcmlnaW4iLCJoZWFkZXJzIiwiZ2V0IiwiaW5jbHVkZXMiLCJqc29uIiwic3VjY2VzcyIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJhdXRoSGVhZGVyIiwidG9rZW4iLCJzcGxpdCIsInZlcmlmeSIsInByb2Nlc3MiLCJlbnYiLCJKV1RfU0VDUkVUIiwidGl0bGUiLCJjYXRlZ29yeSIsInR5cGUiLCJpbWFnZUJhc2U2NCIsInZpZGVvQmFzZTY0IiwidGh1bWJuYWlsQmFzZTY0IiwiaW1hZ2VVcmwiLCJ2aWRlb1VybCIsInRodW1ibmFpbFVybCIsInVwbG9hZCIsInVwbG9hZGVyIiwiZm9sZGVyIiwicmVzb3VyY2VfdHlwZSIsInNlY3VyZV91cmwiLCJ2aWRlb1VwbG9hZCIsInRodW1iVXBsb2FkIiwiY2xpZW50IiwiZGIiLCJjb2xsZWN0aW9uIiwibWVkaWEiLCJzcmMiLCJ0aHVtYm5haWwiLCJjcmVhdGVkQXQiLCJEYXRlIiwidXBkYXRlZEF0IiwicmVzdWx0IiwiaW5zZXJ0T25lIiwiY3JlYXRlZE1lZGlhIiwiZmluZE9uZSIsIl9pZCIsImluc2VydGVkSWQiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/v1/admin/gallary/create/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/config/cors.ts":
/*!****************************!*\
  !*** ./src/config/cors.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ALLOWED_ORIGINS: () => (/* binding */ ALLOWED_ORIGINS)\n/* harmony export */ });\n// Central CORS origins config\nconst ALLOWED_ORIGINS = [\n    \"http://localhost:3000\",\n    \"https://connectafrica-fawn.vercel.app\",\n    \"https://www.connectwithafrica.org\",\n    \"https://connectwithafrica.org\"\n];\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvY29uZmlnL2NvcnMudHMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDhCQUE4QjtBQUN2QixNQUFNQSxrQkFBa0I7SUFDN0I7SUFDQTtJQUNBO0lBQ0E7Q0FDRCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY29ubmVjdC1hZnJpY2EtbmV4dC8uL3NyYy9jb25maWcvY29ycy50cz8xMjQ5Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENlbnRyYWwgQ09SUyBvcmlnaW5zIGNvbmZpZ1xyXG5leHBvcnQgY29uc3QgQUxMT1dFRF9PUklHSU5TID0gW1xyXG4gIFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCIsXHJcbiAgXCJodHRwczovL2Nvbm5lY3RhZnJpY2EtZmF3bi52ZXJjZWwuYXBwXCIsXHJcbiAgXCJodHRwczovL3d3dy5jb25uZWN0d2l0aGFmcmljYS5vcmdcIixcclxuICBcImh0dHBzOi8vY29ubmVjdHdpdGhhZnJpY2Eub3JnXCIsXHJcbl07Il0sIm5hbWVzIjpbIkFMTE9XRURfT1JJR0lOUyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/config/cors.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/cloudinary.ts":
/*!*******************************!*\
  !*** ./src/lib/cloudinary.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var cloudinary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cloudinary */ \"(rsc)/./node_modules/cloudinary/cloudinary.js\");\n/* harmony import */ var cloudinary__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cloudinary__WEBPACK_IMPORTED_MODULE_0__);\n\ncloudinary__WEBPACK_IMPORTED_MODULE_0__.v2.config({\n    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,\n    api_key: process.env.CLOUDINARY_API_KEY,\n    api_secret: process.env.CLOUDINARY_API_SECRET\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cloudinary__WEBPACK_IMPORTED_MODULE_0__.v2);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2Nsb3VkaW5hcnkudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQThDO0FBRTlDQywwQ0FBVUEsQ0FBQ0MsTUFBTSxDQUFDO0lBQ2hCQyxZQUFZQyxRQUFRQyxHQUFHLENBQUNDLHFCQUFxQjtJQUM3Q0MsU0FBU0gsUUFBUUMsR0FBRyxDQUFDRyxrQkFBa0I7SUFDdkNDLFlBQVlMLFFBQVFDLEdBQUcsQ0FBQ0sscUJBQXFCO0FBQy9DO0FBRUEsaUVBQWVULDBDQUFVQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY29ubmVjdC1hZnJpY2EtbmV4dC8uL3NyYy9saWIvY2xvdWRpbmFyeS50cz9lMWZhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHYyIGFzIGNsb3VkaW5hcnkgfSBmcm9tIFwiY2xvdWRpbmFyeVwiO1xyXG5cclxuY2xvdWRpbmFyeS5jb25maWcoe1xyXG4gIGNsb3VkX25hbWU6IHByb2Nlc3MuZW52LkNMT1VESU5BUllfQ0xPVURfTkFNRSxcclxuICBhcGlfa2V5OiBwcm9jZXNzLmVudi5DTE9VRElOQVJZX0FQSV9LRVksXHJcbiAgYXBpX3NlY3JldDogcHJvY2Vzcy5lbnYuQ0xPVURJTkFSWV9BUElfU0VDUkVULFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsb3VkaW5hcnk7XHJcbiJdLCJuYW1lcyI6WyJ2MiIsImNsb3VkaW5hcnkiLCJjb25maWciLCJjbG91ZF9uYW1lIiwicHJvY2VzcyIsImVudiIsIkNMT1VESU5BUllfQ0xPVURfTkFNRSIsImFwaV9rZXkiLCJDTE9VRElOQVJZX0FQSV9LRVkiLCJhcGlfc2VjcmV0IiwiQ0xPVURJTkFSWV9BUElfU0VDUkVUIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/cloudinary.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/db.ts":
/*!***********************!*\
  !*** ./src/lib/db.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n\nconst uri = process.env.MONGODB_URI;\nif (!uri) throw new Error(\"Please define MONGODB_URI in .env\");\nlet client;\nlet clientPromise;\nif (true) {\n    if (!global._mongoClientPromise) {\n        client = new mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient(uri);\n        global._mongoClientPromise = client.connect();\n    }\n    clientPromise = global._mongoClientPromise;\n} else {}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clientPromise);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2RiLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFzQztBQUV0QyxNQUFNQyxNQUFNQyxRQUFRQyxHQUFHLENBQUNDLFdBQVc7QUFFbkMsSUFBSSxDQUFDSCxLQUFLLE1BQU0sSUFBSUksTUFBTTtBQVExQixJQUFJQztBQUNKLElBQUlDO0FBRUosSUFBSUwsSUFBc0MsRUFBRTtJQUMxQyxJQUFJLENBQUNNLE9BQU9DLG1CQUFtQixFQUFFO1FBQy9CSCxTQUFTLElBQUlOLGdEQUFXQSxDQUFDQztRQUN6Qk8sT0FBT0MsbUJBQW1CLEdBQUdILE9BQU9JLE9BQU87SUFDN0M7SUFDQUgsZ0JBQWdCQyxPQUFPQyxtQkFBbUI7QUFDNUMsT0FBTyxFQUdOO0FBRUQsaUVBQWVGLGFBQWFBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb25uZWN0LWFmcmljYS1uZXh0Ly4vc3JjL2xpYi9kYi50cz85ZTRmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbmdvQ2xpZW50IH0gZnJvbSBcIm1vbmdvZGJcIjtcclxuXHJcbmNvbnN0IHVyaSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJIGFzIHN0cmluZztcclxuXHJcbmlmICghdXJpKSB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZGVmaW5lIE1PTkdPREJfVVJJIGluIC5lbnZcIik7XHJcblxyXG4vLyBFeHRlbmQgTm9kZUpTIGdsb2JhbCB0eXBlIHRvIGluY2x1ZGUgX21vbmdvQ2xpZW50UHJvbWlzZVxyXG5kZWNsYXJlIGdsb2JhbCB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXZhclxyXG4gIHZhciBfbW9uZ29DbGllbnRQcm9taXNlOiBQcm9taXNlPE1vbmdvQ2xpZW50PiB8IHVuZGVmaW5lZDtcclxufVxyXG5cclxubGV0IGNsaWVudDogTW9uZ29DbGllbnQ7XHJcbmxldCBjbGllbnRQcm9taXNlOiBQcm9taXNlPE1vbmdvQ2xpZW50PjtcclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJkZXZlbG9wbWVudFwiKSB7XHJcbiAgaWYgKCFnbG9iYWwuX21vbmdvQ2xpZW50UHJvbWlzZSkge1xyXG4gICAgY2xpZW50ID0gbmV3IE1vbmdvQ2xpZW50KHVyaSk7XHJcbiAgICBnbG9iYWwuX21vbmdvQ2xpZW50UHJvbWlzZSA9IGNsaWVudC5jb25uZWN0KCk7XHJcbiAgfVxyXG4gIGNsaWVudFByb21pc2UgPSBnbG9iYWwuX21vbmdvQ2xpZW50UHJvbWlzZTtcclxufSBlbHNlIHtcclxuICBjbGllbnQgPSBuZXcgTW9uZ29DbGllbnQodXJpKTtcclxuICBjbGllbnRQcm9taXNlID0gY2xpZW50LmNvbm5lY3QoKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xpZW50UHJvbWlzZTtcclxuIl0sIm5hbWVzIjpbIk1vbmdvQ2xpZW50IiwidXJpIiwicHJvY2VzcyIsImVudiIsIk1PTkdPREJfVVJJIiwiRXJyb3IiLCJjbGllbnQiLCJjbGllbnRQcm9taXNlIiwiZ2xvYmFsIiwiX21vbmdvQ2xpZW50UHJvbWlzZSIsImNvbm5lY3QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/db.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/ms","vendor-chunks/lodash","vendor-chunks/cloudinary","vendor-chunks/semver","vendor-chunks/q","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fv1%2Fadmin%2Fgallary%2Fcreate%2Froute&page=%2Fapi%2Fv1%2Fadmin%2Fgallary%2Fcreate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fv1%2Fadmin%2Fgallary%2Fcreate%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5COneDrive%5CDesktop%5Cproject2%5Cconnect%20africa%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5COneDrive%5CDesktop%5Cproject2%5Cconnect%20africa&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();