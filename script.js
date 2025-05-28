// Arrays to store selected cells for User A and User B
const selectedCellsUserA = [];
const selectedCellsUserB = [];

// Function to toggle cell selection
function toggleSelection(cell) {
    const user = cell.classList.contains('timetable-cell-userA') ? 'userA' : 'userB';
    const cellContent = cell.textContent;
    const cellArray = user === 'userA' ? selectedCellsUserA : selectedCellsUserB;

    if (!cell.hasAttribute('data-selected')) {
        cell.style.backgroundColor = user === 'userA' ? '#3498db' : '#2ecc71';
        cell.style.color = 'white';
        cell.setAttribute('data-selected', 'true');
        cellArray.push(cellContent);
    } else {
        cell.style.backgroundColor = '';
        cell.style.color = '';
        cell.removeAttribute('data-selected');
        const index = cellArray.indexOf(cellContent);
        if (index > -1) {
            cellArray.splice(index, 1);
        }
    }
}

// Function to clear all selections
function clearAllSelections() {
    selectedCellsUserA.length = 0;
    selectedCellsUserB.length = 0;

    document.querySelectorAll('.timetable-cell-userA, .timetable-cell-userB').forEach(cell => {
        cell.style.backgroundColor = '';
        cell.style.color = '';
        cell.removeAttribute('data-selected');
    });

    document.getElementById('commonSelectedCells').innerHTML = '';
    document.getElementById('notSelectedCells').innerHTML = '';
}

// Function to compare selected cells between User A and User B
function compareSelectedCells() {
    // Find clashing slots
    const commonSelectedCells = selectedCellsUserA.filter(cellA =>
        selectedCellsUserB.includes(cellA)
    );

    // Find free slots
    const allCells = new Set();
    document.querySelectorAll('.timetable-cell-userA').forEach(cell => {
        allCells.add(cell.textContent);
    });

    const selectedCells = new Set([...selectedCellsUserA, ...selectedCellsUserB]);
    const freeSlots = Array.from(allCells).filter(cell => !selectedCells.has(cell));

    // Display results with enhanced formatting
    const commonSelectedCellsElement = document.getElementById('commonSelectedCells');
    const notSelectedCellsElement = document.getElementById('notSelectedCells');

    commonSelectedCellsElement.innerHTML = `
        <h3>🚫 Clashing Slots (${commonSelectedCells.length})</h3>
        <p>${commonSelectedCells.length > 0 ? commonSelectedCells.join(', ') : 'No clashing slots found!'}</p>
    `;

    notSelectedCellsElement.innerHTML = `
        <h3>✅ Free Slots (${freeSlots.length})</h3>
        <p>${freeSlots.length > 0 ? freeSlots.join(', ') : 'No free slots available!'}</p>
    `;
}

// Dark mode toggle
function toggleDarkMode() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    
    // Save preference
    localStorage.setItem('theme', newTheme);
}

// Load saved theme preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
});