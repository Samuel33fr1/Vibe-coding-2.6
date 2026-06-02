const activityForm = document.getElementById('activityForm');
const activityList = document.getElementById('activityList');
const timelineContainer = document.getElementById('timelineContainer');
const generateButton = document.getElementById('generateButton');
const regenerateButton = document.getElementById('regenerateButton');
const printButton = document.getElementById('printSchedule');
const dayStartInput = document.getElementById('dayStart');
const activityNameInput = document.getElementById('activityName');
const activityDurationInput = document.getElementById('activityDuration');
const activityCategoryInput = document.getElementById('activityCategory');

let activities = JSON.parse(localStorage.getItem('dailyActivities') || '[]');
let lastGenerated = [];

function saveActivities() {
  localStorage.setItem('dailyActivities', JSON.stringify(activities));
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function renderActivities() {
  activityList.innerHTML = '';
  if (!activities.length) {
    activityList.classList.add('empty');
    activityList.innerHTML = '<p>Pridaj prvú aktivitu, aby si mohol vytvoriť rozvrh.</p>';
    return;
  }

  activityList.classList.remove('empty');
  activities.forEach((activity, index) => {
    const card = document.createElement('div');
    card.className = 'activity-card';

    const info = document.createElement('div');
    info.className = 'activity-info';
    info.innerHTML = `
      <strong>${activity.name}</strong>
      <span>${activity.duration} minút</span>
      <span class="badge">${getCategoryLabel(activity.category)}</span>
    `;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '🗑️ Zmazať';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', () => {
      activities.splice(index, 1);
      saveActivities();
      renderActivities();
      clearTimeline();
    });

    card.append(info, deleteButton);
    activityList.appendChild(card);
  });
}

function getCategoryLabel(category) {
  switch (category) {
    case 'studium':
      return '📚 Štúdium';
    case 'sport':
      return '🏃 Šport';
    case 'pauza':
      return '☕ Pauza';
    case 'ine':
      return '🎮 Iné';
    default:
      return 'Aktivita';
  }
}

function getCategoryClass(category) {
  return `category-${category}`;
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function clearTimeline() {
  timelineContainer.innerHTML = '<p>Stlač "Vygeneruj rozvrh" a uvidíš poradie aktivít.</p>';
  timelineContainer.classList.add('empty');
  regenerateButton.disabled = true;
}

function createTimeline(schedule, startTime) {
  timelineContainer.innerHTML = '';
  timelineContainer.classList.remove('empty');
  const track = document.createElement('div');
  track.className = 'timeline-track';
  let currentTime = new Date(startTime);

  schedule.forEach((item, index) => {
    const block = document.createElement('div');
    block.className = `timeline-item ${item.type === 'break' ? 'category-break' : getCategoryClass(item.category)}`;
    const endTime = new Date(currentTime.getTime() + item.duration * 60000);

    block.innerHTML = `
      <div class="times">${formatTime(currentTime)} – ${formatTime(endTime)}</div>
      <strong>${item.label}</strong>
      <span>${item.duration} minút</span>
    `;

    track.appendChild(block);
    currentTime = endTime;
  });

  const footer = document.createElement('div');
  footer.className = 'timeline-item category-break';
  footer.innerHTML = `<div class="times">Celkový koniec dňa</div><strong>${formatTime(currentTime)}</strong>`;
  track.appendChild(footer);

  timelineContainer.appendChild(track);
}

function generateSchedule() {
  if (!activities.length) {
    alert('Prosím pridaj aspoň jednu aktivitu.');
    return;
  }

  const startParts = dayStartInput.value.split(':');
  const today = new Date();
  today.setHours(Number(startParts[0]), Number(startParts[1]), 0, 0);

  lastGenerated = shuffle(activities);
  const schedule = [];

  lastGenerated.forEach((activity, index) => {
    schedule.push({
      type: 'activity',
      ...activity,
      label: activity.name,
    });
    if ((index + 1) % 2 === 0 && index !== lastGenerated.length - 1) {
      schedule.push({
        type: 'break',
        duration: 10,
        label: 'Automatická 10-minútová pauza',
      });
    }
  });

  createTimeline(schedule, today);
  regenerateButton.disabled = false;
}

activityForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = activityNameInput.value.trim();
  const duration = Number(activityDurationInput.value);
  const category = activityCategoryInput.value;

  if (!name || !duration || duration <= 0) {
    alert('Zadaj platný názov a trvanie aktivity.');
    return;
  }

  activities.push({ name, duration, category });
  saveActivities();
  renderActivities();
  activityForm.reset();
  activityCategoryInput.value = 'studium';
  activityDurationInput.value = '';
  clearTimeline();
});

generateButton.addEventListener('click', () => {
  generateSchedule();
});

regenerateButton.addEventListener('click', () => {
  if (!activities.length) return;
  generateSchedule();
});

printButton.addEventListener('click', () => {
  window.print();
});

renderActivities();
clearTimeline();
