const svgElement = document.querySelector('svg');
svgElement.addEventListener('mousemove', function (event) {
    const svgRect = svgElement.getBoundingClientRect();
    // Convertir la position de la souris dans le système de coordonnées du SVG
    const mouseX = event.clientX - svgRect.left;
    const mouseY = event.clientY - svgRect.top;

    // console.log("X = " + Math.round(mouseX) + "\nY = " + Math.round(mouseY));

    moveEyepill(mouseX, mouseY, 'eyepillLeft', 100, 135, 145);
    moveEyepill(mouseX, mouseY, 'eyepillRight', 200, 135, 145);
});

function moveEyepill(mouseX, mouseY, eyepillId, eyeCenterX, eyeCenterY, maxY) {
    const eyepill = document.getElementById(eyepillId);
    const maxDistance = 25; // Max distance eyepill can move from center

    let dx = mouseX - eyeCenterX;
    let dy = mouseY - eyeCenterY;

    // Limiter dy pour ne pas descendre en dessous de maxY
    let angle = Math.atan2(dy, dx);
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > maxDistance) {
        distance = maxDistance;
    }

    let proposedY = eyeCenterY + Math.sin(angle) * distance;
    let newY = proposedY > maxY ? maxY : proposedY; // Ne pas dépasser maxY sur l'axe Y

    // Appliquer les nouvelles positions, en ajustant newY pour rester au-dessus de la ligne
    eyepill.setAttribute('cx', eyeCenterX + Math.cos(angle) * distance);
    eyepill.setAttribute('cy', newY);
}











document.getElementById('svg').addEventListener('mousemove', function (event) {
    const svgRect = this.getBoundingClientRect();
    const mouseY = event.clientY - svgRect.top; // Position Y de la souris dans le SVG
    const halfHeight = svgRect.height / 2.2;

    // Affiche le cercle et cache le triangle si la souris est dans la moitié haute
    if (mouseY < halfHeight) {
        document.getElementById('mouthTriangle').style.display = 'none';
        document.getElementById('mouthCircle').style.display = '';
    } else {
        // Affiche le triangle et cache le cercle si la souris est dans la moitié basse
        document.getElementById('mouthTriangle').style.display = '';
        document.getElementById('mouthCircle').style.display = 'none';
    }
});



svgElement.addEventListener('click', function (event) {
    svgElement.classList.toggle('spin');

    svgElement.addEventListener('animationend', function (event) {
        if (event.animationName === 'spin') {
            svgElement.classList.remove('spin');
            svgElement.classList.add('idle');
        }
    });
});

