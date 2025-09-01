import sprites from "./sprites.js"
const Levels=[
    {"one":{
        "background":{
            sprite:sprites.background.bg1,
            velocity:{x:2,y:0},
            direction:"right",
            directions:["right","left"]
        },
        "player":{
            sprite:sprites.player.p1,
            velocity:{x:4,y:4},
            direction:"right",
            directions:["right","left","up","down"],
            size:{width:40,height:40},
            projectile:sprites.projectile.red
        },
        "enemy":{
            sprite:sprites.asteroid.astr2,
            velocity:{x:2,y:2}
        },
        "level":"one"
        
    }},{
        "two":{
            "background":{
sprite:sprites.background.bg2,
velocity:{x:4,y:4},
directions:["up","down"],
direction:"up"

            },
               "player":{
            sprite:sprites.player.p2,
            velocity:{x:5,y:5},
            direction:"up",
            directions:["up","down"],
            size:{width:40,height:40},
            projectile:sprites.projectile.red
        },
        "enemy":{
            sprite:sprites.alien.alien1,
            velocity:{x:2,y:2}
        },
        "level":"two"
        }
      
    }
]
export default Levels 