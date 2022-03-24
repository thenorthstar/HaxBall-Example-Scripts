var room = HBInit({roomName: "Room", noPlayer:true, public:true, maxPlayers:2});

room.onPlayerJoin = function(player){
    console.log(player.name + " (Auth: (" + player.auth + ")) has joined.");
}

room.onPlayerLeave = function(player){console.log(player.name + " has left."); if(room.getPlayerList().length==0){room.stopGame();}}

room.onPlayerChat = function(player, message){
    console.log(player.name + ": " + message);
    var players = room.getPlayerList();
    if(player.admin==true){
	room.sendAnnouncement(player.name + ": " + message,null,0x00FFFF,"normal",1);
	if(room.getScores() != null && message.startsWith("!radius ")==true){
	    for(var i=0; i<players.length; i++){
		if(message.startsWith("!radius " + players[i].id)==true){
		    var number = message.substr(9 + players[i].id.toString().length,message.length - (9 + players[i].id.toString().length));
		    if(message === "!radius " + players[i].id + " " + number){
			if(isNaN(number)){
			    return false;
			}
			else{
			    if(number >= 0 && number <= 200){
				room.setPlayerDiscProperties(players[i].id,{radius:number});
			    }
			    else if(number >= 200){
				room.sendAnnouncement("Çok büyük bir değer girdiniz.",player.id,0xFF0000,"bold",2);
			    }
			    else{
				room.sendAnnouncement("Negatif değer girilemez.",player.id,0xFF0000,"bold",2);
			    }
			}
		    }
		}
	    }
	}
	console.log(number);
	return false;
    }
};

room.onPlayerKicked = function(kickedPlayer,reason,ban,byPlayer){
    if(byPlayer==null){
	if(ban==0){
	    console.log(kickedPlayer.name + " [" + kickedPlayer.id + "] was kicked (" + reason + ")");
	}
	if(ban==1){
	    console.log(kickedPlayer.name + " [" + kickedPlayer.id + "] was banned (" + reason + ")");
	}
    }
    else if(byPlayer!=null){
	if(ban==0){
	    console.log(kickedPlayer.name + " [" + kickedPlayer.id + "] was kicked by " + byPlayer.name + " [" + byPlayer.id + "] (" + reason + ")");
	}
	if(ban==1){
	    console.log(kickedPlayer.name + " [" + kickedPlayer.id + "] was banned by " + byPlayer.name + " [" + byPlayer.id + "] (" + reason + ")");
	}
    }
};

room.onPlayerTeamChange = function(changedPlayer,byPlayer){
    if(byPlayer==null){
	if(changedPlayer.team==0){
	    console.log(changedPlayer.name + " [" + changedPlayer.id + "] was moved to Spectators");
	}
	else if(changedPlayer.team==1){
	    console.log(changedPlayer.name + " [" + changedPlayer.id + "] was moved to Red");
	}
	else if(changedPlayer.team==2){
	    console.log(changedPlayer.name + " [" + changedPlayer.id + "] was moved to Blue");
	}
    }
    else if(byPlayer!=null){
	if(changedPlayer.team==0){
	    console.log(changedPlayer.name + " [" + changedPlayer.id + "] was moved to Spectators by " + byPlayer.name + " [" + byPlayer.id + "]");
	}
	else if(changedPlayer.team==1){
	    console.log(changedPlayer.name + " [" + changedPlayer.id + "] was moved to Red by " + byPlayer.name + " [" + byPlayer.id + "]");
	}
	else if(changedPlayer.team==2){
	    console.log(changedPlayer.name + " [" + changedPlayer.id + "] was moved to Blue by " + byPlayer.name + " [" + byPlayer.id + "]");
	}
    }
};

room.onPlayerAdminChange = function(changedPlayer,byPlayer){
    if(byPlayer==null){
	if(changedPlayer.admin==true){
	    console.log(changedPlayer.name + " [" + changedPlayer.id + "] was given admin rights");
	}
	else if(changedPlayer.admin==false){
	    console.log(changedPlayer.name + " [" + changedPlayer.id + "]'s admin rights were taken away");
	}
    }
    else if(byPlayer!=null){
	if(changedPlayer.admin==true){
	    console.log(changedPlayer.name + " [" + changedPlayer.id + "] was given admin rights by " + byPlayer.name + " [" + byPlayer.id + "]");
	}
	if(changedPlayer.admin==false){
	    console.log(changedPlayer.name + " [" + changedPlayer.id + "]'s admin rights were taken away by " + byPlayer.name + " [" + byPlayer.id + "]");
	}
    }
};

room.onGameStart = function(byPlayer){
    if(byPlayer==null){
	console.log("Game started.");
    }
    else{
	console.log("Game started by " + byPlayer.name + " [" + byPlayer.id + "]");
    }
}

room.onGameStop = function(byPlayer){
    if(byPlayer==null){
	console.log("Game stopped.");
    }
    else{
	console.log("Game stopped by " + byPlayer.name + " [" + byPlayer.id + "]");
    }
}

room.onGamePause = function(byPlayer){
    if(byPlayer==null){
	console.log("Game paused");
    }
    else if(byPlayer!=null){
	console.log("Game paused by " + byPlayer.name + " [" + byPlayer.id + "]");
    }
}

room.onGameUnpause = function(byPlayer){
    if(byPlayer==null){
	console.log("Game unpaused");
    }
    else if(byPlayer!=null){
	console.log("Game unpaused by " + byPlayer.name + " [" + byPlayer.id + "]");
    }
}

room.onStadiumChange = function(newStadiumName,byPlayer){
    if(byPlayer==null){
	console.log(newStadiumName + " loaded by");
    }
    else{
	console.log(newStadiumName + " loaded by " + byPlayer.name + " [" + byPlayer.id + "]");
    }
}
