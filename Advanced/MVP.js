var Map = '{"name":"hax.ita Futsal 1v1 2v2","width":480,"height":230,"bg":{"type":"","kickOffRadius":60,"color":"304a32"},"vertexes":[{"x":-401.4,"y":-200,"trait":"vertexDefault"},{"x":401.4,"y":-200,"trait":"vertexDefault"},{"x":401.4,"y":200,"trait":"vertexDefault"},{"x":-401.4,"y":200,"trait":"vertexDefault"},{"x":0,"y":200,"trait":"vertexDefault"},{"x":0,"y":-200,"trait":"vertexDefault"},{"x":0,"y":-80,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"vertexDefault","color":"c2c2c2"},{"x":0,"y":80,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"vertexDefault","color":"c2c2c2"},{"x":-400,"y":70,"trait":"vertexDefault"},{"x":-400,"y":-70,"trait":"vertexDefault"},{"x":400,"y":-70,"trait":"vertexDefault"},{"x":400,"y":70,"trait":"vertexDefault"},{"x":0,"y":230,"trait":"vertexDefault"},{"x":0,"y":-230,"trait":"vertexDefault"},{"x":436.4,"y":-70,"trait":"vertexDefault"},{"x":436.4,"y":70,"trait":"vertexDefault"},{"x":-436.4,"y":-70,"trait":"vertexDefault"},{"x":-436.4,"y":70,"trait":"vertexDefault"},{"x":0,"y":-1.5,"trait":"vertexDefault"},{"x":0,"y":1.5,"trait":"vertexDefault"},{"x":400,"y":-135,"trait":"vertexDefault"},{"x":400,"y":135,"trait":"vertexDefault"},{"x":-400,"y":-135,"trait":"vertexDefault"},{"x":-400,"y":135,"trait":"vertexDefault"},{"x":-400,"y":-201.4,"trait":"vertexDefault"},{"x":400,"y":-201.4,"trait":"vertexDefault"},{"x":400,"y":201.4,"trait":"vertexDefault"},{"x":-400,"y":201.4,"trait":"vertexDefault"},{"x":435,"y":-71.4,"trait":"vertexDefault"},{"x":435,"y":71.4,"trait":"vertexDefault"},{"x":-435,"y":-71.4,"trait":"vertexDefault"},{"x":-435,"y":71.4,"trait":"vertexDefault"}],"segments":[{"v0":5,"v1":6,"trait":"wall_map_nc"},{"v0":4,"v1":7,"trait":"wall_map_nc"},{"v0":6,"v1":13,"trait":"KO_barrier"},{"v0":7,"v1":12,"trait":"KO_barrier"},{"v0":6,"v1":7,"curve":180,"color":"c2c2c2","trait":"KO_wall_red"},{"v0":7,"v1":6,"curve":180,"color":"c2c2c2","trait":"KO_wall_blue"},{"v0":18,"v1":19,"curve":180,"trait":"decoration_map"},{"v0":19,"v1":18,"curve":180,"trait":"decoration_map"},{"v0":21,"v1":20,"curve":150,"trait":"decoration_map"},{"v0":22,"v1":23,"curve":150,"trait":"decoration_map"},{"v0":10,"v1":14,"trait":"wall_blue_goal"},{"v0":28,"v1":29,"trait":"wall_blue_goal"},{"v0":15,"v1":11,"trait":"wall_blue_goal"},{"v0":8,"v1":17,"trait":"wall_red_goal"},{"v0":31,"v1":30,"trait":"wall_red_goal"},{"v0":16,"v1":9,"trait":"wall_red_goal"},{"v0":9,"v1":8,"trait":"goal_line"},{"v0":10,"v1":11,"trait":"goal_line"},{"v0":0,"v1":1,"trait":"wall_map"},{"v0":25,"v1":10,"trait":"wall_map"},{"v0":11,"v1":26,"trait":"wall_map"},{"v0":2,"v1":3,"trait":"wall_map"},{"v0":27,"v1":8,"trait":"wall_map"},{"v0":9,"v1":24,"trait":"wall_map"}],"planes":[{"normal":[0,1],"dist":-230,"bCoef":0,"_data":{"extremes":{"normal":[0,1],"dist":-230,"canvas_rect":[-901,-368,901,368],"a":[-901,-230],"b":[901,-230]}}},{"normal":[0,-1],"dist":-230,"bCoef":0,"_data":{"extremes":{"normal":[0,-1],"dist":-230,"canvas_rect":[-901,-368,901,368],"a":[-901,230],"b":[901,230]}}},{"normal":[1,0],"dist":-480,"bCoef":0,"_data":{"extremes":{"normal":[1,0],"dist":-480,"canvas_rect":[-901,-368,901,368],"a":[-480,-368],"b":[-480,368]}}},{"normal":[-1,0],"dist":-480,"bCoef":0,"_data":{"extremes":{"normal":[-1,0],"dist":-480,"canvas_rect":[-901,-368,901,368],"a":[480,-368],"b":[480,368]}}}],"goals":[{"p0":[-407.9,70],"p1":[-407.9,-70],"team":"red"},{"p0":[407.9,70],"p1":[407.9,-70],"team":"blue"}],"discs":[{"pos":[-400,-70],"trait":"goal_post"},{"pos":[-400,70],"trait":"goal_post"},{"pos":[400,-70],"trait":"goal_post"},{"pos":[400,70],"trait":"goal_post"}],"playerPhysics":{"bCoef":0,"acceleration":0.11,"kickingAcceleration":0.083,"kickStrength":4.2,"radius":15},"ballPhysics":{"radius":5.8,"bCoef":0.412,"invMass":1.55,"color":"FFF26D"},"spawnDistance":200,"traits":{"wall_map":{"vis":true,"color":"abc2d5","bCoef":1,"cMask":["ball"],"bias":-10},"wall_map_nc":{"vis":true,"color":"abc2d5","bCoef":0,"cMask":[],"cGroup":[]},"KO_wall_red":{"vis":true,"color":"d9a472","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO"]},"KO_wall_blue":{"vis":true,"color":"d9a472","bCoef":0.1,"cMask":["red","blue"],"cGroup":["blueKO"]},"vertexDefault":{"bCoef":1,"cMask":[],"cGroup":[]},"decoration_map":{"vis":true,"color":"626262","bCoef":0,"cMask":[]},"goal_line":{"vis":true,"color":"c5c5c5","bCoef":0,"cMask":[]},"wall_red_goal":{"vis":true,"color":"ff6666","bCoef":0.1,"cMask":["ball"],"bias":-10},"wall_blue_goal":{"vis":true,"color":"6666ff","bCoef":0.1,"cMask":["ball"],"bias":-10},"goal_post":{"radius":5.4,"invMass":0,"color":"031726"},"map_point":{"curve":180,"vis":true,"color":"626262","cMask":[]},"KO_barrier":{"vis":false,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]}},"joints":[],"redSpawnPoints":[],"blueSpawnPoints":[],"canBeStored":false}';

var JMap = JSON.parse(Map);

var room = HBInit({ roomName: "MVP Script", playerName: "", noPlayer: true, public: true, maxPlayers: 16});

room.setCustomStadium(Map)

var lastScores = 0;
var lastTeamTouched = 0;
var previousBallPos;
var assistingTouch = undefined;
var lastPlayerTouched = undefined;
var previousPlayerTouched;
var radiusBall = JMap.ballPhysics.radius; //Requires your map to have ballPhysics with a real radius value.
var radiusPlayer = JMap.playerPhysics.radius; //Requires your map to have playerPhysics with a real radius value.
var triggerDistance = radiusBall + radiusPlayer + 0.01;
var mvp;

var playerList = [];

room.setScoreLimit(0);
room.setTimeLimit(0);
room.setTeamsLock(true);

function getLastTouchTheBall() {
    var ballPosition = room.getBallPosition();
    var players = room.getPlayerList();
    for (var i = 0; i < players.length; i++) {
        if (players[i].position != null) {
            var distanceToBall = pointDistance(players[i].position, ballPosition);
            if (distanceToBall < triggerDistance) {
                if (lastPlayerTouched != players[i]) {
                    if (lastTeamTouched == players[i].team) {
                        assistingTouch = lastPlayerTouched;
                    }
                    else {
                        assistingTouch = undefined;
                    }
                }
                lastTeamTouched = players[i].team;
                previousPlayerTouched == lastPlayerTouched;
                lastPlayerTouched = players[i];
            }
        }
    }
    return lastPlayerTouched;
}

function pointDistance(p1, p2) {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

function SortRanks() {
    mvp = playerList[0];
    for(var i=0; i<playerList.length; i++){
        if(playerList[i].matchgoals > mvp.matchgoals){
            mvp = playerList[i];
        }
        else if(playerList[i].matchgoals == mvp.matchgoals){
            if(playerList[i].matchassists > mvp.matchassists){
                mvp = playerList[i];
            }
        }
    }

    return mvp;
}

function findMvp(player) {
    mvp = SortRanks();
    room.sendAnnouncement("Actual most valuable player:\nName: " + mvp.name + " - Goals: " + mvp.matchgoals + " - Assists: " + mvp.matchassists, player.id, 0xFFFFFF, "normal", 1);
}

room.onPlayerBallKick = function (player) {
    if (player != lastPlayerTouched) {
        if (lastTeamTouched == player.team) {
            assistingTouch = lastPlayerTouched;
        } else assistingTouch = undefined;
    }
    previousPlayerTouched = lastPlayerTouched;
    lastPlayerTouched = player;
    lastTeamTouched = player.team;
}

room.onPlayerJoin = function (player) {
    var playerObject;
    if (localStorage.getItem(player.auth) == null) { //On first join
        playerObject = { auth: player.auth, conn: player.conn, name: player.name, id: player.id, goals: 0, assists: 0, matchgoals: 0, matchassists: 0, isInTheRoom: true };
        localStorage.setItem(player.auth, JSON.stringify(playerObject));

        playerList[player.id - 1] = { auth: player.auth, conn: player.conn, name: player.name, id: player.id, goals: 0, assists: 0, matchgoals: 0, matchassists: 0, isInTheRoom: true };
    }
    else if (localStorage.getItem(player.auth) != null) { //On second are more joins
        playerList[player.id - 1] = { auth: player.auth, conn: player.conn, name: player.name, id: player.id, goals: JSON.parse(localStorage.getItem(player.auth)).goals, assists: JSON.parse(localStorage.getItem(player.auth)).assists, matchgoals: 0, matchassists: 0, isInTheRoom: true };
    }
}

room.onPlayerLeave = function (player) {
    playerList[player.id - 1].isInTheRoom = false;
    var playerObject = { auth: playerList[player.id - 1].auth, conn: playerList[player.id - 1].conn, name: player.name, id: player.id, goals: JSON.parse(localStorage.getItem(playerList[player.id - 1].auth)).goals, assists: JSON.parse(localStorage.getItem(playerList[player.id - 1].auth)).assists, matchgoals: 0, matchassists: 0, isInTheRoom: false };
    localStorage.setItem(playerList[player.id - 1].auth, JSON.stringify(playerObject));
}

room.onPlayerChat = function (player, message) {
    if (message == "!mvp") {
        findMvp(player);
        return false;
    }
};

room.onPositionsReset = function () {
    assistingTouch = undefined;
    lastPlayerTouched = undefined;
}

room.onGameStart = function (byPlayer) {
    assistingTouch = undefined;
    lastPlayerTouched = undefined;

    playerList.filter(p => playerList[p.id - 1].isInTheRoom == true).forEach(p => { playerList[p.id - 1].matchgoals = 0; playerList[p.id - 1].matchassists = 0; });
}

room.onGameStop = function (byPlayer) {
    assistingTouch = undefined;
    lastPlayerTouched = undefined;

    playerList.filter(p => playerList[p.id - 1].isInTheRoom == true).forEach(p => { playerList[p.id - 1].matchgoals = 0; playerList[p.id - 1].matchassists = 0; });
}

room.onTeamGoal = function (team) {
    var time = room.getScores().time;
    var players = room.getPlayerList();
    var floorm = m => m < 10 ? "0" + m : m;
    var floors = s => s < 10 ? "0" + s : s;
    var m = Math.trunc(time / 60);
    var s = Math.trunc(time % 60);
    time = floorm(m) + ":" + floors(s);

    for (var i = 0; i < players.length; i++) {
        if (lastPlayerTouched != undefined) {
            if (players[i].id == lastPlayerTouched.id) {
                if (players[i].team == team) {
                    if (assistingTouch != undefined) {
                        if (players[i].id != assistingTouch.id) {
                            room.sendAnnouncement("[G] ⚽️ Goal! - Scorer: " + players[i].name + ". Assist by: " + assistingTouch.name + " ⌛ " + time + " - Score is now... 🔴 " + room.getScores().red + " - " + room.getScores().blue + " 🔵", null,);
                            playerList[players[i].id - 1].matchgoals++;
                            for (var j = 0; j < players.length; j++) {
                                if (players[j].team == players[i].team && players[j].id == assistingTouch.id && players[j].id != players[i].id) {
                                    playerList[players[j].id - 1].matchassists++;
                                }
                            }
                            assistingTouch = undefined;
                            lastPlayerTouched = undefined;
                        }
                        else {
                            room.sendAnnouncement("[G] ⚽️ Goal! - Scorer: " + players[i].name + " ⌛ " + time + " - Score is now... 🔴 " + room.getScores().red + " - " + room.getScores().blue + " 🔵");
                            playerList[players[i].id - 1].matchgoals++;
                            assistingTouch = undefined;
                            lastPlayerTouched = undefined;
                        }
                    }
                    else {
                        room.sendAnnouncement("[G] ⚽️ Goal! - Scorer: " + players[i].name + " ⌛ " + time + " - Score is now... 🔴 " + room.getScores().red + " - " + room.getScores().blue + " 🔵");
                        playerList[players[i].id - 1].matchgoals++;
                        assistingTouch = undefined;
                        lastPlayerTouched = undefined;
                    }
                }
                else {
                    room.sendAnnouncement("[OG] ⚽️ Own goal! - Scorer: " + players[i].name + " ⌛ " + time + " - Score is now... 🔴 " + room.getScores().red + " - " + room.getScores().blue + " 🔵");
                }
            }
        }
    }
}

room.onGameTick = function () {
    getLastTouchTheBall();
}

room.onTeamVictory = function (scores) {
    mvp = SortRanks();
    room.sendAnnouncement("Actual most valuable player:\nName: " + mvp.name + " - Goals: " + mvp.matchgoals + " - Assists: " + mvp.matchassists, null, 0xFFFFFF, "normal", 1);
}

room.onStadiumChange = function (newStadiumName, byPlayer) {
    if (byPlayer != null) {
        room.setCustomStadium(Map);
    }
}
