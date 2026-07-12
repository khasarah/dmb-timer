const SERVICE = {
	start: { year: 2026, month: 4, day: 16 },
	end:   { year: 2027, month: 4, day: 16 },
};

const _ddd = "Дней до Дембеля"
const dates = {
	oath:
		{ offset: -335, title: 'Присяга', importance: 'key' },
	threehundred:
		{ offset: -300, title: `300 ${_ddd}`, importance: 'secondary' },
	twohundredsixtyfive:
		{ offset: -265, title: 'Отслужил 100 дней', importance: 'key', comment: 'Меняю пряху на ремне' },
	twohundredtwentyfour:
		{ offset: -254, title: `Отслужил 111 дней`, importance: 'secondary', comment: 'Маленький заборчик' },
	twohundredtwenty:
		{ offset: -220, title: `220 ${_ddd}`, importance: 'secondary', comment: 'Маленькая розетка' },
	twohundred:
		{ offset: -200, title: `200 ${_ddd}`, importance: 'secondary' },
	half:
		{ offset: -182, title: 'Отслужил 183 дней', importance: 'key', comment: 'ЭКВАТОР' },
	hundredfourtyfive:
		{ offset: -145, title: `Отслужил 220 дней`, importance: 'secondary', comment: 'Большой заборчик' },
	hundredfourtythree:
		{ offset: -143, title: `Отслужил 222 дней`, importance: 'secondary', comment: 'Гуси-лебеди' },
	hundred:
		{ offset: -100, title: `100 ${_ddd}`, importance: 'key', comment: 'Голову бреют, масло отдают' },
	hundredeleven:
		{ offset: -111, title: `111 ${_ddd}`, importance: 'secondary', comment: 'Большой заборчик' },
	eightyeight:
		{ offset: -88, title: `88 ${_ddd}`, importance: 'secondary', comment: 'Армейские матрешки' },
	seventyseven:
		{ offset: -77, title: `77 ${_ddd}`, importance: 'secondary', comment: 'Армейские топорики' },
	fifty:
		{ offset: -50, title: `50 ${_ddd}`, importance: 'secondary', comment: 'Ставьте водку в холодильник, мне до дембеля полтинник' },
	twenty:
		{ offset: -20, title: `20 ${_ddd}`, importance: 'key', comment: 'Дембельская пачка' },
	ten:
		{ offset: -10, title: `10 ${_ddd}`, importance: 'secondary', comment: 'Космос' },
	three:
		{ offset: -3, title: `3 ${_ddd}`, importance: 'key', comment: 'Светофор | Красный' },
	two:
		{ offset: -2, title: `2 ${_ddd}`, importance: 'secondary', comment: 'Светофор | Желтый' },
	one:
		{ offset: -1, title: `1 ${_ddd}`, importance: 'secondary', comment: 'Светофор | Зеленый' },
	dmb:
		{ offset: 0, title: 'ДЕМБЕЛЬ', importance: 'key' },
};