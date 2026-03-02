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
exports.id = "app/api/v1/admin/gallary/delete/[id]/route";
exports.ids = ["app/api/v1/admin/gallary/delete/[id]/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fv1%2Fadmin%2Fgallary%2Fdelete%2F%5Bid%5D%2Froute&page=%2Fapi%2Fv1%2Fadmin%2Fgallary%2Fdelete%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fv1%2Fadmin%2Fgallary%2Fdelete%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5COneDrive%5CDesktop%5Cproject2%5Cconnect%20africa%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5COneDrive%5CDesktop%5Cproject2%5Cconnect%20africa&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fv1%2Fadmin%2Fgallary%2Fdelete%2F%5Bid%5D%2Froute&page=%2Fapi%2Fv1%2Fadmin%2Fgallary%2Fdelete%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fv1%2Fadmin%2Fgallary%2Fdelete%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5COneDrive%5CDesktop%5Cproject2%5Cconnect%20africa%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5COneDrive%5CDesktop%5Cproject2%5Cconnect%20africa&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_HP_OneDrive_Desktop_project2_connect_africa_src_app_api_v1_admin_gallary_delete_id_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/v1/admin/gallary/delete/[id]/route.ts */ \"(rsc)/./src/app/api/v1/admin/gallary/delete/[id]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/v1/admin/gallary/delete/[id]/route\",\n        pathname: \"/api/v1/admin/gallary/delete/[id]\",\n        filename: \"route\",\n        bundlePath: \"app/api/v1/admin/gallary/delete/[id]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\HP\\\\OneDrive\\\\Desktop\\\\project2\\\\connect africa\\\\src\\\\app\\\\api\\\\v1\\\\admin\\\\gallary\\\\delete\\\\[id]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_HP_OneDrive_Desktop_project2_connect_africa_src_app_api_v1_admin_gallary_delete_id_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/v1/admin/gallary/delete/[id]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZ2MSUyRmFkbWluJTJGZ2FsbGFyeSUyRmRlbGV0ZSUyRiU1QmlkJTVEJTJGcm91dGUmcGFnZT0lMkZhcGklMkZ2MSUyRmFkbWluJTJGZ2FsbGFyeSUyRmRlbGV0ZSUyRiU1QmlkJTVEJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGdjElMkZhZG1pbiUyRmdhbGxhcnklMkZkZWxldGUlMkYlNUJpZCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNIUCU1Q09uZURyaXZlJTVDRGVza3RvcCU1Q3Byb2plY3QyJTVDY29ubmVjdCUyMGFmcmljYSU1Q3NyYyU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDSFAlNUNPbmVEcml2ZSU1Q0Rlc2t0b3AlNUNwcm9qZWN0MiU1Q2Nvbm5lY3QlMjBhZnJpY2EmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ3FFO0FBQ2xKO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY29ubmVjdC1hZnJpY2EtbmV4dC8/OGI0YSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxIUFxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXHByb2plY3QyXFxcXGNvbm5lY3QgYWZyaWNhXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXHYxXFxcXGFkbWluXFxcXGdhbGxhcnlcXFxcZGVsZXRlXFxcXFtpZF1cXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3YxL2FkbWluL2dhbGxhcnkvZGVsZXRlL1tpZF0vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS92MS9hZG1pbi9nYWxsYXJ5L2RlbGV0ZS9baWRdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS92MS9hZG1pbi9nYWxsYXJ5L2RlbGV0ZS9baWRdL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcSFBcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxwcm9qZWN0MlxcXFxjb25uZWN0IGFmcmljYVxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFx2MVxcXFxhZG1pblxcXFxnYWxsYXJ5XFxcXGRlbGV0ZVxcXFxbaWRdXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS92MS9hZG1pbi9nYWxsYXJ5L2RlbGV0ZS9baWRdL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fv1%2Fadmin%2Fgallary%2Fdelete%2F%5Bid%5D%2Froute&page=%2Fapi%2Fv1%2Fadmin%2Fgallary%2Fdelete%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fv1%2Fadmin%2Fgallary%2Fdelete%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5COneDrive%5CDesktop%5Cproject2%5Cconnect%20africa%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5COneDrive%5CDesktop%5Cproject2%5Cconnect%20africa&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/v1/admin/gallary/delete/[id]/route.ts":
/*!***********************************************************!*\
  !*** ./src/app/api/v1/admin/gallary/delete/[id]/route.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   dynamic: () => (/* binding */ dynamic)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./src/lib/db.ts\");\n/* harmony import */ var _lib_cloudinary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/cloudinary */ \"(rsc)/./src/lib/cloudinary.ts\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _config_cors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/config/cors */ \"(rsc)/./src/config/cors.ts\");\n\n\n\n\n\nconst dynamic = \"force-dynamic\";\n// allowed origins for CORS\n\nasync function DELETE(req, { params }) {\n    try {\n        /* ================= CORS ================= */ const origin = req.headers.get(\"origin\");\n        if (origin && !_config_cors__WEBPACK_IMPORTED_MODULE_5__.ALLOWED_ORIGINS.includes(origin)) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                message: \"CORS policy: Origin not allowed\"\n            }, {\n                status: 403\n            });\n        }\n        // 🔐 Auth check\n        const authHeader = req.headers.get(\"authorization\");\n        const token = authHeader?.split(\" \")[1];\n        if (!token) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                message: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        try {\n            jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default().verify(token, process.env.JWT_SECRET);\n        } catch  {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                message: \"Invalid or expired token\"\n            }, {\n                status: 401\n            });\n        }\n        const { id } = await params;\n        if (!mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId.isValid(id)) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                message: \"Invalid media ID\"\n            }, {\n                status: 400\n            });\n        }\n        const client = await _lib_db__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n        const db = client.db(\"connect_africa\");\n        const collection = db.collection(\"gallery\");\n        // 🔍 Find media first\n        const media = await collection.findOne({\n            _id: new mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId(id)\n        });\n        if (!media) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                message: \"Media not found\"\n            }, {\n                status: 404\n            });\n        }\n        // ☁️ Delete from Cloudinary if image/video exists\n        if (media.publicId) {\n            await _lib_cloudinary__WEBPACK_IMPORTED_MODULE_2__[\"default\"].uploader.destroy(media.publicId, {\n                resource_type: media.type === \"video\" ? \"video\" : \"image\"\n            });\n        }\n        // 🗑 Delete from MongoDB\n        await collection.deleteOne({\n            _id: new mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId(id)\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            message: \"Media deleted successfully\"\n        });\n    } catch (err) {\n        console.error(\"Delete gallery error:\", err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            message: err.message || \"Internal Server Error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS92MS9hZG1pbi9nYWxsYXJ5L2RlbGV0ZS9baWRdL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBd0Q7QUFDbkI7QUFDSztBQUNYO0FBQ0k7QUFFNUIsTUFBTUssVUFBVSxnQkFBZ0I7QUFFdkMsMkJBQTJCO0FBQ3FCO0FBRXpDLGVBQWVFLE9BQ3BCQyxHQUFnQixFQUNoQixFQUFFQyxNQUFNLEVBQXVDO0lBRS9DLElBQUk7UUFDRiw0Q0FBNEMsR0FDNUMsTUFBTUMsU0FBU0YsSUFBSUcsT0FBTyxDQUFDQyxHQUFHLENBQUM7UUFDL0IsSUFBSUYsVUFBVSxDQUFDSix5REFBZUEsQ0FBQ08sUUFBUSxDQUFDSCxTQUFTO1lBQy9DLE9BQU9WLHFEQUFZQSxDQUFDYyxJQUFJLENBQ3RCO2dCQUFFQyxTQUFTO2dCQUFPQyxTQUFTO1lBQWtDLEdBQzdEO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxnQkFBZ0I7UUFDaEIsTUFBTUMsYUFBYVYsSUFBSUcsT0FBTyxDQUFDQyxHQUFHLENBQUM7UUFDbkMsTUFBTU8sUUFBUUQsWUFBWUUsTUFBTSxJQUFJLENBQUMsRUFBRTtRQUV2QyxJQUFJLENBQUNELE9BQU87WUFDVixPQUFPbkIscURBQVlBLENBQUNjLElBQUksQ0FDdEI7Z0JBQUVDLFNBQVM7Z0JBQU9DLFNBQVM7WUFBZSxHQUMxQztnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsSUFBSTtZQUNGZCwwREFBVSxDQUFDZ0IsT0FBT0csUUFBUUMsR0FBRyxDQUFDQyxVQUFVO1FBQzFDLEVBQUUsT0FBTTtZQUNOLE9BQU94QixxREFBWUEsQ0FBQ2MsSUFBSSxDQUN0QjtnQkFBRUMsU0FBUztnQkFBT0MsU0FBUztZQUEyQixHQUN0RDtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsTUFBTSxFQUFFUSxFQUFFLEVBQUUsR0FBRyxNQUFNaEI7UUFFckIsSUFBSSxDQUFDTCw2Q0FBUUEsQ0FBQ3NCLE9BQU8sQ0FBQ0QsS0FBSztZQUN6QixPQUFPekIscURBQVlBLENBQUNjLElBQUksQ0FDdEI7Z0JBQUVDLFNBQVM7Z0JBQU9DLFNBQVM7WUFBbUIsR0FDOUM7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLE1BQU1VLFNBQVMsTUFBTTFCLCtDQUFhQTtRQUNsQyxNQUFNMkIsS0FBS0QsT0FBT0MsRUFBRSxDQUFDO1FBQ3JCLE1BQU1DLGFBQWFELEdBQUdDLFVBQVUsQ0FBQztRQUVqQyxzQkFBc0I7UUFDdEIsTUFBTUMsUUFBUSxNQUFNRCxXQUFXRSxPQUFPLENBQUM7WUFBRUMsS0FBSyxJQUFJNUIsNkNBQVFBLENBQUNxQjtRQUFJO1FBRS9ELElBQUksQ0FBQ0ssT0FBTztZQUNWLE9BQU85QixxREFBWUEsQ0FBQ2MsSUFBSSxDQUN0QjtnQkFBRUMsU0FBUztnQkFBT0MsU0FBUztZQUFrQixHQUM3QztnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsa0RBQWtEO1FBQ2xELElBQUlhLE1BQU1HLFFBQVEsRUFBRTtZQUNsQixNQUFNL0IsdURBQVVBLENBQUNnQyxRQUFRLENBQUNDLE9BQU8sQ0FBQ0wsTUFBTUcsUUFBUSxFQUFFO2dCQUNoREcsZUFBZU4sTUFBTU8sSUFBSSxLQUFLLFVBQVUsVUFBVTtZQUNwRDtRQUNGO1FBRUEseUJBQXlCO1FBQ3pCLE1BQU1SLFdBQVdTLFNBQVMsQ0FBQztZQUFFTixLQUFLLElBQUk1Qiw2Q0FBUUEsQ0FBQ3FCO1FBQUk7UUFFbkQsT0FBT3pCLHFEQUFZQSxDQUFDYyxJQUFJLENBQUM7WUFDdkJDLFNBQVM7WUFDVEMsU0FBUztRQUNYO0lBQ0YsRUFBRSxPQUFPdUIsS0FBVTtRQUNqQkMsUUFBUUMsS0FBSyxDQUFDLHlCQUF5QkY7UUFDdkMsT0FBT3ZDLHFEQUFZQSxDQUFDYyxJQUFJLENBQ3RCO1lBQ0VDLFNBQVM7WUFDVEMsU0FBU3VCLElBQUl2QixPQUFPLElBQUk7UUFDMUIsR0FDQTtZQUFFQyxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2Nvbm5lY3QtYWZyaWNhLW5leHQvLi9zcmMvYXBwL2FwaS92MS9hZG1pbi9nYWxsYXJ5L2RlbGV0ZS9baWRdL3JvdXRlLnRzP2IzZGQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5pbXBvcnQgY2xpZW50UHJvbWlzZSBmcm9tIFwiQC9saWIvZGJcIjtcclxuaW1wb3J0IGNsb3VkaW5hcnkgZnJvbSBcIkAvbGliL2Nsb3VkaW5hcnlcIjtcclxuaW1wb3J0IGp3dCBmcm9tIFwianNvbndlYnRva2VuXCI7XHJcbmltcG9ydCB7IE9iamVjdElkIH0gZnJvbSBcIm1vbmdvZGJcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBkeW5hbWljID0gXCJmb3JjZS1keW5hbWljXCI7XHJcblxyXG4vLyBhbGxvd2VkIG9yaWdpbnMgZm9yIENPUlNcclxuaW1wb3J0IHsgQUxMT1dFRF9PUklHSU5TIH0gZnJvbSBcIkAvY29uZmlnL2NvcnNcIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBERUxFVEUoXHJcbiAgcmVxOiBOZXh0UmVxdWVzdCxcclxuICB7IHBhcmFtcyB9OiB7IHBhcmFtczogUHJvbWlzZTx7IGlkOiBzdHJpbmcgfT4gfVxyXG4pIHtcclxuICB0cnkge1xyXG4gICAgLyogPT09PT09PT09PT09PT09PT0gQ09SUyA9PT09PT09PT09PT09PT09PSAqL1xyXG4gICAgY29uc3Qgb3JpZ2luID0gcmVxLmhlYWRlcnMuZ2V0KFwib3JpZ2luXCIpO1xyXG4gICAgaWYgKG9yaWdpbiAmJiAhQUxMT1dFRF9PUklHSU5TLmluY2x1ZGVzKG9yaWdpbikpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiQ09SUyBwb2xpY3k6IE9yaWdpbiBub3QgYWxsb3dlZFwiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMyB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g8J+UkCBBdXRoIGNoZWNrXHJcbiAgICBjb25zdCBhdXRoSGVhZGVyID0gcmVxLmhlYWRlcnMuZ2V0KFwiYXV0aG9yaXphdGlvblwiKTtcclxuICAgIGNvbnN0IHRva2VuID0gYXV0aEhlYWRlcj8uc3BsaXQoXCIgXCIpWzFdO1xyXG5cclxuICAgIGlmICghdG9rZW4pIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiVW5hdXRob3JpemVkXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAxIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBqd3QudmVyaWZ5KHRva2VuLCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUISk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiSW52YWxpZCBvciBleHBpcmVkIHRva2VuXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAxIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7IGlkIH0gPSBhd2FpdCBwYXJhbXM7XHJcblxyXG4gICAgaWYgKCFPYmplY3RJZC5pc1ZhbGlkKGlkKSkge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJJbnZhbGlkIG1lZGlhIElEXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAwIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBjbGllbnRQcm9taXNlO1xyXG4gICAgY29uc3QgZGIgPSBjbGllbnQuZGIoXCJjb25uZWN0X2FmcmljYVwiKTtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBkYi5jb2xsZWN0aW9uKFwiZ2FsbGVyeVwiKTtcclxuXHJcbiAgICAvLyDwn5SNIEZpbmQgbWVkaWEgZmlyc3RcclxuICAgIGNvbnN0IG1lZGlhID0gYXdhaXQgY29sbGVjdGlvbi5maW5kT25lKHsgX2lkOiBuZXcgT2JqZWN0SWQoaWQpIH0pO1xyXG5cclxuICAgIGlmICghbWVkaWEpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiTWVkaWEgbm90IGZvdW5kXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDA0IH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDimIHvuI8gRGVsZXRlIGZyb20gQ2xvdWRpbmFyeSBpZiBpbWFnZS92aWRlbyBleGlzdHNcclxuICAgIGlmIChtZWRpYS5wdWJsaWNJZCkge1xyXG4gICAgICBhd2FpdCBjbG91ZGluYXJ5LnVwbG9hZGVyLmRlc3Ryb3kobWVkaWEucHVibGljSWQsIHtcclxuICAgICAgICByZXNvdXJjZV90eXBlOiBtZWRpYS50eXBlID09PSBcInZpZGVvXCIgPyBcInZpZGVvXCIgOiBcImltYWdlXCIsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIPCfl5EgRGVsZXRlIGZyb20gTW9uZ29EQlxyXG4gICAgYXdhaXQgY29sbGVjdGlvbi5kZWxldGVPbmUoeyBfaWQ6IG5ldyBPYmplY3RJZChpZCkgfSk7XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcclxuICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgbWVzc2FnZTogXCJNZWRpYSBkZWxldGVkIHN1Y2Nlc3NmdWxseVwiLFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJEZWxldGUgZ2FsbGVyeSBlcnJvcjpcIiwgZXJyKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAge1xyXG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlIHx8IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImNsaWVudFByb21pc2UiLCJjbG91ZGluYXJ5Iiwiand0IiwiT2JqZWN0SWQiLCJkeW5hbWljIiwiQUxMT1dFRF9PUklHSU5TIiwiREVMRVRFIiwicmVxIiwicGFyYW1zIiwib3JpZ2luIiwiaGVhZGVycyIsImdldCIsImluY2x1ZGVzIiwianNvbiIsInN1Y2Nlc3MiLCJtZXNzYWdlIiwic3RhdHVzIiwiYXV0aEhlYWRlciIsInRva2VuIiwic3BsaXQiLCJ2ZXJpZnkiLCJwcm9jZXNzIiwiZW52IiwiSldUX1NFQ1JFVCIsImlkIiwiaXNWYWxpZCIsImNsaWVudCIsImRiIiwiY29sbGVjdGlvbiIsIm1lZGlhIiwiZmluZE9uZSIsIl9pZCIsInB1YmxpY0lkIiwidXBsb2FkZXIiLCJkZXN0cm95IiwicmVzb3VyY2VfdHlwZSIsInR5cGUiLCJkZWxldGVPbmUiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/v1/admin/gallary/delete/[id]/route.ts\n");

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
var __webpack_require__ = require("../../../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/ms","vendor-chunks/lodash","vendor-chunks/cloudinary","vendor-chunks/semver","vendor-chunks/q","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fv1%2Fadmin%2Fgallary%2Fdelete%2F%5Bid%5D%2Froute&page=%2Fapi%2Fv1%2Fadmin%2Fgallary%2Fdelete%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fv1%2Fadmin%2Fgallary%2Fdelete%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5COneDrive%5CDesktop%5Cproject2%5Cconnect%20africa%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5COneDrive%5CDesktop%5Cproject2%5Cconnect%20africa&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();