function _1(md){return(
md`# HW06`
)}

function _artistVer(FileAttachment){return(
FileAttachment("artistVer.csv").csv()
)}

function _artistPublic(FileAttachment){return(
FileAttachment("artistPublic.csv").csv()
)}

function _data(selected,artistVer,artistPublic)
{
  let arr = [];
  if(selected.includes("artist")){
    let counts = [0,0,0,0,0];
    artistVer.forEach(function (e) {
      let val = e["3）從1到5級距，您認為藝術產業的碳排放量在那個相對位置？"];
      counts[parseInt(val)-1]++;
    })
    counts.forEach(function(e,idx){
      arr.push({
        from: "artist",
        grade: idx+1,
        counts: e,
      })
    })
  }
  if(selected.includes("artistpublic")){
    let counts = [0,0,0,0,0];
    artistPublic.forEach(function (e) {
      let val = e["4）從1到5級距，您認為藝術產業的碳排放量在那個相對位置？"];
      counts[parseInt(val)-1]++;
    })
    counts.forEach(function(e,idx){
      arr.push({
        from: "artistPub",
        grade: idx+1,
        counts: e,
      })
    })
  }
  return arr;
}


function _5(md){return(
md`## Simple baseline (用plot完成堆疊柱狀圖 +3, Checkbox input +1)`
)}

function _selected(Inputs){return(
Inputs.checkbox(["artist", "artistpublic"], {label: "選擇資料", value: ["artist", "artistpublic"]})
)}

function _7(Plot,data){return(
Plot.plot({
  x: {label: null},
  y: {label: null, grid: true, nice:true,},
  color: {legend: true},
  marks: [
    Plot.barY(data, {
      x: "grade",
      y: "counts",
      fill: "from",
    }),
  ]
})
)}

function _8(md){return(
md`## Medium baseline (SVG 柱狀圖 +2, Checkbox input +1, D3 過渡效果 +1)`
)}

function _data1(selected1,artistVer,artistPublic)
{
  let arr = [];
  if(selected1.includes("artist")){
    let counts = [0,0,0,0,0];
    artistVer.forEach(function (e) {
      let val = e["3）從1到5級距，您認為藝術產業的碳排放量在那個相對位置？"];
      counts[parseInt(val)-1]++;
    })
    counts.forEach(function(e,idx){
      arr.push({
        from: "artist",
        grade: idx+1,
        counts: e,
      })
    })
  }
  if(selected1.includes("artistpublic")){
    let counts = [0,0,0,0,0];
    artistPublic.forEach(function (e) {
      let val = e["4）從1到5級距，您認為藝術產業的碳排放量在那個相對位置？"];
      counts[parseInt(val)-1]++;
    })
    counts.forEach(function(e,idx){
      arr.push({
        from: "artistPub",
        grade: idx+1,
        counts: e,
      })
    })
  }
  return arr;
}


function _selected1(Inputs){return(
Inputs.checkbox(["artist", "artistpublic"], {label: "選擇資料", value: ["artist", "artistpublic"]})
)}

function _chart(d3,data1)
{
  // Specify the chart’s dimensions.
  const width = 928;
  const height = 500;
  const marginTop = 10;
  const marginRight = 10;
  const marginBottom = 20;
  const marginLeft = 40;

  // Determine the series that need to be stacked.
  const series = d3.stack()
      .keys(d3.union(data1.map(d => d.from))) // distinct series keys, in input order
      .value(([, D], key) => D.get(key).counts) // get value for each series key and stack
    (d3.index(data1, d => d.grade, d => d.from)); // group by stack then series key

  // Prepare the scales for positional and color encodings.
  const x = d3.scaleBand()
      .domain(data1.map(d => d.grade))
      .range([marginLeft, width - marginRight])
      .padding(0.1);

  const y = d3.scaleLinear()
      .domain([0, Math.ceil(d3.max(series, d => d3.max(d, d => d[1]))/10)*10])
      .rangeRound([height - marginBottom, marginTop]);

  const color = d3.scaleOrdinal()
      .domain(series.map(d => d.key))
      .range(d3.schemeCategory10.slice(0,series.length))
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
      .attr("y", d => height)
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .transition().duration(1000)
      .attr("height", d => y(d[0]) - y(d[1]))
      .attr("y", d => y(d[1]));

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
  return Object.assign(svg.node(), {scales: {color}});
}


function _12(md){return(
md`# String baseline(陰影 +2, 滑鼠偵測 +1)`
)}

function _data2(artistVer,artistPublic)
{
  let arr = [];
  {
    let counts = [0,0,0,0,0];
    artistVer.forEach(function (e) {
      let val = e["3）從1到5級距，您認為藝術產業的碳排放量在那個相對位置？"];
      counts[parseInt(val)-1]++;
    })
    counts.forEach(function(e,idx){
      arr.push({
        from: "artist",
        grade: idx+1,
        counts: e,
      })
    })
  }
  {
    let counts = [0,0,0,0,0];
    artistPublic.forEach(function (e) {
      let val = e["4）從1到5級距，您認為藝術產業的碳排放量在那個相對位置？"];
      counts[parseInt(val)-1]++;
    })
    counts.forEach(function(e,idx){
      arr.push({
        from: "artistPub",
        grade: idx+1,
        counts: e,
      })
    })
  }
  return arr;
}


function _chart2(d3,data2)
{
  // Specify the chart’s dimensions.
  const width = 928;
  const height = 500;
  const marginTop = 10;
  const marginRight = 10;
  const marginBottom = 20;
  const marginLeft = 40;

  // drop shadow filter
  let reposition = 1         // adjust to prevent clipping
  let scaleBoundingBox = 4   // adjust to prevent clipping
  let angle = 1.75 * Math.PI // angle of the offset, measured from the right, clockwise in radians
  let distance = 10           // how far the shadow is from object
  let blur = 2               // ammount of Gausian blur
  let shadowColor = '#003152'// 
  let shadowOpacity = .5     // how strong the shadow is
  
  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");
  
  var dropShadow = svg
  .append("filter")
    .attr("id", "dropshadow")
    .attr("x", (1-scaleBoundingBox)/2 + reposition * Math.cos(angle) )
    .attr("y", (1-scaleBoundingBox)/2 - reposition  * Math.sin(angle) )
    .attr("width",  scaleBoundingBox)
    .attr("height", scaleBoundingBox)
    .attr("filterUnits", "objectBoundingBox"); // userSpaceOnUse or objectBoundingBox
  dropShadow.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", blur)
    .attr("result", "blur");
  dropShadow.append("feOffset")
    .attr("in", "blur")
    .attr("dx", distance *  Math.cos(angle) )
    .attr("dy", distance * -Math.sin(angle) )
    .attr("result", "offsetBlur")
  dropShadow.append("feFlood")
    .attr("in", "offsetBlur")
    .attr("flood-color", shadowColor)
    .attr("flood-opacity", shadowOpacity )
    .attr("result", "offsetColor");
  dropShadow.append("feComposite")
    .attr("in", "offsetColor")
    .attr("in2", "offsetBlur")
    .attr("operator", "in")
    .attr("result", "offsetBlur");

  var feMerge = dropShadow.append("feMerge");
  feMerge.append("feMergeNode")
    .attr("in", "offsetBlur")
  feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");
  
  // Determine the series that need to be stacked.
  const series = d3.stack()
      .keys(d3.union(data2.map(d => d.from))) // distinct series keys, in input order
      .value(([, D], key) => D.get(key).counts) // get value for each series key and stack
    (d3.index(data2, d => d.grade, d => d.from)); // group by stack then series key

  // Prepare the scales for positional and color encodings.
  const x = d3.scaleBand()
      .domain(data2.map(d => d.grade))
      .range([marginLeft, width - marginRight])
      .padding(0.1);

  const y = d3.scaleLinear()
      .domain([0, Math.ceil(d3.max(series, d => d3.max(d, d => d[1]))/10)*10])
      .rangeRound([height - marginBottom, marginTop]);

  const color = d3.scaleOrdinal()
      .domain(series.map(d => d.key))
      .range(d3.schemeCategory10.slice(0,series.length))
      .unknown("#ccc");

  // A function to format the value in the tooltip.
  const formatValue = x => isNaN(x) ? "N/A" : x.toLocaleString("en")


  var previous_color = ""
  // Append a group for each series, and a rect for each element in the series.
  svg.append("g")
    .selectAll()
    .data(series)
    .join("g")
      .attr("fill", d => color(d.key))
    .selectAll("rect")
    .data(D => D.map(d => (d.key = D.key, d)))
    .join("rect")
      .on('mouseover', function(d) {
          previous_color=d3.select(this).attr('fill');
          d3.select(this).attr('fill', 'red');
      })
      .on('mouseout', function(d) {
          d3.select(this).attr('fill', previous_color);
      })
      .attr("x", d => x(d.data[0]))
      .attr("y", d => height)
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("filter", "url(#dropshadow)")  // This is what applies the drop shadow to each object
      .transition().duration(1000)
      .attr("height", d => y(d[0]) - y(d[1]))
      .attr("y", d => y(d[1]));
  

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
  return Object.assign(svg.node(), {scales: {color}});
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["artistPublic.csv", {url: new URL("./files/41a9c6bfdf8907c7f19b5a52517012d51d11afcdf769218a6b5c1af5288c865ca2bf10f0fdac5144f8d3676054b833c736642053e880c85ec6123fb15744ae7f.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["artistVer.csv", {url: new URL("./files/363ea43eed3c6a6a6fed83d3e26ac23641da56f4f0689da720760208af84f1c3caff531322fc2ceeaf3924e4ff2f0ca4314a49adfe0e45701c6687fc36ee24d3.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("artistVer")).define("artistVer", ["FileAttachment"], _artistVer);
  main.variable(observer("artistPublic")).define("artistPublic", ["FileAttachment"], _artistPublic);
  main.variable(observer("data")).define("data", ["selected","artistVer","artistPublic"], _data);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("viewof selected")).define("viewof selected", ["Inputs"], _selected);
  main.variable(observer("selected")).define("selected", ["Generators", "viewof selected"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","data"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("data1")).define("data1", ["selected1","artistVer","artistPublic"], _data1);
  main.variable(observer("viewof selected1")).define("viewof selected1", ["Inputs"], _selected1);
  main.variable(observer("selected1")).define("selected1", ["Generators", "viewof selected1"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","data1"], _chart);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("data2")).define("data2", ["artistVer","artistPublic"], _data2);
  main.variable(observer("chart2")).define("chart2", ["d3","data2"], _chart2);
  return main;
}
