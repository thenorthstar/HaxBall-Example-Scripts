var Map = `{"name":"Big","width":600,"height":270,"spawnDistance":100,"bg":{"type":"grass","width":550,"height":240,"kickOffRadius":80,"cornerRadius":0},"vertexes":[{"x":-550,"y":240,"trait":"ballArea"},{"x":-550,"y":80,"trait":"ballArea"},{"x":-550,"y":-80,"trait":"ballArea"},{"x":-550,"y":-240,"trait":"ballArea"},{"x":550,"y":240,"trait":"ballArea"},{"x":550,"y":80,"trait":"ballArea"},{"x":550,"y":-80,"trait":"ballArea"},{"x":550,"y":-240,"trait":"ballArea"},{"x":0,"y":270,"trait":"kickOffBarrier"},{"x":0,"y":80,"trait":"kickOffBarrier"},{"x":0,"y":-80,"trait":"kickOffBarrier"},{"x":0,"y":-270,"trait":"kickOffBarrier"},{"x":-560,"y":-80,"trait":"goalNet"},{"x":-580,"y":-60,"trait":"goalNet"},{"x":-580,"y":60,"trait":"goalNet"},{"x":-560,"y":80,"trait":"goalNet"},{"x":560,"y":-80,"trait":"goalNet"},{"x":580,"y":-60,"trait":"goalNet"},{"x":580,"y":60,"trait":"goalNet"},{"x":560,"y":80,"trait":"goalNet"},{"x":-300,"y":-270,"cMask":["c0"],"trait":"threeDefLine"},{"x":300,"y":-270,"cMask":["c1"],"trait":"threeDefLine"},{"x":-300,"y":270,"cMask":["c0"],"trait":"threeDefLine"},{"x":300,"y":270,"cMask":["c1"],"trait":"threeDefLine"}],"segments":[{"v0":0,"v1":1,"trait":"ballArea"},{"v0":2,"v1":3,"trait":"ballArea"},{"v0":4,"v1":5,"trait":"ballArea"},{"v0":6,"v1":7,"trait":"ballArea"},{"v0":12,"v1":13,"curve":-90,"trait":"goalNet"},{"v0":13,"v1":14,"trait":"goalNet"},{"v0":14,"v1":15,"curve":-90,"trait":"goalNet"},{"v0":16,"v1":17,"curve":90,"trait":"goalNet"},{"v0":17,"v1":18,"trait":"goalNet"},{"v0":18,"v1":19,"curve":90,"trait":"goalNet"},{"v0":8,"v1":9,"trait":"kickOffBarrier"},{"v0":9,"v1":10,"curve":180,"cGroup":["blueKO"],"trait":"kickOffBarrier"},{"v0":9,"v1":10,"curve":-180,"cGroup":["redKO"],"trait":"kickOffBarrier"},{"v0":10,"v1":11,"trait":"kickOffBarrier"},{"v0":22,"v1":20,"cMask":["c0"],"trait":"threeDefLine"},{"v0":21,"v1":23,"cMask":["c1"],"trait":"threeDefLine"}],"goals":[{"p0":[-550,80],"p1":[-550,-80],"team":"red"},{"p0":[550,80],"p1":[550,-80],"team":"blue"}],"discs":[{"pos":[-550,80],"color":"FFCCCC","trait":"goalPost"},{"pos":[-550,-80],"color":"FFCCCC","trait":"goalPost"},{"pos":[550,80],"color":"CCCCFF","trait":"goalPost"},{"pos":[550,-80],"color":"CCCCFF","trait":"goalPost"},{"pos":[-300,-240],"trait":"threeDefLineBall_RedFirst"},{"pos":[-300,240],"trait":"threeDefLineBall_RedFirst"},{"pos":[-1300,-240],"trait":"threeDefLineBall_RedSecond"},{"pos":[-1300,240],"trait":"threeDefLineBall_RedSecond"},{"pos":[300,-240],"trait":"threeDefLineBall_BlueFirst"},{"pos":[300,240],"trait":"threeDefLineBall_BlueFirst"},{"pos":[1300,-240],"trait":"threeDefLineBall_BlueSecond"},{"pos":[1300,240],"trait":"threeDefLineBall_BlueSecond"}],"planes":[{"normal":[0,1],"dist":-240,"trait":"ballArea","_data":{"extremes":{"normal":[0,1],"dist":-240,"canvas_rect":[-1300,-270,1300,270],"a":[-1300,-240],"b":[1300,-240]}}},{"normal":[0,-1],"dist":-240,"trait":"ballArea","_data":{"extremes":{"normal":[0,-1],"dist":-240,"canvas_rect":[-1300,-270,1300,270],"a":[-1300,240],"b":[1300,240]}}},{"normal":[0,1],"dist":-270,"bCoef":0.1,"_data":{"extremes":{"normal":[0,1],"dist":-270,"canvas_rect":[-1300,-270,1300,270],"a":[-1300,-270],"b":[1300,-270]}}},{"normal":[0,-1],"dist":-270,"bCoef":0.1,"_data":{"extremes":{"normal":[0,-1],"dist":-270,"canvas_rect":[-1300,-270,1300,270],"a":[-1300,270],"b":[1300,270]}}},{"normal":[1,0],"dist":-600,"bCoef":0.1,"_data":{"extremes":{"normal":[1,0],"dist":-600,"canvas_rect":[-1300,-270,1300,270],"a":[-600,-270],"b":[-600,270]}}},{"normal":[-1,0],"dist":-600,"bCoef":0.1,"_data":{"extremes":{"normal":[-1,0],"dist":-600,"canvas_rect":[-1300,-270,1300,270],"a":[600,-270],"b":[600,270]}}}],"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":8,"invMass":0,"bCoef":0.5},"goalNet":{"vis":true,"bCoef":0.1,"cMask":["ball"]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]},"threeDefLine":{"bCoef":0,"cGroup":["wall"],"bias":-300,"vis":false},"threeDefLineBall_RedFirst":{"radius":0,"invMass":0,"damping":0,"cMask":["none"],"cGroup":["none"]},"threeDefLineBall_RedSecond":{"radius":0,"invMass":0,"damping":0,"cMask":["none"],"cGroup":["none"]},"threeDefLineBall_BlueFirst":{"radius":0,"invMass":0,"damping":0,"cMask":["none"],"cGroup":["none"]},"threeDefLineBall_BlueSecond":{"radius":0,"invMass":0,"damping":0,"cMask":["none"],"cGroup":["none"]}},"redSpawnPoints":[[-100,-50],[-100,50],[-100,0]],"blueSpawnPoints":[[100,-50],[100,50],[100,0]],"canBeStored":false,"joints":[{"d0":5,"d1":6,"color":"C7E6BD"},{"d0":7,"d1":8,"color":"FF0000"},{"d0":9,"d1":10,"color":"C7E6BD"},{"d0":11,"d1":12,"color":"0000FF"}],"kickOffReset":"full","cameraWidth":1200,"cameraHeight":540,"maxViewWidth":2000}`

var room = HBInit({roomName:"3v3 Big with Def Lines",noPlayer:true,public:true,maxPlayers:8});

var defLines = [];
var cf = room.CollisionFlags;

var JMap = JSON.parse(Map);

var def_zone_player_count_bound = 2;

var number_indicators_red_first = [];
var number_indicators_red_second = [];
var number_indicators_blue_first = [];
var number_indicators_blue_second = [];

var isRoomSet = false;

room.setScoreLimit(3);
room.setTimeLimit(3);
room.setTeamsLock(true);
room.setCustomStadium(Map);

function fillIndicators(){
    for(var d=0; d<JMap.discs.length; d++){
	if(JMap.discs[d].trait == "threeDefLineBall_RedFirst"){
	    number_indicators_red_first.push(d + 1);
	}
	else if(JMap.discs[d].trait == "threeDefLineBall_RedSecond"){
	    number_indicators_red_second.push(d + 1);
	}
	else if(JMap.discs[d].trait == "threeDefLineBall_BlueFirst"){
	    number_indicators_blue_first.push(d + 1);
	}
	else if(JMap.discs[d].trait == "threeDefLineBall_BlueSecond"){
	    number_indicators_blue_second.push(d + 1);
	}
    }
}

function GetTeam(id){
    return room.getPlayerList().filter((player) => player.id != 0 && player.team == id);
}

function updateAdmins(){
  var players = room.getPlayerList().filter(player => player.id != 0);
  if(players.length == 0) return;
  if(players.find(player => player.admin) != null) return;
  room.setPlayerAdmin(players[0].id,true);
}

function adjustDefLines(player){
    var players = room.getPlayerList();
    var mfp_red = mostForwardPlayer(1);
    var mfp_blue = mostForwardPlayer(2);
    var non_mfp_red = GetTeam(1).filter(p => p.id !== mfp_red.id);
    var non_mfp_blue = GetTeam(2).filter(p => p.id !== mfp_blue.id);

    if(room.getPlayerDiscProperties(mfp_red.id).cGroup === cf.red){
	room.setPlayerDiscProperties(mfp_red.id,{cGroup:cf.red | cf.c0});
    }
    if(room.getPlayerDiscProperties(mfp_blue.id).cGroup === cf.blue){
	room.setPlayerDiscProperties(mfp_blue.id,{cGroup:cf.blue | cf.c1});
    }

    for(r in non_mfp_red){
	if(room.getPlayerDiscProperties(non_mfp_red[r].id).cGroup !== cf.red){
	    room.setPlayerDiscProperties(non_mfp_red[r].id,{cGroup:cf.red});
	}
    }
    for(b in non_mfp_blue){
	if(room.getPlayerDiscProperties(non_mfp_blue[b].id).cGroup !== cf.blue){
	    room.setPlayerDiscProperties(non_mfp_blue[b].id,{cGroup:cf.blue});
	}
    }
}

function findDefLines(){
    defLines = JMap.segments.filter(s => s.trait == "threeDefLine");
}

function redDefPlayerCount(){
    return room.getPlayerList().filter(p => room.getPlayerDiscProperties(p.id) != null && p.team == 1 && room.getPlayerDiscProperties(p.id).x <= JMap.vertexes[defLines[0].v0].x).length;
}

function blueDefPlayerCount(){
    return room.getPlayerList().filter(p => room.getPlayerDiscProperties(p.id) != null && p.team == 2 && room.getPlayerDiscProperties(p.id).x >= JMap.vertexes[defLines[1].v0].x).length;
}

function moveDefLines(){
    if(redDefPlayerCount() >= def_zone_player_count_bound){
	for(var n in number_indicators_red_first){
	    if(room.getDiscProperties(number_indicators_red_first[n]).x > -JMap.width){
		room.setDiscProperties(number_indicators_red_first[n],{x:room.getDiscProperties(number_indicators_red_first[n]).x - 1000});
	    }
	}
	for(var n in number_indicators_red_second){
	    if(room.getDiscProperties(number_indicators_red_second[n]).x < -JMap.width){
		room.setDiscProperties(number_indicators_red_second[n],{x:room.getDiscProperties(number_indicators_red_second[n]).x + 1000});
	    }
	}
    }

    if(redDefPlayerCount() < def_zone_player_count_bound){
	for(var n in number_indicators_red_first){
	    if(room.getDiscProperties(number_indicators_red_first[n]).x < -JMap.width){
		room.setDiscProperties(number_indicators_red_first[n],{x:room.getDiscProperties(number_indicators_red_first[n]).x + 1000});
	    }
	}
	for(var n in number_indicators_red_second){
	    if(room.getDiscProperties(number_indicators_red_second[n]).x > -JMap.width){
		room.setDiscProperties(number_indicators_red_second[n],{x:room.getDiscProperties(number_indicators_red_second[n]).x - 1000});
	    }
	}
    }

    if(blueDefPlayerCount() >= def_zone_player_count_bound){
	for(var n in number_indicators_blue_first){
	    if(room.getDiscProperties(number_indicators_blue_first[n]).x < JMap.width){
		room.setDiscProperties(number_indicators_blue_first[n],{x:room.getDiscProperties(number_indicators_blue_first[n]).x + 1000});
	    }
	}
	for(var n in number_indicators_blue_second){
	    if(room.getDiscProperties(number_indicators_blue_second[n]).x > JMap.width){
		room.setDiscProperties(number_indicators_blue_second[n],{x:room.getDiscProperties(number_indicators_blue_second[n]).x - 1000});
	    }
	}
    }

    if(blueDefPlayerCount() < def_zone_player_count_bound){
	for(var n in number_indicators_blue_first){
	    if(room.getDiscProperties(number_indicators_blue_first[n]).x > JMap.width){
		room.setDiscProperties(number_indicators_blue_first[n],{x:room.getDiscProperties(number_indicators_blue_first[n]).x - 1000});
	    }
	}
	for(var n in number_indicators_blue_second){
	    if(room.getDiscProperties(number_indicators_blue_second[n]).x < JMap.width){
		room.setDiscProperties(number_indicators_blue_second[n],{x:room.getDiscProperties(number_indicators_blue_second[n]).x + 1000});
	    }
	}
    }
}

function sortByPosition(players) {
    return players.sort(function(p1,p2) {
        return p1.position.x - p2.position.x;
    });
}

function mostForwardPlayer(teamID){
    var players = room.getPlayerList();
    var playersTeam = players.filter(p => p.team === teamID);
    var redTeam = GetTeam(1);
    var blueTeam = GetTeam(2);
    var redTeamLength = GetTeam(1).length;
    var blueTeamLength = GetTeam(2).length;
    teamSorted = sortByPosition(playersTeam);
    if(teamID === 1){
	return teamSorted[redTeamLength-1];
    }
    else if(teamID === 2){
	return teamSorted[0];
    }
}

room.onPlayerJoin = function(player){
    console.log(player.name + " has joined. - Auth: " + player.auth + " Conn: " + player.conn);
    updateAdmins();
    room.sendAnnouncement("Hoş geldiniz",player.id,0x00FFFF,"bold",2);
}

room.onPlayerLeave = function(player){
    console.log(player.name + " has left.");
    updateAdmins();
}

room.onPlayerChat = function(player,message){
    console.log(player.name + ": " + message);
    if(player.admin==true){
	room.sendAnnouncement(player.name + ": " + message,null,0x00FFFF,"bold",1);
	return false;
    }
    else{
	room.sendAnnouncement(player.name + ": " + message,null,0xFFFF00,"normal",1);
	return false;
    }
};

room.onGameStart = function(byPlayer){
    findDefLines();
}

room.onGameStop = function(byPlayer){
    defLines = [];
}

room.onGameTick = function(){
    if(GetTeam(1).length > 0 && GetTeam(2).length > 0){
	mostForwardPlayer();
	adjustDefLines();
	moveDefLines();
	redDefPlayerCount();
	blueDefPlayerCount();
    }
}

room.onRoomLink = function(url){
    if(isRoomSet == false){
	fillIndicators();
	isRoomSet = true;
    }
}
