// Source: https://www.codeandweb.com/texturepacker/tutorials/how-to-create-sprite-sheets-and-animations-with-pixijs

// Create a PixiJS application
const app = new PIXI.Application({width: 960, height: 540});

// add the view that Pixi created for you to the DOM
document.body.appendChild(app.view);

// load the assets and start the scene
PIXI.Assets.load([
    "spritesheets/character.json",
    "scene/background.png",
    "scene/middleground.png"
]).then(() => {
  const background = PIXI.Sprite.from("scene/background.png");
  app.stage.addChild(background);

  const middleground = PIXI.Sprite.from("scene/middleground.png");
  app.stage.addChild(middleground);

  // scale stage container to match the background size
  app.stage.scale.x = app.view.width / background.width;
  app.stage.scale.y = app.view.height / background.height;

  const animations = PIXI.Assets.cache.get('spritesheets/character.json').data.animations;
  const character = PIXI.AnimatedSprite.fromFrames(animations["walk"]);

  // configure + start animation:
  character.animationSpeed = 1 / 6;                     // 6 fps
  character.position.set(150, background.height - 180); // almost bottom-left corner of the canvas
  character.play();

  // Enable this to update the anchor points with each animation frame
  //character.updateAnchor = true;

  // add it to the stage and render!
  app.stage.addChild(character);

  // move the character to the right, restart on the left
  app.ticker.add(delta => {
    const speed = 6;
    character.x = (character.x + speed * delta) % (background.width + 200);
  });

  /*
  app.ticker.add(delta => {
    const speed = 6;
  // highlight-start
    character.x = 500;
    character.rotation += delta/100;
  // highlight-end
  });
  */
});