var targetPoint = { x: 0, y: 0 };
var triggerDistance = 1;
var zone = { x: 300, y: -100 };

var room = HBInit({ roomName: "Ball Zone Check and Teleport", noPlayer: true, public: true, maxPlayers: 12 });

function isBallInTheZone(ball = room.getDiscProperties(0)) {
    return pointDistance(ball, zone) <= triggerDistance;
}

function moveObjectToPos(obj, pos) {
    if(room.getDiscProperties(obj) != null) room.setDiscProperties(obj, { x: pos.x, y: pos.y });
}

function pointDistance(p1, p2) {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

function teleport(ball = room.getDiscProperties(0)) {
    if (isBallInTheZone(ball) == true) {
        moveObjectToPos(0, targetPoint);
    }
}

room.onGameTick = function(){
    teleport();
}
