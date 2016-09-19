PgSprite = function (game, x, y, key, frame) {
	this.game = game;
	this.inputEnabled = false;

	Phaser.Sprite.call (this, game, x, y, key);
	this.anchor.setTo (0.5, 0.5);

	game.physics.arcade.enable(this);
	this.body.collideWorldBounds = true;
	this.body.immovable = true;

	game.add.existing (this);

	this.gui = BasicGame.gui.addFolder('Pg (' + key + ')');
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

PgSprite.prototype.setController = function (controller) {

	if (controller !== undefined) {
		this.controller = controller;
		this.gui.add (this.controller, 'speed')
	}
	else {
		this.gui.remove (this.controller, 'speed');
		this.controller = undefined;
	}
}

Ball = function (game, x, y, key, frame) {
	this.game = game;
	this.speed = 600;
	this._oldSpeed = this.speed;

	this.collidingObjects = [];

	Phaser.Sprite.call (this, game, x, y, key);
	this.anchor.setTo (0.5, 0.5);

	game.physics.arcade.enable(this);
	this.body.collideWorldBounds = true;
	this.body.bounce.set(1);

	game.add.existing (this);


	this.gui = BasicGame.gui.addFolder('Ball');
	this.gui.add (this, 'speed', 0, 2000).onFinishChange(function(value) {
		this.object.body.velocity.x *= value / this.object._oldSpeed;
		this.object.body.velocity.y *= value / this.object._oldSpeed;

	  this.object._oldSpeed = value;
	});
}

Ball.prototype = Object.create (Phaser.Sprite.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.update = function () {
	//console.log (this.body.velocity.x / this.speed, this.body.velocity.y / this.speed);
	//this.body.velocity.x = this.speed * Math.acos (this.body.velocity.x / this.speed);
	//this.body.velocity.y = this.speed * Math.asin (this.body.velocity.y / this.speed);
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