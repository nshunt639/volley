/**
 * Created by mohamad on 10/6/14.
 */
define(function () {
    return function () {
        function keyControl(key, player, speed) {
            if (key.up.isDown && key.up.duration < 1000) {
                if(player.sprite.y > 300) {
                    player.sprite.body.moveUp(300);
                }
                speed /= 1.5;
            }

            if (key.right.isDown) {
                player.sprite.body.moveRight(speed);
            } else if (key.left.isDown) {
                player.sprite.body.moveLeft(speed);
            }
        }

        require(['global', 'players', 'input'], function (global, players, input) {
            var speed = global.settings.speed;

            keyControl(input.keyboard.left, players[0], speed);
            keyControl(input.keyboard.right, players[1], speed);


            if(global.ball.body.y > 365) {
                var winner, loser;
                if(global.ball.body.x > 400) {
                    winner = players[0];
                    loser = players[1];
                } else {
                    winner = players[1];
                    loser = players[0];
                }

                winner.point++;


                winner.initPosition();
                loser.initPosition();

                global.ball.body.y = 60;
                global.ball.body.x = winner.sprite.body.x;

                global.ball.body.velocity.x = 0;
                global.ball.body.velocity.y = 0;
                global.game.paused = true;

                setTimeout(function() {
                    global.game.paused = false;
                }, 1000);

            }

        });

    }
});