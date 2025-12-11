// Configuración
const CONFIG = {
    gridSize: 6,
    colors: [
        ['#667eea', '#764ba2'],
        ['#f093fb', '#f5576c'],
        ['#4facfe', '#00f2fe'],
        ['#43e97b', '#38f9d7'],
        ['#fa709a', '#fee140'],
    ]
};

let clickCount = 0;
let currentColorScheme = 0;
let cellClicks = {};

// Inicializar la malla
function initGrid() {
    const malla = document.getElementById('malla');
    malla.innerHTML = '';
    cellClicks = {};
    
    for (let i = 1; i <= CONFIG.gridSize * CONFIG.gridSize; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = `cell-${i}`;
        cell.dataset.id = i;
        cell.dataset.count = 0;
        
        cell.addEventListener('click', handleCellClick);
        cell.addEventListener('mouseenter', handleCellHover);
        cell.addEventListener('mouseleave', handleCellLeave);
        
        malla.appendChild(cell);
    }
}

// Manejador de clic en celda
function handleCellClick(event) {
    const cell = event.target;
    const cellId = cell.dataset.id;
    
    // Incrementar contador de clics en esta celda
    cellClicks[cellId] = (cellClicks[cellId] || 0) + 1;
    cell.dataset.count = cellClicks[cellId];
    
    // Incrementar contador global
    clickCount++;
    document.getElementById('clickCount').textContent = clickCount;
    
    // Agregar animación
    cell.classList.add('active');
    
    // Crear efecto ripple
    createRipple(event);
    
    // Remover clase active después de animación
    setTimeout(() => {
        cell.classList.remove('active');
    }, 600);
}

// Efecto hover
function handleCellHover(event) {
    const cell = event.target;
    cell.style.filter = 'brightness(1.2)';
}

function handleCellLeave(event) {
    const cell = event.target;
    cell.style.filter = 'brightness(1)';
}

// Crear efecto ripple (onda)
function createRipple(event) {
    const cell = event.target;
    const rect = cell.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    cell.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Cambiar esquema de colores
function changeColorScheme() {
    currentColorScheme = (currentColorScheme + 1) % CONFIG.colors.length;
    const colors = CONFIG.colors[currentColorScheme];
    
    document.querySelectorAll('.cell').forEach(cell => {
        cell.style.background = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
    });
}

// Reiniciar la malla
function resetGrid() {
    clickCount = 0;
    currentColorScheme = 0;
    document.getElementById('clickCount').textContent = '0';
    
    initGrid();
}

// Event listeners para botones
document.getElementById('resetBtn').addEventListener('click', resetGrid);
document.getElementById('colorBtn').addEventListener('click', changeColorScheme);

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', initGrid);

// Soporte para teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'r') resetGrid();
    if (e.key === 'c') changeColorScheme();
});
