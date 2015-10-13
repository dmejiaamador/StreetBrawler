StreetBrawler.Preload = function (){};

StreetBrawler.Preload.prototype = {
    preload: function() {
        // here you load all the game images and what not
        //note to self you have to preload all the assets you want to use in the state before. Then you can actually use them. Cant use             them if you preload and create them in the same state.
        this.load.image('background', 'assets/images/background.png');
    
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY+ 128, 'preloadBar');
        this.preloadBar = this.preloadBar.anchor.setTo(0.5);
        this.add.text(16, 16, "State: preload", { font: "16px Arial", fill: "#ffffff" }); 
    },
    create: function() {
        this.state.start('MainMenu');
    }
   
};