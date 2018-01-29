const characterSprites = {};
const worldTiles = [];
let imagesToLoad;
const dialogBox = document.createElement('img');

const loadImages = function () {
	const images = [
		{spriteType: 'right', file: 'character/right-default.png'},
		{spriteType: 'rightJump', file: 'character/right-jump.png'},
		{spriteType: 'rightRun1', file: 'character/right-run1.png'},
		{spriteType: 'rightRun2', file: 'character/right-run2.png'},
		{spriteType: 'rightRun3', file: 'character/right-run3.png'},
		{spriteType: 'left', file: 'character/left-default.png'},
		{spriteType: 'leftJump', file: 'character/left-jump.png'},
		{spriteType: 'leftRun1', file: 'character/left-run1.png'},
		{spriteType: 'leftRun2', file: 'character/left-run2.png'},
		{spriteType: 'leftRun3', file: 'character/left-run3.png'},
		{worldType: WORLD_CODES.AIR, file: 'world/sky.png'},
		{worldType: WORLD_CODES.GRASS, file: 'world/grass.png'},
		{worldType: WORLD_CODES.ROCK, file: 'world/rock.png'},
		{worldType: WORLD_CODES.DIRT, file: 'world/dirt.png'},
		{worldType: WORLD_CODES.LAVA, file: 'world/lava.png'},
		{worldType: WORLD_CODES.LEVER_OFF, file: 'world/lever-off.png'},
		{worldType: WORLD_CODES.LEVER_ON, file: 'world/lever-on.png'},
		{worldType: WORLD_CODES.SHOES, file: 'world/shoes.png'},
		{worldType: WORLD_CODES.PORTAL, file: 'world/portal.png'},
		{image: dialogBox, file: 'dialog-box.png'}
	];

	imagesToLoad = images.length;
	images.forEach(function (imageData) {
		if (imageData.spriteType) {
			initSprite(imageData.spriteType, imageData.file);
		} else if (imageData.worldType !== undefined) {
			initWorldTile(imageData.worldType, imageData.file);
		} else if (imageData.image !== undefined) {
			initImage(imageData.image, imageData.file);
		}
	});

};

const initImage = function (image, fileName) {
	image.onload = imageLoaded;
	image.src = 'images/' + fileName;
};

const initSprite = function (spriteType, fileName) {
	characterSprites[spriteType] = document.createElement('img');
	initImage(characterSprites[spriteType], fileName);
};

const initWorldTile = function (worldType, fileName) {
	worldTiles[worldType] = document.createElement('img');
	initImage(worldTiles[worldType], fileName);
};

const imageLoaded = function () {
	imagesToLoad--;

	if (imagesToLoad === 0) {
		startGame();
	}
};