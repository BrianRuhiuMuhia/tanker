import Sprite from "./Sprite.js";
import sprites from "./sprites.js";
import DrawImage from "./DrawImage.js";
import Player from "./Player.js"
import Events from "./Events.js";
import EnemyClass from "./EnemyClass.js";
class Game{
    constructor(canvas,width,height){
        this.canvas = canvas;
        this.ctx = this.setCtx();
        this.gameSize=this.setGameSize(width,height)
        this.backgroundSprite=new Sprite("background"
            
        )
        this.backgroundImage=null
        this.player=new Player({width,height},this.getCtx())
        this.position={x:0,y:0}
        this.EnemyClass=new EnemyClass({width,height},25)
new Events(this.player,this.getCtx())
    }
    start(){
        this.EnemyClass.createEnemy()
    }
     draw(){
        
{
let bgSprite=new Sprite().getSprite("background")
this.backgroundImage=new DrawImage(bgSprite,{x:0,y:0},{x:0,y:0},0,this.gameSize)
        this.backgroundImage.draw(this.ctx)

}{
    this.player.draw(this.ctx)
}{
    this.EnemyClass.draw(this.ctx)
}

    }
    update(){
        this.player.playerUpdate()
this.EnemyClass.update(this.player.position)    

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
    clearCanvas(position,size){
this.ctx.clearRect(position.x,position.y,size.width,size.height)
    }
}
export default Game