var playerList = {};

var room = HBInit({roomName:"Tactical Timeout",noPlayer:true,public:true,maxPlayers:16});

var tacticalTimeoutLimit = 5;
var playerLeft = false;
var voteCommand = "p";

var redAskedForPause = [];
var blueAskedForPause = [];

var teamAskedForPause = [redAskedForPause,blueAskedForPause];
var teams = ["Red","Blue"];

var gamePauseState = false;

room.onGamePause = function(byPlayer){
    gamePauseState = !gamePauseState;
}

room.onGameStart = function(byPlayer){
    redAskedForPause = [];
    blueAskedForPause = [];
}

room.onGameStop = function(byPlayer){
    redAskedForPause = [];
    blueAskedForPause = [];
}

room.onGameUnpause = function(byPlayer){
    gamePauseState = !gamePauseState;
}

room.onPlayerChat = function (player, message) {
    if (message.toLowerCase() == voteCommand) {
        if (player.team != 0) {
            if (playerList[player.name].votedForTacticalTimeout == false && teamAskedForPause[player.team - 1].includes(player.name) == false) {
                room.sendAnnouncement(`${player.name} has asked for pause!`, player.id, 0xFFFF00, "bold", 2); //If player is able to use his right, then his message will appear on chat to make others witnessed.
                playerList[player.name].votedForTacticalTimeout = true;
                teamAskedForPause[player.team - 1].push(player.name);
            }
            if(gamePauseState == true){
                room.sendAnnouncement("You cannot use this command during the paused mode!", player.id, 0xFF0000, "bold", 2);
            }
            else {
                room.sendAnnouncement("Your right for asking pauses has expired!", player.id, 0xFF0000, "bold", 2);
                return false;
            }

            for (var t in teamAskedForPause) {
                if (teamAskedForPause[t].length == tacticalTimeoutLimit && gamePauseState == false) {
                    room.pauseGame(true);
                    room.sendAnnouncement(`${teams[t]} has asked for a pause and game paused!`, null, 0xFF0000, "bold", 2);
                    var team = teams[t];
                    setTimeout(function () {
                        room.pauseGame(false);
                        room.sendAnnouncement(`The pause time for ${team} team has been expired!`, null, 0xFFFF00, "bold", 2);
                        redAskedForPause = [];
                        blueAskedForPause = [];
                    }, 15000);
                }
            }
        }
        else{
            room.sendAnnouncement("Spectators cannot ask for a pause!", player.id, 0xFF0000, "bold", 2); //If used in a abusive manner, then administrators can ban the player.
        }
    }
}

room.onPlayerJoin = function(player){
    if(playerList[player.name] == undefined){
	playerList[player.name] = {name: player.name, votedForTacticalTimeout: false};
    }
}
