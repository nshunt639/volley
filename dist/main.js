define("states/preload",[],function(){return function(){this.game.load.image("background","assets/images/background.jpg"),this.game.load.image("piece","assets/images/piece.png"),this.game.load.image("ball","assets/images/ball.png"),this.game.load.image("net","assets/images/net.png")}}),define("states/create",[],function(){return function(){var e=this.game;require(["players","global"],function(t,n){e.add.image(0,0,"background"),e.physics.startSystem(Phaser.Physics.P2JS),e.physics.p2.gravity.y=600,e.physics.p2.restitution=.1,e.physics.p2.friction=2,e.physics.p2.stiffness=2e4;var r=e.add.sprite(10,420);e.physics.p2.enable(r),r.body.clearShapes(),r.body.addRectangle(790,50,390,0),r.body.gravity.y=-11112,r.body.mass=600,net=e.add.sprite(400,260,"net"),e.physics.p2.enable(net),net.body.fixedRotation=!0,net.body.clearShapes(),net.body.addRectangle(15,190,20,45),net.body.mass=1500,net.body.gravity.y=99999;var i=e.add.sprite(150,60,"ball");e.physics.p2.enable(i),i.body.clearShapes(),i.body.addCircle(32,0,0),i.body.gravity.y=.1,i.body.mass=.001,n.ball=i,require(["material/sprites","material/contacts"],function(s,o){i.body.setMaterial(s.ball),e.physics.p2.walls.top.shapes[0].material=s.topWall,r.body.setMaterial(s.platformer),net.body.setMaterial(s.net);for(var u in t)t[u].sprite=e.add.sprite(0,0,"piece"),t[u].pointText=e.add.text(500*u+150,50,"0",{font:"36px Arial",fill:"#FFFFFF"}),t[u].initPosition(),e.physics.p2.enable(t[u].sprite),t[u].sprite.body.fixedRotation=!0,t[u].sprite.body.gravity.y=1e3,t[u].sprite.body.clearShapes(),t[u].sprite.body.addRectangle(37,86,0,33),t[u].sprite.body.addCircle(32,0,-42),t[u].sprite.body.setMaterial(s.piece);n.cursors=e.input.keyboard.createCursorKeys()}),require(["libs/gyro"],function(e){e.frequency=1,e.startTracking(function(e){e.y?t[0].sprite.body.moveRight(e.y*150):e.gamma&&t[0].sprite.body.moveRight(e.gamma*50)})}),e.input.onTap.add(function(){t[0].sprite.body.moveUp(300)})})}}),define("states/update",[],function(){return function(){function e(e,t,n){e.up.isDown&&e.up.duration<1e3&&(t.sprite.y>300&&t.sprite.body.moveUp(300),n/=1.5),e.right.isDown?t.sprite.body.moveRight(n):e.left.isDown&&t.sprite.body.moveLeft(n)}require(["global","players","input"],function(t,n,r){var i=t.settings.speed;e(r.keyboard.left,n[0],i),e(r.keyboard.right,n[1],i);if(t.ball.body.y>365){var s,o;t.ball.body.x>400?(s=n[0],o=n[1]):(s=n[1],o=n[0]),s.point++,s.initPosition(),o.initPosition(),t.ball.body.y=60,t.ball.body.x=s.sprite.body.x,t.ball.body.velocity.x=0,t.ball.body.velocity.y=0,t.game.paused=!0,setTimeout(function(){t.game.paused=!1},1e3)}})}}),define("global",{}),requirejs.config({baseUrl:"src",paths:{states:"states"}});var g,gl;define("main",["states/preload","states/create","states/update","global"],function(e,t,n,r){var i=new Phaser.Game(800,450,Phaser.AUTO,"volley",{preload:e,create:t,update:n});return r.game=i,r.settings={speed:300},g=i,gl=r,i});