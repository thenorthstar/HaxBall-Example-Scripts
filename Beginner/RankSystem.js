var playerList = {};
var gameTimeLimit = 60;

function increaseTime(){
    var players = room.getPlayerList().filter(p => room.getPlayerDiscProperties(p.id) != null);
    players.forEach(p => playerList[p.name].gameTime += 1/60);
}

function updateStats(scores){
    var players = room.getPlayerList().filter(p => room.getPlayerDiscProperties(p.id) != null && playerList[p.name].gameTime < gameTimeLimit);
    var reds = players.filter(p => p.team == 1);
    var blues = players.filter(p => p.team == 2);

    if(scores.red > scores.blue){
	reds.forEach(r => {
	    r.wins++;
	});
	blues.forEach(b => {
	    b.losses++;
	});
    }
    else if(scores.red < scores.blue){
	reds.forEach(r => {
	    r.losses++;
	});
	blues.forEach(b => {
	    b.wins++;
	});
    }
}

room.onGameStart = function(byPlayer){
    var players = room.getPlayerList().filter(p => room.getPlayerDiscProperties(p.id) != null && playerList[p.name].gameTime != 0);
    players.forEach(p => playerList[p.name].gameTime = 0);
}

room.onGameStop = function(byPlayer){
    var players = room.getPlayerList().filter(p => room.getPlayerDiscProperties(p.id) != null && playerList[p.name].gameTime != 0);
    players.forEach(p => playerList[p.name].gameTime = 0);
}

room.onGameTick = function(){
    increaseTime();
}

room.onPlayerChat = function(player,message){
    if(message.toLowerCase == "!stats"){
	room.sendAnnouncement("Stats here:\n",player.id,0x00FFFF,"normal",1);
	room.sendAnnouncement(`Points: ${playerList[player.name].points}\n
			       Wins: ${playerList[player.name].wins}\n
			       Draws: ${playerList[player.name].draws}\n
			       Losses: ${playerList[player.name].losses}\n
			       Goals: ${playerList[player.name].goals}\n
			       Assists: ${playerList[player.name].assists}\n
			       Own goals: ${playerList[player.name].owngoals}\n
			       Clean Sheets: ${playerList[player.name].cs}`,player.id,0xFFFFFF,"normal",0);
	return false;
    }
}

room.onPlayerJoin = function(player){
    if(playerList[player.name] == undefined){
	playerList[player.name] = {name: player.name, auth: player.auth, conn: player.conn, goals: 0, assists: 0, owngoals: 0, cs: 0, points: 0, wins: 0, draws: 0, losses: 0, gameTime: 0};
    }
}

room.onTeamVictory = function(scores){
    updateStats(scores);
    room.sendAnnouncement("Statistics have been updated!",null,0xFFFF00,"bold",2);
}
