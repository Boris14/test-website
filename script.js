const counterEl = document.getElementById('counter');
const startTime = new Date('2025-01-01T00:00:00Z');

function getElapsedSeconds() {
  return Math.floor((Date.now() - startTime.getTime()) / 1000);
}

function updateCounterDisplay(numStr) {
  const existingDigits = Array.from(counterEl.children);
  const digitsNeeded = numStr.length;

  while (existingDigits.length < digitsNeeded) {
    const d = document.createElement('div');
    d.className = 'digit';
    const span = document.createElement('span');
    span.textContent = '0';
    d.appendChild(span);
    counterEl.appendChild(d);
    existingDigits.push(d);
  }

  while (existingDigits.length > digitsNeeded) {
    counterEl.removeChild(existingDigits.pop());
  }

  numStr.split('').forEach((digit, i) => {
    const span = existingDigits[i].querySelector('span');
    const current = span.textContent;
    if (current !== digit) {
      const newSpan = document.createElement('span');
      newSpan.textContent = digit;
      existingDigits[i].appendChild(newSpan);
      span.style.transform = 'translateY(-100%)';
      newSpan.style.transform = 'translateY(0%)';
      setTimeout(() => span.remove(), 300);
    }
  });
}

function tick() {
  const elapsed = getElapsedSeconds();
  updateCounterDisplay(elapsed.toString());
}

tick();
setInterval(tick, 1000);
