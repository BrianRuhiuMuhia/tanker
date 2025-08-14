import Game from "./Game.js"
const canvas=document.querySelector("canvas")
canvas.width=window.innerWidth
canvas.height=window.innerHeight
const ctx=canvas.getContext("2d")
let interval=null
const game=new Game(canvas,canvas.width,canvas.height)
game.start()
function gameLoop() {
    // Clear the entire canvas properly
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    game.draw();
    game.update(); 
    requestAnimationFrame(gameLoop); 
}
gameLoop()


