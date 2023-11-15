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
  .on('mouseover', function () {
    // glow and increase opacity on hover
    d3.select(this)
      .transition()
      .duration(300)
      .attr('fill', 'cyan')
      .attr('opacity', 1.0); 
  })
  .on('mouseout', function () {
    // restores the original color and opacity on mouseout
    d3.select(this)
      .transition()
      .duration(300)
      .attr('fill', 'steelblue')
      .attr('opacity', 0.7);
  })
  .transition()
  .duration(2000)
  .delay((d, i) => i * 100)
  .attr('cy', d => scatterYScale(d.energy))
  .attrTween('fill', function(d) {
    const i = d3.interpolateRgb('steelblue', colorScale(d.energy));
    return function(t) {
      return i(t);
    };
  });


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

  

// . . . heatmap

// fireball energies
const fireballEnergies = [
    36, 50, 70, 80, 60, 46, 104, 28, 66, 38,
    50, 36, 170, 41, 41, 58, 36, 64, 99, 37
];

// dimensions and margins
const heatmapMargin = { top: 20, right: 80, bottom: 60, left: 80 };
const blockWidth = 180;
const blockHeight = 180;
const gridWidth = 5;

// dimensions for the heatmap
const heatmapWidth = gridWidth * blockWidth + heatmapMargin.left + heatmapMargin.right;
const heatmapHeight = Math.ceil(fireballEnergies.length / gridWidth) * blockHeight + heatmapMargin.top + heatmapMargin.bottom;

// svg for the heatmap
const heatmapSvg = d3.select('.heatmap-container')
    .append('svg')
    .attr('width', heatmapWidth)
    .attr('height', heatmapHeight)
    .append('g')
    .attr('transform', `translate(${heatmapMargin.left}, ${heatmapMargin.top})`);

// color scale for intensity
const heatmapColorScale = d3.scaleLinear()
    .domain([0, d3.max(fireballEnergies)])
    .range(['#ff6600', '#FFA500']);

// heatmap 
const heatmapGroup = heatmapSvg.append('g')
    .attr('transform', `translate(${heatmapMargin.left}, ${heatmapMargin.top})`)
    .append('rect')
    .attr('width', heatmapWidth - heatmapMargin.left - heatmapMargin.right)
    .attr('height', heatmapHeight - heatmapMargin.top - heatmapMargin.bottom)
    .attr('rx', 15) 
    .attr('ry', 15) 
    .style('fill', 'none');

// blocks for the heatmap
heatmapSvg.selectAll('rect.block')
    .data(fireballEnergies)
    .enter()
    .append('rect')
    .classed('block', true)
    .attr('x', (d, i) => (i % gridWidth) * blockWidth)
    .attr('y', (d, i) => Math.floor(i / gridWidth) * blockHeight)
    .attr('width', blockWidth)
    .attr('height', blockHeight)
    .attr('fill', d => heatmapColorScale(d))
    .attr('rx', 10)
    .attr('ry', 10)
    .attr('filter', 'url(#heatmapGlow)') // Apply the glow filter
    .on('mouseover', function () {
        // make block slightly lighter on hover with eased transition
        d3.select(this).transition().duration(300).ease(d3.easeCubicInOut)
            .attr('fill', d3.color(heatmapColorScale(d3.select(this).data()[0])).brighter(1).toString());
    })
    .on('mouseout', function (event, d) {
        // restore with eased transition
        d3.select(this).transition().duration(300).ease(d3.easeCubicInOut)
            .attr('fill', heatmapColorScale(d));
    })
    .on('click', function () {
        // add a tiny wiggle on click
        d3.select(this).transition().duration(50)
            .attr('transform', 'translate(3,0)')
            .transition().duration(50)
            .attr('transform', 'translate(-3,0)')
            .transition().duration(50)
            .attr('transform', 'translate(3,0)')
            .transition().duration(50)
            .attr('transform', 'translate(0,0)');
    });



// . . . radial chart

const radialChartData = [
    36, 50, 70, 80, 60, 46, 104, 28, 66, 38,
    50, 36, 170, 41, 41, 58, 36, 64, 99, 37
  ];
  
const radialChartMargin = { top: 80, right: 80, bottom: 80, left: 80 };
const radialChartWidth = 600 - radialChartMargin.left - radialChartMargin.right;
const radialChartHeight = 650 - radialChartMargin.top - radialChartMargin.bottom;
const radius = Math.min(radialChartWidth, radialChartHeight) / 2;
const outerRadius = 1.5 * radius; 
const innerRadius = 0.8 * outerRadius;

// svg container for radial chart
const radialChartSvg = d3.select('.radial-chart-container')
    .append('svg')
    .attr('width', radialChartWidth + radialChartMargin.left + radialChartMargin.right)
    .attr('height', radialChartHeight + radialChartMargin.top + radialChartMargin.bottom)
    .append('g')
    .attr('transform', `translate(${radialChartWidth / 2 + radialChartMargin.left}, ${radialChartHeight / 2 + radialChartMargin.top})`);

  // x scale
const x = d3.scaleBand()
    .range([0, 2 * Math.PI])
    .align(0)
    .domain(radialChartData.map((d, i) => i.toString()));
  // y scale
const y = d3.scaleRadial()
    .range([innerRadius, outerRadius])
    .domain([0, d3.max(radialChartData)]);

// bars
radialChartSvg.append('g')
    .selectAll('path')
    .data(radialChartData)
    .enter()
    .append('path')
    .attr('fill', 'yellow')
    .attr('stroke', '#FFA500') // glowing orange color
    .attr('stroke-width', 5) 
    .attr('filter', 'url(#glow)') 
    .attr('d', d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(d => y(d))
        .startAngle((d, i) => x(i.toString()))
        .endAngle((d, i) => x(i.toString()) + x.bandwidth())
        .padRadius(innerRadius)
    )
    // mouse hover effect
    .on('mouseover', function () {
        d3.select(this)
            .transition()
            .duration(200)
            .ease(d3.easeLinear) 
            .attr('fill', '#FFFFE0'); 
    })
    .on('mouseout', function () {
        d3.select(this)
            .transition()
            .duration(200)
            .ease(d3.easeLinear) 
            .attr('fill', 'yellow');
    });

// void fill
radialChartSvg.append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', innerRadius)
    .attr('fill', 'black');
// glow effect
const glowFilter = radialChartSvg.append('defs')
    .append('filter')
    .attr('id', 'glow')
    .attr('x', '-50%')
    .attr('y', '-50%')
    .attr('width', '200%')
    .attr('height', '200%');
  
glowFilter.append('feGaussianBlur')
    .attr('in', 'SourceGraphic')
    .attr('stdDeviation', 3) 
    .attr('result', 'glow');







