const WORLD_CODES = {
	AIR: 0,
	GRASS: 1,
	ROCK: 2,
	DIRT: 3,
	LAVA: 4,
	LEVER_OFF: 5,
	LEVER_ON: 6,
	SHOES: 7,
	PORTAL: 8,
	SPAWN: 9
};
const OBSTACLES = [WORLD_CODES.ROCK, WORLD_CODES.GRASS, WORLD_CODES.DIRT];
const levels = [{
	map: [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2,
	      2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2,
	      2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2,
	      2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2,
	      2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2,
	      2, 0, 2, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 2, 2, 2, 2, 2, 2,
	      1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	      3, 2, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3,
	      3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3,
	      3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3,
	      3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3,
	      3, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3,
	      3, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3,
	      3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3,
	      3, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3,
	      3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3,
	      3, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3,
	      3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3,
	      3, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3,
	      3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3,
	      3, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3,
	      3, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3,
	      3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 3,
	      3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
	      3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
	cols: 21,
	rows: 25
}, {
	map: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      	   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      	   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      	   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      	   0, 9, 0, 0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      	   0, 2, 0, 0, 2, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      	   0, 2, 0, 0, 2, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8,
      	   0, 2, 0, 0, 2, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 2, 2, 0, 0, 2, 2,
      	   0, 2, 0, 0, 2, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 2, 2, 0, 0, 2, 2,
      	   4, 2, 4, 4, 2, 4, 2, 4, 4, 2, 4, 2, 4, 4, 4, 2, 2, 2, 4, 4, 4, 4, 2, 2, 4, 4, 2, 2 ],
    cols: 28,
    rows: 10
}, {
	map: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
      	   2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
      	   2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
      	   2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2,
      	   2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 2,
      	   2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 2, 0, 2, 0, 0, 2, 2, 2, 0, 2,
      	   2, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2,
      	   2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 2, 2,
      	   2, 9, 0, 0, 0, 0, 7, 0, 5, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2,
      	   1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1 ],
    cols: 20,
    rows: 10
}];
const KEY_CODES = {
	w: 87,
	s: 83,
	d: 68,
	a: 65
};

const Game = function () {
	this.character = new Character();
	this.level = new Level(levels[0].map, levels[0].cols, levels[0].rows);
	this.dialog = new Dialog();
	this.currentLevel = 0;

	this.camPanX = 0;
	this.camPanY = 0;
	this.cameraGraceX = 150;
	this.cameraGraceY = 100;

	this.reset = function () {
		this.initInput();
		this.character.reset(this.getCharacterSpawnX(), this.getCharacterSpawnY());
		this.setupCamera();
	};

	this.getCharacterSpawnX = function () {
		return this.level.getSpawnCol() * brickSize + brickSize / 2;
	};

	this.getCharacterSpawnY = function () {
		return (this.level.getSpawnRow() + 1) * brickSize - this.character.radius;
	};

	this.move = function () {
		if (this.dialog.title) {
		    return;
		}

	    this.character.adjustSpeed();
	    this.checkCollision();
	    this.checkSpecialTile();
	    this.character.move();
	    this.cameraFollow();
	};

	this.draw = function () {
	    createRect(0, 0, canvas.width, canvas.height, 'black');
	    canvasContext.save();
	    canvasContext.translate(-this.camPanX, -this.camPanY);
	    this.level.drawTilesOnScreen(this.camPanX, this.camPanY);
	    this.character.draw();
	    canvasContext.restore();
	    if (this.dialog.title) {
	        this.dialog.draw();
	    }
	};

	this.initInput = function () {
	    document.addEventListener("keydown", this.keyPressed.bind(this));
	    document.addEventListener("keyup", this.keyReleased.bind(this));
	}

	this.keyPressed = function (event) {
		if (this.dialog.title) {
			if (this.dialog.counter === 0) {
				this.dialog.reset();
			}

			return;
		}

	    this.character.setKeyHeld(event, true);
	}

	this.keyReleased = function (event) {
	    this.character.setKeyHeld(event, false);
	}

	this.checkCollision = function () {
		if (this.character.speedY < 0 && this.level.isObstacleAtPixelCoordinate(this.character.x, this.character.y - this.character.radius)) {
			this.character.setHeadHit();
		}
		if (this.character.speedY > 0 && this.level.isObstacleAtPixelCoordinate(this.character.x, this.character.y + this.character.radius + this.character.speedY)) {
		    this.character.setLanded();
		} else if (!this.level.isObstacleAtPixelCoordinate(this.character.x, this.character.y + this.character.radius + 2)) {
			this.character.setFalling();
		}
		if (this.character.speedX < 0 && this.level.isObstacleAtPixelCoordinate(this.character.x - this.character.radius, this.character.y + this.character.speedY)) {
			this.character.setCollision('left')
		}
		if (this.character.speedX > 0 && this.level.isObstacleAtPixelCoordinate(this.character.x + this.character.radius, this.character.y + this.character.speedY)) {
			this.character.setCollision('right');
		}
	};

	this.checkSpecialTile = function () {
		const tileIndex = this.level.getIndexForPixelCoordinate(this.character.x, this.character.y);

		switch (this.level.map[tileIndex]) {
		case WORLD_CODES.LAVA:
			this.character.reset(this.getCharacterSpawnX(), this.getCharacterSpawnY());
			this.setupCamera();
			this.dialog.setMessage('You burned in lava :(');
			break;
		case WORLD_CODES.LEVER_OFF:
			if (this.character.speedX > 0) {
				this.level.setTile(tileIndex, WORLD_CODES.LEVER_ON);
			}
			break;
		case WORLD_CODES.LEVER_ON:
			if (this.character.speedX < 0) {
				this.level.setTile(tileIndex, WORLD_CODES.LEVER_OFF);
			}
			break;
		case WORLD_CODES.SHOES:
			this.level.setTile(tileIndex, WORLD_CODES.AIR);
			this.character.handlePowerup('shoes');
			this.dialog.setMessage('You found a pair of jordans!', 'Now you\'ve got mad ups.');
			break;
		case WORLD_CODES.PORTAL:
			this.currentLevel++;
			this.level.loadLevel(levels[this.currentLevel]);
			this.character.reset(this.getCharacterSpawnX(), this.getCharacterSpawnY());
			this.setupCamera();
		default:
			break;
		}
	};

	this.setupCamera = function () {
		this.camPanX = this.character.x - canvas.width / 2;
		this.camPanY = this.character.y - canvas.height / 2;
		this.fixCameraOutOfBounds();
	}

	this.cameraFollow = function () {
		const cameraFocusCenterX = this.camPanX + canvas.width / 2;
		const cameraFocusCenterY = this.camPanY + canvas.height / 2;
		const playerDistFromCameraFocusX = Math.abs(this.character.x - cameraFocusCenterX);
		const playerDistFromCameraFocusY = Math.abs(this.character.y - cameraFocusCenterY);

		if (playerDistFromCameraFocusX > this.cameraGraceX) {
			if (cameraFocusCenterX < this.character.x)  {
				this.camPanX += Math.abs(this.character.speedX) || 30;
			} else {
				this.camPanX -= Math.abs(this.character.speedX) || 30;
			}
		}
		if (playerDistFromCameraFocusY > this.cameraGraceY) {
			if (cameraFocusCenterY < this.character.y)  {
				this.camPanY += Math.abs(this.character.speedY) || 30;
			} else {
				this.camPanY -= Math.abs(this.character.speedY) || 30;
			}
		}

		this.fixCameraOutOfBounds();
	};

	this.fixCameraOutOfBounds = function () {
		if (this.camPanX < 0) {
			this.camPanX = 0;
		}
		if (this.camPanY < 0) {
			this.camPanY = 0;
		}

		const maxPanRight = this.level.cols * brickSize - canvas.width;
		const maxPanTop = this.level.rows * brickSize - canvas.height;
		if (this.camPanX > maxPanRight) {
			this.camPanX = maxPanRight;
		}
		if (this.camPanY > maxPanTop) {
			this.camPanY = maxPanTop;
		}
	};
};