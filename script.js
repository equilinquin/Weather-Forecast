$(document).ready(function () {
    console.log("ready")

    var searchArr = JSON.parse(localStorage.getItem("history")) || [];

    $("#results").html("");
    for (var i = 0; i < searchArr.length; i++) {
        var city = searchArr[i];

        var div = "<hr><div class='history'>" + city + "</div>";
        $("#results").prepend(div);
        var pastArr = JSON.parse(localStorage.getItem(city)) || [];
        console.log(pastArr);


    };

    $("button").click(function () {
        $(".fiveday").css("display", "block")

    
    
    var cityinput = $("#city").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityinput + "&units=imperial&appid=2773778a96cd8ad6907c9b5308565aa1";
    searchArr.push(cityinput);
    function getWeather() {
        //Current weather at select city
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .then(function (data) {
                var date = moment().format("l");

                var icon = data.weather[0].icon;
                var iconImg = "<img src='http://openweathermap.org/img/wn/" + icon + "@2x.png'/>";
                $("#show-city").html("City: " + data.name + " " + date + " " + iconImg);
                $("#temp").html("Temp: " + data.main.temp + " &#176;F");
                $("#humid").html("Humidity: " + data.main.humidity + " &#37;");
                $("#windspeed").html("Wind Speed: " + data.wind.speed + " MPH");

                var long = data.coord.lon;
                var lat = data.coord.lat;
                var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?appid=2773778a96cd8ad6907c9b5308565aa1&lat=" + lat + "&lon=" + long;

                //Current UV Index
                $.ajax({
                    url: uvIndexURL,
                    method: "GET"
                }).then(function (uv) {
                    $("#uv-index").html("UV Index: " + uv.value);
                });
                var geoURL = "http://api.openweathermap.org/data/2.5/forecast?appid=2773778a96cd8ad6907c9b5308565aa1&units=imperial&lat=" + lat + "&lon=" + long;

                //Current 5 day Forecast
                $.ajax({
                    url: geoURL,
                    method: "GET"
                }).then(function (fiveDay) {
                    $("#date1").html(moment().add(1, 'days').format("l"));
                    var firstIcon = fiveDay.list[0].weather[0].icon;
                    var firstImg = "http://openweathermap.org/img/wn/" + firstIcon + ".png";
                    $(".first").attr("src", firstImg);
                    $("#temp1").html("Temp: " + fiveDay.list[0].main.temp + "&#176;F")
                    $("#humid1").html("Humidity: " + fiveDay.list[0].main.humidity + "&#37;")

                    $("#date2").html(moment().add(2, 'days').format("l"));
                    var secondIcon = fiveDay.list[1].weather[0].icon;
                    var secondImg = "http://openweathermap.org/img/wn/" + secondIcon + ".png";
                    $(".second").attr("src", secondImg);
                    $("#temp2").html("Temp: " + fiveDay.list[1].main.temp + "&#176;F")
                    $("#humid2").html("Humidity: " + fiveDay.list[1].main.humidity + "&#37;")

                    $("#date3").html(moment().add(3, 'days').format("l"));
                    var thirdIcon = fiveDay.list[2].weather[0].icon;
                    var thirdImg = "http://openweathermap.org/img/wn/" + thirdIcon + ".png";
                    $(".third").attr("src", thirdImg);
                    $("#temp3").html("Temp: " + fiveDay.list[2].main.temp + "&#176;F")
                    $("#humid3").html("Humidity: " + fiveDay.list[2].main.humidity + "&#37;")

                    $("#date4").html(moment().add(4, 'days').format("l"));
                    var fourthIcon = fiveDay.list[3].weather[0].icon;
                    var fourthImg = "http://openweathermap.org/img/wn/" + fourthIcon + ".png";
                    $(".fourth").attr("src", fourthImg);
                    $("#temp4").html("Temp: " + fiveDay.list[3].main.temp + "&#176;F")
                    $("#humid4").html("Humidity: " + fiveDay.list[3].main.humidity + "&#37;")

                    $("#date5").html(moment().add(5, 'days').format("l"));
                    var fifthIcon = fiveDay.list[4].weather[0].icon;
                    var fifthImg = "http://openweathermap.org/img/wn/" + fifthIcon + ".png";
                    $(".fifth").attr("src", fifthImg);
                    $("#temp5").html("Temp: " + fiveDay.list[4].main.temp + "&#176;F")
                    $("#humid5").html("Humidity: " + fiveDay.list[4].main.humidity + "&#37;")


                });
                for (var i = 0; i < searchArr.length; i++) {
                    if (searchArr[i] === cityinput) {
                        localStorage.setItem(searchArr[i], JSON.stringify(data))
                    }

                }


            });
    };

    
    showSearch();
    getWeather();

    function showSearch() {
        $("#results").html("");
        searchArr.map(function (val) {

            $("<div class='history'></div>");
            $(".history").text(val);
            $("#results").prepend("<hr>" + val);
            localStorage.setItem("history", JSON.stringify(searchArr));


        });

    };
});

});


