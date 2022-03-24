var playerList = {};
var removal = 3000; //In milliseconds

var room = HBInit({roomName:"SlowMode",noPlayer:true,public:true,maxPlayers:12});

room.onPlayerChat = function(player,message){
    var administrators = room.getPlayerList(p => p.admin == true);

    if(playerList[player.name].slowMode == false){
	playerList[player.name].slowMode = true;
	var name = player.name;

	setTimeout(function(){
	    if(playerList[player.name].slowMode == true){
		playerList[name].slowMode = false;
	    }
	},removal);
    }
    else{
	room.sendAnnouncement(`Slow mode is active. Only the administration can see your messages. (${message})`,player.id,0xFFFF00,"bold",2);
	administrators.forEach(p => {
	    room.sendAnnouncement(`${player.name}: ${message}`,p.id,0xFFFF00,"bold",1);
	});
	return false;
    }
}

room.onPlayerJoin = function(player){
    if(playerList[player.name] == undefined){
	playerList[player.name] = {name: player.name, slowMode: false};
    }
}
