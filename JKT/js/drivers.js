//json_url = "https://5c8b765b.ngrok.io/api/storage/";
json_url = "http://localhost/jkt/data/api.json";

function draw_drivers(s, series) {
    var projection = d3.geo.mollweide().scale(99757.70190238953)
        .translate([-135100.91238308285, -11700.527968931943])
        .center([20, 0]);

    var path = d3.geo.path()
        .projection(projection);

    if (typeof series === 'number') {
        //console.log(series);
    }
    else if (typeof series === 'object') {
        if (series[2] == true) {
            d3.selectAll(".drivers").remove();

            var gdrivers = d3.select(s).append("g")
                .attr("class", "drivers")
                .attr("transform", "translate(" + -200 + "," + 0 + ")");

            d3.json("http://localhost/jkt/data/api.json", function (av) {
                jumlah = [];
                for (var k = 0; k < 1; k++) {
                    jumlah.push([av[k]['lat'], av[k]['lng']]);
                }

                gdrivers.selectAll("image")
                    .data(av).enter()
                    .append("image")
                    .attr("class", "motor")
                    .attr("xlink:href", "images/gojek_err.png")
                    .attr("width", "50px")
                    .attr("height", "50px")
                    .attr("x", function (d) {
                        return projection([d['lat'], d['lng']])[0];
                    })
                    .attr("y", function (d) {
                        return projection([d['lat'], d['lng']])[1];
                    })
                    .on("mouseover", nodeMouseover)
                    .on("mouseout", nodeMouseout)
                    .style("cursor", "pointer");

                //gdrivers.selectAll("image")
                //    .data(av).enter()
                //    .append("image")
                //    .attr("class", "motor")
                //    .attr("xlink:href", "images/gojek_err.png")
                //    .attr("width", "50px")
                //    .attr("height", "50px")
                //    .attr("x", function (d) {
                //        return projection(d])[0];
                //    })
                //    .attr("y", function (d) {
                //        return projection(d)[1];
                //    })
                //    .on("mouseover", nodeMouseover)
                //    .on("mouseout", nodeMouseout)
                //    .style("cursor", "pointer");
            });

            //aa = [106.95081755406471, -6.191184038178781];
            //bb = [106.81673949211257, -6.159043088239716];
            //
            //gdrivers.selectAll("image")
            //    .data([aa, bb]).enter()
            //    .append("image")
            //    .attr("class", "motor")
            //    .attr("xlink:href", "images/gojek_err.png")
            //    .attr("width", "50px")
            //    .attr("height", "50px")
            //    .attr("x", function (d) {
            //        return projection(d)[0];
            //    })
            //    .attr("y", function (d) {
            //        return projection(d)[1];
            //    })
            //    .on("mouseover", nodeMouseover)
            //    .on("mouseout", nodeMouseout);
        }
        else {
            d3.select("svg").selectAll(".drivers").remove();
        }
    }
}

function nodeMouseout() {
    d3.selectAll(".gojek").remove();
}

function nodeMouseover(d) {
    console.log(d);
    d3.selectAll(".gojek").remove();

    var gdriver = d3.select("svg").append("g")
        .attr("class", "gojek")
        .attr("transform", "translate(" + -100 + "," + -20 + ")");

    gdriver.append("rect")
        .attr("width", 350)
        .attr("height", 250)
        .style("fill", "white")
        .style("stroke", "grey")
        .style("stroke-width", "4px")
        .attr("x", 1000)
        .attr("y", 60);


    gdriver.append("text")
        .attr("x", 1000)
        .attr("y", 50)
        .attr("font-size", "16")
        .text("Internal Variables");

    ////////////////////////////////////////////////////////////////////////

    gdriver.append("rect")
        .attr("width", 350)
        .attr("height", 110)
        .style("fill", "white")
        .style("stroke", "grey")
        .attr("x", 1000)
        .style("stroke-width", "4px")
        .attr("y", 350);


    gdriver.append("text")
        .attr("x", 1000)
        .attr("y", 340)
        .attr("font-size", "16")
        .text("Recommendation");

    gdriver.append("text")
        .attr("x", 1020)
        .attr("y", 410)
        .attr("font-size", "20")
        .text("Take a rest for : ");


    //gdriver.append("text")
    //    .attr("x", 1220)
    //    .attr("y", 410)
    //    .attr("font-weight", "bold")
    //    .attr("font-size", "20")
    //    .text(" minutes");

    d3.selectAll(".driver-image").remove();

    var gojek = gdriver.append("g")
        .attr("class", "driver-image");

    gojek.selectAll("image")
        .data([bb]).enter()
        .append("image")
        .attr("xlink:href", "images/driver.png")
        .attr("width", "200px")
        .attr("height", "200px")
        .attr("x", ximage + 230)
        .attr("y", 90);

    /////////////////////////////////////////////////////////////////////////

    d3.selectAll(".brain-image").remove();
    var gbrain = gdriver.append("g")
        .attr("class", "brain-image");

    gbrain.selectAll("image")
        .data([bb]).enter()
        .append("image")
        .attr("xlink:href", "images/brain.gif")
        .attr("width", "35px")
        .attr("height", "35px")
        .attr("x", 1110)
        .attr("y", 90);

    gojek.append("text")
        .attr("x", 1150)
        .attr("y", 100)
        .attr("font-size", "12")
        .text('Attention:');

    gojek.append("text")
        .attr("x", 1150)
        .attr("y", 120)
        .attr("font-size", "12")
        .text('Meditation:');


    /////////////////////////////////////////////////////////////////////////

    d3.selectAll(".heart-image").remove();
    var gh = gdriver.append("g")
        .attr("class", "driver-image");

    gh.selectAll("image")
        .data([bb]).enter()
        .append("image")
        .attr("xlink:href", "images/heart.png")
        .attr("width", "25px")
        .attr("height", "25px")
        .attr("x", 1115)
        .attr("y", 143);

    gojek.append("text")
        .attr("x", 1150)
        .attr("y", 160)
        .attr("font-size", "12")
        .text('Heart rate :');

    ///////////////////////////////////////////////////////////////////////////

    d3.selectAll(".distance-image").remove();
    var gdistance = gdriver.append("g")
        .attr("class", "distance-image");

    gdistance.selectAll("image")
        .data([bb]).enter()
        .append("image")
        .attr("xlink:href", "images/distance2.png")
        .attr("width", "100px")
        .attr("height", "50px")
        .attr("x", 1080)
        .attr("y", 180);

    /////////////////////////////////////////////////////////////////////////////

    d3.selectAll(".duration-image").remove();
    var gduration = gdriver.append("g")
        .attr("class", "duration-image");

    gduration.selectAll("image")
        .data([bb]).enter()
        .append("image")
        .attr("xlink:href", "images/time.png")
        .attr("width", "30px")
        .attr("height", "30px")
        .attr("x", 1115)
        .attr("y", 250);

    ///////////////////////////////////////////////////////////////////////////////


    gojek.append("text")
        .attr("x", 1150)
        .attr("y", 210)
        .attr("font-size", "12")
        .text('Distance :');

    gojek.append("text")
        .attr("x", 1150)
        .attr("y", 270)
        .attr("font-size", "12")
        .text('Duration :');

    ///////////////////////////////////////////////////////////////////////////////

    gojek.append("text")
        .attr("x", 1225)
        .attr("y", 160)
        .attr("class", "load")
        .attr("font-size", "10")
        .text("wait for JSON");

    gojek.append("text")
        .attr("x", 1220)
        .attr("y", 210)
        .attr("class", "load")
        .attr("font-size", "10")
        .text("wait for JSON");

    gojek.append("text")
        .attr("x", 1220)
        .attr("y", 270)
        .attr("class", "load")
        .attr("font-size", "10")
        .text("wait for JSON");

    gojek.append("text")
        .attr("x", 1220)
        .attr("y", 100)
        .attr("class", "load")
        .attr("font-size", "10")
        .text("wait for JSON");

    gojek.append("text")
        .attr("x", 1220)
        .attr("y", 120)
        .attr("class", "load")
        .attr("font-size", "10")
        .text("wait for JSON");

    gojek.append("text")
        .attr("x", 1200)
        .attr("y", 410)
        .attr("class", "load")
        .attr("font-size", "10")
        .text("wait for JSON");

    ///////////////////////////////////////////////////////////////////////////////

    d3.selectAll(".load").remove();

    gojek.append("text")
        .attr("x", 1225)
        .attr("y", 160)
        .attr("font-size", "18")
        .attr("font-weight", "bold")
        .text(d['hr']);

    gojek.append("text")
        .attr("x", 1030)
        .attr("y", 160)
        .attr("font-size", "14")
        .attr("font-weight", "bold")
        .text(d['driver_id']);

    gojek.append("text")
        .attr("x", 1220)
        .attr("y", 210)
        .attr("font-size", "18")
        .attr("font-weight", "bold")
        .text(d['distance'] + ' km');

    gojek.append("text")
        .attr("x", 1220)
        .attr("y", 270)
        .attr("font-size", "18")
        .attr("font-weight", "bold")
        .text(d['duration'] + ' minutes');

    gojek.append("text")
        .attr("x", 1220)
        .attr("y", 100)
        .attr("font-size", "18")
        .attr("font-weight", "bold")
        .text(d['attention']);

    gojek.append("text")
        .attr("x", 1250)
        .attr("y", 100)
        .attr("font-size", "18")
        .attr("font-weight", "bold")
        .text('- ' + d['attState']);

    gojek.append("text")
        .attr("x", 1230)
        .attr("y", 120)
        .attr("font-size", "18")
        .attr("font-weight", "bold")
        .text(d['meditation']);

    gojek.append("text")
        .attr("x", 1255)
        .attr("y", 120)
        .attr("font-size", "18")
        .attr("font-weight", "bold")
        .text('- ' + d['medState']);

    gojek.append("text")
        .attr("x", 1200)
        .attr("y", 410)
        .attr("font-weight", "bold")
        .attr("font-size", "18")
        .text(d['rest'] + ' minutes');


    //d3.json("https://5c8b765b.ngrok.io/api/storage/", function (av) {
    //
    //    d3.selectAll(".load").remove();
    //
    //    gojek.append("text")
    //        .attr("x", 1225)
    //        .attr("y", 160)
    //        .attr("font-size", "18")
    //        .attr("font-weight", "bold")
    //        .text(av[0]['hr']);
    //
    //    gojek.append("text")
    //        .attr("x", 1220)
    //        .attr("y", 210)
    //        .attr("font-size", "18")
    //        .attr("font-weight", "bold")
    //        .text(av[0]['distance'] + ' km');
    //
    //    gojek.append("text")
    //        .attr("x", 1220)
    //        .attr("y", 270)
    //        .attr("font-size", "18")
    //        .attr("font-weight", "bold")
    //        .text(av[0]['duration'] + ' minutes');
    //
    //    gojek.append("text")
    //        .attr("x", 1220)
    //        .attr("y", 100)
    //        .attr("font-size", "18")
    //        .attr("font-weight", "bold")
    //        .text(av[0]['attention']);
    //
    //    gojek.append("text")
    //        .attr("x", 1250)
    //        .attr("y", 100)
    //        .attr("font-size", "18")
    //        .attr("font-weight", "bold")
    //        .text('- ' + av[0]['attState']);
    //
    //    gojek.append("text")
    //        .attr("x", 1230)
    //        .attr("y", 120)
    //        .attr("font-size", "18")
    //        .attr("font-weight", "bold")
    //        .text(av[0]['meditation']);
    //
    //    gojek.append("text")
    //        .attr("x", 1245)
    //        .attr("y", 120)
    //        .attr("font-size", "18")
    //        .attr("font-weight", "bold")
    //        .text('- ' + av[0]['medState']);
    //
    //    gojek.append("text")
    //        .attr("x", 1200)
    //        .attr("y", 410)
    //        .attr("font-weight", "bold")
    //        .attr("font-size", "18")
    //        .text(av[0]['rest'] + ' minutes');
    //});
}