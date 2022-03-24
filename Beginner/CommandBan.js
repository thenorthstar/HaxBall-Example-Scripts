var room = HBInit({roomName:"Command Ban",noPlayer:true,public:true,maxPlayers:12});

room.onPlayerChat = function(player,message){
    var players = room.getPlayerList();

    if(message.split(" ")[0] == "!ban"){
	if(player.admin == true){
	    var id = parseInt(message.split(" ")[1]);
	    var p = players.find(x => x.id == id);

	    if(p){
		if(p.id == player.id){
		    room.sendAnnouncement("You cannot ban yourselves! Current players:\n" + players.map(x => x.name + ": " + x.id).join("\n"),player.id,0xFFFF00,"bold",2);
		}
		else{
		    room.kickPlayer(p.id,"You were banned by "+ player.name + " with command.",true);
		}
	    }
	    else{
		room.sendAnnouncement("No such a player found with given ID! (" + id + ") Current players:\n" + players.map(x => x.name + ": " + x.id).join("\n"),player.id,0xFFFF00,"bold",2);
	    }

	    return false;
	}
	else{
	    room.sendAnnouncement("You have no authorization to ban someone from this room!",player.id,0xFF0000,"bold",2);
	    return false;
	}
    }
}
