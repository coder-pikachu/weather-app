require("./runtime.js");require("./vendor.js");module.exports =
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["bundle"],{

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/HelloWorld.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var Geolocation = __webpack_require__("../node_modules/nativescript-geolocation/geolocation.js");

var Accuracy = __webpack_require__("../node_modules/tns-core-modules/ui/enums/enums.js");

var http = __webpack_require__("../node_modules/tns-core-modules/http/http.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  filters: {
    lowercase: function lowercase(value) {
      if (value) {
        return value.toLowerCase();
      } else return "";
    }
  },
  methods: {
    onTodayLabelLoaded(args) {
      //:text="currentWeatherData.todaysText"
      console.log("Setting label : ");
      this.labelObject = args.object;
    },

    createFormattedString(stringsToFormat) {
      //console.log(stringsToFormat);
      if (stringsToFormat) {
        var formattedString = __webpack_require__("../node_modules/tns-core-modules/text/formatted-string.js");

        var formattedSpan = __webpack_require__("../node_modules/tns-core-modules/text/span.js");

        var ColorModule = __webpack_require__("../node_modules/tns-core-modules/color/color.js");

        var fstringToSend = new formattedString.FormattedString();
        stringsToFormat.forEach((currentStrFragment, idx) => {
          var fspan = new formattedSpan.Span();
          fspan.text = currentStrFragment.text;

          switch (currentStrFragment.type) {
            case "normal":
              fspan.color = new ColorModule.Color("black");
              break;

            default:
              console.log("CUSTOM setting anything");
              fspan.color = new ColorModule.Color(currentStrFragment.type); // fspan.class = "orange-text";

              break;
          }

          fstringToSend.spans.push(fspan);
        }); //console.log(fstringToSend);

        return fstringToSend;
      } else {
        return;
      }
    },

    onLoaded() {},

    getTemperatureText() {
      if (this.currentWeatherData.temperature == null) {
        this.temperatureFontSize = 50;
        return "Loading ...";
      } else {
        this.temperatureFontSize = 90;
        return "".concat(this.currentWeatherData.temperature, "\xB0C");
      }
    },

    getMyWeather() {
      Geolocation.enableLocationRequest();
      Geolocation.getCurrentLocation({
        desiredAccuracy: Accuracy.high,
        updateDistance: 0.1,
        timeout: 20000
      }).then(loc => {
        if (loc) {
          var appId = "ed8226ba3a3c8c7ce5405af356b8906e";
          var url = "https://api.openweathermap.org/data/2.5/weather?APPID=" + appId + "&units=metric&lat=" + loc.latitude + "&lon=" + loc.longitude;
          /*var url =
              "https://api.openweathermap.org/data/2.5/weather?APPID=" +
              appId +
              "&units=metric&q=Mumbai";*/

          http.request({
            url: url,
            method: "GET"
          }).then(this.parseResponse);
        }
      }, function (e) {
        console.log("Error: " + e.message);
      });
    },

    getTemperatureColor(temp) {
      if (temp < 15) {
        return "#85C1E9";
      } else if (temp < 25 && temp >= 15) {
        return "#F4D03F";
      } else if (temp < 35 && temp >= 25) {
        return "#F39C12";
      } else {
        return "#E74C3C";
      }
    },

    getCondition(weatherData) {
      var firstDigit = weatherData.id.toString().charAt(0);
      console.log("Condition code: " + weatherData.id);

      switch (firstDigit) {
        case "2":
          return "thunderstorms";

        case "3":
          return "sunnyRains";

        case "5":
          if (weatherData.id == 500) return "lightRains";else return "heavyRains";

        case "7":
          return "fog";

        case "8":
          if (weatherData.id == 800) return "sunny";else if (weatherData.id == 801) return "cloudySun";else return "cloudy";
      }
    },

    parseResponse(response) {
      var weatherResponse = response.content.toJSON();
      this.currentWeatherData.city = weatherResponse.name;
      this.currentWeatherData.temperature = Math.floor(weatherResponse.main.temp);
      this.currentWeatherData.condition = this.getCondition(weatherResponse.weather[0]);
      this.currentWeatherData.temperatureColor = this.conditionToColorMap[this.currentWeatherData.condition];
      console.log(this.currentWeatherData.condition);
      console.log("https://openweathermap.org/img/wn/".concat(this.currentWeatherData.conditionIcon, "@2x.png"));
      this.labelObject.formattedText = this.createFormattedString(this.conditionToTextMap[this.currentWeatherData.condition]);
      this.currentWeatherData.conditionIcon = weatherResponse.weather[0].icon;
    }

  },

  mounted() {
    var todaysDate = new Date();
    this.currentWeatherData.currentDate = "".concat(todaysDate.getDate(), " ").concat(this.months[todaysDate.getMonth()]);
    this.currentWeatherData.currentDay = "".concat(this.weekdays[todaysDate.getDay()]);
    this.getMyWeather();
  },

  data() {
    return {
      temperatureFontSize: 30,
      labelObject: null,
      weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      months: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      conditionToColorMap: {
        sunny: "#F1C40F",
        cloudy: "#95A5A6",
        cloudySun: "#A79251",
        lightRains: "#5DADE2",
        sunnyRains: "#8eb59c",
        heavyRains: "#2874A6",
        windy: "#D35400",
        thunderstorms: "#566573",
        fog: "#ABB2B9"
      },
      conditionToTextMap: {
        sunny: [{
          text: "It's going to be ",
          type: "normal"
        }, {
          text: "sunny",
          type: "#F1C40F"
        }, {
          text: " today!",
          type: "normal"
        }],
        cloudy: [{
          text: "Today's weather is ",
          type: "normal"
        }, {
          text: "cloudy",
          type: "#95A5A6"
        }, {
          text: " and ",
          type: "normal"
        }, {
          text: " dull",
          type: "#95A5A6"
        }, {
          text: "!",
          type: "normal"
        }],
        cloudySun: [{
          text: "Cloudy ",
          type: "#95A5A6"
        }, {
          text: "and ",
          type: "normal"
        }, {
          text: "sunny ",
          type: "#F1C40F"
        }, {
          text: "at the same time. Go for a drive perhaps?",
          type: "normal"
        }],
        lightRains: [{
          text: "Light rains ",
          type: "#5DADE2"
        }, {
          text: "today. Don't forget that umbrella!",
          type: "normal"
        }],
        sunnyRains: [{
          text: "Rains ",
          type: "#5DADE2"
        }, {
          text: "and ",
          type: "normal"
        }, {
          text: "sun",
          type: "#5DADE2"
        }, {
          text: ". You might see a rainbow!",
          type: "normal"
        }],
        heavyRains: [{
          text: "Its gonna ",
          type: "normal"
        }, {
          text: "fucking pour",
          type: "#2874A6"
        }, {
          text: ". Cats, dogs, even whales!",
          type: "normal"
        }],
        windy: [{
          text: "Windy ",
          type: "#D35400"
        }, {
          text: "AF! its gonna blow your wig off!",
          type: "normal"
        }],
        thunderstorms: [{
          text: "Rains ",
          type: "#566573"
        }, {
          text: "and ",
          type: "normal"
        }, {
          text: "thunder",
          type: "#566573"
        }, {
          text: "!!? Could the weather get any worse?!",
          type: "normal"
        }],
        fog: [{
          text: "Foggy ",
          type: "#ABB2B9"
        }, {
          text: "AF. Can you see anything ahead of you!",
          type: "normal"
        }]
      },
      currentWeatherData: {
        city: "",
        currentDay: "",
        currentDate: "",
        condition: "",
        conditionIcon: "",
        temperature: null,
        todaysText: "",
        temperatureColor: ""
      }
    };
  }

});

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/HelloWorld.vue?vue&type=style&index=0&id=763db97b&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.text-display-style[data-v-763db97b] {\n    padding: 10;\n    font-size: 60;\n    font-weight: bold;\n    line-height: -10;\n}\n.day-text[data-v-763db97b] {\n    padding-right: 30;\n    font-size: 30;\n    font-weight: 200;\n}\n.orange-text[data-v-763db97b] {\n    color: \"#FF0F0F\"\n}\n.temp-style[data-v-763db97b] {\n    padding-right: 30;\n\n    font-weight: bold;\n}\n", ""]);

// exports

    const application = __webpack_require__("../node_modules/tns-core-modules/application/application.js");
    __webpack_require__("../node_modules/tns-core-modules/ui/styling/style-scope.js");

    exports.forEach(cssExport => {
        if (cssExport.length > 1 && cssExport[1]) {
            // applying the second item of the export as it contains the css contents
            application.addCss(cssExport[1]);
        }
    });
    ;
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.hmrRefresh({ type: 'style', path: './components/HelloWorld.vue' });
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/HelloWorld.vue?vue&type=template&id=763db97b&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Page",
    { on: { loaded: _vm.onLoaded } },
    [
      _c(
        "GridLayout",
        { attrs: { columns: "*", rows: "auto,*,auto" } },
        [
          _c(
            "GridLayout",
            { attrs: { columns: "auto, *", row: "0", rows: "*" } },
            [
              _c("Image", {
                attrs: {
                  src:
                    "https://openweathermap.org/img/wn/" +
                    _vm.currentWeatherData.conditionIcon +
                    "@2x.png",
                  column: "0",
                  height: "100",
                  horizontalAlignment: "left",
                  iosOverflowSafeArea: "true",
                  margin: "20",
                  verticalAlignment: "middle",
                  width: "100"
                }
              }),
              _c("Label", {
                staticClass: "day-text",
                attrs: {
                  text: _vm.currentWeatherData.city,
                  column: "1",
                  textAlignment: "left",
                  verticalAlignment: "middle"
                }
              })
            ],
            1
          ),
          _c(
            "GridLayout",
            {
              attrs: {
                columns: "auto",
                horizontalAlignment: "center",
                row: "1",
                rows: "*"
              }
            },
            [
              _c(
                "StackLayout",
                { attrs: { verticalAlignment: "center" } },
                [
                  _c("Label", {
                    staticClass: "temp-style",
                    attrs: {
                      color: _vm.currentWeatherData.temperatureColor,
                      fontSize: _vm.temperatureFontSize,
                      text: _vm.getTemperatureText(),
                      row: "0",
                      textAlignment: "right"
                    }
                  }),
                  _c("Label", {
                    staticClass: "day-text",
                    attrs: {
                      text:
                        _vm.currentWeatherData.currentDay +
                        ", " +
                        _vm.currentWeatherData.currentDate,
                      row: "1",
                      textAlignment: "center"
                    }
                  })
                ],
                1
              )
            ],
            1
          ),
          _c(
            "GridLayout",
            {
              attrs: {
                columns: "*",
                marginBottom: "20",
                padding: "20",
                row: "2",
                rows: "*"
              }
            },
            [
              _c("Label", {
                staticClass: "text-display-style",
                attrs: { iosOverflowSafeArea: "true", textWrap: "true" },
                on: { loaded: _vm.onTodayLabelLoaded }
              })
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./ sync ^\\.\\/app\\.(css|scss|less|sass)$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app.css": "./app.css"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./ sync ^\\.\\/app\\.(css|scss|less|sass)$";

/***/ }),

/***/ "./ sync recursive (?<!\\bApp_Resources\\b.*)\\.(xml|css|js|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app.css": "./app.css",
	"./app.js": "./app.js",
	"./nativescript-geolocation/geolocation.common.js": "./nativescript-geolocation/geolocation.common.js",
	"./nativescript-geolocation/geolocation.js": "./nativescript-geolocation/geolocation.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./ sync recursive (?<!\\bApp_Resources\\b.*)\\.(xml|css|js|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$";

/***/ }),

/***/ "./app.css":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(false);
// imports
exports.i(__webpack_require__("../node_modules/css-loader/index.js?!../node_modules/nativescript-theme-core/css/core.light.css"), "");

// module
exports.push([module.i, "/*\nIn NativeScript, the app.css file is where you place CSS rules that\nyou would like to apply to your entire application. Check out\nhttp://docs.nativescript.org/ui/styling for a full list of the CSS\nselectors and properties you can use to style UI components.\n\n/*\nIn many cases you may want to use the NativeScript core theme instead\nof writing your own CSS rules. For a full list of class names in the theme\nrefer to http://docs.nativescript.org/ui/theme.\nThe imported CSS rules must precede all other types of rules.\n*/\n", ""]);

// exports
;
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.hmrRefresh({ type: 'style', path: './app.css' });
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./app.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-vue/dist/index.js");
/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nativescript_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_HelloWorld__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/HelloWorld.vue");

            __webpack_require__("../node_modules/nativescript-dev-webpack/load-application-css-regular.js")();
            
            
        if (true) {
            const hmrUpdate = __webpack_require__("../node_modules/nativescript-dev-webpack/hmr/index.js").hmrUpdate;
            global.__initialHmrUpdate = true;
            global.__hmrSyncBackup = global.__onLiveSync;

            global.__onLiveSync = function () {
                hmrUpdate();
            };

            global.hmrRefresh = function({ type, path } = {}) {
                if (global.__initialHmrUpdate) {
                    return;
                }

                setTimeout(() => {
                    global.__hmrSyncBackup({ type, path });
                });
            };

            hmrUpdate().then(() => {
                global.__initialHmrUpdate = false;
            })
        }
        
            const context = __webpack_require__("./ sync recursive (?<!\\bApp_Resources\\b.*)\\.(xml|css|js|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$");
            global.registerWebpackModules(context);
            if (true) {
                module.hot.accept(context.id, () => { 
                    console.log("HMR: Accept module '" + context.id + "' from '" + module.i + "'"); 
                });
            }
            
        __webpack_require__("../node_modules/tns-core-modules/bundle-entry-points.js");
        
 // Uncommment the following to see NativeScript-Vue output logs

nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.config.silent = false;
new nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a({
  template: "\n        <Frame>\n            <HelloWorld />\n        </Frame>",
  components: {
    HelloWorld: _components_HelloWorld__WEBPACK_IMPORTED_MODULE_1__["default"]
  }
}).$start();
    
        
        
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./components/HelloWorld.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HelloWorld_vue_vue_type_template_id_763db97b_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/HelloWorld.vue?vue&type=template&id=763db97b&scoped=true&");
/* harmony import */ var _HelloWorld_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/HelloWorld.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _HelloWorld_vue_vue_type_style_index_0_id_763db97b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/HelloWorld.vue?vue&type=style&index=0&id=763db97b&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _HelloWorld_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _HelloWorld_vue_vue_type_template_id_763db97b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _HelloWorld_vue_vue_type_template_id_763db97b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "763db97b",
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!api.isRecorded('763db97b')) {
      api.createRecord('763db97b', component.options)
    } else {
      api.reload('763db97b', component.options)
    }
    module.hot.accept("./components/HelloWorld.vue?vue&type=template&id=763db97b&scoped=true&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _HelloWorld_vue_vue_type_template_id_763db97b_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/HelloWorld.vue?vue&type=template&id=763db97b&scoped=true&");
(function () {
      api.rerender('763db97b', {
        render: _HelloWorld_vue_vue_type_template_id_763db97b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _HelloWorld_vue_vue_type_template_id_763db97b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))
  }
}
component.options.__file = "components/HelloWorld.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/HelloWorld.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/HelloWorld.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/HelloWorld.vue?vue&type=style&index=0&id=763db97b&scoped=true&lang=css&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_1_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_style_index_0_id_763db97b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/HelloWorld.vue?vue&type=style&index=0&id=763db97b&scoped=true&lang=css&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_1_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_style_index_0_id_763db97b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_1_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_style_index_0_id_763db97b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_1_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_style_index_0_id_763db97b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_1_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_style_index_0_id_763db97b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_1_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_style_index_0_id_763db97b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./components/HelloWorld.vue?vue&type=template&id=763db97b&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_template_id_763db97b_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/HelloWorld.vue?vue&type=template&id=763db97b&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_template_id_763db97b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HelloWorld_vue_vue_type_template_id_763db97b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./nativescript-geolocation/geolocation.common.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var LocationBase = function () {
  function LocationBase() {}

  return LocationBase;
}();

exports.LocationBase = LocationBase;
exports.defaultGetLocationTimeout = 5 * 60 * 1000;
exports.minRangeUpdate = 0.1;
exports.minTimeUpdate = 1 * 60 * 1000;
exports.fastestTimeUpdate = 5 * 1000;

/***/ }),

/***/ "./nativescript-geolocation/geolocation.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var enums_1 = __webpack_require__("../node_modules/tns-core-modules/ui/enums/enums.js");

var timer_1 = __webpack_require__("../node_modules/tns-core-modules/timer/timer.js");

var application_1 = __webpack_require__("../node_modules/tns-core-modules/application/application.js");

var utils = __webpack_require__("../node_modules/tns-core-modules/utils/utils.js");

var geolocation_common_1 = __webpack_require__("./nativescript-geolocation/geolocation.common.js");

var Platform = __webpack_require__("../node_modules/tns-core-modules/platform/platform.js");

var locationManagers = {};
var locationListeners = {};
var watchId = 0;
var attachedForErrorHandling = false;

var LocationListenerImpl = function (_super) {
  __extends(LocationListenerImpl, _super);

  function LocationListenerImpl() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  LocationListenerImpl.initWithLocationError = function (successCallback, error) {
    var listener = LocationListenerImpl.new();
    watchId++;
    listener.id = watchId;
    listener._onLocation = successCallback;
    listener._onError = error;
    return listener;
  };

  LocationListenerImpl.initWithPromiseCallbacks = function (resolve, reject, authorizeAlways) {
    if (authorizeAlways === void 0) {
      authorizeAlways = false;
    }

    var listener = LocationListenerImpl.new();
    watchId++;
    listener.id = watchId;
    listener._resolve = resolve;
    listener._reject = reject;
    listener.authorizeAlways = authorizeAlways;
    return listener;
  };

  LocationListenerImpl.prototype.locationManagerDidUpdateLocations = function (manager, locations) {
    if (this._onLocation) {
      for (var i = 0, count = locations.count; i < count; i++) {
        var location_1 = locationFromCLLocation(locations.objectAtIndex(i));

        this._onLocation(location_1);
      }
    }
  };

  LocationListenerImpl.prototype.locationManagerDidFailWithError = function (manager, error) {
    if (this._onError) {
      this._onError(new Error(error.localizedDescription));
    }
  };

  LocationListenerImpl.prototype.locationManagerDidChangeAuthorizationStatus = function (manager, status) {
    switch (status) {
      case 0:
        break;

      case 1:
        break;

      case 2:
        if (this._reject) {
          LocationMonitor.stopLocationMonitoring(this.id);

          this._reject(new Error("Authorization Denied."));
        }

        break;

      case 3:
      case 4:
        if (this._resolve) {
          LocationMonitor.stopLocationMonitoring(this.id);

          this._resolve();
        }

        break;

      default:
        break;
    }
  };

  LocationListenerImpl.ObjCProtocols = [CLLocationManagerDelegate];
  return LocationListenerImpl;
}(NSObject);

function locationFromCLLocation(clLocation) {
  var location = new Location();
  location.latitude = clLocation.coordinate.latitude;
  location.longitude = clLocation.coordinate.longitude;
  location.altitude = clLocation.altitude;
  location.horizontalAccuracy = clLocation.horizontalAccuracy;
  location.verticalAccuracy = clLocation.verticalAccuracy;
  location.speed = clLocation.speed;
  location.direction = clLocation.course;
  var timeIntervalSince1970 = NSDate.dateWithTimeIntervalSinceDate(0, clLocation.timestamp).timeIntervalSince1970;
  location.timestamp = new Date(timeIntervalSince1970 * 1000);
  location.ios = clLocation;
  return location;
}

function clLocationFromLocation(location) {
  var hAccuracy = location.horizontalAccuracy ? location.horizontalAccuracy : -1;
  var vAccuracy = location.verticalAccuracy ? location.verticalAccuracy : -1;
  var speed = location.speed ? location.speed : -1;
  var course = location.direction ? location.direction : -1;
  var altitude = location.altitude ? location.altitude : -1;
  var timestamp = location.timestamp ? location.timestamp : null;
  var iosLocation = CLLocation.alloc().initWithCoordinateAltitudeHorizontalAccuracyVerticalAccuracyCourseSpeedTimestamp(CLLocationCoordinate2DMake(location.latitude, location.longitude), altitude, hAccuracy, vAccuracy, course, speed, timestamp);
  return iosLocation;
}

function errorHandler(errData) {
  while (watchId !== 0) {
    clearWatch(watchId);
    watchId--;
  }
}

function getVersionMaj() {
  return parseInt(Platform.device.osVersion.split(".")[0]);
}

function getCurrentLocation(options) {
  return new Promise(function (resolve, reject) {
    enableLocationRequest().then(function () {
      options = options || {};

      if (options.timeout === 0) {
        var lastLocation = LocationMonitor.getLastKnownLocation();

        if (lastLocation) {
          if (typeof options.maximumAge === "number") {
            if (lastLocation.timestamp.valueOf() + options.maximumAge > new Date().valueOf()) {
              resolve(lastLocation);
            } else {
              reject(new Error("Last known location too old!"));
            }
          } else {
            resolve(lastLocation);
          }
        } else {
          reject(new Error("There is no last known location!"));
        }
      } else {
        var timerId_1;
        var locListener_1;
        var initLocation_1;

        var stopTimerAndMonitor_1 = function stopTimerAndMonitor_1(locListenerId) {
          if (timerId_1 !== undefined) {
            timer_1.clearTimeout(timerId_1);
          }

          LocationMonitor.stopLocationMonitoring(locListenerId);
        };

        var successCallback = function successCallback(location) {
          if (getVersionMaj() < 9) {
            if (typeof options.maximumAge === "number" && location.timestamp.valueOf() + options.maximumAge < new Date().valueOf()) {
              return;
            }

            if (options.desiredAccuracy !== enums_1.Accuracy.any && !initLocation_1) {
              initLocation_1 = location;
              return;
            }
          }

          stopTimerAndMonitor_1(locListener_1.id);
          resolve(location);
        };

        locListener_1 = LocationListenerImpl.initWithLocationError(successCallback, reject);

        try {
          if (getVersionMaj() >= 9) {
            LocationMonitor.requestLocation(options, locListener_1);
          } else {
            LocationMonitor.startLocationMonitoring(options, locListener_1);
          }
        } catch (e) {
          stopTimerAndMonitor_1(locListener_1.id);
          reject(e);
        }

        if (typeof options.timeout === "number") {
          timerId_1 = timer_1.setTimeout(function () {
            LocationMonitor.stopLocationMonitoring(locListener_1.id);
            reject(new Error("Timeout while searching for location!"));
          }, options.timeout || geolocation_common_1.defaultGetLocationTimeout);
        }
      }
    }, reject);
  });
}

exports.getCurrentLocation = getCurrentLocation;

function watchLocation(successCallback, errorCallback, options) {
  if (!attachedForErrorHandling) {
    attachedForErrorHandling = true;
    application_1.on(application_1.uncaughtErrorEvent, errorHandler.bind(this));
  }

  var zonedSuccessCallback = global.zonedCallback(successCallback);
  var zonedErrorCallback = global.zonedCallback(errorCallback);
  var locListener = LocationListenerImpl.initWithLocationError(zonedSuccessCallback, zonedErrorCallback);

  try {
    var iosLocManager = getIOSLocationManager(locListener, options);
    iosLocManager.startUpdatingLocation();
    return locListener.id;
  } catch (e) {
    LocationMonitor.stopLocationMonitoring(locListener.id);
    zonedErrorCallback(e);
    return null;
  }
}

exports.watchLocation = watchLocation;

function clearWatch(_watchId) {
  LocationMonitor.stopLocationMonitoring(_watchId);
}

exports.clearWatch = clearWatch;

function enableLocationRequest(always, iosOpenSettingsIfLocationHasBeenDenied) {
  return new Promise(function (resolve, reject) {
    var locationIsEnabled = _isEnabled();

    if (locationIsEnabled) {
      resolve();
      return;
    } else {
      var status_1 = getIOSLocationManagerStatus();

      if (status_1 === 2 && iosOpenSettingsIfLocationHasBeenDenied) {
        utils.ios.getter(UIApplication, UIApplication.sharedApplication).openURL(NSURL.URLWithString(UIApplicationOpenSettingsURLString));
      } else {
        var listener = LocationListenerImpl.initWithPromiseCallbacks(resolve, reject, always);

        try {
          var manager = getIOSLocationManager(listener, null);

          if (always) {
            manager.requestAlwaysAuthorization();
          } else {
            manager.requestWhenInUseAuthorization();
          }
        } catch (e) {
          LocationMonitor.stopLocationMonitoring(listener.id);
          reject(e);
        }
      }
    }
  });
}

exports.enableLocationRequest = enableLocationRequest;

function _isEnabled() {
  if (CLLocationManager.locationServicesEnabled()) {
    var status_2 = getIOSLocationManagerStatus();
    return status_2 === 4 || status_2 === 3 || status_2 === 3;
  }

  return false;
}

function isEnabled(options) {
  return new Promise(function (resolve, reject) {
    var isEnabledResult = _isEnabled();

    resolve(isEnabledResult);
  });
}

exports.isEnabled = isEnabled;

function getIOSLocationManagerStatus() {
  return CLLocationManager.authorizationStatus();
}

exports.getIOSLocationManagerStatus = getIOSLocationManagerStatus;

function distance(loc1, loc2) {
  if (!loc1.ios) {
    loc1.ios = clLocationFromLocation(loc1);
  }

  if (!loc2.ios) {
    loc2.ios = clLocationFromLocation(loc2);
  }

  return loc1.ios.distanceFromLocation(loc2.ios);
}

exports.distance = distance;

var LocationMonitor = function () {
  function LocationMonitor() {}

  LocationMonitor.getLastKnownLocation = function () {
    var iosLocation;

    for (var locManagerId in locationManagers) {
      if (locationManagers.hasOwnProperty(locManagerId)) {
        var tempLocation = locationManagers[locManagerId].location;

        if (!iosLocation || tempLocation.timestamp > iosLocation.timestamp) {
          iosLocation = tempLocation;
        }
      }
    }

    if (iosLocation) {
      return locationFromCLLocation(iosLocation);
    }

    var locListener = LocationListenerImpl.initWithLocationError(null);
    iosLocation = getIOSLocationManager(locListener, null).location;

    if (iosLocation) {
      return locationFromCLLocation(iosLocation);
    }

    return null;
  };

  LocationMonitor.requestLocation = function (options, locListener) {
    var iosLocManager = getIOSLocationManager(locListener, options);
    iosLocManager.requestLocation();
  };

  LocationMonitor.startLocationMonitoring = function (options, locListener) {
    var iosLocManager = getIOSLocationManager(locListener, options);
    iosLocManager.startUpdatingLocation();
  };

  LocationMonitor.stopLocationMonitoring = function (iosLocManagerId) {
    if (locationManagers[iosLocManagerId]) {
      locationManagers[iosLocManagerId].stopUpdatingLocation();
      locationManagers[iosLocManagerId].delegate = null;
      delete locationManagers[iosLocManagerId];
      delete locationListeners[iosLocManagerId];
    }
  };

  LocationMonitor.createiOSLocationManager = function (locListener, options) {
    var iosLocManager = new CLLocationManager();
    iosLocManager.delegate = locListener;
    iosLocManager.desiredAccuracy = options ? options.desiredAccuracy : enums_1.Accuracy.high;
    iosLocManager.distanceFilter = options ? options.updateDistance : geolocation_common_1.minRangeUpdate;
    locationManagers[locListener.id] = iosLocManager;
    locationListeners[locListener.id] = locListener;

    if (getVersionMaj() >= 9) {
      iosLocManager.allowsBackgroundLocationUpdates = options && options.iosAllowsBackgroundLocationUpdates != null ? options.iosAllowsBackgroundLocationUpdates : false;
    }

    iosLocManager.pausesLocationUpdatesAutomatically = options && options.iosPausesLocationUpdatesAutomatically != null ? options.iosPausesLocationUpdatesAutomatically : true;
    return iosLocManager;
  };

  return LocationMonitor;
}();

exports.LocationMonitor = LocationMonitor;
var iosLocationManager;

function getIOSLocationManager(locListener, options) {
  if (!iosLocationManager) {
    return LocationMonitor.createiOSLocationManager(locListener, options);
  } else {
    var manager = new iosLocationManager();
    manager.delegate = locListener;
    manager.desiredAccuracy = options ? options.desiredAccuracy : enums_1.Accuracy.high;
    manager.distanceFilter = options ? options.updateDistance : geolocation_common_1.minRangeUpdate;
    locationManagers[locListener.id] = manager;
    locationListeners[locListener.id] = locListener;
    return manager;
  }
}

function setCustomLocationManager(manager) {
  iosLocationManager = function iosLocationManager() {
    return manager;
  };
}

exports.setCustomLocationManager = setCustomLocationManager;

var Location = function (_super) {
  __extends(Location, _super);

  function Location() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return Location;
}(geolocation_common_1.LocationBase);

exports.Location = Location;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./package.json":
/***/ (function(module) {

module.exports = JSON.parse("{\"android\":{\"v8Flags\":\"--expose_gc\",\"forceLog\":true},\"main\":\"app.js\",\"name\":\"tns-template-vue\",\"version\":\"3.2.0\"}");

/***/ })

},[["./app.js","runtime","vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vY29tcG9uZW50cy9IZWxsb1dvcmxkLnZ1ZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0hlbGxvV29ybGQudnVlPzE5Y2IiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9IZWxsb1dvcmxkLnZ1ZT8wMGI1Iiwid2VicGFjazovLy8uIHN5bmMgbm9ucmVjdXJzaXZlIF5cXC5cXC9hcHBcXC4oY3NzfHNjc3N8bGVzc3xzYXNzKSQiLCJ3ZWJwYWNrOi8vL1xcYl9bXFx3LV0qXFwuKXNjc3MpJCIsIndlYnBhY2s6Ly8vLi9hcHAuY3NzIiwid2VicGFjazovLy8uL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0hlbGxvV29ybGQudnVlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWU/MjhkYSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0hlbGxvV29ybGQudnVlPzVlYWMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9IZWxsb1dvcmxkLnZ1ZT83ODMyIiwid2VicGFjazovLy8uL25hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvbi9nZW9sb2NhdGlvbi5jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vbmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uL2dlb2xvY2F0aW9uLmpzIl0sIm5hbWVzIjpbIkhlbGxvV29ybGQiLCJWdWUiLCJjb25maWciLCJzaWxlbnQiLCJ0ZW1wbGF0ZSIsImNvbXBvbmVudHMiLCIkc3RhcnQiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsIkxvY2F0aW9uQmFzZSIsImRlZmF1bHRHZXRMb2NhdGlvblRpbWVvdXQiLCJtaW5SYW5nZVVwZGF0ZSIsIm1pblRpbWVVcGRhdGUiLCJmYXN0ZXN0VGltZVVwZGF0ZSIsImVudW1zXzEiLCJyZXF1aXJlIiwidGltZXJfMSIsImFwcGxpY2F0aW9uXzEiLCJ1dGlscyIsImdlb2xvY2F0aW9uX2NvbW1vbl8xIiwiUGxhdGZvcm0iLCJsb2NhdGlvbk1hbmFnZXJzIiwibG9jYXRpb25MaXN0ZW5lcnMiLCJ3YXRjaElkIiwiYXR0YWNoZWRGb3JFcnJvckhhbmRsaW5nIiwiTG9jYXRpb25MaXN0ZW5lckltcGwiLCJfc3VwZXIiLCJfX2V4dGVuZHMiLCJhcHBseSIsImFyZ3VtZW50cyIsImluaXRXaXRoTG9jYXRpb25FcnJvciIsInN1Y2Nlc3NDYWxsYmFjayIsImVycm9yIiwibGlzdGVuZXIiLCJuZXciLCJpZCIsIl9vbkxvY2F0aW9uIiwiX29uRXJyb3IiLCJpbml0V2l0aFByb21pc2VDYWxsYmFja3MiLCJyZXNvbHZlIiwicmVqZWN0IiwiYXV0aG9yaXplQWx3YXlzIiwiX3Jlc29sdmUiLCJfcmVqZWN0IiwicHJvdG90eXBlIiwibG9jYXRpb25NYW5hZ2VyRGlkVXBkYXRlTG9jYXRpb25zIiwibWFuYWdlciIsImxvY2F0aW9ucyIsImkiLCJjb3VudCIsImxvY2F0aW9uXzEiLCJsb2NhdGlvbkZyb21DTExvY2F0aW9uIiwib2JqZWN0QXRJbmRleCIsImxvY2F0aW9uTWFuYWdlckRpZEZhaWxXaXRoRXJyb3IiLCJFcnJvciIsImxvY2FsaXplZERlc2NyaXB0aW9uIiwibG9jYXRpb25NYW5hZ2VyRGlkQ2hhbmdlQXV0aG9yaXphdGlvblN0YXR1cyIsInN0YXR1cyIsIkxvY2F0aW9uTW9uaXRvciIsInN0b3BMb2NhdGlvbk1vbml0b3JpbmciLCJPYmpDUHJvdG9jb2xzIiwiQ0xMb2NhdGlvbk1hbmFnZXJEZWxlZ2F0ZSIsIk5TT2JqZWN0IiwiY2xMb2NhdGlvbiIsImxvY2F0aW9uIiwiTG9jYXRpb24iLCJsYXRpdHVkZSIsImNvb3JkaW5hdGUiLCJsb25naXR1ZGUiLCJhbHRpdHVkZSIsImhvcml6b250YWxBY2N1cmFjeSIsInZlcnRpY2FsQWNjdXJhY3kiLCJzcGVlZCIsImRpcmVjdGlvbiIsImNvdXJzZSIsInRpbWVJbnRlcnZhbFNpbmNlMTk3MCIsIk5TRGF0ZSIsImRhdGVXaXRoVGltZUludGVydmFsU2luY2VEYXRlIiwidGltZXN0YW1wIiwiRGF0ZSIsImlvcyIsImNsTG9jYXRpb25Gcm9tTG9jYXRpb24iLCJoQWNjdXJhY3kiLCJ2QWNjdXJhY3kiLCJpb3NMb2NhdGlvbiIsIkNMTG9jYXRpb24iLCJhbGxvYyIsImluaXRXaXRoQ29vcmRpbmF0ZUFsdGl0dWRlSG9yaXpvbnRhbEFjY3VyYWN5VmVydGljYWxBY2N1cmFjeUNvdXJzZVNwZWVkVGltZXN0YW1wIiwiQ0xMb2NhdGlvbkNvb3JkaW5hdGUyRE1ha2UiLCJlcnJvckhhbmRsZXIiLCJlcnJEYXRhIiwiY2xlYXJXYXRjaCIsImdldFZlcnNpb25NYWoiLCJwYXJzZUludCIsImRldmljZSIsIm9zVmVyc2lvbiIsInNwbGl0IiwiZ2V0Q3VycmVudExvY2F0aW9uIiwib3B0aW9ucyIsIlByb21pc2UiLCJlbmFibGVMb2NhdGlvblJlcXVlc3QiLCJ0aGVuIiwidGltZW91dCIsImxhc3RMb2NhdGlvbiIsImdldExhc3RLbm93bkxvY2F0aW9uIiwibWF4aW11bUFnZSIsInZhbHVlT2YiLCJ0aW1lcklkXzEiLCJsb2NMaXN0ZW5lcl8xIiwiaW5pdExvY2F0aW9uXzEiLCJzdG9wVGltZXJBbmRNb25pdG9yXzEiLCJsb2NMaXN0ZW5lcklkIiwidW5kZWZpbmVkIiwiY2xlYXJUaW1lb3V0IiwiZGVzaXJlZEFjY3VyYWN5IiwiQWNjdXJhY3kiLCJhbnkiLCJyZXF1ZXN0TG9jYXRpb24iLCJzdGFydExvY2F0aW9uTW9uaXRvcmluZyIsImUiLCJzZXRUaW1lb3V0Iiwid2F0Y2hMb2NhdGlvbiIsImVycm9yQ2FsbGJhY2siLCJvbiIsInVuY2F1Z2h0RXJyb3JFdmVudCIsImJpbmQiLCJ6b25lZFN1Y2Nlc3NDYWxsYmFjayIsImdsb2JhbCIsInpvbmVkQ2FsbGJhY2siLCJ6b25lZEVycm9yQ2FsbGJhY2siLCJsb2NMaXN0ZW5lciIsImlvc0xvY01hbmFnZXIiLCJnZXRJT1NMb2NhdGlvbk1hbmFnZXIiLCJzdGFydFVwZGF0aW5nTG9jYXRpb24iLCJfd2F0Y2hJZCIsImFsd2F5cyIsImlvc09wZW5TZXR0aW5nc0lmTG9jYXRpb25IYXNCZWVuRGVuaWVkIiwibG9jYXRpb25Jc0VuYWJsZWQiLCJfaXNFbmFibGVkIiwic3RhdHVzXzEiLCJnZXRJT1NMb2NhdGlvbk1hbmFnZXJTdGF0dXMiLCJnZXR0ZXIiLCJVSUFwcGxpY2F0aW9uIiwic2hhcmVkQXBwbGljYXRpb24iLCJvcGVuVVJMIiwiTlNVUkwiLCJVUkxXaXRoU3RyaW5nIiwiVUlBcHBsaWNhdGlvbk9wZW5TZXR0aW5nc1VSTFN0cmluZyIsInJlcXVlc3RBbHdheXNBdXRob3JpemF0aW9uIiwicmVxdWVzdFdoZW5JblVzZUF1dGhvcml6YXRpb24iLCJDTExvY2F0aW9uTWFuYWdlciIsImxvY2F0aW9uU2VydmljZXNFbmFibGVkIiwic3RhdHVzXzIiLCJpc0VuYWJsZWQiLCJpc0VuYWJsZWRSZXN1bHQiLCJhdXRob3JpemF0aW9uU3RhdHVzIiwiZGlzdGFuY2UiLCJsb2MxIiwibG9jMiIsImRpc3RhbmNlRnJvbUxvY2F0aW9uIiwibG9jTWFuYWdlcklkIiwiaGFzT3duUHJvcGVydHkiLCJ0ZW1wTG9jYXRpb24iLCJpb3NMb2NNYW5hZ2VySWQiLCJzdG9wVXBkYXRpbmdMb2NhdGlvbiIsImRlbGVnYXRlIiwiY3JlYXRlaU9TTG9jYXRpb25NYW5hZ2VyIiwiaGlnaCIsImRpc3RhbmNlRmlsdGVyIiwidXBkYXRlRGlzdGFuY2UiLCJhbGxvd3NCYWNrZ3JvdW5kTG9jYXRpb25VcGRhdGVzIiwiaW9zQWxsb3dzQmFja2dyb3VuZExvY2F0aW9uVXBkYXRlcyIsInBhdXNlc0xvY2F0aW9uVXBkYXRlc0F1dG9tYXRpY2FsbHkiLCJpb3NQYXVzZXNMb2NhdGlvblVwZGF0ZXNBdXRvbWF0aWNhbGx5IiwiaW9zTG9jYXRpb25NYW5hZ2VyIiwic2V0Q3VzdG9tTG9jYXRpb25NYW5hZ2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMENBOztBQUNBOztBQUNBOztBQUVBO0FBQ0E7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QmhCLE9BQU8sR0FBR0EsT0FBTyxDQUFDZ0IsZUFBWCxHQUE2QnBHLE9BQU8sQ0FBQ3FHLFFBQVIsQ0FBaUJvRCxJQUEvRTtBQUNBekgsV0FBTyxDQUFDMEgsY0FBUixHQUF5QnRFLE9BQU8sR0FBR0EsT0FBTyxDQUFDdUUsY0FBWCxHQUE0QnRKLG9CQUFvQixDQUFDUixjQUFqRjtBQUNBVSxvQkFBZ0IsQ0FBQzZHLFdBQVcsQ0FBQy9GLEVBQWIsQ0FBaEIsR0FBbUNXLE9BQW5DO0FBQ0F4QixxQkFBaUIsQ0FBQzRHLFdBQVcsQ0FBQy9GLEVBQWIsQ0FBakIsR0FBb0MrRixXQUFwQztBQUNBLFdBQU9wRixPQUFQO0FBQ0g7QUFDSjs7QUFDRCxTQUFTaUksd0JBQVQsQ0FBa0NqSSxPQUFsQyxFQUEyQztBQUN2Q2dJLG9CQUFrQixHQUFHLDhCQUFZO0FBQUUsV0FBT2hJLE9BQVA7QUFBaUIsR0FBcEQ7QUFDSDs7QUFDRHZDLE9BQU8sQ0FBQ3dLLHdCQUFSLEdBQW1DQSx3QkFBbkM7O0FBQ0EsSUFBSTlHLFFBQVEsR0FBSSxVQUFVdkMsTUFBVixFQUFrQjtBQUM5QkMsV0FBUyxDQUFDc0MsUUFBRCxFQUFXdkMsTUFBWCxDQUFUOztBQUNBLFdBQVN1QyxRQUFULEdBQW9CO0FBQ2hCLFdBQU92QyxNQUFNLEtBQUssSUFBWCxJQUFtQkEsTUFBTSxDQUFDRSxLQUFQLENBQWEsSUFBYixFQUFtQkMsU0FBbkIsQ0FBbkIsSUFBb0QsSUFBM0Q7QUFDSDs7QUFDRCxTQUFPb0MsUUFBUDtBQUNILENBTmUsQ0FNZDlDLG9CQUFvQixDQUFDVixZQU5QLENBQWhCOztBQU9BRixPQUFPLENBQUMwRCxRQUFSLEdBQW1CQSxRQUFuQixDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgICA8UGFnZSBAbG9hZGVkPVwib25Mb2FkZWRcIj5cbiAgICAgICAgPEdyaWRMYXlvdXQgY29sdW1ucz1cIipcIiByb3dzPVwiYXV0bywqLGF1dG9cIj5cbiAgICAgICAgICAgIDxHcmlkTGF5b3V0IGNvbHVtbnM9XCJhdXRvLCAqXCIgcm93PVwiMFwiIHJvd3M9XCIqXCI+XG4gICAgICAgICAgICAgICAgPEltYWdlIDpzcmM9XCJgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7Y3VycmVudFdlYXRoZXJEYXRhLmNvbmRpdGlvbkljb259QDJ4LnBuZ2BcIiBjb2x1bW49XCIwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PVwiMTAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbEFsaWdubWVudD1cImxlZnRcIiBpb3NPdmVyZmxvd1NhZmVBcmVhPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbj1cIjIwXCIgdmVydGljYWxBbGlnbm1lbnQ9XCJtaWRkbGVcIlxuXG4gICAgICAgICAgICAgICAgICAgICAgIHdpZHRoPVwiMTAwXCI+PC9JbWFnZT5cbiAgICAgICAgICAgICAgICA8TGFiZWwgOnRleHQ9XCJjdXJyZW50V2VhdGhlckRhdGEuY2l0eVwiIGNsYXNzPVwiZGF5LXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW49XCIxXCIgdGV4dEFsaWdubWVudD1cImxlZnRcIlxuICAgICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbEFsaWdubWVudD1cIm1pZGRsZVwiPjwvTGFiZWw+XG4gICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG5cbiAgICAgICAgICAgIDxHcmlkTGF5b3V0IGNvbHVtbnM9XCJhdXRvXCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImNlbnRlclwiIHJvdz1cIjFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgcm93cz1cIipcIj5cbiAgICAgICAgICAgICAgICA8U3RhY2tMYXlvdXQgdmVydGljYWxBbGlnbm1lbnQ9XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPExhYmVsIDpjb2xvcj1cImN1cnJlbnRXZWF0aGVyRGF0YS50ZW1wZXJhdHVyZUNvbG9yXCIgOmZvbnRTaXplPVwidGVtcGVyYXR1cmVGb250U2l6ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA6dGV4dD1cImdldFRlbXBlcmF0dXJlVGV4dCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidGVtcC1zdHlsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByb3c9XCIwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbm1lbnQ9XCJyaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICA8L0xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8TGFiZWwgOnRleHQ9XCJgJHtjdXJyZW50V2VhdGhlckRhdGEuY3VycmVudERheX0sICR7Y3VycmVudFdlYXRoZXJEYXRhLmN1cnJlbnREYXRlfWBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJkYXktdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByb3c9XCIxXCIgdGV4dEFsaWdubWVudD1cImNlbnRlclwiPjwvTGFiZWw+XG4gICAgICAgICAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICAgICAgICAgIDwvR3JpZExheW91dD5cbiAgICAgICAgICAgIDxHcmlkTGF5b3V0IGNvbHVtbnM9XCIqXCIgbWFyZ2luQm90dG9tPVwiMjBcIiBwYWRkaW5nPVwiMjBcIiByb3c9XCIyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M9XCIqXCI+XG4gICAgICAgICAgICAgICAgPExhYmVsIEBsb2FkZWQ9XCJvblRvZGF5TGFiZWxMb2FkZWRcIiBjbGFzcz1cInRleHQtZGlzcGxheS1zdHlsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgIGlvc092ZXJmbG93U2FmZUFyZWE9XCJ0cnVlXCIgdGV4dFdyYXA9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgPC9MYWJlbD5cbiAgICAgICAgICAgIDwvR3JpZExheW91dD5cbiAgICAgICAgPC9HcmlkTGF5b3V0PlxuXG5cbiAgICA8L1BhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGNvbnN0IEdlb2xvY2F0aW9uID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvblwiKTtcbiAgICBjb25zdCBBY2N1cmFjeSA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2VudW1zXCIpO1xuICAgIGNvbnN0IGh0dHAgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9odHRwXCIpO1xuXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBmaWx0ZXJzOiB7XG4gICAgICAgICAgICBsb3dlcmNhc2U6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIG9uVG9kYXlMYWJlbExvYWRlZChhcmdzKSB7XG4gICAgICAgICAgICAgICAgLy86dGV4dD1cImN1cnJlbnRXZWF0aGVyRGF0YS50b2RheXNUZXh0XCJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNldHRpbmcgbGFiZWwgOiBcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbE9iamVjdCA9IGFyZ3Mub2JqZWN0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNyZWF0ZUZvcm1hdHRlZFN0cmluZyhzdHJpbmdzVG9Gb3JtYXQpIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHN0cmluZ3NUb0Zvcm1hdCk7XG4gICAgICAgICAgICAgICAgaWYgKHN0cmluZ3NUb0Zvcm1hdCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRTdHJpbmcgPSByZXF1aXJlKFwidGV4dC9mb3JtYXR0ZWQtc3RyaW5nXCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRTcGFuID0gcmVxdWlyZShcInRleHQvc3BhblwiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgQ29sb3JNb2R1bGUgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9jb2xvclwiKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZzdHJpbmdUb1NlbmQgPSBuZXcgZm9ybWF0dGVkU3RyaW5nLkZvcm1hdHRlZFN0cmluZygpO1xuXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZ3NUb0Zvcm1hdC5mb3JFYWNoKChjdXJyZW50U3RyRnJhZ21lbnQsIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZzcGFuID0gbmV3IGZvcm1hdHRlZFNwYW4uU3BhbigpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmc3Bhbi50ZXh0ID0gY3VycmVudFN0ckZyYWdtZW50LnRleHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY3VycmVudFN0ckZyYWdtZW50LnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwibm9ybWFsXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZzcGFuLmNvbG9yID0gbmV3IENvbG9yTW9kdWxlLkNvbG9yKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJibGFja1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNVU1RPTSBzZXR0aW5nIGFueXRoaW5nXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmc3Bhbi5jb2xvciA9IG5ldyBDb2xvck1vZHVsZS5Db2xvcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdHJGcmFnbWVudC50eXBlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZzcGFuLmNsYXNzID0gXCJvcmFuZ2UtdGV4dFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZzdHJpbmdUb1NlbmQuc3BhbnMucHVzaChmc3Bhbik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGZzdHJpbmdUb1NlbmQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnN0cmluZ1RvU2VuZDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uTG9hZGVkKCkge1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFRlbXBlcmF0dXJlVGV4dCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50V2VhdGhlckRhdGEudGVtcGVyYXR1cmUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBlcmF0dXJlRm9udFNpemUgPSA1MDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiTG9hZGluZyAuLi5cIjtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcGVyYXR1cmVGb250U2l6ZSA9IDkwO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5jdXJyZW50V2VhdGhlckRhdGEudGVtcGVyYXR1cmV9wrBDYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0TXlXZWF0aGVyKCkge1xuICAgICAgICAgICAgICAgIEdlb2xvY2F0aW9uLmVuYWJsZUxvY2F0aW9uUmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgIEdlb2xvY2F0aW9uLmdldEN1cnJlbnRMb2NhdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIGRlc2lyZWRBY2N1cmFjeTogQWNjdXJhY3kuaGlnaCxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGlzdGFuY2U6IDAuMSxcbiAgICAgICAgICAgICAgICAgICAgdGltZW91dDogMjAwMDBcbiAgICAgICAgICAgICAgICB9KS50aGVuKFxuICAgICAgICAgICAgICAgICAgICBsb2MgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcHBJZCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZWQ4MjI2YmEzYTNjOGM3Y2U1NDA1YWYzNTZiODkwNmVcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9BUFBJRD1cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcElkICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCImdW5pdHM9bWV0cmljJmxhdD1cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYy5sYXRpdHVkZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiJmxvbj1cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYy5sb25naXR1ZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyp2YXIgdXJsID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9BUFBJRD1cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcElkICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCImdW5pdHM9bWV0cmljJnE9TXVtYmFpXCI7Ki9cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0dHAucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKHRoaXMucGFyc2VSZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGUubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFRlbXBlcmF0dXJlQ29sb3IodGVtcCkge1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wIDwgMTUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiIzg1QzFFOVwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGVtcCA8IDI1ICYmIHRlbXAgPj0gMTUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiI0Y0RDAzRlwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGVtcCA8IDM1ICYmIHRlbXAgPj0gMjUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiI0YzOUMxMlwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIiNFNzRDM0NcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0Q29uZGl0aW9uKHdlYXRoZXJEYXRhKSB7XG4gICAgICAgICAgICAgICAgbGV0IGZpcnN0RGlnaXQgPSB3ZWF0aGVyRGF0YS5pZC50b1N0cmluZygpLmNoYXJBdCgwKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbmRpdGlvbiBjb2RlOiBcIiArIHdlYXRoZXJEYXRhLmlkKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGZpcnN0RGlnaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIjJcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInRodW5kZXJzdG9ybXNcIjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIjNcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN1bm55UmFpbnNcIjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIjVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3ZWF0aGVyRGF0YS5pZCA9PSA1MDApIHJldHVybiBcImxpZ2h0UmFpbnNcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIFwiaGVhdnlSYWluc1wiO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiN1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiZm9nXCI7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCI4XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2VhdGhlckRhdGEuaWQgPT0gODAwKSByZXR1cm4gXCJzdW5ueVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAod2VhdGhlckRhdGEuaWQgPT0gODAxKSByZXR1cm4gXCJjbG91ZHlTdW5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIFwiY2xvdWR5XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhcnNlUmVzcG9uc2UocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgd2VhdGhlclJlc3BvbnNlID0gcmVzcG9uc2UuY29udGVudC50b0pTT04oKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRXZWF0aGVyRGF0YS5jaXR5ID0gd2VhdGhlclJlc3BvbnNlLm5hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50V2VhdGhlckRhdGEudGVtcGVyYXR1cmUgPSBNYXRoLmZsb29yKFxuICAgICAgICAgICAgICAgICAgICB3ZWF0aGVyUmVzcG9uc2UubWFpbi50ZW1wXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFdlYXRoZXJEYXRhLmNvbmRpdGlvbiA9IHRoaXMuZ2V0Q29uZGl0aW9uKFxuICAgICAgICAgICAgICAgICAgICB3ZWF0aGVyUmVzcG9uc2Uud2VhdGhlclswXVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50V2VhdGhlckRhdGEudGVtcGVyYXR1cmVDb2xvciA9IHRoaXNcbiAgICAgICAgICAgICAgICAgICAgLmNvbmRpdGlvblRvQ29sb3JNYXBbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFdlYXRoZXJEYXRhLmNvbmRpdGlvblxuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY3VycmVudFdlYXRoZXJEYXRhLmNvbmRpdGlvbik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYGh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke3RoaXMuY3VycmVudFdlYXRoZXJEYXRhLmNvbmRpdGlvbkljb259QDJ4LnBuZ2ApO1xuICAgICAgICAgICAgICAgIHRoaXMubGFiZWxPYmplY3QuZm9ybWF0dGVkVGV4dCA9IHRoaXMuY3JlYXRlRm9ybWF0dGVkU3RyaW5nKHRoaXMuY29uZGl0aW9uVG9UZXh0TWFwW3RoaXMuY3VycmVudFdlYXRoZXJEYXRhLmNvbmRpdGlvbl0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50V2VhdGhlckRhdGEuY29uZGl0aW9uSWNvbiA9IHdlYXRoZXJSZXNwb25zZS53ZWF0aGVyWzBdLmljb247XG5cblxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtb3VudGVkKCkge1xuICAgICAgICAgICAgbGV0IHRvZGF5c0RhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50V2VhdGhlckRhdGEuY3VycmVudERhdGUgPSBgJHt0b2RheXNEYXRlLmdldERhdGUoKX0gJHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vbnRoc1t0b2RheXNEYXRlLmdldE1vbnRoKCldXG4gICAgICAgICAgICB9YDtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFdlYXRoZXJEYXRhLmN1cnJlbnREYXkgPSBgJHtcbiAgICAgICAgICAgICAgICB0aGlzLndlZWtkYXlzW3RvZGF5c0RhdGUuZ2V0RGF5KCldXG4gICAgICAgICAgICB9YDtcblxuICAgICAgICAgICAgdGhpcy5nZXRNeVdlYXRoZXIoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdGVtcGVyYXR1cmVGb250U2l6ZTogMzAsXG4gICAgICAgICAgICAgICAgbGFiZWxPYmplY3Q6IG51bGwsXG4gICAgICAgICAgICAgICAgd2Vla2RheXM6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJTdW5kYXlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJNb25kYXlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJUdWVzZGF5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiV2VkbmVzZGF5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiVGh1cnNkYXlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJGcmlkYXlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJTYXR1cmRheVwiXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBtb250aHM6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJKYW5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJGZWJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJNYXJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJBcHJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJNYXlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJKdW5lXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiSnVseVwiLFxuICAgICAgICAgICAgICAgICAgICBcIkF1Z1wiLFxuICAgICAgICAgICAgICAgICAgICBcIlNlcHRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJPY3RcIixcbiAgICAgICAgICAgICAgICAgICAgXCJOb3ZcIixcbiAgICAgICAgICAgICAgICAgICAgXCJEZWNcIlxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgY29uZGl0aW9uVG9Db2xvck1hcDoge1xuICAgICAgICAgICAgICAgICAgICBzdW5ueTogXCIjRjFDNDBGXCIsXG4gICAgICAgICAgICAgICAgICAgIGNsb3VkeTogXCIjOTVBNUE2XCIsXG4gICAgICAgICAgICAgICAgICAgIGNsb3VkeVN1bjogXCIjQTc5MjUxXCIsXG4gICAgICAgICAgICAgICAgICAgIGxpZ2h0UmFpbnM6IFwiIzVEQURFMlwiLFxuICAgICAgICAgICAgICAgICAgICBzdW5ueVJhaW5zOiBcIiM4ZWI1OWNcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhdnlSYWluczogXCIjMjg3NEE2XCIsXG4gICAgICAgICAgICAgICAgICAgIHdpbmR5OiBcIiNEMzU0MDBcIixcbiAgICAgICAgICAgICAgICAgICAgdGh1bmRlcnN0b3JtczogXCIjNTY2NTczXCIsXG4gICAgICAgICAgICAgICAgICAgIGZvZzogXCIjQUJCMkI5XCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbmRpdGlvblRvVGV4dE1hcDoge1xuICAgICAgICAgICAgICAgICAgICBzdW5ueTogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiSXQncyBnb2luZyB0byBiZSBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcInN1bm55XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCIjRjFDNDBGXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCIgdG9kYXkhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJub3JtYWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBjbG91ZHk6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlRvZGF5J3Mgd2VhdGhlciBpcyBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcImNsb3VkeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiIzk1QTVBNlwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiIGFuZCBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiIGR1bGxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIiM5NUE1QTZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIiFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIGNsb3VkeVN1bjogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQ2xvdWR5IFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCIjOTVBNUE2XCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcImFuZCBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwic3VubnkgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCIjRjFDNDBGXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJhdCB0aGUgc2FtZSB0aW1lLiBHbyBmb3IgYSBkcml2ZSBwZXJoYXBzP1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgbGlnaHRSYWluczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiTGlnaHQgcmFpbnMgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIiM1REFERTJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwidG9kYXkuIERvbid0IGZvcmdldCB0aGF0IHVtYnJlbGxhIVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgc3VubnlSYWluczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiUmFpbnMgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIiM1REFERTJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiYW5kIFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJzdW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIiM1REFERTJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIi4gWW91IG1pZ2h0IHNlZSBhIHJhaW5ib3chXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJub3JtYWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBoZWF2eVJhaW5zOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJJdHMgZ29ubmEgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJmdWNraW5nIHBvdXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIiMyODc0QTZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIi4gQ2F0cywgZG9ncywgZXZlbiB3aGFsZXMhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJub3JtYWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB3aW5keTogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiV2luZHkgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIiNEMzU0MDBcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQUYhIGl0cyBnb25uYSBibG93IHlvdXIgd2lnIG9mZiFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHRodW5kZXJzdG9ybXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlJhaW5zIFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCIjNTY2NTczXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcImFuZCBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwidGh1bmRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiIzU2NjU3M1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiISE/IENvdWxkIHRoZSB3ZWF0aGVyIGdldCBhbnkgd29yc2U/IVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgZm9nOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJGb2dneSBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiI0FCQjJCOVwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJBRi4gQ2FuIHlvdSBzZWUgYW55dGhpbmcgYWhlYWQgb2YgeW91IVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBjdXJyZW50V2VhdGhlckRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgY2l0eTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudERheTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudERhdGU6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uSWNvbjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgdGVtcGVyYXR1cmU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHRvZGF5c1RleHQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBlcmF0dXJlQ29sb3I6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuICAgIC50ZXh0LWRpc3BsYXktc3R5bGUge1xuICAgICAgICBwYWRkaW5nOiAxMDtcbiAgICAgICAgZm9udC1zaXplOiA2MDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAtMTA7XG4gICAgfVxuXG4gICAgLmRheS10ZXh0IHtcbiAgICAgICAgcGFkZGluZy1yaWdodDogMzA7XG4gICAgICAgIGZvbnQtc2l6ZTogMzA7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiAyMDA7XG4gICAgfVxuXG4gICAgLm9yYW5nZS10ZXh0IHtcbiAgICAgICAgY29sb3I6IFwiI0ZGMEYwRlwiXG4gICAgfVxuXG4gICAgLnRlbXAtc3R5bGUge1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAzMDtcblxuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcblxuICAgIH1cbjwvc3R5bGU+IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4udGV4dC1kaXNwbGF5LXN0eWxlW2RhdGEtdi03NjNkYjk3Yl0ge1xcbiAgICBwYWRkaW5nOiAxMDtcXG4gICAgZm9udC1zaXplOiA2MDtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgIGxpbmUtaGVpZ2h0OiAtMTA7XFxufVxcbi5kYXktdGV4dFtkYXRhLXYtNzYzZGI5N2JdIHtcXG4gICAgcGFkZGluZy1yaWdodDogMzA7XFxuICAgIGZvbnQtc2l6ZTogMzA7XFxuICAgIGZvbnQtd2VpZ2h0OiAyMDA7XFxufVxcbi5vcmFuZ2UtdGV4dFtkYXRhLXYtNzYzZGI5N2JdIHtcXG4gICAgY29sb3I6IFxcXCIjRkYwRjBGXFxcIlxcbn1cXG4udGVtcC1zdHlsZVtkYXRhLXYtNzYzZGI5N2JdIHtcXG4gICAgcGFkZGluZy1yaWdodDogMzA7XFxuXFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cbiAgICBjb25zdCBhcHBsaWNhdGlvbiA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCIpO1xuICAgIHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3N0eWxpbmcvc3R5bGUtc2NvcGVcIik7XG5cbiAgICBleHBvcnRzLmZvckVhY2goY3NzRXhwb3J0ID0+IHtcbiAgICAgICAgaWYgKGNzc0V4cG9ydC5sZW5ndGggPiAxICYmIGNzc0V4cG9ydFsxXSkge1xuICAgICAgICAgICAgLy8gYXBwbHlpbmcgdGhlIHNlY29uZCBpdGVtIG9mIHRoZSBleHBvcnQgYXMgaXQgY29udGFpbnMgdGhlIGNzcyBjb250ZW50c1xuICAgICAgICAgICAgYXBwbGljYXRpb24uYWRkQ3NzKGNzc0V4cG9ydFsxXSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICA7XG4gICAgaWYgKG1vZHVsZS5ob3QpIHtcbiAgICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoKTtcbiAgICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKCgpID0+IHtcbiAgICAgICAgICAgIGdsb2JhbC5obXJSZWZyZXNoKHsgdHlwZTogJ3N0eWxlJywgcGF0aDogJy4vY29tcG9uZW50cy9IZWxsb1dvcmxkLnZ1ZScgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcIlBhZ2VcIixcbiAgICB7IG9uOiB7IGxvYWRlZDogX3ZtLm9uTG9hZGVkIH0gfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJHcmlkTGF5b3V0XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgY29sdW1uczogXCIqXCIsIHJvd3M6IFwiYXV0bywqLGF1dG9cIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiR3JpZExheW91dFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyBjb2x1bW5zOiBcImF1dG8sICpcIiwgcm93OiBcIjBcIiwgcm93czogXCIqXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgc3JjOlxuICAgICAgICAgICAgICAgICAgICBcImh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi9cIiArXG4gICAgICAgICAgICAgICAgICAgIF92bS5jdXJyZW50V2VhdGhlckRhdGEuY29uZGl0aW9uSWNvbiArXG4gICAgICAgICAgICAgICAgICAgIFwiQDJ4LnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgY29sdW1uOiBcIjBcIixcbiAgICAgICAgICAgICAgICAgIGhlaWdodDogXCIxMDBcIixcbiAgICAgICAgICAgICAgICAgIGhvcml6b250YWxBbGlnbm1lbnQ6IFwibGVmdFwiLFxuICAgICAgICAgICAgICAgICAgaW9zT3ZlcmZsb3dTYWZlQXJlYTogXCJ0cnVlXCIsXG4gICAgICAgICAgICAgICAgICBtYXJnaW46IFwiMjBcIixcbiAgICAgICAgICAgICAgICAgIHZlcnRpY2FsQWxpZ25tZW50OiBcIm1pZGRsZVwiLFxuICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiMTAwXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJkYXktdGV4dFwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiBfdm0uY3VycmVudFdlYXRoZXJEYXRhLmNpdHksXG4gICAgICAgICAgICAgICAgICBjb2x1bW46IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgdGV4dEFsaWdubWVudDogXCJsZWZ0XCIsXG4gICAgICAgICAgICAgICAgICB2ZXJ0aWNhbEFsaWdubWVudDogXCJtaWRkbGVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiR3JpZExheW91dFwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFwiYXV0b1wiLFxuICAgICAgICAgICAgICAgIGhvcml6b250YWxBbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgcm93OiBcIjFcIixcbiAgICAgICAgICAgICAgICByb3dzOiBcIipcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyB2ZXJ0aWNhbEFsaWdubWVudDogXCJjZW50ZXJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRlbXAtc3R5bGVcIixcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogX3ZtLmN1cnJlbnRXZWF0aGVyRGF0YS50ZW1wZXJhdHVyZUNvbG9yLFxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBfdm0udGVtcGVyYXR1cmVGb250U2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBfdm0uZ2V0VGVtcGVyYXR1cmVUZXh0KCksXG4gICAgICAgICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ25tZW50OiBcInJpZ2h0XCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZGF5LXRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OlxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmN1cnJlbnRXZWF0aGVyRGF0YS5jdXJyZW50RGF5ICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiLCBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uY3VycmVudFdlYXRoZXJEYXRhLmN1cnJlbnREYXRlLFxuICAgICAgICAgICAgICAgICAgICAgIHJvdzogXCIxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWdubWVudDogXCJjZW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBcIipcIixcbiAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206IFwiMjBcIixcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjIwXCIsXG4gICAgICAgICAgICAgICAgcm93OiBcIjJcIixcbiAgICAgICAgICAgICAgICByb3dzOiBcIipcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0ZXh0LWRpc3BsYXktc3R5bGVcIixcbiAgICAgICAgICAgICAgICBhdHRyczogeyBpb3NPdmVyZmxvd1NhZmVBcmVhOiBcInRydWVcIiwgdGV4dFdyYXA6IFwidHJ1ZVwiIH0sXG4gICAgICAgICAgICAgICAgb246IHsgbG9hZGVkOiBfdm0ub25Ub2RheUxhYmVsTG9hZGVkIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYXBwLmNzc1wiOiBcIi4vYXBwLmNzc1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuLyBzeW5jIF5cXFxcLlxcXFwvYXBwXFxcXC4oY3NzfHNjc3N8bGVzc3xzYXNzKSRcIjsiLCJ2YXIgbWFwID0ge1xuXHRcIi4vYXBwLmNzc1wiOiBcIi4vYXBwLmNzc1wiLFxuXHRcIi4vYXBwLmpzXCI6IFwiLi9hcHAuanNcIixcblx0XCIuL25hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvbi9nZW9sb2NhdGlvbi5jb21tb24uanNcIjogXCIuL25hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvbi9nZW9sb2NhdGlvbi5jb21tb24uanNcIixcblx0XCIuL25hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvbi9nZW9sb2NhdGlvbi5qc1wiOiBcIi4vbmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uL2dlb2xvY2F0aW9uLmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vIHN5bmMgcmVjdXJzaXZlICg/PCFcXFxcYkFwcF9SZXNvdXJjZXNcXFxcYi4qKVxcXFwuKHhtbHxjc3N8anN8KD88IVxcXFwuZFxcXFwuKXRzfCg/PCFcXFxcYl9bXFxcXHctXSpcXFxcLilzY3NzKSRcIjsiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcbmV4cG9ydHMuaShyZXF1aXJlKFwiLSEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLTIhbmF0aXZlc2NyaXB0LXRoZW1lLWNvcmUvY3NzL2NvcmUubGlnaHQuY3NzXCIpLCBcIlwiKTtcblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKlxcbkluIE5hdGl2ZVNjcmlwdCwgdGhlIGFwcC5jc3MgZmlsZSBpcyB3aGVyZSB5b3UgcGxhY2UgQ1NTIHJ1bGVzIHRoYXRcXG55b3Ugd291bGQgbGlrZSB0byBhcHBseSB0byB5b3VyIGVudGlyZSBhcHBsaWNhdGlvbi4gQ2hlY2sgb3V0XFxuaHR0cDovL2RvY3MubmF0aXZlc2NyaXB0Lm9yZy91aS9zdHlsaW5nIGZvciBhIGZ1bGwgbGlzdCBvZiB0aGUgQ1NTXFxuc2VsZWN0b3JzIGFuZCBwcm9wZXJ0aWVzIHlvdSBjYW4gdXNlIHRvIHN0eWxlIFVJIGNvbXBvbmVudHMuXFxuXFxuLypcXG5JbiBtYW55IGNhc2VzIHlvdSBtYXkgd2FudCB0byB1c2UgdGhlIE5hdGl2ZVNjcmlwdCBjb3JlIHRoZW1lIGluc3RlYWRcXG5vZiB3cml0aW5nIHlvdXIgb3duIENTUyBydWxlcy4gRm9yIGEgZnVsbCBsaXN0IG9mIGNsYXNzIG5hbWVzIGluIHRoZSB0aGVtZVxcbnJlZmVyIHRvIGh0dHA6Ly9kb2NzLm5hdGl2ZXNjcmlwdC5vcmcvdWkvdGhlbWUuXFxuVGhlIGltcG9ydGVkIENTUyBydWxlcyBtdXN0IHByZWNlZGUgYWxsIG90aGVyIHR5cGVzIG9mIHJ1bGVzLlxcbiovXFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuO1xuICAgIGlmIChtb2R1bGUuaG90KSB7XG4gICAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG4gICAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZSgoKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwuaG1yUmVmcmVzaCh7IHR5cGU6ICdzdHlsZScsIHBhdGg6ICcuL2FwcC5jc3MnIH0pO1xuICAgICAgICB9KVxuICAgIH1cbiIsImltcG9ydCBWdWUgZnJvbSAnbmF0aXZlc2NyaXB0LXZ1ZSc7XG5cbmltcG9ydCBIZWxsb1dvcmxkIGZyb20gJy4vY29tcG9uZW50cy9IZWxsb1dvcmxkJztcblxuLy8gVW5jb21tbWVudCB0aGUgZm9sbG93aW5nIHRvIHNlZSBOYXRpdmVTY3JpcHQtVnVlIG91dHB1dCBsb2dzXG5WdWUuY29uZmlnLnNpbGVudCA9IGZhbHNlO1xuXG5uZXcgVnVlKHtcblxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxGcmFtZT5cbiAgICAgICAgICAgIDxIZWxsb1dvcmxkIC8+XG4gICAgICAgIDwvRnJhbWU+YCxcblxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgSGVsbG9Xb3JsZFxuICAgIH1cbn0pLiRzdGFydCgpOyIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vSGVsbG9Xb3JsZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NzYzZGI5N2Imc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vSGVsbG9Xb3JsZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0hlbGxvV29ybGQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL0hlbGxvV29ybGQudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NzYzZGI5N2Imc2NvcGVkPXRydWUmbGFuZz1jc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjc2M2RiOTdiXCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL3NhbmdyYW1tb2hpdGUvT25lRHJpdmUvRGV2ZWxvcG1lbnQvQXBwIFByb2plY3RzL05hdGl2ZVNjcmlwdC93ZWF0aGVyLWFwcC9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCc3NjNkYjk3YicpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc3NjNkYjk3YicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc3NjNkYjk3YicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vSGVsbG9Xb3JsZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NzYzZGI5N2Imc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNzYzZGI5N2InLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcImNvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vSGVsbG9Xb3JsZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9IZWxsb1dvcmxkLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9zdHlsZS1ob3QtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svYXBwbHktY3NzLWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLTIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vSGVsbG9Xb3JsZC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD03NjNkYjk3YiZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL3N0eWxlLWhvdC1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9hcHBseS1jc3MtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtMiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9IZWxsb1dvcmxkLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTc2M2RiOTdiJnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0hlbGxvV29ybGQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTc2M2RiOTdiJnNjb3BlZD10cnVlJlwiIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgTG9jYXRpb25CYXNlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMb2NhdGlvbkJhc2UoKSB7XG4gICAgfVxuICAgIHJldHVybiBMb2NhdGlvbkJhc2U7XG59KCkpO1xuZXhwb3J0cy5Mb2NhdGlvbkJhc2UgPSBMb2NhdGlvbkJhc2U7XG5leHBvcnRzLmRlZmF1bHRHZXRMb2NhdGlvblRpbWVvdXQgPSA1ICogNjAgKiAxMDAwO1xuZXhwb3J0cy5taW5SYW5nZVVwZGF0ZSA9IDAuMTtcbmV4cG9ydHMubWluVGltZVVwZGF0ZSA9IDEgKiA2MCAqIDEwMDA7XG5leHBvcnRzLmZhc3Rlc3RUaW1lVXBkYXRlID0gNSAqIDEwMDA7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBlbnVtc18xID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvZW51bXNcIik7XG52YXIgdGltZXJfMSA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3RpbWVyXCIpO1xudmFyIGFwcGxpY2F0aW9uXzEgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3V0aWxzL3V0aWxzXCIpO1xudmFyIGdlb2xvY2F0aW9uX2NvbW1vbl8xID0gcmVxdWlyZShcIi4vZ2VvbG9jYXRpb24uY29tbW9uXCIpO1xudmFyIFBsYXRmb3JtID0gcmVxdWlyZShcInBsYXRmb3JtXCIpO1xudmFyIGxvY2F0aW9uTWFuYWdlcnMgPSB7fTtcbnZhciBsb2NhdGlvbkxpc3RlbmVycyA9IHt9O1xudmFyIHdhdGNoSWQgPSAwO1xudmFyIGF0dGFjaGVkRm9yRXJyb3JIYW5kbGluZyA9IGZhbHNlO1xudmFyIExvY2F0aW9uTGlzdGVuZXJJbXBsID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTG9jYXRpb25MaXN0ZW5lckltcGwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTG9jYXRpb25MaXN0ZW5lckltcGwoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgTG9jYXRpb25MaXN0ZW5lckltcGwuaW5pdFdpdGhMb2NhdGlvbkVycm9yID0gZnVuY3Rpb24gKHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3IpIHtcbiAgICAgICAgdmFyIGxpc3RlbmVyID0gTG9jYXRpb25MaXN0ZW5lckltcGwubmV3KCk7XG4gICAgICAgIHdhdGNoSWQrKztcbiAgICAgICAgbGlzdGVuZXIuaWQgPSB3YXRjaElkO1xuICAgICAgICBsaXN0ZW5lci5fb25Mb2NhdGlvbiA9IHN1Y2Nlc3NDYWxsYmFjaztcbiAgICAgICAgbGlzdGVuZXIuX29uRXJyb3IgPSBlcnJvcjtcbiAgICAgICAgcmV0dXJuIGxpc3RlbmVyO1xuICAgIH07XG4gICAgTG9jYXRpb25MaXN0ZW5lckltcGwuaW5pdFdpdGhQcm9taXNlQ2FsbGJhY2tzID0gZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCwgYXV0aG9yaXplQWx3YXlzKSB7XG4gICAgICAgIGlmIChhdXRob3JpemVBbHdheXMgPT09IHZvaWQgMCkgeyBhdXRob3JpemVBbHdheXMgPSBmYWxzZTsgfVxuICAgICAgICB2YXIgbGlzdGVuZXIgPSBMb2NhdGlvbkxpc3RlbmVySW1wbC5uZXcoKTtcbiAgICAgICAgd2F0Y2hJZCsrO1xuICAgICAgICBsaXN0ZW5lci5pZCA9IHdhdGNoSWQ7XG4gICAgICAgIGxpc3RlbmVyLl9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgbGlzdGVuZXIuX3JlamVjdCA9IHJlamVjdDtcbiAgICAgICAgbGlzdGVuZXIuYXV0aG9yaXplQWx3YXlzID0gYXV0aG9yaXplQWx3YXlzO1xuICAgICAgICByZXR1cm4gbGlzdGVuZXI7XG4gICAgfTtcbiAgICBMb2NhdGlvbkxpc3RlbmVySW1wbC5wcm90b3R5cGUubG9jYXRpb25NYW5hZ2VyRGlkVXBkYXRlTG9jYXRpb25zID0gZnVuY3Rpb24gKG1hbmFnZXIsIGxvY2F0aW9ucykge1xuICAgICAgICBpZiAodGhpcy5fb25Mb2NhdGlvbikge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGNvdW50ID0gbG9jYXRpb25zLmNvdW50OyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBsb2NhdGlvbl8xID0gbG9jYXRpb25Gcm9tQ0xMb2NhdGlvbihsb2NhdGlvbnMub2JqZWN0QXRJbmRleChpKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25Mb2NhdGlvbihsb2NhdGlvbl8xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTG9jYXRpb25MaXN0ZW5lckltcGwucHJvdG90eXBlLmxvY2F0aW9uTWFuYWdlckRpZEZhaWxXaXRoRXJyb3IgPSBmdW5jdGlvbiAobWFuYWdlciwgZXJyb3IpIHtcbiAgICAgICAgaWYgKHRoaXMuX29uRXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuX29uRXJyb3IobmV3IEVycm9yKGVycm9yLmxvY2FsaXplZERlc2NyaXB0aW9uKSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIExvY2F0aW9uTGlzdGVuZXJJbXBsLnByb3RvdHlwZS5sb2NhdGlvbk1hbmFnZXJEaWRDaGFuZ2VBdXRob3JpemF0aW9uU3RhdHVzID0gZnVuY3Rpb24gKG1hbmFnZXIsIHN0YXR1cykge1xuICAgICAgICBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9yZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9jYXRpb25Nb25pdG9yLnN0b3BMb2NhdGlvbk1vbml0b3JpbmcodGhpcy5pZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlamVjdChuZXcgRXJyb3IoXCJBdXRob3JpemF0aW9uIERlbmllZC5cIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgICBMb2NhdGlvbk1vbml0b3Iuc3RvcExvY2F0aW9uTW9uaXRvcmluZyh0aGlzLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIExvY2F0aW9uTGlzdGVuZXJJbXBsLk9iakNQcm90b2NvbHMgPSBbQ0xMb2NhdGlvbk1hbmFnZXJEZWxlZ2F0ZV07XG4gICAgcmV0dXJuIExvY2F0aW9uTGlzdGVuZXJJbXBsO1xufShOU09iamVjdCkpO1xuZnVuY3Rpb24gbG9jYXRpb25Gcm9tQ0xMb2NhdGlvbihjbExvY2F0aW9uKSB7XG4gICAgdmFyIGxvY2F0aW9uID0gbmV3IExvY2F0aW9uKCk7XG4gICAgbG9jYXRpb24ubGF0aXR1ZGUgPSBjbExvY2F0aW9uLmNvb3JkaW5hdGUubGF0aXR1ZGU7XG4gICAgbG9jYXRpb24ubG9uZ2l0dWRlID0gY2xMb2NhdGlvbi5jb29yZGluYXRlLmxvbmdpdHVkZTtcbiAgICBsb2NhdGlvbi5hbHRpdHVkZSA9IGNsTG9jYXRpb24uYWx0aXR1ZGU7XG4gICAgbG9jYXRpb24uaG9yaXpvbnRhbEFjY3VyYWN5ID0gY2xMb2NhdGlvbi5ob3Jpem9udGFsQWNjdXJhY3k7XG4gICAgbG9jYXRpb24udmVydGljYWxBY2N1cmFjeSA9IGNsTG9jYXRpb24udmVydGljYWxBY2N1cmFjeTtcbiAgICBsb2NhdGlvbi5zcGVlZCA9IGNsTG9jYXRpb24uc3BlZWQ7XG4gICAgbG9jYXRpb24uZGlyZWN0aW9uID0gY2xMb2NhdGlvbi5jb3Vyc2U7XG4gICAgdmFyIHRpbWVJbnRlcnZhbFNpbmNlMTk3MCA9IE5TRGF0ZS5kYXRlV2l0aFRpbWVJbnRlcnZhbFNpbmNlRGF0ZSgwLCBjbExvY2F0aW9uLnRpbWVzdGFtcCkudGltZUludGVydmFsU2luY2UxOTcwO1xuICAgIGxvY2F0aW9uLnRpbWVzdGFtcCA9IG5ldyBEYXRlKHRpbWVJbnRlcnZhbFNpbmNlMTk3MCAqIDEwMDApO1xuICAgIGxvY2F0aW9uLmlvcyA9IGNsTG9jYXRpb247XG4gICAgcmV0dXJuIGxvY2F0aW9uO1xufVxuZnVuY3Rpb24gY2xMb2NhdGlvbkZyb21Mb2NhdGlvbihsb2NhdGlvbikge1xuICAgIHZhciBoQWNjdXJhY3kgPSBsb2NhdGlvbi5ob3Jpem9udGFsQWNjdXJhY3kgPyBsb2NhdGlvbi5ob3Jpem9udGFsQWNjdXJhY3kgOiAtMTtcbiAgICB2YXIgdkFjY3VyYWN5ID0gbG9jYXRpb24udmVydGljYWxBY2N1cmFjeSA/IGxvY2F0aW9uLnZlcnRpY2FsQWNjdXJhY3kgOiAtMTtcbiAgICB2YXIgc3BlZWQgPSBsb2NhdGlvbi5zcGVlZCA/IGxvY2F0aW9uLnNwZWVkIDogLTE7XG4gICAgdmFyIGNvdXJzZSA9IGxvY2F0aW9uLmRpcmVjdGlvbiA/IGxvY2F0aW9uLmRpcmVjdGlvbiA6IC0xO1xuICAgIHZhciBhbHRpdHVkZSA9IGxvY2F0aW9uLmFsdGl0dWRlID8gbG9jYXRpb24uYWx0aXR1ZGUgOiAtMTtcbiAgICB2YXIgdGltZXN0YW1wID0gbG9jYXRpb24udGltZXN0YW1wID8gbG9jYXRpb24udGltZXN0YW1wIDogbnVsbDtcbiAgICB2YXIgaW9zTG9jYXRpb24gPSBDTExvY2F0aW9uLmFsbG9jKClcbiAgICAgICAgLmluaXRXaXRoQ29vcmRpbmF0ZUFsdGl0dWRlSG9yaXpvbnRhbEFjY3VyYWN5VmVydGljYWxBY2N1cmFjeUNvdXJzZVNwZWVkVGltZXN0YW1wKENMTG9jYXRpb25Db29yZGluYXRlMkRNYWtlKGxvY2F0aW9uLmxhdGl0dWRlLCBsb2NhdGlvbi5sb25naXR1ZGUpLCBhbHRpdHVkZSwgaEFjY3VyYWN5LCB2QWNjdXJhY3ksIGNvdXJzZSwgc3BlZWQsIHRpbWVzdGFtcCk7XG4gICAgcmV0dXJuIGlvc0xvY2F0aW9uO1xufVxuZnVuY3Rpb24gZXJyb3JIYW5kbGVyKGVyckRhdGEpIHtcbiAgICB3aGlsZSAod2F0Y2hJZCAhPT0gMCkge1xuICAgICAgICBjbGVhcldhdGNoKHdhdGNoSWQpO1xuICAgICAgICB3YXRjaElkLS07XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0VmVyc2lvbk1haigpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoUGxhdGZvcm0uZGV2aWNlLm9zVmVyc2lvbi5zcGxpdChcIi5cIilbMF0pO1xufVxuZnVuY3Rpb24gZ2V0Q3VycmVudExvY2F0aW9uKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBlbmFibGVMb2NhdGlvblJlcXVlc3QoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMudGltZW91dCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHZhciBsYXN0TG9jYXRpb24gPSBMb2NhdGlvbk1vbml0b3IuZ2V0TGFzdEtub3duTG9jYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAobGFzdExvY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5tYXhpbXVtQWdlID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdExvY2F0aW9uLnRpbWVzdGFtcC52YWx1ZU9mKCkgKyBvcHRpb25zLm1heGltdW1BZ2UgPiBuZXcgRGF0ZSgpLnZhbHVlT2YoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobGFzdExvY2F0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJMYXN0IGtub3duIGxvY2F0aW9uIHRvbyBvbGQhXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobGFzdExvY2F0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIlRoZXJlIGlzIG5vIGxhc3Qga25vd24gbG9jYXRpb24hXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgdGltZXJJZF8xO1xuICAgICAgICAgICAgICAgIHZhciBsb2NMaXN0ZW5lcl8xO1xuICAgICAgICAgICAgICAgIHZhciBpbml0TG9jYXRpb25fMTtcbiAgICAgICAgICAgICAgICB2YXIgc3RvcFRpbWVyQW5kTW9uaXRvcl8xID0gZnVuY3Rpb24gKGxvY0xpc3RlbmVySWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpbWVySWRfMSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lcl8xLmNsZWFyVGltZW91dCh0aW1lcklkXzEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIExvY2F0aW9uTW9uaXRvci5zdG9wTG9jYXRpb25Nb25pdG9yaW5nKGxvY0xpc3RlbmVySWQpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3NDYWxsYmFjayA9IGZ1bmN0aW9uIChsb2NhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0VmVyc2lvbk1haigpIDwgOSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm1heGltdW1BZ2UgPT09IFwibnVtYmVyXCIgJiYgbG9jYXRpb24udGltZXN0YW1wLnZhbHVlT2YoKSArIG9wdGlvbnMubWF4aW11bUFnZSA8IG5ldyBEYXRlKCkudmFsdWVPZigpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGVzaXJlZEFjY3VyYWN5ICE9PSBlbnVtc18xLkFjY3VyYWN5LmFueSAmJiAhaW5pdExvY2F0aW9uXzEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0TG9jYXRpb25fMSA9IGxvY2F0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdG9wVGltZXJBbmRNb25pdG9yXzEobG9jTGlzdGVuZXJfMS5pZCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobG9jYXRpb24pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbG9jTGlzdGVuZXJfMSA9IExvY2F0aW9uTGlzdGVuZXJJbXBsLmluaXRXaXRoTG9jYXRpb25FcnJvcihzdWNjZXNzQ2FsbGJhY2ssIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdldFZlcnNpb25NYWooKSA+PSA5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2NhdGlvbk1vbml0b3IucmVxdWVzdExvY2F0aW9uKG9wdGlvbnMsIGxvY0xpc3RlbmVyXzEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9jYXRpb25Nb25pdG9yLnN0YXJ0TG9jYXRpb25Nb25pdG9yaW5nKG9wdGlvbnMsIGxvY0xpc3RlbmVyXzEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0b3BUaW1lckFuZE1vbml0b3JfMShsb2NMaXN0ZW5lcl8xLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMudGltZW91dCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgICAgICAgICB0aW1lcklkXzEgPSB0aW1lcl8xLnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9jYXRpb25Nb25pdG9yLnN0b3BMb2NhdGlvbk1vbml0b3JpbmcobG9jTGlzdGVuZXJfMS5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiVGltZW91dCB3aGlsZSBzZWFyY2hpbmcgZm9yIGxvY2F0aW9uIVwiKSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIG9wdGlvbnMudGltZW91dCB8fCBnZW9sb2NhdGlvbl9jb21tb25fMS5kZWZhdWx0R2V0TG9jYXRpb25UaW1lb3V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgfSk7XG59XG5leHBvcnRzLmdldEN1cnJlbnRMb2NhdGlvbiA9IGdldEN1cnJlbnRMb2NhdGlvbjtcbmZ1bmN0aW9uIHdhdGNoTG9jYXRpb24oc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgaWYgKCFhdHRhY2hlZEZvckVycm9ySGFuZGxpbmcpIHtcbiAgICAgICAgYXR0YWNoZWRGb3JFcnJvckhhbmRsaW5nID0gdHJ1ZTtcbiAgICAgICAgYXBwbGljYXRpb25fMS5vbihhcHBsaWNhdGlvbl8xLnVuY2F1Z2h0RXJyb3JFdmVudCwgZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIH1cbiAgICB2YXIgem9uZWRTdWNjZXNzQ2FsbGJhY2sgPSBnbG9iYWwuem9uZWRDYWxsYmFjayhzdWNjZXNzQ2FsbGJhY2spO1xuICAgIHZhciB6b25lZEVycm9yQ2FsbGJhY2sgPSBnbG9iYWwuem9uZWRDYWxsYmFjayhlcnJvckNhbGxiYWNrKTtcbiAgICB2YXIgbG9jTGlzdGVuZXIgPSBMb2NhdGlvbkxpc3RlbmVySW1wbC5pbml0V2l0aExvY2F0aW9uRXJyb3Ioem9uZWRTdWNjZXNzQ2FsbGJhY2ssIHpvbmVkRXJyb3JDYWxsYmFjayk7XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGlvc0xvY01hbmFnZXIgPSBnZXRJT1NMb2NhdGlvbk1hbmFnZXIobG9jTGlzdGVuZXIsIG9wdGlvbnMpO1xuICAgICAgICBpb3NMb2NNYW5hZ2VyLnN0YXJ0VXBkYXRpbmdMb2NhdGlvbigpO1xuICAgICAgICByZXR1cm4gbG9jTGlzdGVuZXIuaWQ7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIExvY2F0aW9uTW9uaXRvci5zdG9wTG9jYXRpb25Nb25pdG9yaW5nKGxvY0xpc3RlbmVyLmlkKTtcbiAgICAgICAgem9uZWRFcnJvckNhbGxiYWNrKGUpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG5leHBvcnRzLndhdGNoTG9jYXRpb24gPSB3YXRjaExvY2F0aW9uO1xuZnVuY3Rpb24gY2xlYXJXYXRjaChfd2F0Y2hJZCkge1xuICAgIExvY2F0aW9uTW9uaXRvci5zdG9wTG9jYXRpb25Nb25pdG9yaW5nKF93YXRjaElkKTtcbn1cbmV4cG9ydHMuY2xlYXJXYXRjaCA9IGNsZWFyV2F0Y2g7XG5mdW5jdGlvbiBlbmFibGVMb2NhdGlvblJlcXVlc3QoYWx3YXlzLCBpb3NPcGVuU2V0dGluZ3NJZkxvY2F0aW9uSGFzQmVlbkRlbmllZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBsb2NhdGlvbklzRW5hYmxlZCA9IF9pc0VuYWJsZWQoKTtcbiAgICAgICAgaWYgKGxvY2F0aW9uSXNFbmFibGVkKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgc3RhdHVzXzEgPSBnZXRJT1NMb2NhdGlvbk1hbmFnZXJTdGF0dXMoKTtcbiAgICAgICAgICAgIGlmIChzdGF0dXNfMSA9PT0gMiAmJlxuICAgICAgICAgICAgICAgIGlvc09wZW5TZXR0aW5nc0lmTG9jYXRpb25IYXNCZWVuRGVuaWVkKSB7XG4gICAgICAgICAgICAgICAgdXRpbHMuaW9zLmdldHRlcihVSUFwcGxpY2F0aW9uLCBVSUFwcGxpY2F0aW9uLnNoYXJlZEFwcGxpY2F0aW9uKS5vcGVuVVJMKE5TVVJMLlVSTFdpdGhTdHJpbmcoVUlBcHBsaWNhdGlvbk9wZW5TZXR0aW5nc1VSTFN0cmluZykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gTG9jYXRpb25MaXN0ZW5lckltcGwuaW5pdFdpdGhQcm9taXNlQ2FsbGJhY2tzKHJlc29sdmUsIHJlamVjdCwgYWx3YXlzKTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWFuYWdlciA9IGdldElPU0xvY2F0aW9uTWFuYWdlcihsaXN0ZW5lciwgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhbHdheXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hbmFnZXIucmVxdWVzdEFsd2F5c0F1dGhvcml6YXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hbmFnZXIucmVxdWVzdFdoZW5JblVzZUF1dGhvcml6YXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBMb2NhdGlvbk1vbml0b3Iuc3RvcExvY2F0aW9uTW9uaXRvcmluZyhsaXN0ZW5lci5pZCk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydHMuZW5hYmxlTG9jYXRpb25SZXF1ZXN0ID0gZW5hYmxlTG9jYXRpb25SZXF1ZXN0O1xuZnVuY3Rpb24gX2lzRW5hYmxlZCgpIHtcbiAgICBpZiAoQ0xMb2NhdGlvbk1hbmFnZXIubG9jYXRpb25TZXJ2aWNlc0VuYWJsZWQoKSkge1xuICAgICAgICB2YXIgc3RhdHVzXzIgPSBnZXRJT1NMb2NhdGlvbk1hbmFnZXJTdGF0dXMoKTtcbiAgICAgICAgcmV0dXJuIChzdGF0dXNfMiA9PT0gNFxuICAgICAgICAgICAgfHwgc3RhdHVzXzIgPT09IDNcbiAgICAgICAgICAgIHx8IHN0YXR1c18yID09PSAzKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gaXNFbmFibGVkKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgaXNFbmFibGVkUmVzdWx0ID0gX2lzRW5hYmxlZCgpO1xuICAgICAgICByZXNvbHZlKGlzRW5hYmxlZFJlc3VsdCk7XG4gICAgfSk7XG59XG5leHBvcnRzLmlzRW5hYmxlZCA9IGlzRW5hYmxlZDtcbmZ1bmN0aW9uIGdldElPU0xvY2F0aW9uTWFuYWdlclN0YXR1cygpIHtcbiAgICByZXR1cm4gQ0xMb2NhdGlvbk1hbmFnZXIuYXV0aG9yaXphdGlvblN0YXR1cygpO1xufVxuZXhwb3J0cy5nZXRJT1NMb2NhdGlvbk1hbmFnZXJTdGF0dXMgPSBnZXRJT1NMb2NhdGlvbk1hbmFnZXJTdGF0dXM7XG5mdW5jdGlvbiBkaXN0YW5jZShsb2MxLCBsb2MyKSB7XG4gICAgaWYgKCFsb2MxLmlvcykge1xuICAgICAgICBsb2MxLmlvcyA9IGNsTG9jYXRpb25Gcm9tTG9jYXRpb24obG9jMSk7XG4gICAgfVxuICAgIGlmICghbG9jMi5pb3MpIHtcbiAgICAgICAgbG9jMi5pb3MgPSBjbExvY2F0aW9uRnJvbUxvY2F0aW9uKGxvYzIpO1xuICAgIH1cbiAgICByZXR1cm4gbG9jMS5pb3MuZGlzdGFuY2VGcm9tTG9jYXRpb24obG9jMi5pb3MpO1xufVxuZXhwb3J0cy5kaXN0YW5jZSA9IGRpc3RhbmNlO1xudmFyIExvY2F0aW9uTW9uaXRvciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTG9jYXRpb25Nb25pdG9yKCkge1xuICAgIH1cbiAgICBMb2NhdGlvbk1vbml0b3IuZ2V0TGFzdEtub3duTG9jYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpb3NMb2NhdGlvbjtcbiAgICAgICAgZm9yICh2YXIgbG9jTWFuYWdlcklkIGluIGxvY2F0aW9uTWFuYWdlcnMpIHtcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbk1hbmFnZXJzLmhhc093blByb3BlcnR5KGxvY01hbmFnZXJJZCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGVtcExvY2F0aW9uID0gbG9jYXRpb25NYW5hZ2Vyc1tsb2NNYW5hZ2VySWRdLmxvY2F0aW9uO1xuICAgICAgICAgICAgICAgIGlmICghaW9zTG9jYXRpb24gfHwgdGVtcExvY2F0aW9uLnRpbWVzdGFtcCA+IGlvc0xvY2F0aW9uLnRpbWVzdGFtcCkge1xuICAgICAgICAgICAgICAgICAgICBpb3NMb2NhdGlvbiA9IHRlbXBMb2NhdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlvc0xvY2F0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9jYXRpb25Gcm9tQ0xMb2NhdGlvbihpb3NMb2NhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxvY0xpc3RlbmVyID0gTG9jYXRpb25MaXN0ZW5lckltcGwuaW5pdFdpdGhMb2NhdGlvbkVycm9yKG51bGwpO1xuICAgICAgICBpb3NMb2NhdGlvbiA9IGdldElPU0xvY2F0aW9uTWFuYWdlcihsb2NMaXN0ZW5lciwgbnVsbCkubG9jYXRpb247XG4gICAgICAgIGlmIChpb3NMb2NhdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGxvY2F0aW9uRnJvbUNMTG9jYXRpb24oaW9zTG9jYXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgTG9jYXRpb25Nb25pdG9yLnJlcXVlc3RMb2NhdGlvbiA9IGZ1bmN0aW9uIChvcHRpb25zLCBsb2NMaXN0ZW5lcikge1xuICAgICAgICB2YXIgaW9zTG9jTWFuYWdlciA9IGdldElPU0xvY2F0aW9uTWFuYWdlcihsb2NMaXN0ZW5lciwgb3B0aW9ucyk7XG4gICAgICAgIGlvc0xvY01hbmFnZXIucmVxdWVzdExvY2F0aW9uKCk7XG4gICAgfTtcbiAgICBMb2NhdGlvbk1vbml0b3Iuc3RhcnRMb2NhdGlvbk1vbml0b3JpbmcgPSBmdW5jdGlvbiAob3B0aW9ucywgbG9jTGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIGlvc0xvY01hbmFnZXIgPSBnZXRJT1NMb2NhdGlvbk1hbmFnZXIobG9jTGlzdGVuZXIsIG9wdGlvbnMpO1xuICAgICAgICBpb3NMb2NNYW5hZ2VyLnN0YXJ0VXBkYXRpbmdMb2NhdGlvbigpO1xuICAgIH07XG4gICAgTG9jYXRpb25Nb25pdG9yLnN0b3BMb2NhdGlvbk1vbml0b3JpbmcgPSBmdW5jdGlvbiAoaW9zTG9jTWFuYWdlcklkKSB7XG4gICAgICAgIGlmIChsb2NhdGlvbk1hbmFnZXJzW2lvc0xvY01hbmFnZXJJZF0pIHtcbiAgICAgICAgICAgIGxvY2F0aW9uTWFuYWdlcnNbaW9zTG9jTWFuYWdlcklkXS5zdG9wVXBkYXRpbmdMb2NhdGlvbigpO1xuICAgICAgICAgICAgbG9jYXRpb25NYW5hZ2Vyc1tpb3NMb2NNYW5hZ2VySWRdLmRlbGVnYXRlID0gbnVsbDtcbiAgICAgICAgICAgIGRlbGV0ZSBsb2NhdGlvbk1hbmFnZXJzW2lvc0xvY01hbmFnZXJJZF07XG4gICAgICAgICAgICBkZWxldGUgbG9jYXRpb25MaXN0ZW5lcnNbaW9zTG9jTWFuYWdlcklkXTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTG9jYXRpb25Nb25pdG9yLmNyZWF0ZWlPU0xvY2F0aW9uTWFuYWdlciA9IGZ1bmN0aW9uIChsb2NMaXN0ZW5lciwgb3B0aW9ucykge1xuICAgICAgICB2YXIgaW9zTG9jTWFuYWdlciA9IG5ldyBDTExvY2F0aW9uTWFuYWdlcigpO1xuICAgICAgICBpb3NMb2NNYW5hZ2VyLmRlbGVnYXRlID0gbG9jTGlzdGVuZXI7XG4gICAgICAgIGlvc0xvY01hbmFnZXIuZGVzaXJlZEFjY3VyYWN5ID0gb3B0aW9ucyA/IG9wdGlvbnMuZGVzaXJlZEFjY3VyYWN5IDogZW51bXNfMS5BY2N1cmFjeS5oaWdoO1xuICAgICAgICBpb3NMb2NNYW5hZ2VyLmRpc3RhbmNlRmlsdGVyID0gb3B0aW9ucyA/IG9wdGlvbnMudXBkYXRlRGlzdGFuY2UgOiBnZW9sb2NhdGlvbl9jb21tb25fMS5taW5SYW5nZVVwZGF0ZTtcbiAgICAgICAgbG9jYXRpb25NYW5hZ2Vyc1tsb2NMaXN0ZW5lci5pZF0gPSBpb3NMb2NNYW5hZ2VyO1xuICAgICAgICBsb2NhdGlvbkxpc3RlbmVyc1tsb2NMaXN0ZW5lci5pZF0gPSBsb2NMaXN0ZW5lcjtcbiAgICAgICAgaWYgKGdldFZlcnNpb25NYWooKSA+PSA5KSB7XG4gICAgICAgICAgICBpb3NMb2NNYW5hZ2VyLmFsbG93c0JhY2tncm91bmRMb2NhdGlvblVwZGF0ZXMgPVxuICAgICAgICAgICAgICAgIG9wdGlvbnMgJiYgb3B0aW9ucy5pb3NBbGxvd3NCYWNrZ3JvdW5kTG9jYXRpb25VcGRhdGVzICE9IG51bGwgP1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmlvc0FsbG93c0JhY2tncm91bmRMb2NhdGlvblVwZGF0ZXMgOiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpb3NMb2NNYW5hZ2VyLnBhdXNlc0xvY2F0aW9uVXBkYXRlc0F1dG9tYXRpY2FsbHkgPVxuICAgICAgICAgICAgb3B0aW9ucyAmJiBvcHRpb25zLmlvc1BhdXNlc0xvY2F0aW9uVXBkYXRlc0F1dG9tYXRpY2FsbHkgIT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5pb3NQYXVzZXNMb2NhdGlvblVwZGF0ZXNBdXRvbWF0aWNhbGx5IDogdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGlvc0xvY01hbmFnZXI7XG4gICAgfTtcbiAgICByZXR1cm4gTG9jYXRpb25Nb25pdG9yO1xufSgpKTtcbmV4cG9ydHMuTG9jYXRpb25Nb25pdG9yID0gTG9jYXRpb25Nb25pdG9yO1xudmFyIGlvc0xvY2F0aW9uTWFuYWdlcjtcbmZ1bmN0aW9uIGdldElPU0xvY2F0aW9uTWFuYWdlcihsb2NMaXN0ZW5lciwgb3B0aW9ucykge1xuICAgIGlmICghaW9zTG9jYXRpb25NYW5hZ2VyKSB7XG4gICAgICAgIHJldHVybiBMb2NhdGlvbk1vbml0b3IuY3JlYXRlaU9TTG9jYXRpb25NYW5hZ2VyKGxvY0xpc3RlbmVyLCBvcHRpb25zKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBtYW5hZ2VyID0gbmV3IGlvc0xvY2F0aW9uTWFuYWdlcigpO1xuICAgICAgICBtYW5hZ2VyLmRlbGVnYXRlID0gbG9jTGlzdGVuZXI7XG4gICAgICAgIG1hbmFnZXIuZGVzaXJlZEFjY3VyYWN5ID0gb3B0aW9ucyA/IG9wdGlvbnMuZGVzaXJlZEFjY3VyYWN5IDogZW51bXNfMS5BY2N1cmFjeS5oaWdoO1xuICAgICAgICBtYW5hZ2VyLmRpc3RhbmNlRmlsdGVyID0gb3B0aW9ucyA/IG9wdGlvbnMudXBkYXRlRGlzdGFuY2UgOiBnZW9sb2NhdGlvbl9jb21tb25fMS5taW5SYW5nZVVwZGF0ZTtcbiAgICAgICAgbG9jYXRpb25NYW5hZ2Vyc1tsb2NMaXN0ZW5lci5pZF0gPSBtYW5hZ2VyO1xuICAgICAgICBsb2NhdGlvbkxpc3RlbmVyc1tsb2NMaXN0ZW5lci5pZF0gPSBsb2NMaXN0ZW5lcjtcbiAgICAgICAgcmV0dXJuIG1hbmFnZXI7XG4gICAgfVxufVxuZnVuY3Rpb24gc2V0Q3VzdG9tTG9jYXRpb25NYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBpb3NMb2NhdGlvbk1hbmFnZXIgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBtYW5hZ2VyOyB9O1xufVxuZXhwb3J0cy5zZXRDdXN0b21Mb2NhdGlvbk1hbmFnZXIgPSBzZXRDdXN0b21Mb2NhdGlvbk1hbmFnZXI7XG52YXIgTG9jYXRpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhMb2NhdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBMb2NhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTG9jYXRpb247XG59KGdlb2xvY2F0aW9uX2NvbW1vbl8xLkxvY2F0aW9uQmFzZSkpO1xuZXhwb3J0cy5Mb2NhdGlvbiA9IExvY2F0aW9uO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==