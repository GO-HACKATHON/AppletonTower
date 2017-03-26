function draw_health(s, series) {
    var projection = d3.geo.mollweide().scale(99757.70190238953)
        .translate([-135100.91238308285, -11700.527968931943])
        .center([20, 0]);

    var path = d3.geo.path()
        .projection(projection);

    if (typeof series === 'number') {
        //console.log(series);
    }
    else if (typeof series === 'object') {
        if (series[0] == true) {

            d3.selectAll(".rumahsakit").remove();

            var ghost = d3.select(s).append("g")
                .attr("class", "rumahsakit")
                .attr("transform", "translate(" + -130 + "," + -30 + ")");

            d3.json("data/rumahsakit.json", function (json) {
                ghost.selectAll("path")
                    .data(json.features).enter()
                    .append("path")
                    .attr("fill", "white")
                    .attr("stroke", "black")
                    .attr("stroke-width", 0.5)
                    .attr("d", path)
                    .on("mouseover", rumahsakit)
                    .on("mouseout", rumahsakit_out)
                    .style("cursor", "pointer");
            });
        }
        else {
            d3.select("svg").selectAll(".rumahsakit").remove();
        }

        if (series[1] == true) {
            d3.selectAll(".puskesmas").remove();

            var gpus = d3.select(s).append("g")
                .attr("class", "puskesmas")
                .attr("transform", "translate(" + -130 + "," + -30 + ")");

            d3.json("data/puskesmas.json", function (json) {
                console.log(json);
                gpus.selectAll("path")
                    .data(json.features).enter()
                    .append("path")
                    .attr("fill", "black")
                    .attr("stroke", "yellow")
                    .attr("stroke-width", 0.5)
                    .attr("d", path)
                    .on("mouseover", puskesmas)
                    .on("mouseout", puskesmas_out)
                    .style("cursor", "pointer");
            });
        }
        else {
            d3.select("svg").selectAll(".puskesmas").remove();
        }
    }
}

function rumahsakit(d) {
    console.log(d);
    var projection = d3.geo.mollweide().scale(99757.70190238953)
        .translate([-135100.91238308285, -11700.527968931943])
        .center([20, 0]);
    lat = d['geometry']['coordinates'][0];
    lnd = d['geometry']['coordinates'][1];
    coor = [lat, lnd]
    d3.selectAll(".rukit").remove();

    var grukit = d3.select("svg").append("g")
        .attr("class", "rukit")
        .attr("transform", "translate(" + -100 + "," + -20 + ")");

    grukit.append("rect")
        .attr("width", 220)
        .attr("height", 60)
        .style("fill", "yellow")
        .style("stroke", "black")
        .style("opacity", 0.7)
        .style("stroke-width", "1px")
        .attr("x", projection(coor)[0])
        .attr("y", projection(coor)[1]);

    grukit.append("text")
        .attr("x", projection(coor)[0] + 10)
        .attr("y", projection(coor)[1] + 20)
        .attr("font-size", "12")
        .text(d['properties']['NAMA']);

    grukit.append("text")
        .attr("x", projection(coor)[0] + 10)
        .attr("y", projection(coor)[1] + 35)
        .attr("font-size", "12")
        .text(d['properties']['JALAN']);

    grukit.append("text")
        .attr("x", projection(coor)[0] + 10)
        .attr("y", projection(coor)[1] + 50)
        .attr("font-size", "12")
        .text(d['properties']['KELURAHAN']);
}

function rumahsakit_out(d) {
    d3.selectAll(".rukit").remove();
}

function puskesmas(d) {
    console.log(d);
    var projection = d3.geo.mollweide().scale(99757.70190238953)
        .translate([-135100.91238308285, -11700.527968931943])
        .center([20, 0]);
    lat = d['geometry']['coordinates'][0];
    lnd = d['geometry']['coordinates'][1];
    coor = [lat, lnd]
    d3.selectAll(".rukit").remove();

    var grukit = d3.select("svg").append("g")
        .attr("class", "rukit")
        .attr("transform", "translate(" + -100 + "," + -20 + ")");

    grukit.append("rect")
        .attr("width", 220)
        .attr("height", 60)
        .style("fill", "black")
        .style("stroke", "yellow")
        .style("opacity", 0.6)
        .style("stroke-width", "1px")
        .attr("x", projection(coor)[0])
        .attr("y", projection(coor)[1]);

    grukit.append("text")
        .attr("x", projection(coor)[0] + 10)
        .attr("y", projection(coor)[1] + 20)
        .style('fill', 'white')
        .attr("font-size", "12")
        .text(d['properties']['NAMA']);

    grukit.append("text")
        .attr("x", projection(coor)[0] + 10)
        .attr("y", projection(coor)[1] + 35)
        .style('fill', 'white')
        .attr("font-size", "12")
        .text(d['properties']['JALAN']);

    grukit.append("text")
        .attr("x", projection(coor)[0] + 10)
        .attr("y", projection(coor)[1] + 50)
        .style('fill', 'white')
        .attr("font-size", "12")
        .text(d['properties']['KELURAHAN']);
}

function puskesmas_out(d) {
    d3.selectAll(".rukit").remove();
}