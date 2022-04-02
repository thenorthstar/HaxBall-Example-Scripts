var freeze = []; //Holds the name of the frozen players.
var playerInformations = []; //Holds players names, ID's and positions (undefined if not frozen).

var room = HBInit({ roomName: "Player Freeze", noPlayer: true, public: false, maxPlayers: 2});

function createPlayer(player){ //Create player informations, it will be used in the room.onPlayerJoin() event.
    playerInformations[playerInformations.length] = {
	name:player.name,
	id:player.id,
	freezePoint:{
	    x:undefined,
	    y:undefined
	}
    }
}

function deletePlayer(id){ //Delete player informations, it will be used in the room.onPlayerLeave() event.
    for(var i=0; i<playerInformations.length; i++){
	if(playerInformations[i].id == id){
	    playerInformations.splice(i,1);
	}
    }
}

function getPlayerByID(id){ //Gets players by their ID's, it will be used by controlling players one by one.
    for(var i=0; i<playerInformations.length; i++){
	if(playerInformations[i].id == id){
	    return playerInformations[i];
	}
    }
}

function pointDistance(p1,p2){ //Detects the distance between any two points.
    var d1 = p1.x - p2.x;
    var d2 = p1.y - p2.y;
    return Math.sqrt(d1 * d1 + d2 * d2);
}

function handleFrozenPlayerMoves(){ //Detects moves of frozen players. If a frozen player tries to move from their freeze point, then they will be moved to that point.
    var players = room.getPlayerList();
    for(var i=0; i<players.length; i++){
	if(freeze.includes(players[i].name) == true && pointDistance(room.getPlayerDiscProperties(players[i].id),getPlayerByID(players[i].id).freezePoint) > 0){
	    room.setPlayerDiscProperties(players[i].id,{x:getPlayerByID(players[i].id).freezePoint.x,y:getPlayerByID(players[i].id).freezePoint.y,xspeed:0,yspeed:0});
	}
    }
}

room.onPlayerJoin = function (player){ //Creates player informations as they join the room.
    console.log(player.name + " has joined.");
    createPlayer(player);
}

room.onPlayerLeave = function (player){ //Deletes player informations as they leave the room.
    console.log(player.name + " has left.");
    deletePlayer(player);
}

room.onPlayerKicked = function(kickedPlayer,reason,ban,byPlayer){ //Here is triggered if a player is kicked or banned.
    if(byPlayer==null){
	if(ban==0){
	    console.log(kickedPlayer.name + " was kicked (" + reason + ")");
	}
	else if(ban==1){
	    console.log(kickedPlayer.name + " was banned (" + reason + ")");
	}
    }
    else if(byPlayer!=null){
	if(ban==0){
	    console.log(kickedPlayer.name + " was kicked by " + byPlayer.name + " (" + reason + ")");
	}
	else if(ban==1){
	    console.log(kickedPlayer.name + " was banned by " + byPlayer.name + " (" + reason + ")");
	}
    }
};

room.onPlayerTeamChange = function(changedPlayer,byPlayer){ //If the team of a player is changed, then it's also should be checked. For example, if a player is moved to spectators, then they have to be deleted from frozen players. Or if a player is moved to any of the teams, then their freeze point has to be negatiated.
    if(byPlayer==null){
	if(changedPlayer.team==0){
	    console.log(changedPlayer.name + " was moved to Spectators");
	    if(freeze.includes(changedPlayer.name) == true){
		freeze.splice(freeze.indexOf(changedPlayer.name),1);
		getPlayerByID(changedPlayer.id).freezePoint = {x:undefined,y:undefined};
	    }
	}
	else if(changedPlayer.team==1){
	    console.log(changedPlayer.name + " was moved to Red");
	    if(freeze.includes(changedPlayer.name) == true){
		getPlayerByID(changedPlayer.id).freezePoint.x = -getPlayerByID(changedPlayer.id).freezePoint.x;
	    }
	}
	else if(changedPlayer.team==2){
	    console.log(changedPlayer.name + " was moved to Blue");
	    if(freeze.includes(changedPlayer.name) == true){
		getPlayerByID(changedPlayer.id).freezePoint.x = -getPlayerByID(changedPlayer.id).freezePoint.x;
	    }
	}
    }
    else if(byPlayer!=null){
	if(changedPlayer.team==0){
	    console.log(changedPlayer.name + " was moved to Spectators by " + byPlayer.name + " [" + byPlayer.id + "]");
	    if(freeze.includes(changedPlayer.name) == true){
		freeze.splice(freeze.indexOf(changedPlayer.name),1);
		getPlayerByID(changedPlayer.id).freezePoint = {x:undefined,y:undefined};
	    }
	}
	else if(changedPlayer.team==1){
	    console.log(changedPlayer.name + " was moved to Red by " + byPlayer.name + " [" + byPlayer.id + "]");
	    if(freeze.includes(changedPlayer.name) == true){
		getPlayerByID(changedPlayer.id).freezePoint.x = -getPlayerByID(changedPlayer.id).freezePoint.x;
	    }
	}
	else if(changedPlayer.team==2){
	    console.log(changedPlayer.name + " was moved to Blue by " + byPlayer.name + " [" + byPlayer.id + "]");
	    if(freeze.includes(changedPlayer.name) == true){
		getPlayerByID(changedPlayer.id).freezePoint.x = -getPlayerByID(changedPlayer.id).freezePoint.x;
	    }
	}
    }
};

room.onPlayerChat = function (player, message){ //Only the admins can freeze the players. Spectators and frozen players cannot be frozen; and spectators and melt players cannot be melt.
    console.log(player.name + ": " + message);
    var players = room.getPlayerList();

    if(message.toLowerCase() == "!admin"){
	room.setPlayerAdmin(player.id,!player.admin);
    }

    if(player.admin == true){
	if(room.getScores() != null){
	    for(var i=0; i<players.length; i++){
		if(message.startsWith("!freeze")==true){
		    if(message === "!freeze " + players[i].name){
			if(players[i].team != 0){
			    if(freeze.includes(players[i].name) == false){
				freeze.push(players[i].name);
				getPlayerByID(players[i].id).freezePoint = {x:players[i].position.x,y:players[i].position.y};
				room.setPlayerDiscProperties(players[i].id,{xspeed:0,yspeed:0});
				room.setPlayerAvatar(players[i].id,"☠️");
				room.sendAnnouncement("🧊 " + players[i].name + " was frozen by " + player.name,null,0x00FFFF,"bold",2);
			    }
			    else{
				room.sendAnnouncement("This player is already frozen.",player.id,0xFFFF00,"bold",2);
			    }
                        }
			else{
			    room.sendAnnouncement("A spectator cannot be frozen.",player.id,0xFFFF00,"bold",2);
			}
                    }
                }
		else if(message.startsWith("!melt")==true){
		    if(message === "!melt " + players[i].name){
			if(players[i].team != 0){
			    if(freeze.includes(players[i].name) == true){
				freeze.splice(freeze.indexOf(players[i].name),1);
				getPlayerByID(players[i].id).freezePoint = {x:undefined,y:undefined};
				room.setPlayerAvatar(players[i].id);
				room.sendAnnouncement("♨️ " + players[i].name + " was melt by " + player.name,null,0xFF0000,"bold",2);
			    }
			    else{
				room.sendAnnouncement("This player is already melt.",player.id,0xFFFF00,"bold",2);
			    }
			}
			else{
			    room.sendAnnouncement("A spectator cannot be melt.",player.id,0xFFFF00,"bold",2);
			}
		    }
		}
            }
        }
    }
}

room.onGameStart = function(byPlayer){ //If the list of frozen players has something as game starts, then it has to be cleared.
    if(freeze.length > 0){
	freeze = [];
    }
}

room.onGameStop = function(byPlayer){ //If the list of frozen players has something as game stops, then it has to be cleared.
    if(freeze.length > 0){
	freeze = [];
    }
}

room.onGameTick = function(){ //Frozen player move detector has to be used here, not in room.onPlayerActivity() event. If so, player is not moved to their freeze point as they pressing a direction key.
    handleFrozenPlayerMoves();
}
