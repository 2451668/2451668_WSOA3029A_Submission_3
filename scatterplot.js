const data = [
    { velocity: 9.8, energy: 3.6 },
    { velocity: 10.9, energy: 51.2 },
    { velocity: 11.1, energy: 7.4 },
    { velocity: 11.1, energy: 8.3 },
    { velocity: 11.2, energy: 6.1 },
    { velocity: 11.3, energy: 4.6 },
    { velocity: 11.4, energy: 12.4 },
    { velocity: 11.4, energy: 2.8 },
    { velocity: 11.5, energy: 65.6 },
    { velocity: 11.5, energy: 3.8 },
    { velocity: 11.5, energy: 5.0 },
    { velocity: 11.6, energy: 3.6 },
    { velocity: 11.6, energy: 228.0 },
    { velocity: 11.6, energy: 4.1 },
    { velocity: 11.7, energy: 4.1 },
    { velocity: 11.7, energy: 5.8 },
    { velocity: 11.8, energy: 3.6 },
    { velocity: 11.8, energy: 6.4 },
    { velocity: 11.8, energy: 9.9 },
    { velocity: 11.9, energy: 3.7 }
];

// Scatterplot configuration
const margin = { top: 30, right: 30, bottom: 50, left: 60 };
const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom; // Adjusted height

// Create SVG container
const svg = d3.select('.scatterplot-container')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

const customMaxX = 12; // Replace with your desired maximum for the x-axis
const customMaxY = 250;
// Scales
const xScale = d3.scaleLinear()
    .domain([10.8, customMaxX]) // custom maximum for the x-axis
    .range([0, width]);

const yScale = d3.scaleLinear()
    .domain([0, customMaxY]) //  custom maximum for the y-axis
    .range([height, 0]);

// Gridlines for the x-axis
function make_x_gridlines() {
    return d3.axisBottom(xScale).ticks(5);
}

// Gridlines for the y-axis
function make_y_gridlines() {
    return d3.axisLeft(yScale).ticks(5);
}

// Append x gridlines to the scatterplot
svg.append('g')
    .attr('class', 'grid')
    .attr('transform', `translate(0, ${height})`)
    .call(make_x_gridlines()
        .tickSize(-height)
        .tickFormat(''));

// Append y gridlines to the scatterplot
svg.append('g')
    .attr('class', 'grid')
    .call(make_y_gridlines()
        .tickSize(-width)
        .tickFormat(''));

// Circles
svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(d.velocity))
    .attr('cy', d => yScale(d.energy))
    .attr('r', 6)
    .attr('fill', 'steelblue');

// Axes
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis);

svg.append('g')
    .attr('class', 'y-axis') 
    .call(yAxis);

// Axis labels
svg.append('text')
    .attr('class', 'x-axis-label')
    .attr('x', width / 2)
    .attr('y', height + margin.top + 20)
    .text('Velocity');

svg.append('text')
    .attr('class', 'y-axis-label')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', -margin.left)
    .text('Energy');