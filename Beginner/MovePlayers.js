var teams = ["spectators","red","blue"];

var room = HBInit({roomName:"Move Players",noPlayer:true,public:true,maxPlayers:12});

function movePlayersToTeams(player,message){
    var team = parseInt(message.split(" ")[1]);
    var players = room.getPlayerList();

    if(player.admin == true){
	if(0 <= team && team <= 2){
	    players.forEach(p => room.setPlayerTeam(p.id,team));
	    room.sendAnnouncement("All the players have been moved to " + teams[team] + " by " + player.name,null,0x00FF00,"bold",0);
	}
	else{
	    room.sendAnnouncement("Wrong team ID!",player.id,0xFFFF00,"bold",1);
	}
    }
    else{
	room.sendAnnouncement("You have no authorization to move players to teams!",player.id,0xFF0000,"bold",2);
    }
}

room.onPlayerChat = function(player,message){
    if(message.startsWith("!move") == true){
	movePlayersToTeams(player,message);
	return false;
    }
}
