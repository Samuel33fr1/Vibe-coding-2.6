// DOM Elements
const activityForm = document.getElementById('activityForm');
const activityList = document.getElementById('activityList');
const timelineContainer = document.getElementById('timelineContainer');
const generateButton = document.getElementById('generateButton');
const regenerateButton = document.getElementById('regenerateButton');
const printButton = document.getElementById('printSchedule');
const dayStartInput = document.getElementById('dayStart');
const timelineSection = document.getElementById('timelineSection');

const activityNameInput = document.getElementById('activityName');
const activityDurationInput = document.getElementById('activityDuration');
const activityCategoryInput = document.getElementById('activityCategory');

// State
let activities = JSON.parse(localStorage.getItem('dailyActivities') || '[]');
let lastGenerated = [];

// Category Configuration
const categoryConfig = {
  studium: { emoji: '📚', label: 'Štúdium' },
  sport: { emoji: '🏃', label: 'Šport' },
  pauza: { emoji: '☕', label: 'Pauza' },
  ine: { emoji: '🎮', label: 'Iné' }
};

// BREAK CONFIGURATION
const BREAK_DURATION = 10; // minutes
const BREAK_FREQUENCY = 2; // after every 2 activities

// ==================== UTILITIES ====================

function saveActivities() {
  localStorage.setItem('dailyActivities', JSON.stringify(activities));
}

function getCategoryLabel(category) {
  const config = categoryConfig[category];
  return config ? `${config.emoji} ${config.label}` : category;
}

function formatTime(date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function timeStringToDate(timeString, baseDate = new Date()) {
  const [hours, minutes] = timeString.split(':').map(Number);
  const date = new Date(baseDate);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function addMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

function getRandomArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ==================== ACTIVITY MANAGEMENT ====================

function addActivity(event) {
  event.preventDefault();

  const newActivity = {
    id: Date.now(),
    name: activityNameInput.value.trim(),
    duration: parseInt(activityDurationInput.value),
    category: activityCategoryInput.value
  };

  if (newActivity.name && newActivity.duration > 0) {
    activities.push(newActivity);
    saveActivities();
    renderActivities();
    activityForm.reset();
    dayStartInput.value = '08:00'; // Reset to default
  }
}

function deleteActivity(id) {
  activities = activities.filter(activity => activity.id !== id);
  saveActivities();
  renderActivities();
}

function renderActivities() {
  activityList.innerHTML = '';

  if (activities.length === 0) {
    activityList.classList.add('empty');
    activityList.innerHTML =
      '<p>Pridaj prvú aktivitu, aby si mohol vytvoriť rozvrh.</p>';
    generateButton.disabled = true;
    return;
  }

  activityList.classList.remove('empty');
  generateButton.disabled = false;

  activities.forEach(activity => {
    const card = document.createElement('div');
    card.className = 'activity-card';

    const info = document.createElement('div');
    info.className = 'activity-info';
    info.innerHTML = `
      <strong>${activity.name}</strong>
      <span>${activity.duration} minút</span>
      <span class="badge ${activity.category}">${getCategoryLabel(
      activity.category
    )}</span>
    `;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-button';
    deleteBtn.textContent = '🗑️ Zmazať';
    deleteBtn.addEventListener('click', () => deleteActivity(activity.id));

    card.appendChild(info);
    card.appendChild(deleteBtn);
    activityList.appendChild(card);
  });
}

// ==================== SCHEDULE GENERATION ====================

function generateSchedule() {
  if (activities.length === 0) {
    alert('Najskôr pridaj aktivity!');
    return;
  }

  const startTime = timeStringToDate(dayStartInput.value);
  const shuffledActivities = getRandomArray(activities);

  lastGenerated = [];
  let currentTime = new Date(startTime);
  let activityCount = 0;

  shuffledActivities.forEach((activity, index) => {
    // Add the activity
    const endTime = addMinutesToDate(currentTime, activity.duration);
    lastGenerated.push({
      name: activity.name,
      category: activity.category,
      duration: activity.duration,
      startTime: new Date(currentTime),
      endTime: endTime,
      isBreak: false
    });

    currentTime = endTime;
    activityCount++;

    // Add automatic break after every 2 activities (but not after the last one)
    if (
      activityCount % BREAK_FREQUENCY === 0 &&
      index < shuffledActivities.length - 1
    ) {
      const breakStart = new Date(currentTime);
      const breakEnd = addMinutesToDate(breakStart, BREAK_DURATION);
      lastGenerated.push({
        name: 'Prestávka',
        category: 'pauza',
        duration: BREAK_DURATION,
        startTime: breakStart,
        endTime: breakEnd,
        isBreak: true
      });
      currentTime = breakEnd;
    }
  });

  renderTimeline();
}

function regenerateSchedule() {
  generateSchedule();
}

// ==================== TIMELINE RENDERING ====================

function renderTimeline() {
  timelineContainer.innerHTML = '';

  if (lastGenerated.length === 0) {
    timelineContainer.innerHTML = '<p>Rozvrh nie je vygenerovaný.</p>';
    return;
  }

  const totalDuration = lastGenerated.reduce(
    (sum, item) => sum + item.duration,
    0
  );
  const endTime = lastGenerated[lastGenerated.length - 1].endTime;

  lastGenerated.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.className = 'timeline-item';

    const startTimeStr = formatTime(item.startTime);
    const endTimeStr = formatTime(item.endTime);

    itemElement.innerHTML = `
      <div class="timeline-time">${startTimeStr}</div>
      <div class="timeline-activity">
        <div class="timeline-block ${item.category}">
          ${item.name}
        </div>
      </div>
      <div class="timeline-duration">${item.duration} min</div>
    `;

    timelineContainer.appendChild(itemElement);
  });

  // Add summary
  const summary = document.createElement('div');
  summary.className = 'timeline-summary';
  summary.innerHTML = `
    <span>Celkový čas:</span>
    <span>${formatTime(lastGenerated[0].startTime)} – ${formatTime(endTime)}</span>
  `;
  timelineContainer.appendChild(summary);

  // Show timeline section
  timelineSection.style.display = 'block';
  timelineSection.scrollIntoView({ behavior: 'smooth' });
}

// ==================== PRINT FUNCTIONALITY ====================

function printSchedule() {
  if (lastGenerated.length === 0) {
    alert('Najskôr vygeneruj rozvrh!');
    return;
  }
  window.print();
}

// ==================== EVENT LISTENERS ====================

activityForm.addEventListener('submit', addActivity);
generateButton.addEventListener('click', generateSchedule);
regenerateButton.addEventListener('click', regenerateSchedule);
printButton.addEventListener('click', printSchedule);

// ==================== INITIALIZATION ====================

function init() {
  renderActivities();
}

document.addEventListener('DOMContentLoaded', init);
