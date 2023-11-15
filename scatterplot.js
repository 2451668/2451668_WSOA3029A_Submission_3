// . . . scatterplot

const scatterMargin = { top: 80, right: 30, bottom: 80, left: 80 };
const scatterWidth = 800 - scatterMargin.left - scatterMargin.right;
const scatterHeight = 800 - scatterMargin.top - scatterMargin.bottom;

const scatterSvg = d3.select('.scatterplot-container')
    .append('svg')
    .attr('width', scatterWidth + scatterMargin.left + scatterMargin.right)
    .attr('height', scatterHeight + scatterMargin.top + scatterMargin.bottom)
    .append('g')
    .attr('transform', `translate(${scatterMargin.left}, ${scatterMargin.top})`);

const customMaxX = 12;
const customMaxY = 250;
// scales
const scatterXScale = d3.scaleLinear()
    .domain([9.5, customMaxX])
    .range([0, scatterWidth]);

const scatterYScale = d3.scaleLinear()
    .domain([0, customMaxY])
    .range([scatterHeight, 0]);



const colorScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.energy)])
    .range(['steelblue', 'cyan']);
// gridlines for the x-axis
function make_scatter_x_gridlines() {
    return d3.axisBottom(scatterXScale).ticks(5);
}

// gridlines for the y-axis
function make_scatter_y_gridlines() {
    return d3.axisLeft(scatterYScale).ticks(5);
}
// x gridlines 
scatterSvg.append('g')
    .attr('class', 'grid')
    .attr('transform', `translate(0, ${scatterHeight})`)
    .call(make_scatter_x_gridlines()
        .tickSize(-scatterHeight)
        .tickFormat(''));

// y gridlines 
scatterSvg.append('g')
    .attr('class', 'grid')
    .call(make_scatter_y_gridlines()
        .tickSize(-scatterWidth)
        .tickFormat(''));

// Circles
scatterSvg
  .selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('cx', d => scatterXScale(d.velocity))
  .attr('cy', d => scatterYScale(0))
  .attr('r', 6)
  .attr('fill', 'steelblue')
  .attr('opacity', 0.7)
  .transition()
  .duration(2000)
  .delay((d, i) => i * 100)
  .attr('cy', d => scatterYScale(d.energy))
  .attrTween('fill', function(d) {
    const i = d3.interpolateRgb('steelblue', colorScale(d.energy));
    return function(t) {
      return i(t);
    };
  })
;

// axes
const scatterXAxis = d3.axisBottom(scatterXScale);
const scatterYAxis = d3.axisLeft(scatterYScale);


scatterSvg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${scatterHeight})`)
    .call(scatterXAxis);

scatterSvg.append('g')
    .attr('class', 'y-axis') 
    .call(scatterYAxis);

// axis labels
scatterSvg.append('text')
    .attr('class', 'x-axis-label')
    .attr('x', scatterWidth / 2)
    .attr('y', scatterHeight + scatterMargin.top -20)
    .style('font-family', 'Poppins, sans-serif')
    .style('font-weight', 'bold')
    .text('Velocity');

scatterSvg.append('text')
    .attr('class', 'y-axis-label')
    .attr('transform', 'rotate(-90)')
    .attr('x', -scatterHeight / 2)
    .attr('y', -60)
    .attr('dy', '1em')
    .style('font-family', 'Poppins, sans-serif')
    .style('font-weight', 'bold')
    .style('text-anchor', 'middle')
    .text('Energy');

scatterSvg.append('text')
    .attr('x', scatterWidth / 3)
    .attr('y', -40)
    .style('font-family', 'Poppins, sans-serif')
    .style('font-weight', 'bold')
    .style('font-size', '20px')
    .text('Fireball Velocity vs Energy');


// . . . bar plot

// dimensions and margins
const chartMargin = { top: 50, right: 5, bottom: 100, left: 50 };
const chartWidth = 800 - chartMargin.left - chartMargin.right;
const chartHeight = 500 - chartMargin.top - chartMargin.bottom;
const barChartSvg = d3.select('.bar-chart-container')
    .append('svg')
    .attr('width', chartWidth + chartMargin.left + chartMargin.right)
    .attr('height', chartHeight + chartMargin.top + chartMargin.bottom)
    .append('g')
    .attr('transform', `translate(${chartMargin.left}, ${chartMargin.top})`);

// count the no. at each location
const locationFrequency = {};
data.forEach(entry => {
    const location = entry.location;
    locationFrequency[location] = (locationFrequency[location] || 0) + 1;
});

const frequencyData = Object.entries(locationFrequency).map(([location, frequency]) => ({
    location,
    frequency
}));

// scales
const barXScale = d3.scaleBand()
    .domain(frequencyData.map(d => d.location))
    .range([0, chartWidth])
    .padding(0.1);

const barYScale = d3.scaleLinear()
    .domain([0, d3.max(frequencyData, d => d.frequency)])
    .range([chartHeight, 0]);

// draws bars
barChartSvg.selectAll('.bar')
    .data(frequencyData)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => barXScale(d.location))
    .attr('y', d => barYScale(d.frequency))
    .attr('width', barXScale.bandwidth())
    .attr('height', d => chartHeight - barYScale(d.frequency))
    .attr('fill', 'steelblue')
    .attr('rx', 5) 
    .attr('ry', 5); 

// function to create axes and labels
function createFrequencyBarChartAxes() {
    const xAxis = d3.axisBottom(barXScale);
    const yAxis = d3.axisLeft(barYScale).ticks(5);

    barChartSvg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.15em")
        .attr("transform", "rotate(-45)");

    barChartSvg.append('g')
        .attr('class', 'y-axis')
        .call(yAxis);

    /*barChartSvg.append('text')
        .attr('class', 'x-axis-label')
        .attr('x', chartWidth / 2)
        .attr('y', chartHeight + chartMargin.top + 20)
        .style('text-anchor', 'middle')
        .text('Location');*/

    barChartSvg.append('text')
        .attr('class', 'y-axis-label')
        .attr('transform', 'rotate(-90)')
        .attr('x', -chartHeight / 2)
        .attr('y', -chartMargin.left + 10)
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text('Frequency');
}

// creates axes and labels
createFrequencyBarChartAxes();

// title
barChartSvg.append('text')
    .attr('x', chartWidth / 3)
    .attr('y', -10)
    .style('font-weight', 'bold')
    .style('font-size', '20px')
    .text('Fireball Frequency in Different Locations');


// . . . line plot

const lineMargin = { top: 80, right: 30, bottom: 80, left: 80 };
const lineWidth = 800 - lineMargin.left - lineMargin.right;
const lineHeight = 400 - lineMargin.top - lineMargin.bottom;
const lineSvg = d3.select('.line-chart-container')
    .append('svg')
    .attr('width', lineWidth + lineMargin.left + lineMargin.right)
    .attr('height', lineHeight + lineMargin.top + lineMargin.bottom)
    .append('g')
    .attr('transform', `translate(${lineMargin.left}, ${lineMargin.top})`);

// scales for line chart
const lineXScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.velocity), d3.max(data, d => d.velocity)])
    .range([0, lineWidth]);

const lineYScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.energy)])
    .range([lineHeight, 0]);

//x and y axes
const lineXAxis = d3.axisBottom(lineXScale);
const lineYAxis = d3.axisLeft(lineYScale);

// line connecting points
lineSvg.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 2)
    .attr('d', d3.line()
        .x(d => lineXScale(d.velocity))
        .y(d => lineYScale(d.energy))
    );

// axes and labels 
lineSvg.append('g')
  .attr('class', 'x-axis')
  .attr('transform', `translate(0, ${lineHeight})`)
  .call(lineXAxis);

lineSvg.append('g')
  .attr('class', 'y-axis') 
  .call(lineYAxis);

// axis labels
lineSvg.append('text')
  .attr('class', 'x-axis-label')
  .attr('x', lineWidth / 2)
  .attr('y', lineHeight + lineMargin.top - 20)
  .style('font-family', 'Poppins, sans-serif')
  .style('font-weight', 'bold')
  .text('Velocity');

lineSvg.append('text')
  .attr('class', 'y-axis-label')
  .attr('transform', 'rotate(-90)')
  .attr('x', -lineHeight / 2)
  .attr('y', -60)
  .attr('dy', '1em')
  .style('font-family', 'Poppins, sans-serif')
  .style('font-weight', 'bold')
  .style('text-anchor', 'middle')
  .text('Energy');

lineSvg.append('text')
  .attr('x', lineWidth / 3)
  .attr('y', -40)
  .style('font-family', 'Poppins, sans-serif')
  .style('font-weight', 'bold')
  .style('font-size', '20px')
  .text('Fireball Velocity vs Energy');