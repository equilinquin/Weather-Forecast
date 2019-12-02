$(document).ready(function() {

    var apiKey = "2773778a96cd8ad6907c9b5308565aa1";
    var cityinput = $("#city").val();
    var searchArr = [];
    //var query = "api.openweathermap.org/data/2.5/weather?q=" + cityinput + "&appid=" + apiKey;
    console.log(cityinput)
    console.log(query)
        
    function getWeather(city) {
        return $.ajax({
            url: "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey,
            method: 'GET'    
        }).then(function(data) {
            return data
            console.log(data)
        })
        }
        getWeather()
        console.log(getWeather())
    $(".search-btn").click(function (){
        searchArr.push(cityinput);
    });

   });
