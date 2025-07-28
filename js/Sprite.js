import sprites from "./sprites.js";
class Sprite {
    constructor() {
        this.sprite=null
        this.isLoaded=true
    }

    getSprite(spriteName) {

      this.sprite=sprites[spriteName]
if(this.isLoaded)
     return this.sprite
    else
        throw new Error("sprite not loaded Class:Sprite,Method:getSprite")        
    }
}


export default Sprite