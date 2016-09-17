AIController = function () {

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
	/*if (this.cursor.left.isDown) {
		this.body.moveLeft(400);
	}
	else if (this.cursor.right.isDown) {
		this.body.moveRight(400);
	}*/

	if (this.cursor.up.isDown) {
		this.sprite.body.velocity.y = -this.speed;
	}
	else if (this.cursor.down.isDown) {
		this.sprite.body.velocity.y = this.speed;
	}
}
