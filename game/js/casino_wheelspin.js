const wheel = document.querySelector('.wheel');
let deg = 0;

wheel.addEventListener("click", () => {
  deg = deg || Math.floor(Math.random() * 10000 + 1000);
  wheel.style.transition = 'all 10s ease-out';
  wheel.style.transform = `rotate(${deg}deg)`;
  spinBtn.style.pointerEvents = 'none';
})

wheel.addEventListener('transitionend', () => {
  wheel.style.transition = 'none';
  const actualDeg = deg % 360;
  wheel.style.transform = `rotate(${actualDeg}deg)`;
  spinBtn.style.pointerEvents = 'auto';
  deg = 0;
});
