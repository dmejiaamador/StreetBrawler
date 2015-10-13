//creating a game object
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

//adding the games states that the game will have 
game.state.add('Boot', StreetBrawler.Boot);
game.state.add('Preload', StreetBrawler.Preload);
game.state.add('MainMenu',StreetBrawler.MainMenu);
game.state.add('Game',StreetBrawler.Game);
//starts the Boot game state
game.state.start('Boot');

