import DrawImage from "./DrawImage.js"
class Explosion{
constructor(sprites,delta){
this.sprites=this.getArrayFromObj(sprites)
this.index=-1
this.currentSprite=null
this.currentSpriteImage=null
this.size={width:50,height:50}
this.maxLen=this.sprites.length-1
this.count=0
this.maxTime=10
}
draw(ctx,position){
    if(this.index>=this.maxLen){
        this.index=0
    }
    if(this.count>this.maxTime){
       this.index++
this.currentSprite=this.sprites[this.index]
consle.log(this.currentSprite)
this.currentSpriteImage=new DrawImage(this.currentSprite,position,{x:0,y:0},0,this.size)
this.currentSpriteImage.draw(ctx) 
this.count=0
    }
    else{
        this.count++
    }

}
getArrayFromObj(obj){
let arr=[]
for(let key in obj){
    arr.push(obj[key])
}
return arr
}
}
export default Explosion