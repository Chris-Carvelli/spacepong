AIController = function (sprite, target, speed) {
	if (speed === undefined)
		speed = 400;

	this.sprite = sprite;
	this.target = target;
	
	this.speed = speed;
}
AIController.prototype.update = function () {
	this.sprite.body.velocity.y = 0;

	if (this.target !== undefined) {
		if (this.sprite.body.y > this.target.body.y) {
			this.sprite.body.velocity.y = -this.speed;
		}
		else if (this.sprite.y < this.target.body.y) {
			this.sprite.body.velocity.y = this.speed;
		}
	}
}

PlayerController = function (sprite, speed) {
	if (speed === undefined)
		speed = 400;

	this.sprite = sprite;
	this.cursor = sprite.game.input.keyboard.createCursorKeys();

	this.speed = speed;
}
PlayerController.prototype.update = function () {
	this.sprite.body.velocity.y = 0;
	
	if (this.cursor.up.isDown) {
		this.sprite.body.velocity.y = -this.speed;
	}
	else if (this.cursor.down.isDown) {
		this.sprite.body.velocity.y = this.speed;
	}
}
