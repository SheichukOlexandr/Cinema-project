/* wwwroot/js/seat-selector.js */
function openSeatModal(sessionId, movieId, seatIds) {
    const modal = document.getElementById('seatModal');
    const seatGrid = document.getElementById('seatGrid');
    const bookingForm = document.getElementById('bookingForm');
    const movieIdInput = document.getElementById('movieId');
    const sessionIdInput = document.getElementById('sessionId');
    const seatIdInput = document.getElementById('seatId');

    // Заповнюємо поля форми
    movieIdInput.value = movieId;
    sessionIdInput.value = sessionId;
    seatIdInput.value = '';

    // Очищаємо сітку
    seatGrid.innerHTML = '';

    // Отримуємо доступні місця
    const seats = seatIds.split(',');

    // Генеруємо сітку місць (припустимо, 5x10 для прикладу)
    const rows = 5;
    const cols = 10;
    let seatIndex = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const seat = document.createElement('div');
            seat.classList.add('seat');
            if (seatIndex < seats.length) {
                seat.classList.add('available');
                seat.dataset.seatId = seats[seatIndex];
                seat.textContent = seatIndex + 1;
                seat.addEventListener('click', () => {
                    // Знімаємо вибір з інших місць
                    document.querySelectorAll('.seat.selected').forEach(s => s.classList.remove('selected'));
                    // Вибираємо це місце
                    seat.classList.add('selected');
                    seatIdInput.value = seat.dataset.seatId;
                });
                seatIndex++;
            } else {
                seat.classList.add('occupied');
            }
            seatGrid.appendChild(seat);
        }
    }

    // Відкриваємо модальне вікно
    modal.style.display = 'block';
}

function closeSeatModal() {
    const modal = document.getElementById('seatModal');
    modal.style.display = 'none';
}

// Закриття при кліку поза модальним вікном
window.onclick = function (event) {
    const modal = document.getElementById('seatModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}