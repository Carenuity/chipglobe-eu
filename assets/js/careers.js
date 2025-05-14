document.querySelectorAll('.custom-select-container').forEach(container => {
  const trigger = container.querySelector('.custom-select-trigger');
  const options = container.querySelector('.custom-options');
  const span = trigger.querySelector('span');
  const optionItems = container.querySelectorAll('.custom-option');

  trigger.addEventListener('click', () => {
    const isOpen = container.classList.toggle('open');
    options.style.display = isOpen ? 'block' : 'none';
  });

  optionItems.forEach(option => {
    option.addEventListener('click', () => {
      optionItems.forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
      span.textContent = option.textContent;
      container.classList.remove('open');
      options.style.display = 'none';
    });
  });

  document.addEventListener('click', e => {
    if (!container.contains(e.target)) {
      container.classList.remove('open');
      options.style.display = 'none';
    }
  });
});
