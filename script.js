/* ── Countdown ── */
const TARGET = new Date('2026-11-06T00:00:00');

const pad = (n) => String(n).padStart(2, '0');

function updateCountdown() {
  const now  = new Date();
  const diff = TARGET - now;

  if (diff <= 0) {
    document.getElementById('countdown').innerHTML =
      '<p style="font-size:1.3rem;color:var(--accent);letter-spacing:0.05em">Wheels up! Have an amazing trip!</p>';
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('days').textContent    = pad(days);
  document.getElementById('hours').textContent   = pad(hours);
  document.getElementById('minutes').textContent = pad(minutes);
  document.getElementById('seconds').textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* ── Leaflet map ── */
const STOPS = [
  { id: 'waiheke',    name: 'Waiheke Island',      latlng: [-36.788, 175.085], color: '#c4903a', hotel: 'Waiheke Island Resort',      dates: 'Nov 8 – 10' },
  { id: 'raglan',     name: 'Raglan',               latlng: [-37.805, 174.874], color: '#2aa0c8', hotel: 'Te Whaanga Retreat & Spa',    dates: 'Nov 10 – 12' },
  { id: 'rotorua',    name: 'Rotorua / Lake Rotoiti', latlng: [-38.037, 176.370], color: '#58b458', hotel: 'VR Rotorua Lake Resort',      dates: 'Nov 12 – 13' },
  { id: 'queenstown', name: 'Queenstown',            latlng: [-45.031, 168.663], color: '#4088c8', hotel: 'Kamana Lakehouse',            dates: 'Nov 13 – 18' },
  { id: 'milford',    name: 'Milford Sound',         latlng: [-44.655, 167.927], color: '#28a898', hotel: 'Overnight Cruise',            dates: 'Nov 18 – 19' },
  { id: 'manapouri',  name: 'Manapouri',             latlng: [-45.543, 167.598], color: '#50b050', hotel: 'Cabot Lodge',                 dates: 'Nov 19 – 21' },
];

const mapEl = document.getElementById('nz-map');
if (mapEl) {
  const map = L.map('nz-map', {
    scrollWheelZoom: false,
    zoomControl: true,
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(map);

  const bounds = [];

  STOPS.forEach((stop, i) => {
    bounds.push(stop.latlng);

    const marker = L.circleMarker(stop.latlng, {
      radius: 9,
      fillColor: stop.color,
      color: 'rgba(255,255,255,0.85)',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.92,
    }).addTo(map);

    marker.bindTooltip(`<strong>${i + 1}. ${stop.name}</strong>`, {
      permanent: false,
      direction: 'top',
      offset: [0, -10],
    });

    marker.bindPopup(
      `<div class="map-popup">
        <strong>${stop.name}</strong>
        <span>${stop.hotel}</span>
        <span>${stop.dates}</span>
        <a href="#${stop.id}">View details ↓</a>
      </div>`,
      { maxWidth: 180 }
    );

    marker.on('click', () => {
      const target = document.getElementById(stop.id);
      if (target) {
        // Auto-expand the stop when navigated to from the map
        const details = target.querySelector('.stop-expand');
        if (details) details.open = true;
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  map.fitBounds(bounds, { padding: [30, 30] });
}


/* ── Sticky nav: highlight current stop ── */
const navLinks = document.querySelectorAll('.sn-link');
const stopEls  = document.querySelectorAll('.stop[id]');

if (stopEls.length && navLinks.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    // Trigger when the top of the stop card enters the upper 30% of the viewport
    rootMargin: '-8% 0px -65% 0px',
    threshold: 0,
  });

  stopEls.forEach(el => observer.observe(el));
}


/* ── Nav / glance-row clicks: auto-expand the target stop ── */
function expandStop(id) {
  const target = document.getElementById(id);
  if (!target) return;
  const details = target.querySelector('.stop-expand');
  if (details) details.open = true;
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const id = (link.getAttribute('href') || '').slice(1);
    expandStop(id);
  });
});

document.querySelectorAll('a.gr').forEach(row => {
  row.addEventListener('click', () => {
    const id = (row.getAttribute('href') || '').slice(1);
    expandStop(id);
  });
});
