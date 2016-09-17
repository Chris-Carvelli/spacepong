BasicGame.Player = function (game, name, id, startX, startY, health) {
	if (health === undefined)
		health = 20;
	//I prefear this.health = health === undefined ? 100 : health;
	//but I understand that most people's eyes would bleed reading that :)

	this.name = name;
	this.startX = startX;
	this.startY = startY;

	this.startHealt = health;
	this.health = health;

	this.offset = id % 2 == 0 ? -30 : 30;
	this.sprite =  new PgSprite (game, startX + this.offset, startY, 'pg' + id);
	this.end = new End (game, startX, startY, 'end' + id);
}
BasicGame.Player.prototype.reset = function () {
	this.health = this.startHealt
	this.sprite.x = this.startX + this.offset;
	this.sprite.y = this.startY;
}


BasicGame.Game = function (game) {
	this.p1;
	this.p2;

	this.ball;

	this.bouncers;

	this.end1;
	this.end2;

	this.btnStart;
	this.btnRestart; 	
};

BasicGame.Game.prototype = {
  create: function () {
  	this.btnStart = this.add.button (this.world.width/2, 600, 'btnStart', function () {
      this.ball.x = this.world.width / 2;
      this.ball.y = this.world.height / 2;

      this.p1.reset ();
      this.p1.sprite.controller = new PlayerController (this.p1.sprite);
      this.p2.reset ();
  		this.p2.sprite.controller = new PlayerController (this.p2.sprite);

  		this.btnStart.visible = false;
  	
  		this.ball.applyForce (45);
  	}, this);
  	this.btnStart.anchor = {x: 0.5, y: 0.5};

  	this.btnRestart = this.add.button (this.world.width/2, 600, 'btnRestart');
  	this.btnRestart.anchor = {x: 0.5, y: 0.5};
  	this.btnRestart.visible = false;

  	this.game.physics.startSystem(Phaser.Physics.ARCADE);

  	this.p1 = new BasicGame.Player (this.game, 'Blue', 1, 20, this.world.height/2);
  	this.p2 = new BasicGame.Player (this.game, 'Red', 2, this.world.width - 20, this.world.height/2);

  	this.ball = new Ball (this.game, this.world.width/2, this.world.height / 2, 'ball');

  	this.bouncers = this.add.group ();
  	this.bouncers.add (this.p1.sprite);
  	this.bouncers.add (this.p2.sprite);

  	this.end1 = new End (this.game, 20, this.world.height/2, 'end1');
  	this.end2 = new End (this.game, this.world.width - 20, this.world.height/2, 'end2');

  	this.ball.addCollidingObjects (this.bouncers);
  	this.ball.addCollidingObjects (this.p1.end, this.touchCollider, {this: this, player: this.p1});
  	this.ball.addCollidingObjects (this.p2.end, this.touchCollider, {this: this, player: this.p2});

  },
  update: function () {


  },
  quitGame: function (pointer) {

	

  },
  touchCollider: function () {
  	console.log (this.player.name + ' lose health!');
  	this.player.health -= 10;

  	if (this.player.health <= 0)
      //reading this MY eyes bleed. Do you know a better way to pass parameters to this callback?
  		this.this.gameOver (this.player);
  },
  gameOver: function (player) {
  	console.log (player.name + ' lost!');

  	this.p1.sprite.controller = undefined;
		this.p2.sprite.controller = undefined;
		this.btnStart.visible = true;

    this.p1.sprite.stop();
    this.p2.sprite.stop();
		this.ball.stop ();
  }

};

