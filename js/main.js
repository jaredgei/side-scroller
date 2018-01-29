let canvas, canvasContext;
let brickSize;

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    canvas.height = canvas.width / 2;
    canvasContext.webkitImageSmoothingEnabled = false;
    canvasContext.mozImageSmoothingEnabled = false;
    canvasContext.imageSmoothingEnabled = false;

    brickSize = 144;

    createRect(0, 0, canvas.width, canvas.height, '#000000');
    createText('Loading...', canvas.width / 2, canvas.height / 2, '#ffffff');
    loadImages();
};

const startGame = function () {
    const game = new Game();
    game.reset();
    setInterval(function () {
        game.move();
        game.draw();
    }, 1000/30); // 30fps
};