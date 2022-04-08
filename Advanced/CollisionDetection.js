var Map = `` //Insert your map content in JSON parsed format

var JMap = JSON.parse(Map);

var room = HBInit({roomName:"Collision Detection",noPlayer:true,public:true,maxPlayers:10});

function collisionDetectionSegmentPlayer() { //This function must be handled in room.onGameTick() to get the true result.
    var players = room.getPlayerList();
    for (var i = 0; i < players.length; i++) {
        for (var j = 0; j < JMap.segments.length; j++) {
            if (players[i].team == 1) {
                var distancetov0 = pointDistance(room.getPlayerDiscProperties(players[i].id), JMap.vertexes[JMap.segments[j].v0]);
                var distancetov1 = pointDistance(room.getPlayerDiscProperties(players[i].id), JMap.vertexes[JMap.segments[j].v1]);
                var length = pointDistance(JMap.vertexes[JMap.segments[j].v0], JMap.vertexes[JMap.segments[j].v1]);
                var dot = (((players[i].position.x - JMap.vertexes[JMap.segments[j].v0].x) * (JMap.vertexes[JMap.segments[j].v1].x - JMap.vertexes[JMap.segments[j].v0].x)) + ((players[i].position.y - JMap.vertexes[JMap.segments[j].v0].y) * (JMap.vertexes[JMap.segments[j].v1].y - JMap.vertexes[JMap.segments[j].v0].y))) / Math.pow(length, 2);
                var closestX = JMap.vertexes[JMap.segments[j].v0].x + (dot * (JMap.vertexes[JMap.segments[j].v1].x - JMap.vertexes[JMap.segments[j].v0].x));
                var closestY = JMap.vertexes[JMap.segments[j].v0].y + (dot * (JMap.vertexes[JMap.segments[j].v1].y - JMap.vertexes[JMap.segments[j].v0].y));
                var closestPoint = { x: closestX, y: closestY };
                console.log("distancetov0: " + distancetov0 + "\ndistancetov1: " + distancetov1 + "\nlength: " + length + "\ndot: " + dot + "\nclosestPoint: {" + closestPoint.x + "," + closestPoint.y + "}"); //Before handling this function in room.onGameTick(), toggle this row in command line.

                if (pointDistance(closestPoint, JMap.vertexes[JMap.segments[j].v0]) + pointDistance(closestPoint, JMap.vertexes[JMap.segments[j].v1]) == length) {
                    distX = closestX - players[i].position.x;
                    distY = closestY - players[i].position.y;
                    var distancetosegment = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));

                    if (0 <= Math.hypot(room.getPlayerDiscProperties(players[i].id).xspeed, room.getPlayerDiscProperties(players[i].id).yspeed)) {
                        if (JMap.segments[j].cMask != undefined && JMap.segments[j].cMask.includes("red") == true && JMap.segments[j].bCoef != undefined && JMap.segments[j].curve == undefined || (JMap.segments[j].curve != undefined && JMap.segments[j].curve == 0)) { //Red team collision condition for parkour maps
                            if (distancetosegment <= room.getPlayerDiscProperties(players[i].id).radius + 0.01) { //0.01 is the tolerance
                                if (room.getPlayerDiscProperties(players[i].id) != null) {
                                    console.log(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + "." + new Date().getMilliseconds() + " 💥 " + players[i].name + " has collided with the point {" + closestX + "," + closestY + "} located on a wall on the point {" + room.getPlayerDiscProperties(players[i].id).x + "," + room.getPlayerDiscProperties(players[i].id).y + "}.");
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

room.onGameTick = function () {
    collisionDetectionSegmentPlayer();
}

//WILL BE UPDATED SOON...
