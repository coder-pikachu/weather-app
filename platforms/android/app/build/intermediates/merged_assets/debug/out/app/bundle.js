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
          /* var url =
               "https://api.openweathermap.org/data/2.5/weather?APPID=" +
               appId +
               "&units=metric&lat=" +
               loc.latitude +
               "&lon=" +
               loc.longitude; */

          var url = "https://api.openweathermap.org/data/2.5/weather?APPID=" + appId + "&units=metric&q=Mumbai";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vY29tcG9uZW50cy9IZWxsb1dvcmxkLnZ1ZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0hlbGxvV29ybGQudnVlPzE5Y2IiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9IZWxsb1dvcmxkLnZ1ZT8wMGI1Iiwid2VicGFjazovLy8uIHN5bmMgbm9ucmVjdXJzaXZlIF5cXC5cXC9hcHBcXC4oY3NzfHNjc3N8bGVzc3xzYXNzKSQiLCJ3ZWJwYWNrOi8vL1xcYl9bXFx3LV0qXFwuKXNjc3MpJCIsIndlYnBhY2s6Ly8vLi9hcHAuY3NzIiwid2VicGFjazovLy8uL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0hlbGxvV29ybGQudnVlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWU/MjhkYSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0hlbGxvV29ybGQudnVlPzVlYWMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9IZWxsb1dvcmxkLnZ1ZT83ODMyIiwid2VicGFjazovLy8uL25hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvbi9nZW9sb2NhdGlvbi5jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vbmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uL2dlb2xvY2F0aW9uLmpzIl0sIm5hbWVzIjpbIkhlbGxvV29ybGQiLCJWdWUiLCJjb25maWciLCJzaWxlbnQiLCJ0ZW1wbGF0ZSIsIiRzdGFydCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiTG9jYXRpb25CYXNlIiwiZGVmYXVsdEdldExvY2F0aW9uVGltZW91dCIsIm1pblJhbmdlVXBkYXRlIiwibWluVGltZVVwZGF0ZSIsImZhc3Rlc3RUaW1lVXBkYXRlIiwiYXBwbGljYXRpb25fMSIsInJlcXVpcmUiLCJlbnVtc18xIiwidGltZXJfMSIsImdlb2xvY2F0aW9uX2NvbW1vbl8xIiwicGVybWlzc2lvbnMiLCJSRVFVRVNUX0VOQUJMRV9MT0NBVElPTiIsIl9vbkVuYWJsZUxvY2F0aW9uU3VjY2VzcyIsIl9vbkVuYWJsZUxvY2F0aW9uRmFpbCIsImxvY2F0aW9uTGlzdGVuZXJzIiwid2F0Y2hJZENvdW50ZXIiLCJmdXNlZExvY2F0aW9uQ2xpZW50IiwiYXR0YWNoZWRGb3JFcnJvckhhbmRsaW5nIiwiX2Vuc3VyZUxvY2F0aW9uQ2xpZW50IiwiY29tIiwiZ29vZ2xlIiwiYW5kcm9pZCIsImdtcyIsImxvY2F0aW9uIiwiTG9jYXRpb25TZXJ2aWNlcyIsImdldEZ1c2VkTG9jYXRpb25Qcm92aWRlckNsaWVudCIsImNvbnRleHQiLCJvbiIsIkFuZHJvaWRBcHBsaWNhdGlvbiIsImFjdGl2aXR5UmVzdWx0RXZlbnQiLCJhcmdzIiwicmVxdWVzdENvZGUiLCJyZXN1bHRDb2RlIiwiaXNBaXJwbGFuZU1vZGVPbiIsInByb3ZpZGVyIiwiU2V0dGluZ3MiLCJTeXN0ZW0iLCJnZXRJbnQiLCJnZXRDb250ZW50UmVzb2x2ZXIiLCJBSVJQTEFORV9NT0RFX09OIiwiaXNQcm92aWRlckVuYWJsZWQiLCJsb2NhdGlvbk1hbmFnZXIiLCJnZXRTeXN0ZW1TZXJ2aWNlIiwiY29udGVudCIsIkNvbnRleHQiLCJMT0NBVElPTl9TRVJWSUNFIiwiZXgiLCJlcnJvckhhbmRsZXIiLCJlcnJEYXRhIiwiY2xlYXJXYXRjaCIsImdldEN1cnJlbnRMb2NhdGlvbiIsIm9wdGlvbnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImVuYWJsZUxvY2F0aW9uUmVxdWVzdCIsInRoZW4iLCJ0aW1lb3V0IiwiTG9jYXRpb25NYW5hZ2VyIiwiZ2V0TGFzdExvY2F0aW9uIiwibWF4aW11bUFnZSIsImxvY2F0aW9uUmVxdWVzdCIsIl9nZXRMb2NhdGlvblJlcXVlc3QiLCJ3YXRjaElkXzEiLCJfZ2V0TmV4dFdhdGNoSWQiLCJsb2NhdGlvbkNhbGxiYWNrIiwiX2dldExvY2F0aW9uQ2FsbGJhY2siLCJuYXRpdmVMb2NhdGlvbiIsIkxvY2F0aW9uIiwicmVxdWVzdExvY2F0aW9uVXBkYXRlcyIsInRpbWVySWRfMSIsInNldFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJFcnJvciIsIndhdGNoSWQiLCJvbkxvY2F0aW9uIiwiTG9jYXRpb25DYWxsYmFjayIsImV4dGVuZCIsIm9uTG9jYXRpb25SZXN1bHQiLCJsb2NhdGlvblJlc3VsdCIsIm1Mb2NhdGlvblJlcXVlc3QiLCJMb2NhdGlvblJlcXVlc3QiLCJ1cGRhdGVUaW1lIiwic2V0SW50ZXJ2YWwiLCJtaW5VcGRhdGVUaW1lIiwibWluaW11bVVwZGF0ZVRpbWUiLCJNYXRoIiwibWluIiwic2V0RmFzdGVzdEludGVydmFsIiwidXBkYXRlRGlzdGFuY2UiLCJzZXRTbWFsbGVzdERpc3BsYWNlbWVudCIsImRlc2lyZWRBY2N1cmFjeSIsIkFjY3VyYWN5IiwiaGlnaCIsInNldFByaW9yaXR5IiwiUFJJT1JJVFlfSElHSF9BQ0NVUkFDWSIsIlBSSU9SSVRZX0JBTEFOQ0VEX1BPV0VSX0FDQ1VSQUNZIiwiX3JlcXVlc3RMb2NhdGlvblBlcm1pc3Npb25zIiwic2hvdWxkU2tpcENoZWNrcyIsInJlcXVlc3RQZXJtaXNzaW9uIiwiTWFuaWZlc3QiLCJwZXJtaXNzaW9uIiwiQUNDRVNTX0ZJTkVfTE9DQVRJT04iLCJfZ2V0TG9jYXRpb25MaXN0ZW5lciIsIm1heEFnZSIsIm9uRXJyb3IiLCJfZ2V0VGFza1N1Y2Nlc3NMaXN0ZW5lciIsImxvY2F0aW9uXzEiLCJ0aW1lc3RhbXAiLCJ2YWx1ZU9mIiwiRGF0ZSIsImRvbmUiLCJ0YXNrcyIsIk9uU3VjY2Vzc0xpc3RlbmVyIiwib25TdWNjZXNzIiwiX2dldFRhc2tGYWlsTGlzdGVuZXIiLCJPbkZhaWx1cmVMaXN0ZW5lciIsIm9uRmFpbHVyZSIsIndhdGNoTG9jYXRpb24iLCJzdWNjZXNzQ2FsbGJhY2siLCJlcnJvckNhbGxiYWNrIiwiem9uZWRTdWNjZXNzQ2FsbGJhY2siLCJ6b25lZENhbGxiYWNrIiwiem9uZWRFcnJvckNhbGxiYWNrIiwiaGFzUGVybWlzc2lvbiIsIl9pc0dvb2dsZVBsYXlTZXJ2aWNlc0F2YWlsYWJsZSIsInVuY2F1Z2h0RXJyb3JFdmVudCIsImJpbmQiLCJsaXN0ZW5lciIsInJlbW92ZUxvY2F0aW9uVXBkYXRlcyIsImFsd2F5cyIsIl9tYWtlR29vZ2xlUGxheVNlcnZpY2VzQXZhaWxhYmxlIiwiX2lzTG9jYXRpb25TZXJ2aWNlRW5hYmxlZCIsImdldFN0YXR1c0NvZGUiLCJzdGF0dXNDb2RlIiwiTG9jYXRpb25TZXR0aW5nc1N0YXR1c0NvZGVzIiwiUkVTT0xVVElPTl9SRVFVSVJFRCIsInN0YXJ0UmVzb2x1dGlvbkZvclJlc3VsdCIsImZvcmVncm91bmRBY3Rpdml0eSIsInNlbmRFeCIsIlNFVFRJTkdTX0NIQU5HRV9VTkFWQUlMQUJMRSIsIkdQU19QUk9WSURFUiIsImdvb2dsZUFwaUF2YWlsYWJpbGl0eSIsImNvbW1vbiIsIkdvb2dsZUFwaUF2YWlsYWJpbGl0eSIsImdldEluc3RhbmNlIiwibWFrZUdvb2dsZVBsYXlTZXJ2aWNlc0F2YWlsYWJsZSIsImFkZE9uU3VjY2Vzc0xpc3RlbmVyIiwiYWRkT25GYWlsdXJlTGlzdGVuZXIiLCJpc0xvY2F0aW9uU2VydmljZUVuYWJsZWQiLCJpc0dvb2dsZVBsYXlTZXJ2aWNlc0F2YWlsYWJsZSIsIkNvbm5lY3Rpb25SZXN1bHQiLCJTVUNDRVNTIiwibG9jYXRpb25TZXR0aW5nc0J1aWxkZXIiLCJMb2NhdGlvblNldHRpbmdzUmVxdWVzdCIsIkJ1aWxkZXIiLCJhZGRMb2NhdGlvblJlcXVlc3QiLCJzZXRBbHdheXNTaG93IiwibG9jYXRpb25TZXR0aW5nc0NsaWVudCIsImdldFNldHRpbmdzQ2xpZW50IiwiY2hlY2tMb2NhdGlvblNldHRpbmdzIiwiYnVpbGQiLCJpc0VuYWJsZWQiLCJkaXN0YW5jZSIsImxvYzEiLCJsb2MyIiwiYW5kcm9pZExvY2F0aW9uRnJvbUxvY2F0aW9uIiwiZGlzdGFuY2VUbyIsImFuZHJvaWRMb2NhdGlvbiIsInNldExhdGl0dWRlIiwibGF0aXR1ZGUiLCJzZXRMb25naXR1ZGUiLCJsb25naXR1ZGUiLCJhbHRpdHVkZSIsInNldEFsdGl0dWRlIiwic3BlZWQiLCJzZXRTcGVlZCIsImZsb2F0IiwiZGlyZWN0aW9uIiwic2V0QmVhcmluZyIsInNldFRpbWUiLCJsb25nIiwiZ2V0VGltZSIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJnZXRNZXNzYWdlIiwic2V0TW9ja0xvY2F0aW9uTWFuYWdlciIsIk1vY2tMb2NhdGlvbk1hbmFnZXIiLCJfc3VwZXIiLCJfX2V4dGVuZHMiLCJfdGhpcyIsImNhbGwiLCJnZXRMYXRpdHVkZSIsImdldExvbmdpdHVkZSIsImdldEFsdGl0dWRlIiwiaG9yaXpvbnRhbEFjY3VyYWN5IiwiZ2V0QWNjdXJhY3kiLCJ2ZXJ0aWNhbEFjY3VyYWN5IiwiZ2V0U3BlZWQiLCJnZXRCZWFyaW5nIiwic2V0Q3VzdG9tTG9jYXRpb25NYW5hZ2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMENBOztBQUNBOztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUZBLE1BRUE7QUFDQTtBQUxBLEdBREE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FMQTs7QUFNQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esa0RBQ0EsT0FEQTtBQUVBOztBQUNBO0FBQ0EsMEJBQ0EseUJBREE7QUFFQSxrREFDQSx1QkFEQSxFQUhBLENBTUE7O0FBQ0E7QUFaQTs7QUFjQTtBQUNBLFNBcEJBLEVBTkEsQ0EyQkE7O0FBQ0E7QUFDQSxPQTdCQSxNQTZCQTtBQUNBO0FBQ0E7QUFDQSxLQXhDQTs7QUF5Q0EsZ0JBQ0EsQ0ExQ0E7O0FBMkNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsT0FKQSxNQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FwREE7O0FBcURBO0FBQ0E7QUFDQTtBQUNBLHNDQURBO0FBRUEsMkJBRkE7QUFHQTtBQUhBLFNB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SixlQUFoQjtBQUNBdUIsV0FBSyxDQUFDckIsUUFBTixHQUFpQkYsZUFBZSxDQUFDeUIsV0FBaEIsRUFBakI7QUFDQUYsV0FBSyxDQUFDbkIsU0FBTixHQUFrQkosZUFBZSxDQUFDMEIsWUFBaEIsRUFBbEI7QUFDQUgsV0FBSyxDQUFDbEIsUUFBTixHQUFpQkwsZUFBZSxDQUFDMkIsV0FBaEIsRUFBakI7QUFDQUosV0FBSyxDQUFDSyxrQkFBTixHQUEyQjVCLGVBQWUsQ0FBQzZCLFdBQWhCLEVBQTNCO0FBQ0FOLFdBQUssQ0FBQ08sZ0JBQU4sR0FBeUI5QixlQUFlLENBQUM2QixXQUFoQixFQUF6QjtBQUNBTixXQUFLLENBQUNoQixLQUFOLEdBQWNQLGVBQWUsQ0FBQytCLFFBQWhCLEVBQWQ7QUFDQVIsV0FBSyxDQUFDYixTQUFOLEdBQWtCVixlQUFlLENBQUNnQyxVQUFoQixFQUFsQjtBQUNBVCxXQUFLLENBQUNuRixTQUFOLEdBQWtCLElBQUlFLElBQUosQ0FBUzBELGVBQWUsQ0FBQ2MsT0FBaEIsRUFBVCxDQUFsQjtBQUNIOztBQUNELFdBQU9TLEtBQVA7QUFDSDs7QUFDRCxTQUFPM0gsUUFBUDtBQUNILENBbEJlLENBa0JkM0Qsb0JBQW9CLENBQUNULFlBbEJQLENBQWhCOztBQW1CQUYsT0FBTyxDQUFDc0UsUUFBUixHQUFtQkEsUUFBbkI7O0FBQ0EsU0FBU3FJLHdCQUFULENBQWtDYixtQkFBbEMsRUFBdUQ7QUFDbkRsSSxpQkFBZSxDQUFDaUksc0JBQWhCLENBQXVDQyxtQkFBdkM7QUFDSDs7QUFDRDlMLE9BQU8sQ0FBQzJNLHdCQUFSLEdBQW1DQSx3QkFBbkMsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPFBhZ2UgQGxvYWRlZD1cIm9uTG9hZGVkXCI+XG4gICAgICAgIDxHcmlkTGF5b3V0IGNvbHVtbnM9XCIqXCIgcm93cz1cImF1dG8sKixhdXRvXCI+XG4gICAgICAgICAgICA8R3JpZExheW91dCBjb2x1bW5zPVwiYXV0bywgKlwiIHJvdz1cIjBcIiByb3dzPVwiKlwiPlxuICAgICAgICAgICAgICAgIDxJbWFnZSA6c3JjPVwiYGh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke2N1cnJlbnRXZWF0aGVyRGF0YS5jb25kaXRpb25JY29ufUAyeC5wbmdgXCIgY29sdW1uPVwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgIGhlaWdodD1cIjEwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgIGhvcml6b250YWxBbGlnbm1lbnQ9XCJsZWZ0XCIgaW9zT3ZlcmZsb3dTYWZlQXJlYT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW49XCIyMFwiIHZlcnRpY2FsQWxpZ25tZW50PVwibWlkZGxlXCJcblxuICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD1cIjEwMFwiPjwvSW1hZ2U+XG4gICAgICAgICAgICAgICAgPExhYmVsIDp0ZXh0PVwiY3VycmVudFdlYXRoZXJEYXRhLmNpdHlcIiBjbGFzcz1cImRheS10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uPVwiMVwiIHRleHRBbGlnbm1lbnQ9XCJsZWZ0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgdmVydGljYWxBbGlnbm1lbnQ9XCJtaWRkbGVcIj48L0xhYmVsPlxuICAgICAgICAgICAgPC9HcmlkTGF5b3V0PlxuXG4gICAgICAgICAgICA8R3JpZExheW91dCBjb2x1bW5zPVwiYXV0b1wiIGhvcml6b250YWxBbGlnbm1lbnQ9XCJjZW50ZXJcIiByb3c9XCIxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M9XCIqXCI+XG4gICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0IHZlcnRpY2FsQWxpZ25tZW50PVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxMYWJlbCA6Y29sb3I9XCJjdXJyZW50V2VhdGhlckRhdGEudGVtcGVyYXR1cmVDb2xvclwiIDpmb250U2l6ZT1cInRlbXBlcmF0dXJlRm9udFNpemVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgOnRleHQ9XCJnZXRUZW1wZXJhdHVyZVRleHQoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInRlbXAtc3R5bGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93PVwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ25tZW50PVwicmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9MYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPExhYmVsIDp0ZXh0PVwiYCR7Y3VycmVudFdlYXRoZXJEYXRhLmN1cnJlbnREYXl9LCAke2N1cnJlbnRXZWF0aGVyRGF0YS5jdXJyZW50RGF0ZX1gXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZGF5LXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93PVwiMVwiIHRleHRBbGlnbm1lbnQ9XCJjZW50ZXJcIj48L0xhYmVsPlxuICAgICAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XG4gICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgICAgICA8R3JpZExheW91dCBjb2x1bW5zPVwiKlwiIG1hcmdpbkJvdHRvbT1cIjIwXCIgcGFkZGluZz1cIjIwXCIgcm93PVwiMlwiXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dzPVwiKlwiPlxuICAgICAgICAgICAgICAgIDxMYWJlbCBAbG9hZGVkPVwib25Ub2RheUxhYmVsTG9hZGVkXCIgY2xhc3M9XCJ0ZXh0LWRpc3BsYXktc3R5bGVcIlxuICAgICAgICAgICAgICAgICAgICAgICBpb3NPdmVyZmxvd1NhZmVBcmVhPVwidHJ1ZVwiIHRleHRXcmFwPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgIDwvTGFiZWw+XG4gICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgIDwvR3JpZExheW91dD5cblxuXG4gICAgPC9QYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBjb25zdCBHZW9sb2NhdGlvbiA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb25cIik7XG4gICAgY29uc3QgQWNjdXJhY3kgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9lbnVtc1wiKTtcbiAgICBjb25zdCBodHRwID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvaHR0cFwiKTtcblxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgZmlsdGVyczoge1xuICAgICAgICAgICAgbG93ZXJjYXNlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBvblRvZGF5TGFiZWxMb2FkZWQoYXJncykge1xuICAgICAgICAgICAgICAgIC8vOnRleHQ9XCJjdXJyZW50V2VhdGhlckRhdGEudG9kYXlzVGV4dFwiXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZXR0aW5nIGxhYmVsIDogXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMubGFiZWxPYmplY3QgPSBhcmdzLm9iamVjdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjcmVhdGVGb3JtYXR0ZWRTdHJpbmcoc3RyaW5nc1RvRm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhzdHJpbmdzVG9Gb3JtYXQpO1xuICAgICAgICAgICAgICAgIGlmIChzdHJpbmdzVG9Gb3JtYXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkU3RyaW5nID0gcmVxdWlyZShcInRleHQvZm9ybWF0dGVkLXN0cmluZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkU3BhbiA9IHJlcXVpcmUoXCJ0ZXh0L3NwYW5cIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IENvbG9yTW9kdWxlID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvY29sb3JcIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmc3RyaW5nVG9TZW5kID0gbmV3IGZvcm1hdHRlZFN0cmluZy5Gb3JtYXR0ZWRTdHJpbmcoKTtcblxuICAgICAgICAgICAgICAgICAgICBzdHJpbmdzVG9Gb3JtYXQuZm9yRWFjaCgoY3VycmVudFN0ckZyYWdtZW50LCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmc3BhbiA9IG5ldyBmb3JtYXR0ZWRTcGFuLlNwYW4oKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZnNwYW4udGV4dCA9IGN1cnJlbnRTdHJGcmFnbWVudC50ZXh0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGN1cnJlbnRTdHJGcmFnbWVudC50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm5vcm1hbFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmc3Bhbi5jb2xvciA9IG5ldyBDb2xvck1vZHVsZS5Db2xvcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYmxhY2tcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDVVNUT00gc2V0dGluZyBhbnl0aGluZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnNwYW4uY29sb3IgPSBuZXcgQ29sb3JNb2R1bGUuQ29sb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3RyRnJhZ21lbnQudHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmc3Bhbi5jbGFzcyA9IFwib3JhbmdlLXRleHRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmc3RyaW5nVG9TZW5kLnNwYW5zLnB1c2goZnNwYW4pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhmc3RyaW5nVG9TZW5kKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZzdHJpbmdUb1NlbmQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkxvYWRlZCgpIHtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRUZW1wZXJhdHVyZVRleHQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFdlYXRoZXJEYXRhLnRlbXBlcmF0dXJlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wZXJhdHVyZUZvbnRTaXplID0gNTA7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIkxvYWRpbmcgLi4uXCI7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBlcmF0dXJlRm9udFNpemUgPSA5MDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMuY3VycmVudFdlYXRoZXJEYXRhLnRlbXBlcmF0dXJlfcKwQ2A7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldE15V2VhdGhlcigpIHtcbiAgICAgICAgICAgICAgICBHZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICBHZW9sb2NhdGlvbi5nZXRDdXJyZW50TG9jYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICBkZXNpcmVkQWNjdXJhY3k6IEFjY3VyYWN5LmhpZ2gsXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZURpc3RhbmNlOiAwLjEsXG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXQ6IDIwMDAwXG4gICAgICAgICAgICAgICAgfSkudGhlbihcbiAgICAgICAgICAgICAgICAgICAgbG9jID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXBwSWQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVkODIyNmJhM2EzYzhjN2NlNTQwNWFmMzU2Yjg5MDZlXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogdmFyIHVybCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP0FQUElEPVwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcElkICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiJnVuaXRzPW1ldHJpYyZsYXQ9XCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jLmxhdGl0dWRlICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiJmxvbj1cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2MubG9uZ2l0dWRlOyAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1cmwgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP0FQUElEPVwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwSWQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiZ1bml0cz1tZXRyaWMmcT1NdW1iYWlcIjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0dHAucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKHRoaXMucGFyc2VSZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGUubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFRlbXBlcmF0dXJlQ29sb3IodGVtcCkge1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wIDwgMTUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiIzg1QzFFOVwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGVtcCA8IDI1ICYmIHRlbXAgPj0gMTUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiI0Y0RDAzRlwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGVtcCA8IDM1ICYmIHRlbXAgPj0gMjUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiI0YzOUMxMlwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIiNFNzRDM0NcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0Q29uZGl0aW9uKHdlYXRoZXJEYXRhKSB7XG4gICAgICAgICAgICAgICAgbGV0IGZpcnN0RGlnaXQgPSB3ZWF0aGVyRGF0YS5pZC50b1N0cmluZygpLmNoYXJBdCgwKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbmRpdGlvbiBjb2RlOiBcIiArIHdlYXRoZXJEYXRhLmlkKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGZpcnN0RGlnaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIjJcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInRodW5kZXJzdG9ybXNcIjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIjNcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN1bm55UmFpbnNcIjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIjVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3ZWF0aGVyRGF0YS5pZCA9PSA1MDApIHJldHVybiBcImxpZ2h0UmFpbnNcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIFwiaGVhdnlSYWluc1wiO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiN1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiZm9nXCI7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCI4XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2VhdGhlckRhdGEuaWQgPT0gODAwKSByZXR1cm4gXCJzdW5ueVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAod2VhdGhlckRhdGEuaWQgPT0gODAxKSByZXR1cm4gXCJjbG91ZHlTdW5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIFwiY2xvdWR5XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhcnNlUmVzcG9uc2UocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgd2VhdGhlclJlc3BvbnNlID0gcmVzcG9uc2UuY29udGVudC50b0pTT04oKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRXZWF0aGVyRGF0YS5jaXR5ID0gd2VhdGhlclJlc3BvbnNlLm5hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50V2VhdGhlckRhdGEudGVtcGVyYXR1cmUgPSBNYXRoLmZsb29yKFxuICAgICAgICAgICAgICAgICAgICB3ZWF0aGVyUmVzcG9uc2UubWFpbi50ZW1wXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFdlYXRoZXJEYXRhLmNvbmRpdGlvbiA9IHRoaXMuZ2V0Q29uZGl0aW9uKFxuICAgICAgICAgICAgICAgICAgICB3ZWF0aGVyUmVzcG9uc2Uud2VhdGhlclswXVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50V2VhdGhlckRhdGEudGVtcGVyYXR1cmVDb2xvciA9IHRoaXNcbiAgICAgICAgICAgICAgICAgICAgLmNvbmRpdGlvblRvQ29sb3JNYXBbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFdlYXRoZXJEYXRhLmNvbmRpdGlvblxuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY3VycmVudFdlYXRoZXJEYXRhLmNvbmRpdGlvbik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYGh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke3RoaXMuY3VycmVudFdlYXRoZXJEYXRhLmNvbmRpdGlvbkljb259QDJ4LnBuZ2ApO1xuICAgICAgICAgICAgICAgIHRoaXMubGFiZWxPYmplY3QuZm9ybWF0dGVkVGV4dCA9IHRoaXMuY3JlYXRlRm9ybWF0dGVkU3RyaW5nKHRoaXMuY29uZGl0aW9uVG9UZXh0TWFwW3RoaXMuY3VycmVudFdlYXRoZXJEYXRhLmNvbmRpdGlvbl0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50V2VhdGhlckRhdGEuY29uZGl0aW9uSWNvbiA9IHdlYXRoZXJSZXNwb25zZS53ZWF0aGVyWzBdLmljb247XG5cblxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtb3VudGVkKCkge1xuICAgICAgICAgICAgbGV0IHRvZGF5c0RhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50V2VhdGhlckRhdGEuY3VycmVudERhdGUgPSBgJHt0b2RheXNEYXRlLmdldERhdGUoKX0gJHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vbnRoc1t0b2RheXNEYXRlLmdldE1vbnRoKCldXG4gICAgICAgICAgICB9YDtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFdlYXRoZXJEYXRhLmN1cnJlbnREYXkgPSBgJHtcbiAgICAgICAgICAgICAgICB0aGlzLndlZWtkYXlzW3RvZGF5c0RhdGUuZ2V0RGF5KCldXG4gICAgICAgICAgICB9YDtcblxuICAgICAgICAgICAgdGhpcy5nZXRNeVdlYXRoZXIoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdGVtcGVyYXR1cmVGb250U2l6ZTogMzAsXG4gICAgICAgICAgICAgICAgbGFiZWxPYmplY3Q6IG51bGwsXG4gICAgICAgICAgICAgICAgd2Vla2RheXM6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJTdW5kYXlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJNb25kYXlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJUdWVzZGF5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiV2VkbmVzZGF5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiVGh1cnNkYXlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJGcmlkYXlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJTYXR1cmRheVwiXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBtb250aHM6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJKYW5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJGZWJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJNYXJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJBcHJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJNYXlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJKdW5lXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiSnVseVwiLFxuICAgICAgICAgICAgICAgICAgICBcIkF1Z1wiLFxuICAgICAgICAgICAgICAgICAgICBcIlNlcHRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJPY3RcIixcbiAgICAgICAgICAgICAgICAgICAgXCJOb3ZcIixcbiAgICAgICAgICAgICAgICAgICAgXCJEZWNcIlxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgY29uZGl0aW9uVG9Db2xvck1hcDoge1xuICAgICAgICAgICAgICAgICAgICBzdW5ueTogXCIjRjFDNDBGXCIsXG4gICAgICAgICAgICAgICAgICAgIGNsb3VkeTogXCIjOTVBNUE2XCIsXG4gICAgICAgICAgICAgICAgICAgIGNsb3VkeVN1bjogXCIjQTc5MjUxXCIsXG4gICAgICAgICAgICAgICAgICAgIGxpZ2h0UmFpbnM6IFwiIzVEQURFMlwiLFxuICAgICAgICAgICAgICAgICAgICBzdW5ueVJhaW5zOiBcIiM4ZWI1OWNcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhdnlSYWluczogXCIjMjg3NEE2XCIsXG4gICAgICAgICAgICAgICAgICAgIHdpbmR5OiBcIiNEMzU0MDBcIixcbiAgICAgICAgICAgICAgICAgICAgdGh1bmRlcnN0b3JtczogXCIjNTY2NTczXCIsXG4gICAgICAgICAgICAgICAgICAgIGZvZzogXCIjQUJCMkI5XCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbmRpdGlvblRvVGV4dE1hcDoge1xuICAgICAgICAgICAgICAgICAgICBzdW5ueTogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiSXQncyBnb2luZyB0byBiZSBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcInN1bm55XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCIjRjFDNDBGXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCIgdG9kYXkhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJub3JtYWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBjbG91ZHk6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlRvZGF5J3Mgd2VhdGhlciBpcyBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcImNsb3VkeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiIzk1QTVBNlwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiIGFuZCBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiIGR1bGxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIiM5NUE1QTZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIiFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIGNsb3VkeVN1bjogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQ2xvdWR5IFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCIjOTVBNUE2XCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcImFuZCBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwic3VubnkgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCIjRjFDNDBGXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJhdCB0aGUgc2FtZSB0aW1lLiBHbyBmb3IgYSBkcml2ZSBwZXJoYXBzP1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgbGlnaHRSYWluczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiTGlnaHQgcmFpbnMgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIiM1REFERTJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwidG9kYXkuIERvbid0IGZvcmdldCB0aGF0IHVtYnJlbGxhIVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgc3VubnlSYWluczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiUmFpbnMgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIiM1REFERTJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiYW5kIFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJzdW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIiM1REFERTJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIi4gWW91IG1pZ2h0IHNlZSBhIHJhaW5ib3chXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJub3JtYWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBoZWF2eVJhaW5zOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJJdHMgZ29ubmEgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJmdWNraW5nIHBvdXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIiMyODc0QTZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIi4gQ2F0cywgZG9ncywgZXZlbiB3aGFsZXMhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJub3JtYWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB3aW5keTogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiV2luZHkgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIiNEMzU0MDBcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQUYhIGl0cyBnb25uYSBibG93IHlvdXIgd2lnIG9mZiFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHRodW5kZXJzdG9ybXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlJhaW5zIFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCIjNTY2NTczXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcImFuZCBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwidGh1bmRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiIzU2NjU3M1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiISE/IENvdWxkIHRoZSB3ZWF0aGVyIGdldCBhbnkgd29yc2U/IVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgZm9nOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJGb2dneSBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiI0FCQjJCOVwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJBRi4gQ2FuIHlvdSBzZWUgYW55dGhpbmcgYWhlYWQgb2YgeW91IVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBjdXJyZW50V2VhdGhlckRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgY2l0eTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudERheTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudERhdGU6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uSWNvbjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgdGVtcGVyYXR1cmU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHRvZGF5c1RleHQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBlcmF0dXJlQ29sb3I6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuICAgIC50ZXh0LWRpc3BsYXktc3R5bGUge1xuICAgICAgICBwYWRkaW5nOiAxMDtcbiAgICAgICAgZm9udC1zaXplOiA2MDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAtMTA7XG4gICAgfVxuXG4gICAgLmRheS10ZXh0IHtcbiAgICAgICAgcGFkZGluZy1yaWdodDogMzA7XG4gICAgICAgIGZvbnQtc2l6ZTogMzA7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiAyMDA7XG4gICAgfVxuXG4gICAgLm9yYW5nZS10ZXh0IHtcbiAgICAgICAgY29sb3I6IFwiI0ZGMEYwRlwiXG4gICAgfVxuXG4gICAgLnRlbXAtc3R5bGUge1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAzMDtcblxuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcblxuICAgIH1cbjwvc3R5bGU+IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4udGV4dC1kaXNwbGF5LXN0eWxlW2RhdGEtdi03NjNkYjk3Yl0ge1xcbiAgICBwYWRkaW5nOiAxMDtcXG4gICAgZm9udC1zaXplOiA2MDtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgIGxpbmUtaGVpZ2h0OiAtMTA7XFxufVxcbi5kYXktdGV4dFtkYXRhLXYtNzYzZGI5N2JdIHtcXG4gICAgcGFkZGluZy1yaWdodDogMzA7XFxuICAgIGZvbnQtc2l6ZTogMzA7XFxuICAgIGZvbnQtd2VpZ2h0OiAyMDA7XFxufVxcbi5vcmFuZ2UtdGV4dFtkYXRhLXYtNzYzZGI5N2JdIHtcXG4gICAgY29sb3I6IFxcXCIjRkYwRjBGXFxcIlxcbn1cXG4udGVtcC1zdHlsZVtkYXRhLXYtNzYzZGI5N2JdIHtcXG4gICAgcGFkZGluZy1yaWdodDogMzA7XFxuXFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cbiAgICBjb25zdCBhcHBsaWNhdGlvbiA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCIpO1xuICAgIHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3N0eWxpbmcvc3R5bGUtc2NvcGVcIik7XG5cbiAgICBleHBvcnRzLmZvckVhY2goY3NzRXhwb3J0ID0+IHtcbiAgICAgICAgaWYgKGNzc0V4cG9ydC5sZW5ndGggPiAxICYmIGNzc0V4cG9ydFsxXSkge1xuICAgICAgICAgICAgLy8gYXBwbHlpbmcgdGhlIHNlY29uZCBpdGVtIG9mIHRoZSBleHBvcnQgYXMgaXQgY29udGFpbnMgdGhlIGNzcyBjb250ZW50c1xuICAgICAgICAgICAgYXBwbGljYXRpb24uYWRkQ3NzKGNzc0V4cG9ydFsxXSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICA7XG4gICAgaWYgKG1vZHVsZS5ob3QpIHtcbiAgICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoKTtcbiAgICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKCgpID0+IHtcbiAgICAgICAgICAgIGdsb2JhbC5obXJSZWZyZXNoKHsgdHlwZTogJ3N0eWxlJywgcGF0aDogJy4vY29tcG9uZW50cy9IZWxsb1dvcmxkLnZ1ZScgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcIlBhZ2VcIixcbiAgICB7IG9uOiB7IGxvYWRlZDogX3ZtLm9uTG9hZGVkIH0gfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJHcmlkTGF5b3V0XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgY29sdW1uczogXCIqXCIsIHJvd3M6IFwiYXV0bywqLGF1dG9cIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiR3JpZExheW91dFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyBjb2x1bW5zOiBcImF1dG8sICpcIiwgcm93OiBcIjBcIiwgcm93czogXCIqXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgc3JjOlxuICAgICAgICAgICAgICAgICAgICBcImh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi9cIiArXG4gICAgICAgICAgICAgICAgICAgIF92bS5jdXJyZW50V2VhdGhlckRhdGEuY29uZGl0aW9uSWNvbiArXG4gICAgICAgICAgICAgICAgICAgIFwiQDJ4LnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgY29sdW1uOiBcIjBcIixcbiAgICAgICAgICAgICAgICAgIGhlaWdodDogXCIxMDBcIixcbiAgICAgICAgICAgICAgICAgIGhvcml6b250YWxBbGlnbm1lbnQ6IFwibGVmdFwiLFxuICAgICAgICAgICAgICAgICAgaW9zT3ZlcmZsb3dTYWZlQXJlYTogXCJ0cnVlXCIsXG4gICAgICAgICAgICAgICAgICBtYXJnaW46IFwiMjBcIixcbiAgICAgICAgICAgICAgICAgIHZlcnRpY2FsQWxpZ25tZW50OiBcIm1pZGRsZVwiLFxuICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiMTAwXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJkYXktdGV4dFwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiBfdm0uY3VycmVudFdlYXRoZXJEYXRhLmNpdHksXG4gICAgICAgICAgICAgICAgICBjb2x1bW46IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgdGV4dEFsaWdubWVudDogXCJsZWZ0XCIsXG4gICAgICAgICAgICAgICAgICB2ZXJ0aWNhbEFsaWdubWVudDogXCJtaWRkbGVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiR3JpZExheW91dFwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFwiYXV0b1wiLFxuICAgICAgICAgICAgICAgIGhvcml6b250YWxBbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgcm93OiBcIjFcIixcbiAgICAgICAgICAgICAgICByb3dzOiBcIipcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyB2ZXJ0aWNhbEFsaWdubWVudDogXCJjZW50ZXJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRlbXAtc3R5bGVcIixcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogX3ZtLmN1cnJlbnRXZWF0aGVyRGF0YS50ZW1wZXJhdHVyZUNvbG9yLFxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBfdm0udGVtcGVyYXR1cmVGb250U2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBfdm0uZ2V0VGVtcGVyYXR1cmVUZXh0KCksXG4gICAgICAgICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ25tZW50OiBcInJpZ2h0XCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZGF5LXRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OlxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmN1cnJlbnRXZWF0aGVyRGF0YS5jdXJyZW50RGF5ICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiLCBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uY3VycmVudFdlYXRoZXJEYXRhLmN1cnJlbnREYXRlLFxuICAgICAgICAgICAgICAgICAgICAgIHJvdzogXCIxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWdubWVudDogXCJjZW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBcIipcIixcbiAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206IFwiMjBcIixcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjIwXCIsXG4gICAgICAgICAgICAgICAgcm93OiBcIjJcIixcbiAgICAgICAgICAgICAgICByb3dzOiBcIipcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0ZXh0LWRpc3BsYXktc3R5bGVcIixcbiAgICAgICAgICAgICAgICBhdHRyczogeyBpb3NPdmVyZmxvd1NhZmVBcmVhOiBcInRydWVcIiwgdGV4dFdyYXA6IFwidHJ1ZVwiIH0sXG4gICAgICAgICAgICAgICAgb246IHsgbG9hZGVkOiBfdm0ub25Ub2RheUxhYmVsTG9hZGVkIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYXBwLmNzc1wiOiBcIi4vYXBwLmNzc1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuLyBzeW5jIF5cXFxcLlxcXFwvYXBwXFxcXC4oY3NzfHNjc3N8bGVzc3xzYXNzKSRcIjsiLCJ2YXIgbWFwID0ge1xuXHRcIi4vYXBwLmNzc1wiOiBcIi4vYXBwLmNzc1wiLFxuXHRcIi4vYXBwLmpzXCI6IFwiLi9hcHAuanNcIixcblx0XCIuL25hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvbi9nZW9sb2NhdGlvbi5jb21tb24uanNcIjogXCIuL25hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvbi9nZW9sb2NhdGlvbi5jb21tb24uanNcIixcblx0XCIuL25hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvbi9nZW9sb2NhdGlvbi5qc1wiOiBcIi4vbmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uL2dlb2xvY2F0aW9uLmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vIHN5bmMgcmVjdXJzaXZlICg/PCFcXFxcYkFwcF9SZXNvdXJjZXNcXFxcYi4qKVxcXFwuKHhtbHxjc3N8anN8KD88IVxcXFwuZFxcXFwuKXRzfCg/PCFcXFxcYl9bXFxcXHctXSpcXFxcLilzY3NzKSRcIjsiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcbmV4cG9ydHMuaShyZXF1aXJlKFwiLSEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLTIhbmF0aXZlc2NyaXB0LXRoZW1lLWNvcmUvY3NzL2NvcmUubGlnaHQuY3NzXCIpLCBcIlwiKTtcblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKlxcbkluIE5hdGl2ZVNjcmlwdCwgdGhlIGFwcC5jc3MgZmlsZSBpcyB3aGVyZSB5b3UgcGxhY2UgQ1NTIHJ1bGVzIHRoYXRcXG55b3Ugd291bGQgbGlrZSB0byBhcHBseSB0byB5b3VyIGVudGlyZSBhcHBsaWNhdGlvbi4gQ2hlY2sgb3V0XFxuaHR0cDovL2RvY3MubmF0aXZlc2NyaXB0Lm9yZy91aS9zdHlsaW5nIGZvciBhIGZ1bGwgbGlzdCBvZiB0aGUgQ1NTXFxuc2VsZWN0b3JzIGFuZCBwcm9wZXJ0aWVzIHlvdSBjYW4gdXNlIHRvIHN0eWxlIFVJIGNvbXBvbmVudHMuXFxuXFxuLypcXG5JbiBtYW55IGNhc2VzIHlvdSBtYXkgd2FudCB0byB1c2UgdGhlIE5hdGl2ZVNjcmlwdCBjb3JlIHRoZW1lIGluc3RlYWRcXG5vZiB3cml0aW5nIHlvdXIgb3duIENTUyBydWxlcy4gRm9yIGEgZnVsbCBsaXN0IG9mIGNsYXNzIG5hbWVzIGluIHRoZSB0aGVtZVxcbnJlZmVyIHRvIGh0dHA6Ly9kb2NzLm5hdGl2ZXNjcmlwdC5vcmcvdWkvdGhlbWUuXFxuVGhlIGltcG9ydGVkIENTUyBydWxlcyBtdXN0IHByZWNlZGUgYWxsIG90aGVyIHR5cGVzIG9mIHJ1bGVzLlxcbiovXFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuO1xuICAgIGlmIChtb2R1bGUuaG90KSB7XG4gICAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG4gICAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZSgoKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwuaG1yUmVmcmVzaCh7IHR5cGU6ICdzdHlsZScsIHBhdGg6ICcuL2FwcC5jc3MnIH0pO1xuICAgICAgICB9KVxuICAgIH1cbiIsImltcG9ydCBWdWUgZnJvbSAnbmF0aXZlc2NyaXB0LXZ1ZSc7XG5cbmltcG9ydCBIZWxsb1dvcmxkIGZyb20gJy4vY29tcG9uZW50cy9IZWxsb1dvcmxkJztcblxuLy8gVW5jb21tbWVudCB0aGUgZm9sbG93aW5nIHRvIHNlZSBOYXRpdmVTY3JpcHQtVnVlIG91dHB1dCBsb2dzXG5WdWUuY29uZmlnLnNpbGVudCA9IGZhbHNlO1xuXG5uZXcgVnVlKHtcblxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxGcmFtZT5cbiAgICAgICAgICAgIDxIZWxsb1dvcmxkIC8+XG4gICAgICAgIDwvRnJhbWU+YCxcblxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgSGVsbG9Xb3JsZFxuICAgIH1cbn0pLiRzdGFydCgpOyIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vSGVsbG9Xb3JsZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NzYzZGI5N2Imc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vSGVsbG9Xb3JsZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0hlbGxvV29ybGQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL0hlbGxvV29ybGQudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NzYzZGI5N2Imc2NvcGVkPXRydWUmbGFuZz1jc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjc2M2RiOTdiXCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL3NhbmdyYW1tb2hpdGUvT25lRHJpdmUvRGV2ZWxvcG1lbnQvQXBwIFByb2plY3RzL05hdGl2ZVNjcmlwdC93ZWF0aGVyLWFwcC9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCc3NjNkYjk3YicpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc3NjNkYjk3YicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc3NjNkYjk3YicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vSGVsbG9Xb3JsZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NzYzZGI5N2Imc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNzYzZGI5N2InLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcImNvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vSGVsbG9Xb3JsZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9IZWxsb1dvcmxkLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9zdHlsZS1ob3QtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svYXBwbHktY3NzLWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLTIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vSGVsbG9Xb3JsZC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD03NjNkYjk3YiZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL3N0eWxlLWhvdC1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9hcHBseS1jc3MtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtMiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9IZWxsb1dvcmxkLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTc2M2RiOTdiJnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0hlbGxvV29ybGQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTc2M2RiOTdiJnNjb3BlZD10cnVlJlwiIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgTG9jYXRpb25CYXNlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMb2NhdGlvbkJhc2UoKSB7XG4gICAgfVxuICAgIHJldHVybiBMb2NhdGlvbkJhc2U7XG59KCkpO1xuZXhwb3J0cy5Mb2NhdGlvbkJhc2UgPSBMb2NhdGlvbkJhc2U7XG5leHBvcnRzLmRlZmF1bHRHZXRMb2NhdGlvblRpbWVvdXQgPSA1ICogNjAgKiAxMDAwO1xuZXhwb3J0cy5taW5SYW5nZVVwZGF0ZSA9IDAuMTtcbmV4cG9ydHMubWluVGltZVVwZGF0ZSA9IDEgKiA2MCAqIDEwMDA7XG5leHBvcnRzLmZhc3Rlc3RUaW1lVXBkYXRlID0gNSAqIDEwMDA7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBhcHBsaWNhdGlvbl8xID0gcmVxdWlyZShcImFwcGxpY2F0aW9uXCIpO1xudmFyIGVudW1zXzEgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9lbnVtc1wiKTtcbnZhciB0aW1lcl8xID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdGltZXJcIik7XG52YXIgZ2VvbG9jYXRpb25fY29tbW9uXzEgPSByZXF1aXJlKFwiLi9nZW9sb2NhdGlvbi5jb21tb25cIik7XG52YXIgcGVybWlzc2lvbnMgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBlcm1pc3Npb25zXCIpO1xudmFyIFJFUVVFU1RfRU5BQkxFX0xPQ0FUSU9OID0gNDI2OTtcbnZhciBfb25FbmFibGVMb2NhdGlvblN1Y2Nlc3MgPSBudWxsO1xudmFyIF9vbkVuYWJsZUxvY2F0aW9uRmFpbCA9IG51bGw7XG52YXIgbG9jYXRpb25MaXN0ZW5lcnMgPSB7fTtcbnZhciB3YXRjaElkQ291bnRlciA9IDA7XG52YXIgZnVzZWRMb2NhdGlvbkNsaWVudDtcbnZhciBhdHRhY2hlZEZvckVycm9ySGFuZGxpbmcgPSBmYWxzZTtcbmZ1bmN0aW9uIF9lbnN1cmVMb2NhdGlvbkNsaWVudCgpIHtcbiAgICBmdXNlZExvY2F0aW9uQ2xpZW50ID0gZnVzZWRMb2NhdGlvbkNsaWVudCB8fFxuICAgICAgICBjb20uZ29vZ2xlLmFuZHJvaWQuZ21zLmxvY2F0aW9uLkxvY2F0aW9uU2VydmljZXMuZ2V0RnVzZWRMb2NhdGlvblByb3ZpZGVyQ2xpZW50KGFwcGxpY2F0aW9uXzEuYW5kcm9pZC5jb250ZXh0KTtcbn1cbmFwcGxpY2F0aW9uXzEuYW5kcm9pZC5vbihhcHBsaWNhdGlvbl8xLkFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eVJlc3VsdEV2ZW50LCBmdW5jdGlvbiAoYXJncykge1xuICAgIGlmIChhcmdzLnJlcXVlc3RDb2RlID09PSBSRVFVRVNUX0VOQUJMRV9MT0NBVElPTikge1xuICAgICAgICBpZiAoYXJncy5yZXN1bHRDb2RlID09PSAwKSB7XG4gICAgICAgICAgICBpZiAoX29uRW5hYmxlTG9jYXRpb25GYWlsKSB7XG4gICAgICAgICAgICAgICAgX29uRW5hYmxlTG9jYXRpb25GYWlsKFwiTG9jYXRpb24gbm90IGVuYWJsZWQuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKF9vbkVuYWJsZUxvY2F0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgX29uRW5hYmxlTG9jYXRpb25TdWNjZXNzKCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbmZ1bmN0aW9uIGlzQWlycGxhbmVNb2RlT24oKSB7XG4gICAgcmV0dXJuIGFuZHJvaWQucHJvdmlkZXIuU2V0dGluZ3MuU3lzdGVtLmdldEludChhcHBsaWNhdGlvbl8xLmFuZHJvaWQuY29udGV4dC5nZXRDb250ZW50UmVzb2x2ZXIoKSwgYW5kcm9pZC5wcm92aWRlci5TZXR0aW5ncy5TeXN0ZW0uQUlSUExBTkVfTU9ERV9PTikgIT09IDA7XG59XG5mdW5jdGlvbiBpc1Byb3ZpZGVyRW5hYmxlZChwcm92aWRlcikge1xuICAgIHRyeSB7XG4gICAgICAgIHZhciBsb2NhdGlvbk1hbmFnZXIgPSBhcHBsaWNhdGlvbl8xLmFuZHJvaWQuY29udGV4dFxuICAgICAgICAgICAgLmdldFN5c3RlbVNlcnZpY2UoYW5kcm9pZC5jb250ZW50LkNvbnRleHQuTE9DQVRJT05fU0VSVklDRSk7XG4gICAgICAgIHJldHVybiBsb2NhdGlvbk1hbmFnZXIuaXNQcm92aWRlckVuYWJsZWQocHJvdmlkZXIpO1xuICAgIH1cbiAgICBjYXRjaCAoZXgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGVycm9ySGFuZGxlcihlcnJEYXRhKSB7XG4gICAgd2hpbGUgKHdhdGNoSWRDb3VudGVyICE9PSAwKSB7XG4gICAgICAgIGNsZWFyV2F0Y2god2F0Y2hJZENvdW50ZXIpO1xuICAgICAgICB3YXRjaElkQ291bnRlci0tO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldEN1cnJlbnRMb2NhdGlvbihvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy50aW1lb3V0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgTG9jYXRpb25NYW5hZ2VyLmdldExhc3RMb2NhdGlvbihvcHRpb25zLm1heGltdW1BZ2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgbG9jYXRpb25SZXF1ZXN0ID0gX2dldExvY2F0aW9uUmVxdWVzdChvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB2YXIgd2F0Y2hJZF8xID0gX2dldE5leHRXYXRjaElkKCk7XG4gICAgICAgICAgICAgICAgdmFyIGxvY2F0aW9uQ2FsbGJhY2sgPSBfZ2V0TG9jYXRpb25DYWxsYmFjayh3YXRjaElkXzEsIGZ1bmN0aW9uIChuYXRpdmVMb2NhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjbGVhcldhdGNoKHdhdGNoSWRfMSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobmV3IExvY2F0aW9uKG5hdGl2ZUxvY2F0aW9uKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgTG9jYXRpb25NYW5hZ2VyLnJlcXVlc3RMb2NhdGlvblVwZGF0ZXMobG9jYXRpb25SZXF1ZXN0LCBsb2NhdGlvbkNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICB2YXIgdGltZXJJZF8xID0gdGltZXJfMS5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJXYXRjaCh3YXRjaElkXzEpO1xuICAgICAgICAgICAgICAgICAgICB0aW1lcl8xLmNsZWFyVGltZW91dCh0aW1lcklkXzEpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiVGltZW91dCB3aGlsZSBzZWFyY2hpbmcgZm9yIGxvY2F0aW9uIVwiKSk7XG4gICAgICAgICAgICAgICAgfSwgb3B0aW9ucy50aW1lb3V0IHx8IGdlb2xvY2F0aW9uX2NvbW1vbl8xLmRlZmF1bHRHZXRMb2NhdGlvblRpbWVvdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCByZWplY3QpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5nZXRDdXJyZW50TG9jYXRpb24gPSBnZXRDdXJyZW50TG9jYXRpb247XG5mdW5jdGlvbiBfZ2V0TmV4dFdhdGNoSWQoKSB7XG4gICAgdmFyIHdhdGNoSWQgPSArK3dhdGNoSWRDb3VudGVyO1xuICAgIHJldHVybiB3YXRjaElkO1xufVxuZnVuY3Rpb24gX2dldExvY2F0aW9uQ2FsbGJhY2sod2F0Y2hJZCwgb25Mb2NhdGlvbikge1xuICAgIHZhciBMb2NhdGlvbkNhbGxiYWNrID0gY29tLmdvb2dsZS5hbmRyb2lkLmdtcy5sb2NhdGlvbi5Mb2NhdGlvbkNhbGxiYWNrLmV4dGVuZCh7XG4gICAgICAgIG9uTG9jYXRpb25SZXN1bHQ6IGZ1bmN0aW9uIChsb2NhdGlvblJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy5vbkxvY2F0aW9uKGxvY2F0aW9uUmVzdWx0LmdldExhc3RMb2NhdGlvbigpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHZhciBsb2NhdGlvbkNhbGxiYWNrID0gbmV3IExvY2F0aW9uQ2FsbGJhY2soKTtcbiAgICBsb2NhdGlvbkNhbGxiYWNrLm9uTG9jYXRpb24gPSBvbkxvY2F0aW9uO1xuICAgIGxvY2F0aW9uTGlzdGVuZXJzW3dhdGNoSWRdID0gbG9jYXRpb25DYWxsYmFjaztcbiAgICByZXR1cm4gbG9jYXRpb25DYWxsYmFjaztcbn1cbmZ1bmN0aW9uIF9nZXRMb2NhdGlvblJlcXVlc3Qob3B0aW9ucykge1xuICAgIHZhciBtTG9jYXRpb25SZXF1ZXN0ID0gbmV3IGNvbS5nb29nbGUuYW5kcm9pZC5nbXMubG9jYXRpb24uTG9jYXRpb25SZXF1ZXN0KCk7XG4gICAgdmFyIHVwZGF0ZVRpbWUgPSBvcHRpb25zLnVwZGF0ZVRpbWUgPT09IDAgPyAwIDogb3B0aW9ucy51cGRhdGVUaW1lIHx8IGdlb2xvY2F0aW9uX2NvbW1vbl8xLm1pblRpbWVVcGRhdGU7XG4gICAgbUxvY2F0aW9uUmVxdWVzdC5zZXRJbnRlcnZhbCh1cGRhdGVUaW1lKTtcbiAgICB2YXIgbWluVXBkYXRlVGltZSA9IG9wdGlvbnMubWluaW11bVVwZGF0ZVRpbWUgPT09IDAgP1xuICAgICAgICAwIDogb3B0aW9ucy5taW5pbXVtVXBkYXRlVGltZSB8fCBNYXRoLm1pbih1cGRhdGVUaW1lLCBnZW9sb2NhdGlvbl9jb21tb25fMS5mYXN0ZXN0VGltZVVwZGF0ZSk7XG4gICAgbUxvY2F0aW9uUmVxdWVzdC5zZXRGYXN0ZXN0SW50ZXJ2YWwobWluVXBkYXRlVGltZSk7XG4gICAgaWYgKG9wdGlvbnMudXBkYXRlRGlzdGFuY2UpIHtcbiAgICAgICAgbUxvY2F0aW9uUmVxdWVzdC5zZXRTbWFsbGVzdERpc3BsYWNlbWVudChvcHRpb25zLnVwZGF0ZURpc3RhbmNlKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuZGVzaXJlZEFjY3VyYWN5ID09PSBlbnVtc18xLkFjY3VyYWN5LmhpZ2gpIHtcbiAgICAgICAgbUxvY2F0aW9uUmVxdWVzdC5zZXRQcmlvcml0eShjb20uZ29vZ2xlLmFuZHJvaWQuZ21zLmxvY2F0aW9uLkxvY2F0aW9uUmVxdWVzdC5QUklPUklUWV9ISUdIX0FDQ1VSQUNZKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG1Mb2NhdGlvblJlcXVlc3Quc2V0UHJpb3JpdHkoY29tLmdvb2dsZS5hbmRyb2lkLmdtcy5sb2NhdGlvbi5Mb2NhdGlvblJlcXVlc3QuUFJJT1JJVFlfQkFMQU5DRURfUE9XRVJfQUNDVVJBQ1kpO1xuICAgIH1cbiAgICByZXR1cm4gbUxvY2F0aW9uUmVxdWVzdDtcbn1cbmZ1bmN0aW9uIF9yZXF1ZXN0TG9jYXRpb25QZXJtaXNzaW9ucygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBpZiAoTG9jYXRpb25NYW5hZ2VyLnNob3VsZFNraXBDaGVja3MoKSkge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGVybWlzc2lvbnMucmVxdWVzdFBlcm1pc3Npb24oYW5kcm9pZC5NYW5pZmVzdC5wZXJtaXNzaW9uLkFDQ0VTU19GSU5FX0xPQ0FUSU9OKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIF9nZXRMb2NhdGlvbkxpc3RlbmVyKG1heEFnZSwgb25Mb2NhdGlvbiwgb25FcnJvcikge1xuICAgIHJldHVybiBfZ2V0VGFza1N1Y2Nlc3NMaXN0ZW5lcihmdW5jdGlvbiAobmF0aXZlTG9jYXRpb24pIHtcbiAgICAgICAgaWYgKG5hdGl2ZUxvY2F0aW9uICE9IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBsb2NhdGlvbl8xID0gbmV3IExvY2F0aW9uKG5hdGl2ZUxvY2F0aW9uKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWF4QWdlID09PSBcIm51bWJlclwiICYmIG5hdGl2ZUxvY2F0aW9uICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAobG9jYXRpb25fMS50aW1lc3RhbXAudmFsdWVPZigpICsgbWF4QWdlID4gbmV3IERhdGUoKS52YWx1ZU9mKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgb25Mb2NhdGlvbihsb2NhdGlvbl8xKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9uRXJyb3IobmV3IEVycm9yKFwiTGFzdCBrbm93biBsb2NhdGlvbiB0b28gb2xkIVwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb25Mb2NhdGlvbihsb2NhdGlvbl8xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9uRXJyb3IobmV3IEVycm9yKFwiVGhlcmUgaXMgbm8gbGFzdCBrbm93biBsb2NhdGlvbiFcIikpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBfZ2V0VGFza1N1Y2Nlc3NMaXN0ZW5lcihkb25lKSB7XG4gICAgcmV0dXJuIG5ldyBjb20uZ29vZ2xlLmFuZHJvaWQuZ21zLnRhc2tzLk9uU3VjY2Vzc0xpc3RlbmVyKHtcbiAgICAgICAgb25TdWNjZXNzOiBkb25lXG4gICAgfSk7XG59XG5mdW5jdGlvbiBfZ2V0VGFza0ZhaWxMaXN0ZW5lcihkb25lKSB7XG4gICAgcmV0dXJuIG5ldyBjb20uZ29vZ2xlLmFuZHJvaWQuZ21zLnRhc2tzLk9uRmFpbHVyZUxpc3RlbmVyKHtcbiAgICAgICAgb25GYWlsdXJlOiBkb25lXG4gICAgfSk7XG59XG5mdW5jdGlvbiB3YXRjaExvY2F0aW9uKHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjaywgb3B0aW9ucykge1xuICAgIHZhciB6b25lZFN1Y2Nlc3NDYWxsYmFjayA9IHpvbmVkQ2FsbGJhY2soc3VjY2Vzc0NhbGxiYWNrKTtcbiAgICB2YXIgem9uZWRFcnJvckNhbGxiYWNrID0gem9uZWRDYWxsYmFjayhlcnJvckNhbGxiYWNrKTtcbiAgICBpZiAoKCFwZXJtaXNzaW9ucy5oYXNQZXJtaXNzaW9uKGFuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5BQ0NFU1NfRklORV9MT0NBVElPTikgfHxcbiAgICAgICAgIV9pc0dvb2dsZVBsYXlTZXJ2aWNlc0F2YWlsYWJsZSgpKSAmJiAhTG9jYXRpb25NYW5hZ2VyLnNob3VsZFNraXBDaGVja3MoKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCB3YXRjaCBsb2NhdGlvbi4gQ2FsbCBcImVuYWJsZUxvY2F0aW9uUmVxdWVzdFwiIGZpcnN0Jyk7XG4gICAgfVxuICAgIGlmICghYXR0YWNoZWRGb3JFcnJvckhhbmRsaW5nKSB7XG4gICAgICAgIGF0dGFjaGVkRm9yRXJyb3JIYW5kbGluZyA9IHRydWU7XG4gICAgICAgIGFwcGxpY2F0aW9uXzEub24oYXBwbGljYXRpb25fMS51bmNhdWdodEVycm9yRXZlbnQsIGVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgdmFyIGxvY2F0aW9uUmVxdWVzdCA9IF9nZXRMb2NhdGlvblJlcXVlc3Qob3B0aW9ucyk7XG4gICAgdmFyIHdhdGNoSWQgPSBfZ2V0TmV4dFdhdGNoSWQoKTtcbiAgICB2YXIgbG9jYXRpb25DYWxsYmFjayA9IF9nZXRMb2NhdGlvbkNhbGxiYWNrKHdhdGNoSWQsIGZ1bmN0aW9uIChuYXRpdmVMb2NhdGlvbikge1xuICAgICAgICB6b25lZFN1Y2Nlc3NDYWxsYmFjayhuZXcgTG9jYXRpb24obmF0aXZlTG9jYXRpb24pKTtcbiAgICB9KTtcbiAgICBMb2NhdGlvbk1hbmFnZXIucmVxdWVzdExvY2F0aW9uVXBkYXRlcyhsb2NhdGlvblJlcXVlc3QsIGxvY2F0aW9uQ2FsbGJhY2spO1xuICAgIHJldHVybiB3YXRjaElkO1xufVxuZXhwb3J0cy53YXRjaExvY2F0aW9uID0gd2F0Y2hMb2NhdGlvbjtcbmZ1bmN0aW9uIGNsZWFyV2F0Y2god2F0Y2hJZCkge1xuICAgIHZhciBsaXN0ZW5lciA9IGxvY2F0aW9uTGlzdGVuZXJzW3dhdGNoSWRdO1xuICAgIGlmIChsaXN0ZW5lcikge1xuICAgICAgICBMb2NhdGlvbk1hbmFnZXIucmVtb3ZlTG9jYXRpb25VcGRhdGVzKGxpc3RlbmVyKTtcbiAgICAgICAgZGVsZXRlIGxvY2F0aW9uTGlzdGVuZXJzW3dhdGNoSWRdO1xuICAgIH1cbn1cbmV4cG9ydHMuY2xlYXJXYXRjaCA9IGNsZWFyV2F0Y2g7XG5mdW5jdGlvbiBlbmFibGVMb2NhdGlvblJlcXVlc3QoYWx3YXlzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgX3JlcXVlc3RMb2NhdGlvblBlcm1pc3Npb25zKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfbWFrZUdvb2dsZVBsYXlTZXJ2aWNlc0F2YWlsYWJsZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF9pc0xvY2F0aW9uU2VydmljZUVuYWJsZWQoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChleCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGV4LmdldFN0YXR1c0NvZGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXR1c0NvZGUgPSBleC5nZXRTdGF0dXNDb2RlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzQ29kZSA9PT0gY29tLmdvb2dsZS5hbmRyb2lkLmdtcy5sb2NhdGlvbi5Mb2NhdGlvblNldHRpbmdzU3RhdHVzQ29kZXMuUkVTT0xVVElPTl9SRVFVSVJFRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9vbkVuYWJsZUxvY2F0aW9uU3VjY2VzcyA9IHJlc29sdmU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9vbkVuYWJsZUxvY2F0aW9uRmFpbCA9IHJlamVjdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4LnN0YXJ0UmVzb2x1dGlvbkZvclJlc3VsdChhcHBsaWNhdGlvbl8xLmFuZHJvaWQuZm9yZWdyb3VuZEFjdGl2aXR5LCBSRVFVRVNUX0VOQUJMRV9MT0NBVElPTik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChzZW5kRXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzdGF0dXNDb2RlID09PSBjb20uZ29vZ2xlLmFuZHJvaWQuZ21zLmxvY2F0aW9uLkxvY2F0aW9uU2V0dGluZ3NTdGF0dXNDb2Rlcy5TRVRUSU5HU19DSEFOR0VfVU5BVkFJTEFCTEVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiBpc0FpcnBsYW5lTW9kZU9uKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiBpc1Byb3ZpZGVyRW5hYmxlZChhbmRyb2lkLmxvY2F0aW9uLkxvY2F0aW9uTWFuYWdlci5HUFNfUFJPVklERVIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiQ2Fubm90IGVuYWJsZSB0aGUgbG9jYXRpb24gc2VydmljZS4gXCIgKyBleCkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZW5hYmxlTG9jYXRpb25SZXF1ZXN0ID0gZW5hYmxlTG9jYXRpb25SZXF1ZXN0O1xuZnVuY3Rpb24gX21ha2VHb29nbGVQbGF5U2VydmljZXNBdmFpbGFibGUoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgaWYgKF9pc0dvb2dsZVBsYXlTZXJ2aWNlc0F2YWlsYWJsZSgpKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGdvb2dsZUFwaUF2YWlsYWJpbGl0eSA9IGNvbS5nb29nbGUuYW5kcm9pZC5nbXMuY29tbW9uLkdvb2dsZUFwaUF2YWlsYWJpbGl0eS5nZXRJbnN0YW5jZSgpO1xuICAgICAgICBnb29nbGVBcGlBdmFpbGFiaWxpdHkubWFrZUdvb2dsZVBsYXlTZXJ2aWNlc0F2YWlsYWJsZShhcHBsaWNhdGlvbl8xLmFuZHJvaWQuZm9yZWdyb3VuZEFjdGl2aXR5KVxuICAgICAgICAgICAgLmFkZE9uU3VjY2Vzc0xpc3RlbmVyKF9nZXRUYXNrU3VjY2Vzc0xpc3RlbmVyKHJlc29sdmUpKVxuICAgICAgICAgICAgLmFkZE9uRmFpbHVyZUxpc3RlbmVyKF9nZXRUYXNrRmFpbExpc3RlbmVyKHJlamVjdCkpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gX2lzR29vZ2xlUGxheVNlcnZpY2VzQXZhaWxhYmxlKCkge1xuICAgIGlmIChMb2NhdGlvbk1hbmFnZXIuc2hvdWxkU2tpcENoZWNrcygpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICB2YXIgaXNMb2NhdGlvblNlcnZpY2VFbmFibGVkID0gdHJ1ZTtcbiAgICB2YXIgZ29vZ2xlQXBpQXZhaWxhYmlsaXR5ID0gY29tLmdvb2dsZS5hbmRyb2lkLmdtcy5jb21tb24uR29vZ2xlQXBpQXZhaWxhYmlsaXR5LmdldEluc3RhbmNlKCk7XG4gICAgdmFyIHJlc3VsdENvZGUgPSBnb29nbGVBcGlBdmFpbGFiaWxpdHkuaXNHb29nbGVQbGF5U2VydmljZXNBdmFpbGFibGUoYXBwbGljYXRpb25fMS5hbmRyb2lkLmNvbnRleHQpO1xuICAgIGlmIChyZXN1bHRDb2RlICE9PSBjb20uZ29vZ2xlLmFuZHJvaWQuZ21zLmNvbW1vbi5Db25uZWN0aW9uUmVzdWx0LlNVQ0NFU1MpIHtcbiAgICAgICAgaXNMb2NhdGlvblNlcnZpY2VFbmFibGVkID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBpc0xvY2F0aW9uU2VydmljZUVuYWJsZWQ7XG59XG5mdW5jdGlvbiBfaXNMb2NhdGlvblNlcnZpY2VFbmFibGVkKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBpZiAoTG9jYXRpb25NYW5hZ2VyLnNob3VsZFNraXBDaGVja3MoKSkge1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7IGRlc2lyZWRBY2N1cmFjeTogZW51bXNfMS5BY2N1cmFjeS5oaWdoLCB1cGRhdGVUaW1lOiAwLCB1cGRhdGVEaXN0YW5jZTogMCwgbWF4aW11bUFnZTogMCwgdGltZW91dDogMCB9O1xuICAgICAgICB2YXIgbG9jYXRpb25SZXF1ZXN0ID0gX2dldExvY2F0aW9uUmVxdWVzdChvcHRpb25zKTtcbiAgICAgICAgdmFyIGxvY2F0aW9uU2V0dGluZ3NCdWlsZGVyID0gbmV3IGNvbS5nb29nbGUuYW5kcm9pZC5nbXMubG9jYXRpb24uTG9jYXRpb25TZXR0aW5nc1JlcXVlc3QuQnVpbGRlcigpO1xuICAgICAgICBsb2NhdGlvblNldHRpbmdzQnVpbGRlci5hZGRMb2NhdGlvblJlcXVlc3QobG9jYXRpb25SZXF1ZXN0KTtcbiAgICAgICAgbG9jYXRpb25TZXR0aW5nc0J1aWxkZXIuc2V0QWx3YXlzU2hvdyh0cnVlKTtcbiAgICAgICAgdmFyIGxvY2F0aW9uU2V0dGluZ3NDbGllbnQgPSBjb20uZ29vZ2xlLmFuZHJvaWQuZ21zLmxvY2F0aW9uLkxvY2F0aW9uU2VydmljZXMuZ2V0U2V0dGluZ3NDbGllbnQoYXBwbGljYXRpb25fMS5hbmRyb2lkLmNvbnRleHQpO1xuICAgICAgICBsb2NhdGlvblNldHRpbmdzQ2xpZW50LmNoZWNrTG9jYXRpb25TZXR0aW5ncyhsb2NhdGlvblNldHRpbmdzQnVpbGRlci5idWlsZCgpKVxuICAgICAgICAgICAgLmFkZE9uU3VjY2Vzc0xpc3RlbmVyKF9nZXRUYXNrU3VjY2Vzc0xpc3RlbmVyKHJlc29sdmUpKVxuICAgICAgICAgICAgLmFkZE9uRmFpbHVyZUxpc3RlbmVyKF9nZXRUYXNrRmFpbExpc3RlbmVyKHJlamVjdCkpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gaXNFbmFibGVkKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBpZiAoIV9pc0dvb2dsZVBsYXlTZXJ2aWNlc0F2YWlsYWJsZSgpIHx8XG4gICAgICAgICAgICAhcGVybWlzc2lvbnMuaGFzUGVybWlzc2lvbihhbmRyb2lkLk1hbmlmZXN0LnBlcm1pc3Npb24uQUNDRVNTX0ZJTkVfTE9DQVRJT04pKSB7XG4gICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIF9pc0xvY2F0aW9uU2VydmljZUVuYWJsZWQob3B0aW9ucykudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChleCkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZXguZ2V0U3RhdHVzQ29kZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICYmIGV4LmdldFN0YXR1c0NvZGUoKSA9PT0gY29tLmdvb2dsZS5hbmRyb2lkLmdtcy5sb2NhdGlvbi5Mb2NhdGlvblNldHRpbmdzU3RhdHVzQ29kZXMuU0VUVElOR1NfQ0hBTkdFX1VOQVZBSUxBQkxFXG4gICAgICAgICAgICAgICAgICAgICYmIGlzQWlycGxhbmVNb2RlT24oKVxuICAgICAgICAgICAgICAgICAgICAmJiBpc1Byb3ZpZGVyRW5hYmxlZChhbmRyb2lkLmxvY2F0aW9uLkxvY2F0aW9uTWFuYWdlci5HUFNfUFJPVklERVIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnRzLmlzRW5hYmxlZCA9IGlzRW5hYmxlZDtcbmZ1bmN0aW9uIGRpc3RhbmNlKGxvYzEsIGxvYzIpIHtcbiAgICBpZiAoIWxvYzEuYW5kcm9pZCkge1xuICAgICAgICBsb2MxLmFuZHJvaWQgPSBhbmRyb2lkTG9jYXRpb25Gcm9tTG9jYXRpb24obG9jMSk7XG4gICAgfVxuICAgIGlmICghbG9jMi5hbmRyb2lkKSB7XG4gICAgICAgIGxvYzIuYW5kcm9pZCA9IGFuZHJvaWRMb2NhdGlvbkZyb21Mb2NhdGlvbihsb2MyKTtcbiAgICB9XG4gICAgcmV0dXJuIGxvYzEuYW5kcm9pZC5kaXN0YW5jZVRvKGxvYzIuYW5kcm9pZCk7XG59XG5leHBvcnRzLmRpc3RhbmNlID0gZGlzdGFuY2U7XG5mdW5jdGlvbiBhbmRyb2lkTG9jYXRpb25Gcm9tTG9jYXRpb24obG9jYXRpb24pIHtcbiAgICB2YXIgYW5kcm9pZExvY2F0aW9uID0gbmV3IGFuZHJvaWQubG9jYXRpb24uTG9jYXRpb24oXCJjdXN0b21cIik7XG4gICAgYW5kcm9pZExvY2F0aW9uLnNldExhdGl0dWRlKGxvY2F0aW9uLmxhdGl0dWRlKTtcbiAgICBhbmRyb2lkTG9jYXRpb24uc2V0TG9uZ2l0dWRlKGxvY2F0aW9uLmxvbmdpdHVkZSk7XG4gICAgaWYgKGxvY2F0aW9uLmFsdGl0dWRlKSB7XG4gICAgICAgIGFuZHJvaWRMb2NhdGlvbi5zZXRBbHRpdHVkZShsb2NhdGlvbi5hbHRpdHVkZSk7XG4gICAgfVxuICAgIGlmIChsb2NhdGlvbi5zcGVlZCkge1xuICAgICAgICBhbmRyb2lkTG9jYXRpb24uc2V0U3BlZWQoZmxvYXQobG9jYXRpb24uc3BlZWQpKTtcbiAgICB9XG4gICAgaWYgKGxvY2F0aW9uLmRpcmVjdGlvbikge1xuICAgICAgICBhbmRyb2lkTG9jYXRpb24uc2V0QmVhcmluZyhmbG9hdChsb2NhdGlvbi5kaXJlY3Rpb24pKTtcbiAgICB9XG4gICAgaWYgKGxvY2F0aW9uLnRpbWVzdGFtcCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYW5kcm9pZExvY2F0aW9uLnNldFRpbWUobG9uZyhsb2NhdGlvbi50aW1lc3RhbXAuZ2V0VGltZSgpKSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJpbnZhbGlkIGxvY2F0aW9uIHRpbWVzdGFtcFwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYW5kcm9pZExvY2F0aW9uO1xufVxudmFyIExvY2F0aW9uTWFuYWdlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTG9jYXRpb25NYW5hZ2VyKCkge1xuICAgIH1cbiAgICBMb2NhdGlvbk1hbmFnZXIuZ2V0TGFzdExvY2F0aW9uID0gZnVuY3Rpb24gKG1heGltdW1BZ2UsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBfZW5zdXJlTG9jYXRpb25DbGllbnQoKTtcbiAgICAgICAgcmV0dXJuIGZ1c2VkTG9jYXRpb25DbGllbnQuZ2V0TGFzdExvY2F0aW9uKClcbiAgICAgICAgICAgIC5hZGRPblN1Y2Nlc3NMaXN0ZW5lcihfZ2V0TG9jYXRpb25MaXN0ZW5lcihtYXhpbXVtQWdlLCByZXNvbHZlLCByZWplY3QpKVxuICAgICAgICAgICAgLmFkZE9uRmFpbHVyZUxpc3RlbmVyKF9nZXRUYXNrRmFpbExpc3RlbmVyKGZ1bmN0aW9uIChlKSB7IHJldHVybiByZWplY3QobmV3IEVycm9yKGUuZ2V0TWVzc2FnZSgpKSk7IH0pKTtcbiAgICB9O1xuICAgIExvY2F0aW9uTWFuYWdlci5yZXF1ZXN0TG9jYXRpb25VcGRhdGVzID0gZnVuY3Rpb24gKGxvY2F0aW9uUmVxdWVzdCwgbG9jYXRpb25DYWxsYmFjaykge1xuICAgICAgICBfZW5zdXJlTG9jYXRpb25DbGllbnQoKTtcbiAgICAgICAgZnVzZWRMb2NhdGlvbkNsaWVudC5yZXF1ZXN0TG9jYXRpb25VcGRhdGVzKGxvY2F0aW9uUmVxdWVzdCwgbG9jYXRpb25DYWxsYmFjaywgbnVsbCk7XG4gICAgfTtcbiAgICBMb2NhdGlvbk1hbmFnZXIucmVtb3ZlTG9jYXRpb25VcGRhdGVzID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgIF9lbnN1cmVMb2NhdGlvbkNsaWVudCgpO1xuICAgICAgICBmdXNlZExvY2F0aW9uQ2xpZW50LnJlbW92ZUxvY2F0aW9uVXBkYXRlcyhsaXN0ZW5lcik7XG4gICAgfTtcbiAgICBMb2NhdGlvbk1hbmFnZXIuc2hvdWxkU2tpcENoZWNrcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgTG9jYXRpb25NYW5hZ2VyLnNldE1vY2tMb2NhdGlvbk1hbmFnZXIgPSBmdW5jdGlvbiAoTW9ja0xvY2F0aW9uTWFuYWdlcikge1xuICAgICAgICBMb2NhdGlvbk1hbmFnZXIuZ2V0TGFzdExvY2F0aW9uID0gTW9ja0xvY2F0aW9uTWFuYWdlci5nZXRMYXN0TG9jYXRpb247XG4gICAgICAgIExvY2F0aW9uTWFuYWdlci5yZXF1ZXN0TG9jYXRpb25VcGRhdGVzID0gTW9ja0xvY2F0aW9uTWFuYWdlci5yZXF1ZXN0TG9jYXRpb25VcGRhdGVzO1xuICAgICAgICBMb2NhdGlvbk1hbmFnZXIucmVtb3ZlTG9jYXRpb25VcGRhdGVzID0gTW9ja0xvY2F0aW9uTWFuYWdlci5yZW1vdmVMb2NhdGlvblVwZGF0ZXM7XG4gICAgICAgIExvY2F0aW9uTWFuYWdlci5zaG91bGRTa2lwQ2hlY2tzID0gTW9ja0xvY2F0aW9uTWFuYWdlci5zaG91bGRTa2lwQ2hlY2tzO1xuICAgIH07XG4gICAgcmV0dXJuIExvY2F0aW9uTWFuYWdlcjtcbn0oKSk7XG5leHBvcnRzLkxvY2F0aW9uTWFuYWdlciA9IExvY2F0aW9uTWFuYWdlcjtcbnZhciBMb2NhdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKExvY2F0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIExvY2F0aW9uKGFuZHJvaWRMb2NhdGlvbikge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBpZiAoYW5kcm9pZExvY2F0aW9uKSB7XG4gICAgICAgICAgICBfdGhpcy5hbmRyb2lkID0gYW5kcm9pZExvY2F0aW9uO1xuICAgICAgICAgICAgX3RoaXMubGF0aXR1ZGUgPSBhbmRyb2lkTG9jYXRpb24uZ2V0TGF0aXR1ZGUoKTtcbiAgICAgICAgICAgIF90aGlzLmxvbmdpdHVkZSA9IGFuZHJvaWRMb2NhdGlvbi5nZXRMb25naXR1ZGUoKTtcbiAgICAgICAgICAgIF90aGlzLmFsdGl0dWRlID0gYW5kcm9pZExvY2F0aW9uLmdldEFsdGl0dWRlKCk7XG4gICAgICAgICAgICBfdGhpcy5ob3Jpem9udGFsQWNjdXJhY3kgPSBhbmRyb2lkTG9jYXRpb24uZ2V0QWNjdXJhY3koKTtcbiAgICAgICAgICAgIF90aGlzLnZlcnRpY2FsQWNjdXJhY3kgPSBhbmRyb2lkTG9jYXRpb24uZ2V0QWNjdXJhY3koKTtcbiAgICAgICAgICAgIF90aGlzLnNwZWVkID0gYW5kcm9pZExvY2F0aW9uLmdldFNwZWVkKCk7XG4gICAgICAgICAgICBfdGhpcy5kaXJlY3Rpb24gPSBhbmRyb2lkTG9jYXRpb24uZ2V0QmVhcmluZygpO1xuICAgICAgICAgICAgX3RoaXMudGltZXN0YW1wID0gbmV3IERhdGUoYW5kcm9pZExvY2F0aW9uLmdldFRpbWUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTG9jYXRpb247XG59KGdlb2xvY2F0aW9uX2NvbW1vbl8xLkxvY2F0aW9uQmFzZSkpO1xuZXhwb3J0cy5Mb2NhdGlvbiA9IExvY2F0aW9uO1xuZnVuY3Rpb24gc2V0Q3VzdG9tTG9jYXRpb25NYW5hZ2VyKE1vY2tMb2NhdGlvbk1hbmFnZXIpIHtcbiAgICBMb2NhdGlvbk1hbmFnZXIuc2V0TW9ja0xvY2F0aW9uTWFuYWdlcihNb2NrTG9jYXRpb25NYW5hZ2VyKTtcbn1cbmV4cG9ydHMuc2V0Q3VzdG9tTG9jYXRpb25NYW5hZ2VyID0gc2V0Q3VzdG9tTG9jYXRpb25NYW5hZ2VyO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==