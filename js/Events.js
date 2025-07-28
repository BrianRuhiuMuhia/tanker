class Events{
    constructor(player,ctx){
        this.player=player
        window.addEventListener("keydown",(event)=>{
            this.player.updateRotation(event,ctx)
        })
    }
}
export default Events