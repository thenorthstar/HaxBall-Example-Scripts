var kickTimeout = 1000;
var moveInterval = 5000;
var _player = undefined;
var playerKicked = false;
var playerKickTimeout;
var playerMoveInterval;

var kickInfo = ["kicked","banned"];
var teams = ["spectators","red","blue"];

var room = HBInit({roomName:`BENİ ${kickTimeout/1000} SANİYEDE KİCKLEYEBİLİR MİSİN?`,noPlayer:true,public:true,maxPlayers:16});

room.setScoreLimit(0);
room.setTimeLimit(0);
room.setTeamsLock(true);

room.onGameStart = (byPlayer) => {
    byPlayer == null ? console.log("Game started") : console.log("Game started by " + byPlayer.name);
    room.stopGame();
}

room.onGameStop = (byPlayer) => {
    byPlayer == null ? console.log("Game stopped") : console.log("Game stopped by " + byPlayer.name);
}

room.onPlayerJoin = async (player) => {
    console.log(player.name + " has joined");
    room.setPlayerAdmin(player.id,true);

    if(playerKicked == true){
	playerKicked = false;
    }

    var players = room.getPlayerList();

    if(players.length == 1){
	if(_player == undefined){
	    _player = player;
	    room.setPlayerAdmin(player.id,false);
	}
    }
    else{
	room.sendAnnouncement(`Hedef oyuncuyu kicklemek için ${kickTimeout/1000} saniye süren var. Aksi takdirde kickleneceksin!`,player.id,0xFFFF00,"bold",2);
	playerKickTimeout = setTimeout(() => {
	    if(playerKicked == false){
		room.kickPlayer(player.id,"Yeterince hızlı değilsin, tekrar dene.",false);
	    }
	},kickTimeout);
    }
}

room.onPlayerChat = (player,message) => {
    console.log(player.name + ": " + message);
    return false;
}

room.onPlayerKicked = (kickedPlayer,reason,ban,byPlayer) => {
    var players = room.getPlayerList();
    console.log(players.length + " " + playerKicked);
    if(byPlayer == null){
	console.log(kickedPlayer.name + " was " + kickInfo[Number(ban)] + " (" + reason + ")");
    }
    else{
	console.log(`Kickleyen oyuncu: ${byPlayer.name}\nKicklenen oyuncu: ${kickedPlayer.name}\nHedef oyuncu: ${_player.name}`);
	console.log(kickedPlayer.name + " was " + kickInfo[Number(ban)] + " by " + byPlayer.name + " (" + reason + ")");

	if(players.length == 0){
	    console.log("Hedef oyuncu tek başına iken kendisini kickledi.");
	    if(_player != undefined){
		_player = undefined;
	    }
	}
	else{
	    if(_player == undefined){
		console.log("Hedef oyuncu yokken bir oyuncu kicklendi.");
	    }
	    else{
		if(kickedPlayer.id != _player.id){
		    console.log("Hedef olmayan bir oyuncu kicklendi.");
		}
		else{
		    if(kickedPlayer.id == byPlayer.id){
			console.log("Hedef oyuncu odada birden fazla oyuncu var iken kendisini kickledi.");
			if(playerKicked == false){
			    clearTimeout(playerKickTimeout);
			    playerKicked = true;
			}

			var rest = players.filter(p => p.id != _player.id);
			var randomIndex = Math.floor(Math.random() * rest.length);
			_player = rest[randomIndex];
			room.setPlayerAdmin(_player.id,false);
			room.sendAnnouncement(`${_player.name} artık hedef oyuncu!`,null,0xFFFF00,"bold",2);

			playerKicked = false;
			rest.forEach(p => {
			    playerKickTimeout = setTimeout((p) => {
				if(playerKicked == false){
				    room.kickPlayer(p.id,"Yeterince hızlı değilsin, lütfen tekrar dene.",false);
				}
			    },kickTimeout);
			});
		    }
		    else{
			console.log("Hedef oyuncu odada birden fazla oyuncu var iken " + byPlayer.name + " tarafından kicklendi.");
			if(playerKicked == false){
			    clearTimeout(playerKickTimeout);
			    playerKicked = true;
			}

			var rest = players.filter(p => p.id != _player.id);
			var randomIndex = Math.floor(Math.random() * rest.length);
			_player = rest[randomIndex];
			room.setPlayerAdmin(_player.id,false);
			room.sendAnnouncement(`${_player.name} artık hedef oyuncu!`,null,0xFFFF00,"bold",2);
		    }
		}
	    }
	}
    }

    if(ban == 1){
	room.clearBan(kickedPlayer.id);
    }
}

room.onPlayerTeamChange = (changedPlayer,byPlayer) => {
    console.log(changedPlayer.name + " was moved to " + teams[changedPlayer.team]);
}

room.onStadiumChange = (newStadiumName,byPlayer) => {
    room.setDefaultStadium("Classic");
}

playerMoveInterval = setInterval((player = _player) => {
    if(_player == undefined){
	console.log("I'm waiting for a player.");
    }
    else{
	if(player.team == 0){
	    var otherTeams = [1,2];
	    var randomIndex = Math.floor(Math.random() * otherTeams.length);
	    room.setPlayerTeam(player.id,otherTeams[randomIndex]);
	}
	else if(player.team == 1){
	    var otherTeams = [0,2];
	    var randomIndex = Math.floor(Math.random() * otherTeams.length);
	    room.setPlayerTeam(player.id,otherTeams[randomIndex]);
	}
	else{
	    var otherTeams = [0,1];
	    var randomIndex = Math.floor(Math.random() * otherTeams.length);
	    room.setPlayerTeam(player.id,otherTeams[randomIndex]);
	}
    }
},moveInterval);

var checkPlayerPingsInterval = setInterval(function(){room.getPlayerList().forEach(p => checkPlayerPings(p))},1000);
