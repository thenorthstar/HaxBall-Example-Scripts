var LineUp = ``; //Lineup map scripts here

var JLineUp = JSON.parse(LineUp);
var _LineUp = {ID: 1, Name: JLineUp.name};

var RS = ``; //Real soccer v6 map scripts here

var JRS = JSON.parse(RS);
var _RS = {ID: 2, Name: JRS.name};

var Maps = [LineUp,RS];
var _Maps = [_LineUp,_RS];

var _Map = {ID: 0};

var red_1_pos = {"x": -405, "y": 0, avatar: "1", avatarSet: false, position: "GK", playerid: 0, toSet: {x: -1200, y: 0}}; //Do not forget to change these x's and y's according to your map. They were gathered from my own lineup map.
var red_3_pos = {"x": -333, "y": -90, avatar: "3", avatarSet: false, position: "DF", playerid: 0, toSet: {x: -1000, y: 0}};
var red_6_pos = {"x": -261, "y": 90, avatar: "6", avatarSet: false, position: "DMF", playerid: 0, toSet: {x: -800, y: 0}};
var red_8_pos = {"x": -189, "y": -45, avatar: "8", avatarSet: false, position: "MF", playerid: 0, toSet: {x: -600, y: 0}};
var red_9_pos = {"x": -45, "y": 0, avatar: "9", avatarSet: false, position: "FW", playerid: 0, toSet: {x: -200, y: 0}};
var red_10_pos = {"x": -117, "y": 45, avatar: "10", avatarSet: false, position: "OMF", playerid: 0, toSet: {x: -400, y: 0}};

var blue_1_pos = {"x": 405, "y": 0, avatar: "1", avatarSet: false, position: "GK", playerid: 0, toSet: {x: 1200, y: 0}};
var blue_3_pos = {"x": 333, "y": -90, avatar: "3", avatarSet: false, position: "DF", playerid: 0, toSet: {x: 1000, y: 0}};
var blue_6_pos = {"x": 261, "y": 90, avatar: "6", avatarSet: false, position: "DMF", playerid: 0, toSet: {x: 800, y: 0}};
var blue_8_pos = {"x": 189, "y": -45, avatar: "8", avatarSet: false, position: "MF", playerid: 0, toSet: {x: 600, y: 0}};
var blue_9_pos = {"x": 45, "y": 0, avatar: "9", avatarSet: false, position: "FW", playerid: 0, toSet: {x: 200, y: 0}};
var blue_10_pos = {"x": 117, "y": 45, avatar: "10", avatarSet: false, position: "OMF", playerid: 0, toSet: {x: 400, y: 0}};

var redPositions = [red_1_pos, red_3_pos, red_6_pos, red_8_pos, red_9_pos, red_10_pos];
var bluePositions = [blue_1_pos, blue_3_pos, blue_6_pos, blue_8_pos, blue_9_pos, blue_10_pos];
var teamPositions = [redPositions,bluePositions];

var teams = ["spectators","red","blue"];

var playerList = {};

var colors = {mapChangeWrongName: 0xFFFF00, mapChangeDeny: 0xFF0000, playerLeft: 0xFFFF00, positionSet: 0xFFFFFF};
var fonts = {mapChangeWrongName: "normal", mapChangeDeny: "bold", playerLeft: "normal", positionSet: "normal"};
var sounds = {mapChangeWrongName: 1, mapChangeDeny: 2, playerLeft: 1, positionSet: 1};

var gameStartTimeout = 2000;

var room = HBInit({roomName:"AVATAR OVERRIDE TEST",noPlayer:true,public:false,maxPlayers:12});

function checkPlayerSits(){
    var players = room.getPlayerList().filter(p => room.getPlayerDiscProperties(p.id) != null);
    var fullRedPos = redPositions.filter(r => r.avatarSet == true && r.playerid != 0);
    var fullBluePos = bluePositions.filter(b => b.avatarSet == true && b.playerid != 0);

    if(_Map.ID == 1){
	players.forEach(p => {
	    var index = teamPositions[p.team-1].findIndex(t => pointDistance({x: t.x, y: t.y},room.getPlayerDiscProperties(p.id)) == 0 && t.avatarSet == false && t.playerid == 0);
	    if(index !== -1){
		teamPositions[p.team-1][index].avatarSet = true;
		teamPositions[p.team-1][index].playerid = p.id;
		room.setPlayerAvatar(p.id,teamPositions[p.team-1][index].avatar);
		playerList[p.name].avatar = teamPositions[p.team-1][index].avatar;
		playerList[p.name].toSet.x = teamPositions[p.team-1][index].toSet.x;
		playerList[p.name].toSet.y = teamPositions[p.team-1][index].toSet.y;
		room.sendAnnouncement(`Your position set as ${teamPositions[p.team-1][index].position} please wait for the others to sit.`,p.id,colors.positionSet,fonts.positionSet,sounds.positionSet);
	    }
	});
	if(fullRedPos != undefined && fullBluePos != undefined && fullRedPos.length == redPositions.length && fullBluePos.length == bluePositions.length){
	    room.stopGame();
	    var name = p.name;
	    var id = p.id;
	    setTimeout(function(){
		room.setCustomStadium(RS);
		room.startGame();
		room.setPlayerDiscProperties(id,{x: playerList[name].toSet.x, y: playerList[name].toSet.y});
	    },gameStartTimeout);
	}
    }
}

function pointDistance(p1,p2){
    return Math.hypot(p1.x-p2.x,p1.y-p2.y);
}

function resetPlayerAvatars(){
    room.getPlayerList().forEach(p => {
	room.setPlayerAvatar(p.id);
	playerList[p.name].avatar = 0;
    });
}

function resetPlayerSetPositions(){
    room.getPlayerList().forEach(p => {
	room.setPlayerAvatar(p.id);
	playerList[p.name].toSet.x = 0;
	playerList[p.name].toSet.y = 0;
    });
}

function resetPositions(){
    for(var t in teamPositions){
	teamPositions[t].forEach(p => {
	    p.avatarSet = false;
	    p.playerid = 0;
	    p.toSet.x = 0;
	    p.toSet.y = 0;
	});
    }
}

room.onGameStart = function(byPlayer){
    byPlayer == null ? console.log(`Game started`) : console.log(`Game started by ${byPlayer.name}`);

    if(_Map.ID == 1){
	resetPlayerAvatars();
	resetPlayerSetPositions();
	resetPositions();
    }
}

room.onGameStop = function(byPlayer){
    byPlayer == null ? console.log(`Game stopped`) : console.log(`Game stopped by ${byPlayer.name}`);
}

room.onGameTick = function(){
    checkPlayerSits();
}

room.onPlayerJoin = function(player){
    console.log(`${player.name} has joined`);

    if(playerList[player.name] == undefined)
	playerList[player.name] = {name: player.name, id: player.id, avatar: 0, toSet: {x:0,y:0}};
}

room.onPlayerLeave = function(player){
    console.log(`${player.name} has left`);

    room.sendAnnouncement(`${player.name} from ${teams[player.team]} with number ${playerList[player.name].avatar} has left the room`,null,colors.playerLeft,fonts.playerLeft,sounds.playerLeft);

    var index = teamPositions[player.team-1].findIndex(t => t.playerid == player.id);
    if(index !== -1){
	teamPositions[player.team-1][index].playerid = 0;
    }
}

room.onPositionsReset = function(){
    console.log("Positions reset");
}

room.onStadiumChange = function(newStadiumName,byPlayer){
    byPlayer == null ? console.log(`${newStadiumName} was loaded`) : console.log(`${newStadiumName} was loaded by ${byPlayer.name}`);

    var m = _Maps.find(x => x.Name == newStadiumName);
    var players = room.getPlayerList();
    var admins = room.getPlayerList().filter(p => p.admin == true);

    if(byPlayer == null){
	if(m){
	    _Map = {ID: m.ID, Name: m.Name};
	}
	else{
	    admins.length > 0 ? admins.forEach(p => room.sendAnnouncement(`Something went wrong with map ${newStadiumName}. Please try again!`,p.id,colors.mapChangeWrongName,fonts.mapChangeWrongName,sounds.mapChangeWrongName)) : room.sendAnnouncement(`Something went wrong with map ${newStadiumName}. Please call an admin to try again!`,null,colors.mapChangeWrongName,fonts.mapChangeWrongName,sounds.mapChangeWrongName);
	}
    }
    else{
	room.sendAnnouncement("You don't have authorization to change maps in this room!",byPlayer.id,colors.mapChangeDeny,fonts.mapChangeDeny,sounds.mapChangeDeny);
	room.setCustomStadium(Maps[0]);
    }
}
