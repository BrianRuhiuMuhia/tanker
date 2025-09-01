import Sprite from "./Sprite.js";
import sprites from "./sprites.js";
import DrawImage from "./DrawImage.js";
import Player from "./Player.js"
import Events from "./Events.js";
import Levels from "./Levels.js";
import Background from "./Background.js";
import Enemy from "./Enemy.js";
class Game{
    constructor(canvas,width,height){
        this.canvas = canvas;
        this.ctx = this.setCtx();
        this.gameSize=this.setGameSize(width,height)
        this.currentLevel=this.getCurrentLevel()
        this.background=new Background(this.gameSize,this.currentLevel)
        this.player=new Player({width,height},this.currentLevel)
        this.position={x:0,y:0}
        this.enemy=new Enemy(this.gameSize,this.currentLevel,this.player)
        this.gameStates={"start":false,"playing":false,"paused":false,"over":false}
        this.gameLevels=["one","two","final",]
new Events(this.player,this.getCtx())
    }
    start(){
    
    }
    getCurrentLevel(){
    Levels.forEach((level)=>{

    })
    this.currentLevel=Levels[1]["two"]
    return this.currentLevel
    }
     draw(){
        
{
this.background.draw(this.ctx)

}{
    this.player.draw(this.ctx,this.gameSize)
}{
    this.enemy.draw(this.ctx)

}

    }
    update(){
        this.background.update(this.player.currentDirection)
        this.player.playerUpdate()    
        this.enemy.update()
    
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