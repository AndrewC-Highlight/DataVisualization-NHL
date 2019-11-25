
// Convert Team Data
function teamRowConverter(row) {
  return {
    rank: parseInt(row.Rk),
    team_name: row.Team_Name,
    team_age: parseFloat(row.AvAge),
    games_played: parseInt(row.GP),
    wins: parseInt(row.W),
    losses: parseInt(row.L),
    ot_losses: parseInt(row.OL),
    pts: parseInt(row.PTS),
    goals_for: parseInt(row.GF),
    goals_against: parseInt(row.GA),
    powerplay_percentage: parseInt(row.PP),
    penaltykill_percentage: parseInt(row.PK),
  }
}

// Convert Player Data
function playerRowConverter(row) {
  return {
    player_name: row.player_name,
    pos: row.pos,
    games_played: row.games_played,
    goals: parseInt(row.g),
    assists: parseInt(row.a),
    pts: parseInt(row.pts),
    pims: parseInt(row.pims),
    sog: parseInt(row.sog),
    gwg: parseInt(row.gwg),
    ppp: parseInt(row.ppp),
    shp: parseInt(row.shp),
    hits: parseInt(row.hits),
    blk: parseInt(row.blk)
  }
}


// Dataset
let dataset;
let playerDataset;
let xScale, yScale;
let xAxis, yAxis;
let xAxisGroup, yAxisGroup;
let colorScale;

// Chart Type Vars
const width = 700;
const heightScatter = 576;
const heightPadding = 40;
const barColorA = '#ecfcff';
const barColorB = '#5edfff';
const scatterColor = '#77dd77';

// Config Groups for charts
const pointsBarConfig = {
  xVar: 'pts',
  yVar: 'team_name',
  colorA: barColorA,
  colorB: barColorB,
  xAxisTitle: "Points",
  chart: '#chart1',
  tooltip: ((d) => `Record: ${d.wins}-${d.losses}-${d.ot_losses}`),
  mark: 'rect'
}

const goalScatterConfig = {
  xVar: 'goals_against',
  yVar: 'goals_for',
  color: scatterColor,
  xAxisTitle: "Goals Against",
  yAxisTitle: "Goals For",
  chart: "#chart2",
  tooltip: ((d) => `${d.team_name} Diff: ${(d.goals_for) - (d.goals_against)}`),
  mark: 'circle'
}

const ageScatterConfig = {
  xVar: 'team_age',
  yVar: 'pts',
  color: scatterColor,
  xAxisTitle: "Average Team Age",
  yAxisTitle: "Team Points",
  chart: "#chart3",
  tooltip: ((d) => `${d.team_name}: ${d.team_age}`),
  mark: 'circle'
}

const playerPtsBarConfig = {
  xVar: 'pts',
  yVar: 'player_name',
  colorA: barColorA,
  colorB: barColorB,
  xAxisTitle: "Points",
  chart: '#chart4',
  tooltip: ((d) => `G:${d.goals},  A:${d.assists}, Pts:${d.pts}`),
  mark: 'rect'
}

const playerGAScatterConfig = {
  xVar: 'assists',
  yVar: 'goals',
  color: scatterColor,
  xAxisTitle: 'Assists',
  yAxisTitle: 'Goals',
  chart: "#chart5",
  tooltip: ((d) => `${d.player_name} G:${d.goals},  A:${d.assists}`),
  mark: 'circle'
}




// Chart for Bars - what a great comment andrew wow
// takes the dataset and specific config setting
function makeBarChart(dataset, setting) {

  const w = width;
  const h = dataset.length * 20; // Magic Number sorry
  const config = setting;

  chart = d3.select(config.chart)
    .attr('width', w)
    .attr('height', h);

  // Scales
  xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, d => d[config.xVar])])
    .rangeRound([0, w - 150]); // magic number here, basically the sweet spot to get the axis end tick to show

  yScale = d3.scaleBand()
    .domain(dataset.map(d => d[config.yVar]))
    .rangeRound([heightPadding, h - heightPadding]);

  colorScale = d3.scaleLinear()
    .domain(xScale.domain())
    .range([config.colorA, config.colorB]);

  // Create bars
  chart.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('x', 140)
    .attr('y', d => yScale(d[config.yVar]))
    .attr('width', d => xScale(d[config.xVar]))
    .attr('height', 14)
    .attr('fill', d => colorScale(d[config.xVar]))
    .call(attachMouseEvents, config)


  xAxis = d3.axisBottom(xScale);
  yAxis = d3.axisLeft(yScale)
  // AXES
  xAxisGroup = chart.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(140, ${h - heightPadding})`)
    .call(xAxis);

  yAxisGroup = chart.append('g')
    .attr('class', 'axis-left1')
    .attr('transform', `translate(140,0 )`)
    .call(yAxis);

  // Axis Labels
  chart.append('text')
    .attr('class', 'axis-label')
    .attr('transform', `translate(${w / 2}, ${h})`)
    .text(config.xAxisTitle);
}

// Make A Scatter Plot - two for two nice
// takes dataset and specified config setting
function makeScatterPlot(dataset, setting) {
  const w = width;
  const h = heightScatter; // Magic Numbers sorry
  const config = setting;

  const chart = d3.select(config.chart)
    .attr('width', w)
    .attr('height', h);

  // Scales
  const xScale = d3.scaleLinear()
    .domain([d3.min(dataset, (d) => d[config.xVar]) - 5, d3.max(dataset, (d) => d[config.xVar]) + 5])
    .range([0, (w - 150)]);

  const yScale = d3.scaleLinear()
    .domain([d3.min(dataset, (d) => d[config.yVar]) - 5, d3.max(dataset, (d) => d[config.yVar]) + 5])
    .range([h - heightPadding, heightPadding]);



  // Circle Positions
  chart.selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('cx', (d) => xScale(d[config.xVar]) + 140)
    .attr('cy', (d) => yScale(d[config.yVar]))
    .attr('r', 6)
    .attr('fill', config.color)
    .call(attachMouseEvents, config)

  // Axes
  xAxis = d3.axisBottom(xScale);
  yAxis = d3.axisLeft(yScale)

  xAxisGroup = chart.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(140, ${h - heightPadding})`)
    .call(xAxis);

  yAxisGroup = chart.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(140,0)`)
    .call(yAxis);

  // Axis Labels
  chart.append('text')
    .attr('class', 'axis-label')
    .attr('transform', `rotate(-90)`)
    .attr('text-anchor', 'middle')
    .attr('x', -h / 2)
    .attr('y', 70)
    .text(config.yAxisTitle);

  chart.append('text')
    .attr('class', 'axis-label')
    .attr('transform', `translate(${w / 2}, ${h - 5})`)
    .text(config.xAxisTitle);
}

// Mouse Events
// Mainly adds tooltip functionality.
function attachMouseEvents(sel, config) {
  console.log(config)
  // Set chart for selection
  const chart = d3.select(config.chart)
  sel
    .on('mouseover', function (d) {
      // Set up mouse tool tip on move
      sel.on('mousemove', () => {
        const bodyDOMElem = d3.select('body').node();
        const [mouseX, mouseY] = d3.mouse(bodyDOMElem);
        d3.select("#tooltip")
          .style("left", `${mouseX + 20}px`)
          .style("top", `${mouseY}px`)
          .select("#value")
          .text(config.tooltip(d)); // text change based on selected graph config's tooltip
      });

      // Show tooltip
      d3.select("#tooltip")
        .classed("hidden", false);

      d3.select(this)
        .classed('selected', true);

      // Filter out of all the marks that aren't selected
      chart.selectAll(config.mark).filter(function () {
        // this particular solution/idea to a "not" selector for d3 retrieved from
        // https://stackoverflow.com/a/43524079
        return !this.classList.contains('selected')
      })
        .transition('hover')
        .duration(1000)
        .style('opacity', 0.25);

    })
    .on('mouseout', function () {

      // Deselect the previous selection
      d3.select(this)
        .classed('selected', false);

      d3.select("#tooltip")
        .classed('hidden', true);

      // Return all marks back to regular colors and opacity
      chart.selectAll(config.mark)
        .transition('hover')
        .duration(500)
        .style('opacity', 1);

      sel.on('mousemove', null);
    })

}

// Begin!
function initGraph() {
  // Load in team data
  d3.csv(require("./nhl-stats-20182019.csv"), teamRowConverter)
    .then((data) => {
      dataset = data;

      // Set up charts with team data
      console.log(dataset);
      makeBarChart(dataset.sort((a, b) => b.pts - a.pts), pointsBarConfig);
      makeScatterPlot(dataset, goalScatterConfig);
      makeScatterPlot(dataset, ageScatterConfig);
    })

  // Load in player data
  d3.csv(require('./nhl-player-stats-20182019.csv'), playerRowConverter)
    .then((data) => {
      playerDataset = data;
      console.log(playerDataset);

      // Set up charts with player data
      makeBarChart(playerDataset.sort((a, b) => b.pts - a.pts).slice(0, 19), playerPtsBarConfig);
      makeScatterPlot(playerDataset.sort((a, b) => b.pts - a.pts).slice(0, 100), playerGAScatterConfig);
    })
}


window.onload = initGraph();


