var projection = d3.geo.mollweide().scale(99757.70190238953)
    .translate([-135100, -11700])
    .center([20, 0]);
var path = d3.geo.path()
    .projection(projection);

//json_url = "https://5c8b765b.ngrok.io/api/storage/";
json_url = "http://localhost/jkt/data/api.json";

function draw_map(s, series) {
    scaleN = 5;

    if (series == 1) {
        d3.selectAll(".boundary").remove();

        var gboundary = d3.select(s).append("g")
            .attr("class", "boundary")
            .attr("transform", "translate(" + -130 + "," + -30 + ")");

        d3.selectAll(".kotak").remove();

        var gkotak = d3.select(s).append("g")
            .attr("class", "kotak")
            .attr("transform", "translate(" + -130 + "," + 0 + ")");

        gkotak.append("rect")
            .attr("width", 320)
            .attr("height", 400)
            .style("fill", "white")
            .style("stroke", "grey")
            .style("stroke-width", "4px")
            .attr("x", 700)
            .attr("y", 40);


        gkotak.append("text")
            .attr("x", 700)
            .attr("y", 30)
            .attr("font-size", "16")
            .text("External Variables");



        //d3.json("http://api.airvisual.com/v2/nearest_city?lat=-6.21462&lon=106.84513&key=4HYxLdYrtiJ7XC4oD", function (json) {
        //    console.log(json['data']['current']['weather'])
        //});

        d3.json("data/kota.json", function (json) {
            geoPath = d3.geo.path().projection(projection);
            featureSize = d3.extent(json.features, function (d) {
                return geoPath.area(d)
            });
            countryColor = d3.scale.quantize().domain(featureSize).range(colorbrewer.Reds[scaleN]);

            gboundary.selectAll("path")
                .data(json.features).enter()
                .append("path")
                .style("fill", function (d) {
                    return countryColor(geoPath.area(d))
                })
                .attr("stroke-width", 0.5)
                .attr("stroke", "white")
                .attr("d", path)
                .attr("fill", "transparent");
        });

        draw_banjir(s);
        draw_scale(s);

        //////////////////////////////////////////////////////////////////////////////////////////////////

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
            .attr("xlink:href", "images/cuaca/04d.png")
            .attr("width", "100px")
            .attr("height", "100px")
            .attr("x", ximage)
            .attr("y", 120);

        //////////////////////////////////////////////////////////////

        d3.json("http://localhost/jkt/data/api.json", function (av) {
            console.log(av);
            d3.selectAll(".pollution-image").remove();
            var gpollution = gexternal.append("g")
                .attr("class", "pollution-image");
            gpollution.selectAll("image")
                .data([bb]).enter()
                .append("image")
                .attr("xlink:href", "images/polusi/" + av[0]['AQI'] + ".png")
                .attr("width", "100px")
                .attr("height", "100px")
                .attr("x", ximage)
                .attr("y", 40);
        });

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

        //d3.selectAll(".wind-image").remove();
        //var gwind = gexternal.append("g")
        //    .attr("class", "wind-image");
        //gwind.selectAll("image")
        //    .data([bb]).enter()
        //    .append("image")
        //    .attr("xlink:href", "images/cuaca/wind2.png")
        //    .attr("width", "50px")
        //    .attr("height", "50px")
        //    .attr("x", ximage + 25)
        //    .attr("y", 290);

        /////////////////////////////////////////////////////////////

        d3.selectAll(".banjir-image").remove();
        var gbanjir = gexternal.append("g")
            .attr("class", "banjir-image");
        gbanjir.selectAll("image")
            .data([bb]).enter()
            .append("image")
            .attr("xlink:href", "images/banjir.png")
            .attr("width", "50px")
            .attr("height", "50px")
            .attr("x", ximage + 25)
            .attr("y", 290);



        ////////////////////// Text /////////////////////////////////

        var gtext0 = gexternal.append("g")
            .attr("class", "text");


        gtext0.append("text")
            .attr("x", 850)
            .attr("y", 325)
            .attr("font-size", "18")
            .text("Banjir");

        gtext0.append("text")
            .attr("x", 740)
            .attr("y", 370)
            .attr("font-size", "12")
            .text("Number of Customers' Request");

        gtext0.append("text")
            .attr("x", 730)
            .attr("y", 95)
            .attr("class", "load")
            .attr("font-size", "10")
            .text("wait for JSON");

        gtext0.append("text")
            .attr("x", 850)
            .attr("y", 70)
            .attr("font-size", "12")
            .text("Air Quality");

        gtext0.append("text")
            .attr("x", 850)
            .attr("y", 150)
            .attr("font-size", "12")
            .text("Weather");

        gtext0.append("text")
            .attr("x", 850)
            .attr("y", 230)
            .attr("font-size", "12")
            .text("Humidity");

        gtext0.append("text")
            .attr("class", "load")
            .attr("x", 850)
            .attr("y", 95)
            .attr("font-size", "10")
            .text("wait for JSON");

        gtext0.append("text")
            .attr("class", "load")
            .attr("x", 850)
            .attr("y", 180)
            .attr("font-size", "10")
            .text("wait for JSON");

        gtext0.append("text")
            .attr("class", "load")
            .attr("x", 850)
            .attr("y", 180)
            .attr("font-size", "10")
            .text("wait for JSON");

        gtext0.append("text")
            .attr("class", "load")
            .attr("x", 850)
            .attr("y", 255)
            .attr("font-size", "10")
            .text("wait for JSON");


        d3.json("http://localhost/jkt/data/api.json", function (av) {
            //console.log(av[1]['AQI']);

            d3.selectAll(".load").remove();

            var gtext = gexternal.append("g")
                .attr("class", "text");

            gtext.append("text")
                .attr("x", 790)
                .attr("y", 95)
                .attr("font-size", "18")
                .attr("font-weight", "bold")
                .text(av[0]['pollution']);

            gtext.append("text")
                .attr("x", 850)
                .attr("y", 95)
                .attr("font-size", "18")
                .attr("font-weight", "bold")
                .text(av[0]['AQI']);

            gtext.append("text")
                .attr("x", 850)
                .attr("y", 180)
                .attr("font-size", "18")
                .attr("font-weight", "bold")
                .text(av[0]['temp'] + ' C');

            gtext.append("text")
                .attr("x", 850)
                .attr("y", 255)
                .attr("font-size", "18")
                .attr("font-weight", "bold")
                .text(av[0]['humid']);
        });



        /////////////////////////////////////////////////////////////
    }
    else if (series == 2) {
        d3.selectAll(".boundary").remove();

        var gboundary = d3.select(s).append("g")
            .attr("class", "boundary")
            .attr("transform", "translate(" + -130 + "," + -30 + ")");

        d3.json("data/kecamatan.json", function (json) {

            geoPath = d3.geo.path().projection(projection);
            featureSize = d3.extent(json.features, function (d) {
                return geoPath.area(d)
            });
            countryColor = d3.scale.quantize().domain(featureSize).range(colorbrewer.Reds[scaleN]);

            gboundary.selectAll("path")
                .data(json.features).enter()
                .append("path")
                .style("fill", function (d) {
                    return countryColor(geoPath.area(d))
                })
                .attr("stroke-width", 0.5)
                .attr("stroke", "white")
                .attr("d", path)
                .attr("fill", "transparent");
        });

        draw_banjir(s);
        draw_scale(s);
    }
    else if (series == 3) {
        d3.selectAll(".boundary").remove();

        var gboundary = d3.select(s).append("g")
            .attr("class", "boundary")
            .attr("transform", "translate(" + -130 + "," + -30 + ")");

        d3.json("data/kelurahan.json", function (json) {
            geoPath = d3.geo.path().projection(projection);
            featureSize = d3.extent(json.features, function (d) {
                return geoPath.area(d)
            });
            countryColor = d3.scale.quantize().domain(featureSize).range(colorbrewer.Reds[scaleN]);

            gboundary.selectAll("path")
                .data(json.features).enter()
                .append("path")
                .style("fill", function (d) {
                    return countryColor(geoPath.area(d))
                })
                .attr("stroke-width", 0.5)
                .attr("stroke", "white")
                .attr("d", path)
                .attr("fill", "transparent");
        });

        draw_banjir(s);
        draw_scale(s);
    }

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

    function nodeMouseover(d) {
        console.log(d.properties['NAMA']);
    }
}

function draw_scale(s) {

    bheight = 20;

    var gscale = d3.select(s).append("g")
        .attr("class", "banjir")
        .attr("transform", "translate(" + 210 + "," + -100 + ")");

    gscale.append("rect")
        .attr("class", "rect-legend")
        .attr("width", 50)
        .attr("height", bheight)
        .style("fill", "#A50F15")
        .attr("x", 600)
        .attr("y", 480);

    gscale.append("rect")
        .attr("class", "rect-legend")
        .attr("width", 50)
        .attr("height", bheight)
        .style("fill", "#DE2D26")
        .attr("x", 550)
        .attr("y", 480)


    gscale.append("rect")
        .attr("class", "rect-legend")
        .attr("width", 50)
        .attr("height", bheight)
        .style("fill", "#FB6A4A")
        .attr("x", 500)
        .attr("y", 480)

    gscale.append("rect")
        .attr("class", "rect-legend")
        .attr("width", 50)
        .attr("height", bheight)
        .style("fill", "#FCAE91")
        .attr("x", 450)
        .attr("y", 480)

    gscale.append("rect")
        .attr("class", "rect-legend")
        .attr("width", 50)
        .attr("height", bheight)
        .style("fill", "#FEE5D9")
        .attr("x", 400)
        .attr("y", 480)

    ///////////////////////////////////////////////////////////////////



    ////////////////////////////Text////////////////////////////////

    bfont = "10px";

    var gstext = d3.select(s).append("g")
        .attr("class", "banjir")
        .attr("transform", "translate(" + 208 + "," + -170 + ")");

    gstext.append("text")
        .attr("class", "text-legend")
        .attr("x", 638)
        .attr("y", 580)
        .attr("dy", ".35em")
        .style("font-size", bfont)
        .text("6505");

    gstext.append("text")
        .attr("class", "text-legend")
        .attr("x", 590)
        .attr("y", 580)
        .attr("dy", ".35em")
        .style("font-size", bfont)
        .text("5203");

    gstext.append("text")
        .attr("class", "text-legend")
        .attr("x", 540)
        .attr("y", 580)
        .attr("dy", ".35em")
        .style("font-size", bfont)
        .text("3902");

    gstext.append("text")
        .attr("class", "text-legend")
        .attr("x", 490)
        .attr("y", 580)
        .attr("dy", ".35em")
        .style("font-size", bfont)
        .text("2601");

    gstext.append("text")
        .attr("class", "text-legend")
        .attr("x", 440)
        .attr("y", 580)
        .attr("dy", ".35em")
        .style("font-size", bfont)
        .text("1300");

    gstext.append("text")
        .attr("class", "text-legend")
        .attr("x", 398)
        .attr("y", 580)
        .attr("dy", ".35em")
        .style("font-size", bfont)
        .text("0");

    //gstext.append("text")
    //    .attr("class", "text-legend")
    //    .attr("x", 333)
    //    .attr("y", 565)
    //    .attr("dy", ".35em")
    //    .style("font-size", "9px")
    //    .text("Semakin Tersedikit")
    //    .attr("transform", "translate(" + -20 + "," + 0 + ")");
    //
    //gstext.append("text")
    //    .attr("class", "text-legend")
    //    .attr("x", 655)
    //    .attr("y", 565)
    //    .attr("dy", ".35em")
    //    .style("font-size", "9px")
    //    .text("Semakin Banyak");
}

function draw_banjir(s) {
    d3.selectAll(".banjir").remove();

    var gbanjir = d3.select(s).append("g")
        .attr("class", "banjir")
        .attr("transform", "translate(" + -130 + "," + -30 + ")");

    d3.json("data/banjir.json", function (json) {
        gbanjir.selectAll("path")
            .data(json.features).enter()
            .append("path")
            .attr("stroke-width", 0.5)
            .attr("stroke", "blue")
            .attr("d", path)
            .attr("fill", "transparent");
    });
}


