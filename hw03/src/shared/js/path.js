
const icon = document.getElementById('icon');
const jsonUrl = '../shared/json/userLocationData.json';
let currentIndex = 0;
let currentFloor = '1F'; // 新增 currentFloor 變數
let json_data = null;

function calculatePosition(x, y) {
  const minX = 10.45;
  const maxX = 60.47;
  const minY = -11.64;
  const maxY = 15.91;

  const iconX = ((x - minX) / (maxX - minX)) * 100;
  const iconY = ((y - minY) / (maxY - minY)) * 100;

  return { x: iconX, y: iconY };
}

function updateIconPosition(x, y) {
  const { x: iconX, y: iconY } = calculatePosition(x, y);
  icon.style.left = `${iconX}%`;
  icon.style.top = `${iconY}%`;
}

function draw() {
  const point = json_data[currentIndex];

  if (point.Floor !== currentFloor) {
    // 換樓層時的處理，這裡可以添加你的樓層切換相關邏輯
    console.log(`Switched to Floor ${point.Floor}`);
    currentFloor = point.Floor;
  }

  updateIconPosition(point.X, point.Y);
  currentIndex++;
  currentIndex %= json_data.length;
}

function loadjson() {
  fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        json_data = data;
        setInterval(draw, 1000);
      }
    })
    .catch(error => console.error('Error fetching or parsing JSON:', error));
}

// 初始加載 icon 位置
loadjson();

