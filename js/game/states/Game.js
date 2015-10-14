StreetBrawler .Game = function() {}

StreetBrawler.Game.prototype = {
    create: function() {
        this.background = this.add.sprite(0,0,'background');
        this.background.scale.setTo(5);
        this.add.text(16, 16, "Current State: Game.", { font: "16px Arial", fill: "#ffffff" });

        this.player = this.add.sprite(100, -this.world.height, 'player');
        this.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.gravity.y = 1500;
        this.player.body.collideWorldBounds = true;
        this.player.anchor.setTo(0.5, 1);
        this.player.hp = 100;
        this.player.jumping = false;
        this.player.punching = false;

        this.enemy = this.add.sprite(this.world.width - 100, -this.world.height, 'enemy');
        this.physics.enable(this.enemy, Phaser.Physics.ARCADE);
        this.enemy.body.gravity.y = 1500;
        this.enemy.body.collideWorldBounds = true;
        this.enemy.anchor.setTo(0.5, 1);
        this.enemy.hp = 100;
        this.enemy.jumping = false;
        this.enemy.punching = false;

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.playerHpLabel = this.add.text(16, 30, 'F', {font: '30px Impact', fill: '#ffffff'});
        this.enemyHpLabel = this.add.text(this.world.width - 100, 30, 'F', {font: '30px Impact', fill: '#ffffff'});

        this.jumpKey = this.input.keyboard.addKey(Phaser.Keyboard.W);
        this.leftKey = this.input.keyboard.addKey(Phaser.Keyboard.A);
        this.rightKey = this.input.keyboard.addKey(Phaser.Keyboard.D);
        this.punchKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    doDamage: function(player, enemy) {
        if (this.player.punching) {
            this.enemy.hp -= 1;
        }

        if (this.enemy.punching) {
            this.player.hp -= 1;
        }
    },

    update: function() {
        this.playerHpLabel.setText(Math.floor(this.player.hp));
        this.enemyHpLabel.setText(Math.floor(this.enemy.hp));

        // the enemy whips her hair back and forth
        if (this.enemy.position.x < 200)
            this.enemy.body.velocity.x = 100;
        else if (this.enemy.position.x > this.world.width - 200)
            this.enemy.body.velocity.x = -100;

        // the enemy randomly punches
        if (Math.random() > 0.95 && !this.enemy.punching) {
            this.enemy.punching = true;
            this.enemy.scale.y = 1.5;
        } else {
            this.enemy.punching = false;
            this.enemy.scale.y = 1;
        }

        // the enemy randomly jumps
        if (this.enemy.body.velocity.y === 0) {
            if (Math.random() > 0.99 && !this.enemy.jumping) {
                this.enemy.jumping = true;
                this.enemy.body.velocity.y = -1000;
            } else {
                this.enemy.jumping = false;
                this.enemy.body.velocity.y = 0;
            }
        }

        // if the player and enemy overlap, call the doDamage function
        this.physics.arcade.overlap(this.player, this.enemy, this.doDamage, null, this);

        // figure out how to move the player
        this.player.body.velocity.x = 0;
        if (this.punchKey.isDown && this.punchKey.duration < 500) {
            this.player.punching = true;
            this.player.scale.y = 1.5;
        } else {
            this.player.punching = false;
            this.player.scale.y = 1;
        }
        if (!this.player.punching) {
            if (this.player.body.velocity.y === 0) {
                if (this.jumpKey.isDown && this.jumpKey.duration < 10 && !this.player.jumping) {
                    this.player.jumping = true;
                    this.player.body.velocity.y = -1000;
                } else {
                    this.player.jumping = false;
                    this.player.body.velocity.y = 0;
                }
            }

            if (this.rightKey.isDown) {
                this.player.body.velocity.x = 275;
                this.player.scale.x = 1;
            }

            if (this.leftKey.isDown) {
                this.player.body.velocity.x = -275;
                this.player.scale.x = -1
            }
        }
    },
}
