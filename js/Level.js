const Level = function (map, cols, rows) {
	this.map = map;
	this.cols = cols;
	this.rows = rows;

	this.loadLevel = function (level) {
		this.map = level.map;
		this.cols = level.cols;
		this.rows = level.rows;
	};

	this.getIndexForColAndRow = function (col, row) {
		return (col + this.cols * row);
	};

	this.getColForIndex = function (index) {
		const col = index % this.cols;
		return col;
	};

	this.getRowForIndex = function (index) {
		const row = Math.floor(index / this.cols);
		return row;
	}

	this.getIndexForPixelCoordinate = function (x, y) {
		const tileCol = Math.floor(x / brickSize);
		const tileRow = Math.floor(y / brickSize);
		return this.getIndexForColAndRow(tileCol, tileRow);
	};

	this.getSpawnCol = function () {
		const index = this.map.indexOf(WORLD_CODES.SPAWN);
		return this.getColForIndex(index);
	};

	this.getSpawnRow = function () {
		const index = this.map.indexOf(WORLD_CODES.SPAWN);
		return this.getRowForIndex(index);
	};

	this.setTile = function (index, tile) {
		this.map[index] = tile;
	};

	this.isObstacleAtPixelCoordinate = function (x, y) {
		const tile = this.map[this.getIndexForPixelCoordinate(x, y)];

		// first check whether the character is out of bounds
		if (tile === undefined) {
		    return false;
		}

		return (OBSTACLES.indexOf(tile) >= 0);
	};

	this.drawTilesOnScreen = function (camPanX, camPanY) {
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
				const tile = this.map[this.getIndexForColAndRow(eachCol, eachRow)];
				const brickLeftEdgeX = eachCol * brickSize;
				const brickTopEdgeY = eachRow * brickSize;
				// First draw air under everything so partially transparent tiles render correctly
				canvasContext.drawImage(worldTiles[WORLD_CODES.AIR], brickLeftEdgeX, brickTopEdgeY, brickSize, brickSize);
				if (tile && tile !== WORLD_CODES.AIR && tile !== WORLD_CODES.SPAWN) { // No need to draw air again, and make the spawn just show as air
					// Draw the actual tile
					canvasContext.drawImage(worldTiles[tile], brickLeftEdgeX, brickTopEdgeY, brickSize, brickSize);
				}
			}
		}
	}
};
