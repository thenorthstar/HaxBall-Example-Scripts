var Map1 = `{"name":"New Stadium 1","width":420,"height":200,"cameraWidth":0,"cameraHeight":0,"maxViewWidth":0,"cameraFollow":"ball","spawnDistance":170,"redSpawnPoints":[],"blueSpawnPoints":[],"canBeStored":false,"kickOffReset":"partial","bg":{"color":"718C5A"},"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":8,"invMass":0,"bCoef":0.5},"goalNet":{"vis":true,"bCoef":0.1,"cMask":["ball"]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]}},"vertexes":[],"segments":[],"goals":[],"discs":[],"planes":[],"joints":[],"playerPhysics":{"radius":15,"bCoef":0.5,"invMass":0.5,"damping":0.96,"cGroup":["red","blue"],"acceleration":0.1,"gravity":[0,0],"kickingAcceleration":0.07,"kickingDamping":0.96,"kickStrength":5,"kickback":0},"ballPhysics":{"radius":10,"bCoef":0.5,"cMask":["all"],"damping":0.99,"invMass":1,"gravity":[0,0],"color":"ffffff","cGroup":["ball"]}}`
var Map2 = `{"name":"New Stadium 2","width":420,"height":200,"cameraWidth":0,"cameraHeight":0,"maxViewWidth":0,"cameraFollow":"ball","spawnDistance":170,"redSpawnPoints":[],"blueSpawnPoints":[],"canBeStored":false,"kickOffReset":"partial","bg":{"color":"718C5A"},"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":8,"invMass":0,"bCoef":0.5},"goalNet":{"vis":true,"bCoef":0.1,"cMask":["ball"]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]}},"vertexes":[],"segments":[],"goals":[],"discs":[],"planes":[],"joints":[],"playerPhysics":{"radius":15,"bCoef":0.5,"invMass":0.5,"damping":0.96,"cGroup":["red","blue"],"acceleration":0.1,"gravity":[0,0],"kickingAcceleration":0.07,"kickingDamping":0.96,"kickStrength":5,"kickback":0},"ballPhysics":{"radius":10,"bCoef":0.5,"cMask":["all"],"damping":0.99,"invMass":1,"gravity":[0,0],"color":"ffffff","cGroup":["ball"]}}`
var Map3 = `{"name":"New Stadium 3","width":420,"height":200,"cameraWidth":0,"cameraHeight":0,"maxViewWidth":0,"cameraFollow":"ball","spawnDistance":170,"redSpawnPoints":[],"blueSpawnPoints":[],"canBeStored":false,"kickOffReset":"partial","bg":{"color":"718C5A"},"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":8,"invMass":0,"bCoef":0.5},"goalNet":{"vis":true,"bCoef":0.1,"cMask":["ball"]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]}},"vertexes":[],"segments":[],"goals":[],"discs":[],"planes":[],"joints":[],"playerPhysics":{"radius":15,"bCoef":0.5,"invMass":0.5,"damping":0.96,"cGroup":["red","blue"],"acceleration":0.1,"gravity":[0,0],"kickingAcceleration":0.07,"kickingDamping":0.96,"kickStrength":5,"kickback":0},"ballPhysics":{"radius":10,"bCoef":0.5,"cMask":["all"],"damping":0.99,"invMass":1,"gravity":[0,0],"color":"ffffff","cGroup":["ball"]}}`

var MapVote = `{"name":"Map Vote","width":420,"height":200,"cameraWidth":0,"cameraHeight":0,"maxViewWidth":0,"cameraFollow":"ball","spawnDistance":170,"redSpawnPoints":[],"blueSpawnPoints":[],"canBeStored":false,"kickOffReset":"partial","bg":{"color":"718C5A"},"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":8,"invMass":0,"bCoef":0.5},"goalNet":{"vis":true,"bCoef":0.1,"cMask":["ball"]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]}},"vertexes":[],"segments":[],"goals":[],"discs":[],"planes":[],"joints":[],"playerPhysics":{"radius":15,"bCoef":0.5,"invMass":0.5,"damping":0.96,"cGroup":["red","blue"],"acceleration":0.1,"gravity":[0,0],"kickingAcceleration":0.07,"kickingDamping":0.96,"kickStrength":5,"kickback":0},"ballPhysics":{"radius":10,"bCoef":0.5,"cMask":["all"],"damping":0.99,"invMass":1,"gravity":[0,0],"color":"ffffff","cGroup":["ball"]}}`

var JMap1 = JSON.parse(Map1);
var JMap2 = JSON.parse(Map2);
var JMap3 = JSON.parse(Map3);

var _Map1 = {MapObject: Map1, Name: JMap1.Name, ScoreLimit: 1, TimeLimit: 1, Votes: 0};
var _Map2 = {MapObject: Map2, Name: JMap2.Name, ScoreLimit: 2, TimeLimit: 2, Votes: 0};
var _Map3 = {MapObject: Map3, Name: JMap3.Name, ScoreLimit: 3, TimeLimit: 3, Votes: 0};

var Maps = [_Map1,_Map2,_Map3];

var VoteCommand = "!vote";
var VotedPlayers = [];
var Votes = [];
var VoteSession = false;

var GetVotesAndAnnounceResults_Timeout_1;
var GetVotesAndAnnounceResults_Timeout_2;

var MapStartWaitTimeout = 3000; //In milliseconds
var VoteTimeout = 15000; //In milliseconds

var room = HBInit({roomName:"TEST",noPlayer:true,public:true,maxPlayers:30});

function getVotesAndAnnounceResults(){
    if(VoteSession == false){
	VoteSession = true;
    }

    room.sendAnnouncement(`Map voting session has begun! You have ${VoteTimeout/1000} seconds to vote a map.`,null,0x00FFFF,"bold",2);
    GetVotesAndAnnounceResults_Timeout_1 = setTimeout(function(){
	room.sendAnnouncement(`Map voting session has ended! Here's the results:`,null,0x00FFFF,"bold",2);
	for(var Map in Maps){
	    room.sendAnnouncement(`${Map.Name}: ${Map.Votes}`,null,0xFFFFFF,"normal",1);
	    Votes.push(Map.Votes);
	}
	if(VoteSession == true){
	    VoteSession = false;
	}
    },VoteTimeout);

    var sorted = Votes.sort(function(v1,v2){
	return v1-v2;
    });

    var MaxVotedMaps = Maps.filter(m => m.Votes == sorted[0]);

    GetVotesAndAnnounceResults_Timeout_2 = setTimeout(function(){
	if(MaxVotedMaps.length == 0){
	    console.log("Something went wrong.");
	    var admins = room.getPlayerList().filter(p => p.admin == true);
	    var nonadmins = room.getPlayerList().filter(p => p.admin == false);
	    admins.forEach(a => {
		room.sendAnnouncement("Oops! Something went wrong! Please open a map manually.",0xFFFF00,a.id,"bold",2)
	    });
	    nonadmins.forEach(n => {
		room.sendAnnouncement("Map will be loaded manually by an human administrator. Please wait...",0xFFFF00,n.id,"bold",2)
	    });

	    //var randomInt = Math.floor(Maps.length * Math.random());
	    //loadMap(Maps[randomInt].MapObject,MaxVotedMaps[randomInt].ScoreLimit,MaxVotedMaps[randomInt].TimeLimit);
	    //room.sendAnnouncement(`${MaxVotedMaps[randomInt].Name} was loaded randomly as the result of the voting session. Good games!`,null,0x00FF00,"bold",2);
	}
	else if(MaxVotedMaps.length == 1){
	    loadMap(MaxVotedMaps[0].MapObject,MaxVotedMaps[0].ScoreLimit,MaxVotedMaps[0].TimeLimit);
	    room.sendAnnouncement(`${MaxVotedMaps[0].Name} was loaded as the result of the voting session. Good games!`,null,0x00FF00,"bold",2);
	}
	else{
	    var randomInt = Math.floor(MaxVotedMaps.length * Math.random());
	    loadMap(MaxVotedMaps[randomInt].MapObject,MaxVotedMaps[randomInt].ScoreLimit,MaxVotedMaps[randomInt].TimeLimit);
	    room.sendAnnouncement(`${MaxVotedMaps[randomInt].Name} was loaded randomly between the max voted maps as the result of the voting session. Good games!`,null,0x00FF00,"bold",2);
	}
    },MapStartWaitTimeout);

    resetVotes();
}

function loadMap(Map,ScoreLimit,TimeLimit){
    room.setCustomStadium(Map);
    room.setScoreLimit(ScoreLimit);
    room.setTimeLimit(TimeLimit);
    room.startGame();
}

function resetVotes(){
    if(VotedPlayers.length != 0){
	VotedPlayers = [];
    }
    if(Votes.length != 0){
	Votes = [];
    }
    for(var Map in Maps){
	if(Map.Votes != 0){
	    Map.Votes = 0;
	}
    }
}

function voteMap(player,message){ //Command example: !vote 1
    var mapToVote = parseInt(message.split(" ")[1]);

    if(VotedPlayers.length == 0){
	VotedPlayers.push(player.name);
	Maps[mapToVote-1].Votes++;
	room.sendAnnouncement(`${player.name} has voted for ${Maps[mapToVote-1].Name}`,null,0x00FF00,"bold",2);
    }
    else{
	if(VotedPlayers.includes(player.name) == true){
	    room.sendAnnouncement("You have already voted for a map! Please wait for the voting session to end.",player.id,0xFF0000,"bold",2);
	}
	else{
	    VotedPlayers.push(player.name);
	    Maps[mapToVote-1].Votes++;
	    room.sendAnnouncement(`${player.name} has voted for ${Maps[mapToVote-1].Name}`,null,0x00FF00,"bold",2);
	}
    }
}

room.onGameStop = function(byPlayer){
    clearTimeout(GetVotesAndAnnounceResults_Timeout_1);
    clearTimeout(GetVotesAndAnnounceResults_Timeout_2);
    loadMap(MapVote,0,0);
}

room.onPlayerChat = function(player,message){
    var admins = room.getPlayerList().filter(p => p.admin == true);

    if(VoteSession == true){
	if(message.split(" ")[0] == VoteCommand){
	    voteMap(player,message);
	}
	else{
	    room.sendAnnouncement("Please wait for the voting session to end.",player.id,0xFFFF00,"bold",2);
	    admins.forEach(a => {
		room.sendAnnouncement(`${player.name}: ${message}`,0xFFFF00,a.id,"bold",1)
	    });
	}
	return false;
    }
}

room.onStadiumChange = function(newStadiumName,byPlayer){
    if(newStadiumName == "Map Vote"){
	getVotesAndAnnounceResults();
    }
}
