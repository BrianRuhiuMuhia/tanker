class DrawImage {
    #sprite;
    #position;
    #origin;
    #size
    constructor(sprite, position, origin, rotation,size) {
        this.#sprite = sprite;
        this.#position = position||{x:0,y:0};
        this.#origin = origin || {x:0,y:0};
this.#size=size
        this.rotation = rotation || 0;
    }

    drawSprite(ctx) {
        if(!this.#sprite || !this.#size){
            throw new Error("Empty Sprite or Size:Class DrawImage,Method draw(ctx)")
        }
        
 ctx.save()
        ctx.translate(this.#position.x, this.#position.y);
        ctx.rotate(this.rotation* (Math.PI / 180));
        ctx.drawImage(
            this.#sprite,
            0, 0,
            this.#sprite.width, this.#sprite.height,
            -this.#origin.x, -this.#origin.y,
            this.#size.width||this.#sprite.width, this.#size.height||this.#sprite.height
        ); 
        ctx.restore()

       
        
    }
   static drawImage(ctx,position,size,options){
    ctx.save()
      ctx.beginPath();
        ctx.fillStyle = "red";
        
        ctx.fillRect(position.x, position.y, size.width, size.height);
        ctx.fill();
        ctx.closePath();
        ctx.restore()
    }
}
/*class DrawImage {
    constructor(sprite, position, origin, rotation, size) {
        this.sprite = sprite;
        this.position = position || { x: 0, y: 0 };
        this.origin = origin || { x: 0, y: 0 };
        this.size = size;
        this.rotation = rotation || 0;
        this.isLoaded = sprite.complete;
        
        if (!this.isLoaded) {
            // Use passive listeners for performance
            sprite.addEventListener('load', () => this.isLoaded = true, { once: true });
            sprite.addEventListener('error', () => console.warn("Image failed to load"), { once: true });
        }
    }

    async draw(ctx) {
        if (!this.isLoaded) {
            if (!this.sprite.complete) {
                await this._waitForLoad();
            }
            this.isLoaded = true;
        }
        
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation * (Math.PI / 180));
        ctx.drawImage(
            this.sprite,
            0, 0, this.sprite.width, this.sprite.height,
            -this.origin.x, -this.origin.y,
            this.size?.width || this.sprite.width,
            this.size?.height || this.sprite.height
        );
        ctx.restore();
    }

    _waitForLoad() {
        return new Promise(resolve => {
            const check = () => {
                if (this.sprite.complete) {
                    resolve();
                } else {
                    requestAnimationFrame(check); 
                }
            };
            check();
        });
    }
} */
export default DrawImage