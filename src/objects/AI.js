<<<<<<< HEAD
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

=======
AIController = function () {

}
>>>>>>> a5f9627e35e44caabcfaf3b38537e5bdc60f6b1d

PlayerController = function (sprite, speed) {
	if (speed === undefined)
		speed = 400;

	this.sprite = sprite;
	this.cursor = sprite.game.input.keyboard.createCursorKeys();

	this.speed = speed;
}
PlayerController.prototype.update = function () {
	this.sprite.body.velocity.y = 0;
<<<<<<< HEAD
=======
	/*if (this.cursor.left.isDown) {
		this.body.moveLeft(400);
	}
	else if (this.cursor.right.isDown) {
		this.body.moveRight(400);
	}*/

>>>>>>> a5f9627e35e44caabcfaf3b38537e5bdc60f6b1d
	if (this.cursor.up.isDown) {
		this.sprite.body.velocity.y = -this.speed;
	}
	else if (this.cursor.down.isDown) {
		this.sprite.body.velocity.y = this.speed;
	}
}
