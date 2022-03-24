var pcTimeout = 20000;
var playerList = {};

var basePoints = [0,1000,2500,5000,10000];
var ranks = ["Beginner","Amateur","Intermediate","Professional","Upperly Professional"];

var room = HBInit({roomName:"TEST",noPlayer:true,public:true,maxPlayers:12});

function checkPlayerRank(player){ //You can invoke this function in the functions in which you updated the statistics. There's no problem because of there are the same amount of ranks and base points.
    for(var r=0; r<ranks.length; r++){
	if(r < ranks.length-1){
	    if(basePoints[r] <= playerList[player.name].points && playerList[player.name].points < basePoints[r+1] && playerList[player.name].rank != ranks[r]){
		playerList[player.name].rank = ranks[r];
	    }
	}
	else{
	    if(basePoints[r] <= playerList[player.name].points && playerList[player.name].rank != ranks[r]){
		playerList[player.name].rank = ranks[r];
	    }
	}
    }
}

room.onPlayerJoin = function(player){
    var passCheckTimeout;

    if(playerList[player.name] == undefined){
	playerList[player.name] = {name: player.name, auth: player.auth, conn: player.conn, pass: "1234", passCheck: true, points: 0, rank: "Beginner"}; //You can use this a login system also, and can add a function to let players change their passwords.
    }
    else{
	var points = playerList[player.name].points;
	var rank = playerList[player.name].rank;
	playerList[player.name] = {name: player.name, auth: player.auth, conn: player.conn, pass: "1234", passCheck: false, points: points, rank: rank};
	room.sendAnnouncement("You must be logged in to continue.",player.id,0xFFFF00,"bold",2);

	passCheckTimeout = setTimeout(function(){
	    if(player && playerList[player.name].passCheck == false){
		room.kickPlayer(player.id,"Login failed.",false);
	    }
	},pcTimeout);
    }
}

room.onPlayerChat = function(player,message){
    if(playerList[player.name].passCheck == false){
	if(message == playerList[player.name].pass){
	    playerList[player.name].passCheck = true;
	    room.sendAnnouncement("You have successfully logged in!",player.id,0x00FF00,"bold",2);
	    return false;
	}
    }
    if(message.toLowerCase() == "!commands"){
	room.sendAnnouncement("Available commands: !ranks (Shows all current ranks with their base points), !stats (Shows your statistics)",player.id,0xFFFFFF,"normal",1);
	return false;
    }
    else if(message.toLowerCase() == "!ranks"){
	for(var r=0; r<ranks.length; r++){
	    room.sendAnnouncement(`Rank: ${ranks[r]}\nBase Point: ${basePoints[r]}`,player.id,0xFFFFFF,"normal",1);
	}
	return false;
    }
    else if(message.toLowerCase() == "!stats"){
	room.sendAnnouncement(`Here's your points and rank:\nPoints: ${playerList[player.name].points}\nRank: ${playerList[player.name].rank}`,player.id,0xFFFFFF,"normal",1);
	return false;
    }
}
