var collisionTicks = 0;
var kickCount = 0;
var nextToKickOff = 1;
var teleportPoints = [{ x: -300, y: 0, xspeed: 0, yspeed: 0 }, { x: 300, y: 0, xspeed: 0, yspeed: 0 }];

var assistingTouch = "";
var lastPlayerTouched = undefined;
var lastTeamTouched = 0;
var previousPlayerTouched = undefined;

var triggerDistance = 25.01;

var teleportStatus = false;

var room = HBInit({ roomName: "Player Teleport After Kick-off", noPlayer: true, public: false, maxPlayers: 3 });

function ifPlayerIsInGame(player) {
    return room.getPlayerDiscProperties(player.id) != null;
}

function ifPlayerNotTeleported(player) {
    return ifPlayerIsInGame(player) == true && (room.getPlayerDiscProperties(player.id).x != teleportPoints[player.team - 1].x || room.getPlayerDiscProperties(player.id).y != teleportPoints[player.team - 1].y);
}

function increaseKickCount() {
    kickCount++;
}

function increaseCollisionTicks() {
    collisionTicks += 1 / 60;
}

function pointDistance(p1, p2) {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

function resetCollisionTicks() {
    if (collisionTicks != 0) collisionTicks = 0;
}

function resetKickCount() {
    if (kickCount != 0) kickCount = 0;
}

function resetLastToucher() {
    if (assistingTouch != "" || lastPlayerTouched != undefined || lastTeamTouched != 0 || previousPlayerTouched != undefined) {
        assistingTouch = "";
        lastPlayerTouched = undefined;
        lastPlayerTouched = 0;
        previousPlayerTouched = undefined;
    }
}

function resetNextToKickOff() {
    if (nextToKickOff != 1) nextToKickOff = 1;
}

function resetTeleportStatus() {
    if (teleportStatus == true) teleportStatus = false;
}

function setNextToKickOff(team) {
    nextToKickOff = 3 - team;
}

function teleportPlayerAfterKickOff_Kick(player) {
    if (nextToKickOff == 1) {
        if (kickCount == 1) {
            if (ifPlayerIsInGame(player) == true) {
                if (player.team == nextToKickOff) {
                    if (ifPlayerNotTeleported(player) == true) {
                        if (teleportStatus == false) {
                            room.setPlayerDiscProperties(player.id, { x: teleportPoints[player.team - 1].x, y: teleportPoints[player.team - 1].y, xspeed: teleportPoints[player.team - 1].xspeed, yspeed: teleportPoints[player.team - 1].yspeed });
                            teleportStatus = true;
                        }
                    }
                }
            }
        }
    }
}

function teleportPlayerAfterKickOff_Tick(player) {
    if (nextToKickOff == 1) {
        if (0 < collisionTicks && collisionTicks <= 1 / 60) {
            if (ifPlayerIsInGame(player) == true) {
                if (player.team == nextToKickOff) {
                    if (ifPlayerNotTeleported(player) == true) {
                        if (teleportStatus == false) {
                            room.setPlayerDiscProperties(player.id, { x: teleportPoints[player.team - 1].x, y: teleportPoints[player.team - 1].y, xspeed: teleportPoints[player.team - 1].xspeed, yspeed: teleportPoints[player.team - 1].yspeed });
                            teleportStatus = true;
                        }
                    }
                }
            }
        }
    }
}

function updateLastToucher() {
    var ballPosition = room.getBallPosition();
    var players = room.getPlayerList();
    for (var i = 0; i < players.length; i++) {
        if (players[i].position != null) {
            var distanceToBall = pointDistance(players[i].position, ballPosition);
            if (distanceToBall < triggerDistance) {
                increaseCollisionTicks();
                if (lastPlayerTouched != players[i]) {
                    if (lastTeamTouched == players[i].team) {
                        assistingTouch = lastPlayerTouched;
                    } else assistingTouch = "";
                }
                lastTeamTouched = players[i].team;
                previousPlayerTouched == lastPlayerTouched;
                lastPlayerTouched = players[i];
                point = room.getBallPosition();
            }
        }
    }
    return lastPlayerTouched;
}

room.onGameStart = function (byPlayer) {
    resetCollisionTicks();
    resetKickCount();
    resetLastToucher();
    resetNextToKickOff();
    resetTeleportStatus();
}

room.onGameStop = function (byPlayer) {
    resetCollisionTicks();
    resetKickCount();
    resetLastToucher();
    resetNextToKickOff();
    resetTeleportStatus();
}

room.onGameTick = function () {
    if (room.getPlayerList().filter(p => p.team != 0).length > 0) {
        room.getPlayerList().filter(p => p.team != 0).forEach(p => teleportPlayerAfterKickOff_Tick(p));
        updateLastToucher();
    }
}

room.onPlayerJoin = function (player) {
    room.setPlayerAdmin(player.id, true);
}

room.onPlayerBallKick = function (player) {
    increaseKickCount();
    teleportPlayerAfterKickOff_Kick(player);
}

room.onPositionsReset = function () {
    resetCollisionTicks();
    resetKickCount();
    resetLastToucher();
    resetTeleportStatus();
}

room.onTeamGoal = function (team) {
    setNextToKickOff(team);
}
