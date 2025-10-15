// ======================================================
// 🟡 Sheriff Analytics — Main JavaScript
// ======================================================


// ------------------ QQQ Background Chart ------------------

// Historical QQQ price data (sample dataset for background animation)
const qqqData = [
  589.49, 589.5, 600.37, 570.4, 565.01, 551.64, 519.11, 475.47, 468.92, 508.17,
  522.29, 511.23, 509.74, 483.85, 488.07, 476.27, 471.07, 479.11, 450.71, 424.59,
  444.01, 439, 416.97, 409.52, 388.83, 350.87, 358.27, 377.99, 383.68, 369.42,
  347.99, 322.56, 320.93, 293.56, 294.62, 266.28, 293.36, 277.95, 267.26, 299.27,
  315.46, 280.28, 308.28, 313.25, 362.54, 346.8, 363.05, 397.85, 393.82, 386.11,
  357.96, 379.95, 364.57, 354.43, 333.93, 337.99, 319.13, 314.14, 314.56, 313.74,
  299.62, 269.38, 277.84, 294.88, 265.79, 247.6, 233.36, 218.91, 190.4, 205.8,
  219.07, 212.61, 205.1, 197.08, 188.81, 187.47, 191.1, 186.74, 173.95, 189.54,
  179.66, 173.19, 168.16, 154.26, 169.37, 169.82, 185.79, 186.65, 176.45, 171.65,
  170.07, 160.94, 160.13, 167.21, 169.4, 155.76, 155.15, 152.15, 145.45, 146.2,
  143.23, 137.64, 141.29, 135.99, 132.38, 130.02, 124.57, 118.48, 117.5, 116.99,
  118.72, 116.44, 115.23, 107.54, 110.34, 105.72, 109.2, 102.5, 104.13, 111.86,
  114.02, 113.33, 101.76, 104.31, 111.95, 107.07, 110.05, 107.63, 105.6, 108.4,
  101.1, 103.25, 106.01, 101.4, 98.79, 99.78, 95.02, 93.91, 91.31, 87.39, 87.67,
  90.34, 86.27, 87.96, 85.73, 82.79, 78.88, 75.47, 75.77, 71.27, 73.25, 70.72,
  68.97, 67.1, 66.87, 65.13, 65.8, 64.95, 68.57, 68.16, 64.8, 64.16, 62.06, 66.76,
  67.55, 64.41, 60.53, 55.83, 56.39, 57.95, 52.49, 55.06, 58, 57.05, 58.36, 59.08,
  57.43, 57.77, 56, 54.46, 52.09, 52.18, 49.07, 43.46, 45.81, 42.71, 45.6, 49.24,
  48.16, 44.76, 42.79, 45.75, 43.56, 40.96, 42.25, 40.03, 39.45, 36.38, 35.38,
  34.28, 30.32, 27.53, 29.06, 29.74, 29.12, 32.89, 38.91, 46.12, 45.46, 45.17,
  50.01, 47.21, 43.72, 42.95, 45.13, 51.22, 51.31, 55.03, 51.41, 48.87, 47.53,
  47.6, 47.41, 45.96, 43.53, 43.33, 44.07, 43.16, 44.04, 42.58, 40.65, 38.87,
  37.1, 38.77, 38.82, 41.85, 41.93, 41.1, 42, 40.41, 41.24, 38.87, 39.46, 38.98,
  39.58, 36.78, 38.08, 34.98, 36.57, 37.22, 37.4, 39.92, 39.12, 36.9, 35.14, 34.02,
  34.89, 37.74, 36.55, 34.77, 35.84, 36.57, 37.07, 36.46, 35.38, 35.18, 32.42,
  33.39, 31.8, 29.95, 29.79, 27.45, 25.25, 25.16, 24.44, 24.37, 27.72, 24.55,
  20.72, 23.49, 23.85, 26.1, 30.04, 31.73, 36.06, 33.78, 38.51, 38.91, 39.65,
  33.9, 28.98, 36.63, 41.76, 45.7, 44.73, 46.15, 39.15, 47.45, 64.3, 58.38, 62.98,
  81.7, 88.75, 101.63, 89.44, 93.44, 83.13, 94.75, 109.5, 106.75, 89.69, 91.38,
  73.5, 65.75, 60.19, 59.69, 56.59, 57.63, 52.03, 53.72, 52.47
];

// Canvas for background chart
const ctxBg = document.getElementById('backgroundChart').getContext('2d');

// Detect mobile device width
function isMobile() {
  return window.innerWidth <= 768;
}

// Initial chart setup
const initialPoints = 10;
const initialData = qqqData.slice(0, initialPoints).reverse();

// Create QQQ line chart in background
const bgChart = new Chart(ctxBg, {
  type: 'line',
  data: {
    labels: initialData.map((_, i) => i),
    datasets: [{
      data: initialData,
      borderColor: getComputedStyle(document.body).getPropertyValue('--line-color'),
      fill: false,
      pointRadius: 0,
      tension: 0.2
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { display: false }, y: { display: false } },
    animation: { duration: 0 }
  }
});

// Resize handler for chart
function resizeBgChart() {
  const canvas = document.getElementById('backgroundChart');
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  bgChart.update('none');
}
window.addEventListener('resize', resizeBgChart);
resizeBgChart();

// Scroll event animates visible portion of data
window.addEventListener('scroll', () => {
  const scrollFraction = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  const maxIndex = Math.max(initialPoints, Math.floor(scrollFraction * qqqData.length));
  const visibleData = qqqData.slice(0, maxIndex).reverse();
  bgChart.data.labels = visibleData.map((_, i) => i);
  bgChart.data.datasets[0].data = visibleData;
  bgChart.update('none');
});


// ------------------ Portfolio Line Chart ------------------

// Datasets for different performance periods
const lineDataSets = {
  inception: [0, 53.85, 138.46, 123.08, 107.69, 176.92],
  '1y': [0, 1.96, 9.19, 12.33, 28.47, 33.45, 49.27],
  ytd: [0, 4.75, 7.1, 7.47, 10.18, 20.57, 26.01, 27.22, 30.83, 43.49, 46.39]
};

// Label generation for each dataset
function generateLabels(period) {
  if (period === 'inception') return ['2020', '2021', '2022', '2023', '2024', '2025'];
  if (period === '1y') return ['Nov', 'Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'];
  if (period === 'ytd') return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
}

// Initialize chart with default period
let initialPeriod = 'inception';
const lineCtx = document.getElementById('portfolioLineChart').getContext('2d');

// Create main line chart
const lineChart = new Chart(lineCtx, {
  type: 'line',
  data: {
    labels: generateLabels(initialPeriod),
    datasets: [{
      label: 'Portfolio Growth (%)',
      data: lineDataSets[initialPeriod],
      borderColor: '#D4AF37',
      backgroundColor: 'rgba(212,175,55,0.2)',
      fill: true,
      tension: 0.3,
      pointRadius: 3,
      pointHoverRadius: 5
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true } },
    scales: {
      y: {
        beginAtZero: false,
        ticks: { callback: v => v + '%' },
        suggestedMin: Math.min(...lineDataSets[initialPeriod]) * 0.9,
        suggestedMax: Math.max(...lineDataSets[initialPeriod]) * 1.1
      }
    }
  }
});

// Period toggle buttons logic
document.querySelectorAll('.portfolio-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.portfolio-filter-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    const period = btn.dataset.period;
    const newData = lineDataSets[period].slice(0, generateLabels(period).length);

    lineChart.data.labels = generateLabels(period);
    lineChart.data.datasets[0].data = newData;
    lineChart.options.scales.y.suggestedMin = Math.min(...newData) * 0.9;
    lineChart.options.scales.y.suggestedMax = Math.max(...newData) * 1.1;
    lineChart.update();
  });
});


// ------------------ Insight Cards ------------------

// Expands insight cards with overlay for focused reading
document.querySelectorAll('.insight-card').forEach(card => {
  const readMore = card.querySelector('.read-more');
  const originalParent = card.parentNode;
  const originalIndex = Array.from(originalParent.children).indexOf(card);

  card.addEventListener('click', () => {
    const isExpanded = card.classList.contains('expanded');
    const existingOverlay = document.querySelector('.insight-overlay');
    if (existingOverlay) existingOverlay.remove();

    document.querySelectorAll('.insight-card.expanded').forEach(other => {
      if (other !== card) {
        other.classList.remove('expanded');
        const oR = other.querySelector('.read-more');
        if (oR) oR.textContent = 'Read More';
        originalParent.insertBefore(other, originalParent.children[originalIndex]);
      }
    });

    if (!isExpanded) {
      const overlay = document.createElement('div');
      overlay.classList.add('insight-overlay');
      document.body.appendChild(overlay);
      document.body.appendChild(card);
      card.classList.add('expanded');
      if (readMore) readMore.textContent = 'Close';

      overlay.addEventListener('click', () => {
        card.classList.remove('expanded');
        if (readMore) readMore.textContent = 'Read More';
        overlay.remove();
        originalParent.insertBefore(card, originalParent.children[originalIndex]);
      });
    } else {
      card.classList.remove('expanded');
      if (readMore) readMore.textContent = 'Read More';
      originalParent.insertBefore(card, originalParent.children[originalIndex]);
    }
  });
});


// ------------------ Theme Toggle ------------------

// Switches between light and dark mode dynamically
document.querySelector('.theme-toggle').addEventListener('click', () => {
  document.body.dataset.theme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
  bgChart.data.datasets[0].borderColor = getComputedStyle(document.body).getPropertyValue('--line-color');
  bgChart.update('none');
});


// ------------------ Portfolio Pie Chart ------------------

// Breakdown of portfolio allocation
const pieCtx = document.getElementById('portfolioPieChart').getContext('2d');
const pieChart = new Chart(pieCtx, {
  type: 'doughnut',
  data: {
    labels: ['Equities USD', 'Equities CAN', 'Real Estate', 'Cash'],
    datasets: [{
      data: [31, 42, 18, 9],
      backgroundColor: ['#D4AF37', '#808080', '#8C7853', '#E0C068'],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } }
  }
});


// ------------------ Chatbot ------------------

// Simple educational chatbot logic
const chatContainer = document.querySelector('.chat-container');
const chatMessages = chatContainer.querySelector('.chat-messages');
const chatInput = chatContainer.querySelector('.chat-input');
const chatSendBtn = chatContainer.querySelector('.chat-send');
const chatKeywords = chatContainer.querySelectorAll('.keyword');

// Helper: append message to chat
function appendMessage(text, sender = 'bot') {
  const msg = document.createElement('div');
  msg.classList.add('chat-message', sender);
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Main send message logic
function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;
  appendMessage(message, 'user');
  chatInput.value = '';

  let response = "I'm here to provide educational insights on markets and investing.";
  const msgLower = message.toLowerCase();

  if (msgLower.includes('risk')) response = "Risk management is key to long-term portfolio success.";
  else if (msgLower.includes('bull')) response = "Bull markets reward patience and disciplined investing.";
  else if (msgLower.includes('bear')) response = "Bear markets are challenging, but opportunities often arise.";
  else if (msgLower.includes('stocks')) response = "Diversification across sectors helps manage volatility.";

  setTimeout(() => appendMessage(response, 'bot'), 400);
}

// Chat input and send button events
chatSendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });
chatKeywords.forEach(keyword => {
  keyword.addEventListener('click', () => {
    chatInput.value = keyword.textContent;
    sendMessage();
  });
});


// ------------------ Glowing Ball (Animated Overlay) ------------------

// Canvas overlay for glowing ball effect
const overlayCanvas = document.createElement('canvas');
overlayCanvas.style.position = 'fixed';
overlayCanvas.style.top = 0;
overlayCanvas.style.left = 0;
overlayCanvas.style.width = '100%';
overlayCanvas.style.height = '100%';
overlayCanvas.style.pointerEvents = 'none';
overlayCanvas.style.zIndex = '0';
document.body.appendChild(overlayCanvas);

const ctx = overlayCanvas.getContext('2d');

// Maintain full-screen overlay on resize
function resizeOverlay() {
  overlayCanvas.width = window.innerWidth;
  overlayCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeOverlay);
resizeOverlay();

// Colors for glow transitions
const colors = [
  { glow: 'rgba(212,175,55,0.3)', fill: 'rgba(212,175,55,0.25)' },
  { glow: 'rgba(0,255,0,0.3)', fill: 'rgba(0,255,0,0.25)' },
  { glow: 'rgba(0,150,255,0.3)', fill: 'rgba(0,150,255,0.25)' }
];

let colorIndex = 0, nextColorIndex = 1, blend = 0;
const colorChangeSpeed = 0.4;

// Color interpolation for smooth transitions
function interpolateColor(c1, c2, t) {
  const nums = rgba => rgba.match(/\d+(\.\d+)?/g).map(Number);
  const [r1, g1, b1, a1] = nums(c1);
  const [r2, g2, b2, a2] = nums(c2);
  return `rgba(${r1 + (r2 - r1) * t}, ${g1 + (g2 - g1) * t}, ${b1 + (b2 - b1) * t}, ${a1 + (a2 - a1) * t})`;
}

const ball = { radius: 8, progress: 0, speed: 0.05 };
let lastTime = 0;

// Animation loop for glowing ball
function animateBall(time) {
  if (!lastTime) lastTime = time;
  const delta = (time - lastTime) / 1000;
  lastTime = time;

  const dataset = bgChart.data.datasets[0].data;
  if (!dataset || dataset.length < 2) {
    requestAnimationFrame(animateBall);
    return;
  }

  blend += delta * colorChangeSpeed;
  if (blend >= 1) {
    blend = 0;
    colorIndex = nextColorIndex;
    nextColorIndex = (nextColorIndex + 1) % colors.length;
  }

  const glowColor = interpolateColor(colors[colorIndex].glow, colors[nextColorIndex].glow, blend);
  const fillColor = interpolateColor(colors[colorIndex].fill, colors[nextColorIndex].fill, blend);

  const xScale = bgChart.scales.x;
  const yScale = bgChart.scales.y;
  const maxIndex = dataset.length - 1;
  const exactIndex = Math.min(Math.max(ball.progress * maxIndex, 0), maxIndex);
  const i1 = Math.floor(exactIndex);
  const i2 = Math.min(maxIndex, i1 + 1);
  const t = exactIndex - i1;

  const value1 = dataset[i1] ?? dataset[0];
  const value2 = dataset[i2] ?? dataset[dataset.length - 1];
  const yValue = value1 * (1 - t) + value2 * t;

  const x = xScale.getPixelForValue(i1) * (1 - t) + xScale.getPixelForValue(i2) * t;
  const y = yScale.getPixelForValue(yValue);
  const rect = bgChart.canvas.getBoundingClientRect();

  const vx = Math.min(Math.max(rect.left + x, 0), overlayCanvas.width - 1);
  const vy = Math.min(Math.max(rect.top + y, 0), overlayCanvas.height - 1);

  ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
  ctx.beginPath();
  ctx.arc(vx, vy, ball.radius, 0, 2 * Math.PI);
  ctx.fillStyle = fillColor;
  ctx.shadowBlur = 4;
  ctx.shadowColor = glowColor;
  ctx.fill();

  ctx.font = "600 14px 'Space Grotesk', sans-serif";
  const interpolated = interpolateColor(colors[colorIndex].fill, colors[nextColorIndex].fill, blend);
  ctx.fillStyle = interpolated;
  ctx.shadowBlur = 3;
  ctx.shadowColor = interpolated;
  ctx.fillText(`$${yValue.toFixed(2)}`, Math.min(vx + 12, overlayCanvas.width - 50), Math.max(vy - 6, 14));

  ball.progress += ball.speed * delta;
  if (ball.progress > 1) ball.progress = 0;

  requestAnimationFrame(animateBall);
}

// Handles visibility of chart and overlay on mobile
function updateBgChartVisibility() {
  const canvas = document.getElementById('backgroundChart');
  if (isMobile()) {
    canvas.style.display = 'none';
    overlayCanvas.style.display = 'none';
  } else {
    canvas.style.display = 'block';
    overlayCanvas.style.display = 'block';
    resizeBgChart();
    resizeOverlay();
    requestAnimationFrame(animateBall);
  }
}
updateBgChartVisibility();
window.addEventListener('resize', updateBgChartVisibility);


// ------------------ Home Button ------------------

// Smooth scroll to top when clicking the Sheriff logo
document.getElementById('homeLogo').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
