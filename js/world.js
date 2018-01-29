const BRICK_COLS = 20;
const BRICK_ROWS = 10;
const WORLD_CODES = {
	AIR: 0,
	GRASS: 1,
	ROCK: 2,
	DIRT: 3,
	LAVA: 4,
	LEVER_OFF: 5,
	LEVER_ON: 6,
	SHOES: 7
};
const OBSTACLES = [WORLD_CODES.ROCK, WORLD_CODES.GRASS, WORLD_CODES.DIRT];

const brickGrid =
    [ 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
      2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
      2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
      2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2,
      2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 2,
      2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 2, 0, 2, 0, 0, 2, 2, 2, 0, 2,
      2, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2,
      2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 2, 2,
      2, 0, 0, 0, 0, 0, 7, 0, 5, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1 ];

let camPanX = 0.0;
let camPanY = 0.0;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X = 150;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y = 100;

const brickTileToIndex = function (tileCol, tileRow) {
	return (tileCol + BRICK_COLS * tileRow);
};

const getIndexForPixelCoord = function (x, y) {
	const tileCol = Math.floor(x / brickSize);
	const tileRow = Math.floor(y / brickSize);
	return brickTileToIndex(tileCol, tileRow);
};

const isObstacleAtPixelCoord = function (x, y) {
	const tile = brickGrid[getIndexForPixelCoord(x, y)];

	// first check whether the character is out of bounds
	if (tile === undefined) {
	    return false;
	}
	
	return (OBSTACLES.indexOf(tile) >= 0);
};

const drawBricksOnScreen = function () {
	// what are the top-left most col and row visible on canvas?
	const cameraLeftMostCol = Math.floor(camPanX / brickSize);
	const cameraTopMostRow = Math.floor(camPanY / brickSize);

	// how many columns and rows of tiles fit on one screenful of area?
	const colsThatFitOnScreen = Math.ceil(canvas.width / brickSize);
	const rowsThatFitOnScreen = Math.ceil(canvas.height / brickSize);

	// finding the rightmost and bottommost tiles to draw.
	const cameraRightMostCol = cameraLeftMostCol + colsThatFitOnScreen + 1;
	const cameraBottomMostRow = cameraTopMostRow + rowsThatFitOnScreen + 1;
	
	for (let eachCol = cameraLeftMostCol; eachCol < cameraRightMostCol; eachCol++) {
		for (let eachRow = cameraTopMostRow; eachRow < cameraBottomMostRow; eachRow++) {
				const tile = brickGrid[brickTileToIndex(eachCol, eachRow)];
				const brickLeftEdgeX = eachCol * brickSize;
				const brickTopEdgeY = eachRow * brickSize;
				// First draw air under everything so partially transparent tiles render correctly
				canvasContext.drawImage(worldTiles[WORLD_CODES.AIR], brickLeftEdgeX, brickTopEdgeY, brickSize, brickSize);
				if (tile && tile !== WORLD_CODES.AIR) { // No need to draw air again
					// Draw the actual tile
					canvasContext.drawImage(worldTiles[tile], brickLeftEdgeX, brickTopEdgeY, brickSize, brickSize);
				}
		}
	}
};

const setupCamera = function () {
	camPanX = character.x - canvas.width / 2;
	camPanY = character.y - canvas.height / 2;
	fixCameraOutOfBounds();
}

const cameraFollow = function () {
	const cameraFocusCenterX = camPanX + canvas.width / 2;
	const cameraFocusCenterY = camPanY + canvas.height / 2;
	const playerDistFromCameraFocusX = Math.abs(character.x - cameraFocusCenterX);
	const playerDistFromCameraFocusY = Math.abs(character.y - cameraFocusCenterY);

	if (playerDistFromCameraFocusX > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X) {
		if (cameraFocusCenterX < character.x)  {
			camPanX += Math.abs(character.speedX) || 30;
		} else {
			camPanX -= Math.abs(character.speedX) || 30;
		}
	}
	if (playerDistFromCameraFocusY > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y) {
		if (cameraFocusCenterY < character.y)  {
			camPanY += Math.abs(character.speedY) || 30;
		} else {
			camPanY -= Math.abs(character.speedY) || 30;
		}
	}

	fixCameraOutOfBounds();
};

const fixCameraOutOfBounds = function () {
	if (camPanX < 0) {
		camPanX = 0;
	}
	if (camPanY < 0) {
		camPanY = 0;
	}

	const maxPanRight = BRICK_COLS * brickSize - canvas.width;
	const maxPanTop = BRICK_ROWS * brickSize - canvas.height;
	if (camPanX > maxPanRight) {
		camPanX = maxPanRight;
	}
	if (camPanY > maxPanTop) {
		camPanY = maxPanTop;
	}
};
