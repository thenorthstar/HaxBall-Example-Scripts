var Map = `{"name":"Classic","width":420,"height":200,"spawnDistance":170,"bg":{"type":"grass","width":370,"height":170,"kickOffRadius":75,"cornerRadius":0},"vertexes":[{"x":-370,"y":170,"trait":"ballArea"},{"x":-370,"y":64,"trait":"ballArea"},{"x":-370,"y":-64,"trait":"ballArea"},{"x":-370,"y":-170,"trait":"ballArea"},{"x":370,"y":170,"trait":"ballArea"},{"x":370,"y":64,"trait":"ballArea"},{"x":370,"y":-64,"trait":"ballArea"},{"x":370,"y":-170,"trait":"ballArea"},{"x":0,"y":200,"trait":"kickOffBarrier"},{"x":0,"y":75,"trait":"kickOffBarrier"},{"x":0,"y":-75,"trait":"kickOffBarrier"},{"x":0,"y":-200,"trait":"kickOffBarrier"},{"x":-380,"y":-64,"trait":"goalNet"},{"x":-400,"y":-44,"trait":"goalNet"},{"x":-400,"y":44,"trait":"goalNet"},{"x":-380,"y":64,"trait":"goalNet"},{"x":380,"y":-64,"trait":"goalNet"},{"x":400,"y":-44,"trait":"goalNet"},{"x":400,"y":44,"trait":"goalNet"},{"x":380,"y":64,"trait":"goalNet"}],"segments":[{"v0":0,"v1":1,"trait":"ballArea"},{"v0":2,"v1":3,"trait":"ballArea"},{"v0":4,"v1":5,"trait":"ballArea"},{"v0":6,"v1":7,"trait":"ballArea"},{"v0":12,"v1":13,"curve":-90,"trait":"goalNet"},{"v0":13,"v1":14,"trait":"goalNet"},{"v0":14,"v1":15,"curve":-90,"trait":"goalNet"},{"v0":16,"v1":17,"curve":90,"trait":"goalNet"},{"v0":17,"v1":18,"trait":"goalNet"},{"v0":18,"v1":19,"curve":90,"trait":"goalNet"},{"v0":8,"v1":9,"trait":"kickOffBarrier"},{"v0":9,"v1":10,"curve":180,"cGroup":["blueKO"],"trait":"kickOffBarrier"},{"v0":9,"v1":10,"curve":-180,"cGroup":["redKO"],"trait":"kickOffBarrier"},{"v0":10,"v1":11,"trait":"kickOffBarrier"}],"goals":[{"p0":[-370,64],"p1":[-370,-64],"team":"red"},{"p0":[370,64],"p1":[370,-64],"team":"blue"}],"discs":[{"pos":[-370,64],"color":"FFCCCC","trait":"goalPost"},{"pos":[-370,-64],"color":"FFCCCC","trait":"goalPost"},{"pos":[370,64],"color":"CCCCFF","trait":"goalPost"},{"pos":[370,-64],"color":"CCCCFF","trait":"goalPost"},{"radius":100,"invMass":0,"pos":[2000,2000],"color":"transparent","bCoef":0,"trait":"circle","damping":0,"speed":[0,0]}],"planes":[{"normal":[0,1],"dist":-170,"trait":"ballArea","_data":{"extremes":{"normal":[0,1],"dist":-170,"canvas_rect":[-710,-213,2100,2100],"a":[-710,-170],"b":[2100,-170]}}},{"normal":[0,-1],"dist":-170,"trait":"ballArea","_data":{"extremes":{"normal":[0,-1],"dist":-170,"canvas_rect":[-710,-213,2100,2100],"a":[-710,170],"b":[2100,170]}}},{"normal":[0,1],"dist":-200,"bCoef":0.1,"_data":{"extremes":{"normal":[0,1],"dist":-200,"canvas_rect":[-710,-213,2100,2100],"a":[-710,-200],"b":[2100,-200]}}},{"normal":[0,-1],"dist":-200,"bCoef":0.1,"_data":{"extremes":{"normal":[0,-1],"dist":-200,"canvas_rect":[-710,-213,2100,2100],"a":[-710,200],"b":[2100,200]}}},{"normal":[1,0],"dist":-420,"bCoef":0.1,"_data":{"extremes":{"normal":[1,0],"dist":-420,"canvas_rect":[-710,-213,2100,2100],"a":[-420,-213],"b":[-420,2100]}}},{"normal":[-1,0],"dist":-420,"bCoef":0.1,"_data":{"extremes":{"normal":[-1,0],"dist":-420,"canvas_rect":[-710,-213,2100,2100],"a":[420,-213],"b":[420,2100]}}}],"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":8,"invMass":0,"bCoef":0.5},"goalNet":{"vis":true,"bCoef":0.1,"cMask":["ball"]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]},"circle":{"cMask":["c0"],"cGroup":["c0"]}},"joints":[],"redSpawnPoints":[],"blueSpawnPoints":[],"cameraWidth":1500,"cameraHeight":1500,"maxViewWidth":3000,"canBeStored":false,"cameraFollow":"player","kickOffReset":"full"}`;

var JMap = JSON.parse(Map);

var discID = JMap.discs.findIndex(x => x.trait == "circle"); //Set a trait with name "circle"
var ballGoalSetProps = {x:0,y:0,xspeed:0,yspeed:0,radius:100}; //You can set it anywhere on stadium
var ballGoalSetTimeout = 5000; //In milliseconds

var colors = [0xFFFFFF,0xFF0000,0x0000FF];
var teams = ["Spectators","Red","Blue"];
var emojis = ["⚪️","🔴","🔵"];

var colors = {goalScored: 0xFFFFFF};
var fonts = {goalScored: "normal"};
var sounds = {goalScored: 1};

var room = HBInit({roomName:"Goal - After Effects",noPlayer:true,public:true,maxPlayers:12});

room.onGameStart = function(byPlayer){
    ballGoalSetProps.x = 0;
    ballGoalSetProps.y = 0;
}

room.onGameStop = function(byPlayer){
    ballGoalSetProps.x = 0;
    ballGoalSetProps.y = 0;
}

room.onPlayerBallKick = function(player){
    var ballPosition = room.getBallPosition();
    console.log(`${player.name} has kicked the ball at location {x:${ballPosition.x},y:${ballPosition.y}}`);

    ballGoalSetProps.x = ballPosition.x;
    ballGoalSetProps.y = ballPosition.y;
}

room.onPositionsReset = function(){
    ballGoalSetProps.x = 0;
    ballGoalSetProps.y = 0;
}

room.onTeamGoal = function(team){
    room.sendAnnouncement(`[${emojis[team]}] Goal by ${teams[team]}`,null,colors.goalScored,fonts.goalScored,sounds.goalScored);
    room.setDiscProperties(1+discID,{x: ballGoalSetProps.x, y: ballGoalSetProps.y, xspeed: ballGoalSetProps.xspeed, yspeed: ballGoalSetProps.yspeed, radius: ballGoalSetProps.radius, color: colors[team]});

    setTimeout(function(){
	room.setDiscProperties(1+discID,{x: JMap.discs[discID].pos[0], y: JMap.discs[discID].pos[1], xspeed: JMap.discs[discID].speed[0], yspeed: JMap.discs[discID].speed[1], radius: JMap.discs[discID].radius, color: JMap.discs[discID].color});
    },ballGoalSetTimeout);
}
