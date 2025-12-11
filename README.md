# Malla-Oceanograf-a-2014C
Malla de oceanografía 2014C
malla-interactiva/
│
├── index.html          # Archivo principal HTML
├── style.css           # Estilos CSS
├── script.js           # Lógica JavaScript
└── README.md           # Documentación (opcional)
DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Malla Interactiva</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="container">
        <header>
            <h1><i class="fas fa-th"></i> Malla Interactiva</h1>
            <p class="subtitle">Haz clic, arrastra o pasa el cursor sobre los elementos</p>
            <div class="controls">
                <button id="resetBtn" class="btn">
                    <i class="fas fa-redo"></i> Reiniciar
                </button>
                <button id="colorBtn" class="btn">
                    <i class="fas fa-palette"></i> Cambiar Colores
                </button>
                <div class="counter">
                    <span id="clickCount">0</span> clicks
                </div>
            </div>
        </header>
        
        <main>
            <div class="grid" id="malla">
                <!-- Las celdas se generarán con JavaScript -->
            </div>
        </main>
        
        <footer>
            <p>Malla interactiva alojada en GitHub Pages | 
               <a href="https://github.com/tu-usuario/tu-repositorio" target="_blank">
                   <i class="fab fa-github"></i> Ver código fuente
               </a>
            </p>
        </footer>
    </div>
    
    <script src="script.js"></script>
</body>
</html>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    color: #f0f0f0;
    min-height: 100vh;
    padding: 20px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

header {
    text-align: center;
    margin-bottom: 40px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

h1 {
    font-size: 2.8rem;
    margin-bottom: 10px;
    background: linear-gradient(90deg, #00dbde, #fc00ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
}

.subtitle {
    font-size: 1.2rem;
    color: #aaa;
    margin-bottom: 25px;
}

.controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 20px;
}

.btn {
    padding: 12px 24px;
    background: linear-gradient(90deg, #4a54e1, #15aabf);
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    background: linear-gradient(90deg, #15aabf, #4a54e1);
}

.counter {
    font-size: 1.2rem;
    background: rgba(255, 255, 255, 0.1);
    padding: 10px 20px;
    border-radius: 50px;
    font-weight: bold;
}

#clickCount {
    color: #00ff88;
    font-size: 1.5rem;
}

.grid {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 12px;
    margin: 0 auto;
    max-width: 1000px;
}

.cell {
    aspect-ratio: 1;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 2px solid transparent;
    user-select: none;
}

.cell:hover {
    transform: scale(1.05);
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.1);
}

.cell.active {
    background: linear-gradient(135deg, #00b4db, #0083b0);
    transform: scale(1.08);
    box-shadow: 0 5px 15px rgba(0, 180, 219, 0.4);
}

.cell.highlight {
    background: linear-gradient(135deg, #ff8a00, #da1b60);
    box-shadow: 0 5px 15px rgba(255, 138, 0, 0.4);
}

footer {
    text-align: center;
    margin-top: 50px;
    padding: 20px;
    color: #888;
    font-size: 0.9rem;
}

footer a {
    color: #4a9eff;
    text-decoration: none;
    margin-left: 5px;
    transition: color 0.3s;
}

footer a:hover {
    color: #00ff88;
    text-decoration: underline;
}

/* Responsive */
@media (max-width: 1100px) {
    .grid {
        grid-template-columns: repeat(8, 1fr);
        max-width: 800px;
    }
}

@media (max-width: 768px) {
    .grid {
        grid-template-columns: repeat(6, 1fr);
        max-width: 600px;
    }
    
    h1 {
        font-size: 2.2rem;
    }
    
    .controls {
        flex-direction: column;
    }
}

@media (max-width: 480px) {
    .grid {
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
    }
    
    h1 {
        font-size: 1.8rem;
    }
    
    .cell {
        font-size: 1.4rem;
    }
}document.addEventListener('DOMContentLoaded', function() {
    const grid = document.getElementById('malla');
    const clickCountElement = document.getElementById('clickCount');
    const resetBtn = document.getElementById('resetBtn');
    const colorBtn = document.getElementById('colorBtn');
    
    let clickCount = 0;
    let isColorMode1 = true;
    
    // Colores para los dos modos
    const colorMode1 = ['#00b4db', '#0083b0', '#7b4397', '#dc2430', '#ff8a00', '#da1b60'];
    const colorMode2 = ['#00ff88', '#00ccff', '#ffcc00', '#ff3366', '#9d4edd', '#ff6b6b'];
    
    // Crear la malla de 10x10 (100 celdas)
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.id = i;
        
        // Ícono para cada celda (puedes cambiarlos)
        const icons = ['fas fa-star', 'fas fa-heart', 'fas fa-circle', 'fas fa-square', 'fas fa-gem', 'fas fa-bolt'];
        const iconClass = icons[Math.floor(Math.random() * icons.length)];
        
        const icon = document.createElement('i');
        icon.className = iconClass;
        cell.appendChild(icon);
        
        // Evento al hacer clic
        cell.addEventListener('click', function() {
            handleCellClick(this);
        });
        
        // Evento al pasar el cursor
        cell.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.classList.add('highlight');
            }
        });
        
        cell.addEventListener('mouseleave', function() {
            this.classList.remove('highlight');
        });
        
        grid.appendChild(cell);
    }
    
    // Manejar clic en celda
    function handleCellClick(cell) {
        // Contar el clic
        clickCount++;
        clickCountElement.textContent = clickCount;
        
        // Remover la clase 'active' de todas las celdas
        document.querySelectorAll('.cell').forEach(c => {
            c.classList.remove('active');
        });
        
        // Activar la celda clickeada
        cell.classList.add('active');
        
        // Efecto visual adicional
        const colors = isColorMode1 ? colorMode1 : colorMode2;
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        cell.style.background = `linear-gradient(135deg, ${randomColor}, ${darkenColor(randomColor, 20)})`;
        
        // Efecto de sonido simulado (podrías añadir un sonido real)
        console.log(`Celda ${cell.dataset.id} activada!`);
    }
    
    // Función para oscurecer un color
    function darkenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        
        return '#' + (
            0x1000000 +
            (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)
        ).toString(16).slice(1);
    }
    
    // Reiniciar malla
    resetBtn.addEventListener('click', function() {
        document.querySelectorAll('.cell').forEach(cell => {
            cell.classList.remove('active');
            cell.style.background = '';
        });
        
        clickCount = 0;
        clickCountElement.textContent = clickCount;
        
        // Efecto visual en el botón
        this.classList.add('clicked');
        setTimeout(() => this.classList.remove('clicked'), 300);
    });
    
    // Cambiar esquema de colores
    colorBtn.addEventListener('click', function() {
        isColorMode1 = !isColorMode1;
        
        // Efecto visual en el botón
        this.classList.add('clicked');
        setTimeout(() => this.classList.remove('clicked'), 300);
        
        // Actualizar texto del botón
        const paletteIcon = this.querySelector('i');
        paletteIcon.className = isColorMode1 ? 'fas fa-palette' : 'fas fa-fill-drip';
        
        console.log(`Modo de color cambiado a: ${isColorMode1 ? 'Modo 1' : 'Modo 2'}`);
    });
    
    // Información inicial en consola
    console.log('Malla interactiva cargada correctamente!');
    console.log('Instrucciones:');
    console.log('1. Haz clic en cualquier celda para activarla');
    console.log('2. Pasa el cursor sobre las celdas para resaltarlas');
    console.log('3. Usa los botones para reiniciar o cambiar colores');
});
# Malla Interactiva

Una malla interactiva creada con HTML, CSS y JavaScript, alojada en GitHub Pages.

## Características
- Malla de 10x10 celdas interactivas
- Efectos visuales al hacer clic y pasar el cursor
- Contador de clicks
- Dos modos de color diferentes
- Diseño responsivo

## Cómo usar
1. Haz clic en cualquier celda para activarla
2. Pasa el cursor sobre las celdas para ver el efecto de resaltado
3. Usa el botón "Reiniciar" para limpiar todas las celdas activas
4. Usa el botón "Cambiar Colores" para alternar entre dos esquemas de color

## Tecnologías utilizadas
- HTML5
- CSS3 (Grid, Flexbox, Gradientes)
- JavaScript (ES6)
- Font Awesome para iconos

