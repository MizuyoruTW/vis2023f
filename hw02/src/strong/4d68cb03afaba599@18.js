function _1(md) {
  return (
    md`# Strong baseline (1+1pt)`
  )
}

function _data(FileAttachment) {
  return (
    FileAttachment("data.json").json()
  )
}

function _cons_count() {
  return (
    []
  )
}

function _cons_mapping() {
  return (
    new Map([
      [0, "牡羊座"],
      [1, "金牛座"],
      [2, "雙子座"],
      [3, "巨蟹座"],
      [4, "獅子座"],
      [5, "處女座"],
      [6, "天秤座"],
      [7, "天蠍座"],
      [8, "射手座"],
      [9, "摩羯座"],
      [10, "水瓶座"],
      [11, "雙魚座"],
      [12, ""]
    ])
  )
}

function _5(cons_count, cons_mapping, data) {
  cons_count.length = 0
  for (var i = 0; i < 12; i++) {
    //所有年份都建立兩個Object，一個存放男性資料，一個存放女性資料
    cons_count.push({ Constellation: cons_mapping.get(i), gender: "male", counts: 0 });
    cons_count.push({ Constellation: cons_mapping.get(i), gender: "female", counts: 0 });
  }
  data.forEach(x => {
    var i = x.Constellation * 2 + (x.Gender == "男" ? 0 : 1);
    cons_count[i].counts++;
  })
  return cons_count
}


function _6(Plot, cons_mapping, cons_count) {
  return (
    Plot.plot({
      grid: true,
      y: { label: "count" },
      x: { domain: Array.from(cons_mapping.values()).slice(0, 12) },
      marks: [
        Plot.ruleY([0]),
        Plot.barY(cons_count, { x: "Constellation", y: "counts", tip: true, fill: "gender" }),
      ]
    })
  )
}

function _7(Plot, cons_mapping, data) {
  return (
    Plot.plot({
      grid: true,
      y: { label: "count", grid: true },
      x: { transform: (n) => cons_mapping.get(n), domain: Array.from(cons_mapping.values()) },
      marks: [
        Plot.ruleY([0]),
        Plot.rectY(data,
          Plot.binX({ y: "count" },
            {
              x: "Constellation",
              fill: "Gender",
              tip: true,
              interval: 1,
              title: bin => { return `Constellation: ${cons_mapping.get(bin.Constellation)}\n\nGender: ${bin.Gender}` }
            })
        ),
      ]
    })
  )
}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", { url: new URL("../data.json", import.meta.url), mimeType: "application/json", toString }]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("cons_count")).define("cons_count", _cons_count);
  main.variable(observer("cons_mapping")).define("cons_mapping", _cons_mapping);
  main.variable(observer()).define(["cons_count", "cons_mapping", "data"], _5);
  main.variable(observer()).define(["Plot", "cons_mapping", "cons_count"], _6);
  main.variable(observer()).define(["Plot", "cons_mapping", "data"], _7);
  return main;
}
