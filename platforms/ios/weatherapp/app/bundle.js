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
    clearWeatherData() {
      this.currentWeatherData = {
        city: "",
        currentDay: "",
        currentDate: "",
        condition: "",
        conditionIcon: "",
        temperature: null,
        todaysText: "",
        temperatureColor: "black"
      };

      var formattedString = __webpack_require__("../node_modules/tns-core-modules/text/formatted-string.js");

      this.labelObject.formattedText = new formattedString.FormattedString();
    },

    onTapOfCity() {
      var randomCityIndex = Math.floor(Math.random() * this.listOfCitites.length);
      var currentCity = this.listOfCitites[randomCityIndex];
      this.clearWeatherData();
      this.setTodaysDetails();
      this.getWeatherForCity(currentCity);
    },

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
        this.temperatureFontSize = 60;
        return "Loading ...";
      } else {
        this.temperatureFontSize = 90;
        return "".concat(this.currentWeatherData.temperature, "\xB0C");
      }
    },

    getWeather: function getWeather(url) {
      http.request({
        url: url,
        method: "GET"
      }).then(this.parseResponse);
    },
    getWeatherForCity: function getWeatherForCity(city) {
      var appId = "ed8226ba3a3c8c7ce5405af356b8906e";
      var url = "https://api.openweathermap.org/data/2.5/weather?APPID=" + appId + "&units=metric&q=" + encodeURIComponent(city);
      this.getWeather(url);
    },
    getWeatherForLocation: function getWeatherForLocation(loc) {
      var appId = "ed8226ba3a3c8c7ce5405af356b8906e";
      var url = "https://api.openweathermap.org/data/2.5/weather?APPID=" + appId + "&units=metric&lat=" + loc.latitude + "&lon=" + loc.longitude;
      this.getWeather(url);
    },

    getMyWeather(type) {
      Geolocation.enableLocationRequest();
      Geolocation.getCurrentLocation({
        desiredAccuracy: Accuracy.high,
        updateDistance: 0.1,
        timeout: 20000
      }).then(loc => {
        if (loc) {
          this.getWeatherForLocation(loc);
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
    },

    setTodaysDetails() {
      var todaysDate = new Date();
      this.currentWeatherData.currentDate = "".concat(todaysDate.getDate(), " ").concat(this.months[todaysDate.getMonth()]);
      this.currentWeatherData.currentDay = "".concat(this.weekdays[todaysDate.getDay()]);
    }

  },

  created() {
    this.setTodaysDetails();
    this.getMyWeather();
  },

  data() {
    return {
      listOfCitites: ["Tokyo", "Jakarta", "New York", "Seoul", "Manila", "Mumbai", "Sao Paulo", "Mexico City", "New Delhi", "Osaka", "Cairo", "Kolkata", "Los Angeles", "Shanghai", "Moscow", "Beijing", "Buenos Aires", "Guangzhou", "Shenzhen", "Istanbul", "Rio De Janeiro", "Paris", "Karachi", "Nagoya", "Chicago", "Lagos", "London", "Bangkok", "Kinshasa", "Tehran", "Lima", "Dongguan", "Bogota", "Chennai", "Dhaka", "Essen", "Tianjin", "Hong Kong", "Taipei", "Lahore", "Ho Chi Minh City", "Bangalore", "Hyderabad", "Johannesburg", "Baghdad", "Toronto", "Santiago", "Kuala Lumpur", "San Francisco", "Philadelphia", "Wuhan", "Miami", "Dallas", "Madrid", "Ahmedabad", "Boston", "Belo Horizonte", "Khartoum", "Saint Petersburg", "Shenyang", "Houston", "Pune", "Riyadh", "Singapore", "Washington", "Yangon", "Milan", "Atlanta", "Chongqing", "Alexandria", "Nanjing", "Guadalajara", "Barcelona", "Chengdu", "Detroit", "Ankara", "Abidjan", "Athens", "Berlin", "Sydney", "Monterrey", "Phoenix", "Busan", "Recife", "Bandung", "Porto Alegre", "Melbourne", "Luanda", "Hangzhou", "Algiers", "Hà Noi", "Montréal", "Xi'an", "Pyongyang", "Qingdao", "Surat", "Fortaleza", "Medellín", "Durban", "Kanpur", "Addis Ababa", "Nairobi", "Jeddah", "Naples", "Kabul", "Salvador", "Harbin", "Kano", "Casablanca", "Cape Town", "Curitiba", "Surabaya", "San Diego", "Seattle", "Rome", "Dar Es Salaam", "Taichung", "Jaipur", "Caracas", "Dakar", "Kaohsiung", "Minneapolis", "Lucknow", "Amman", "Tel Aviv-yafo", "Guayaquil", "Kyiv", "Faisalabad", "Mashhad", "Izmir", "Rawalpindi", "Tashkent", "Katowice", "Changchun", "Campinas", "Daegu", "Changsha", "Nagpur", "San Juan", "Aleppo", "Lisbon", "Frankfurt Am Main", "Nanchang", "Birmingham[]", "Tampa", "Medan", "Dalian", "Tunis", "Shijiazhuang", "Manchester", "Port-au-prince", "Damascus", "Ji'nan", "Fukuoka", "Santo Domingo", "Havana", "Cali", "Denver", "St. Louis", "Colombo", "Dubai", "Baltimore", "Sapporo", "Rotterdam", "Vancouver", "Preston", "Patna", "Sana'a", "Warsaw"],
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
        temperatureColor: "black"
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
exports.push([module.i, "\n.text-display-style[data-v-763db97b] {\n    padding: 10;\n    font-size: 50;\n    font-weight: bold;\n    line-height: -10;\n}\n.day-text[data-v-763db97b] {\n    font-size: 30;\n    color: black;\n    font-weight: 200;\n}\n.orange-text[data-v-763db97b] {\n    color: \"#FF0F0F\"\n}\n.temp-style[data-v-763db97b] {\n    color: dimgrey;\n    font-weight: bold;\n}\n", ""]);

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
            "FlexboxLayout",
            {
              attrs: { justifyContent: "center", row: "0" },
              on: { tap: _vm.onTapOfCity }
            },
            [
              _c(
                "StackLayout",
                {
                  attrs: {
                    iosOverflowSafeArea: "true",
                    orientation: "horizontal"
                  }
                },
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
                      margin: "20 0 20 -10",
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
              )
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
                      textAlignment: "center"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vY29tcG9uZW50cy9IZWxsb1dvcmxkLnZ1ZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0hlbGxvV29ybGQudnVlPzE5Y2IiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9IZWxsb1dvcmxkLnZ1ZT8wMGI1Iiwid2VicGFjazovLy8uIHN5bmMgbm9ucmVjdXJzaXZlIF5cXC5cXC9hcHBcXC4oY3NzfHNjc3N8bGVzc3xzYXNzKSQiLCJ3ZWJwYWNrOi8vL1xcYl9bXFx3LV0qXFwuKXNjc3MpJCIsIndlYnBhY2s6Ly8vLi9hcHAuY3NzIiwid2VicGFjazovLy8uL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0hlbGxvV29ybGQudnVlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWU/MjhkYSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0hlbGxvV29ybGQudnVlPzVlYWMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9IZWxsb1dvcmxkLnZ1ZT83ODMyIiwid2VicGFjazovLy8uL25hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvbi9nZW9sb2NhdGlvbi5jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vbmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uL2dlb2xvY2F0aW9uLmpzIl0sIm5hbWVzIjpbIkhlbGxvV29ybGQiLCJWdWUiLCJjb25maWciLCJzaWxlbnQiLCJ0ZW1wbGF0ZSIsImNvbXBvbmVudHMiLCIkc3RhcnQiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsIkxvY2F0aW9uQmFzZSIsImRlZmF1bHRHZXRMb2NhdGlvblRpbWVvdXQiLCJtaW5SYW5nZVVwZGF0ZSIsIm1pblRpbWVVcGRhdGUiLCJmYXN0ZXN0VGltZVVwZGF0ZSIsImVudW1zXzEiLCJyZXF1aXJlIiwidGltZXJfMSIsImFwcGxpY2F0aW9uXzEiLCJ1dGlscyIsImdlb2xvY2F0aW9uX2NvbW1vbl8xIiwiUGxhdGZvcm0iLCJsb2NhdGlvbk1hbmFnZXJzIiwibG9jYXRpb25MaXN0ZW5lcnMiLCJ3YXRjaElkIiwiYXR0YWNoZWRGb3JFcnJvckhhbmRsaW5nIiwiTG9jYXRpb25MaXN0ZW5lckltcGwiLCJfc3VwZXIiLCJfX2V4dGVuZHMiLCJhcHBseSIsImFyZ3VtZW50cyIsImluaXRXaXRoTG9jYXRpb25FcnJvciIsInN1Y2Nlc3NDYWxsYmFjayIsImVycm9yIiwibGlzdGVuZXIiLCJuZXciLCJpZCIsIl9vbkxvY2F0aW9uIiwiX29uRXJyb3IiLCJpbml0V2l0aFByb21pc2VDYWxsYmFja3MiLCJyZXNvbHZlIiwicmVqZWN0IiwiYXV0aG9yaXplQWx3YXlzIiwiX3Jlc29sdmUiLCJfcmVqZWN0IiwicHJvdG90eXBlIiwibG9jYXRpb25NYW5hZ2VyRGlkVXBkYXRlTG9jYXRpb25zIiwibWFuYWdlciIsImxvY2F0aW9ucyIsImkiLCJjb3VudCIsImxvY2F0aW9uXzEiLCJsb2NhdGlvbkZyb21DTExvY2F0aW9uIiwib2JqZWN0QXRJbmRleCIsImxvY2F0aW9uTWFuYWdlckRpZEZhaWxXaXRoRXJyb3IiLCJFcnJvciIsImxvY2FsaXplZERlc2NyaXB0aW9uIiwibG9jYXRpb25NYW5hZ2VyRGlkQ2hhbmdlQXV0aG9yaXphdGlvblN0YXR1cyIsInN0YXR1cyIsIkxvY2F0aW9uTW9uaXRvciIsInN0b3BMb2NhdGlvbk1vbml0b3JpbmciLCJPYmpDUHJvdG9jb2xzIiwiQ0xMb2NhdGlvbk1hbmFnZXJEZWxlZ2F0ZSIsIk5TT2JqZWN0IiwiY2xMb2NhdGlvbiIsImxvY2F0aW9uIiwiTG9jYXRpb24iLCJsYXRpdHVkZSIsImNvb3JkaW5hdGUiLCJsb25naXR1ZGUiLCJhbHRpdHVkZSIsImhvcml6b250YWxBY2N1cmFjeSIsInZlcnRpY2FsQWNjdXJhY3kiLCJzcGVlZCIsImRpcmVjdGlvbiIsImNvdXJzZSIsInRpbWVJbnRlcnZhbFNpbmNlMTk3MCIsIk5TRGF0ZSIsImRhdGVXaXRoVGltZUludGVydmFsU2luY2VEYXRlIiwidGltZXN0YW1wIiwiRGF0ZSIsImlvcyIsImNsTG9jYXRpb25Gcm9tTG9jYXRpb24iLCJoQWNjdXJhY3kiLCJ2QWNjdXJhY3kiLCJpb3NMb2NhdGlvbiIsIkNMTG9jYXRpb24iLCJhbGxvYyIsImluaXRXaXRoQ29vcmRpbmF0ZUFsdGl0dWRlSG9yaXpvbnRhbEFjY3VyYWN5VmVydGljYWxBY2N1cmFjeUNvdXJzZVNwZWVkVGltZXN0YW1wIiwiQ0xMb2NhdGlvbkNvb3JkaW5hdGUyRE1ha2UiLCJlcnJvckhhbmRsZXIiLCJlcnJEYXRhIiwiY2xlYXJXYXRjaCIsImdldFZlcnNpb25NYWoiLCJwYXJzZUludCIsImRldmljZSIsIm9zVmVyc2lvbiIsInNwbGl0IiwiZ2V0Q3VycmVudExvY2F0aW9uIiwib3B0aW9ucyIsIlByb21pc2UiLCJlbmFibGVMb2NhdGlvblJlcXVlc3QiLCJ0aGVuIiwidGltZW91dCIsImxhc3RMb2NhdGlvbiIsImdldExhc3RLbm93bkxvY2F0aW9uIiwibWF4aW11bUFnZSIsInZhbHVlT2YiLCJ0aW1lcklkXzEiLCJsb2NMaXN0ZW5lcl8xIiwiaW5pdExvY2F0aW9uXzEiLCJzdG9wVGltZXJBbmRNb25pdG9yXzEiLCJsb2NMaXN0ZW5lcklkIiwidW5kZWZpbmVkIiwiY2xlYXJUaW1lb3V0IiwiZGVzaXJlZEFjY3VyYWN5IiwiQWNjdXJhY3kiLCJhbnkiLCJyZXF1ZXN0TG9jYXRpb24iLCJzdGFydExvY2F0aW9uTW9uaXRvcmluZyIsImUiLCJzZXRUaW1lb3V0Iiwid2F0Y2hMb2NhdGlvbiIsImVycm9yQ2FsbGJhY2siLCJvbiIsInVuY2F1Z2h0RXJyb3JFdmVudCIsImJpbmQiLCJ6b25lZFN1Y2Nlc3NDYWxsYmFjayIsImdsb2JhbCIsInpvbmVkQ2FsbGJhY2siLCJ6b25lZEVycm9yQ2FsbGJhY2siLCJsb2NMaXN0ZW5lciIsImlvc0xvY01hbmFnZXIiLCJnZXRJT1NMb2NhdGlvbk1hbmFnZXIiLCJzdGFydFVwZGF0aW5nTG9jYXRpb24iLCJfd2F0Y2hJZCIsImFsd2F5cyIsImlvc09wZW5TZXR0aW5nc0lmTG9jYXRpb25IYXNCZWVuRGVuaWVkIiwibG9jYXRpb25Jc0VuYWJsZWQiLCJfaXNFbmFibGVkIiwic3RhdHVzXzEiLCJnZXRJT1NMb2NhdGlvbk1hbmFnZXJTdGF0dXMiLCJnZXR0ZXIiLCJVSUFwcGxpY2F0aW9uIiwic2hhcmVkQXBwbGljYXRpb24iLCJvcGVuVVJMIiwiTlNVUkwiLCJVUkxXaXRoU3RyaW5nIiwiVUlBcHBsaWNhdGlvbk9wZW5TZXR0aW5nc1VSTFN0cmluZyIsInJlcXVlc3RBbHdheXNBdXRob3JpemF0aW9uIiwicmVxdWVzdFdoZW5JblVzZUF1dGhvcml6YXRpb24iLCJDTExvY2F0aW9uTWFuYWdlciIsImxvY2F0aW9uU2VydmljZXNFbmFibGVkIiwic3RhdHVzXzIiLCJpc0VuYWJsZWQiLCJpc0VuYWJsZWRSZXN1bHQiLCJhdXRob3JpemF0aW9uU3RhdHVzIiwiZGlzdGFuY2UiLCJsb2MxIiwibG9jMiIsImRpc3RhbmNlRnJvbUxvY2F0aW9uIiwibG9jTWFuYWdlcklkIiwiaGFzT3duUHJvcGVydHkiLCJ0ZW1wTG9jYXRpb24iLCJpb3NMb2NNYW5hZ2VySWQiLCJzdG9wVXBkYXRpbmdMb2NhdGlvbiIsImRlbGVnYXRlIiwiY3JlYXRlaU9TTG9jYXRpb25NYW5hZ2VyIiwiaGlnaCIsImRpc3RhbmNlRmlsdGVyIiwidXBkYXRlRGlzdGFuY2UiLCJhbGxvd3NCYWNrZ3JvdW5kTG9jYXRpb25VcGRhdGVzIiwiaW9zQWxsb3dzQmFja2dyb3VuZExvY2F0aW9uVXBkYXRlcyIsInBhdXNlc0xvY2F0aW9uVXBkYXRlc0F1dG9tYXRpY2FsbHkiLCJpb3NQYXVzZXNMb2NhdGlvblVwZGF0ZXNBdXRvbWF0aWNhbGx5IiwiaW9zTG9jYXRpb25NYW5hZ2VyIiwic2V0Q3VzdG9tTG9jYXRpb25NYW5hZ2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNkNBOztBQUNBOztBQUNBOztBQUVBO0FB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SDtBQUNKOztBQUNELFNBQVNpSSx3QkFBVCxDQUFrQ2pJLE9BQWxDLEVBQTJDO0FBQ3ZDZ0ksb0JBQWtCLEdBQUcsOEJBQVk7QUFBRSxXQUFPaEksT0FBUDtBQUFpQixHQUFwRDtBQUNIOztBQUNEdkMsT0FBTyxDQUFDd0ssd0JBQVIsR0FBbUNBLHdCQUFuQzs7QUFDQSxJQUFJOUcsUUFBUSxHQUFJLFVBQVV2QyxNQUFWLEVBQWtCO0FBQzlCQyxXQUFTLENBQUNzQyxRQUFELEVBQVd2QyxNQUFYLENBQVQ7O0FBQ0EsV0FBU3VDLFFBQVQsR0FBb0I7QUFDaEIsV0FBT3ZDLE1BQU0sS0FBSyxJQUFYLElBQW1CQSxNQUFNLENBQUNFLEtBQVAsQ0FBYSxJQUFiLEVBQW1CQyxTQUFuQixDQUFuQixJQUFvRCxJQUEzRDtBQUNIOztBQUNELFNBQU9vQyxRQUFQO0FBQ0gsQ0FOZSxDQU1kOUMsb0JBQW9CLENBQUNWLFlBTlAsQ0FBaEI7O0FBT0FGLE9BQU8sQ0FBQzBELFFBQVIsR0FBbUJBLFFBQW5CLEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICAgIDxQYWdlIEBsb2FkZWQ9XCJvbkxvYWRlZFwiPlxuICAgICAgICA8R3JpZExheW91dCBjb2x1bW5zPVwiKlwiIHJvd3M9XCJhdXRvLCosYXV0b1wiPlxuICAgICAgICAgICAgPEZsZXhib3hMYXlvdXQgQHRhcD1cIm9uVGFwT2ZDaXR5XCIganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIiByb3c9XCIwXCI+XG4gICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0IGlvc092ZXJmbG93U2FmZUFyZWE9XCJ0cnVlXCIgb3JpZW50YXRpb249XCJob3Jpem9udGFsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxJbWFnZSA6c3JjPVwiYGh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke2N1cnJlbnRXZWF0aGVyRGF0YS5jb25kaXRpb25JY29ufUAyeC5wbmdgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbj1cIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PVwiMTAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvcml6b250YWxBbGlnbm1lbnQ9XCJsZWZ0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbj1cIjIwIDAgMjAgLTEwXCIgdmVydGljYWxBbGlnbm1lbnQ9XCJtaWRkbGVcIlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD1cIjEwMFwiPjwvSW1hZ2U+XG4gICAgICAgICAgICAgICAgICAgIDxMYWJlbCA6dGV4dD1cImN1cnJlbnRXZWF0aGVyRGF0YS5jaXR5XCIgY2xhc3M9XCJkYXktdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW49XCIxXCIgdGV4dEFsaWdubWVudD1cImxlZnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVydGljYWxBbGlnbm1lbnQ9XCJtaWRkbGVcIj48L0xhYmVsPlxuICAgICAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XG4gICAgICAgICAgICA8L0ZsZXhib3hMYXlvdXQ+XG5cbiAgICAgICAgICAgIDxHcmlkTGF5b3V0IGNvbHVtbnM9XCJhdXRvXCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImNlbnRlclwiIHJvdz1cIjFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgcm93cz1cIipcIj5cbiAgICAgICAgICAgICAgICA8U3RhY2tMYXlvdXQgdmVydGljYWxBbGlnbm1lbnQ9XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPExhYmVsIDpjb2xvcj1cImN1cnJlbnRXZWF0aGVyRGF0YS50ZW1wZXJhdHVyZUNvbG9yXCIgOmZvbnRTaXplPVwidGVtcGVyYXR1cmVGb250U2l6ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA6dGV4dD1cImdldFRlbXBlcmF0dXJlVGV4dCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidGVtcC1zdHlsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByb3c9XCIwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbm1lbnQ9XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9MYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPExhYmVsIDp0ZXh0PVwiYCR7Y3VycmVudFdlYXRoZXJEYXRhLmN1cnJlbnREYXl9LCAke2N1cnJlbnRXZWF0aGVyRGF0YS5jdXJyZW50RGF0ZX1gXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZGF5LXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93PVwiMVwiIHRleHRBbGlnbm1lbnQ9XCJjZW50ZXJcIj48L0xhYmVsPlxuICAgICAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XG4gICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgICAgICA8R3JpZExheW91dCBjb2x1bW5zPVwiKlwiIG1hcmdpbkJvdHRvbT1cIjIwXCIgcGFkZGluZz1cIjIwXCIgcm93PVwiMlwiXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dzPVwiKlwiPlxuICAgICAgICAgICAgICAgIDxMYWJlbCBAbG9hZGVkPVwib25Ub2RheUxhYmVsTG9hZGVkXCIgY2xhc3M9XCJ0ZXh0LWRpc3BsYXktc3R5bGVcIlxuICAgICAgICAgICAgICAgICAgICAgICBpb3NPdmVyZmxvd1NhZmVBcmVhPVwidHJ1ZVwiIHRleHRXcmFwPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgIDwvTGFiZWw+XG4gICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgIDwvR3JpZExheW91dD5cblxuXG4gICAgPC9QYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBjb25zdCBHZW9sb2NhdGlvbiA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb25cIik7XG4gICAgY29uc3QgQWNjdXJhY3kgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9lbnVtc1wiKTtcbiAgICBjb25zdCBodHRwID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvaHR0cFwiKTtcblxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgZmlsdGVyczoge1xuICAgICAgICAgICAgbG93ZXJjYXNlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBjbGVhcldlYXRoZXJEYXRhKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFdlYXRoZXJEYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBjaXR5OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50RGF5OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50RGF0ZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBjb25kaXRpb25JY29uOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wZXJhdHVyZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgdG9kYXlzVGV4dDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgdGVtcGVyYXR1cmVDb2xvcjogXCJibGFja1wiXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRTdHJpbmcgPSByZXF1aXJlKFwidGV4dC9mb3JtYXR0ZWQtc3RyaW5nXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMubGFiZWxPYmplY3QuZm9ybWF0dGVkVGV4dCA9IG5ldyBmb3JtYXR0ZWRTdHJpbmcuRm9ybWF0dGVkU3RyaW5nKCk7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblRhcE9mQ2l0eSgpIHtcbiAgICAgICAgICAgICAgICBsZXQgcmFuZG9tQ2l0eUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5saXN0T2ZDaXRpdGVzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRDaXR5ID0gdGhpcy5saXN0T2ZDaXRpdGVzW3JhbmRvbUNpdHlJbmRleF07XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhcldlYXRoZXJEYXRhKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUb2RheXNEZXRhaWxzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRXZWF0aGVyRm9yQ2l0eShjdXJyZW50Q2l0eSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvblRvZGF5TGFiZWxMb2FkZWQoYXJncykge1xuICAgICAgICAgICAgICAgIC8vOnRleHQ9XCJjdXJyZW50V2VhdGhlckRhdGEudG9kYXlzVGV4dFwiXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZXR0aW5nIGxhYmVsIDogXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMubGFiZWxPYmplY3QgPSBhcmdzLm9iamVjdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjcmVhdGVGb3JtYXR0ZWRTdHJpbmcoc3RyaW5nc1RvRm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhzdHJpbmdzVG9Gb3JtYXQpO1xuICAgICAgICAgICAgICAgIGlmIChzdHJpbmdzVG9Gb3JtYXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkU3RyaW5nID0gcmVxdWlyZShcInRleHQvZm9ybWF0dGVkLXN0cmluZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkU3BhbiA9IHJlcXVpcmUoXCJ0ZXh0L3NwYW5cIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IENvbG9yTW9kdWxlID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvY29sb3JcIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmc3RyaW5nVG9TZW5kID0gbmV3IGZvcm1hdHRlZFN0cmluZy5Gb3JtYXR0ZWRTdHJpbmcoKTtcblxuICAgICAgICAgICAgICAgICAgICBzdHJpbmdzVG9Gb3JtYXQuZm9yRWFjaCgoY3VycmVudFN0ckZyYWdtZW50LCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmc3BhbiA9IG5ldyBmb3JtYXR0ZWRTcGFuLlNwYW4oKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZnNwYW4udGV4dCA9IGN1cnJlbnRTdHJGcmFnbWVudC50ZXh0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGN1cnJlbnRTdHJGcmFnbWVudC50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm5vcm1hbFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmc3Bhbi5jb2xvciA9IG5ldyBDb2xvck1vZHVsZS5Db2xvcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYmxhY2tcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDVVNUT00gc2V0dGluZyBhbnl0aGluZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnNwYW4uY29sb3IgPSBuZXcgQ29sb3JNb2R1bGUuQ29sb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3RyRnJhZ21lbnQudHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmc3Bhbi5jbGFzcyA9IFwib3JhbmdlLXRleHRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmc3RyaW5nVG9TZW5kLnNwYW5zLnB1c2goZnNwYW4pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhmc3RyaW5nVG9TZW5kKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZzdHJpbmdUb1NlbmQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkxvYWRlZCgpIHtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRUZW1wZXJhdHVyZVRleHQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFdlYXRoZXJEYXRhLnRlbXBlcmF0dXJlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wZXJhdHVyZUZvbnRTaXplID0gNjA7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIkxvYWRpbmcgLi4uXCI7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBlcmF0dXJlRm9udFNpemUgPSA5MDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMuY3VycmVudFdlYXRoZXJEYXRhLnRlbXBlcmF0dXJlfcKwQ2A7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFdlYXRoZXI6IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgICAgICAgICBodHRwLnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiXG4gICAgICAgICAgICAgICAgfSkudGhlbih0aGlzLnBhcnNlUmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFdlYXRoZXJGb3JDaXR5OiBmdW5jdGlvbiAoY2l0eSkge1xuICAgICAgICAgICAgICAgIHZhciBhcHBJZCA9XG4gICAgICAgICAgICAgICAgICAgIFwiZWQ4MjI2YmEzYTNjOGM3Y2U1NDA1YWYzNTZiODkwNmVcIjtcbiAgICAgICAgICAgICAgICB2YXIgdXJsID1cbiAgICAgICAgICAgICAgICAgICAgXCJodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9BUFBJRD1cIiArXG4gICAgICAgICAgICAgICAgICAgIGFwcElkICtcbiAgICAgICAgICAgICAgICAgICAgXCImdW5pdHM9bWV0cmljJnE9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoY2l0eSk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRXZWF0aGVyKHVybCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0V2VhdGhlckZvckxvY2F0aW9uOiBmdW5jdGlvbiAobG9jKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFwcElkID1cbiAgICAgICAgICAgICAgICAgICAgXCJlZDgyMjZiYTNhM2M4YzdjZTU0MDVhZjM1NmI4OTA2ZVwiO1xuICAgICAgICAgICAgICAgIHZhciB1cmwgPVxuICAgICAgICAgICAgICAgICAgICBcImh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP0FQUElEPVwiICtcbiAgICAgICAgICAgICAgICAgICAgYXBwSWQgK1xuICAgICAgICAgICAgICAgICAgICBcIiZ1bml0cz1tZXRyaWMmbGF0PVwiICtcbiAgICAgICAgICAgICAgICAgICAgbG9jLmxhdGl0dWRlICtcbiAgICAgICAgICAgICAgICAgICAgXCImbG9uPVwiICtcbiAgICAgICAgICAgICAgICAgICAgbG9jLmxvbmdpdHVkZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFdlYXRoZXIodXJsKTtcbiAgICAgICAgICAgIH0sIGdldE15V2VhdGhlcih0eXBlKSB7XG4gICAgICAgICAgICAgICAgR2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgR2VvbG9jYXRpb24uZ2V0Q3VycmVudExvY2F0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgZGVzaXJlZEFjY3VyYWN5OiBBY2N1cmFjeS5oaWdoLFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVEaXN0YW5jZTogMC4xLFxuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0OiAyMDAwMFxuICAgICAgICAgICAgICAgIH0pLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgIGxvYyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRXZWF0aGVyRm9yTG9jYXRpb24obG9jKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0VGVtcGVyYXR1cmVDb2xvcih0ZW1wKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRlbXAgPCAxNSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCIjODVDMUU5XCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0ZW1wIDwgMjUgJiYgdGVtcCA+PSAxNSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCIjRjREMDNGXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0ZW1wIDwgMzUgJiYgdGVtcCA+PSAyNSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCIjRjM5QzEyXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiI0U3NEMzQ1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRDb25kaXRpb24od2VhdGhlckRhdGEpIHtcbiAgICAgICAgICAgICAgICBsZXQgZmlyc3REaWdpdCA9IHdlYXRoZXJEYXRhLmlkLnRvU3RyaW5nKCkuY2hhckF0KDApO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29uZGl0aW9uIGNvZGU6IFwiICsgd2VhdGhlckRhdGEuaWQpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoZmlyc3REaWdpdCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiMlwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidGh1bmRlcnN0b3Jtc1wiO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiM1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3VubnlSYWluc1wiO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiNVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdlYXRoZXJEYXRhLmlkID09IDUwMCkgcmV0dXJuIFwibGlnaHRSYWluc1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gXCJoZWF2eVJhaW5zXCI7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCI3XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJmb2dcIjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIjhcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3ZWF0aGVyRGF0YS5pZCA9PSA4MDApIHJldHVybiBcInN1bm55XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh3ZWF0aGVyRGF0YS5pZCA9PSA4MDEpIHJldHVybiBcImNsb3VkeVN1blwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gXCJjbG91ZHlcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGFyc2VSZXNwb25zZShyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHZhciB3ZWF0aGVyUmVzcG9uc2UgPSByZXNwb25zZS5jb250ZW50LnRvSlNPTigpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFdlYXRoZXJEYXRhLmNpdHkgPSB3ZWF0aGVyUmVzcG9uc2UubmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRXZWF0aGVyRGF0YS50ZW1wZXJhdHVyZSA9IE1hdGguZmxvb3IoXG4gICAgICAgICAgICAgICAgICAgIHdlYXRoZXJSZXNwb25zZS5tYWluLnRlbXBcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50V2VhdGhlckRhdGEuY29uZGl0aW9uID0gdGhpcy5nZXRDb25kaXRpb24oXG4gICAgICAgICAgICAgICAgICAgIHdlYXRoZXJSZXNwb25zZS53ZWF0aGVyWzBdXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRXZWF0aGVyRGF0YS50ZW1wZXJhdHVyZUNvbG9yID0gdGhpc1xuICAgICAgICAgICAgICAgICAgICAuY29uZGl0aW9uVG9Db2xvck1hcFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50V2VhdGhlckRhdGEuY29uZGl0aW9uXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jdXJyZW50V2VhdGhlckRhdGEuY29uZGl0aW9uKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7dGhpcy5jdXJyZW50V2VhdGhlckRhdGEuY29uZGl0aW9uSWNvbn1AMngucG5nYCk7XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbE9iamVjdC5mb3JtYXR0ZWRUZXh0ID0gdGhpcy5jcmVhdGVGb3JtYXR0ZWRTdHJpbmcodGhpcy5jb25kaXRpb25Ub1RleHRNYXBbdGhpcy5jdXJyZW50V2VhdGhlckRhdGEuY29uZGl0aW9uXSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRXZWF0aGVyRGF0YS5jb25kaXRpb25JY29uID0gd2VhdGhlclJlc3BvbnNlLndlYXRoZXJbMF0uaWNvbjtcblxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0VG9kYXlzRGV0YWlscygpIHtcblxuICAgICAgICAgICAgICAgIGxldCB0b2RheXNEYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRXZWF0aGVyRGF0YS5jdXJyZW50RGF0ZSA9IGAke3RvZGF5c0RhdGUuZ2V0RGF0ZSgpfSAke1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbnRoc1t0b2RheXNEYXRlLmdldE1vbnRoKCldXG4gICAgICAgICAgICAgICAgfWA7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50V2VhdGhlckRhdGEuY3VycmVudERheSA9IGAke1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndlZWtkYXlzW3RvZGF5c0RhdGUuZ2V0RGF5KCldXG4gICAgICAgICAgICAgICAgfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNyZWF0ZWQoKSB7XG4gICAgICAgICAgICB0aGlzLnNldFRvZGF5c0RldGFpbHMoKTtcblxuICAgICAgICAgICAgdGhpcy5nZXRNeVdlYXRoZXIoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbGlzdE9mQ2l0aXRlczogW1wiVG9reW9cIixcbiAgICAgICAgICAgICAgICAgICAgXCJKYWthcnRhXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiTmV3IFlvcmtcIixcbiAgICAgICAgICAgICAgICAgICAgXCJTZW91bFwiLFxuICAgICAgICAgICAgICAgICAgICBcIk1hbmlsYVwiLFxuICAgICAgICAgICAgICAgICAgICBcIk11bWJhaVwiLFxuICAgICAgICAgICAgICAgICAgICBcIlNhbyBQYXVsb1wiLFxuICAgICAgICAgICAgICAgICAgICBcIk1leGljbyBDaXR5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiTmV3IERlbGhpXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiT3Nha2FcIixcbiAgICAgICAgICAgICAgICAgICAgXCJDYWlyb1wiLFxuICAgICAgICAgICAgICAgICAgICBcIktvbGthdGFcIixcbiAgICAgICAgICAgICAgICAgICAgXCJMb3MgQW5nZWxlc1wiLFxuICAgICAgICAgICAgICAgICAgICBcIlNoYW5naGFpXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiTW9zY293XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiQmVpamluZ1wiLFxuICAgICAgICAgICAgICAgICAgICBcIkJ1ZW5vcyBBaXJlc1wiLFxuICAgICAgICAgICAgICAgICAgICBcIkd1YW5nemhvdVwiLFxuICAgICAgICAgICAgICAgICAgICBcIlNoZW56aGVuXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiSXN0YW5idWxcIixcbiAgICAgICAgICAgICAgICAgICAgXCJSaW8gRGUgSmFuZWlyb1wiLFxuICAgICAgICAgICAgICAgICAgICBcIlBhcmlzXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiS2FyYWNoaVwiLFxuICAgICAgICAgICAgICAgICAgICBcIk5hZ295YVwiLFxuICAgICAgICAgICAgICAgICAgICBcIkNoaWNhZ29cIixcbiAgICAgICAgICAgICAgICAgICAgXCJMYWdvc1wiLFxuICAgICAgICAgICAgICAgICAgICBcIkxvbmRvblwiLFxuICAgICAgICAgICAgICAgICAgICBcIkJhbmdrb2tcIixcbiAgICAgICAgICAgICAgICAgICAgXCJLaW5zaGFzYVwiLFxuICAgICAgICAgICAgICAgICAgICBcIlRlaHJhblwiLFxuICAgICAgICAgICAgICAgICAgICBcIkxpbWFcIixcbiAgICAgICAgICAgICAgICAgICAgXCJEb25nZ3VhblwiLFxuICAgICAgICAgICAgICAgICAgICBcIkJvZ290YVwiLFxuICAgICAgICAgICAgICAgICAgICBcIkNoZW5uYWlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJEaGFrYVwiLFxuICAgICAgICAgICAgICAgICAgICBcIkVzc2VuXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiVGlhbmppblwiLFxuICAgICAgICAgICAgICAgICAgICBcIkhvbmcgS29uZ1wiLFxuICAgICAgICAgICAgICAgICAgICBcIlRhaXBlaVwiLFxuICAgICAgICAgICAgICAgICAgICBcIkxhaG9yZVwiLFxuICAgICAgICAgICAgICAgICAgICBcIkhvIENoaSBNaW5oIENpdHlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJCYW5nYWxvcmVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJIeWRlcmFiYWRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJKb2hhbm5lc2J1cmdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJCYWdoZGFkXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiVG9yb250b1wiLFxuICAgICAgICAgICAgICAgICAgICBcIlNhbnRpYWdvXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiS3VhbGEgTHVtcHVyXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiU2FuIEZyYW5jaXNjb1wiLFxuICAgICAgICAgICAgICAgICAgICBcIlBoaWxhZGVscGhpYVwiLFxuICAgICAgICAgICAgICAgICAgICBcIld1aGFuXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiTWlhbWlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJEYWxsYXNcIixcbiAgICAgICAgICAgICAgICAgICAgXCJNYWRyaWRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJBaG1lZGFiYWRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJCb3N0b25cIixcbiAgICAgICAgICAgICAgICAgICAgXCJCZWxvIEhvcml6b250ZVwiLFxuICAgICAgICAgICAgICAgICAgICBcIktoYXJ0b3VtXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiU2FpbnQgUGV0ZXJzYnVyZ1wiLFxuICAgICAgICAgICAgICAgICAgICBcIlNoZW55YW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiSG91c3RvblwiLFxuICAgICAgICAgICAgICAgICAgICBcIlB1bmVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJSaXlhZGhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJTaW5nYXBvcmVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJXYXNoaW5ndG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiWWFuZ29uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiTWlsYW5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJBdGxhbnRhXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiQ2hvbmdxaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiQWxleGFuZHJpYVwiLFxuICAgICAgICAgICAgICAgICAgICBcIk5hbmppbmdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJHdWFkYWxhamFyYVwiLFxuICAgICAgICAgICAgICAgICAgICBcIkJhcmNlbG9uYVwiLFxuICAgICAgICAgICAgICAgICAgICBcIkNoZW5nZHVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJEZXRyb2l0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiQW5rYXJhXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiQWJpZGphblwiLFxuICAgICAgICAgICAgICAgICAgICBcIkF0aGVuc1wiLFxuICAgICAgICAgICAgICAgICAgICBcIkJlcmxpblwiLFxuICAgICAgICAgICAgICAgICAgICBcIlN5ZG5leVwiLFxuICAgICAgICAgICAgICAgICAgICBcIk1vbnRlcnJleVwiLFxuICAgICAgICAgICAgICAgICAgICBcIlBob2VuaXhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJCdXNhblwiLFxuICAgICAgICAgICAgICAgICAgICBcIlJlY2lmZVwiLFxuICAgICAgICAgICAgICAgICAgICBcIkJhbmR1bmdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJQb3J0byBBbGVncmVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJNZWxib3VybmVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJMdWFuZGFcIixcbiAgICAgICAgICAgICAgICAgICAgXCJIYW5nemhvdVwiLFxuICAgICAgICAgICAgICAgICAgICBcIkFsZ2llcnNcIixcbiAgICAgICAgICAgICAgICAgICAgXCJIw6AgTm9pXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiTW9udHLDqWFsXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiWGknYW5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJQeW9uZ3lhbmdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJRaW5nZGFvXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiU3VyYXRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJGb3J0YWxlemFcIixcbiAgICAgICAgICAgICAgICAgICAgXCJNZWRlbGzDrW5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJEdXJiYW5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJLYW5wdXJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJBZGRpcyBBYmFiYVwiLFxuICAgICAgICAgICAgICAgICAgICBcIk5haXJvYmlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJKZWRkYWhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJOYXBsZXNcIixcbiAgICAgICAgICAgICAgICAgICAgXCJLYWJ1bFwiLFxuICAgICAgICAgICAgICAgICAgICBcIlNhbHZhZG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiSGFyYmluXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiS2Fub1wiLFxuICAgICAgICAgICAgICAgICAgICBcIkNhc2FibGFuY2FcIixcbiAgICAgICAgICAgICAgICAgICAgXCJDYXBlIFRvd25cIixcbiAgICAgICAgICAgICAgICAgICAgXCJDdXJpdGliYVwiLFxuICAgICAgICAgICAgICAgICAgICBcIlN1cmFiYXlhXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiU2FuIERpZWdvXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiU2VhdHRsZVwiLFxuICAgICAgICAgICAgICAgICAgICBcIlJvbWVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJEYXIgRXMgU2FsYWFtXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiVGFpY2h1bmdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJKYWlwdXJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJDYXJhY2FzXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiRGFrYXJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJLYW9oc2l1bmdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJNaW5uZWFwb2xpc1wiLFxuICAgICAgICAgICAgICAgICAgICBcIkx1Y2tub3dcIixcbiAgICAgICAgICAgICAgICAgICAgXCJBbW1hblwiLFxuICAgICAgICAgICAgICAgICAgICBcIlRlbCBBdml2LXlhZm9cIixcbiAgICAgICAgICAgICAgICAgICAgXCJHdWF5YXF1aWxcIixcbiAgICAgICAgICAgICAgICAgICAgXCJLeWl2XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiRmFpc2FsYWJhZFwiLFxuICAgICAgICAgICAgICAgICAgICBcIk1hc2hoYWRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJJem1pclwiLFxuICAgICAgICAgICAgICAgICAgICBcIlJhd2FscGluZGlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJUYXNoa2VudFwiLFxuICAgICAgICAgICAgICAgICAgICBcIkthdG93aWNlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiQ2hhbmdjaHVuXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiQ2FtcGluYXNcIixcbiAgICAgICAgICAgICAgICAgICAgXCJEYWVndVwiLFxuICAgICAgICAgICAgICAgICAgICBcIkNoYW5nc2hhXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiTmFncHVyXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiU2FuIEp1YW5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJBbGVwcG9cIixcbiAgICAgICAgICAgICAgICAgICAgXCJMaXNib25cIixcbiAgICAgICAgICAgICAgICAgICAgXCJGcmFua2Z1cnQgQW0gTWFpblwiLFxuICAgICAgICAgICAgICAgICAgICBcIk5hbmNoYW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiQmlybWluZ2hhbVtdXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiVGFtcGFcIixcbiAgICAgICAgICAgICAgICAgICAgXCJNZWRhblwiLFxuICAgICAgICAgICAgICAgICAgICBcIkRhbGlhblwiLFxuICAgICAgICAgICAgICAgICAgICBcIlR1bmlzXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiU2hpamlhemh1YW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiTWFuY2hlc3RlclwiLFxuICAgICAgICAgICAgICAgICAgICBcIlBvcnQtYXUtcHJpbmNlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiRGFtYXNjdXNcIixcbiAgICAgICAgICAgICAgICAgICAgXCJKaSduYW5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJGdWt1b2thXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiU2FudG8gRG9taW5nb1wiLFxuICAgICAgICAgICAgICAgICAgICBcIkhhdmFuYVwiLFxuICAgICAgICAgICAgICAgICAgICBcIkNhbGlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJEZW52ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJTdC4gTG91aXNcIixcbiAgICAgICAgICAgICAgICAgICAgXCJDb2xvbWJvXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiRHViYWlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJCYWx0aW1vcmVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJTYXBwb3JvXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiUm90dGVyZGFtXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiVmFuY291dmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiUHJlc3RvblwiLFxuICAgICAgICAgICAgICAgICAgICBcIlBhdG5hXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiU2FuYSdhXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiV2Fyc2F3XCJdLFxuICAgICAgICAgICAgICAgIHRlbXBlcmF0dXJlRm9udFNpemU6IDMwLFxuICAgICAgICAgICAgICAgIGxhYmVsT2JqZWN0OiBudWxsLFxuICAgICAgICAgICAgICAgIHdlZWtkYXlzOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiU3VuZGF5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiTW9uZGF5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiVHVlc2RheVwiLFxuICAgICAgICAgICAgICAgICAgICBcIldlZG5lc2RheVwiLFxuICAgICAgICAgICAgICAgICAgICBcIlRodXJzZGF5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiRnJpZGF5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiU2F0dXJkYXlcIlxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgbW9udGhzOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiSmFuXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiRmViXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiTWFyXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiQXByXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiTWF5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiSnVuZVwiLFxuICAgICAgICAgICAgICAgICAgICBcIkp1bHlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJBdWdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJTZXB0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiT2N0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiTm92XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiRGVjXCJcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIGNvbmRpdGlvblRvQ29sb3JNYXA6IHtcbiAgICAgICAgICAgICAgICAgICAgc3Vubnk6IFwiI0YxQzQwRlwiLFxuICAgICAgICAgICAgICAgICAgICBjbG91ZHk6IFwiIzk1QTVBNlwiLFxuICAgICAgICAgICAgICAgICAgICBjbG91ZHlTdW46IFwiI0E3OTI1MVwiLFxuICAgICAgICAgICAgICAgICAgICBsaWdodFJhaW5zOiBcIiM1REFERTJcIixcbiAgICAgICAgICAgICAgICAgICAgc3VubnlSYWluczogXCIjOGViNTljXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYXZ5UmFpbnM6IFwiIzI4NzRBNlwiLFxuICAgICAgICAgICAgICAgICAgICB3aW5keTogXCIjRDM1NDAwXCIsXG4gICAgICAgICAgICAgICAgICAgIHRodW5kZXJzdG9ybXM6IFwiIzU2NjU3M1wiLFxuICAgICAgICAgICAgICAgICAgICBmb2c6IFwiI0FCQjJCOVwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb25kaXRpb25Ub1RleHRNYXA6IHtcbiAgICAgICAgICAgICAgICAgICAgc3Vubnk6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkl0J3MgZ29pbmcgdG8gYmUgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJzdW5ueVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiI0YxQzQwRlwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiIHRvZGF5IVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgY2xvdWR5OiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJUb2RheSdzIHdlYXRoZXIgaXMgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJjbG91ZHlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIiM5NUE1QTZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIiBhbmQgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJub3JtYWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIiBkdWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCIjOTVBNUE2XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCIhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJub3JtYWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBjbG91ZHlTdW46IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkNsb3VkeSBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiIzk1QTVBNlwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJhbmQgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJub3JtYWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcInN1bm55IFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiI0YxQzQwRlwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiYXQgdGhlIHNhbWUgdGltZS4gR28gZm9yIGEgZHJpdmUgcGVyaGFwcz9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIGxpZ2h0UmFpbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkxpZ2h0IHJhaW5zIFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCIjNURBREUyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcInRvZGF5LiBEb24ndCBmb3JnZXQgdGhhdCB1bWJyZWxsYSFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHN1bm55UmFpbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlJhaW5zIFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCIjNURBREUyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcImFuZCBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwic3VuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCIjNURBREUyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCIuIFlvdSBtaWdodCBzZWUgYSByYWluYm93IVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgaGVhdnlSYWluczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiSXRzIGdvbm5hIFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJub3JtYWxcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiZnVja2luZyBwb3VyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCIjMjg3NEE2XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCIuIENhdHMsIGRvZ3MsIGV2ZW4gd2hhbGVzIVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgd2luZHk6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIldpbmR5IFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCIjRDM1NDAwXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkFGISBpdHMgZ29ubmEgYmxvdyB5b3VyIHdpZyBvZmYhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJub3JtYWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB0aHVuZGVyc3Rvcm1zOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJSYWlucyBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiIzU2NjU3M1wiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJhbmQgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJub3JtYWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcInRodW5kZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIiM1NjY1NzNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIiEhPyBDb3VsZCB0aGUgd2VhdGhlciBnZXQgYW55IHdvcnNlPyFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIGZvZzogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRm9nZ3kgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIiNBQkIyQjlcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQUYuIENhbiB5b3Ugc2VlIGFueXRoaW5nIGFoZWFkIG9mIHlvdSFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgY3VycmVudFdlYXRoZXJEYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGNpdHk6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnREYXk6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnREYXRlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBjb25kaXRpb246IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbkljb246IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBlcmF0dXJlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICB0b2RheXNUZXh0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wZXJhdHVyZUNvbG9yOiBcImJsYWNrXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuICAgIC50ZXh0LWRpc3BsYXktc3R5bGUge1xuICAgICAgICBwYWRkaW5nOiAxMDtcbiAgICAgICAgZm9udC1zaXplOiA1MDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAtMTA7XG4gICAgfVxuXG4gICAgLmRheS10ZXh0IHtcbiAgICAgICAgZm9udC1zaXplOiAzMDtcbiAgICAgICAgY29sb3I6IGJsYWNrO1xuICAgICAgICBmb250LXdlaWdodDogMjAwO1xuICAgIH1cblxuICAgIC5vcmFuZ2UtdGV4dCB7XG4gICAgICAgIGNvbG9yOiBcIiNGRjBGMEZcIlxuICAgIH1cblxuICAgIC50ZW1wLXN0eWxlIHtcbiAgICAgICAgY29sb3I6IGRpbWdyZXk7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuXG4gICAgfVxuPC9zdHlsZT4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbi50ZXh0LWRpc3BsYXktc3R5bGVbZGF0YS12LTc2M2RiOTdiXSB7XFxuICAgIHBhZGRpbmc6IDEwO1xcbiAgICBmb250LXNpemU6IDUwO1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgbGluZS1oZWlnaHQ6IC0xMDtcXG59XFxuLmRheS10ZXh0W2RhdGEtdi03NjNkYjk3Yl0ge1xcbiAgICBmb250LXNpemU6IDMwO1xcbiAgICBjb2xvcjogYmxhY2s7XFxuICAgIGZvbnQtd2VpZ2h0OiAyMDA7XFxufVxcbi5vcmFuZ2UtdGV4dFtkYXRhLXYtNzYzZGI5N2JdIHtcXG4gICAgY29sb3I6IFxcXCIjRkYwRjBGXFxcIlxcbn1cXG4udGVtcC1zdHlsZVtkYXRhLXYtNzYzZGI5N2JdIHtcXG4gICAgY29sb3I6IGRpbWdyZXk7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cbiAgICBjb25zdCBhcHBsaWNhdGlvbiA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCIpO1xuICAgIHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3N0eWxpbmcvc3R5bGUtc2NvcGVcIik7XG5cbiAgICBleHBvcnRzLmZvckVhY2goY3NzRXhwb3J0ID0+IHtcbiAgICAgICAgaWYgKGNzc0V4cG9ydC5sZW5ndGggPiAxICYmIGNzc0V4cG9ydFsxXSkge1xuICAgICAgICAgICAgLy8gYXBwbHlpbmcgdGhlIHNlY29uZCBpdGVtIG9mIHRoZSBleHBvcnQgYXMgaXQgY29udGFpbnMgdGhlIGNzcyBjb250ZW50c1xuICAgICAgICAgICAgYXBwbGljYXRpb24uYWRkQ3NzKGNzc0V4cG9ydFsxXSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICA7XG4gICAgaWYgKG1vZHVsZS5ob3QpIHtcbiAgICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoKTtcbiAgICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKCgpID0+IHtcbiAgICAgICAgICAgIGdsb2JhbC5obXJSZWZyZXNoKHsgdHlwZTogJ3N0eWxlJywgcGF0aDogJy4vY29tcG9uZW50cy9IZWxsb1dvcmxkLnZ1ZScgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcIlBhZ2VcIixcbiAgICB7IG9uOiB7IGxvYWRlZDogX3ZtLm9uTG9hZGVkIH0gfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJHcmlkTGF5b3V0XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgY29sdW1uczogXCIqXCIsIHJvd3M6IFwiYXV0bywqLGF1dG9cIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiRmxleGJveExheW91dFwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBhdHRyczogeyBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIiwgcm93OiBcIjBcIiB9LFxuICAgICAgICAgICAgICBvbjogeyB0YXA6IF92bS5vblRhcE9mQ2l0eSB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgaW9zT3ZlcmZsb3dTYWZlQXJlYTogXCJ0cnVlXCIsXG4gICAgICAgICAgICAgICAgICAgIG9yaWVudGF0aW9uOiBcImhvcml6b250YWxcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJJbWFnZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgc3JjOlxuICAgICAgICAgICAgICAgICAgICAgICAgXCJodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmN1cnJlbnRXZWF0aGVyRGF0YS5jb25kaXRpb25JY29uICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQDJ4LnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBcIjEwMFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGhvcml6b250YWxBbGlnbm1lbnQ6IFwibGVmdFwiLFxuICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbjogXCIyMCAwIDIwIC0xMFwiLFxuICAgICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsQWxpZ25tZW50OiBcIm1pZGRsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjEwMFwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImRheS10ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dDogX3ZtLmN1cnJlbnRXZWF0aGVyRGF0YS5jaXR5LFxuICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogXCIxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWdubWVudDogXCJsZWZ0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgdmVydGljYWxBbGlnbm1lbnQ6IFwibWlkZGxlXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJHcmlkTGF5b3V0XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgY29sdW1uczogXCJhdXRvXCIsXG4gICAgICAgICAgICAgICAgaG9yaXpvbnRhbEFsaWdubWVudDogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICByb3c6IFwiMVwiLFxuICAgICAgICAgICAgICAgIHJvd3M6IFwiKlwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHZlcnRpY2FsQWxpZ25tZW50OiBcImNlbnRlclwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGVtcC1zdHlsZVwiLFxuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBfdm0uY3VycmVudFdlYXRoZXJEYXRhLnRlbXBlcmF0dXJlQ29sb3IsXG4gICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IF92bS50ZW1wZXJhdHVyZUZvbnRTaXplLFxuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IF92bS5nZXRUZW1wZXJhdHVyZVRleHQoKSxcbiAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbm1lbnQ6IFwiY2VudGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZGF5LXRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OlxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmN1cnJlbnRXZWF0aGVyRGF0YS5jdXJyZW50RGF5ICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiLCBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uY3VycmVudFdlYXRoZXJEYXRhLmN1cnJlbnREYXRlLFxuICAgICAgICAgICAgICAgICAgICAgIHJvdzogXCIxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWdubWVudDogXCJjZW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBcIipcIixcbiAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206IFwiMjBcIixcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjIwXCIsXG4gICAgICAgICAgICAgICAgcm93OiBcIjJcIixcbiAgICAgICAgICAgICAgICByb3dzOiBcIipcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0ZXh0LWRpc3BsYXktc3R5bGVcIixcbiAgICAgICAgICAgICAgICBhdHRyczogeyBpb3NPdmVyZmxvd1NhZmVBcmVhOiBcInRydWVcIiwgdGV4dFdyYXA6IFwidHJ1ZVwiIH0sXG4gICAgICAgICAgICAgICAgb246IHsgbG9hZGVkOiBfdm0ub25Ub2RheUxhYmVsTG9hZGVkIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYXBwLmNzc1wiOiBcIi4vYXBwLmNzc1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuLyBzeW5jIF5cXFxcLlxcXFwvYXBwXFxcXC4oY3NzfHNjc3N8bGVzc3xzYXNzKSRcIjsiLCJ2YXIgbWFwID0ge1xuXHRcIi4vYXBwLmNzc1wiOiBcIi4vYXBwLmNzc1wiLFxuXHRcIi4vYXBwLmpzXCI6IFwiLi9hcHAuanNcIixcblx0XCIuL25hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvbi9nZW9sb2NhdGlvbi5jb21tb24uanNcIjogXCIuL25hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvbi9nZW9sb2NhdGlvbi5jb21tb24uanNcIixcblx0XCIuL25hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvbi9nZW9sb2NhdGlvbi5qc1wiOiBcIi4vbmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uL2dlb2xvY2F0aW9uLmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vIHN5bmMgcmVjdXJzaXZlICg/PCFcXFxcYkFwcF9SZXNvdXJjZXNcXFxcYi4qKVxcXFwuKHhtbHxjc3N8anN8KD88IVxcXFwuZFxcXFwuKXRzfCg/PCFcXFxcYl9bXFxcXHctXSpcXFxcLilzY3NzKSRcIjsiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcbmV4cG9ydHMuaShyZXF1aXJlKFwiLSEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLTIhbmF0aXZlc2NyaXB0LXRoZW1lLWNvcmUvY3NzL2NvcmUubGlnaHQuY3NzXCIpLCBcIlwiKTtcblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKlxcbkluIE5hdGl2ZVNjcmlwdCwgdGhlIGFwcC5jc3MgZmlsZSBpcyB3aGVyZSB5b3UgcGxhY2UgQ1NTIHJ1bGVzIHRoYXRcXG55b3Ugd291bGQgbGlrZSB0byBhcHBseSB0byB5b3VyIGVudGlyZSBhcHBsaWNhdGlvbi4gQ2hlY2sgb3V0XFxuaHR0cDovL2RvY3MubmF0aXZlc2NyaXB0Lm9yZy91aS9zdHlsaW5nIGZvciBhIGZ1bGwgbGlzdCBvZiB0aGUgQ1NTXFxuc2VsZWN0b3JzIGFuZCBwcm9wZXJ0aWVzIHlvdSBjYW4gdXNlIHRvIHN0eWxlIFVJIGNvbXBvbmVudHMuXFxuXFxuLypcXG5JbiBtYW55IGNhc2VzIHlvdSBtYXkgd2FudCB0byB1c2UgdGhlIE5hdGl2ZVNjcmlwdCBjb3JlIHRoZW1lIGluc3RlYWRcXG5vZiB3cml0aW5nIHlvdXIgb3duIENTUyBydWxlcy4gRm9yIGEgZnVsbCBsaXN0IG9mIGNsYXNzIG5hbWVzIGluIHRoZSB0aGVtZVxcbnJlZmVyIHRvIGh0dHA6Ly9kb2NzLm5hdGl2ZXNjcmlwdC5vcmcvdWkvdGhlbWUuXFxuVGhlIGltcG9ydGVkIENTUyBydWxlcyBtdXN0IHByZWNlZGUgYWxsIG90aGVyIHR5cGVzIG9mIHJ1bGVzLlxcbiovXFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuO1xuICAgIGlmIChtb2R1bGUuaG90KSB7XG4gICAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG4gICAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZSgoKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwuaG1yUmVmcmVzaCh7IHR5cGU6ICdzdHlsZScsIHBhdGg6ICcuL2FwcC5jc3MnIH0pO1xuICAgICAgICB9KVxuICAgIH1cbiIsImltcG9ydCBWdWUgZnJvbSAnbmF0aXZlc2NyaXB0LXZ1ZSc7XG5cbmltcG9ydCBIZWxsb1dvcmxkIGZyb20gJy4vY29tcG9uZW50cy9IZWxsb1dvcmxkJztcblxuLy8gVW5jb21tbWVudCB0aGUgZm9sbG93aW5nIHRvIHNlZSBOYXRpdmVTY3JpcHQtVnVlIG91dHB1dCBsb2dzXG5WdWUuY29uZmlnLnNpbGVudCA9IGZhbHNlO1xuXG5uZXcgVnVlKHtcblxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxGcmFtZT5cbiAgICAgICAgICAgIDxIZWxsb1dvcmxkIC8+XG4gICAgICAgIDwvRnJhbWU+YCxcblxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgSGVsbG9Xb3JsZFxuICAgIH1cbn0pLiRzdGFydCgpOyIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vSGVsbG9Xb3JsZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NzYzZGI5N2Imc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vSGVsbG9Xb3JsZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0hlbGxvV29ybGQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL0hlbGxvV29ybGQudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NzYzZGI5N2Imc2NvcGVkPXRydWUmbGFuZz1jc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjc2M2RiOTdiXCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL3NhbmdyYW1tb2hpdGUvT25lRHJpdmUvRGV2ZWxvcG1lbnQvQXBwIFByb2plY3RzL05hdGl2ZVNjcmlwdC93ZWF0aGVyLWFwcC9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCc3NjNkYjk3YicpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc3NjNkYjk3YicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc3NjNkYjk3YicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vSGVsbG9Xb3JsZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NzYzZGI5N2Imc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNzYzZGI5N2InLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcImNvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vSGVsbG9Xb3JsZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9IZWxsb1dvcmxkLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9zdHlsZS1ob3QtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svYXBwbHktY3NzLWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLTIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vSGVsbG9Xb3JsZC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD03NjNkYjk3YiZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL3N0eWxlLWhvdC1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9hcHBseS1jc3MtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtMiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9IZWxsb1dvcmxkLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTc2M2RiOTdiJnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0hlbGxvV29ybGQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTc2M2RiOTdiJnNjb3BlZD10cnVlJlwiIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgTG9jYXRpb25CYXNlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMb2NhdGlvbkJhc2UoKSB7XG4gICAgfVxuICAgIHJldHVybiBMb2NhdGlvbkJhc2U7XG59KCkpO1xuZXhwb3J0cy5Mb2NhdGlvbkJhc2UgPSBMb2NhdGlvbkJhc2U7XG5leHBvcnRzLmRlZmF1bHRHZXRMb2NhdGlvblRpbWVvdXQgPSA1ICogNjAgKiAxMDAwO1xuZXhwb3J0cy5taW5SYW5nZVVwZGF0ZSA9IDAuMTtcbmV4cG9ydHMubWluVGltZVVwZGF0ZSA9IDEgKiA2MCAqIDEwMDA7XG5leHBvcnRzLmZhc3Rlc3RUaW1lVXBkYXRlID0gNSAqIDEwMDA7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBlbnVtc18xID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvZW51bXNcIik7XG52YXIgdGltZXJfMSA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3RpbWVyXCIpO1xudmFyIGFwcGxpY2F0aW9uXzEgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3V0aWxzL3V0aWxzXCIpO1xudmFyIGdlb2xvY2F0aW9uX2NvbW1vbl8xID0gcmVxdWlyZShcIi4vZ2VvbG9jYXRpb24uY29tbW9uXCIpO1xudmFyIFBsYXRmb3JtID0gcmVxdWlyZShcInBsYXRmb3JtXCIpO1xudmFyIGxvY2F0aW9uTWFuYWdlcnMgPSB7fTtcbnZhciBsb2NhdGlvbkxpc3RlbmVycyA9IHt9O1xudmFyIHdhdGNoSWQgPSAwO1xudmFyIGF0dGFjaGVkRm9yRXJyb3JIYW5kbGluZyA9IGZhbHNlO1xudmFyIExvY2F0aW9uTGlzdGVuZXJJbXBsID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTG9jYXRpb25MaXN0ZW5lckltcGwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTG9jYXRpb25MaXN0ZW5lckltcGwoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgTG9jYXRpb25MaXN0ZW5lckltcGwuaW5pdFdpdGhMb2NhdGlvbkVycm9yID0gZnVuY3Rpb24gKHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3IpIHtcbiAgICAgICAgdmFyIGxpc3RlbmVyID0gTG9jYXRpb25MaXN0ZW5lckltcGwubmV3KCk7XG4gICAgICAgIHdhdGNoSWQrKztcbiAgICAgICAgbGlzdGVuZXIuaWQgPSB3YXRjaElkO1xuICAgICAgICBsaXN0ZW5lci5fb25Mb2NhdGlvbiA9IHN1Y2Nlc3NDYWxsYmFjaztcbiAgICAgICAgbGlzdGVuZXIuX29uRXJyb3IgPSBlcnJvcjtcbiAgICAgICAgcmV0dXJuIGxpc3RlbmVyO1xuICAgIH07XG4gICAgTG9jYXRpb25MaXN0ZW5lckltcGwuaW5pdFdpdGhQcm9taXNlQ2FsbGJhY2tzID0gZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCwgYXV0aG9yaXplQWx3YXlzKSB7XG4gICAgICAgIGlmIChhdXRob3JpemVBbHdheXMgPT09IHZvaWQgMCkgeyBhdXRob3JpemVBbHdheXMgPSBmYWxzZTsgfVxuICAgICAgICB2YXIgbGlzdGVuZXIgPSBMb2NhdGlvbkxpc3RlbmVySW1wbC5uZXcoKTtcbiAgICAgICAgd2F0Y2hJZCsrO1xuICAgICAgICBsaXN0ZW5lci5pZCA9IHdhdGNoSWQ7XG4gICAgICAgIGxpc3RlbmVyLl9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgbGlzdGVuZXIuX3JlamVjdCA9IHJlamVjdDtcbiAgICAgICAgbGlzdGVuZXIuYXV0aG9yaXplQWx3YXlzID0gYXV0aG9yaXplQWx3YXlzO1xuICAgICAgICByZXR1cm4gbGlzdGVuZXI7XG4gICAgfTtcbiAgICBMb2NhdGlvbkxpc3RlbmVySW1wbC5wcm90b3R5cGUubG9jYXRpb25NYW5hZ2VyRGlkVXBkYXRlTG9jYXRpb25zID0gZnVuY3Rpb24gKG1hbmFnZXIsIGxvY2F0aW9ucykge1xuICAgICAgICBpZiAodGhpcy5fb25Mb2NhdGlvbikge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGNvdW50ID0gbG9jYXRpb25zLmNvdW50OyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBsb2NhdGlvbl8xID0gbG9jYXRpb25Gcm9tQ0xMb2NhdGlvbihsb2NhdGlvbnMub2JqZWN0QXRJbmRleChpKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25Mb2NhdGlvbihsb2NhdGlvbl8xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTG9jYXRpb25MaXN0ZW5lckltcGwucHJvdG90eXBlLmxvY2F0aW9uTWFuYWdlckRpZEZhaWxXaXRoRXJyb3IgPSBmdW5jdGlvbiAobWFuYWdlciwgZXJyb3IpIHtcbiAgICAgICAgaWYgKHRoaXMuX29uRXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuX29uRXJyb3IobmV3IEVycm9yKGVycm9yLmxvY2FsaXplZERlc2NyaXB0aW9uKSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIExvY2F0aW9uTGlzdGVuZXJJbXBsLnByb3RvdHlwZS5sb2NhdGlvbk1hbmFnZXJEaWRDaGFuZ2VBdXRob3JpemF0aW9uU3RhdHVzID0gZnVuY3Rpb24gKG1hbmFnZXIsIHN0YXR1cykge1xuICAgICAgICBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9yZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9jYXRpb25Nb25pdG9yLnN0b3BMb2NhdGlvbk1vbml0b3JpbmcodGhpcy5pZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlamVjdChuZXcgRXJyb3IoXCJBdXRob3JpemF0aW9uIERlbmllZC5cIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgICBMb2NhdGlvbk1vbml0b3Iuc3RvcExvY2F0aW9uTW9uaXRvcmluZyh0aGlzLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIExvY2F0aW9uTGlzdGVuZXJJbXBsLk9iakNQcm90b2NvbHMgPSBbQ0xMb2NhdGlvbk1hbmFnZXJEZWxlZ2F0ZV07XG4gICAgcmV0dXJuIExvY2F0aW9uTGlzdGVuZXJJbXBsO1xufShOU09iamVjdCkpO1xuZnVuY3Rpb24gbG9jYXRpb25Gcm9tQ0xMb2NhdGlvbihjbExvY2F0aW9uKSB7XG4gICAgdmFyIGxvY2F0aW9uID0gbmV3IExvY2F0aW9uKCk7XG4gICAgbG9jYXRpb24ubGF0aXR1ZGUgPSBjbExvY2F0aW9uLmNvb3JkaW5hdGUubGF0aXR1ZGU7XG4gICAgbG9jYXRpb24ubG9uZ2l0dWRlID0gY2xMb2NhdGlvbi5jb29yZGluYXRlLmxvbmdpdHVkZTtcbiAgICBsb2NhdGlvbi5hbHRpdHVkZSA9IGNsTG9jYXRpb24uYWx0aXR1ZGU7XG4gICAgbG9jYXRpb24uaG9yaXpvbnRhbEFjY3VyYWN5ID0gY2xMb2NhdGlvbi5ob3Jpem9udGFsQWNjdXJhY3k7XG4gICAgbG9jYXRpb24udmVydGljYWxBY2N1cmFjeSA9IGNsTG9jYXRpb24udmVydGljYWxBY2N1cmFjeTtcbiAgICBsb2NhdGlvbi5zcGVlZCA9IGNsTG9jYXRpb24uc3BlZWQ7XG4gICAgbG9jYXRpb24uZGlyZWN0aW9uID0gY2xMb2NhdGlvbi5jb3Vyc2U7XG4gICAgdmFyIHRpbWVJbnRlcnZhbFNpbmNlMTk3MCA9IE5TRGF0ZS5kYXRlV2l0aFRpbWVJbnRlcnZhbFNpbmNlRGF0ZSgwLCBjbExvY2F0aW9uLnRpbWVzdGFtcCkudGltZUludGVydmFsU2luY2UxOTcwO1xuICAgIGxvY2F0aW9uLnRpbWVzdGFtcCA9IG5ldyBEYXRlKHRpbWVJbnRlcnZhbFNpbmNlMTk3MCAqIDEwMDApO1xuICAgIGxvY2F0aW9uLmlvcyA9IGNsTG9jYXRpb247XG4gICAgcmV0dXJuIGxvY2F0aW9uO1xufVxuZnVuY3Rpb24gY2xMb2NhdGlvbkZyb21Mb2NhdGlvbihsb2NhdGlvbikge1xuICAgIHZhciBoQWNjdXJhY3kgPSBsb2NhdGlvbi5ob3Jpem9udGFsQWNjdXJhY3kgPyBsb2NhdGlvbi5ob3Jpem9udGFsQWNjdXJhY3kgOiAtMTtcbiAgICB2YXIgdkFjY3VyYWN5ID0gbG9jYXRpb24udmVydGljYWxBY2N1cmFjeSA/IGxvY2F0aW9uLnZlcnRpY2FsQWNjdXJhY3kgOiAtMTtcbiAgICB2YXIgc3BlZWQgPSBsb2NhdGlvbi5zcGVlZCA/IGxvY2F0aW9uLnNwZWVkIDogLTE7XG4gICAgdmFyIGNvdXJzZSA9IGxvY2F0aW9uLmRpcmVjdGlvbiA/IGxvY2F0aW9uLmRpcmVjdGlvbiA6IC0xO1xuICAgIHZhciBhbHRpdHVkZSA9IGxvY2F0aW9uLmFsdGl0dWRlID8gbG9jYXRpb24uYWx0aXR1ZGUgOiAtMTtcbiAgICB2YXIgdGltZXN0YW1wID0gbG9jYXRpb24udGltZXN0YW1wID8gbG9jYXRpb24udGltZXN0YW1wIDogbnVsbDtcbiAgICB2YXIgaW9zTG9jYXRpb24gPSBDTExvY2F0aW9uLmFsbG9jKClcbiAgICAgICAgLmluaXRXaXRoQ29vcmRpbmF0ZUFsdGl0dWRlSG9yaXpvbnRhbEFjY3VyYWN5VmVydGljYWxBY2N1cmFjeUNvdXJzZVNwZWVkVGltZXN0YW1wKENMTG9jYXRpb25Db29yZGluYXRlMkRNYWtlKGxvY2F0aW9uLmxhdGl0dWRlLCBsb2NhdGlvbi5sb25naXR1ZGUpLCBhbHRpdHVkZSwgaEFjY3VyYWN5LCB2QWNjdXJhY3ksIGNvdXJzZSwgc3BlZWQsIHRpbWVzdGFtcCk7XG4gICAgcmV0dXJuIGlvc0xvY2F0aW9uO1xufVxuZnVuY3Rpb24gZXJyb3JIYW5kbGVyKGVyckRhdGEpIHtcbiAgICB3aGlsZSAod2F0Y2hJZCAhPT0gMCkge1xuICAgICAgICBjbGVhcldhdGNoKHdhdGNoSWQpO1xuICAgICAgICB3YXRjaElkLS07XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0VmVyc2lvbk1haigpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoUGxhdGZvcm0uZGV2aWNlLm9zVmVyc2lvbi5zcGxpdChcIi5cIilbMF0pO1xufVxuZnVuY3Rpb24gZ2V0Q3VycmVudExvY2F0aW9uKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBlbmFibGVMb2NhdGlvblJlcXVlc3QoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMudGltZW91dCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHZhciBsYXN0TG9jYXRpb24gPSBMb2NhdGlvbk1vbml0b3IuZ2V0TGFzdEtub3duTG9jYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAobGFzdExvY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5tYXhpbXVtQWdlID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdExvY2F0aW9uLnRpbWVzdGFtcC52YWx1ZU9mKCkgKyBvcHRpb25zLm1heGltdW1BZ2UgPiBuZXcgRGF0ZSgpLnZhbHVlT2YoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobGFzdExvY2F0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJMYXN0IGtub3duIGxvY2F0aW9uIHRvbyBvbGQhXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobGFzdExvY2F0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIlRoZXJlIGlzIG5vIGxhc3Qga25vd24gbG9jYXRpb24hXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgdGltZXJJZF8xO1xuICAgICAgICAgICAgICAgIHZhciBsb2NMaXN0ZW5lcl8xO1xuICAgICAgICAgICAgICAgIHZhciBpbml0TG9jYXRpb25fMTtcbiAgICAgICAgICAgICAgICB2YXIgc3RvcFRpbWVyQW5kTW9uaXRvcl8xID0gZnVuY3Rpb24gKGxvY0xpc3RlbmVySWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpbWVySWRfMSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lcl8xLmNsZWFyVGltZW91dCh0aW1lcklkXzEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIExvY2F0aW9uTW9uaXRvci5zdG9wTG9jYXRpb25Nb25pdG9yaW5nKGxvY0xpc3RlbmVySWQpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3NDYWxsYmFjayA9IGZ1bmN0aW9uIChsb2NhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0VmVyc2lvbk1haigpIDwgOSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm1heGltdW1BZ2UgPT09IFwibnVtYmVyXCIgJiYgbG9jYXRpb24udGltZXN0YW1wLnZhbHVlT2YoKSArIG9wdGlvbnMubWF4aW11bUFnZSA8IG5ldyBEYXRlKCkudmFsdWVPZigpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGVzaXJlZEFjY3VyYWN5ICE9PSBlbnVtc18xLkFjY3VyYWN5LmFueSAmJiAhaW5pdExvY2F0aW9uXzEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0TG9jYXRpb25fMSA9IGxvY2F0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdG9wVGltZXJBbmRNb25pdG9yXzEobG9jTGlzdGVuZXJfMS5pZCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobG9jYXRpb24pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbG9jTGlzdGVuZXJfMSA9IExvY2F0aW9uTGlzdGVuZXJJbXBsLmluaXRXaXRoTG9jYXRpb25FcnJvcihzdWNjZXNzQ2FsbGJhY2ssIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdldFZlcnNpb25NYWooKSA+PSA5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2NhdGlvbk1vbml0b3IucmVxdWVzdExvY2F0aW9uKG9wdGlvbnMsIGxvY0xpc3RlbmVyXzEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9jYXRpb25Nb25pdG9yLnN0YXJ0TG9jYXRpb25Nb25pdG9yaW5nKG9wdGlvbnMsIGxvY0xpc3RlbmVyXzEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0b3BUaW1lckFuZE1vbml0b3JfMShsb2NMaXN0ZW5lcl8xLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMudGltZW91dCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgICAgICAgICB0aW1lcklkXzEgPSB0aW1lcl8xLnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9jYXRpb25Nb25pdG9yLnN0b3BMb2NhdGlvbk1vbml0b3JpbmcobG9jTGlzdGVuZXJfMS5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiVGltZW91dCB3aGlsZSBzZWFyY2hpbmcgZm9yIGxvY2F0aW9uIVwiKSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIG9wdGlvbnMudGltZW91dCB8fCBnZW9sb2NhdGlvbl9jb21tb25fMS5kZWZhdWx0R2V0TG9jYXRpb25UaW1lb3V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgfSk7XG59XG5leHBvcnRzLmdldEN1cnJlbnRMb2NhdGlvbiA9IGdldEN1cnJlbnRMb2NhdGlvbjtcbmZ1bmN0aW9uIHdhdGNoTG9jYXRpb24oc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgaWYgKCFhdHRhY2hlZEZvckVycm9ySGFuZGxpbmcpIHtcbiAgICAgICAgYXR0YWNoZWRGb3JFcnJvckhhbmRsaW5nID0gdHJ1ZTtcbiAgICAgICAgYXBwbGljYXRpb25fMS5vbihhcHBsaWNhdGlvbl8xLnVuY2F1Z2h0RXJyb3JFdmVudCwgZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIH1cbiAgICB2YXIgem9uZWRTdWNjZXNzQ2FsbGJhY2sgPSBnbG9iYWwuem9uZWRDYWxsYmFjayhzdWNjZXNzQ2FsbGJhY2spO1xuICAgIHZhciB6b25lZEVycm9yQ2FsbGJhY2sgPSBnbG9iYWwuem9uZWRDYWxsYmFjayhlcnJvckNhbGxiYWNrKTtcbiAgICB2YXIgbG9jTGlzdGVuZXIgPSBMb2NhdGlvbkxpc3RlbmVySW1wbC5pbml0V2l0aExvY2F0aW9uRXJyb3Ioem9uZWRTdWNjZXNzQ2FsbGJhY2ssIHpvbmVkRXJyb3JDYWxsYmFjayk7XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGlvc0xvY01hbmFnZXIgPSBnZXRJT1NMb2NhdGlvbk1hbmFnZXIobG9jTGlzdGVuZXIsIG9wdGlvbnMpO1xuICAgICAgICBpb3NMb2NNYW5hZ2VyLnN0YXJ0VXBkYXRpbmdMb2NhdGlvbigpO1xuICAgICAgICByZXR1cm4gbG9jTGlzdGVuZXIuaWQ7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIExvY2F0aW9uTW9uaXRvci5zdG9wTG9jYXRpb25Nb25pdG9yaW5nKGxvY0xpc3RlbmVyLmlkKTtcbiAgICAgICAgem9uZWRFcnJvckNhbGxiYWNrKGUpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG5leHBvcnRzLndhdGNoTG9jYXRpb24gPSB3YXRjaExvY2F0aW9uO1xuZnVuY3Rpb24gY2xlYXJXYXRjaChfd2F0Y2hJZCkge1xuICAgIExvY2F0aW9uTW9uaXRvci5zdG9wTG9jYXRpb25Nb25pdG9yaW5nKF93YXRjaElkKTtcbn1cbmV4cG9ydHMuY2xlYXJXYXRjaCA9IGNsZWFyV2F0Y2g7XG5mdW5jdGlvbiBlbmFibGVMb2NhdGlvblJlcXVlc3QoYWx3YXlzLCBpb3NPcGVuU2V0dGluZ3NJZkxvY2F0aW9uSGFzQmVlbkRlbmllZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBsb2NhdGlvbklzRW5hYmxlZCA9IF9pc0VuYWJsZWQoKTtcbiAgICAgICAgaWYgKGxvY2F0aW9uSXNFbmFibGVkKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgc3RhdHVzXzEgPSBnZXRJT1NMb2NhdGlvbk1hbmFnZXJTdGF0dXMoKTtcbiAgICAgICAgICAgIGlmIChzdGF0dXNfMSA9PT0gMiAmJlxuICAgICAgICAgICAgICAgIGlvc09wZW5TZXR0aW5nc0lmTG9jYXRpb25IYXNCZWVuRGVuaWVkKSB7XG4gICAgICAgICAgICAgICAgdXRpbHMuaW9zLmdldHRlcihVSUFwcGxpY2F0aW9uLCBVSUFwcGxpY2F0aW9uLnNoYXJlZEFwcGxpY2F0aW9uKS5vcGVuVVJMKE5TVVJMLlVSTFdpdGhTdHJpbmcoVUlBcHBsaWNhdGlvbk9wZW5TZXR0aW5nc1VSTFN0cmluZykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gTG9jYXRpb25MaXN0ZW5lckltcGwuaW5pdFdpdGhQcm9taXNlQ2FsbGJhY2tzKHJlc29sdmUsIHJlamVjdCwgYWx3YXlzKTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWFuYWdlciA9IGdldElPU0xvY2F0aW9uTWFuYWdlcihsaXN0ZW5lciwgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhbHdheXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hbmFnZXIucmVxdWVzdEFsd2F5c0F1dGhvcml6YXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hbmFnZXIucmVxdWVzdFdoZW5JblVzZUF1dGhvcml6YXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBMb2NhdGlvbk1vbml0b3Iuc3RvcExvY2F0aW9uTW9uaXRvcmluZyhsaXN0ZW5lci5pZCk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydHMuZW5hYmxlTG9jYXRpb25SZXF1ZXN0ID0gZW5hYmxlTG9jYXRpb25SZXF1ZXN0O1xuZnVuY3Rpb24gX2lzRW5hYmxlZCgpIHtcbiAgICBpZiAoQ0xMb2NhdGlvbk1hbmFnZXIubG9jYXRpb25TZXJ2aWNlc0VuYWJsZWQoKSkge1xuICAgICAgICB2YXIgc3RhdHVzXzIgPSBnZXRJT1NMb2NhdGlvbk1hbmFnZXJTdGF0dXMoKTtcbiAgICAgICAgcmV0dXJuIChzdGF0dXNfMiA9PT0gNFxuICAgICAgICAgICAgfHwgc3RhdHVzXzIgPT09IDNcbiAgICAgICAgICAgIHx8IHN0YXR1c18yID09PSAzKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gaXNFbmFibGVkKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgaXNFbmFibGVkUmVzdWx0ID0gX2lzRW5hYmxlZCgpO1xuICAgICAgICByZXNvbHZlKGlzRW5hYmxlZFJlc3VsdCk7XG4gICAgfSk7XG59XG5leHBvcnRzLmlzRW5hYmxlZCA9IGlzRW5hYmxlZDtcbmZ1bmN0aW9uIGdldElPU0xvY2F0aW9uTWFuYWdlclN0YXR1cygpIHtcbiAgICByZXR1cm4gQ0xMb2NhdGlvbk1hbmFnZXIuYXV0aG9yaXphdGlvblN0YXR1cygpO1xufVxuZXhwb3J0cy5nZXRJT1NMb2NhdGlvbk1hbmFnZXJTdGF0dXMgPSBnZXRJT1NMb2NhdGlvbk1hbmFnZXJTdGF0dXM7XG5mdW5jdGlvbiBkaXN0YW5jZShsb2MxLCBsb2MyKSB7XG4gICAgaWYgKCFsb2MxLmlvcykge1xuICAgICAgICBsb2MxLmlvcyA9IGNsTG9jYXRpb25Gcm9tTG9jYXRpb24obG9jMSk7XG4gICAgfVxuICAgIGlmICghbG9jMi5pb3MpIHtcbiAgICAgICAgbG9jMi5pb3MgPSBjbExvY2F0aW9uRnJvbUxvY2F0aW9uKGxvYzIpO1xuICAgIH1cbiAgICByZXR1cm4gbG9jMS5pb3MuZGlzdGFuY2VGcm9tTG9jYXRpb24obG9jMi5pb3MpO1xufVxuZXhwb3J0cy5kaXN0YW5jZSA9IGRpc3RhbmNlO1xudmFyIExvY2F0aW9uTW9uaXRvciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTG9jYXRpb25Nb25pdG9yKCkge1xuICAgIH1cbiAgICBMb2NhdGlvbk1vbml0b3IuZ2V0TGFzdEtub3duTG9jYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpb3NMb2NhdGlvbjtcbiAgICAgICAgZm9yICh2YXIgbG9jTWFuYWdlcklkIGluIGxvY2F0aW9uTWFuYWdlcnMpIHtcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbk1hbmFnZXJzLmhhc093blByb3BlcnR5KGxvY01hbmFnZXJJZCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGVtcExvY2F0aW9uID0gbG9jYXRpb25NYW5hZ2Vyc1tsb2NNYW5hZ2VySWRdLmxvY2F0aW9uO1xuICAgICAgICAgICAgICAgIGlmICghaW9zTG9jYXRpb24gfHwgdGVtcExvY2F0aW9uLnRpbWVzdGFtcCA+IGlvc0xvY2F0aW9uLnRpbWVzdGFtcCkge1xuICAgICAgICAgICAgICAgICAgICBpb3NMb2NhdGlvbiA9IHRlbXBMb2NhdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlvc0xvY2F0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9jYXRpb25Gcm9tQ0xMb2NhdGlvbihpb3NMb2NhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxvY0xpc3RlbmVyID0gTG9jYXRpb25MaXN0ZW5lckltcGwuaW5pdFdpdGhMb2NhdGlvbkVycm9yKG51bGwpO1xuICAgICAgICBpb3NMb2NhdGlvbiA9IGdldElPU0xvY2F0aW9uTWFuYWdlcihsb2NMaXN0ZW5lciwgbnVsbCkubG9jYXRpb247XG4gICAgICAgIGlmIChpb3NMb2NhdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGxvY2F0aW9uRnJvbUNMTG9jYXRpb24oaW9zTG9jYXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgTG9jYXRpb25Nb25pdG9yLnJlcXVlc3RMb2NhdGlvbiA9IGZ1bmN0aW9uIChvcHRpb25zLCBsb2NMaXN0ZW5lcikge1xuICAgICAgICB2YXIgaW9zTG9jTWFuYWdlciA9IGdldElPU0xvY2F0aW9uTWFuYWdlcihsb2NMaXN0ZW5lciwgb3B0aW9ucyk7XG4gICAgICAgIGlvc0xvY01hbmFnZXIucmVxdWVzdExvY2F0aW9uKCk7XG4gICAgfTtcbiAgICBMb2NhdGlvbk1vbml0b3Iuc3RhcnRMb2NhdGlvbk1vbml0b3JpbmcgPSBmdW5jdGlvbiAob3B0aW9ucywgbG9jTGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIGlvc0xvY01hbmFnZXIgPSBnZXRJT1NMb2NhdGlvbk1hbmFnZXIobG9jTGlzdGVuZXIsIG9wdGlvbnMpO1xuICAgICAgICBpb3NMb2NNYW5hZ2VyLnN0YXJ0VXBkYXRpbmdMb2NhdGlvbigpO1xuICAgIH07XG4gICAgTG9jYXRpb25Nb25pdG9yLnN0b3BMb2NhdGlvbk1vbml0b3JpbmcgPSBmdW5jdGlvbiAoaW9zTG9jTWFuYWdlcklkKSB7XG4gICAgICAgIGlmIChsb2NhdGlvbk1hbmFnZXJzW2lvc0xvY01hbmFnZXJJZF0pIHtcbiAgICAgICAgICAgIGxvY2F0aW9uTWFuYWdlcnNbaW9zTG9jTWFuYWdlcklkXS5zdG9wVXBkYXRpbmdMb2NhdGlvbigpO1xuICAgICAgICAgICAgbG9jYXRpb25NYW5hZ2Vyc1tpb3NMb2NNYW5hZ2VySWRdLmRlbGVnYXRlID0gbnVsbDtcbiAgICAgICAgICAgIGRlbGV0ZSBsb2NhdGlvbk1hbmFnZXJzW2lvc0xvY01hbmFnZXJJZF07XG4gICAgICAgICAgICBkZWxldGUgbG9jYXRpb25MaXN0ZW5lcnNbaW9zTG9jTWFuYWdlcklkXTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTG9jYXRpb25Nb25pdG9yLmNyZWF0ZWlPU0xvY2F0aW9uTWFuYWdlciA9IGZ1bmN0aW9uIChsb2NMaXN0ZW5lciwgb3B0aW9ucykge1xuICAgICAgICB2YXIgaW9zTG9jTWFuYWdlciA9IG5ldyBDTExvY2F0aW9uTWFuYWdlcigpO1xuICAgICAgICBpb3NMb2NNYW5hZ2VyLmRlbGVnYXRlID0gbG9jTGlzdGVuZXI7XG4gICAgICAgIGlvc0xvY01hbmFnZXIuZGVzaXJlZEFjY3VyYWN5ID0gb3B0aW9ucyA/IG9wdGlvbnMuZGVzaXJlZEFjY3VyYWN5IDogZW51bXNfMS5BY2N1cmFjeS5oaWdoO1xuICAgICAgICBpb3NMb2NNYW5hZ2VyLmRpc3RhbmNlRmlsdGVyID0gb3B0aW9ucyA/IG9wdGlvbnMudXBkYXRlRGlzdGFuY2UgOiBnZW9sb2NhdGlvbl9jb21tb25fMS5taW5SYW5nZVVwZGF0ZTtcbiAgICAgICAgbG9jYXRpb25NYW5hZ2Vyc1tsb2NMaXN0ZW5lci5pZF0gPSBpb3NMb2NNYW5hZ2VyO1xuICAgICAgICBsb2NhdGlvbkxpc3RlbmVyc1tsb2NMaXN0ZW5lci5pZF0gPSBsb2NMaXN0ZW5lcjtcbiAgICAgICAgaWYgKGdldFZlcnNpb25NYWooKSA+PSA5KSB7XG4gICAgICAgICAgICBpb3NMb2NNYW5hZ2VyLmFsbG93c0JhY2tncm91bmRMb2NhdGlvblVwZGF0ZXMgPVxuICAgICAgICAgICAgICAgIG9wdGlvbnMgJiYgb3B0aW9ucy5pb3NBbGxvd3NCYWNrZ3JvdW5kTG9jYXRpb25VcGRhdGVzICE9IG51bGwgP1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmlvc0FsbG93c0JhY2tncm91bmRMb2NhdGlvblVwZGF0ZXMgOiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpb3NMb2NNYW5hZ2VyLnBhdXNlc0xvY2F0aW9uVXBkYXRlc0F1dG9tYXRpY2FsbHkgPVxuICAgICAgICAgICAgb3B0aW9ucyAmJiBvcHRpb25zLmlvc1BhdXNlc0xvY2F0aW9uVXBkYXRlc0F1dG9tYXRpY2FsbHkgIT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5pb3NQYXVzZXNMb2NhdGlvblVwZGF0ZXNBdXRvbWF0aWNhbGx5IDogdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGlvc0xvY01hbmFnZXI7XG4gICAgfTtcbiAgICByZXR1cm4gTG9jYXRpb25Nb25pdG9yO1xufSgpKTtcbmV4cG9ydHMuTG9jYXRpb25Nb25pdG9yID0gTG9jYXRpb25Nb25pdG9yO1xudmFyIGlvc0xvY2F0aW9uTWFuYWdlcjtcbmZ1bmN0aW9uIGdldElPU0xvY2F0aW9uTWFuYWdlcihsb2NMaXN0ZW5lciwgb3B0aW9ucykge1xuICAgIGlmICghaW9zTG9jYXRpb25NYW5hZ2VyKSB7XG4gICAgICAgIHJldHVybiBMb2NhdGlvbk1vbml0b3IuY3JlYXRlaU9TTG9jYXRpb25NYW5hZ2VyKGxvY0xpc3RlbmVyLCBvcHRpb25zKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBtYW5hZ2VyID0gbmV3IGlvc0xvY2F0aW9uTWFuYWdlcigpO1xuICAgICAgICBtYW5hZ2VyLmRlbGVnYXRlID0gbG9jTGlzdGVuZXI7XG4gICAgICAgIG1hbmFnZXIuZGVzaXJlZEFjY3VyYWN5ID0gb3B0aW9ucyA/IG9wdGlvbnMuZGVzaXJlZEFjY3VyYWN5IDogZW51bXNfMS5BY2N1cmFjeS5oaWdoO1xuICAgICAgICBtYW5hZ2VyLmRpc3RhbmNlRmlsdGVyID0gb3B0aW9ucyA/IG9wdGlvbnMudXBkYXRlRGlzdGFuY2UgOiBnZW9sb2NhdGlvbl9jb21tb25fMS5taW5SYW5nZVVwZGF0ZTtcbiAgICAgICAgbG9jYXRpb25NYW5hZ2Vyc1tsb2NMaXN0ZW5lci5pZF0gPSBtYW5hZ2VyO1xuICAgICAgICBsb2NhdGlvbkxpc3RlbmVyc1tsb2NMaXN0ZW5lci5pZF0gPSBsb2NMaXN0ZW5lcjtcbiAgICAgICAgcmV0dXJuIG1hbmFnZXI7XG4gICAgfVxufVxuZnVuY3Rpb24gc2V0Q3VzdG9tTG9jYXRpb25NYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBpb3NMb2NhdGlvbk1hbmFnZXIgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBtYW5hZ2VyOyB9O1xufVxuZXhwb3J0cy5zZXRDdXN0b21Mb2NhdGlvbk1hbmFnZXIgPSBzZXRDdXN0b21Mb2NhdGlvbk1hbmFnZXI7XG52YXIgTG9jYXRpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhMb2NhdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBMb2NhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTG9jYXRpb247XG59KGdlb2xvY2F0aW9uX2NvbW1vbl8xLkxvY2F0aW9uQmFzZSkpO1xuZXhwb3J0cy5Mb2NhdGlvbiA9IExvY2F0aW9uO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==