var Map = `{"name":"Finish Line","width":420,"height":205,"cameraFollow":"player","spawnDistance":170,"canBeStored":false,"kickOffReset":"full","bg":{"type":"grass","color":"6699CC"},"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":8,"invMass":0,"bCoef":0.5},"goalNet":{"vis":true,"bCoef":0.1,"cMask":["ball"]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]},"border":{"cMask":["none"],"cGroup":["none"],"color":"008000"},"finishLine":{"cMask":["none"],"cGroup":["none"],"color":"FFFFFF"},"disc0":{"radius":0,"invMass":0,"damping":0,"cMask":["none"],"cGroup":["none"]}},"vertexes":[{"x":300,"y":-205,"trait":"finishLine"},{"x":300,"y":205,"trait":"finishLine"},{"x":-420,"y":-205,"trait":"border"},{"x":420,"y":-205,"trait":"border"},{"x":420,"y":205,"trait":"border"},{"x":-420,"y":205,"trait":"border"}],"segments":[{"v0":0,"v1":1,"trait":"finishLine"},{"v0":2,"v1":3,"trait":"border"},{"v0":3,"v1":4,"trait":"border"},{"v0":4,"v1":5,"trait":"border"},{"v0":5,"v1":2,"trait":"border"}],"goals":[],"discs":[{"pos":[0,0],"trait":"disc0"}],"planes":[{"normal":[0,1],"dist":-205,"bCoef":0,"_data":{"extremes":{"normal":[0,1],"dist":-205,"canvas_rect":[-710,-209,710,210],"a":[-710,-205],"b":[710,-205]}}},{"normal":[0,-1],"dist":-205,"bCoef":0,"_data":{"extremes":{"normal":[0,-1],"dist":-205,"canvas_rect":[-710,-209,710,210],"a":[-710,205],"b":[710,205]}}},{"normal":[1,0],"dist":-420,"bCoef":0,"_data":{"extremes":{"normal":[1,0],"dist":-420,"canvas_rect":[-710,-209,710,210],"a":[-420,-209],"b":[-420,210]}}},{"normal":[-1,0],"dist":-420,"bCoef":0,"_data":{"extremes":{"normal":[-1,0],"dist":-420,"canvas_rect":[-710,-209,710,210],"a":[420,-209],"b":[420,210]}}}],"playerPhysics":{},"ballPhysics":"disc0","cameraWidth":1200,"cameraHeight":600,"maxViewWidth":1200}`;

var JMap = JSON.parse(Map); //You can check it just for this map.
var finishLine = JMap.vertexes.filter(s => s.trait == "finishLine"); //If your line is vertical, then you should use X coordinate of player position, if horizontal use Y coordinate. In our case, it's vertical. Here we don't evaluate the cases with diagonal or curved line segments.

var direction = getLineVector(finishLine[0],finishLine[1]); //It's calculated for a single line. For more lines you should create a collection.
var rules = ["H-1","H+1","V-1","V+1"];
var rule = rules[3];

var _room = {
    roomName: "Finish Line",
    noPlayer: true,
    public: false,
    maxPlayers: 2,
    password: "1234567890",
    token: null
};

var room = HBInit({ roomName: _room.roomName, noPlayer: _room.noPlayer, public: _room.public, maxPlayers: _room.maxPlayers, password: _room.password, token: _room.token });

function checker(){
    var player = room.getPlayerList().filter(p => p.team == 1)[0];
    if(room.getPlayerDiscProperties(player.id) != null){
        if(direction == "Horizontal"){
            if(rule == rules[0]){
                if(room.getPlayerDiscProperties(player.id).y < finishLine[1].y){
                    room.stopGame();
                }
            }
            else if(rule == rules[1]){
                if(room.getPlayerDiscProperties(player.id).y > finishLine[1].y){
                    room.stopGame();
                }
            }
            else{
                return false;
            }
        }
        else if(direction == "Vertical"){
            if(rule == rules[2]){
                if(room.getPlayerDiscProperties(player.id).x < finishLine[1].x){
                    room.stopGame();
                }
            }
            else if(rule == rules[3]){
                if(room.getPlayerDiscProperties(player.id).x > finishLine[1].x){
                    room.stopGame();
                }
            }
            else{
                return false;
            }
        }
        else if(direction == "Diagonal"){
            return false;
        }
        else{
            return false;
        } 
    }
}

function getLineVector(v0,v1){
    var division = (v1.y - v0.y) / (v1.x - v0.x);
    var direction = Math.abs(division) == 0 ? "Horizontal" : Math.abs(division) == Infinity ? "Vertical" : "Diagonal";
    return direction;
}

room.onGameStart = function(byPlayer){
    getLineVector(finishLine[0],finishLine[1]);
}

room.onGameTick = function(){
    checker();
}
