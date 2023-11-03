const data = [
    { date: "July 1, 2008", location: "Nevada, United States", velocity: 9.8, energy: 3.6 },
    { date: "April 19, 2018", location: "Indian Ocean", velocity: 10.9, energy: 51.2 },
    { date: "August 2, 2020", location: "Indian Ocean", velocity: 11.1, energy: 7.4 },
    { date: "September 20, 2018", location: "Indian Ocean", velocity: 11.1, energy: 8.3 },
    { date: "June 26, 2014", location: "Indian Ocean", velocity: 11.2, energy: 6.1 },
    { date: "October 21, 2008", location: "Northern Pacific Ocean", velocity: 11.3, energy: 4.6 },
    { date: "April 22, 2019", location: "Southern Indian Ocean", velocity: 11.4, energy: 12.4 },
    { date: "November 19, 2017", location: "Southern Pacific Ocean", velocity: 11.4, energy: 2.8 },
    { date: "May 21, 2019", location: "Southern Indian Ocean", velocity: 11.5, energy: 65.6 },
    { date: "May 3, 2018", location: "United Kingdom", velocity: 11.5, energy: 3.8 },
    { date: "January 27, 2016", location: "Indian Ocean", velocity: 11.5, energy: 5.0 },
    { date: "January 22, 2019", location: "United Arab Emirates", velocity: 11.6, energy: 3.6 },
    { date: "May 25, 2011", location: "India", velocity: 11.6, energy: 228.0 },
    { date: "January 9, 2008", location: "Southern Pacific Ocean", velocity: 11.6, energy: 4.1 },
    { date: "September 18, 2020", location: "South Pacific Ocean", velocity: 11.7, energy: 4.1 },
    { date: "March 3, 2016", location: "Indian Ocean", velocity: 11.7, energy: 5.8 },
    { date: "October 10, 2015", location: "Indian Ocean", velocity: 11.8, energy: 3.6 },
    { date: "December 8, 2013", location: "Southern Pacific Ocean", velocity: 11.8, energy: 6.4 },
    { date: "March 12, 2012", location: "Pacific Ocean", velocity: 11.8, energy: 9.9 },
    { date: "March 1, 2011", location: "Malaysia", velocity: 11.9, energy: 3.7 }
];


// Scatterplot
const margin = { top: 80, right: 30, bottom: 80, left: 80 };
const width = 800 - margin.left - margin.right;
const height = 800 - margin.top - margin.bottom; // Adjusted height

// SVG container for html
const svg = d3.select('.scatterplotart-container')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

const customMaxX = 12; // custom maximum for the x-axis
const customMaxY = 250;
// Scales
const xScale = d3.scaleLinear()
    .domain([9.5, customMaxX]) // custom maximum for the x-axis
    .range([0, width]);

const yScale = d3.scaleLinear()
    .domain([0, customMaxY]) //  custom maximum for the y-axis
    .range([height, 0]);


const colorScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.energy)]) // Adjust the domain according to your data
    .range(['steelblue', 'cyan']);

    // Gridlines for the x-axis
function make_x_gridlines() {
    return d3.axisBottom(xScale).ticks(5);
}

// Gridlines for the y-axis
function make_y_gridlines() {
    return d3.axisLeft(yScale).ticks(5);
}

// x gridlines 
svg.append('g')
    .attr('class', 'grid')
    .attr('transform', `translate(0, ${height})`)
    .call(make_x_gridlines()
        .tickSize(-height)
        .tickFormat(''));

// y gridlines 
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
    .attr('cy', d => yScale(0))
    .attr('r', 6)
    .attr('fill', 'steelblue') // Set initial color as blue
    
    .transition()
    .duration(2000) // Animation duration
    .delay((d, i) => i * 100) // Staggered delay for the animation
    .attr('cy', d => yScale(d.energy))
    .attrTween('fill', function(d) {
        const i = d3.interpolateRgb('steelblue', colorScale(d.energy)); // Interpolate colors
        return function(t) {
            return i(t);
        };
    })
    // Event listeners for the tooltip
    /*.on("mouseover", function(event, d) {
        // Define the tooltip
        const tooltip = d3.select('.tooltip');
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(`<strong>Date:</strong> ${d.date}<br>
                      <strong>Location:</strong> ${d.location}<br>
                      <strong>Energy:</strong> ${d.energy}<br>
                      <strong>Velocity:</strong> ${d.velocity}`);
        
        tooltip.style('left', (event.pageX) + 'px')
            .style('top', (event.pageY - 28) + 'px');
        
        d3.select(this).attr('fill', 'red'); // Visual indication for the hovered dot
    })
    .on("mouseout", function() {
        // Hide the tooltip and reset the dot color
        d3.select('.tooltip').transition().duration(500).style('opacity', 0);
        d3.select(this).attr('fill', 'steelblue');
    })*/;

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
//Global font


// Axis labels
svg.append('text')
    .attr('class', 'x-axis-label')
    .attr('x', width / 2)
    .attr('y', height + margin.top -20)
    .style('font-family', 'Poppins, sans-serif')
    .style('font-weight', 'bold')
    .text('Velocity');

svg.append('text')
    .attr('class', 'y-axis-label')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', -60)
    .attr('dy', '1em')
    .style('font-family', 'Poppins, sans-serif')
    .style('font-weight', 'bold')
    .style('text-anchor', 'middle')
    .text('Energy');

svg.append('text')
    .attr('x', width / 3)
    .attr('y', -40)
    .style('font-family', 'Poppins, sans-serif')
    .style('font-weight', 'bold')
    .style('font-size', '20px')
    .text('Fireball Velocity vs Energy');