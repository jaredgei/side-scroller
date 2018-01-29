const GROUND_FRICTION = 0;
const AIR_RESISTANCE = 0.95;
const HORIZONTAL_AIR_SPEED_MODIFIER = 0.72;
const GRAVITY = 1.5;
const RUN_SPEED = 14.0;

const Character = function () {
	this.x = 0;
	this.y = 0;
	this.speedX = 0;
	this.speedY = 0;
	this.isOnGround = true;
	this.leftHeld = false;
	this.rightHeld = false;

	this.image = characterSprites.right;
	this.facing = 'right';
	this.animationIndex = 0;
	this.rightRunAnimation = [characterSprites.rightRun1, characterSprites.rightRun2, characterSprites.rightRun3, characterSprites.rightRun2];
	this.leftRunAnimation = [characterSprites.leftRun1, characterSprites.leftRun2, characterSprites.leftRun3, characterSprites.leftRun2];

	this.radius = brickSize / 3;
	this.jumpPower = 10.0;

	this.leftKey = KEY_CODES.a;
	this.rightKey = KEY_CODES.d;
	this.jumpKey = KEY_CODES.w;

	this.reset = function (x, y) {
	    // center character on screen
	    this.x = x;
	    this.y = y;
	    this.speedX = 0;
	    this.speedY = 0;
	    this.facing = 'right';
	    this.image = characterSprites.right;
	};

	this.setKeyHeld = function (event, value) {
	    if (event.keyCode === this.leftKey) {
	        event.preventDefault();
	        this.leftHeld = value;
	    }
	    if (event.keyCode === this.rightKey) {
	        event.preventDefault();
	        this.rightHeld = value;
	    }
	    if (event.keyCode === this.jumpKey) {
		    event.preventDefault();
	        if (this.isOnGround) {
	            this.speedY = -this.jumpPower;
	        }
	    }
	};

	this.setLanded = function () { // Landed on the ground
		this.y = (1 + Math.floor(this.y / brickSize)) * brickSize - this.radius;
		this.isOnGround = true;
		this.image = this.facing === 'right' ? characterSprites.right : characterSprites.left;
		this.speedY = 0;
	};

	this.setHeadHit = function () { // Head hit an obstacle while jumping
	    this.y = (Math.floor(this.y / brickSize)) * brickSize + this.radius;
	    this.speedY = 0.0;
	};

	this.setFalling = function () { // Starts to fall
		this.isOnGround = false;
		this.image = this.facing === 'right' ? characterSprites.rightJump : characterSprites.leftJump;
	};

	this.setCollision = function (direction) {
		if (direction !== 'left' && direction !== 'right') {
			console.error('invalid direction passed to Character.setCollision. Expected "left" or "right".');
		}

		if (direction === 'left') {
			this.x = (Math.floor(this.x / brickSize)) * brickSize + this.radius;
		} else {
			this.x = (1 + Math.floor(this.x / brickSize )) * brickSize - this.radius;
		}
	};

	this.handlePowerup = function (powerup) {
		if (powerup !== 'shoes') {
			console.error('invalid powerup passed to Character.handlePowerup.');
		}

		switch (powerup) {
		case 'shoes':
			this.jumpPower = 30.0;
			break;
		default:
			break;
		}
	};

	this.adjustSpeed = function () {
		// Housekeeping
	    if (this.isOnGround) {
	        this.speedX *= GROUND_FRICTION;
	    } else {
	        this.speedX *= AIR_RESISTANCE;
	        this.speedY += GRAVITY;
	        // Don't let the character move faster than their size, or else they can fall through tiles
	        if (this.speedY > this.radius) {
	            this.speedY = this.radius;
	        }
	    }

	    // Check keypresses
		if (this.leftHeld) {
		    this.speedX = this.isOnGround ? -RUN_SPEED : -RUN_SPEED * HORIZONTAL_AIR_SPEED_MODIFIER;
		    this.facing = 'left';
		    this.image = this.leftRunAnimation[Math.floor(this.animationIndex / 4)];
		    this.animationIndex = (this.animationIndex + 1) % (this.leftRunAnimation.length * 4);
		}
		if (this.rightHeld) {
		    this.speedX = this.isOnGround ? RUN_SPEED : RUN_SPEED * HORIZONTAL_AIR_SPEED_MODIFIER;
		    this.facing = 'right';
		    this.image = this.rightRunAnimation[Math.floor(this.animationIndex / 4)];
		    this.animationIndex = (this.animationIndex + 1) % (this.rightRunAnimation.length * 4);
		}
		if (!this.rightHeld && !this.leftHeld) {
			this.image = this.facing === 'right' ? characterSprites.right : characterSprites.left;
		}
	};

	this.move = function () {
    	this.x += this.speedX;
    	this.y += this.speedY;
	};

	this.draw = function () {
		canvasContext.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
	};
};
