function draw_map(s, series) {
    //var w = 1000;
    //var h = 1000;
    //var image_w = 900;
    //var image_h = 200;
    //var active = d3.select(null);
    var projection = d3.geo.mollweide().scale(99757.70190238953)
        .translate([-135100, -11700])
        .center([20, 0]);
    var path = d3.geo.path()
        .projection(projection);

    //var svg = d3.select(s)
    //    .append("svg")
    //    .attr("width", w)
    //    .attr("height", h)
    //
    //var gboundary = svg.append("g")
    //    .attr("class", "boundary");

    //var ghost = svg.append("g")
    //    .attr("class", "hospital");

    //d3.json("data/jkt_road.json", function (json) {
    //    gstreet.selectAll("path")
    //        .data(json.features).enter()
    //        .append("path")
    //        .attr("stroke-width", 0.5)
    //        .attr("stroke", "black")
    //        .attr("d", path)
    //        .attr("fill", "white");
    //});

    if (series == 1) {
        //d3.json("http://api.jakarta.go.id/v1/kota/?format=geojson")
        //    .header("Authorization", "Bk2ALmA4dXWBhu66tu79aA3MdGLONhShEBVzQqhruecHO7nJCY+AkRzP+q22GjHS")
        //    .get(function (error, json) {
        //        console.log(json);
        //        gstreet.selectAll("path")
        //            .data(json.features).enter()
        //            .append("path")
        //            .attr("stroke-width", 0.5)
        //            .attr("stroke", "black")
        //            .attr("d", path)
        //            .attr("fill", "white");
        //    });

        //var gboundary = d3.select(s).append("g")
        //    .attr("class", "boundary");

        d3.selectAll(".boundary").remove();

        var gboundary = d3.select(s).append("g")
            .attr("class", "boundary")
            .attr("transform", "translate(" + -130 + "," + 0 + ")");

        d3.json("data/kota.json", function (json) {
            geoPath = d3.geo.path().projection(projection);
            featureSize = d3.extent(json.features, function(d) {return geoPath.area(d)});
            countryColor = d3.scale.quantize().domain(featureSize).range(colorbrewer.Reds[7]);

            gboundary.selectAll("path")
                .data(json.features).enter()
                .append("path")
                .style("fill", function(d) {return countryColor(geoPath.area(d))})
                .attr("stroke-width", 0.5)
                .attr("stroke", "black")
                .attr("d", path)
                .attr("fill", "transparent");
        });

        d3.selectAll(".banjir").remove();

        var gbanjir = d3.select(s).append("g")
            .attr("class", "banjir");

        d3.json("data/banjir.json", function (json) {
            //console.log(json);

            gbanjir.selectAll("path")
                .data(json.features).enter()
                .append("path")
                .attr("stroke-width", 0.5)
                .attr("stroke", "blue")
                .attr("d", path)
                .attr("fill", "transparent");
        });

        d3.selectAll(".airvisual").remove();

        var gbanjir = d3.select(s).append("g")
            .attr("class", "airvisual");

        d3.json("http://api.airvisual.com/v2/nearest_city?lat=-6.21462&lon=106.84513&key=4HYxLdYrtiJ7XC4oD", function (json) {
            console.log(json['data']['current']['weather']);



        var gexternal = d3.select(s).append("g")
            .attr("class", "external")
            .attr("transform", "translate(" + -130 + "," + 0 + ")");

        //////////////// Image ///////////////////////////////////////

        ximage = 720;

        bb = [];

        d3.selectAll(".weather").remove();
        var gweather = gexternal.append("g")
            .attr("class", "weather-image");
        gweather.selectAll("image")
            .data([bb]).enter()
            .append("image")
            .attr("xlink:href", "images/cuaca/02n.png")
            .attr("width", "100px")
            .attr("height", "100px")
            .attr("x", ximage)
            .attr("y", 120);

        //////////////////////////////////////////////////////////////

        d3.selectAll(".pollution-image").remove();
        var gpollution = gexternal.append("g")
            .attr("class", "pollution-image");
        gpollution.selectAll("image")
            .data([bb]).enter()
            .append("image")
            .attr("xlink:href", "images/polusi/aqi2.png")
            .attr("width", "100px")
            .attr("height", "100px")
            .attr("x", ximage)
            .attr("y", 40);

        /////////////////////////////////////////////////////////////

        d3.selectAll(".humidity-image").remove();
        var ghumidity = gexternal.append("g")
            .attr("class", "humidity-image");
        ghumidity.selectAll("image")
            .data([bb]).enter()
            .append("image")
            .attr("xlink:href", "images/cuaca/humidity.png")
            .attr("width", "50px")
            .attr("height", "50px")
            .attr("x", ximage + 30)
            .attr("y", 220);

        /////////////////////////////////////////////////////////////

        d3.selectAll(".wind-image").remove();
        var gwind = gexternal.append("g")
            .attr("class", "wind-image");
        gwind.selectAll("image")
            .data([bb]).enter()
            .append("image")
            .attr("xlink:href", "images/cuaca/wind2.png")
            .attr("width", "50px")
            .attr("height", "50px")
            .attr("x", ximage + 25)
            .attr("y", 290);

        /////////////////////////Driver//////////////////////////

        var gdriver = d3.select(s).append("g")
            .attr("class", "external")
            .attr("transform", "translate(" + -130 + "," + 0 + ")");

        d3.selectAll(".driver-image").remove();
        var gd = gdriver.append("g")
            .attr("class", "driver-image");
        gd.selectAll("image")
            .data([bb]).enter()
            .append("image")
            .attr("xlink:href", "images/driver.png")
            .attr("width", "200px")
            .attr("height", "200px")
            .attr("x", ximage + 250)
            .attr("y", 100);

        d3.selectAll(".heart-image").remove();
        var gh = gdriver.append("g")
            .attr("class", "driver-image");
        gh.selectAll("image")
            .data([bb]).enter()
            .append("image")
            .attr("xlink:href", "images/heart.png")
            .attr("width", "25px")
            .attr("height", "25px")
            .attr("x", ximage + 345)
            .attr("y", 160);

        d3.selectAll(".heart-image").remove();
        var gw = gdriver.append("g")
            .attr("class", "driver-image");
        gw.selectAll("image")
            .data([bb]).enter()
            .append("image")
            .attr("xlink:href", "images/wave.png")
            .attr("width", "80px")
            .attr("height", "80px")
            .attr("x", ximage + 310)
            .attr("y", 35);

        gdriver.append("text")
            .attr("x", 790)
            .attr("y", 95)
            .attr("font-size", "18")
            .text("28");

        ////////////////////// Text /////////////////////////////////

        var gtext = gexternal.append("g")
            .attr("class", "text");

        gtext.append("text")
            .attr("x", 790)
            .attr("y", 95)
            .attr("font-size", "18")
            .text("28");

        gtext.append("text")
            .attr("x", 850)
            .attr("y", 70)
            .attr("font-size", "12")
            .text("Air Quality");

        gtext.append("text")
            .attr("x", 850)
            .attr("y", 95)
            .attr("font-size", "18")
            .text("Moderate");

        gtext.append("text")
            .attr("x", 850)
            .attr("y", 150)
            .attr("font-size", "12")
            .text("Weather");

        gtext.append("text")
            .attr("x", 850)
            .attr("y", 180)
            .attr("font-size", "18")
            .text("29 C");

        gtext.append("text")
            .attr("x", 850)
            .attr("y", 230)
            .attr("font-size", "12")
            .text("Humidity");

        gtext.append("text")
            .attr("x", 850)
            .attr("y", 255)
            .attr("font-size", "18")
            .text("89");

        gtext.append("text")
            .attr("x", 850)
            .attr("y", 300)
            .attr("font-size", "12")
            .text("Wind Speed");

        gtext.append("text")
            .attr("x", 850)
            .attr("y", 325)
            .attr("font-size", "18")
            .text("2 km/h");

        /////////////////////////////////////////////////////////////


        //});
    }
    else if (series == 2) {
        //d3.json("http://api.jakarta.go.id/v1/kecamatan/?format=geojson")
        //    .header("Authorization", "Bk2ALmA4dXWBhu66tu79aA3MdGLONhShEBVzQqhruecHO7nJCY+AkRzP+q22GjHS")
        //    .get(function (error, json) {
        //        console.log(json);
        //        gstreet.selectAll("path")
        //            .data(json.features).enter()
        //            .append("path")
        //            .attr("stroke-width", 0.5)
        //            .attr("stroke", "black")
        //            .attr("d", path)
        //            .attr("fill", "white");
        //    });

        d3.selectAll(".boundary").remove();

        var gboundary = d3.select(s).append("g")
            .attr("class", "boundary");

        d3.json("data/kecamatan.json", function (json) {

            geoPath = d3.geo.path().projection(projection);
            featureSize = d3.extent(json.features, function(d) {return geoPath.area(d)});
            countryColor = d3.scale.quantize().domain(featureSize).range(colorbrewer.Reds[7]);

            gboundary.selectAll("path")
                .data(json.features).enter()
                .append("path")
                .style("fill", function(d) {return countryColor(geoPath.area(d))})
                .attr("stroke-width", 0.5)
                .attr("stroke", "black")
                .attr("d", path)
                .attr("fill", "transparent");
        });
    }
    else if (series == 3) {
        //d3.json("http://api.jakarta.go.id/v1/kelurahan/?format=geojson")
        //    .header("Authorization", "Bk2ALmA4dXWBhu66tu79aA3MdGLONhShEBVzQqhruecHO7nJCY+AkRzP+q22GjHS")
        //    .get(function (error, json) {
        //        console.log(json);
        //        gstreet.selectAll("path")
        //            .data(json.features).enter()
        //            .append("path")
        //            .attr("stroke-width", 0.5)
        //            .attr("stroke", "black")
        //            .attr("d", path)
        //            .attr("fill", "white");
        //    });

        d3.selectAll(".boundary").remove();

        var gboundary = d3.select(s).append("g")
            .attr("class", "boundary");

        d3.json("data/kelurahan.json", function (json) {
            geoPath = d3.geo.path().projection(projection);
            featureSize = d3.extent(json.features, function(d) {return geoPath.area(d)});
            countryColor = d3.scale.quantize().domain(featureSize).range(colorbrewer.Reds[7]);

            gboundary.selectAll("path")
                .data(json.features).enter()
                .append("path")
                .style("fill", function(d) {return countryColor(geoPath.area(d))})
                .attr("stroke-width", 0.5)
                .attr("stroke", "black")
                .attr("d", path)
                .attr("fill", "transparent");
        });
    }


    //console.log(series);


    if (typeof series === 'number') {
        //console.log(series);
    }
    else if (typeof series === 'object') {


        if (series[0] == true) {
            console.log(series);
            d3.json("data/hospital.json", function (json) {
                console.log(json);
                ghost.selectAll("path")
                    .data(json.features).enter()
                    .append("path")
                    .attr("fill", "red")
                    .attr("stroke", "yellow")
                    .attr("stroke-width", 0.5)
                    .attr("d", path)
                    .on("mouseover", nodeMouseover);
            });
        }
    }


    //aa = [106.84081755406471, -6.191184038178781];
    //bb = [106.81673949211257, -6.159043088239716];
    //
    //svg.selectAll("image")
    //    .data([aa, bb]).enter()
    //    .append("image")
    //    .attr("class", "motor")
    //    .attr("xlink:href", "images/3.png")
    //    .attr("width", "30px")
    //    .attr("height", "30px")
    //    .attr("x", function (d) {
    //        return projection(d)[0];
    //    })
    //    .attr("y", function (d) {
    //        return projection(d)[1];
    //    });


    //var plane = svg.append("path")
    //    .attr("class", "plane")
    //    .attr("d", "m25.21488,3.93375c-0.44355,0 -0.84275,0.18332 -1.17933,0.51592c-0.33397,0.33267 -0.61055,0.80884 -0.84275,1.40377c-0.45922,1.18911 -0.74362,2.85964 -0.89755,4.86085c-0.15655,1.99729 -0.18263,4.32223 -0.11741,6.81118c-5.51835,2.26427 -16.7116,6.93857 -17.60916,7.98223c-1.19759,1.38937 -0.81143,2.98095 -0.32874,4.03902l18.39971,-3.74549c0.38616,4.88048 0.94192,9.7138 1.42461,13.50099c-1.80032,0.52703 -5.1609,1.56679 -5.85232,2.21255c-0.95496,0.88711 -0.95496,3.75718 -0.95496,3.75718l7.53,-0.61316c0.17743,1.23545 0.28701,1.95767 0.28701,1.95767l0.01304,0.06557l0.06002,0l0.13829,0l0.0574,0l0.01043,-0.06557c0,0 0.11218,-0.72222 0.28961,-1.95767l7.53164,0.61316c0,0 0,-2.87006 -0.95496,-3.75718c-0.69044,-0.64577 -4.05363,-1.68813 -5.85133,-2.21516c0.48009,-3.77545 1.03061,-8.58921 1.42198,-13.45404l18.18207,3.70115c0.48009,-1.05806 0.86881,-2.64965 -0.32617,-4.03902c-0.88969,-1.03062 -11.81147,-5.60054 -17.39409,-7.89352c0.06524,-2.52287 0.04175,-4.88024 -0.1148,-6.89989l0,-0.00476c-0.15655,-1.99844 -0.44094,-3.6683 -0.90277,-4.8561c-0.22699,-0.59493 -0.50356,-1.07111 -0.83754,-1.40377c-0.33658,-0.3326 -0.73578,-0.51592 -1.18194,-0.51592l0,0l-0.00001,0l0,0z")
    //    ;

//svg.selectAll("circle")
//    .data([aa]).enter()
//    .append("circle")
//    .attr("cx", function (d) { return projection(d)[0]; })
//    .attr("cy", function (d) { return projection(d)[1]; })
//    .attr("r", "8px")
//    .attr("fill", "blue")


//ghost.append("circle")
//    .attr("cx", function() {
//        return projection(106.84081755406471);
//    })
//    .attr("cy", function(d) {
//        return projection(-6.191184038178781);
//    })
//    .attr("r", 50)
//    .style("fill", "blue");


//d3.json("data/hospital.json", function (json) {
//    var gmap10 = g.selectAll("path")
//        .data(json.features).enter()
//        .append("path")
//        .attr("fill", "red")
//        .attr("stroke", "red")
//        .attr("stroke-width", 1)
//        .attr("d", path)
//        .on("mouseover", nodeMouseover)
//        .on("mouseout", nodeMouseout);
//});

    function nodeMouseover(d) {
        console.log(d.properties['NAMA']);
    }

}

function draw_health(s, series) {
    var ghost = svg.append("g")
        .attr("class", "hospital");

    if (typeof series === 'number') {
        //console.log(series);
    }
    else if (typeof series === 'object') {
        if (series[0] == true) {
            console.log(series);
            d3.json("data/hospital.json", function (json) {
                console.log(json);
                ghost.selectAll("path")
                    .data(json.features).enter()
                    .append("path")
                    .attr("fill", "red")
                    .attr("stroke", "yellow")
                    .attr("stroke-width", 0.5)
                    .attr("d", path)
                    .on("mouseover", nodeMouseover);
            });
        }
    }
}