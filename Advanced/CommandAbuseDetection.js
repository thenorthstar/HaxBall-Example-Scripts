var commands = [["!admin",1000],["!afk",5000]]; //Same structure goes for the other commands
var playerList = {};
var chatFunctions = [setAdmin,setAFK]; //A function must correspond a command
var afkLimit = 1;

var room = HBInit({roomName:"Command Abuse Detection",noPlayer:true,public:true,maxPlayers:12});

function checkForCommandAbuse(player,message){
    var index = playerList[player.name].commandUsages.findIndex(c => c[0] == message.toLowerCase());
    if(index !== -1){
	playerList[player.name].commandUsages[index].push(Date.now());
	if(playerList[player.name].commandUsages[index].length > 5){
	    playerList[player.name].commandUsages[index].splice(3,1);
	}
	if(playerList[player.name].commandUsages[index].length == 5){
	    if(parseInt(playerList[player.name].commandUsages[index][4]) - parseInt(playerList[player.name].commandUsages[index][3]) < parseInt(playerList[player.name].commandUsages[index][1])){
		if(playerList[player.name].commandUsages[index][2] == false){
		    playerList[player.name].commandUsages[index][2] = true;
		}
	    }
	    else{
		if(playerList[player.name].commandUsages[index][2] == true){
		    playerList[player.name].commandUsages[index][2] = false;
		}
	    }
	}
    }
    else{
	return false;
    }
}

function checkLobbyAFK(){
    var players = room.getPlayerList().filter(p => playerList[p.name].afkStatus == true);
    players.forEach(p => {
	var length = playerList[p.name].afkMatches.length;

	if(playerList[p.name].commandUsages[1][2] == false){
	    if(playerList[p.name].afkMatches[length-1] < afkLimit){
		playerList[p.name].afkMatches[length-1]++;
	    }
	    else{
		room.kickPlayer(p.id,"Lobby AFK timeout.",false);
	    }
	}
	else{
	    var lastAbusive = playerList[p.name].afkMatches.findLastIndex(x => x != 0);

	    if(lastAbusive === -1){
		if(playerList[p.name].afkMatches[length-1] < afkLimit){
		    playerList[p.name].afkMatches[length-1]++;
		}
		else{
		    room.kickPlayer(p.id,"Lobby AFK timeout.",false);
		}
	    }
	    else{
		if(playerList[p.name].afkMatches[lastAbusive] < afkLimit){
		    playerList[p.name].afkMatches[lastAbusive]++;
		}
		else{
		    room.kickPlayer(p.id,"Lobby AFK timeout.",false);
		}
	    }
	}
    });
}

function setAdmin(player,message){
    room.setPlayerAdmin(player.id,!player.admin);
    checkForCommandAbuse(player,message);
    return false;
}

function setAFK(player,message){
    playerList[player.name].afkStatus = !playerList[player.name].afkStatus;
    checkForCommandAbuse(player,message);
    var length = playerList[player.name].afkMatches.length;

    var index = playerList[player.name].commandUsages.findIndex(cu => cu[0] == message);
    if(playerList[player.name].afkMatches[length-1] != 0){
	if(playerList[player.name].commandUsages[index][2] == false){
	    playerList[player.name].afkMatches.push(0);
	}
	else{
	    var lastAbusive = playerList[player.name].afkMatches.findLastIndex(p => p != 0);
	    if(lastAbusive === -1){
		console.log("No abusive behaviors found.");
	    }
	    else{
		playerList[player.name].afkMatches[length-1] = playerList[player.name].afkMatches[lastAbusive];
	    }
	}
    }

    if(playerList[player.name].afkStatus == true){
	room.setPlayerTeam(player.id,0);
	room.sendAnnouncement(`You're now AFK. (At most ${afkLimit+1} matches)`,player.id,0x00FF00,"normal",1);
	return false;
    }
    else{
	room.sendAnnouncement(`You're now with us!`,player.id,0x00FF00,"normal",1);
	var index = playerList[player.name].commandUsages.findIndex(cu => cu[0] == message);
	return false;
    }
}

room.onPlayerChat = function(player,message){
    console.log(`${player.name}: ${message}`);

    for(var i=0; i<commands.length; i++){
	if(message.toLowerCase() == commands[i][0]){
	    var index = commands.findIndex(c => c[0] == message.toLowerCase());
	    if(index !== -1){
		chatFunctions[index](player,message);
		return false;
	    }
	    else{
		room.sendAnnouncement("There's no such a command",player.id,0xFF0000,"bold",2);
		return false;
	    }
	}
    }
}

room.onPlayerJoin = function(player){
    console.log(`${player.name} has joined`);

    if(playerList[player.name] == undefined){
	playerList[player.name] = {name: player.name, auth: player.auth, conn: player.conn, afkMatches: [0], afkStatus: false, commandUsages: []};
    }
    else if(playerList[player.name] == undefined){
	playerList[player.name].afkMatches.push(0);
	playerList[player.name].afkStatus = false;
    }

    for(var i=0; i<commands.length; i++){
	var index = playerList[player.name].commandUsages.findIndex(cu => cu[0] == commands[i][0]);
	if(index === -1){
	    playerList[player.name].commandUsages.push([commands[i][0],commands[i][1],false,Date.now(),Date.now()]); //[Command,Interval,Is abusive?,Previous usage,Last usage]
	}
	else{
	    continue;
	}
    }
}

room.onPlayerTeamChange = function(changedPlayer,byPlayer){
    if(changedPlayer.team != 0 && playerList[changedPlayer.name].afkStatus == true){
	room.setPlayerTeam(changedPlayer.id,0);
    }
}

room.onTeamVictory = function(scores){
    checkLobbyAFK();
}
