import Game from "./Game.js"
const canvas=document.querySelector("canvas")
canvas.width=window.innerWidth
canvas.height=window.innerHeight
let interval=null
const game=new Game(canvas,canvas.width,canvas.height)
game.start()
window.addEventListener("resize", () => {
    game.setGameSize(window.innerWidth,window.innerHeight)
    
});
function animate(){
    interval=requestAnimationFrame(animate)
    game.draw()
    game.update()
}
animate()
