const DIALOG_DELAY = 15;

const Dialog = function () {
	this.title = 'Welcome! Use the WASD keys to move.';
	this.subtitle = '';
	this.counter = DIALOG_DELAY;

	this.reset = function () {
		this.title = '';
		this.subtitle = '';
		this.counter = DIALOG_DELAY;
	};

	this.draw = function () {
	    if (this.counter > 0) {
	        this.counter--;
	    }

	    canvasContext.drawImage(dialogBox, canvas.width / 2 - 304, canvas.height / 2 - 88, 608, 176);
	    createText(this.title, canvas.width / 2, canvas.height / 2 - 6, '#000000', 24);
	    createText(this.subtitle || '(Press any key to continue)', canvas.width / 2, canvas.height / 2 + 18, '#666666', 18);
	};

	this.setMessage = function (title, subtitle) {
		this.title = title || '';
		this.subtitle = subtitle || '';
	};
};