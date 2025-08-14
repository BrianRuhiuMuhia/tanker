import Sprite from "./Sprite.js";
import sprites from "./sprites.js";
import DrawImage from "./DrawImage.js";
import Player from "./Player.js"
import Events from "./Events.js";
import EnemyClass from "./EnemyClass.js";
import Background from "./Background.js";
import AsteroidBelt from "./AsteroidBelt.js";
class Game{
    constructor(canvas,width,height){
        this.canvas = canvas;
        this.ctx = this.setCtx();
        this.gameSize=this.setGameSize(width,height)
        this.background=new Background(this.gameSize)
        this.player=new Player({width,height},this.getCtx())
        this.position={x:0,y:0}
        this.asteroidBelt=new AsteroidBelt(this.gameSize)
new Events(this.player,this.getCtx())
    }
    start(){
    
    }
     draw(){
        
{
this.background.draw(this.ctx)

}{
    this.player.draw(this.ctx,this.gameSize)
}{
    this.asteroidBelt.draw(this.ctx)

}

    }
    update(){
        this.background.update(this.player.currentDirection)
        this.player.playerUpdate()    
        this.asteroidBelt.update()
    }
    setGameSize(width,height){
this.canvas.width=width
this.canvas.height=height
this.gameSize={width,height}
return {width,height}
    }
    getGameSize(){
        return this.gameSize
    }
    setCtx(){
    return this.canvas.getContext('2d');
     
    }
    getCtx(){
        return this.ctx
    }
    clearCanvas(){
this.ctx.clearRect(0,0,this.gameSize.width,this.gameSize.height)
    }
}
export default Game