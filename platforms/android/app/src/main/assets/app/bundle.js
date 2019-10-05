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

        let applicationCheckPlatform = __webpack_require__("../node_modules/tns-core-modules/application/application.js");
        if (applicationCheckPlatform.android && !global["__snapshot"]) {
            __webpack_require__("../node_modules/tns-core-modules/ui/frame/frame.js");
__webpack_require__("../node_modules/tns-core-modules/ui/frame/activity.js");
        }

        
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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var application_1 = __webpack_require__("../node_modules/tns-core-modules/application/application.js");

var enums_1 = __webpack_require__("../node_modules/tns-core-modules/ui/enums/enums.js");

var timer_1 = __webpack_require__("../node_modules/tns-core-modules/timer/timer.js");

var geolocation_common_1 = __webpack_require__("./nativescript-geolocation/geolocation.common.js");

var permissions = __webpack_require__("../node_modules/nativescript-permissions/permissions.js");

var REQUEST_ENABLE_LOCATION = 4269;
var _onEnableLocationSuccess = null;
var _onEnableLocationFail = null;
var locationListeners = {};
var watchIdCounter = 0;
var fusedLocationClient;
var attachedForErrorHandling = false;

function _ensureLocationClient() {
  fusedLocationClient = fusedLocationClient || com.google.android.gms.location.LocationServices.getFusedLocationProviderClient(application_1.android.context);
}

application_1.android.on(application_1.AndroidApplication.activityResultEvent, function (args) {
  if (args.requestCode === REQUEST_ENABLE_LOCATION) {
    if (args.resultCode === 0) {
      if (_onEnableLocationFail) {
        _onEnableLocationFail("Location not enabled.");
      }
    } else if (_onEnableLocationSuccess) {
      _onEnableLocationSuccess();
    }
  }
});

function isAirplaneModeOn() {
  return android.provider.Settings.System.getInt(application_1.android.context.getContentResolver(), android.provider.Settings.System.AIRPLANE_MODE_ON) !== 0;
}

function isProviderEnabled(provider) {
  try {
    var locationManager = application_1.android.context.getSystemService(android.content.Context.LOCATION_SERVICE);
    return locationManager.isProviderEnabled(provider);
  } catch (ex) {
    return false;
  }
}

function errorHandler(errData) {
  while (watchIdCounter !== 0) {
    clearWatch(watchIdCounter);
    watchIdCounter--;
  }
}

function getCurrentLocation(options) {
  return new Promise(function (resolve, reject) {
    enableLocationRequest().then(function () {
      if (options.timeout === 0) {
        LocationManager.getLastLocation(options.maximumAge, resolve, reject);
      } else {
        var locationRequest = _getLocationRequest(options);

        var watchId_1 = _getNextWatchId();

        var locationCallback = _getLocationCallback(watchId_1, function (nativeLocation) {
          clearWatch(watchId_1);
          resolve(new Location(nativeLocation));
        });

        LocationManager.requestLocationUpdates(locationRequest, locationCallback);
        var timerId_1 = timer_1.setTimeout(function () {
          clearWatch(watchId_1);
          timer_1.clearTimeout(timerId_1);
          reject(new Error("Timeout while searching for location!"));
        }, options.timeout || geolocation_common_1.defaultGetLocationTimeout);
      }
    }, reject);
  });
}

exports.getCurrentLocation = getCurrentLocation;

function _getNextWatchId() {
  var watchId = ++watchIdCounter;
  return watchId;
}

function _getLocationCallback(watchId, onLocation) {
  var LocationCallback = com.google.android.gms.location.LocationCallback.extend({
    onLocationResult: function onLocationResult(locationResult) {
      this.onLocation(locationResult.getLastLocation());
    }
  });
  var locationCallback = new LocationCallback();
  locationCallback.onLocation = onLocation;
  locationListeners[watchId] = locationCallback;
  return locationCallback;
}

function _getLocationRequest(options) {
  var mLocationRequest = new com.google.android.gms.location.LocationRequest();
  var updateTime = options.updateTime === 0 ? 0 : options.updateTime || geolocation_common_1.minTimeUpdate;
  mLocationRequest.setInterval(updateTime);
  var minUpdateTime = options.minimumUpdateTime === 0 ? 0 : options.minimumUpdateTime || Math.min(updateTime, geolocation_common_1.fastestTimeUpdate);
  mLocationRequest.setFastestInterval(minUpdateTime);

  if (options.updateDistance) {
    mLocationRequest.setSmallestDisplacement(options.updateDistance);
  }

  if (options.desiredAccuracy === enums_1.Accuracy.high) {
    mLocationRequest.setPriority(com.google.android.gms.location.LocationRequest.PRIORITY_HIGH_ACCURACY);
  } else {
    mLocationRequest.setPriority(com.google.android.gms.location.LocationRequest.PRIORITY_BALANCED_POWER_ACCURACY);
  }

  return mLocationRequest;
}

function _requestLocationPermissions() {
  return new Promise(function (resolve, reject) {
    if (LocationManager.shouldSkipChecks()) {
      resolve();
    } else {
      permissions.requestPermission(android.Manifest.permission.ACCESS_FINE_LOCATION).then(resolve, reject);
    }
  });
}

function _getLocationListener(maxAge, onLocation, onError) {
  return _getTaskSuccessListener(function (nativeLocation) {
    if (nativeLocation != null) {
      var location_1 = new Location(nativeLocation);

      if (typeof maxAge === "number" && nativeLocation != null) {
        if (location_1.timestamp.valueOf() + maxAge > new Date().valueOf()) {
          onLocation(location_1);
        } else {
          onError(new Error("Last known location too old!"));
        }
      } else {
        onLocation(location_1);
      }
    } else {
      onError(new Error("There is no last known location!"));
    }
  });
}

function _getTaskSuccessListener(done) {
  return new com.google.android.gms.tasks.OnSuccessListener({
    onSuccess: done
  });
}

function _getTaskFailListener(done) {
  return new com.google.android.gms.tasks.OnFailureListener({
    onFailure: done
  });
}

function watchLocation(successCallback, errorCallback, options) {
  var zonedSuccessCallback = zonedCallback(successCallback);
  var zonedErrorCallback = zonedCallback(errorCallback);

  if ((!permissions.hasPermission(android.Manifest.permission.ACCESS_FINE_LOCATION) || !_isGooglePlayServicesAvailable()) && !LocationManager.shouldSkipChecks()) {
    throw new Error('Cannot watch location. Call "enableLocationRequest" first');
  }

  if (!attachedForErrorHandling) {
    attachedForErrorHandling = true;
    application_1.on(application_1.uncaughtErrorEvent, errorHandler.bind(this));
  }

  var locationRequest = _getLocationRequest(options);

  var watchId = _getNextWatchId();

  var locationCallback = _getLocationCallback(watchId, function (nativeLocation) {
    zonedSuccessCallback(new Location(nativeLocation));
  });

  LocationManager.requestLocationUpdates(locationRequest, locationCallback);
  return watchId;
}

exports.watchLocation = watchLocation;

function clearWatch(watchId) {
  var listener = locationListeners[watchId];

  if (listener) {
    LocationManager.removeLocationUpdates(listener);
    delete locationListeners[watchId];
  }
}

exports.clearWatch = clearWatch;

function enableLocationRequest(always) {
  return new Promise(function (resolve, reject) {
    _requestLocationPermissions().then(function () {
      _makeGooglePlayServicesAvailable().then(function () {
        _isLocationServiceEnabled().then(function () {
          resolve();
        }, function (ex) {
          if (typeof ex.getStatusCode === "function") {
            var statusCode = ex.getStatusCode();

            if (statusCode === com.google.android.gms.location.LocationSettingsStatusCodes.RESOLUTION_REQUIRED) {
              try {
                _onEnableLocationSuccess = resolve;
                _onEnableLocationFail = reject;
                return ex.startResolutionForResult(application_1.android.foregroundActivity, REQUEST_ENABLE_LOCATION);
              } catch (sendEx) {
                return resolve();
              }
            } else if (statusCode === com.google.android.gms.location.LocationSettingsStatusCodes.SETTINGS_CHANGE_UNAVAILABLE && isAirplaneModeOn() && isProviderEnabled(android.location.LocationManager.GPS_PROVIDER)) {
              return resolve();
            }
          }

          reject(new Error("Cannot enable the location service. " + ex));
        });
      }, reject);
    }, reject);
  });
}

exports.enableLocationRequest = enableLocationRequest;

function _makeGooglePlayServicesAvailable() {
  return new Promise(function (resolve, reject) {
    if (_isGooglePlayServicesAvailable()) {
      resolve();
      return;
    }

    var googleApiAvailability = com.google.android.gms.common.GoogleApiAvailability.getInstance();
    googleApiAvailability.makeGooglePlayServicesAvailable(application_1.android.foregroundActivity).addOnSuccessListener(_getTaskSuccessListener(resolve)).addOnFailureListener(_getTaskFailListener(reject));
  });
}

function _isGooglePlayServicesAvailable() {
  if (LocationManager.shouldSkipChecks()) {
    return true;
  }

  var isLocationServiceEnabled = true;
  var googleApiAvailability = com.google.android.gms.common.GoogleApiAvailability.getInstance();
  var resultCode = googleApiAvailability.isGooglePlayServicesAvailable(application_1.android.context);

  if (resultCode !== com.google.android.gms.common.ConnectionResult.SUCCESS) {
    isLocationServiceEnabled = false;
  }

  return isLocationServiceEnabled;
}

function _isLocationServiceEnabled(options) {
  return new Promise(function (resolve, reject) {
    if (LocationManager.shouldSkipChecks()) {
      resolve(true);
      return;
    }

    options = options || {
      desiredAccuracy: enums_1.Accuracy.high,
      updateTime: 0,
      updateDistance: 0,
      maximumAge: 0,
      timeout: 0
    };

    var locationRequest = _getLocationRequest(options);

    var locationSettingsBuilder = new com.google.android.gms.location.LocationSettingsRequest.Builder();
    locationSettingsBuilder.addLocationRequest(locationRequest);
    locationSettingsBuilder.setAlwaysShow(true);
    var locationSettingsClient = com.google.android.gms.location.LocationServices.getSettingsClient(application_1.android.context);
    locationSettingsClient.checkLocationSettings(locationSettingsBuilder.build()).addOnSuccessListener(_getTaskSuccessListener(resolve)).addOnFailureListener(_getTaskFailListener(reject));
  });
}

function isEnabled(options) {
  return new Promise(function (resolve, reject) {
    if (!_isGooglePlayServicesAvailable() || !permissions.hasPermission(android.Manifest.permission.ACCESS_FINE_LOCATION)) {
      resolve(false);
    } else {
      _isLocationServiceEnabled(options).then(function () {
        resolve(true);
      }, function (ex) {
        if (typeof ex.getStatusCode === "function" && ex.getStatusCode() === com.google.android.gms.location.LocationSettingsStatusCodes.SETTINGS_CHANGE_UNAVAILABLE && isAirplaneModeOn() && isProviderEnabled(android.location.LocationManager.GPS_PROVIDER)) {
          return resolve(true);
        }

        resolve(false);
      });
    }
  });
}

exports.isEnabled = isEnabled;

function distance(loc1, loc2) {
  if (!loc1.android) {
    loc1.android = androidLocationFromLocation(loc1);
  }

  if (!loc2.android) {
    loc2.android = androidLocationFromLocation(loc2);
  }

  return loc1.android.distanceTo(loc2.android);
}

exports.distance = distance;

function androidLocationFromLocation(location) {
  var androidLocation = new android.location.Location("custom");
  androidLocation.setLatitude(location.latitude);
  androidLocation.setLongitude(location.longitude);

  if (location.altitude) {
    androidLocation.setAltitude(location.altitude);
  }

  if (location.speed) {
    androidLocation.setSpeed(float(location.speed));
  }

  if (location.direction) {
    androidLocation.setBearing(float(location.direction));
  }

  if (location.timestamp) {
    try {
      androidLocation.setTime(long(location.timestamp.getTime()));
    } catch (e) {
      console.error("invalid location timestamp");
    }
  }

  return androidLocation;
}

var LocationManager = function () {
  function LocationManager() {}

  LocationManager.getLastLocation = function (maximumAge, resolve, reject) {
    _ensureLocationClient();

    return fusedLocationClient.getLastLocation().addOnSuccessListener(_getLocationListener(maximumAge, resolve, reject)).addOnFailureListener(_getTaskFailListener(function (e) {
      return reject(new Error(e.getMessage()));
    }));
  };

  LocationManager.requestLocationUpdates = function (locationRequest, locationCallback) {
    _ensureLocationClient();

    fusedLocationClient.requestLocationUpdates(locationRequest, locationCallback, null);
  };

  LocationManager.removeLocationUpdates = function (listener) {
    _ensureLocationClient();

    fusedLocationClient.removeLocationUpdates(listener);
  };

  LocationManager.shouldSkipChecks = function () {
    return false;
  };

  LocationManager.setMockLocationManager = function (MockLocationManager) {
    LocationManager.getLastLocation = MockLocationManager.getLastLocation;
    LocationManager.requestLocationUpdates = MockLocationManager.requestLocationUpdates;
    LocationManager.removeLocationUpdates = MockLocationManager.removeLocationUpdates;
    LocationManager.shouldSkipChecks = MockLocationManager.shouldSkipChecks;
  };

  return LocationManager;
}();

exports.LocationManager = LocationManager;

var Location = function (_super) {
  __extends(Location, _super);

  function Location(androidLocation) {
    var _this = _super.call(this) || this;

    if (androidLocation) {
      _this.android = androidLocation;
      _this.latitude = androidLocation.getLatitude();
      _this.longitude = androidLocation.getLongitude();
      _this.altitude = androidLocation.getAltitude();
      _this.horizontalAccuracy = androidLocation.getAccuracy();
      _this.verticalAccuracy = androidLocation.getAccuracy();
      _this.speed = androidLocation.getSpeed();
      _this.direction = androidLocation.getBearing();
      _this.timestamp = new Date(androidLocation.getTime());
    }

    return _this;
  }

  return Location;
}(geolocation_common_1.LocationBase);

exports.Location = Location;

function setCustomLocationManager(MockLocationManager) {
  LocationManager.setMockLocationManager(MockLocationManager);
}

exports.setCustomLocationManager = setCustomLocationManager;

/***/ }),

/***/ "./package.json":
/***/ (function(module) {

module.exports = JSON.parse("{\"android\":{\"v8Flags\":\"--expose_gc\",\"forceLog\":true},\"main\":\"app.js\",\"name\":\"tns-template-vue\",\"version\":\"3.2.0\"}");

/***/ })

},[["./app.js","runtime","vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vY29tcG9uZW50cy9IZWxsb1dvcmxkLnZ1ZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0hlbGxvV29ybGQudnVlPzE5Y2IiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9IZWxsb1dvcmxkLnZ1ZT8wMGI1Iiwid2VicGFjazovLy8uIHN5bmMgbm9ucmVjdXJzaXZlIF5cXC5cXC9hcHBcXC4oY3NzfHNjc3N8bGVzc3xzYXNzKSQiLCJ3ZWJwYWNrOi8vL1xcYl9bXFx3LV0qXFwuKXNjc3MpJCIsIndlYnBhY2s6Ly8vLi9hcHAuY3NzIiwid2VicGFjazovLy8uL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0hlbGxvV29ybGQudnVlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWU/MjhkYSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0hlbGxvV29ybGQudnVlPzVlYWMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9IZWxsb1dvcmxkLnZ1ZT83ODMyIiwid2VicGFjazovLy8uL25hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvbi9nZW9sb2NhdGlvbi5jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vbmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uL2dlb2xvY2F0aW9uLmpzIl0sIm5hbWVzIjpbIkhlbGxvV29ybGQiLCJWdWUiLCJjb25maWciLCJzaWxlbnQiLCJ0ZW1wbGF0ZSIsIiRzdGFydCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiTG9jYXRpb25CYXNlIiwiZGVmYXVsdEdldExvY2F0aW9uVGltZW91dCIsIm1pblJhbmdlVXBkYXRlIiwibWluVGltZVVwZGF0ZSIsImZhc3Rlc3RUaW1lVXBkYXRlIiwiYXBwbGljYXRpb25fMSIsInJlcXVpcmUiLCJlbnVtc18xIiwidGltZXJfMSIsImdlb2xvY2F0aW9uX2NvbW1vbl8xIiwicGVybWlzc2lvbnMiLCJSRVFVRVNUX0VOQUJMRV9MT0NBVElPTiIsIl9vbkVuYWJsZUxvY2F0aW9uU3VjY2VzcyIsIl9vbkVuYWJsZUxvY2F0aW9uRmFpbCIsImxvY2F0aW9uTGlzdGVuZXJzIiwid2F0Y2hJZENvdW50ZXIiLCJmdXNlZExvY2F0aW9uQ2xpZW50IiwiYXR0YWNoZWRGb3JFcnJvckhhbmRsaW5nIiwiX2Vuc3VyZUxvY2F0aW9uQ2xpZW50IiwiY29tIiwiZ29vZ2xlIiwiYW5kcm9pZCIsImdtcyIsImxvY2F0aW9uIiwiTG9jYXRpb25TZXJ2aWNlcyIsImdldEZ1c2VkTG9jYXRpb25Qcm92aWRlckNsaWVudCIsImNvbnRleHQiLCJvbiIsIkFuZHJvaWRBcHBsaWNhdGlvbiIsImFjdGl2aXR5UmVzdWx0RXZlbnQiLCJhcmdzIiwicmVxdWVzdENvZGUiLCJyZXN1bHRDb2RlIiwiaXNBaXJwbGFuZU1vZGVPbiIsInByb3ZpZGVyIiwiU2V0dGluZ3MiLCJTeXN0ZW0iLCJnZXRJbnQiLCJnZXRDb250ZW50UmVzb2x2ZXIiLCJBSVJQTEFORV9NT0RFX09OIiwiaXNQcm92aWRlckVuYWJsZWQiLCJsb2NhdGlvbk1hbmFnZXIiLCJnZXRTeXN0ZW1TZXJ2aWNlIiwiY29udGVudCIsIkNvbnRleHQiLCJMT0NBVElPTl9TRVJWSUNFIiwiZXgiLCJlcnJvckhhbmRsZXIiLCJlcnJEYXRhIiwiY2xlYXJXYXRjaCIsImdldEN1cnJlbnRMb2NhdGlvbiIsIm9wdGlvbnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImVuYWJsZUxvY2F0aW9uUmVxdWVzdCIsInRoZW4iLCJ0aW1lb3V0IiwiTG9jYXRpb25NYW5hZ2VyIiwiZ2V0TGFzdExvY2F0aW9uIiwibWF4aW11bUFnZSIsImxvY2F0aW9uUmVxdWVzdCIsIl9nZXRMb2NhdGlvblJlcXVlc3QiLCJ3YXRjaElkXzEiLCJfZ2V0TmV4dFdhdGNoSWQiLCJsb2NhdGlvbkNhbGxiYWNrIiwiX2dldExvY2F0aW9uQ2FsbGJhY2siLCJuYXRpdmVMb2NhdGlvbiIsIkxvY2F0aW9uIiwicmVxdWVzdExvY2F0aW9uVXBkYXRlcyIsInRpbWVySWRfMSIsInNldFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJFcnJvciIsIndhdGNoSWQiLCJvbkxvY2F0aW9uIiwiTG9jYXRpb25DYWxsYmFjayIsImV4dGVuZCIsIm9uTG9jYXRpb25SZXN1bHQiLCJsb2NhdGlvblJlc3VsdCIsIm1Mb2NhdGlvblJlcXVlc3QiLCJMb2NhdGlvblJlcXVlc3QiLCJ1cGRhdGVUaW1lIiwic2V0SW50ZXJ2YWwiLCJtaW5VcGRhdGVUaW1lIiwibWluaW11bVVwZGF0ZVRpbWUiLCJNYXRoIiwibWluIiwic2V0RmFzdGVzdEludGVydmFsIiwidXBkYXRlRGlzdGFuY2UiLCJzZXRTbWFsbGVzdERpc3BsYWNlbWVudCIsImRlc2lyZWRBY2N1cmFjeSIsIkFjY3VyYWN5IiwiaGlnaCIsInNldFByaW9yaXR5IiwiUFJJT1JJVFlfSElHSF9BQ0NVUkFDWSIsIlBSSU9SSVRZX0JBTEFOQ0VEX1BPV0VSX0FDQ1VSQUNZIiwiX3JlcXVlc3RMb2NhdGlvblBlcm1pc3Npb25zIiwic2hvdWxkU2tpcENoZWNrcyIsInJlcXVlc3RQZXJtaXNzaW9uIiwiTWFuaWZlc3QiLCJwZXJtaXNzaW9uIiwiQUNDRVNTX0ZJTkVfTE9DQVRJT04iLCJfZ2V0TG9jYXRpb25MaXN0ZW5lciIsIm1heEFnZSIsIm9uRXJyb3IiLCJfZ2V0VGFza1N1Y2Nlc3NMaXN0ZW5lciIsImxvY2F0aW9uXzEiLCJ0aW1lc3RhbXAiLCJ2YWx1ZU9mIiwiRGF0ZSIsImRvbmUiLCJ0YXNrcyIsIk9uU3VjY2Vzc0xpc3RlbmVyIiwib25TdWNjZXNzIiwiX2dldFRhc2tGYWlsTGlzdGVuZXIiLCJPbkZhaWx1cmVMaXN0ZW5lciIsIm9uRmFpbHVyZSIsIndhdGNoTG9jYXRpb24iLCJzdWNjZXNzQ2FsbGJhY2siLCJlcnJvckNhbGxiYWNrIiwiem9uZWRTdWNjZXNzQ2FsbGJhY2siLCJ6b25lZENhbGxiYWNrIiwiem9uZWRFcnJvckNhbGxiYWNrIiwiaGFzUGVybWlzc2lvbiIsIl9pc0dvb2dsZVBsYXlTZXJ2aWNlc0F2YWlsYWJsZSIsInVuY2F1Z2h0RXJyb3JFdmVudCIsImJpbmQiLCJsaXN0ZW5lciIsInJlbW92ZUxvY2F0aW9uVXBkYXRlcyIsImFsd2F5cyIsIl9tYWtlR29vZ2xlUGxheVNlcnZpY2VzQXZhaWxhYmxlIiwiX2lzTG9jYXRpb25TZXJ2aWNlRW5hYmxlZCIsImdldFN0YXR1c0NvZGUiLCJzdGF0dXNDb2RlIiwiTG9jYXRpb25TZXR0aW5nc1N0YXR1c0NvZGVzIiwiUkVTT0xVVElPTl9SRVFVSVJFRCIsInN0YXJ0UmVzb2x1dGlvbkZvclJlc3VsdCIsImZvcmVncm91bmRBY3Rpdml0eSIsInNlbmRFeCIsIlNFVFRJTkdTX0NIQU5HRV9VTkFWQUlMQUJMRSIsIkdQU19QUk9WSURFUiIsImdvb2dsZUFwaUF2YWlsYWJpbGl0eSIsImNvbW1vbiIsIkdvb2dsZUFwaUF2YWlsYWJpbGl0eSIsImdldEluc3RhbmNlIiwibWFrZUdvb2dsZVBsYXlTZXJ2aWNlc0F2YWlsYWJsZSIsImFkZE9uU3VjY2Vzc0xpc3RlbmVyIiwiYWRkT25GYWlsdXJlTGlzdGVuZXIiLCJpc0xvY2F0aW9uU2VydmljZUVuYWJsZWQiLCJpc0dvb2dsZVBsYXlTZXJ2aWNlc0F2YWlsYWJsZSIsIkNvbm5lY3Rpb25SZXN1bHQiLCJTVUNDRVNTIiwibG9jYXRpb25TZXR0aW5nc0J1aWxkZXIiLCJMb2NhdGlvblNldHRpbmdzUmVxdWVzdCIsIkJ1aWxkZXIiLCJhZGRMb2NhdGlvblJlcXVlc3QiLCJzZXRBbHdheXNTaG93IiwibG9jYXRpb25TZXR0aW5nc0NsaWVudCIsImdldFNldHRpbmdzQ2xpZW50IiwiY2hlY2tMb2NhdGlvblNldHRpbmdzIiwiYnVpbGQiLCJpc0VuYWJsZWQiLCJkaXN0YW5jZSIsImxvYzEiLCJsb2MyIiwiYW5kcm9pZExvY2F0aW9uRnJvbUxvY2F0aW9uIiwiZGlzdGFuY2VUbyIsImFuZHJvaWRMb2NhdGlvbiIsInNldExhdGl0dWRlIiwibGF0aXR1ZGUiLCJzZXRMb25naXR1ZGUiLCJsb25naXR1ZGUiLCJhbHRpdHVkZSIsInNldEFsdGl0dWRlIiwic3BlZWQiLCJzZXRTcGVlZCIsImZsb2F0IiwiZGlyZWN0aW9uIiwic2V0QmVhcmluZyIsInNldFRpbWUiLCJsb25nIiwiZ2V0VGltZSIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJnZXRNZXNzYWdlIiwic2V0TW9ja0xvY2F0aW9uTWFuYWdlciIsIk1vY2tMb2NhdGlvbk1hbmFnZXIiLCJfc3VwZXIiLCJfX2V4dGVuZHMiLCJfdGhpcyIsImNhbGwiLCJnZXRMYXRpdHVkZSIsImdldExvbmdpdHVkZSIsImdldEFsdGl0dWRlIiwiaG9yaXpvbnRhbEFjY3VyYWN5IiwiZ2V0QWNjdXJhY3kiLCJ2ZXJ0aWNhbEFjY3VyYWN5IiwiZ2V0U3BlZWQiLCJnZXRCZWFyaW5nIiwic2V0Q3VzdG9tTG9jYXRpb25NYW5hZ2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMENBOztBQUNBOztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUZBLE1BRUE7QUFDQTtBQUxBLEdBREE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FMQTs7QUFNQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esa0RBQ0EsT0FEQTtBQUVBOztBQUNBO0FBQ0EsMEJBQ0EseUJBREE7QUFFQSxrREFDQSx1QkFEQSxFQUhBLENBTUE7O0FBQ0E7QUFaQTs7QUFjQTtBQUNBLFNBcEJBLEVBTkEsQ0EyQkE7O0FBQ0E7QUFDQSxPQTdCQSxNQTZCQTtBQUNBO0FBQ0E7QUFDQSxLQXhDQTs7QUF5Q0EsZ0JBQ0EsQ0ExQ0E7O0FBMkNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsT0FKQSxNQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FwREE7O0FBcURBO0FBQ0E7QUFDQTtBQUNBLHNDQURBO0FBRUEsMkJBRkE7QUFHQTtBQUhBLFNBSUEsSUFKQSxDQUtBO0FBQ0E7QUFDQSxzQkFDQSxrQ0FEQTtBQUVBLG9CQUNBLDJEQUNBLEtBREEsR0FFQSxvQkFGQSxHQUdBLFlBSEEsR0FJQSxPQUpBLEdBS0EsYUFOQTtBQU9BOzs7OztBQUtBO0FBQ0Esb0JBREE7QUFFQTtBQUZBLGFBR0EsSUFIQSxDQUdBLGtCQUhBO0FBSUE7QUFDQSxPQTFCQSxFQTJCQTtBQUNBO0FBQ0EsT0E3QkE7QUErQkEsS0F0RkE7O0FBdUZBO0FBQ0E7QUFDQTtBQUNBLE9BRkEsTUFFQTtBQUNBO0FBQ0EsT0FGQSxNQUVBO0FBQ0E7QUFDQSxPQUZBLE1BRUE7QUFDQTtBQUNBO0FBQ0EsS0FqR0E7O0FBa0dBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBLDhEQUNBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQSx5REFDQSxtREFDQTtBQWJBO0FBZUEsS0FwSEE7O0FBcUhBO0FBQ0E7QUFDQTtBQUNBLHVEQUNBLHlCQURBO0FBSUEsNERBQ0EsMEJBREE7QUFHQSxzREFDQSxtQkFEQSxDQUVBLGlDQUZBO0FBSUE7QUFDQTtBQUNBO0FBRUE7QUFHQTs7QUExSUEsR0FSQTs7QUFvSkE7QUFDQTtBQUNBLHNGQUNBLGtDQURBO0FBR0EsbURBQ0Esa0NBREE7QUFJQTtBQUNBLEdBOUpBOztBQStKQTtBQUNBO0FBQ0EsNkJBREE7QUFFQSx1QkFGQTtBQUdBLGlCQUNBLFFBREEsRUFFQSxRQUZBLEVBR0EsU0FIQSxFQUlBLFdBSkEsRUFLQSxVQUxBLEVBTUEsUUFOQSxFQU9BLFVBUEEsQ0FIQTtBQVlBLGVBQ0EsS0FEQSxFQUVBLEtBRkEsRUFHQSxLQUhBLEVBSUEsS0FKQSxFQUtBLEtBTEEsRUFNQSxNQU5BLEVBT0EsTUFQQSxFQVFBLEtBUkEsRUFTQSxNQVRBLEVBVUEsS0FWQSxFQVdBLEtBWEEsRUFZQSxLQVpBLENBWkE7QUEwQkE7QUFDQSx3QkFEQTtBQUVBLHlCQUZBO0FBR0EsNEJBSEE7QUFJQSw2QkFKQTtBQUtBLDZCQUxBO0FBTUEsNkJBTkE7QUFPQSx3QkFQQTtBQVFBLGdDQVJBO0FBU0E7QUFUQSxPQTFCQTtBQXFDQTtBQUNBO0FBQ0EsbUNBREE7QUFFQTtBQUZBLFdBSUE7QUFDQSx1QkFEQTtBQUVBO0FBRkEsU0FKQSxFQVFBO0FBQ0EseUJBREE7QUFFQTtBQUZBLFNBUkEsQ0FEQTtBQWNBO0FBQ0EscUNBREE7QUFFQTtBQUZBLFdBSUE7QUFDQSx3QkFEQTtBQUVBO0FBRkEsU0FKQSxFQVFBO0FBQ0EsdUJBREE7QUFFQTtBQUZBLFNBUkEsRUFZQTtBQUNBLHVCQURBO0FBRUE7QUFGQSxTQVpBLEVBZ0JBO0FBQ0EsbUJBREE7QUFFQTtBQUZBLFNBaEJBLENBZEE7QUFtQ0E7QUFDQSx5QkFEQTtBQUVBO0FBRkEsV0FJQTtBQUNBLHNCQURBO0FBRUE7QUFGQSxTQUpBLEVBUUE7QUFDQSx3QkFEQTtBQUVBO0FBRkEsU0FSQSxFQVlBO0FBQ0EsMkRBREE7QUFFQTtBQUZBLFNBWkEsQ0FuQ0E7QUFvREE7QUFDQSw4QkFEQTtBQUVBO0FBRkEsV0FJQTtBQUNBLG9EQURBO0FBRUE7QUFGQSxTQUpBLENBcERBO0FBNkRBO0FBQ0Esd0JBREE7QUFFQTtBQUZBLFdBSUE7QUFDQSxzQkFEQTtBQUVBO0FBRkEsU0FKQSxFQVFBO0FBQ0EscUJBREE7QUFFQTtBQUZBLFNBUkEsRUFZQTtBQUNBLDRDQURBO0FBRUE7QUFGQSxTQVpBLENBN0RBO0FBOEVBO0FBQ0EsNEJBREE7QUFFQTtBQUZBLFdBSUE7QUFDQSw4QkFEQTtBQUVBO0FBRkEsU0FKQSxFQVFBO0FBQ0EsNENBREE7QUFFQTtBQUZBLFNBUkEsQ0E5RUE7QUEyRkE7QUFDQSx3QkFEQTtBQUVBO0FBRkEsV0FJQTtBQUNBLGtEQURBO0FBRUE7QUFGQSxTQUpBLENBM0ZBO0FBb0dBO0FBQ0Esd0JBREE7QUFFQTtBQUZBLFdBSUE7QUFDQSxzQkFEQTtBQUVBO0FBRkEsU0FKQSxFQVFBO0FBQ0EseUJBREE7QUFFQTtBQUZBLFNBUkEsRUFZQTtBQUNBLHVEQURBO0FBRUE7QUFGQSxTQVpBLENBcEdBO0FBcUhBO0FBQ0Esd0JBREE7QUFFQTtBQUZBLFdBSUE7QUFDQSx3REFEQTtBQUVBO0FBRkEsU0FKQTtBQXJIQSxPQXJDQTtBQXFLQTtBQUNBLGdCQURBO0FBRUEsc0JBRkE7QUFHQSx1QkFIQTtBQUlBLHFCQUpBO0FBS0EseUJBTEE7QUFNQSx5QkFOQTtBQU9BLHNCQVBBO0FBUUE7QUFSQTtBQXJLQTtBQWdMQTs7QUFoVkEsRzs7Ozs7OztBQzlDQSx5RUFBMkIsbUJBQU8sQ0FBQyw0Q0FBK0M7QUFDbEY7OztBQUdBO0FBQ0EsY0FBYyxRQUFTLDJDQUEyQyxrQkFBa0Isb0JBQW9CLHdCQUF3Qix1QkFBdUIsR0FBRyw4QkFBOEIsd0JBQXdCLG9CQUFvQix1QkFBdUIsR0FBRyxpQ0FBaUMsMkJBQTJCLGdDQUFnQyx3QkFBd0IsMEJBQTBCLEdBQUc7O0FBRS9ZOztBQUVBLHdCQUF3QixtQkFBTyxDQUFDLDZEQUE4QjtBQUM5RCxJQUFJLG1CQUFPLENBQUMsNERBQXlDOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsUUFBUSxJQUFVO0FBQ2xCO0FBQ0E7QUFDQSwrQkFBK0IscURBQXFEO0FBQ3BGLFNBQVM7QUFDVDs7Ozs7Ozs7OztBQ3hCQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLE1BQU0sdUJBQXVCLEVBQUU7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsU0FBUyxTQUFTLG9DQUFvQyxFQUFFO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUywwQ0FBMEMsRUFBRTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVMsOEJBQThCLEVBQUU7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdEQUFnRDtBQUN4RSxxQkFBcUI7QUFDckIsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDakhBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFOzs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBIOzs7Ozs7O0FDekJBLHlFQUEyQixtQkFBTyxDQUFDLDRDQUE0QztBQUMvRTtBQUNBLFVBQVUsbUJBQU8sQ0FBQyxpR0FBNEY7O0FBRTlHO0FBQ0EsY0FBYyxRQUFTOztBQUV2QjtBQUNBO0FBQ0EsUUFBUSxJQUFVO0FBQ2xCO0FBQ0E7QUFDQSwrQkFBK0IsbUNBQW1DO0FBQ2xFLFNBQVM7QUFDVDs7Ozs7Ozs7OztBQ2RBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQSxPQUFPQSxVQUFQLE1BQXVCLGlHQUV2Qjs7QUFDQUMsR0FBRyxDQUFDQyxNQUFKLENBQVdDLG9CQUFYLENBQW9CLG9EQUFwQjtBQUVBLG9CQUFRO0FBRUpDLFNBRkk7QUFPUTtBQUNSSjtBQURRO0FBUFIsQ0FBUixFQVVHSyxNQVZIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXFHO0FBQ3ZDO0FBQ0w7QUFDcUM7OztBQUc5RjtBQUMwRjtBQUMxRixnQkFBZ0IsMkdBQVU7QUFDMUIsRUFBRSxnRkFBTTtBQUNSLEVBQUUsaUdBQU07QUFDUixFQUFFLDBHQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsSUFBSSxJQUFVO0FBQ2QsWUFBWSxtQkFBTyxDQUFDLGtEQUErSDtBQUNuSixjQUFjLG1CQUFPLENBQUMsZ0RBQUs7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHNCQUFzQix3RUFBNkQsRUFBRTtBQUFBO0FBQ3JGO0FBQ0EsZ0JBQWdCLGlHQUFNO0FBQ3RCLHlCQUF5QiwwR0FBZTtBQUN4QyxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNlLGdGOzs7Ozs7OztBQ3ZDZjtBQUFBO0FBQUEsd0NBQTBLLENBQWdCLDhPQUFHLEVBQUMsQzs7Ozs7Ozs7QUNBOUw7QUFBQTtBQUFBO0FBQUE7QUFBMlksQ0FBZ0IsMGJBQUcsRUFBQyxDOzs7Ozs7OztBQ0EvWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7OztBQ0FhOztBQUNiQyxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQUVDLE9BQUssRUFBRTtBQUFULENBQTdDOztBQUNBLElBQUlDLFlBQVksR0FBSSxZQUFZO0FBQzVCLFdBQVNBLFlBQVQsR0FBd0IsQ0FDdkI7O0FBQ0QsU0FBT0EsWUFBUDtBQUNILENBSm1CLEVBQXBCOztBQUtBRixPQUFPLENBQUNFLFlBQVIsR0FBdUJBLFlBQXZCO0FBQ0FGLE9BQU8sQ0FBQ0cseUJBQVIsR0FBb0MsSUFBSSxFQUFKLEdBQVMsSUFBN0M7QUFDQUgsT0FBTyxDQUFDSSxjQUFSLEdBQXlCLEdBQXpCO0FBQ0FKLE9BQU8sQ0FBQ0ssYUFBUixHQUF3QixJQUFJLEVBQUosR0FBUyxJQUFqQztBQUNBTCxPQUFPLENBQUNNLGlCQUFSLEdBQTRCLElBQUksSUFBaEMsQzs7Ozs7Ozs7QUNYYTs7QUFDYlIsTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUFFQyxPQUFLLEVBQUU7QUFBVCxDQUE3Qzs7QUFDQSxJQUFJTSxhQUFhLEdBQUdDLG1CQUFPLENBQUMsNkRBQUQsQ0FBM0I7O0FBQ0EsSUFBSUMsT0FBTyxHQUFHRCxtQkFBTyxDQUFDLG9EQUFELENBQXJCOztBQUNBLElBQUlFLE9BQU8sR0FBR0YsbUJBQU8sQ0FBQyxpREFBRCxDQUFyQjs7QUFDQSxJQUFJRyxvQkFBb0IsR0FBR0gsbUJBQU8sQ0FBQyxrREFBRCxDQUFsQzs7QUFDQSxJQUFJSSxXQUFXLEdBQUdKLG1CQUFPLENBQUMseURBQUQsQ0FBekI7O0FBQ0EsSUFBSUssdUJBQXVCLEdBQUcsSUFBOUI7QUFDQSxJQUFJQyx3QkFBd0IsR0FBRyxJQUEvQjtBQUNBLElBQUlDLHFCQUFxQixHQUFHLElBQTVCO0FBQ0EsSUFBSUMsaUJBQWlCLEdBQUcsRUFBeEI7QUFDQSxJQUFJQyxjQUFjLEdBQUcsQ0FBckI7QUFDQSxJQUFJQyxtQkFBSjtBQUNBLElBQUlDLHdCQUF3QixHQUFHLEtBQS9COztBQUNBLFNBQVNDLHFCQUFULEdBQWlDO0FBQzdCRixxQkFBbUIsR0FBR0EsbUJBQW1CLElBQ3JDRyxHQUFHLENBQUNDLE1BQUosQ0FBV0MsT0FBWCxDQUFtQkMsR0FBbkIsQ0FBdUJDLFFBQXZCLENBQWdDQyxnQkFBaEMsQ0FBaURDLDhCQUFqRCxDQUFnRnBCLGFBQWEsQ0FBQ2dCLE9BQWQsQ0FBc0JLLE9BQXRHLENBREo7QUFFSDs7QUFDRHJCLGFBQWEsQ0FBQ2dCLE9BQWQsQ0FBc0JNLEVBQXRCLENBQXlCdEIsYUFBYSxDQUFDdUIsa0JBQWQsQ0FBaUNDLG1CQUExRCxFQUErRSxVQUFVQyxJQUFWLEVBQWdCO0FBQzNGLE1BQUlBLElBQUksQ0FBQ0MsV0FBTCxLQUFxQnBCLHVCQUF6QixFQUFrRDtBQUM5QyxRQUFJbUIsSUFBSSxDQUFDRSxVQUFMLEtBQW9CLENBQXhCLEVBQTJCO0FBQ3ZCLFVBQUluQixxQkFBSixFQUEyQjtBQUN2QkEsNkJBQXFCLENBQUMsdUJBQUQsQ0FBckI7QUFDSDtBQUNKLEtBSkQsTUFLSyxJQUFJRCx3QkFBSixFQUE4QjtBQUMvQkEsOEJBQXdCO0FBQzNCO0FBQ0o7QUFDSixDQVhEOztBQVlBLFNBQVNxQixnQkFBVCxHQUE0QjtBQUN4QixTQUFPWixPQUFPLENBQUNhLFFBQVIsQ0FBaUJDLFFBQWpCLENBQTBCQyxNQUExQixDQUFpQ0MsTUFBakMsQ0FBd0NoQyxhQUFhLENBQUNnQixPQUFkLENBQXNCSyxPQUF0QixDQUE4Qlksa0JBQTlCLEVBQXhDLEVBQTRGakIsT0FBTyxDQUFDYSxRQUFSLENBQWlCQyxRQUFqQixDQUEwQkMsTUFBMUIsQ0FBaUNHLGdCQUE3SCxNQUFtSixDQUExSjtBQUNIOztBQUNELFNBQVNDLGlCQUFULENBQTJCTixRQUEzQixFQUFxQztBQUNqQyxNQUFJO0FBQ0EsUUFBSU8sZUFBZSxHQUFHcEMsYUFBYSxDQUFDZ0IsT0FBZCxDQUFzQkssT0FBdEIsQ0FDakJnQixnQkFEaUIsQ0FDQXJCLE9BQU8sQ0FBQ3NCLE9BQVIsQ0FBZ0JDLE9BQWhCLENBQXdCQyxnQkFEeEIsQ0FBdEI7QUFFQSxXQUFPSixlQUFlLENBQUNELGlCQUFoQixDQUFrQ04sUUFBbEMsQ0FBUDtBQUNILEdBSkQsQ0FLQSxPQUFPWSxFQUFQLEVBQVc7QUFDUCxXQUFPLEtBQVA7QUFDSDtBQUNKOztBQUNELFNBQVNDLFlBQVQsQ0FBc0JDLE9BQXRCLEVBQStCO0FBQzNCLFNBQU9qQyxjQUFjLEtBQUssQ0FBMUIsRUFBNkI7QUFDekJrQyxjQUFVLENBQUNsQyxjQUFELENBQVY7QUFDQUEsa0JBQWM7QUFDakI7QUFDSjs7QUFDRCxTQUFTbUMsa0JBQVQsQ0FBNEJDLE9BQTVCLEVBQXFDO0FBQ2pDLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQVVDLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQzFDQyx5QkFBcUIsR0FBR0MsSUFBeEIsQ0FBNkIsWUFBWTtBQUNyQyxVQUFJTCxPQUFPLENBQUNNLE9BQVIsS0FBb0IsQ0FBeEIsRUFBMkI7QUFDdkJDLHVCQUFlLENBQUNDLGVBQWhCLENBQWdDUixPQUFPLENBQUNTLFVBQXhDLEVBQW9EUCxPQUFwRCxFQUE2REMsTUFBN0Q7QUFDSCxPQUZELE1BR0s7QUFDRCxZQUFJTyxlQUFlLEdBQUdDLG1CQUFtQixDQUFDWCxPQUFELENBQXpDOztBQUNBLFlBQUlZLFNBQVMsR0FBR0MsZUFBZSxFQUEvQjs7QUFDQSxZQUFJQyxnQkFBZ0IsR0FBR0Msb0JBQW9CLENBQUNILFNBQUQsRUFBWSxVQUFVSSxjQUFWLEVBQTBCO0FBQzdFbEIsb0JBQVUsQ0FBQ2MsU0FBRCxDQUFWO0FBQ0FWLGlCQUFPLENBQUMsSUFBSWUsUUFBSixDQUFhRCxjQUFiLENBQUQsQ0FBUDtBQUNILFNBSDBDLENBQTNDOztBQUlBVCx1QkFBZSxDQUFDVyxzQkFBaEIsQ0FBdUNSLGVBQXZDLEVBQXdESSxnQkFBeEQ7QUFDQSxZQUFJSyxTQUFTLEdBQUc5RCxPQUFPLENBQUMrRCxVQUFSLENBQW1CLFlBQVk7QUFDM0N0QixvQkFBVSxDQUFDYyxTQUFELENBQVY7QUFDQXZELGlCQUFPLENBQUNnRSxZQUFSLENBQXFCRixTQUFyQjtBQUNBaEIsZ0JBQU0sQ0FBQyxJQUFJbUIsS0FBSixDQUFVLHVDQUFWLENBQUQsQ0FBTjtBQUNILFNBSmUsRUFJYnRCLE9BQU8sQ0FBQ00sT0FBUixJQUFtQmhELG9CQUFvQixDQUFDUix5QkFKM0IsQ0FBaEI7QUFLSDtBQUNKLEtBbEJELEVBa0JHcUQsTUFsQkg7QUFtQkgsR0FwQk0sQ0FBUDtBQXFCSDs7QUFDRHhELE9BQU8sQ0FBQ29ELGtCQUFSLEdBQTZCQSxrQkFBN0I7O0FBQ0EsU0FBU2MsZUFBVCxHQUEyQjtBQUN2QixNQUFJVSxPQUFPLEdBQUcsRUFBRTNELGNBQWhCO0FBQ0EsU0FBTzJELE9BQVA7QUFDSDs7QUFDRCxTQUFTUixvQkFBVCxDQUE4QlEsT0FBOUIsRUFBdUNDLFVBQXZDLEVBQW1EO0FBQy9DLE1BQUlDLGdCQUFnQixHQUFHekQsR0FBRyxDQUFDQyxNQUFKLENBQVdDLE9BQVgsQ0FBbUJDLEdBQW5CLENBQXVCQyxRQUF2QixDQUFnQ3FELGdCQUFoQyxDQUFpREMsTUFBakQsQ0FBd0Q7QUFDM0VDLG9CQUFnQixFQUFFLDBCQUFVQyxjQUFWLEVBQTBCO0FBQ3hDLFdBQUtKLFVBQUwsQ0FBZ0JJLGNBQWMsQ0FBQ3BCLGVBQWYsRUFBaEI7QUFDSDtBQUgwRSxHQUF4RCxDQUF2QjtBQUtBLE1BQUlNLGdCQUFnQixHQUFHLElBQUlXLGdCQUFKLEVBQXZCO0FBQ0FYLGtCQUFnQixDQUFDVSxVQUFqQixHQUE4QkEsVUFBOUI7QUFDQTdELG1CQUFpQixDQUFDNEQsT0FBRCxDQUFqQixHQUE2QlQsZ0JBQTdCO0FBQ0EsU0FBT0EsZ0JBQVA7QUFDSDs7QUFDRCxTQUFTSCxtQkFBVCxDQUE2QlgsT0FBN0IsRUFBc0M7QUFDbEMsTUFBSTZCLGdCQUFnQixHQUFHLElBQUk3RCxHQUFHLENBQUNDLE1BQUosQ0FBV0MsT0FBWCxDQUFtQkMsR0FBbkIsQ0FBdUJDLFFBQXZCLENBQWdDMEQsZUFBcEMsRUFBdkI7QUFDQSxNQUFJQyxVQUFVLEdBQUcvQixPQUFPLENBQUMrQixVQUFSLEtBQXVCLENBQXZCLEdBQTJCLENBQTNCLEdBQStCL0IsT0FBTyxDQUFDK0IsVUFBUixJQUFzQnpFLG9CQUFvQixDQUFDTixhQUEzRjtBQUNBNkUsa0JBQWdCLENBQUNHLFdBQWpCLENBQTZCRCxVQUE3QjtBQUNBLE1BQUlFLGFBQWEsR0FBR2pDLE9BQU8sQ0FBQ2tDLGlCQUFSLEtBQThCLENBQTlCLEdBQ2hCLENBRGdCLEdBQ1psQyxPQUFPLENBQUNrQyxpQkFBUixJQUE2QkMsSUFBSSxDQUFDQyxHQUFMLENBQVNMLFVBQVQsRUFBcUJ6RSxvQkFBb0IsQ0FBQ0wsaUJBQTFDLENBRHJDO0FBRUE0RSxrQkFBZ0IsQ0FBQ1Esa0JBQWpCLENBQW9DSixhQUFwQzs7QUFDQSxNQUFJakMsT0FBTyxDQUFDc0MsY0FBWixFQUE0QjtBQUN4QlQsb0JBQWdCLENBQUNVLHVCQUFqQixDQUF5Q3ZDLE9BQU8sQ0FBQ3NDLGNBQWpEO0FBQ0g7O0FBQ0QsTUFBSXRDLE9BQU8sQ0FBQ3dDLGVBQVIsS0FBNEJwRixPQUFPLENBQUNxRixRQUFSLENBQWlCQyxJQUFqRCxFQUF1RDtBQUNuRGIsb0JBQWdCLENBQUNjLFdBQWpCLENBQTZCM0UsR0FBRyxDQUFDQyxNQUFKLENBQVdDLE9BQVgsQ0FBbUJDLEdBQW5CLENBQXVCQyxRQUF2QixDQUFnQzBELGVBQWhDLENBQWdEYyxzQkFBN0U7QUFDSCxHQUZELE1BR0s7QUFDRGYsb0JBQWdCLENBQUNjLFdBQWpCLENBQTZCM0UsR0FBRyxDQUFDQyxNQUFKLENBQVdDLE9BQVgsQ0FBbUJDLEdBQW5CLENBQXVCQyxRQUF2QixDQUFnQzBELGVBQWhDLENBQWdEZSxnQ0FBN0U7QUFDSDs7QUFDRCxTQUFPaEIsZ0JBQVA7QUFDSDs7QUFDRCxTQUFTaUIsMkJBQVQsR0FBdUM7QUFDbkMsU0FBTyxJQUFJN0MsT0FBSixDQUFZLFVBQVVDLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQzFDLFFBQUlJLGVBQWUsQ0FBQ3dDLGdCQUFoQixFQUFKLEVBQXdDO0FBQ3BDN0MsYUFBTztBQUNWLEtBRkQsTUFHSztBQUNEM0MsaUJBQVcsQ0FBQ3lGLGlCQUFaLENBQThCOUUsT0FBTyxDQUFDK0UsUUFBUixDQUFpQkMsVUFBakIsQ0FBNEJDLG9CQUExRCxFQUFnRjlDLElBQWhGLENBQXFGSCxPQUFyRixFQUE4RkMsTUFBOUY7QUFDSDtBQUNKLEdBUE0sQ0FBUDtBQVFIOztBQUNELFNBQVNpRCxvQkFBVCxDQUE4QkMsTUFBOUIsRUFBc0M3QixVQUF0QyxFQUFrRDhCLE9BQWxELEVBQTJEO0FBQ3ZELFNBQU9DLHVCQUF1QixDQUFDLFVBQVV2QyxjQUFWLEVBQTBCO0FBQ3JELFFBQUlBLGNBQWMsSUFBSSxJQUF0QixFQUE0QjtBQUN4QixVQUFJd0MsVUFBVSxHQUFHLElBQUl2QyxRQUFKLENBQWFELGNBQWIsQ0FBakI7O0FBQ0EsVUFBSSxPQUFPcUMsTUFBUCxLQUFrQixRQUFsQixJQUE4QnJDLGNBQWMsSUFBSSxJQUFwRCxFQUEwRDtBQUN0RCxZQUFJd0MsVUFBVSxDQUFDQyxTQUFYLENBQXFCQyxPQUFyQixLQUFpQ0wsTUFBakMsR0FBMEMsSUFBSU0sSUFBSixHQUFXRCxPQUFYLEVBQTlDLEVBQW9FO0FBQ2hFbEMsb0JBQVUsQ0FBQ2dDLFVBQUQsQ0FBVjtBQUNILFNBRkQsTUFHSztBQUNERixpQkFBTyxDQUFDLElBQUloQyxLQUFKLENBQVUsOEJBQVYsQ0FBRCxDQUFQO0FBQ0g7QUFDSixPQVBELE1BUUs7QUFDREUsa0JBQVUsQ0FBQ2dDLFVBQUQsQ0FBVjtBQUNIO0FBQ0osS0FiRCxNQWNLO0FBQ0RGLGFBQU8sQ0FBQyxJQUFJaEMsS0FBSixDQUFVLGtDQUFWLENBQUQsQ0FBUDtBQUNIO0FBQ0osR0FsQjZCLENBQTlCO0FBbUJIOztBQUNELFNBQVNpQyx1QkFBVCxDQUFpQ0ssSUFBakMsRUFBdUM7QUFDbkMsU0FBTyxJQUFJNUYsR0FBRyxDQUFDQyxNQUFKLENBQVdDLE9BQVgsQ0FBbUJDLEdBQW5CLENBQXVCMEYsS0FBdkIsQ0FBNkJDLGlCQUFqQyxDQUFtRDtBQUN0REMsYUFBUyxFQUFFSDtBQUQyQyxHQUFuRCxDQUFQO0FBR0g7O0FBQ0QsU0FBU0ksb0JBQVQsQ0FBOEJKLElBQTlCLEVBQW9DO0FBQ2hDLFNBQU8sSUFBSTVGLEdBQUcsQ0FBQ0MsTUFBSixDQUFXQyxPQUFYLENBQW1CQyxHQUFuQixDQUF1QjBGLEtBQXZCLENBQTZCSSxpQkFBakMsQ0FBbUQ7QUFDdERDLGFBQVMsRUFBRU47QUFEMkMsR0FBbkQsQ0FBUDtBQUdIOztBQUNELFNBQVNPLGFBQVQsQ0FBdUJDLGVBQXZCLEVBQXdDQyxhQUF4QyxFQUF1RHJFLE9BQXZELEVBQWdFO0FBQzVELE1BQUlzRSxvQkFBb0IsR0FBR0MsYUFBYSxDQUFDSCxlQUFELENBQXhDO0FBQ0EsTUFBSUksa0JBQWtCLEdBQUdELGFBQWEsQ0FBQ0YsYUFBRCxDQUF0Qzs7QUFDQSxNQUFJLENBQUMsQ0FBQzlHLFdBQVcsQ0FBQ2tILGFBQVosQ0FBMEJ2RyxPQUFPLENBQUMrRSxRQUFSLENBQWlCQyxVQUFqQixDQUE0QkMsb0JBQXRELENBQUQsSUFDRCxDQUFDdUIsOEJBQThCLEVBRC9CLEtBQ3NDLENBQUNuRSxlQUFlLENBQUN3QyxnQkFBaEIsRUFEM0MsRUFDK0U7QUFDM0UsVUFBTSxJQUFJekIsS0FBSixDQUFVLDJEQUFWLENBQU47QUFDSDs7QUFDRCxNQUFJLENBQUN4RCx3QkFBTCxFQUErQjtBQUMzQkEsNEJBQXdCLEdBQUcsSUFBM0I7QUFDQVosaUJBQWEsQ0FBQ3NCLEVBQWQsQ0FBaUJ0QixhQUFhLENBQUN5SCxrQkFBL0IsRUFBbUQvRSxZQUFZLENBQUNnRixJQUFiLENBQWtCLElBQWxCLENBQW5EO0FBQ0g7O0FBQ0QsTUFBSWxFLGVBQWUsR0FBR0MsbUJBQW1CLENBQUNYLE9BQUQsQ0FBekM7O0FBQ0EsTUFBSXVCLE9BQU8sR0FBR1YsZUFBZSxFQUE3Qjs7QUFDQSxNQUFJQyxnQkFBZ0IsR0FBR0Msb0JBQW9CLENBQUNRLE9BQUQsRUFBVSxVQUFVUCxjQUFWLEVBQTBCO0FBQzNFc0Qsd0JBQW9CLENBQUMsSUFBSXJELFFBQUosQ0FBYUQsY0FBYixDQUFELENBQXBCO0FBQ0gsR0FGMEMsQ0FBM0M7O0FBR0FULGlCQUFlLENBQUNXLHNCQUFoQixDQUF1Q1IsZUFBdkMsRUFBd0RJLGdCQUF4RDtBQUNBLFNBQU9TLE9BQVA7QUFDSDs7QUFDRDVFLE9BQU8sQ0FBQ3dILGFBQVIsR0FBd0JBLGFBQXhCOztBQUNBLFNBQVNyRSxVQUFULENBQW9CeUIsT0FBcEIsRUFBNkI7QUFDekIsTUFBSXNELFFBQVEsR0FBR2xILGlCQUFpQixDQUFDNEQsT0FBRCxDQUFoQzs7QUFDQSxNQUFJc0QsUUFBSixFQUFjO0FBQ1Z0RSxtQkFBZSxDQUFDdUUscUJBQWhCLENBQXNDRCxRQUF0QztBQUNBLFdBQU9sSCxpQkFBaUIsQ0FBQzRELE9BQUQsQ0FBeEI7QUFDSDtBQUNKOztBQUNENUUsT0FBTyxDQUFDbUQsVUFBUixHQUFxQkEsVUFBckI7O0FBQ0EsU0FBU00scUJBQVQsQ0FBK0IyRSxNQUEvQixFQUF1QztBQUNuQyxTQUFPLElBQUk5RSxPQUFKLENBQVksVUFBVUMsT0FBVixFQUFtQkMsTUFBbkIsRUFBMkI7QUFDMUMyQywrQkFBMkIsR0FBR3pDLElBQTlCLENBQW1DLFlBQVk7QUFDM0MyRSxzQ0FBZ0MsR0FBRzNFLElBQW5DLENBQXdDLFlBQVk7QUFDaEQ0RSxpQ0FBeUIsR0FBRzVFLElBQTVCLENBQWlDLFlBQVk7QUFDekNILGlCQUFPO0FBQ1YsU0FGRCxFQUVHLFVBQVVQLEVBQVYsRUFBYztBQUNiLGNBQUksT0FBT0EsRUFBRSxDQUFDdUYsYUFBVixLQUE0QixVQUFoQyxFQUE0QztBQUN4QyxnQkFBSUMsVUFBVSxHQUFHeEYsRUFBRSxDQUFDdUYsYUFBSCxFQUFqQjs7QUFDQSxnQkFBSUMsVUFBVSxLQUFLbkgsR0FBRyxDQUFDQyxNQUFKLENBQVdDLE9BQVgsQ0FBbUJDLEdBQW5CLENBQXVCQyxRQUF2QixDQUFnQ2dILDJCQUFoQyxDQUE0REMsbUJBQS9FLEVBQW9HO0FBQ2hHLGtCQUFJO0FBQ0E1SCx3Q0FBd0IsR0FBR3lDLE9BQTNCO0FBQ0F4QyxxQ0FBcUIsR0FBR3lDLE1BQXhCO0FBQ0EsdUJBQU9SLEVBQUUsQ0FBQzJGLHdCQUFILENBQTRCcEksYUFBYSxDQUFDZ0IsT0FBZCxDQUFzQnFILGtCQUFsRCxFQUFzRS9ILHVCQUF0RSxDQUFQO0FBQ0gsZUFKRCxDQUtBLE9BQU9nSSxNQUFQLEVBQWU7QUFDWCx1QkFBT3RGLE9BQU8sRUFBZDtBQUNIO0FBQ0osYUFURCxNQVVLLElBQUlpRixVQUFVLEtBQUtuSCxHQUFHLENBQUNDLE1BQUosQ0FBV0MsT0FBWCxDQUFtQkMsR0FBbkIsQ0FBdUJDLFFBQXZCLENBQWdDZ0gsMkJBQWhDLENBQTRESywyQkFBM0UsSUFDRjNHLGdCQUFnQixFQURkLElBRUZPLGlCQUFpQixDQUFDbkIsT0FBTyxDQUFDRSxRQUFSLENBQWlCbUMsZUFBakIsQ0FBaUNtRixZQUFsQyxDQUZuQixFQUVvRTtBQUNyRSxxQkFBT3hGLE9BQU8sRUFBZDtBQUNIO0FBQ0o7O0FBQ0RDLGdCQUFNLENBQUMsSUFBSW1CLEtBQUosQ0FBVSx5Q0FBeUMzQixFQUFuRCxDQUFELENBQU47QUFDSCxTQXRCRDtBQXVCSCxPQXhCRCxFQXdCR1EsTUF4Qkg7QUF5QkgsS0ExQkQsRUEwQkdBLE1BMUJIO0FBMkJILEdBNUJNLENBQVA7QUE2Qkg7O0FBQ0R4RCxPQUFPLENBQUN5RCxxQkFBUixHQUFnQ0EscUJBQWhDOztBQUNBLFNBQVM0RSxnQ0FBVCxHQUE0QztBQUN4QyxTQUFPLElBQUkvRSxPQUFKLENBQVksVUFBVUMsT0FBVixFQUFtQkMsTUFBbkIsRUFBMkI7QUFDMUMsUUFBSXVFLDhCQUE4QixFQUFsQyxFQUFzQztBQUNsQ3hFLGFBQU87QUFDUDtBQUNIOztBQUNELFFBQUl5RixxQkFBcUIsR0FBRzNILEdBQUcsQ0FBQ0MsTUFBSixDQUFXQyxPQUFYLENBQW1CQyxHQUFuQixDQUF1QnlILE1BQXZCLENBQThCQyxxQkFBOUIsQ0FBb0RDLFdBQXBELEVBQTVCO0FBQ0FILHlCQUFxQixDQUFDSSwrQkFBdEIsQ0FBc0Q3SSxhQUFhLENBQUNnQixPQUFkLENBQXNCcUgsa0JBQTVFLEVBQ0tTLG9CQURMLENBQzBCekMsdUJBQXVCLENBQUNyRCxPQUFELENBRGpELEVBRUsrRixvQkFGTCxDQUUwQmpDLG9CQUFvQixDQUFDN0QsTUFBRCxDQUY5QztBQUdILEdBVE0sQ0FBUDtBQVVIOztBQUNELFNBQVN1RSw4QkFBVCxHQUEwQztBQUN0QyxNQUFJbkUsZUFBZSxDQUFDd0MsZ0JBQWhCLEVBQUosRUFBd0M7QUFDcEMsV0FBTyxJQUFQO0FBQ0g7O0FBQ0QsTUFBSW1ELHdCQUF3QixHQUFHLElBQS9CO0FBQ0EsTUFBSVAscUJBQXFCLEdBQUczSCxHQUFHLENBQUNDLE1BQUosQ0FBV0MsT0FBWCxDQUFtQkMsR0FBbkIsQ0FBdUJ5SCxNQUF2QixDQUE4QkMscUJBQTlCLENBQW9EQyxXQUFwRCxFQUE1QjtBQUNBLE1BQUlqSCxVQUFVLEdBQUc4RyxxQkFBcUIsQ0FBQ1EsNkJBQXRCLENBQW9EakosYUFBYSxDQUFDZ0IsT0FBZCxDQUFzQkssT0FBMUUsQ0FBakI7O0FBQ0EsTUFBSU0sVUFBVSxLQUFLYixHQUFHLENBQUNDLE1BQUosQ0FBV0MsT0FBWCxDQUFtQkMsR0FBbkIsQ0FBdUJ5SCxNQUF2QixDQUE4QlEsZ0JBQTlCLENBQStDQyxPQUFsRSxFQUEyRTtBQUN2RUgsNEJBQXdCLEdBQUcsS0FBM0I7QUFDSDs7QUFDRCxTQUFPQSx3QkFBUDtBQUNIOztBQUNELFNBQVNqQix5QkFBVCxDQUFtQ2pGLE9BQW5DLEVBQTRDO0FBQ3hDLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQVVDLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQzFDLFFBQUlJLGVBQWUsQ0FBQ3dDLGdCQUFoQixFQUFKLEVBQXdDO0FBQ3BDN0MsYUFBTyxDQUFDLElBQUQsQ0FBUDtBQUNBO0FBQ0g7O0FBQ0RGLFdBQU8sR0FBR0EsT0FBTyxJQUFJO0FBQUV3QyxxQkFBZSxFQUFFcEYsT0FBTyxDQUFDcUYsUUFBUixDQUFpQkMsSUFBcEM7QUFBMENYLGdCQUFVLEVBQUUsQ0FBdEQ7QUFBeURPLG9CQUFjLEVBQUUsQ0FBekU7QUFBNEU3QixnQkFBVSxFQUFFLENBQXhGO0FBQTJGSCxhQUFPLEVBQUU7QUFBcEcsS0FBckI7O0FBQ0EsUUFBSUksZUFBZSxHQUFHQyxtQkFBbUIsQ0FBQ1gsT0FBRCxDQUF6Qzs7QUFDQSxRQUFJc0csdUJBQXVCLEdBQUcsSUFBSXRJLEdBQUcsQ0FBQ0MsTUFBSixDQUFXQyxPQUFYLENBQW1CQyxHQUFuQixDQUF1QkMsUUFBdkIsQ0FBZ0NtSSx1QkFBaEMsQ0FBd0RDLE9BQTVELEVBQTlCO0FBQ0FGLDJCQUF1QixDQUFDRyxrQkFBeEIsQ0FBMkMvRixlQUEzQztBQUNBNEYsMkJBQXVCLENBQUNJLGFBQXhCLENBQXNDLElBQXRDO0FBQ0EsUUFBSUMsc0JBQXNCLEdBQUczSSxHQUFHLENBQUNDLE1BQUosQ0FBV0MsT0FBWCxDQUFtQkMsR0FBbkIsQ0FBdUJDLFFBQXZCLENBQWdDQyxnQkFBaEMsQ0FBaUR1SSxpQkFBakQsQ0FBbUUxSixhQUFhLENBQUNnQixPQUFkLENBQXNCSyxPQUF6RixDQUE3QjtBQUNBb0ksMEJBQXNCLENBQUNFLHFCQUF2QixDQUE2Q1AsdUJBQXVCLENBQUNRLEtBQXhCLEVBQTdDLEVBQ0tkLG9CQURMLENBQzBCekMsdUJBQXVCLENBQUNyRCxPQUFELENBRGpELEVBRUsrRixvQkFGTCxDQUUwQmpDLG9CQUFvQixDQUFDN0QsTUFBRCxDQUY5QztBQUdILEdBZE0sQ0FBUDtBQWVIOztBQUNELFNBQVM0RyxTQUFULENBQW1CL0csT0FBbkIsRUFBNEI7QUFDeEIsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBVUMsT0FBVixFQUFtQkMsTUFBbkIsRUFBMkI7QUFDMUMsUUFBSSxDQUFDdUUsOEJBQThCLEVBQS9CLElBQ0EsQ0FBQ25ILFdBQVcsQ0FBQ2tILGFBQVosQ0FBMEJ2RyxPQUFPLENBQUMrRSxRQUFSLENBQWlCQyxVQUFqQixDQUE0QkMsb0JBQXRELENBREwsRUFDa0Y7QUFDOUVqRCxhQUFPLENBQUMsS0FBRCxDQUFQO0FBQ0gsS0FIRCxNQUlLO0FBQ0QrRSwrQkFBeUIsQ0FBQ2pGLE9BQUQsQ0FBekIsQ0FBbUNLLElBQW5DLENBQXdDLFlBQVk7QUFDaERILGVBQU8sQ0FBQyxJQUFELENBQVA7QUFDSCxPQUZELEVBRUcsVUFBVVAsRUFBVixFQUFjO0FBQ2IsWUFBSSxPQUFPQSxFQUFFLENBQUN1RixhQUFWLEtBQTRCLFVBQTVCLElBQ0d2RixFQUFFLENBQUN1RixhQUFILE9BQXVCbEgsR0FBRyxDQUFDQyxNQUFKLENBQVdDLE9BQVgsQ0FBbUJDLEdBQW5CLENBQXVCQyxRQUF2QixDQUFnQ2dILDJCQUFoQyxDQUE0REssMkJBRHRGLElBRUczRyxnQkFBZ0IsRUFGbkIsSUFHR08saUJBQWlCLENBQUNuQixPQUFPLENBQUNFLFFBQVIsQ0FBaUJtQyxlQUFqQixDQUFpQ21GLFlBQWxDLENBSHhCLEVBR3lFO0FBQ3JFLGlCQUFPeEYsT0FBTyxDQUFDLElBQUQsQ0FBZDtBQUNIOztBQUNEQSxlQUFPLENBQUMsS0FBRCxDQUFQO0FBQ0gsT0FWRDtBQVdIO0FBQ0osR0FsQk0sQ0FBUDtBQW1CSDs7QUFDRHZELE9BQU8sQ0FBQ29LLFNBQVIsR0FBb0JBLFNBQXBCOztBQUNBLFNBQVNDLFFBQVQsQ0FBa0JDLElBQWxCLEVBQXdCQyxJQUF4QixFQUE4QjtBQUMxQixNQUFJLENBQUNELElBQUksQ0FBQy9JLE9BQVYsRUFBbUI7QUFDZitJLFFBQUksQ0FBQy9JLE9BQUwsR0FBZWlKLDJCQUEyQixDQUFDRixJQUFELENBQTFDO0FBQ0g7O0FBQ0QsTUFBSSxDQUFDQyxJQUFJLENBQUNoSixPQUFWLEVBQW1CO0FBQ2ZnSixRQUFJLENBQUNoSixPQUFMLEdBQWVpSiwyQkFBMkIsQ0FBQ0QsSUFBRCxDQUExQztBQUNIOztBQUNELFNBQU9ELElBQUksQ0FBQy9JLE9BQUwsQ0FBYWtKLFVBQWIsQ0FBd0JGLElBQUksQ0FBQ2hKLE9BQTdCLENBQVA7QUFDSDs7QUFDRHZCLE9BQU8sQ0FBQ3FLLFFBQVIsR0FBbUJBLFFBQW5COztBQUNBLFNBQVNHLDJCQUFULENBQXFDL0ksUUFBckMsRUFBK0M7QUFDM0MsTUFBSWlKLGVBQWUsR0FBRyxJQUFJbkosT0FBTyxDQUFDRSxRQUFSLENBQWlCNkMsUUFBckIsQ0FBOEIsUUFBOUIsQ0FBdEI7QUFDQW9HLGlCQUFlLENBQUNDLFdBQWhCLENBQTRCbEosUUFBUSxDQUFDbUosUUFBckM7QUFDQUYsaUJBQWUsQ0FBQ0csWUFBaEIsQ0FBNkJwSixRQUFRLENBQUNxSixTQUF0Qzs7QUFDQSxNQUFJckosUUFBUSxDQUFDc0osUUFBYixFQUF1QjtBQUNuQkwsbUJBQWUsQ0FBQ00sV0FBaEIsQ0FBNEJ2SixRQUFRLENBQUNzSixRQUFyQztBQUNIOztBQUNELE1BQUl0SixRQUFRLENBQUN3SixLQUFiLEVBQW9CO0FBQ2hCUCxtQkFBZSxDQUFDUSxRQUFoQixDQUF5QkMsS0FBSyxDQUFDMUosUUFBUSxDQUFDd0osS0FBVixDQUE5QjtBQUNIOztBQUNELE1BQUl4SixRQUFRLENBQUMySixTQUFiLEVBQXdCO0FBQ3BCVixtQkFBZSxDQUFDVyxVQUFoQixDQUEyQkYsS0FBSyxDQUFDMUosUUFBUSxDQUFDMkosU0FBVixDQUFoQztBQUNIOztBQUNELE1BQUkzSixRQUFRLENBQUNxRixTQUFiLEVBQXdCO0FBQ3BCLFFBQUk7QUFDQTRELHFCQUFlLENBQUNZLE9BQWhCLENBQXdCQyxJQUFJLENBQUM5SixRQUFRLENBQUNxRixTQUFULENBQW1CMEUsT0FBbkIsRUFBRCxDQUE1QjtBQUNILEtBRkQsQ0FHQSxPQUFPQyxDQUFQLEVBQVU7QUFDTkMsYUFBTyxDQUFDQyxLQUFSLENBQWMsNEJBQWQ7QUFDSDtBQUNKOztBQUNELFNBQU9qQixlQUFQO0FBQ0g7O0FBQ0QsSUFBSTlHLGVBQWUsR0FBSSxZQUFZO0FBQy9CLFdBQVNBLGVBQVQsR0FBMkIsQ0FDMUI7O0FBQ0RBLGlCQUFlLENBQUNDLGVBQWhCLEdBQWtDLFVBQVVDLFVBQVYsRUFBc0JQLE9BQXRCLEVBQStCQyxNQUEvQixFQUF1QztBQUNyRXBDLHlCQUFxQjs7QUFDckIsV0FBT0YsbUJBQW1CLENBQUMyQyxlQUFwQixHQUNGd0Ysb0JBREUsQ0FDbUI1QyxvQkFBb0IsQ0FBQzNDLFVBQUQsRUFBYVAsT0FBYixFQUFzQkMsTUFBdEIsQ0FEdkMsRUFFRjhGLG9CQUZFLENBRW1CakMsb0JBQW9CLENBQUMsVUFBVW9FLENBQVYsRUFBYTtBQUFFLGFBQU9qSSxNQUFNLENBQUMsSUFBSW1CLEtBQUosQ0FBVThHLENBQUMsQ0FBQ0csVUFBRixFQUFWLENBQUQsQ0FBYjtBQUEyQyxLQUEzRCxDQUZ2QyxDQUFQO0FBR0gsR0FMRDs7QUFNQWhJLGlCQUFlLENBQUNXLHNCQUFoQixHQUF5QyxVQUFVUixlQUFWLEVBQTJCSSxnQkFBM0IsRUFBNkM7QUFDbEYvQyx5QkFBcUI7O0FBQ3JCRix1QkFBbUIsQ0FBQ3FELHNCQUFwQixDQUEyQ1IsZUFBM0MsRUFBNERJLGdCQUE1RCxFQUE4RSxJQUE5RTtBQUNILEdBSEQ7O0FBSUFQLGlCQUFlLENBQUN1RSxxQkFBaEIsR0FBd0MsVUFBVUQsUUFBVixFQUFvQjtBQUN4RDlHLHlCQUFxQjs7QUFDckJGLHVCQUFtQixDQUFDaUgscUJBQXBCLENBQTBDRCxRQUExQztBQUNILEdBSEQ7O0FBSUF0RSxpQkFBZSxDQUFDd0MsZ0JBQWhCLEdBQW1DLFlBQVk7QUFDM0MsV0FBTyxLQUFQO0FBQ0gsR0FGRDs7QUFHQXhDLGlCQUFlLENBQUNpSSxzQkFBaEIsR0FBeUMsVUFBVUMsbUJBQVYsRUFBK0I7QUFDcEVsSSxtQkFBZSxDQUFDQyxlQUFoQixHQUFrQ2lJLG1CQUFtQixDQUFDakksZUFBdEQ7QUFDQUQsbUJBQWUsQ0FBQ1csc0JBQWhCLEdBQXlDdUgsbUJBQW1CLENBQUN2SCxzQkFBN0Q7QUFDQVgsbUJBQWUsQ0FBQ3VFLHFCQUFoQixHQUF3QzJELG1CQUFtQixDQUFDM0QscUJBQTVEO0FBQ0F2RSxtQkFBZSxDQUFDd0MsZ0JBQWhCLEdBQW1DMEYsbUJBQW1CLENBQUMxRixnQkFBdkQ7QUFDSCxHQUxEOztBQU1BLFNBQU94QyxlQUFQO0FBQ0gsQ0EzQnNCLEVBQXZCOztBQTRCQTVELE9BQU8sQ0FBQzRELGVBQVIsR0FBMEJBLGVBQTFCOztBQUNBLElBQUlVLFFBQVEsR0FBSSxVQUFVeUgsTUFBVixFQUFrQjtBQUM5QkMsV0FBUyxDQUFDMUgsUUFBRCxFQUFXeUgsTUFBWCxDQUFUOztBQUNBLFdBQVN6SCxRQUFULENBQWtCb0csZUFBbEIsRUFBbUM7QUFDL0IsUUFBSXVCLEtBQUssR0FBR0YsTUFBTSxDQUFDRyxJQUFQLENBQVksSUFBWixLQUFxQixJQUFqQzs7QUFDQSxRQUFJeEIsZUFBSixFQUFxQjtBQUNqQnVCLFdBQUssQ0FBQzFLLE9BQU4sR0FBZ0JtSixlQUFoQjtBQUNBdUIsV0FBSyxDQUFDckIsUUFBTixHQUFpQkYsZUFBZSxDQUFDeUIsV0FBaEIsRUFBakI7QUFDQUYsV0FBSyxDQUFDbkIsU0FBTixHQUFrQkosZUFBZSxDQUFDMEIsWUFBaEIsRUFBbEI7QUFDQUgsV0FBSyxDQUFDbEIsUUFBTixHQUFpQkwsZUFBZSxDQUFDMkIsV0FBaEIsRUFBakI7QUFDQUosV0FBSyxDQUFDSyxrQkFBTixHQUEyQjVCLGVBQWUsQ0FBQzZCLFdBQWhCLEVBQTNCO0FBQ0FOLFdBQUssQ0FBQ08sZ0JBQU4sR0FBeUI5QixlQUFlLENBQUM2QixXQUFoQixFQUF6QjtBQUNBTixXQUFLLENBQUNoQixLQUFOLEdBQWNQLGVBQWUsQ0FBQytCLFFBQWhCLEVBQWQ7QUFDQVIsV0FBSyxDQUFDYixTQUFOLEdBQWtCVixlQUFlLENBQUNnQyxVQUFoQixFQUFsQjtBQUNBVCxXQUFLLENBQUNuRixTQUFOLEdBQWtCLElBQUlFLElBQUosQ0FBUzBELGVBQWUsQ0FBQ2MsT0FBaEIsRUFBVCxDQUFsQjtBQUNIOztBQUNELFdBQU9TLEtBQVA7QUFDSDs7QUFDRCxTQUFPM0gsUUFBUDtBQUNILENBbEJlLENBa0JkM0Qsb0JBQW9CLENBQUNULFlBbEJQLENBQWhCOztBQW1CQUYsT0FBTyxDQUFDc0UsUUFBUixHQUFtQkEsUUFBbkI7O0FBQ0EsU0FBU3FJLHdCQUFULENBQWtDYixtQkFBbEMsRUFBdUQ7QUFDbkRsSSxpQkFBZSxDQUFDaUksc0JBQWhCLENBQXVDQyxtQkFBdkM7QUFDSDs7QUFDRDlMLE9BQU8sQ0FBQzJNLHdCQUFSLEdBQW1DQSx3QkFBbkMsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPFBhZ2UgQGxvYWRlZD1cIm9uTG9hZGVkXCI+XG4gICAgICAgIDxHcmlkTGF5b3V0IGNvbHVtbnM9XCIqXCIgcm93cz1cImF1dG8sKixhdXRvXCI+XG4gICAgICAgICAgICA8R3JpZExheW91dCBjb2x1bW5zPVwiYXV0bywgKlwiIHJvdz1cIjBcIiByb3dzPVwiKlwiPlxuICAgICAgICAgICAgICAgIDxJbWFnZSA6c3JjPVwiYGh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke2N1cnJlbnRXZWF0aGVyRGF0YS5jb25kaXRpb25JY29ufUAyeC5wbmdgXCIgY29sdW1uPVwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgIGhlaWdodD1cIjEwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgIGhvcml6b250YWxBbGlnbm1lbnQ9XCJsZWZ0XCIgaW9zT3ZlcmZsb3dTYWZlQXJlYT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW49XCIyMFwiIHZlcnRpY2FsQWxpZ25tZW50PVwibWlkZGxlXCJcblxuICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD1cIjEwMFwiPjwvSW1hZ2U+XG4gICAgICAgICAgICAgICAgPExhYmVsIDp0ZXh0PVwiY3VycmVudFdlYXRoZXJEYXRhLmNpdHlcIiBjbGFzcz1cImRheS10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uPVwiMVwiIHRleHRBbGlnbm1lbnQ9XCJsZWZ0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgdmVydGljYWxBbGlnbm1lbnQ9XCJtaWRkbGVcIj48L0xhYmVsPlxuICAgICAgICAgICAgPC9HcmlkTGF5b3V0PlxuXG4gICAgICAgICAgICA8R3JpZExheW91dCBjb2x1bW5zPVwiYXV0b1wiIGhvcml6b250YWxBbGlnbm1lbnQ9XCJjZW50ZXJcIiByb3c9XCIxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M9XCIqXCI+XG4gICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0IHZlcnRpY2FsQWxpZ25tZW50PVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxMYWJlbCA6Y29sb3I9XCJjdXJyZW50V2VhdGhlckRhdGEudGVtcGVyYXR1cmVDb2xvclwiIDpmb250U2l6ZT1cInRlbXBlcmF0dXJlRm9udFNpemVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgOnRleHQ9XCJnZXRUZW1wZXJhdHVyZVRleHQoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInRlbXAtc3R5bGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93PVwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ25tZW50PVwicmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9MYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPExhYmVsIDp0ZXh0PVwiYCR7Y3VycmVudFdlYXRoZXJEYXRhLmN1cnJlbnREYXl9LCAke2N1cnJlbnRXZWF0aGVyRGF0YS5jdXJyZW50RGF0ZX1gXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZGF5LXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93PVwiMVwiIHRleHRBbGlnbm1lbnQ9XCJjZW50ZXJcIj48L0xhYmVsPlxuICAgICAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XG4gICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgICAgICA8R3JpZExheW91dCBjb2x1bW5zPVwiKlwiIG1hcmdpbkJvdHRvbT1cIjIwXCIgcGFkZGluZz1cIjIwXCIgcm93PVwiMlwiXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dzPVwiKlwiPlxuICAgICAgICAgICAgICAgIDxMYWJlbCBAbG9hZGVkPVwib25Ub2RheUxhYmVsTG9hZGVkXCIgY2xhc3M9XCJ0ZXh0LWRpc3BsYXktc3R5bGVcIlxuICAgICAgICAgICAgICAgICAgICAgICBpb3NPdmVyZmxvd1NhZmVBcmVhPVwidHJ1ZVwiIHRleHRXcmFwPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgIDwvTGFiZWw+XG4gICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgIDwvR3JpZExheW91dD5cblxuXG4gICAgPC9QYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBjb25zdCBHZW9sb2NhdGlvbiA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb25cIik7XG4gICAgY29uc3QgQWNjdXJhY3kgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9lbnVtc1wiKTtcbiAgICBjb25zdCBodHRwID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvaHR0cFwiKTtcblxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgZmlsdGVyczoge1xuICAgICAgICAgICAgbG93ZXJjYXNlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBvblRvZGF5TGFiZWxMb2FkZWQoYXJncykge1xuICAgICAgICAgICAgICAgIC8vOnRleHQ9XCJjdXJyZW50V2VhdGhlckRhdGEudG9kYXlzVGV4dFwiXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZXR0aW5nIGxhYmVsIDogXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMubGFiZWxPYmplY3QgPSBhcmdzLm9iamVjdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjcmVhdGVGb3JtYXR0ZWRTdHJpbmcoc3RyaW5nc1RvRm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhzdHJpbmdzVG9Gb3JtYXQpO1xuICAgICAgICAgICAgICAgIGlmIChzdHJpbmdzVG9Gb3JtYXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkU3RyaW5nID0gcmVxdWlyZShcInRleHQvZm9ybWF0dGVkLXN0cmluZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkU3BhbiA9IHJlcXVpcmUoXCJ0ZXh0L3NwYW5cIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IENvbG9yTW9kdWxlID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvY29sb3JcIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmc3RyaW5nVG9TZW5kID0gbmV3IGZvcm1hdHRlZFN0cmluZy5Gb3JtYXR0ZWRTdHJpbmcoKTtcblxuICAgICAgICAgICAgICAgICAgICBzdHJpbmdzVG9Gb3JtYXQuZm9yRWFjaCgoY3VycmVudFN0ckZyYWdtZW50LCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmc3BhbiA9IG5ldyBmb3JtYXR0ZWRTcGFuLlNwYW4oKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZnNwYW4udGV4dCA9IGN1cnJlbnRTdHJGcmFnbWVudC50ZXh0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGN1cnJlbnRTdHJGcmFnbWVudC50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm5vcm1hbFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmc3Bhbi5jb2xvciA9IG5ldyBDb2xvck1vZHVsZS5Db2xvcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYmxhY2tcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDVVNUT00gc2V0dGluZyBhbnl0aGluZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnNwYW4uY29sb3IgPSBuZXcgQ29sb3JNb2R1bGUuQ29sb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3RyRnJhZ21lbnQudHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmc3Bhbi5jbGFzcyA9IFwib3JhbmdlLXRleHRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmc3RyaW5nVG9TZW5kLnNwYW5zLnB1c2goZnNwYW4pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhmc3RyaW5nVG9TZW5kKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZzdHJpbmdUb1NlbmQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkxvYWRlZCgpIHtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRUZW1wZXJhdHVyZVRleHQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFdlYXRoZXJEYXRhLnRlbXBlcmF0dXJlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wZXJhdHVyZUZvbnRTaXplID0gNTA7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIkxvYWRpbmcgLi4uXCI7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBlcmF0dXJlRm9udFNpemUgPSA5MDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMuY3VycmVudFdlYXRoZXJEYXRhLnRlbXBlcmF0dXJlfcKwQ2A7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldE15V2VhdGhlcigpIHtcbiAgICAgICAgICAgICAgICBHZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICBHZW9sb2NhdGlvbi5nZXRDdXJyZW50TG9jYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICBkZXNpcmVkQWNjdXJhY3k6IEFjY3VyYWN5LmhpZ2gsXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZURpc3RhbmNlOiAwLjEsXG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXQ6IDIwMDAwXG4gICAgICAgICAgICAgICAgfSkudGhlbihcbiAgICAgICAgICAgICAgICAgICAgbG9jID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXBwSWQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVkODIyNmJhM2EzYzhjN2NlNTQwNWFmMzU2Yjg5MDZlXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/QVBQSUQ9XCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBJZCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiJnVuaXRzPW1ldHJpYyZsYXQ9XCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2MubGF0aXR1ZGUgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiZsb249XCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2MubG9uZ2l0dWRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qdmFyIHVybCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/QVBQSUQ9XCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBJZCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiJnVuaXRzPW1ldHJpYyZxPU11bWJhaVwiOyovXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBodHRwLnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbih0aGlzLnBhcnNlUmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRUZW1wZXJhdHVyZUNvbG9yKHRlbXApIHtcbiAgICAgICAgICAgICAgICBpZiAodGVtcCA8IDE1KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIiM4NUMxRTlcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRlbXAgPCAyNSAmJiB0ZW1wID49IDE1KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIiNGNEQwM0ZcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRlbXAgPCAzNSAmJiB0ZW1wID49IDI1KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIiNGMzlDMTJcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCIjRTc0QzNDXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldENvbmRpdGlvbih3ZWF0aGVyRGF0YSkge1xuICAgICAgICAgICAgICAgIGxldCBmaXJzdERpZ2l0ID0gd2VhdGhlckRhdGEuaWQudG9TdHJpbmcoKS5jaGFyQXQoMCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25kaXRpb24gY29kZTogXCIgKyB3ZWF0aGVyRGF0YS5pZCk7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChmaXJzdERpZ2l0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCIyXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ0aHVuZGVyc3Rvcm1zXCI7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCIzXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzdW5ueVJhaW5zXCI7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCI1XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2VhdGhlckRhdGEuaWQgPT0gNTAwKSByZXR1cm4gXCJsaWdodFJhaW5zXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiBcImhlYXZ5UmFpbnNcIjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIjdcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImZvZ1wiO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiOFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdlYXRoZXJEYXRhLmlkID09IDgwMCkgcmV0dXJuIFwic3VubnlcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHdlYXRoZXJEYXRhLmlkID09IDgwMSkgcmV0dXJuIFwiY2xvdWR5U3VuXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiBcImNsb3VkeVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXJzZVJlc3BvbnNlKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdlYXRoZXJSZXNwb25zZSA9IHJlc3BvbnNlLmNvbnRlbnQudG9KU09OKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50V2VhdGhlckRhdGEuY2l0eSA9IHdlYXRoZXJSZXNwb25zZS5uYW1lO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFdlYXRoZXJEYXRhLnRlbXBlcmF0dXJlID0gTWF0aC5mbG9vcihcbiAgICAgICAgICAgICAgICAgICAgd2VhdGhlclJlc3BvbnNlLm1haW4udGVtcFxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRXZWF0aGVyRGF0YS5jb25kaXRpb24gPSB0aGlzLmdldENvbmRpdGlvbihcbiAgICAgICAgICAgICAgICAgICAgd2VhdGhlclJlc3BvbnNlLndlYXRoZXJbMF1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFdlYXRoZXJEYXRhLnRlbXBlcmF0dXJlQ29sb3IgPSB0aGlzXG4gICAgICAgICAgICAgICAgICAgIC5jb25kaXRpb25Ub0NvbG9yTWFwW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRXZWF0aGVyRGF0YS5jb25kaXRpb25cbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnRXZWF0aGVyRGF0YS5jb25kaXRpb24pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHt0aGlzLmN1cnJlbnRXZWF0aGVyRGF0YS5jb25kaXRpb25JY29ufUAyeC5wbmdgKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsT2JqZWN0LmZvcm1hdHRlZFRleHQgPSB0aGlzLmNyZWF0ZUZvcm1hdHRlZFN0cmluZyh0aGlzLmNvbmRpdGlvblRvVGV4dE1hcFt0aGlzLmN1cnJlbnRXZWF0aGVyRGF0YS5jb25kaXRpb25dKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFdlYXRoZXJEYXRhLmNvbmRpdGlvbkljb24gPSB3ZWF0aGVyUmVzcG9uc2Uud2VhdGhlclswXS5pY29uO1xuXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbW91bnRlZCgpIHtcbiAgICAgICAgICAgIGxldCB0b2RheXNEYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFdlYXRoZXJEYXRhLmN1cnJlbnREYXRlID0gYCR7dG9kYXlzRGF0ZS5nZXREYXRlKCl9ICR7XG4gICAgICAgICAgICAgICAgdGhpcy5tb250aHNbdG9kYXlzRGF0ZS5nZXRNb250aCgpXVxuICAgICAgICAgICAgfWA7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRXZWF0aGVyRGF0YS5jdXJyZW50RGF5ID0gYCR7XG4gICAgICAgICAgICAgICAgdGhpcy53ZWVrZGF5c1t0b2RheXNEYXRlLmdldERheSgpXVxuICAgICAgICAgICAgfWA7XG5cbiAgICAgICAgICAgIHRoaXMuZ2V0TXlXZWF0aGVyKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHRlbXBlcmF0dXJlRm9udFNpemU6IDMwLFxuICAgICAgICAgICAgICAgIGxhYmVsT2JqZWN0OiBudWxsLFxuICAgICAgICAgICAgICAgIHdlZWtkYXlzOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiU3VuZGF5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiTW9uZGF5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiVHVlc2RheVwiLFxuICAgICAgICAgICAgICAgICAgICBcIldlZG5lc2RheVwiLFxuICAgICAgICAgICAgICAgICAgICBcIlRodXJzZGF5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiRnJpZGF5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiU2F0dXJkYXlcIlxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgbW9udGhzOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiSmFuXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiRmViXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiTWFyXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiQXByXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiTWF5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiSnVuZVwiLFxuICAgICAgICAgICAgICAgICAgICBcIkp1bHlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJBdWdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJTZXB0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiT2N0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiTm92XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiRGVjXCJcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIGNvbmRpdGlvblRvQ29sb3JNYXA6IHtcbiAgICAgICAgICAgICAgICAgICAgc3Vubnk6IFwiI0YxQzQwRlwiLFxuICAgICAgICAgICAgICAgICAgICBjbG91ZHk6IFwiIzk1QTVBNlwiLFxuICAgICAgICAgICAgICAgICAgICBjbG91ZHlTdW46IFwiI0E3OTI1MVwiLFxuICAgICAgICAgICAgICAgICAgICBsaWdodFJhaW5zOiBcIiM1REFERTJcIixcbiAgICAgICAgICAgICAgICAgICAgc3VubnlSYWluczogXCIjOGViNTljXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYXZ5UmFpbnM6IFwiIzI4NzRBNlwiLFxuICAgICAgICAgICAgICAgICAgICB3aW5keTogXCIjRDM1NDAwXCIsXG4gICAgICAgICAgICAgICAgICAgIHRodW5kZXJzdG9ybXM6IFwiIzU2NjU3M1wiLFxuICAgICAgICAgICAgICAgICAgICBmb2c6IFwiI0FCQjJCOVwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb25kaXRpb25Ub1RleHRNYXA6IHtcbiAgICAgICAgICAgICAgICAgICAgc3Vubnk6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkl0J3MgZ29pbmcgdG8gYmUgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJzdW5ueVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiI0YxQzQwRlwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiIHRvZGF5IVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgY2xvdWR5OiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJUb2RheSdzIHdlYXRoZXIgaXMgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJjbG91ZHlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIiM5NUE1QTZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIiBhbmQgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJub3JtYWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIiBkdWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCIjOTVBNUE2XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCIhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJub3JtYWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBjbG91ZHlTdW46IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkNsb3VkeSBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiIzk1QTVBNlwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJhbmQgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJub3JtYWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcInN1bm55IFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiI0YxQzQwRlwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiYXQgdGhlIHNhbWUgdGltZS4gR28gZm9yIGEgZHJpdmUgcGVyaGFwcz9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIGxpZ2h0UmFpbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkxpZ2h0IHJhaW5zIFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCIjNURBREUyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcInRvZGF5LiBEb24ndCBmb3JnZXQgdGhhdCB1bWJyZWxsYSFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHN1bm55UmFpbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlJhaW5zIFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCIjNURBREUyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcImFuZCBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwic3VuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCIjNURBREUyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCIuIFlvdSBtaWdodCBzZWUgYSByYWluYm93IVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgaGVhdnlSYWluczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiSXRzIGdvbm5hIFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJub3JtYWxcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiZnVja2luZyBwb3VyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCIjMjg3NEE2XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCIuIENhdHMsIGRvZ3MsIGV2ZW4gd2hhbGVzIVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgd2luZHk6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIldpbmR5IFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCIjRDM1NDAwXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkFGISBpdHMgZ29ubmEgYmxvdyB5b3VyIHdpZyBvZmYhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJub3JtYWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB0aHVuZGVyc3Rvcm1zOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJSYWlucyBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiIzU2NjU3M1wiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJhbmQgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJub3JtYWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcInRodW5kZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIiM1NjY1NzNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIiEhPyBDb3VsZCB0aGUgd2VhdGhlciBnZXQgYW55IHdvcnNlPyFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIGZvZzogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRm9nZ3kgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIiNBQkIyQjlcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQUYuIENhbiB5b3Ugc2VlIGFueXRoaW5nIGFoZWFkIG9mIHlvdSFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgY3VycmVudFdlYXRoZXJEYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGNpdHk6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnREYXk6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnREYXRlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBjb25kaXRpb246IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbkljb246IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBlcmF0dXJlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICB0b2RheXNUZXh0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wZXJhdHVyZUNvbG9yOiBcIlwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbiAgICAudGV4dC1kaXNwbGF5LXN0eWxlIHtcbiAgICAgICAgcGFkZGluZzogMTA7XG4gICAgICAgIGZvbnQtc2l6ZTogNjA7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICBsaW5lLWhlaWdodDogLTEwO1xuICAgIH1cblxuICAgIC5kYXktdGV4dCB7XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDMwO1xuICAgICAgICBmb250LXNpemU6IDMwO1xuICAgICAgICBmb250LXdlaWdodDogMjAwO1xuICAgIH1cblxuICAgIC5vcmFuZ2UtdGV4dCB7XG4gICAgICAgIGNvbG9yOiBcIiNGRjBGMEZcIlxuICAgIH1cblxuICAgIC50ZW1wLXN0eWxlIHtcbiAgICAgICAgcGFkZGluZy1yaWdodDogMzA7XG5cbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG5cbiAgICB9XG48L3N0eWxlPiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLnRleHQtZGlzcGxheS1zdHlsZVtkYXRhLXYtNzYzZGI5N2JdIHtcXG4gICAgcGFkZGluZzogMTA7XFxuICAgIGZvbnQtc2l6ZTogNjA7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICBsaW5lLWhlaWdodDogLTEwO1xcbn1cXG4uZGF5LXRleHRbZGF0YS12LTc2M2RiOTdiXSB7XFxuICAgIHBhZGRpbmctcmlnaHQ6IDMwO1xcbiAgICBmb250LXNpemU6IDMwO1xcbiAgICBmb250LXdlaWdodDogMjAwO1xcbn1cXG4ub3JhbmdlLXRleHRbZGF0YS12LTc2M2RiOTdiXSB7XFxuICAgIGNvbG9yOiBcXFwiI0ZGMEYwRlxcXCJcXG59XFxuLnRlbXAtc3R5bGVbZGF0YS12LTc2M2RiOTdiXSB7XFxuICAgIHBhZGRpbmctcmlnaHQ6IDMwO1xcblxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG4gICAgY29uc3QgYXBwbGljYXRpb24gPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiKTtcbiAgICByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9zdHlsaW5nL3N0eWxlLXNjb3BlXCIpO1xuXG4gICAgZXhwb3J0cy5mb3JFYWNoKGNzc0V4cG9ydCA9PiB7XG4gICAgICAgIGlmIChjc3NFeHBvcnQubGVuZ3RoID4gMSAmJiBjc3NFeHBvcnRbMV0pIHtcbiAgICAgICAgICAgIC8vIGFwcGx5aW5nIHRoZSBzZWNvbmQgaXRlbSBvZiB0aGUgZXhwb3J0IGFzIGl0IGNvbnRhaW5zIHRoZSBjc3MgY29udGVudHNcbiAgICAgICAgICAgIGFwcGxpY2F0aW9uLmFkZENzcyhjc3NFeHBvcnRbMV0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgO1xuICAgIGlmIChtb2R1bGUuaG90KSB7XG4gICAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG4gICAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZSgoKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwuaG1yUmVmcmVzaCh7IHR5cGU6ICdzdHlsZScsIHBhdGg6ICcuL2NvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWUnIH0pO1xuICAgICAgICB9KVxuICAgIH1cbiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJQYWdlXCIsXG4gICAgeyBvbjogeyBsb2FkZWQ6IF92bS5vbkxvYWRlZCB9IH0sXG4gICAgW1xuICAgICAgX2MoXG4gICAgICAgIFwiR3JpZExheW91dFwiLFxuICAgICAgICB7IGF0dHJzOiB7IGNvbHVtbnM6IFwiKlwiLCByb3dzOiBcImF1dG8sKixhdXRvXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgY29sdW1uczogXCJhdXRvLCAqXCIsIHJvdzogXCIwXCIsIHJvd3M6IFwiKlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJJbWFnZVwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIHNyYzpcbiAgICAgICAgICAgICAgICAgICAgXCJodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vXCIgK1xuICAgICAgICAgICAgICAgICAgICBfdm0uY3VycmVudFdlYXRoZXJEYXRhLmNvbmRpdGlvbkljb24gK1xuICAgICAgICAgICAgICAgICAgICBcIkAyeC5wbmdcIixcbiAgICAgICAgICAgICAgICAgIGNvbHVtbjogXCIwXCIsXG4gICAgICAgICAgICAgICAgICBoZWlnaHQ6IFwiMTAwXCIsXG4gICAgICAgICAgICAgICAgICBob3Jpem9udGFsQWxpZ25tZW50OiBcImxlZnRcIixcbiAgICAgICAgICAgICAgICAgIGlvc092ZXJmbG93U2FmZUFyZWE6IFwidHJ1ZVwiLFxuICAgICAgICAgICAgICAgICAgbWFyZ2luOiBcIjIwXCIsXG4gICAgICAgICAgICAgICAgICB2ZXJ0aWNhbEFsaWdubWVudDogXCJtaWRkbGVcIixcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjEwMFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZGF5LXRleHRcIixcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgdGV4dDogX3ZtLmN1cnJlbnRXZWF0aGVyRGF0YS5jaXR5LFxuICAgICAgICAgICAgICAgICAgY29sdW1uOiBcIjFcIixcbiAgICAgICAgICAgICAgICAgIHRleHRBbGlnbm1lbnQ6IFwibGVmdFwiLFxuICAgICAgICAgICAgICAgICAgdmVydGljYWxBbGlnbm1lbnQ6IFwibWlkZGxlXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBcImF1dG9cIixcbiAgICAgICAgICAgICAgICBob3Jpem9udGFsQWxpZ25tZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgIHJvdzogXCIxXCIsXG4gICAgICAgICAgICAgICAgcm93czogXCIqXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJTdGFja0xheW91dFwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgdmVydGljYWxBbGlnbm1lbnQ6IFwiY2VudGVyXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0ZW1wLXN0eWxlXCIsXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I6IF92bS5jdXJyZW50V2VhdGhlckRhdGEudGVtcGVyYXR1cmVDb2xvcixcbiAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogX3ZtLnRlbXBlcmF0dXJlRm9udFNpemUsXG4gICAgICAgICAgICAgICAgICAgICAgdGV4dDogX3ZtLmdldFRlbXBlcmF0dXJlVGV4dCgpLFxuICAgICAgICAgICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWdubWVudDogXCJyaWdodFwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImRheS10ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5jdXJyZW50V2VhdGhlckRhdGEuY3VycmVudERheSArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiwgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmN1cnJlbnRXZWF0aGVyRGF0YS5jdXJyZW50RGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbm1lbnQ6IFwiY2VudGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJHcmlkTGF5b3V0XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgY29sdW1uczogXCIqXCIsXG4gICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiBcIjIwXCIsXG4gICAgICAgICAgICAgICAgcGFkZGluZzogXCIyMFwiLFxuICAgICAgICAgICAgICAgIHJvdzogXCIyXCIsXG4gICAgICAgICAgICAgICAgcm93czogXCIqXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGV4dC1kaXNwbGF5LXN0eWxlXCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgaW9zT3ZlcmZsb3dTYWZlQXJlYTogXCJ0cnVlXCIsIHRleHRXcmFwOiBcInRydWVcIiB9LFxuICAgICAgICAgICAgICAgIG9uOiB7IGxvYWRlZDogX3ZtLm9uVG9kYXlMYWJlbExvYWRlZCB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIG1hcCA9IHtcblx0XCIuL2FwcC5jc3NcIjogXCIuL2FwcC5jc3NcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi8gc3luYyBeXFxcXC5cXFxcL2FwcFxcXFwuKGNzc3xzY3NzfGxlc3N8c2FzcykkXCI7IiwidmFyIG1hcCA9IHtcblx0XCIuL2FwcC5jc3NcIjogXCIuL2FwcC5jc3NcIixcblx0XCIuL2FwcC5qc1wiOiBcIi4vYXBwLmpzXCIsXG5cdFwiLi9uYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb24vZ2VvbG9jYXRpb24uY29tbW9uLmpzXCI6IFwiLi9uYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb24vZ2VvbG9jYXRpb24uY29tbW9uLmpzXCIsXG5cdFwiLi9uYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb24vZ2VvbG9jYXRpb24uanNcIjogXCIuL25hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvbi9nZW9sb2NhdGlvbi5qc1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuLyBzeW5jIHJlY3Vyc2l2ZSAoPzwhXFxcXGJBcHBfUmVzb3VyY2VzXFxcXGIuKilcXFxcLih4bWx8Y3NzfGpzfCg/PCFcXFxcLmRcXFxcLil0c3woPzwhXFxcXGJfW1xcXFx3LV0qXFxcXC4pc2NzcykkXCI7IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5leHBvcnRzLmkocmVxdWlyZShcIi0hLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS0yIW5hdGl2ZXNjcmlwdC10aGVtZS1jb3JlL2Nzcy9jb3JlLmxpZ2h0LmNzc1wiKSwgXCJcIik7XG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLypcXG5JbiBOYXRpdmVTY3JpcHQsIHRoZSBhcHAuY3NzIGZpbGUgaXMgd2hlcmUgeW91IHBsYWNlIENTUyBydWxlcyB0aGF0XFxueW91IHdvdWxkIGxpa2UgdG8gYXBwbHkgdG8geW91ciBlbnRpcmUgYXBwbGljYXRpb24uIENoZWNrIG91dFxcbmh0dHA6Ly9kb2NzLm5hdGl2ZXNjcmlwdC5vcmcvdWkvc3R5bGluZyBmb3IgYSBmdWxsIGxpc3Qgb2YgdGhlIENTU1xcbnNlbGVjdG9ycyBhbmQgcHJvcGVydGllcyB5b3UgY2FuIHVzZSB0byBzdHlsZSBVSSBjb21wb25lbnRzLlxcblxcbi8qXFxuSW4gbWFueSBjYXNlcyB5b3UgbWF5IHdhbnQgdG8gdXNlIHRoZSBOYXRpdmVTY3JpcHQgY29yZSB0aGVtZSBpbnN0ZWFkXFxub2Ygd3JpdGluZyB5b3VyIG93biBDU1MgcnVsZXMuIEZvciBhIGZ1bGwgbGlzdCBvZiBjbGFzcyBuYW1lcyBpbiB0aGUgdGhlbWVcXG5yZWZlciB0byBodHRwOi8vZG9jcy5uYXRpdmVzY3JpcHQub3JnL3VpL3RoZW1lLlxcblRoZSBpbXBvcnRlZCBDU1MgcnVsZXMgbXVzdCBwcmVjZWRlIGFsbCBvdGhlciB0eXBlcyBvZiBydWxlcy5cXG4qL1xcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbjtcbiAgICBpZiAobW9kdWxlLmhvdCkge1xuICAgICAgICBtb2R1bGUuaG90LmFjY2VwdCgpO1xuICAgICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoKCkgPT4ge1xuICAgICAgICAgICAgZ2xvYmFsLmhtclJlZnJlc2goeyB0eXBlOiAnc3R5bGUnLCBwYXRoOiAnLi9hcHAuY3NzJyB9KTtcbiAgICAgICAgfSlcbiAgICB9XG4iLCJpbXBvcnQgVnVlIGZyb20gJ25hdGl2ZXNjcmlwdC12dWUnO1xuXG5pbXBvcnQgSGVsbG9Xb3JsZCBmcm9tICcuL2NvbXBvbmVudHMvSGVsbG9Xb3JsZCc7XG5cbi8vIFVuY29tbW1lbnQgdGhlIGZvbGxvd2luZyB0byBzZWUgTmF0aXZlU2NyaXB0LVZ1ZSBvdXRwdXQgbG9nc1xuVnVlLmNvbmZpZy5zaWxlbnQgPSBmYWxzZTtcblxubmV3IFZ1ZSh7XG5cbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8RnJhbWU+XG4gICAgICAgICAgICA8SGVsbG9Xb3JsZCAvPlxuICAgICAgICA8L0ZyYW1lPmAsXG5cbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIEhlbGxvV29ybGRcbiAgICB9XG59KS4kc3RhcnQoKTsiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0hlbGxvV29ybGQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTc2M2RiOTdiJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0hlbGxvV29ybGQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9IZWxsb1dvcmxkLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9IZWxsb1dvcmxkLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTc2M2RiOTdiJnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCI3NjNkYjk3YlwiLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy9zYW5ncmFtbW9oaXRlL09uZURyaXZlL0RldmVsb3BtZW50L0FwcCBQcm9qZWN0cy9OYXRpdmVTY3JpcHQvd2VhdGhlci1hcHAvbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaS9kaXN0L2luZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnNzYzZGI5N2InKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnNzYzZGI5N2InLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnNzYzZGI5N2InLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL0hlbGxvV29ybGQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTc2M2RiOTdiJnNjb3BlZD10cnVlJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzc2M2RiOTdiJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJjb21wb25lbnRzL0hlbGxvV29ybGQudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0hlbGxvV29ybGQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vSGVsbG9Xb3JsZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svc3R5bGUtaG90LWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL2FwcGx5LWNzcy1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS0yIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0hlbGxvV29ybGQudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NzYzZGI5N2Imc2NvcGVkPXRydWUmbGFuZz1jc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9zdHlsZS1ob3QtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svYXBwbHktY3NzLWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLTIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vSGVsbG9Xb3JsZC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD03NjNkYjk3YiZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9IZWxsb1dvcmxkLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03NjNkYjk3YiZzY29wZWQ9dHJ1ZSZcIiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIExvY2F0aW9uQmFzZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTG9jYXRpb25CYXNlKCkge1xuICAgIH1cbiAgICByZXR1cm4gTG9jYXRpb25CYXNlO1xufSgpKTtcbmV4cG9ydHMuTG9jYXRpb25CYXNlID0gTG9jYXRpb25CYXNlO1xuZXhwb3J0cy5kZWZhdWx0R2V0TG9jYXRpb25UaW1lb3V0ID0gNSAqIDYwICogMTAwMDtcbmV4cG9ydHMubWluUmFuZ2VVcGRhdGUgPSAwLjE7XG5leHBvcnRzLm1pblRpbWVVcGRhdGUgPSAxICogNjAgKiAxMDAwO1xuZXhwb3J0cy5mYXN0ZXN0VGltZVVwZGF0ZSA9IDUgKiAxMDAwO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYXBwbGljYXRpb25fMSA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKTtcbnZhciBlbnVtc18xID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvZW51bXNcIik7XG52YXIgdGltZXJfMSA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3RpbWVyXCIpO1xudmFyIGdlb2xvY2F0aW9uX2NvbW1vbl8xID0gcmVxdWlyZShcIi4vZ2VvbG9jYXRpb24uY29tbW9uXCIpO1xudmFyIHBlcm1pc3Npb25zID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wZXJtaXNzaW9uc1wiKTtcbnZhciBSRVFVRVNUX0VOQUJMRV9MT0NBVElPTiA9IDQyNjk7XG52YXIgX29uRW5hYmxlTG9jYXRpb25TdWNjZXNzID0gbnVsbDtcbnZhciBfb25FbmFibGVMb2NhdGlvbkZhaWwgPSBudWxsO1xudmFyIGxvY2F0aW9uTGlzdGVuZXJzID0ge307XG52YXIgd2F0Y2hJZENvdW50ZXIgPSAwO1xudmFyIGZ1c2VkTG9jYXRpb25DbGllbnQ7XG52YXIgYXR0YWNoZWRGb3JFcnJvckhhbmRsaW5nID0gZmFsc2U7XG5mdW5jdGlvbiBfZW5zdXJlTG9jYXRpb25DbGllbnQoKSB7XG4gICAgZnVzZWRMb2NhdGlvbkNsaWVudCA9IGZ1c2VkTG9jYXRpb25DbGllbnQgfHxcbiAgICAgICAgY29tLmdvb2dsZS5hbmRyb2lkLmdtcy5sb2NhdGlvbi5Mb2NhdGlvblNlcnZpY2VzLmdldEZ1c2VkTG9jYXRpb25Qcm92aWRlckNsaWVudChhcHBsaWNhdGlvbl8xLmFuZHJvaWQuY29udGV4dCk7XG59XG5hcHBsaWNhdGlvbl8xLmFuZHJvaWQub24oYXBwbGljYXRpb25fMS5BbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlSZXN1bHRFdmVudCwgZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICBpZiAoYXJncy5yZXF1ZXN0Q29kZSA9PT0gUkVRVUVTVF9FTkFCTEVfTE9DQVRJT04pIHtcbiAgICAgICAgaWYgKGFyZ3MucmVzdWx0Q29kZSA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKF9vbkVuYWJsZUxvY2F0aW9uRmFpbCkge1xuICAgICAgICAgICAgICAgIF9vbkVuYWJsZUxvY2F0aW9uRmFpbChcIkxvY2F0aW9uIG5vdCBlbmFibGVkLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChfb25FbmFibGVMb2NhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIF9vbkVuYWJsZUxvY2F0aW9uU3VjY2VzcygpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5mdW5jdGlvbiBpc0FpcnBsYW5lTW9kZU9uKCkge1xuICAgIHJldHVybiBhbmRyb2lkLnByb3ZpZGVyLlNldHRpbmdzLlN5c3RlbS5nZXRJbnQoYXBwbGljYXRpb25fMS5hbmRyb2lkLmNvbnRleHQuZ2V0Q29udGVudFJlc29sdmVyKCksIGFuZHJvaWQucHJvdmlkZXIuU2V0dGluZ3MuU3lzdGVtLkFJUlBMQU5FX01PREVfT04pICE9PSAwO1xufVxuZnVuY3Rpb24gaXNQcm92aWRlckVuYWJsZWQocHJvdmlkZXIpIHtcbiAgICB0cnkge1xuICAgICAgICB2YXIgbG9jYXRpb25NYW5hZ2VyID0gYXBwbGljYXRpb25fMS5hbmRyb2lkLmNvbnRleHRcbiAgICAgICAgICAgIC5nZXRTeXN0ZW1TZXJ2aWNlKGFuZHJvaWQuY29udGVudC5Db250ZXh0LkxPQ0FUSU9OX1NFUlZJQ0UpO1xuICAgICAgICByZXR1cm4gbG9jYXRpb25NYW5hZ2VyLmlzUHJvdmlkZXJFbmFibGVkKHByb3ZpZGVyKTtcbiAgICB9XG4gICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5mdW5jdGlvbiBlcnJvckhhbmRsZXIoZXJyRGF0YSkge1xuICAgIHdoaWxlICh3YXRjaElkQ291bnRlciAhPT0gMCkge1xuICAgICAgICBjbGVhcldhdGNoKHdhdGNoSWRDb3VudGVyKTtcbiAgICAgICAgd2F0Y2hJZENvdW50ZXItLTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRDdXJyZW50TG9jYXRpb24ob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGVuYWJsZUxvY2F0aW9uUmVxdWVzdCgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMudGltZW91dCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIExvY2F0aW9uTWFuYWdlci5nZXRMYXN0TG9jYXRpb24ob3B0aW9ucy5tYXhpbXVtQWdlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGxvY2F0aW9uUmVxdWVzdCA9IF9nZXRMb2NhdGlvblJlcXVlc3Qob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgdmFyIHdhdGNoSWRfMSA9IF9nZXROZXh0V2F0Y2hJZCgpO1xuICAgICAgICAgICAgICAgIHZhciBsb2NhdGlvbkNhbGxiYWNrID0gX2dldExvY2F0aW9uQ2FsbGJhY2sod2F0Y2hJZF8xLCBmdW5jdGlvbiAobmF0aXZlTG9jYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJXYXRjaCh3YXRjaElkXzEpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG5ldyBMb2NhdGlvbihuYXRpdmVMb2NhdGlvbikpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIExvY2F0aW9uTWFuYWdlci5yZXF1ZXN0TG9jYXRpb25VcGRhdGVzKGxvY2F0aW9uUmVxdWVzdCwgbG9jYXRpb25DYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgdmFyIHRpbWVySWRfMSA9IHRpbWVyXzEuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyV2F0Y2god2F0Y2hJZF8xKTtcbiAgICAgICAgICAgICAgICAgICAgdGltZXJfMS5jbGVhclRpbWVvdXQodGltZXJJZF8xKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIlRpbWVvdXQgd2hpbGUgc2VhcmNoaW5nIGZvciBsb2NhdGlvbiFcIikpO1xuICAgICAgICAgICAgICAgIH0sIG9wdGlvbnMudGltZW91dCB8fCBnZW9sb2NhdGlvbl9jb21tb25fMS5kZWZhdWx0R2V0TG9jYXRpb25UaW1lb3V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZ2V0Q3VycmVudExvY2F0aW9uID0gZ2V0Q3VycmVudExvY2F0aW9uO1xuZnVuY3Rpb24gX2dldE5leHRXYXRjaElkKCkge1xuICAgIHZhciB3YXRjaElkID0gKyt3YXRjaElkQ291bnRlcjtcbiAgICByZXR1cm4gd2F0Y2hJZDtcbn1cbmZ1bmN0aW9uIF9nZXRMb2NhdGlvbkNhbGxiYWNrKHdhdGNoSWQsIG9uTG9jYXRpb24pIHtcbiAgICB2YXIgTG9jYXRpb25DYWxsYmFjayA9IGNvbS5nb29nbGUuYW5kcm9pZC5nbXMubG9jYXRpb24uTG9jYXRpb25DYWxsYmFjay5leHRlbmQoe1xuICAgICAgICBvbkxvY2F0aW9uUmVzdWx0OiBmdW5jdGlvbiAobG9jYXRpb25SZXN1bHQpIHtcbiAgICAgICAgICAgIHRoaXMub25Mb2NhdGlvbihsb2NhdGlvblJlc3VsdC5nZXRMYXN0TG9jYXRpb24oKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICB2YXIgbG9jYXRpb25DYWxsYmFjayA9IG5ldyBMb2NhdGlvbkNhbGxiYWNrKCk7XG4gICAgbG9jYXRpb25DYWxsYmFjay5vbkxvY2F0aW9uID0gb25Mb2NhdGlvbjtcbiAgICBsb2NhdGlvbkxpc3RlbmVyc1t3YXRjaElkXSA9IGxvY2F0aW9uQ2FsbGJhY2s7XG4gICAgcmV0dXJuIGxvY2F0aW9uQ2FsbGJhY2s7XG59XG5mdW5jdGlvbiBfZ2V0TG9jYXRpb25SZXF1ZXN0KG9wdGlvbnMpIHtcbiAgICB2YXIgbUxvY2F0aW9uUmVxdWVzdCA9IG5ldyBjb20uZ29vZ2xlLmFuZHJvaWQuZ21zLmxvY2F0aW9uLkxvY2F0aW9uUmVxdWVzdCgpO1xuICAgIHZhciB1cGRhdGVUaW1lID0gb3B0aW9ucy51cGRhdGVUaW1lID09PSAwID8gMCA6IG9wdGlvbnMudXBkYXRlVGltZSB8fCBnZW9sb2NhdGlvbl9jb21tb25fMS5taW5UaW1lVXBkYXRlO1xuICAgIG1Mb2NhdGlvblJlcXVlc3Quc2V0SW50ZXJ2YWwodXBkYXRlVGltZSk7XG4gICAgdmFyIG1pblVwZGF0ZVRpbWUgPSBvcHRpb25zLm1pbmltdW1VcGRhdGVUaW1lID09PSAwID9cbiAgICAgICAgMCA6IG9wdGlvbnMubWluaW11bVVwZGF0ZVRpbWUgfHwgTWF0aC5taW4odXBkYXRlVGltZSwgZ2VvbG9jYXRpb25fY29tbW9uXzEuZmFzdGVzdFRpbWVVcGRhdGUpO1xuICAgIG1Mb2NhdGlvblJlcXVlc3Quc2V0RmFzdGVzdEludGVydmFsKG1pblVwZGF0ZVRpbWUpO1xuICAgIGlmIChvcHRpb25zLnVwZGF0ZURpc3RhbmNlKSB7XG4gICAgICAgIG1Mb2NhdGlvblJlcXVlc3Quc2V0U21hbGxlc3REaXNwbGFjZW1lbnQob3B0aW9ucy51cGRhdGVEaXN0YW5jZSk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmRlc2lyZWRBY2N1cmFjeSA9PT0gZW51bXNfMS5BY2N1cmFjeS5oaWdoKSB7XG4gICAgICAgIG1Mb2NhdGlvblJlcXVlc3Quc2V0UHJpb3JpdHkoY29tLmdvb2dsZS5hbmRyb2lkLmdtcy5sb2NhdGlvbi5Mb2NhdGlvblJlcXVlc3QuUFJJT1JJVFlfSElHSF9BQ0NVUkFDWSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBtTG9jYXRpb25SZXF1ZXN0LnNldFByaW9yaXR5KGNvbS5nb29nbGUuYW5kcm9pZC5nbXMubG9jYXRpb24uTG9jYXRpb25SZXF1ZXN0LlBSSU9SSVRZX0JBTEFOQ0VEX1BPV0VSX0FDQ1VSQUNZKTtcbiAgICB9XG4gICAgcmV0dXJuIG1Mb2NhdGlvblJlcXVlc3Q7XG59XG5mdW5jdGlvbiBfcmVxdWVzdExvY2F0aW9uUGVybWlzc2lvbnMoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgaWYgKExvY2F0aW9uTWFuYWdlci5zaG91bGRTa2lwQ2hlY2tzKCkpIHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBlcm1pc3Npb25zLnJlcXVlc3RQZXJtaXNzaW9uKGFuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5BQ0NFU1NfRklORV9MT0NBVElPTikudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBfZ2V0TG9jYXRpb25MaXN0ZW5lcihtYXhBZ2UsIG9uTG9jYXRpb24sIG9uRXJyb3IpIHtcbiAgICByZXR1cm4gX2dldFRhc2tTdWNjZXNzTGlzdGVuZXIoZnVuY3Rpb24gKG5hdGl2ZUxvY2F0aW9uKSB7XG4gICAgICAgIGlmIChuYXRpdmVMb2NhdGlvbiAhPSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgbG9jYXRpb25fMSA9IG5ldyBMb2NhdGlvbihuYXRpdmVMb2NhdGlvbik7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG1heEFnZSA9PT0gXCJudW1iZXJcIiAmJiBuYXRpdmVMb2NhdGlvbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2F0aW9uXzEudGltZXN0YW1wLnZhbHVlT2YoKSArIG1heEFnZSA+IG5ldyBEYXRlKCkudmFsdWVPZigpKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uTG9jYXRpb24obG9jYXRpb25fMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvbkVycm9yKG5ldyBFcnJvcihcIkxhc3Qga25vd24gbG9jYXRpb24gdG9vIG9sZCFcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9uTG9jYXRpb24obG9jYXRpb25fMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvbkVycm9yKG5ldyBFcnJvcihcIlRoZXJlIGlzIG5vIGxhc3Qga25vd24gbG9jYXRpb24hXCIpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gX2dldFRhc2tTdWNjZXNzTGlzdGVuZXIoZG9uZSkge1xuICAgIHJldHVybiBuZXcgY29tLmdvb2dsZS5hbmRyb2lkLmdtcy50YXNrcy5PblN1Y2Nlc3NMaXN0ZW5lcih7XG4gICAgICAgIG9uU3VjY2VzczogZG9uZVxuICAgIH0pO1xufVxuZnVuY3Rpb24gX2dldFRhc2tGYWlsTGlzdGVuZXIoZG9uZSkge1xuICAgIHJldHVybiBuZXcgY29tLmdvb2dsZS5hbmRyb2lkLmdtcy50YXNrcy5PbkZhaWx1cmVMaXN0ZW5lcih7XG4gICAgICAgIG9uRmFpbHVyZTogZG9uZVxuICAgIH0pO1xufVxuZnVuY3Rpb24gd2F0Y2hMb2NhdGlvbihzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICB2YXIgem9uZWRTdWNjZXNzQ2FsbGJhY2sgPSB6b25lZENhbGxiYWNrKHN1Y2Nlc3NDYWxsYmFjayk7XG4gICAgdmFyIHpvbmVkRXJyb3JDYWxsYmFjayA9IHpvbmVkQ2FsbGJhY2soZXJyb3JDYWxsYmFjayk7XG4gICAgaWYgKCghcGVybWlzc2lvbnMuaGFzUGVybWlzc2lvbihhbmRyb2lkLk1hbmlmZXN0LnBlcm1pc3Npb24uQUNDRVNTX0ZJTkVfTE9DQVRJT04pIHx8XG4gICAgICAgICFfaXNHb29nbGVQbGF5U2VydmljZXNBdmFpbGFibGUoKSkgJiYgIUxvY2F0aW9uTWFuYWdlci5zaG91bGRTa2lwQ2hlY2tzKCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3Qgd2F0Y2ggbG9jYXRpb24uIENhbGwgXCJlbmFibGVMb2NhdGlvblJlcXVlc3RcIiBmaXJzdCcpO1xuICAgIH1cbiAgICBpZiAoIWF0dGFjaGVkRm9yRXJyb3JIYW5kbGluZykge1xuICAgICAgICBhdHRhY2hlZEZvckVycm9ySGFuZGxpbmcgPSB0cnVlO1xuICAgICAgICBhcHBsaWNhdGlvbl8xLm9uKGFwcGxpY2F0aW9uXzEudW5jYXVnaHRFcnJvckV2ZW50LCBlcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgfVxuICAgIHZhciBsb2NhdGlvblJlcXVlc3QgPSBfZ2V0TG9jYXRpb25SZXF1ZXN0KG9wdGlvbnMpO1xuICAgIHZhciB3YXRjaElkID0gX2dldE5leHRXYXRjaElkKCk7XG4gICAgdmFyIGxvY2F0aW9uQ2FsbGJhY2sgPSBfZ2V0TG9jYXRpb25DYWxsYmFjayh3YXRjaElkLCBmdW5jdGlvbiAobmF0aXZlTG9jYXRpb24pIHtcbiAgICAgICAgem9uZWRTdWNjZXNzQ2FsbGJhY2sobmV3IExvY2F0aW9uKG5hdGl2ZUxvY2F0aW9uKSk7XG4gICAgfSk7XG4gICAgTG9jYXRpb25NYW5hZ2VyLnJlcXVlc3RMb2NhdGlvblVwZGF0ZXMobG9jYXRpb25SZXF1ZXN0LCBsb2NhdGlvbkNhbGxiYWNrKTtcbiAgICByZXR1cm4gd2F0Y2hJZDtcbn1cbmV4cG9ydHMud2F0Y2hMb2NhdGlvbiA9IHdhdGNoTG9jYXRpb247XG5mdW5jdGlvbiBjbGVhcldhdGNoKHdhdGNoSWQpIHtcbiAgICB2YXIgbGlzdGVuZXIgPSBsb2NhdGlvbkxpc3RlbmVyc1t3YXRjaElkXTtcbiAgICBpZiAobGlzdGVuZXIpIHtcbiAgICAgICAgTG9jYXRpb25NYW5hZ2VyLnJlbW92ZUxvY2F0aW9uVXBkYXRlcyhsaXN0ZW5lcik7XG4gICAgICAgIGRlbGV0ZSBsb2NhdGlvbkxpc3RlbmVyc1t3YXRjaElkXTtcbiAgICB9XG59XG5leHBvcnRzLmNsZWFyV2F0Y2ggPSBjbGVhcldhdGNoO1xuZnVuY3Rpb24gZW5hYmxlTG9jYXRpb25SZXF1ZXN0KGFsd2F5cykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIF9yZXF1ZXN0TG9jYXRpb25QZXJtaXNzaW9ucygpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX21ha2VHb29nbGVQbGF5U2VydmljZXNBdmFpbGFibGUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfaXNMb2NhdGlvblNlcnZpY2VFbmFibGVkKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBleC5nZXRTdGF0dXNDb2RlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGF0dXNDb2RlID0gZXguZ2V0U3RhdHVzQ29kZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1c0NvZGUgPT09IGNvbS5nb29nbGUuYW5kcm9pZC5nbXMubG9jYXRpb24uTG9jYXRpb25TZXR0aW5nc1N0YXR1c0NvZGVzLlJFU09MVVRJT05fUkVRVUlSRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfb25FbmFibGVMb2NhdGlvblN1Y2Nlc3MgPSByZXNvbHZlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfb25FbmFibGVMb2NhdGlvbkZhaWwgPSByZWplY3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBleC5zdGFydFJlc29sdXRpb25Gb3JSZXN1bHQoYXBwbGljYXRpb25fMS5hbmRyb2lkLmZvcmVncm91bmRBY3Rpdml0eSwgUkVRVUVTVF9FTkFCTEVfTE9DQVRJT04pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoc2VuZEV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoc3RhdHVzQ29kZSA9PT0gY29tLmdvb2dsZS5hbmRyb2lkLmdtcy5sb2NhdGlvbi5Mb2NhdGlvblNldHRpbmdzU3RhdHVzQ29kZXMuU0VUVElOR1NfQ0hBTkdFX1VOQVZBSUxBQkxFXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgaXNBaXJwbGFuZU1vZGVPbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgaXNQcm92aWRlckVuYWJsZWQoYW5kcm9pZC5sb2NhdGlvbi5Mb2NhdGlvbk1hbmFnZXIuR1BTX1BST1ZJREVSKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIkNhbm5vdCBlbmFibGUgdGhlIGxvY2F0aW9uIHNlcnZpY2UuIFwiICsgZXgpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIHJlamVjdCk7XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgfSk7XG59XG5leHBvcnRzLmVuYWJsZUxvY2F0aW9uUmVxdWVzdCA9IGVuYWJsZUxvY2F0aW9uUmVxdWVzdDtcbmZ1bmN0aW9uIF9tYWtlR29vZ2xlUGxheVNlcnZpY2VzQXZhaWxhYmxlKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGlmIChfaXNHb29nbGVQbGF5U2VydmljZXNBdmFpbGFibGUoKSkge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBnb29nbGVBcGlBdmFpbGFiaWxpdHkgPSBjb20uZ29vZ2xlLmFuZHJvaWQuZ21zLmNvbW1vbi5Hb29nbGVBcGlBdmFpbGFiaWxpdHkuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgZ29vZ2xlQXBpQXZhaWxhYmlsaXR5Lm1ha2VHb29nbGVQbGF5U2VydmljZXNBdmFpbGFibGUoYXBwbGljYXRpb25fMS5hbmRyb2lkLmZvcmVncm91bmRBY3Rpdml0eSlcbiAgICAgICAgICAgIC5hZGRPblN1Y2Nlc3NMaXN0ZW5lcihfZ2V0VGFza1N1Y2Nlc3NMaXN0ZW5lcihyZXNvbHZlKSlcbiAgICAgICAgICAgIC5hZGRPbkZhaWx1cmVMaXN0ZW5lcihfZ2V0VGFza0ZhaWxMaXN0ZW5lcihyZWplY3QpKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIF9pc0dvb2dsZVBsYXlTZXJ2aWNlc0F2YWlsYWJsZSgpIHtcbiAgICBpZiAoTG9jYXRpb25NYW5hZ2VyLnNob3VsZFNraXBDaGVja3MoKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgdmFyIGlzTG9jYXRpb25TZXJ2aWNlRW5hYmxlZCA9IHRydWU7XG4gICAgdmFyIGdvb2dsZUFwaUF2YWlsYWJpbGl0eSA9IGNvbS5nb29nbGUuYW5kcm9pZC5nbXMuY29tbW9uLkdvb2dsZUFwaUF2YWlsYWJpbGl0eS5nZXRJbnN0YW5jZSgpO1xuICAgIHZhciByZXN1bHRDb2RlID0gZ29vZ2xlQXBpQXZhaWxhYmlsaXR5LmlzR29vZ2xlUGxheVNlcnZpY2VzQXZhaWxhYmxlKGFwcGxpY2F0aW9uXzEuYW5kcm9pZC5jb250ZXh0KTtcbiAgICBpZiAocmVzdWx0Q29kZSAhPT0gY29tLmdvb2dsZS5hbmRyb2lkLmdtcy5jb21tb24uQ29ubmVjdGlvblJlc3VsdC5TVUNDRVNTKSB7XG4gICAgICAgIGlzTG9jYXRpb25TZXJ2aWNlRW5hYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gaXNMb2NhdGlvblNlcnZpY2VFbmFibGVkO1xufVxuZnVuY3Rpb24gX2lzTG9jYXRpb25TZXJ2aWNlRW5hYmxlZChvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgaWYgKExvY2F0aW9uTWFuYWdlci5zaG91bGRTa2lwQ2hlY2tzKCkpIHtcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwgeyBkZXNpcmVkQWNjdXJhY3k6IGVudW1zXzEuQWNjdXJhY3kuaGlnaCwgdXBkYXRlVGltZTogMCwgdXBkYXRlRGlzdGFuY2U6IDAsIG1heGltdW1BZ2U6IDAsIHRpbWVvdXQ6IDAgfTtcbiAgICAgICAgdmFyIGxvY2F0aW9uUmVxdWVzdCA9IF9nZXRMb2NhdGlvblJlcXVlc3Qob3B0aW9ucyk7XG4gICAgICAgIHZhciBsb2NhdGlvblNldHRpbmdzQnVpbGRlciA9IG5ldyBjb20uZ29vZ2xlLmFuZHJvaWQuZ21zLmxvY2F0aW9uLkxvY2F0aW9uU2V0dGluZ3NSZXF1ZXN0LkJ1aWxkZXIoKTtcbiAgICAgICAgbG9jYXRpb25TZXR0aW5nc0J1aWxkZXIuYWRkTG9jYXRpb25SZXF1ZXN0KGxvY2F0aW9uUmVxdWVzdCk7XG4gICAgICAgIGxvY2F0aW9uU2V0dGluZ3NCdWlsZGVyLnNldEFsd2F5c1Nob3codHJ1ZSk7XG4gICAgICAgIHZhciBsb2NhdGlvblNldHRpbmdzQ2xpZW50ID0gY29tLmdvb2dsZS5hbmRyb2lkLmdtcy5sb2NhdGlvbi5Mb2NhdGlvblNlcnZpY2VzLmdldFNldHRpbmdzQ2xpZW50KGFwcGxpY2F0aW9uXzEuYW5kcm9pZC5jb250ZXh0KTtcbiAgICAgICAgbG9jYXRpb25TZXR0aW5nc0NsaWVudC5jaGVja0xvY2F0aW9uU2V0dGluZ3MobG9jYXRpb25TZXR0aW5nc0J1aWxkZXIuYnVpbGQoKSlcbiAgICAgICAgICAgIC5hZGRPblN1Y2Nlc3NMaXN0ZW5lcihfZ2V0VGFza1N1Y2Nlc3NMaXN0ZW5lcihyZXNvbHZlKSlcbiAgICAgICAgICAgIC5hZGRPbkZhaWx1cmVMaXN0ZW5lcihfZ2V0VGFza0ZhaWxMaXN0ZW5lcihyZWplY3QpKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGlzRW5hYmxlZChvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgaWYgKCFfaXNHb29nbGVQbGF5U2VydmljZXNBdmFpbGFibGUoKSB8fFxuICAgICAgICAgICAgIXBlcm1pc3Npb25zLmhhc1Blcm1pc3Npb24oYW5kcm9pZC5NYW5pZmVzdC5wZXJtaXNzaW9uLkFDQ0VTU19GSU5FX0xPQ0FUSU9OKSkge1xuICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBfaXNMb2NhdGlvblNlcnZpY2VFbmFibGVkKG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXgpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGV4LmdldFN0YXR1c0NvZGUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICAmJiBleC5nZXRTdGF0dXNDb2RlKCkgPT09IGNvbS5nb29nbGUuYW5kcm9pZC5nbXMubG9jYXRpb24uTG9jYXRpb25TZXR0aW5nc1N0YXR1c0NvZGVzLlNFVFRJTkdTX0NIQU5HRV9VTkFWQUlMQUJMRVxuICAgICAgICAgICAgICAgICAgICAmJiBpc0FpcnBsYW5lTW9kZU9uKClcbiAgICAgICAgICAgICAgICAgICAgJiYgaXNQcm92aWRlckVuYWJsZWQoYW5kcm9pZC5sb2NhdGlvbi5Mb2NhdGlvbk1hbmFnZXIuR1BTX1BST1ZJREVSKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0cy5pc0VuYWJsZWQgPSBpc0VuYWJsZWQ7XG5mdW5jdGlvbiBkaXN0YW5jZShsb2MxLCBsb2MyKSB7XG4gICAgaWYgKCFsb2MxLmFuZHJvaWQpIHtcbiAgICAgICAgbG9jMS5hbmRyb2lkID0gYW5kcm9pZExvY2F0aW9uRnJvbUxvY2F0aW9uKGxvYzEpO1xuICAgIH1cbiAgICBpZiAoIWxvYzIuYW5kcm9pZCkge1xuICAgICAgICBsb2MyLmFuZHJvaWQgPSBhbmRyb2lkTG9jYXRpb25Gcm9tTG9jYXRpb24obG9jMik7XG4gICAgfVxuICAgIHJldHVybiBsb2MxLmFuZHJvaWQuZGlzdGFuY2VUbyhsb2MyLmFuZHJvaWQpO1xufVxuZXhwb3J0cy5kaXN0YW5jZSA9IGRpc3RhbmNlO1xuZnVuY3Rpb24gYW5kcm9pZExvY2F0aW9uRnJvbUxvY2F0aW9uKGxvY2F0aW9uKSB7XG4gICAgdmFyIGFuZHJvaWRMb2NhdGlvbiA9IG5ldyBhbmRyb2lkLmxvY2F0aW9uLkxvY2F0aW9uKFwiY3VzdG9tXCIpO1xuICAgIGFuZHJvaWRMb2NhdGlvbi5zZXRMYXRpdHVkZShsb2NhdGlvbi5sYXRpdHVkZSk7XG4gICAgYW5kcm9pZExvY2F0aW9uLnNldExvbmdpdHVkZShsb2NhdGlvbi5sb25naXR1ZGUpO1xuICAgIGlmIChsb2NhdGlvbi5hbHRpdHVkZSkge1xuICAgICAgICBhbmRyb2lkTG9jYXRpb24uc2V0QWx0aXR1ZGUobG9jYXRpb24uYWx0aXR1ZGUpO1xuICAgIH1cbiAgICBpZiAobG9jYXRpb24uc3BlZWQpIHtcbiAgICAgICAgYW5kcm9pZExvY2F0aW9uLnNldFNwZWVkKGZsb2F0KGxvY2F0aW9uLnNwZWVkKSk7XG4gICAgfVxuICAgIGlmIChsb2NhdGlvbi5kaXJlY3Rpb24pIHtcbiAgICAgICAgYW5kcm9pZExvY2F0aW9uLnNldEJlYXJpbmcoZmxvYXQobG9jYXRpb24uZGlyZWN0aW9uKSk7XG4gICAgfVxuICAgIGlmIChsb2NhdGlvbi50aW1lc3RhbXApIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGFuZHJvaWRMb2NhdGlvbi5zZXRUaW1lKGxvbmcobG9jYXRpb24udGltZXN0YW1wLmdldFRpbWUoKSkpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiaW52YWxpZCBsb2NhdGlvbiB0aW1lc3RhbXBcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFuZHJvaWRMb2NhdGlvbjtcbn1cbnZhciBMb2NhdGlvbk1hbmFnZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExvY2F0aW9uTWFuYWdlcigpIHtcbiAgICB9XG4gICAgTG9jYXRpb25NYW5hZ2VyLmdldExhc3RMb2NhdGlvbiA9IGZ1bmN0aW9uIChtYXhpbXVtQWdlLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgX2Vuc3VyZUxvY2F0aW9uQ2xpZW50KCk7XG4gICAgICAgIHJldHVybiBmdXNlZExvY2F0aW9uQ2xpZW50LmdldExhc3RMb2NhdGlvbigpXG4gICAgICAgICAgICAuYWRkT25TdWNjZXNzTGlzdGVuZXIoX2dldExvY2F0aW9uTGlzdGVuZXIobWF4aW11bUFnZSwgcmVzb2x2ZSwgcmVqZWN0KSlcbiAgICAgICAgICAgIC5hZGRPbkZhaWx1cmVMaXN0ZW5lcihfZ2V0VGFza0ZhaWxMaXN0ZW5lcihmdW5jdGlvbiAoZSkgeyByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihlLmdldE1lc3NhZ2UoKSkpOyB9KSk7XG4gICAgfTtcbiAgICBMb2NhdGlvbk1hbmFnZXIucmVxdWVzdExvY2F0aW9uVXBkYXRlcyA9IGZ1bmN0aW9uIChsb2NhdGlvblJlcXVlc3QsIGxvY2F0aW9uQ2FsbGJhY2spIHtcbiAgICAgICAgX2Vuc3VyZUxvY2F0aW9uQ2xpZW50KCk7XG4gICAgICAgIGZ1c2VkTG9jYXRpb25DbGllbnQucmVxdWVzdExvY2F0aW9uVXBkYXRlcyhsb2NhdGlvblJlcXVlc3QsIGxvY2F0aW9uQ2FsbGJhY2ssIG51bGwpO1xuICAgIH07XG4gICAgTG9jYXRpb25NYW5hZ2VyLnJlbW92ZUxvY2F0aW9uVXBkYXRlcyA9IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICBfZW5zdXJlTG9jYXRpb25DbGllbnQoKTtcbiAgICAgICAgZnVzZWRMb2NhdGlvbkNsaWVudC5yZW1vdmVMb2NhdGlvblVwZGF0ZXMobGlzdGVuZXIpO1xuICAgIH07XG4gICAgTG9jYXRpb25NYW5hZ2VyLnNob3VsZFNraXBDaGVja3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIExvY2F0aW9uTWFuYWdlci5zZXRNb2NrTG9jYXRpb25NYW5hZ2VyID0gZnVuY3Rpb24gKE1vY2tMb2NhdGlvbk1hbmFnZXIpIHtcbiAgICAgICAgTG9jYXRpb25NYW5hZ2VyLmdldExhc3RMb2NhdGlvbiA9IE1vY2tMb2NhdGlvbk1hbmFnZXIuZ2V0TGFzdExvY2F0aW9uO1xuICAgICAgICBMb2NhdGlvbk1hbmFnZXIucmVxdWVzdExvY2F0aW9uVXBkYXRlcyA9IE1vY2tMb2NhdGlvbk1hbmFnZXIucmVxdWVzdExvY2F0aW9uVXBkYXRlcztcbiAgICAgICAgTG9jYXRpb25NYW5hZ2VyLnJlbW92ZUxvY2F0aW9uVXBkYXRlcyA9IE1vY2tMb2NhdGlvbk1hbmFnZXIucmVtb3ZlTG9jYXRpb25VcGRhdGVzO1xuICAgICAgICBMb2NhdGlvbk1hbmFnZXIuc2hvdWxkU2tpcENoZWNrcyA9IE1vY2tMb2NhdGlvbk1hbmFnZXIuc2hvdWxkU2tpcENoZWNrcztcbiAgICB9O1xuICAgIHJldHVybiBMb2NhdGlvbk1hbmFnZXI7XG59KCkpO1xuZXhwb3J0cy5Mb2NhdGlvbk1hbmFnZXIgPSBMb2NhdGlvbk1hbmFnZXI7XG52YXIgTG9jYXRpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhMb2NhdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBMb2NhdGlvbihhbmRyb2lkTG9jYXRpb24pIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgaWYgKGFuZHJvaWRMb2NhdGlvbikge1xuICAgICAgICAgICAgX3RoaXMuYW5kcm9pZCA9IGFuZHJvaWRMb2NhdGlvbjtcbiAgICAgICAgICAgIF90aGlzLmxhdGl0dWRlID0gYW5kcm9pZExvY2F0aW9uLmdldExhdGl0dWRlKCk7XG4gICAgICAgICAgICBfdGhpcy5sb25naXR1ZGUgPSBhbmRyb2lkTG9jYXRpb24uZ2V0TG9uZ2l0dWRlKCk7XG4gICAgICAgICAgICBfdGhpcy5hbHRpdHVkZSA9IGFuZHJvaWRMb2NhdGlvbi5nZXRBbHRpdHVkZSgpO1xuICAgICAgICAgICAgX3RoaXMuaG9yaXpvbnRhbEFjY3VyYWN5ID0gYW5kcm9pZExvY2F0aW9uLmdldEFjY3VyYWN5KCk7XG4gICAgICAgICAgICBfdGhpcy52ZXJ0aWNhbEFjY3VyYWN5ID0gYW5kcm9pZExvY2F0aW9uLmdldEFjY3VyYWN5KCk7XG4gICAgICAgICAgICBfdGhpcy5zcGVlZCA9IGFuZHJvaWRMb2NhdGlvbi5nZXRTcGVlZCgpO1xuICAgICAgICAgICAgX3RoaXMuZGlyZWN0aW9uID0gYW5kcm9pZExvY2F0aW9uLmdldEJlYXJpbmcoKTtcbiAgICAgICAgICAgIF90aGlzLnRpbWVzdGFtcCA9IG5ldyBEYXRlKGFuZHJvaWRMb2NhdGlvbi5nZXRUaW1lKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIExvY2F0aW9uO1xufShnZW9sb2NhdGlvbl9jb21tb25fMS5Mb2NhdGlvbkJhc2UpKTtcbmV4cG9ydHMuTG9jYXRpb24gPSBMb2NhdGlvbjtcbmZ1bmN0aW9uIHNldEN1c3RvbUxvY2F0aW9uTWFuYWdlcihNb2NrTG9jYXRpb25NYW5hZ2VyKSB7XG4gICAgTG9jYXRpb25NYW5hZ2VyLnNldE1vY2tMb2NhdGlvbk1hbmFnZXIoTW9ja0xvY2F0aW9uTWFuYWdlcik7XG59XG5leHBvcnRzLnNldEN1c3RvbUxvY2F0aW9uTWFuYWdlciA9IHNldEN1c3RvbUxvY2F0aW9uTWFuYWdlcjtcbiJdLCJzb3VyY2VSb290IjoiIn0=