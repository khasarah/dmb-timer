document.addEventListener("DOMContentLoaded", function() {
    const backgroundElement = document.getElementById('background');
    backgroundElement.style.opacity = 1;
});

const updateTimer = () => {
	let DMB = new Date(2027, 3, 16, 0, 0, 0);
	let Start = new Date(2026, 3, 16, 0, 0, 0);
	let Today = new Date();
	
	let = _data = DMB - Today
	let _dd = (_data / (1000 * 60 * 60 * 24)) - (_data / (1000 * 60 * 60 * 24)) % 1; _data -= (_dd * (1000 * 60 * 60 * 24));
	let _hh = (_data / (1000 * 60 * 60)) - (_data / (1000 * 60 * 60)) % 1; _data -= (_hh * (1000 * 60 * 60));
	let _mm = (_data / (1000 * 60)) - (_data / (1000 * 60)) % 1; _data -= (_mm * (1000 * 60));
	let _ss = (_data / 1000) - (_data / 1000) % 1; _data -= (_ss * 1000); let _pp;
	((DMB - Start) === 0) ? ( _pp = "100" ) : ( _pp = ( Today - Start ) / ( DMB - Start ) * 100);

	document.getElementById('days').innerText = _dd;
	document.getElementById('hours').innerText = _hh;
	document.getElementById('minutes').innerText = _mm;
	document.getElementById('seconds').innerText = _ss;

	_pp == "100" ? document.getElementById('timer').innerHTML = `<span>WE GO HOME</span>` : null;
	document.getElementById('clock__percentage').innerText = `${Math.round(_pp * 100) / 100}%`;
	return;
}

updateTimer()
let _timer = setInterval(() => updateTimer(), 1000);