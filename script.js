const TARGET = new Date('2026-11-06T00:00:00');

const pad = (n) => String(n).padStart(2, '0');

function updateCountdown() {
  const now = new Date();
  const diff = TARGET - now;

  if (diff <= 0) {
    document.getElementById('countdown').innerHTML = '<p style="font-size:1.3rem;color:var(--accent);letter-spacing:0.05em">Wheels up! Have an amazing trip!</p>';
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
