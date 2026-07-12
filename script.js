document.addEventListener("DOMContentLoaded", function () {
	const backgroundElement = document.getElementById('background');
	backgroundElement.style.opacity = 1;
});

const DMB = new Date(SERVICE.end.year, SERVICE.end.month - 1, SERVICE.end.day);
const Start = new Date(SERVICE.start.year, SERVICE.start.month - 1, SERVICE.start.day);

const MS_DAY = 1000 * 60 * 60 * 24;

const MONTH_NAMES = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

const formatDate = (date) => `- ${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()} -`;
const formatShortDate = (date) => `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;

const pad2 = (n) => String(n).padStart(2, '0');

const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const resolveDate = (offsetDays) => new Date(DMB.getTime() + offsetDays * MS_DAY);

const splitDuration = (ms) => {
	ms = Math.max(ms, 0);
	const dd = Math.floor(ms / (1000 * 60 * 60 * 24));
	ms -= dd * (1000 * 60 * 60 * 24);
	const hh = Math.floor(ms / (1000 * 60 * 60));
	ms -= hh * (1000 * 60 * 60);
	const mm = Math.floor(ms / (1000 * 60));
	ms -= mm * (1000 * 60);
	const ss = Math.floor(ms / 1000);
	return { dd, hh, mm, ss };
};

const STORAGE_KEY = 'dmb-timer-mode';

const toggleInput = document.getElementById('mode-toggle');
const clockPercentageEl = document.getElementById('clock__percentage');
const footerEl = document.getElementById('clock__footer');
const digitsEl = document.getElementById('clock__digits');
const arrivedEl = document.getElementById('clock__arrived');
const timerEl = document.getElementById('timer');
const historyScrollEl = document.getElementById('history-scroll');

let isElapsedMode = localStorage.getItem(STORAGE_KEY) === 'elapsed';
toggleInput.checked = isElapsedMode;

toggleInput.addEventListener('change', () => {
	isElapsedMode = toggleInput.checked;
	localStorage.setItem(STORAGE_KEY, isElapsedMode ? 'elapsed' : 'countdown');

	timerEl.classList.remove('clock__time--pulse');
	void timerEl.offsetWidth;
	timerEl.classList.add('clock__time--pulse');

	updateTimer();
});

const updateTimer = () => {
	const Today = new Date();
	const total = DMB - Start;
	const passed = Today - Start;
	const percentage = total === 0 ? 100 : Math.min(Math.max((passed / total) * 100, 0), 100);

	clockPercentageEl.textContent = `${Math.round(percentage * 100) / 100}%`;
	footerEl.textContent = formatDate(isElapsedMode ? Start : DMB);

	const remaining = DMB - Today;
	const hasArrived = !isElapsedMode && remaining <= 0;

	digitsEl.hidden = hasArrived;
	arrivedEl.hidden = !hasArrived;

	if (!hasArrived) {
		const { dd, hh, mm, ss } = splitDuration(isElapsedMode ? passed : remaining);
		document.getElementById('days').innerText = String(dd);
		document.getElementById('hours').innerText = pad2(hh);
		document.getElementById('minutes').innerText = pad2(mm);
		document.getElementById('seconds').innerText = pad2(ss);
	}
};

const createHistoryRow = (date, title, state, { importance = 'secondary', done = false, comment = '' } = {}) => {
	const row = document.createElement('div');
	row.className = `history__row history__row--${state}`;
	if (importance === 'key') row.classList.add('history__row--key');
	if (done) row.classList.add('history__row--done');

	const main = document.createElement('div');
	main.className = 'history__main';

	const text = document.createElement('div');
	text.className = 'history__text';

	const dateEl = document.createElement('span');
	dateEl.className = 'history__date';
	dateEl.textContent = formatShortDate(date);

	const titleEl = document.createElement('span');
	titleEl.className = 'history__title';
	titleEl.textContent = title;

	text.append(dateEl, titleEl);

	const checkCell = document.createElement('span');
	checkCell.className = 'history__check-cell';
	const check = document.createElement('span');
	check.className = 'history__check';
	checkCell.appendChild(check);

	main.append(text, checkCell);
	row.appendChild(main);

	if (comment) {
		const commentEl = document.createElement('p');
		commentEl.className = 'history__comment';
		commentEl.textContent = comment;
		row.appendChild(commentEl);
	}

	return row;
};

const buildHistory = () => {
	const Today = new Date();

	const entries = Object.values(dates)
		.map(({ offset, title, importance, comment }) => ({ title, importance, comment, date: resolveDate(offset) }))
		.sort((a, b) => a.date - b.date);

	historyScrollEl.innerHTML = '';

	let todayInserted = false;
	let todayRowEl = null;

	entries.forEach((entry) => {
		const isToday = sameDay(entry.date, Today);

		if (!todayInserted && !isToday && entry.date > Today) {
			todayRowEl = createHistoryRow(Today, 'сегодня', 'today');
			historyScrollEl.appendChild(todayRowEl);
			todayInserted = true;
		}

		const isPast = entry.date < Today && !isToday;
		const state = isToday ? 'today' : (isPast ? 'past' : 'future');

		const row = createHistoryRow(entry.date, entry.title, state, {
			importance: entry.importance,
			done: isPast,
			comment: entry.comment,
		});

		if (isToday) {
			todayRowEl = row;
			todayInserted = true;
		}
		historyScrollEl.appendChild(row);
	});

	if (!todayInserted) {
		todayRowEl = createHistoryRow(Today, 'сегодня', 'today');
		historyScrollEl.appendChild(todayRowEl);
	}

	if (todayRowEl) {
		requestAnimationFrame(() => {
			todayRowEl.scrollIntoView({ block: 'center' });
		});
	}
};

updateTimer();
buildHistory();
setInterval(updateTimer, 1000);