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
  { id: 'waiheke',    name: 'Waiheke Island',         latlng: [-36.788, 175.085], color: '#c4903a', hotel: 'Waiheke Island Resort',      dates: 'Nov 8 – 10' },
  { id: 'raglan',     name: 'Raglan',                  latlng: [-37.805, 174.874], color: '#2aa0c8', hotel: 'Te Whaanga Retreat & Spa',    dates: 'Nov 10 – 12' },
  { id: 'rotorua',    name: 'Rotorua / Lake Rotoiti',  latlng: [-38.037, 176.370], color: '#58b458', hotel: 'VR Rotorua Lake Resort',      dates: 'Nov 12 – 13' },
  { id: 'queenstown', name: 'Queenstown',               latlng: [-45.031, 168.663], color: '#4088c8', hotel: 'Kamana Lakehouse',            dates: 'Nov 13 – 18' },
  { id: 'milford',    name: 'Milford Sound',            latlng: [-44.655, 167.927], color: '#28a898', hotel: 'Overnight Cruise',            dates: 'Nov 18 – 19' },
  { id: 'manapouri',  name: 'Manapouri',                latlng: [-45.543, 167.598], color: '#50b050', hotel: 'Cabot Lodge',                 dates: 'Nov 19 – 21' },
];

/* Build a numbered teardrop pin; active = slightly larger with brighter stroke */
function makePin(color, num, active = false) {
  const w = active ? 34 : 28;
  const h = active ? 51 : 42;
  const stroke = active ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.7)';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="${w}" height="${h}">
    <path d="M12 0C7.3 0 0 5.4 0 12.2 0 19.5 12 36 12 36S24 19.5 24 12.2C24 5.4 16.7 0 12 0z"
          fill="${color}" stroke="${stroke}" stroke-width="1.5"/>
    <circle cx="12" cy="12" r="4.8" fill="rgba(255,255,255,0.35)"/>
    <text x="12" y="15.5" text-anchor="middle" font-size="8.5" font-weight="700"
          fill="white" font-family="system-ui,sans-serif" opacity="0.9">${num}</text>
  </svg>`;
  return L.divIcon({
    className: 'map-pin-icon',
    html: svg,
    iconSize:   [w, h],
    iconAnchor: [w / 2, h],
    popupAnchor:[0, -(h + 2)],
  });
}

/* Registry shared between map and scroll observer */
const markerRegistry = {};  // stopId → { marker, stop, idx }

const mapEl = document.getElementById('nz-map');
if (mapEl) {
  const map = L.map('nz-map', {
    scrollWheelZoom: false,
    zoomControl: true,
  });

  // CartoDB Voyager – teal ocean, green/white land, close to Google Maps palette
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(map);

  // Dashed route polyline connecting stops in travel order
  L.polyline(STOPS.map(s => s.latlng), {
    color: 'rgba(200,169,110,0.55)',
    weight: 2,
    dashArray: '4 8',
  }).addTo(map);

  const bounds = [];

  STOPS.forEach((stop, i) => {
    bounds.push(stop.latlng);

    const marker = L.marker(stop.latlng, { icon: makePin(stop.color, i + 1) }).addTo(map);

    marker.bindTooltip(`<strong>${i + 1}. ${stop.name}</strong>`, {
      permanent: false,
      direction: 'top',
      offset: [0, -44],
    });

    // Click scrolls directly to the stop card (no popup needed — card has all the detail)
    marker.on('click', () => {
      const target = document.getElementById(stop.id);
      if (!target) return;
      const details = target.querySelector('.stop-expand');
      if (details) details.open = true;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    markerRegistry[stop.id] = { marker, stop, idx: i };
  });

  map.fitBounds(bounds, { padding: [30, 30] });
}


/* ── Sticky nav: highlight current stop ── */
const navLinks = document.querySelectorAll('.sn-link');
const stopEls  = document.querySelectorAll('.stop[id]');

if (stopEls.length && navLinks.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;

      // Highlight nav link
      navLinks.forEach(link => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
      });

      // Pulse the corresponding map pin (enlarge + brighten stroke)
      Object.keys(markerRegistry).forEach(sid => {
        const { marker, stop, idx } = markerRegistry[sid];
        marker.setIcon(makePin(stop.color, idx + 1, sid === id));
      });
    });
  }, {
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


/* ── Expand / Collapse all stop cards ── */
const toggleAllBtn = document.getElementById('toggle-all');
if (toggleAllBtn) {
  let expanded = false;
  toggleAllBtn.addEventListener('click', () => {
    expanded = !expanded;
    document.querySelectorAll('.stop-expand').forEach(d => { d.open = expanded; });
    toggleAllBtn.textContent = expanded ? 'Collapse All' : 'Expand All';
  });
}


/* ── Scroll-to-top button ── */
const scrollTopBtn = document.getElementById('scroll-top');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('is-visible', window.scrollY > 500);
  }, { passive: true });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
