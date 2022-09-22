var playerList = {};
var minMessageLength = 1;
var bound = 3; //You can either decrease or increase this, min = 2;
var spamBanLimit = 3;
var spamTimer = 3000; //In milliseconds
var removal = 60000; //In milliseconds

var room = HBInit({roomName:"Spam-Mute",noPlayer:true,public:true,maxPlayers:12});

room.onPlayerChat = function(player,message){
    playerList[player.name].messageDates.push(Date.now());
    var administrators = room.getPlayerList(p => p.admin == true);

    if(playerList[player.name].messageDates.length == bound){
	playerList[player.name].messageDates.shift();
    }
    if(minMessageLength < playerList[player.name].messageDates.length && playerList[player.name].messageDates.length <= bound-1 && playerList[player.name].messageDates[playerList[player.name].messageDates.length-1] - playerList[player.name].messageDates[0] < spamTimer){
	if(playerList[player.name].muted == false){
	    var name = player.name;
	    room.sendAnnouncement(`${player.name} was muted by the reason of spamming!`,null,0x00FF00,"bold",1);
	    playerList[player.name].muted = true;

	    setTimeout(function(){
		if(playerList[name].muted == true){
		    playerList[name].muted = false;
		    room.sendAnnouncement(`${player.name} is now unmuted!`,null,0x00FF00,"bold",1);
		}
	    },removal);
	}
	else{
	    room.sendAnnouncement(`You will be banned if continuing to spam in muted mode!`,player.id,0xFF8000,"bold",2);

	    if(playerList[player.name].spamInMute < spamBanLimit){
		playerList[player.name].spamInMute++;
	    }
	    else{
		room.kickPlayer(player.id,"Spam",true);
	    }

	    return false;
	}
    }
    if(playerList[player.name].muted == true){
	room.sendAnnouncement(`You are muted. Only the administration can see your messages. (${message})`,player.id,0xFFFF00,"bold",2);
	administrators.forEach(p => {
	    room.sendAnnouncement(`${player.name}: ${message}`,p.id,0xFFFF00,"bold",1);
	});
	return false;
    }
}

room.onPlayerJoin = function(player){
    if(playerList[player.name] == undefined){
	playerList[player.name] = {name: player.name, messageDates: [], muted: false, spamInMute: 0};
    }
}
