<template>
    <Page @loaded="onLoaded">
        <GridLayout columns="*" rows="auto,*,auto">
            <FlexboxLayout @tap="onTapOfCity" justifyContent="center" row="0">
                <StackLayout iosOverflowSafeArea="true" orientation="horizontal">
                    <Image :src="`https://openweathermap.org/img/wn/${currentWeatherData.conditionIcon}@2x.png`"
                           column="0"
                           height="100"
                           horizontalAlignment="left"
                           margin="20 0 20 -10" verticalAlignment="middle"

                           width="100"></Image>
                    <Label :text="currentWeatherData.city" class="day-text"
                           column="1" textAlignment="left"
                           verticalAlignment="middle"></Label>
                </StackLayout>
            </FlexboxLayout>

            <GridLayout columns="auto" horizontalAlignment="center" row="1"
                        rows="*">
                <StackLayout verticalAlignment="center">
                    <Label :color="currentWeatherData.temperatureColor" :fontSize="temperatureFontSize"
                           :text="getTemperatureText()"
                           class="temp-style"
                           row="0"
                           textAlignment="center">
                    </Label>
                    <Label :text="`${currentWeatherData.currentDay}, ${currentWeatherData.currentDate}`"
                           class="day-text"
                           row="1" textAlignment="center"></Label>
                </StackLayout>
            </GridLayout>
            <GridLayout columns="*" marginBottom="20" padding="20" row="2"
                        rows="*">
                <Label @loaded="onTodayLabelLoaded" class="text-display-style"
                       iosOverflowSafeArea="true" textWrap="true">
                </Label>
            </GridLayout>
        </GridLayout>


    </Page>
</template>

<script>
    const Geolocation = require("nativescript-geolocation");
    const Accuracy = require("tns-core-modules/ui/enums");
    const http = require("tns-core-modules/http");

    export default {
        filters: {
            lowercase: function (value) {
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
                const formattedString = require("text/formatted-string");
                this.labelObject.formattedText = new formattedString.FormattedString();

            },
            onTapOfCity() {
                let randomCityIndex = Math.floor(Math.random() * this.listOfCitites.length);
                let currentCity = this.listOfCitites[randomCityIndex];
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
                    const formattedString = require("text/formatted-string");
                    const formattedSpan = require("text/span");
                    const ColorModule = require("tns-core-modules/color");
                    let fstringToSend = new formattedString.FormattedString();

                    stringsToFormat.forEach((currentStrFragment, idx) => {
                        let fspan = new formattedSpan.Span();

                        fspan.text = currentStrFragment.text;

                        switch (currentStrFragment.type) {
                            case "normal":
                                fspan.color = new ColorModule.Color(
                                    "black");
                                break;
                            default:
                                console.log(
                                    "CUSTOM setting anything");
                                fspan.color = new ColorModule.Color(
                                    currentStrFragment.type
                                );
                                // fspan.class = "orange-text";
                                break;
                        }
                        fstringToSend.spans.push(fspan);
                    });
                    //console.log(fstringToSend);
                    return fstringToSend;
                } else {
                    return;
                }
            },
            onLoaded() {
            },
            getTemperatureText() {
                if (this.currentWeatherData.temperature == null) {
                    this.temperatureFontSize = 60;
                    return "Loading ...";

                } else {
                    this.temperatureFontSize = 90;
                    return `${this.currentWeatherData.temperature}°C`;
                }
            },
            getWeather: function (url) {
                http.request({
                    url: url,
                    method: "GET"
                }).then(this.parseResponse);
            },
            getWeatherForCity: function (city) {
                var appId =
                    "ed8226ba3a3c8c7ce5405af356b8906e";
                var url =
                    "https://api.openweathermap.org/data/2.5/weather?APPID=" +
                    appId +
                    "&units=metric&q=" + encodeURIComponent(city);
                this.getWeather(url);
            },
            getWeatherForLocation: function (loc) {
                var appId =
                    "ed8226ba3a3c8c7ce5405af356b8906e";
                var url =
                    "https://api.openweathermap.org/data/2.5/weather?APPID=" +
                    appId +
                    "&units=metric&lat=" +
                    loc.latitude +
                    "&lon=" +
                    loc.longitude;
                this.getWeather(url);
            }, getMyWeather(type) {
                Geolocation.enableLocationRequest();
                Geolocation.getCurrentLocation({
                    desiredAccuracy: Accuracy.high,
                    updateDistance: 0.1,
                    timeout: 20000
                }).then(
                    loc => {
                        if (loc) {
                            this.getWeatherForLocation(loc);
                        }
                    },
                    function (e) {
                        console.log("Error: " + e.message);
                    }
                );
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
                let firstDigit = weatherData.id.toString().charAt(0);
                console.log("Condition code: " + weatherData.id);
                switch (firstDigit) {
                    case "2":
                        return "thunderstorms";
                    case "3":
                        return "sunnyRains";
                    case "5":
                        if (weatherData.id == 500) return "lightRains";
                        else return "heavyRains";
                    case "7":
                        return "fog";
                    case "8":
                        if (weatherData.id == 800) return "sunny";
                        else if (weatherData.id == 801) return "cloudySun";
                        else return "cloudy";
                }
            },
            parseResponse(response) {
                var weatherResponse = response.content.toJSON();
                this.currentWeatherData.city = weatherResponse.name;
                this.currentWeatherData.temperature = Math.floor(
                    weatherResponse.main.temp
                );

                this.currentWeatherData.condition = this.getCondition(
                    weatherResponse.weather[0]
                );
                this.currentWeatherData.temperatureColor = this
                    .conditionToColorMap[
                    this.currentWeatherData.condition
                    ];
                console.log(this.currentWeatherData.condition);
                console.log(`https://openweathermap.org/img/wn/${this.currentWeatherData.conditionIcon}@2x.png`);
                this.labelObject.formattedText = this.createFormattedString(this.conditionToTextMap[this.currentWeatherData.condition]);

                this.currentWeatherData.conditionIcon = weatherResponse.weather[0].icon;


            },
            setTodaysDetails() {

                let todaysDate = new Date();
                this.currentWeatherData.currentDate = `${todaysDate.getDate()} ${
                    this.months[todaysDate.getMonth()]
                }`;
                this.currentWeatherData.currentDay = `${
                    this.weekdays[todaysDate.getDay()]
                }`;
            }
        },
        created() {
            this.setTodaysDetails();

            this.getMyWeather();
        },
        data() {
            return {
                listOfCitites: ["Tokyo",
                    "Jakarta",
                    "New York",
                    "Seoul",
                    "Manila",
                    "Mumbai",
                    "Sao Paulo",
                    "Mexico City",
                    "New Delhi",
                    "Osaka",
                    "Cairo",
                    "Kolkata",
                    "Los Angeles",
                    "Shanghai",
                    "Moscow",
                    "Beijing",
                    "Buenos Aires",
                    "Guangzhou",
                    "Shenzhen",
                    "Istanbul",
                    "Rio De Janeiro",
                    "Paris",
                    "Karachi",
                    "Nagoya",
                    "Chicago",
                    "Lagos",
                    "London",
                    "Bangkok",
                    "Kinshasa",
                    "Tehran",
                    "Lima",
                    "Dongguan",
                    "Bogota",
                    "Chennai",
                    "Dhaka",
                    "Essen",
                    "Tianjin",
                    "Hong Kong",
                    "Taipei",
                    "Lahore",
                    "Ho Chi Minh City",
                    "Bangalore",
                    "Hyderabad",
                    "Johannesburg",
                    "Baghdad",
                    "Toronto",
                    "Santiago",
                    "Kuala Lumpur",
                    "San Francisco",
                    "Philadelphia",
                    "Wuhan",
                    "Miami",
                    "Dallas",
                    "Madrid",
                    "Ahmedabad",
                    "Boston",
                    "Belo Horizonte",
                    "Khartoum",
                    "Saint Petersburg",
                    "Shenyang",
                    "Houston",
                    "Pune",
                    "Riyadh",
                    "Singapore",
                    "Washington",
                    "Yangon",
                    "Milan",
                    "Atlanta",
                    "Chongqing",
                    "Alexandria",
                    "Nanjing",
                    "Guadalajara",
                    "Barcelona",
                    "Chengdu",
                    "Detroit",
                    "Ankara",
                    "Abidjan",
                    "Athens",
                    "Berlin",
                    "Sydney",
                    "Monterrey",
                    "Phoenix",
                    "Busan",
                    "Recife",
                    "Bandung",
                    "Porto Alegre",
                    "Melbourne",
                    "Luanda",
                    "Hangzhou",
                    "Algiers",
                    "Hà Noi",
                    "Montréal",
                    "Xi'an",
                    "Pyongyang",
                    "Qingdao",
                    "Surat",
                    "Fortaleza",
                    "Medellín",
                    "Durban",
                    "Kanpur",
                    "Addis Ababa",
                    "Nairobi",
                    "Jeddah",
                    "Naples",
                    "Kabul",
                    "Salvador",
                    "Harbin",
                    "Kano",
                    "Casablanca",
                    "Cape Town",
                    "Curitiba",
                    "Surabaya",
                    "San Diego",
                    "Seattle",
                    "Rome",
                    "Dar Es Salaam",
                    "Taichung",
                    "Jaipur",
                    "Caracas",
                    "Dakar",
                    "Kaohsiung",
                    "Minneapolis",
                    "Lucknow",
                    "Amman",
                    "Tel Aviv-yafo",
                    "Guayaquil",
                    "Kyiv",
                    "Faisalabad",
                    "Mashhad",
                    "Izmir",
                    "Rawalpindi",
                    "Tashkent",
                    "Katowice",
                    "Changchun",
                    "Campinas",
                    "Daegu",
                    "Changsha",
                    "Nagpur",
                    "San Juan",
                    "Aleppo",
                    "Lisbon",
                    "Frankfurt Am Main",
                    "Nanchang",
                    "Birmingham[]",
                    "Tampa",
                    "Medan",
                    "Dalian",
                    "Tunis",
                    "Shijiazhuang",
                    "Manchester",
                    "Port-au-prince",
                    "Damascus",
                    "Ji'nan",
                    "Fukuoka",
                    "Santo Domingo",
                    "Havana",
                    "Cali",
                    "Denver",
                    "St. Louis",
                    "Colombo",
                    "Dubai",
                    "Baltimore",
                    "Sapporo",
                    "Rotterdam",
                    "Vancouver",
                    "Preston",
                    "Patna",
                    "Sana'a",
                    "Warsaw"],
                temperatureFontSize: 30,
                labelObject: null,
                weekdays: [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                ],
                months: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "June",
                    "July",
                    "Aug",
                    "Sept",
                    "Oct",
                    "Nov",
                    "Dec"
                ],
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
                    },
                        {
                            text: "sunny",
                            type: "#F1C40F"
                        },
                        {
                            text: " today!",
                            type: "normal"
                        }
                    ],
                    cloudy: [{
                        text: "Today's weather is ",
                        type: "normal"
                    },
                        {
                            text: "cloudy",
                            type: "#95A5A6"
                        },
                        {
                            text: " and ",
                            type: "normal"
                        },
                        {
                            text: " dull",
                            type: "#95A5A6"
                        },
                        {
                            text: "!",
                            type: "normal"
                        }
                    ],
                    cloudySun: [{
                        text: "Cloudy ",
                        type: "#95A5A6"
                    },
                        {
                            text: "and ",
                            type: "normal"
                        },
                        {
                            text: "sunny ",
                            type: "#F1C40F"
                        },
                        {
                            text: "at the same time. Go for a drive perhaps?",
                            type: "normal"
                        }
                    ],
                    lightRains: [{
                        text: "Light rains ",
                        type: "#5DADE2"
                    },
                        {
                            text: "today. Don't forget that umbrella!",
                            type: "normal"
                        }
                    ],
                    sunnyRains: [{
                        text: "Rains ",
                        type: "#5DADE2"
                    },
                        {
                            text: "and ",
                            type: "normal"
                        },
                        {
                            text: "sun",
                            type: "#5DADE2"
                        },
                        {
                            text: ". You might see a rainbow!",
                            type: "normal"
                        }
                    ],
                    heavyRains: [{
                        text: "Its gonna ",
                        type: "normal"
                    },
                        {
                            text: "fucking pour",
                            type: "#2874A6"
                        },
                        {
                            text: ". Cats, dogs, even whales!",
                            type: "normal"
                        }
                    ],
                    windy: [{
                        text: "Windy ",
                        type: "#D35400"
                    },
                        {
                            text: "AF! its gonna blow your wig off!",
                            type: "normal"
                        }
                    ],
                    thunderstorms: [{
                        text: "Rains ",
                        type: "#566573"
                    },
                        {
                            text: "and ",
                            type: "normal"
                        },
                        {
                            text: "thunder",
                            type: "#566573"
                        },
                        {
                            text: "!!? Could the weather get any worse?!",
                            type: "normal"
                        }
                    ],
                    fog: [{
                        text: "Foggy ",
                        type: "#ABB2B9"
                    },
                        {
                            text: "AF. Can you see anything ahead of you!",
                            type: "normal"
                        }
                    ]
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
    };
</script>

<style scoped>
    .text-display-style {
        padding: 10;
        font-size: 50;
        font-weight: bold;
        line-height: -10;
    }

    .day-text {
        font-size: 30;
        color: black;
        font-weight: 200;
    }

    .orange-text {
        color: "#FF0F0F"
    }

    .temp-style {
        color: dimgrey;
        font-weight: bold;

    }
</style>