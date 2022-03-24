var banList = [];
var names = [];
var ids = [];

var room = HBInit({roomName:"TEST",noPlayer:true,public:true,maxPlayers:12});

function GetNameById(id){
    if(!isNaN(id)){
	return names[id-1];
    }
}

room.onPlayerJoin = function(player){
    names.push(player.name);
    ids.push(player.id);
}

room.onPlayerKicked = function(kickedPlayer,reason,ban,byPlayer){
    if(ban == 0){
	console.log(kickedPlayer.name + " [" + kickedPlayer.id + "] was kicked (" + reason + ")");
	return false;
    }
    else if(ban == 1){
	console.log(kickedPlayer.name + " [" + kickedPlayer.id + "] was banned (" + reason + ")");
	banList.push(kickedPlayer.name);
    }
}

room.onPlayerChat = function(player,msg){
    if(player.admin==true){
	if(msg.split(" ")[0] == "!banınıkaldır"){
	    var id = msg.split(" ")[1];
	    room.clearBan(parseInt(id));
	    var name = GetNameById(id);
	    room.sendAnnouncement(id + " numaralı oyuncunun (" + name + ") banı kaldırıldı!",player.id,0x00FF00,"normal",1);
	    banList.splice(banList.indexOf(name),1);
	    return false;
	}
	else if(msg == "!banlılar"){
	    if(banList.length == 0){
		room.sendAnnouncement("Banlı oyuncu yok!",player.id,0xFFFF00,"normal",1);
	    }
	    else{
		room.sendAnnouncement("Ban listesi: " + banList.toString(),player.id,0xFFFFFF,"normal",1);
	    }
	    return false;
	}
    }
}
