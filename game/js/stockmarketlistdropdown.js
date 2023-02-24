function dropdown(stock) {
    const row = document.querySelector(`#${stock}-stock-row`);
    const details = document.querySelector(`#${stock}-stock-details`);
    row.classList.toggle('expanded');
    details.style.display = row.classList.contains('expanded') ? 'table-row' : 'none';
}