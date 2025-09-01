class Events{
    constructor(player,ctx){
        this.player=player
        window.addEventListener("keydown",(event)=>{
            this.player.updateRotation(event,ctx)
        })
        window.addEventListener("click",(event)=>{
            let mouseCoords={x:event.clientX,y:event.clientY}
            this.player.update(mouseCoords)
        })
    }
}
export default Events