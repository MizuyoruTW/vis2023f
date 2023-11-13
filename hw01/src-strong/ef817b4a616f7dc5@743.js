import define1 from "./a33468b95d0b15b0@817.js";

function _1(md) {
  return (
    md`# Strong Baseline (4pt)`
  )
}

function _key(legend, chart) {
  return (
    legend({ color: chart.scales.color, title: "" })
  )
}

function _chart(d3, data) {
  // Specify the chart’s dimensions.
  const width = 10000;
  const height = 5000;
  const marginTop = 10;
  const marginRight = 10;
  const marginBottom = 20;
  const marginLeft = 40;

  // Determine the series that need to be stacked.
  const series = d3.stack()
    .keys(d3.union(data.map(d => d.homework))) // distinct series keys, in input order
    .value(([, D], key) => D.get(key).grades) // get value for each series key and stack
    (d3.index(data, d => d.id, d => d.homework)); // group by stack then series key

  // Prepare the scales for positional and color encodings.
  const x = d3.scaleBand()
    .domain(d3.groupSort(data, D => -d3.sum(D, d => d.grades), d => d.id))
    .range([marginLeft, width - marginRight])
    .padding(0.1);

  const y = d3.scaleLinear()
    .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
    .rangeRound([height - marginBottom, marginTop]);

  const color = d3.scaleOrdinal()
    .domain(series.map(d => d.key))
    .range(d3.schemeSpectral[series.length])
    .unknown("#ccc");

  // A function to format the value in the tooltip.
  const formatValue = x => isNaN(x) ? "N/A" : x.toLocaleString("en")

  // Create the SVG container.
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  // Append a group for each series, and a rect for each element in the series.
  svg.append("g")
    .selectAll()
    .data(series)
    .join("g")
    .attr("fill", d => color(d.key))
    .selectAll("rect")
    .data(D => D.map(d => (d.key = D.key, d)))
    .join("rect")
    .attr("x", d => x(d.data[0]))
    .attr("y", d => y(d[1]))
    .attr("height", d => y(d[0]) - y(d[1]))
    .attr("width", x.bandwidth())
    .append("title")
    .text(d => `學號: ${d.data[0]}\n姓名: ${d.data[1].get(d.key).name}\n${d.key}\n分數: ${d.data[1].get(d.key).grades}`);

  // Append the horizontal axis.
  svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .call(g => g.selectAll(".domain").remove());

  // Append the vertical axis.
  svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).ticks(null, "s"))
    .call(g => g.selectAll(".domain").remove());

  // Return the chart with the color scale as a property (for the legend).
  return Object.assign(svg.node(), { scales: { color } });
}


async function _data(FileAttachment) {
  let data = await FileAttachment("data.csv").csv();
  let homework = ["作業一", "作業二", "作業三", "作業四", "作業五", "作業六", "作業七", "作業八", "作業九", "作業十"]
  let newdata = [];
  data.forEach(function (e) {
    for (var i = 0; i < 10; i++) {
      newdata.push({
        id: e["學號"],
        name: e["姓名"],
        homework: homework[i],
        grades: e[homework[i]]
      })
    }
  })
  return newdata
}


function _6(md) {
  return (
    md`Using [Observable Plot](https://observablehq.com/plot)’s concise API, you can create a similar chart with a [bar mark](https://observablehq.com/plot/marks/bar). See the [Plot: Stacked bar chart](https://observablehq.com/@observablehq/plot-stacked-bar-chart?intent=fork) example notebook.`
  )
}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.csv", { url: new URL("./csv/data.csv", import.meta.url), mimeType: "text/csv", toString }]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("key")).define("key", ["legend", "chart"], _key);
  main.variable(observer("chart")).define("chart", ["d3", "data"], _chart);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  const child1 = runtime.module(define1);
  main.import("legend", child1);
  main.variable(observer()).define(["md"], _6);
  return main;
}
