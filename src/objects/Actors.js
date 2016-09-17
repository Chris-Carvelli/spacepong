PgSprite = function (game, x, y, key, frame) {
	this.game = game;
	this.inputEnabled = false;

	Phaser.Sprite.call (this, game, x, y, key);
	this.anchor.setTo (0.5, 0.5);

	game.physics.arcade.enable(this);
	this.body.collideWorldBounds = true;
	this.body.immovable = true;

	game.add.existing (this);
}

PgSprite.prototype = Object.create (Phaser.Sprite.prototype);
PgSprite.prototype.constructor = PgSprite;

PgSprite.prototype.update = function () {
	if (this.controller !== undefined)
		this.controller.update();
}

PgSprite.prototype.stop = function () {
	this.body.velocity.x = 0;
	this.body.velocity.y = 0;
}

Ball = function (game, x, y, key, frame) {
	this.game = game;
	this.speed = 600;

	this.collidingObjects = [];

	Phaser.Sprite.call (this, game, x, y, key);
	this.anchor.setTo (0.5, 0.5);

	game.physics.arcade.enable(this);
	this.body.collideWorldBounds = true;
	this.body.bounce.set(1);

	game.add.existing (this);
}

Ball.prototype = Object.create (Phaser.Sprite.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.update = function () {
	for (var i in this.collidingObjects) {
		var obj, handler, ctx;
		[obj, handler, ctx] = this.collidingObjects[i];
		this.game.physics.arcade.collide(this, obj, handler, null, ctx);
	}
}

Ball.prototype.applyForce = function (angle) {
	this.body.velocity.x = this.speed * Math.cos (angle * Math.PI / 180);
	this.body.velocity.y = this.speed * Math.sin (angle * Math.PI / 180);
}

Ball.prototype.stop = function () {
	this.body.velocity.x = 0;
	this.body.velocity.y = 0;
}

Ball.prototype.addCollidingObjects = function (obj, collisionHandler, ctx) {
	this.collidingObjects.push ([obj, collisionHandler, ctx]);
}

End = function (game, x, y, key, frame) {
	this.game = game;

	Phaser.Sprite.call (this, game, x, y, key);
	this.game.physics.arcade.enable(this);
	this.body.immovable = true;
	this.anchor.setTo (0.5, 0.5);
	this.scale.y = 80;

	game.add.existing (this);
}

End.prototype = Object.create (Phaser.Sprite.prototype);
End.prototype.constructor = End;