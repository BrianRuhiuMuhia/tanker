class Wall{
    constructor(size){
        this.size=size||{width:5,height:4}
        this.wall=this.generateWall()
    }
    generateWall(){
         const array = [];
    for (let i = 0; i < this.size.height; i++) {
        const row = [];
        for (let j = 0; j < this.size.width; j++) {
            row.push(Math.random() < 0.5 ? 1 : 0);
        }
        array.push(row);
    }
    return array;
    }
    getSize(){
        return this.size;
    }
}
export default Wall