const width = 700
let dimensions = {
    width: width,
    height: width * 0.6,
    margin: {
        top: 20,
        right: 40,
        bottom: 20,
        left: 40,
    },
}
dimensions.boundedWidth = dimensions.width
    - dimensions.margin.left
    - dimensions.margin.right
dimensions.boundedHeight = dimensions.height
    - dimensions.margin.top
    - dimensions.margin.bottom

const svg = d3.select("#wrapper")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)

async function drawBar() {

    const data = await d3.csv("./timesCitedMean.csv")
    var subgroups = ['pubCount','totalCite']
    const X = d3.map(data, x);
    const Y = d3.map(data, y);
    const Z = d3.map(data, z);
}

async function drawScatter() {
    let citedData = Object.entries(await d3.json("./timesCitedMean.json"))
    const scatter = svg.append("g")
        .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`)

    const citedYScale = d3.scaleLinear()
        .domain([0, d3.max(citedData, yAccessor)])
        .range([dimensions.boundedHeight, 0])

    const citedYAxis = d3.axisRight(citedYScale)
    scatter.append("g")
        .attr("class", "y-axis")
        .call(citedYAxis)
        .style("transform", `translate(${dimensions.boundedWidth}px, ${0}px)`)

    scatter.append("path")
        .datum(citedData)
        .attr("fill", "none")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(d => xScale(xAccessor(d)))
            .y(d => citedYScale(yAccessor(d)))
        )

    scatter.append("g")
        .selectAll("dot")
        .data(citedData)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(xAccessor(d)))
        .attr("cy", d => citedYScale(yAccessor(d)))
        .attr("r", 5)
        .attr("fill", "#69b3a2")
}

drawBar()
// drawScatter()