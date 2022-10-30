const votedPlayers = new Set()
let votekickTimes = {};
let votekickCount = {};
var votekickTimeout = 60000;
var temp_ban_timeout = 300000;
var PlayerFound = false;
var playerList = [];
var conns = [];
var temp_banlist = [];

var room = HBInit({roomName:"Voteban",playerName:"",noPlayer:true,public:true,maxPlayers:12});

function GetTeam(id){
    return room.getPlayerList().filter((player) => player.id != 0 && player.team == id);
}

function CreatePlayer(player){
    playerList[playerList.length]={
	name:player.name,
	id:player.id,
	auth:undefined,
	conn:undefined,
	jointime:0
    };
}

function DeletePlayer(id){
    for(var i=0; i<playerList.length; i++){
	if(playerList[i].id==id){
	    playerList.splice(i,1);
	}
    }
}

function GetPlayer(id){
    for(var i=0; i<playerList.length; i++){
	if(playerList[i].id==id){
	    return playerList[i];
	}
    }
}

function GetIDByName(name){
    for(var i=0; i<playerList.length; i++){
	if(playerList[i].name==name){
	    return playerList[i].id;
	}
    }
}

function GetAuthByID(id){
    for(var i=0; i<playerList.length; i++){
	if(playerList[i].id==id){
	    return GetPlayer(playerList[i].id).auth;
	}
    }
}

function votekickRemove(player){
    localStorage.setItem(GetPlayer(player.id).auth,JSON.stringify({auth:GetPlayer(player.id).auth,votes:0}));
    var players = room.getPlayerList();
    for(var i=0; i<players.length; i++){
	if(votedPlayers.has(GetPlayer(players[i].id).auth)==true){
	    votedPlayers.delete(GetPlayer(players[i].id).auth);
	}
    }
}

function votekickCheck(player){
    if((room.getPlayerList().length)%2 == 0){
        if(JSON.parse(localStorage.getItem(GetPlayer(player.id).auth)).votes >= (room.getPlayerList().length)*1/2){
	    room.kickPlayer(player.id,"You've been voted out. Good bye!",true);
	}
    	else{
	    console.log(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + "." + new Date().getMilliseconds() + " 🗳️ " + player.name + " : " + JSON.parse(localStorage.getItem(GetPlayer(player.id).auth)).votes + "/" + (room.getPlayerList().length)*1/2);
	    room.sendAnnouncement("🗳️ " + player.name + " : " + JSON.parse(localStorage.getItem(GetPlayer(player.id).auth)).votes + "/" + (room.getPlayerList().length)*1/2,null,0xFFFFFF,"normal",1);
	}
    }
    else if((room.getPlayerList().length)%2 == 1){
        if(JSON.parse(localStorage.getItem(GetPlayer(player.id).auth)).votes >= Math.round((room.getPlayerList().length)*1/2)){
	    room.kickPlayer(player.id,"You've been voted out. Good bye!",true);
	}
    	else{
	    console.log(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + "." + new Date().getMilliseconds() + " 🗳️ " + player.name + " : " + JSON.parse(localStorage.getItem(GetPlayer(player.id).auth)).votes + "/" + Math.round((room.getPlayerList().length)*1/2));
	    room.sendAnnouncement("🗳️ " + player.name + " : " + JSON.parse(localStorage.getItem(GetPlayer(player.id).auth)).votes + "/" + Math.round((room.getPlayerList().length)*1/2),null,0xFFFFFF,"normal",1);
	}
    }
}

room.onPlayerJoin = function(player){
    CreatePlayer(player);
    GetPlayer(player.id).auth = player.auth;
    GetPlayer(player.id).conn = player.conn;
    conns.push([player.id,player.name,player.auth,player.conn]);
    console.log(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + "." + new Date().getMilliseconds() + " ➡️ " + player.name + " [" + player.id + "] has joined. (auth: " + player.auth + " | conn: " + player.conn + ")");
    GetPlayer(player.id).jointime = Date.now();

    if(temp_banlist.includes(player.auth) == true){
	room.kickPlayer(player.id,"You have been penalized for 5 minutes for ragequit!",false);
    }

    if(localStorage.getItem(player.auth) == null){
	var playerObject = {auth:player.auth,votes:0}
	localStorage.setItem(player.auth,JSON.stringify(playerObject)); 
    }
}

room.onPlayerLeave = function(player){
    console.log(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + "." + new Date().getMilliseconds() + " ➡️ " + player.name + " [" + player.id + "] has left.");

    if(room.getScores() != null && player.position != null){
	temp_banlist.push(GetPlayer(player.id).auth);
	setTimeout(function(){temp_banlist.splice(temp_banlist.indexOf(GetPlayer(player.id).auth),1);},temp_ban_timeout);
    }

    DeletePlayer(player.id);
}

room.onPlayerChat = function(player,message){
    var players = room.getPlayerList();

    console.log(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + "." + new Date().getMilliseconds() + " 💬 " + player.name + " [" + player.id + "]: " + message);

    if(message.startsWith("!voteban ")==true){
	PlayerFound = false;
	players = room.getPlayerList();
	for(var i=0; i<players.length; i++){
	    if(message === ("!voteban " + players[i].id)){
		if(room.getPlayerList().length < 4){
		    room.sendAnnouncement("You cannot vote another player when there are less than 4 people in the room.",player.id,0xFF0000,"bold",2);
		    return false;
		}
		if(players[i].id==player.id){
		    room.sendAnnouncement("You cannot vote yourself.",player.id,0xFF0000,"bold",2);
		    return false;
		}
		if(votedPlayers.has(GetPlayer(player.id).auth)){
		    room.sendAnnouncement("You cannot vote another player more than once in a minute.",player.id,0xFF0000,"bold",2);
		    return false;
		}
	 	votedPlayers.add(GetPlayer(player.id).auth);
		PlayerFound = true;
		if(JSON.parse(localStorage.getItem(GetPlayer(players[i].id).auth)) != null){
		    var v = JSON.parse(localStorage.getItem(GetPlayer(players[i].id).auth)).votes;
		    v++;
		    var playerObject = {auth:GetPlayer(players[i].id).auth,votes:v};
		    localStorage.setItem(GetPlayer(players[i].id).auth,JSON.stringify(playerObject));

		    if(v == 1){
			setTimeout(function(){
			    if(v < players.length){
				votekickRemove(player);
			    }
			},votekickTimeout);
		    }
		}
		votekickCheck(players[i]);
	    }
	}
	if(PlayerFound === false){
	    players = room.getPlayerList();
	    playersString = "";
	    for(i=0; i<players.length; i++){
		playersString = playersString + players[i].name + ": [" + players[i].id + "]\n";
	    }
	    room.sendAnnouncement("There's no such a player. Here's the list of the votable players:" + "\n" + playersString,player.id,0xFFFF00,"normal",1);
	}
	return false;
    }
};
