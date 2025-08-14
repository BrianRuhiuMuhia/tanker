import sprites from "./sprites.js";
class Sprite {
    constructor() {
        this.sprite=null
    }

    getSprite(spriteName) {

      this.sprite=sprites[spriteName]
      if(this.sprite)
      {
        return this.sprite
      }
    else
        throw new Error("sprite not loaded Class:Sprite,Method:getSprite")        
    }
}


export default Sprite