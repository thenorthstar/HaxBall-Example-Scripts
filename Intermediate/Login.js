var banTimeout = 60000; //In milliseconds
var pcTimeout = 20000; //In milliseconds
var playerList = {};
var teams = ["spectators","red","blue"];
var templist = [];
var timeLimit = 300; //In seconds

var room = HBInit({roomName:"TEST",noPlayer:true,public:true,maxPlayers:20});

function increaseInGameTime(){
    room.getPlayerList().filter(p => p.team != 0).forEach(p => {
	playerList[p.name].timeSpentInGame += 1/60
    });
}

function resetInGameTime(){
    room.getPlayerList().filter(p => playerList[p.name].timeSpentInGame != 0).forEach(p => {
	playerList[p.name].timeSpentInGame = 0
    });
}

room.onGameStop = function(byPlayer){
    resetInGameTime();
}

room.onGameTick = function(){
    increaseInGameTime();
}

room.onPlayerJoin = function(player){
    var passCheckTimeout;

    if(templist.includes(player.auth) == true){
	if(playerList[player.name] == undefined){
	    console.log("Something went wrong");
	}
	else{
	    room.kickPlayer(player.id,"You are temporarily banned from this room. Please wait for your punishment to end. (" + playerList[player.name].punishmentRemoval + ")",false);
	}
    }
    else{
	if(playerList[player.name] == undefined){
	    playerList[player.name] = {name: player.name, auth: player.auth, conn: player.conn, timeSpentInGame: 0, pass: "1234", passCheck: true, punishmentRemoval: undefined}; //Burayı bir tür kayıt sistemi gibi kullanabilirsin. Oyuncu daha önceden odaya giriş yapmışsa, pass bilgisini istesin.
	}
	else{
	    playerList[player.name] = {name: player.name, auth: player.auth, conn: player.conn, timeSpentInGame: 0, pass: "1234", passCheck: false, punishmentRemoval: undefined};
	    room.sendAnnouncement("You must be logged in to continue.",player.id,0xFFFF00,"bold",2);

	    passCheckTimeout = setTimeout(function(){
		if(player && playerList[player.name].passCheck == false){
		    room.kickPlayer(player.id,"Login failed.",false);
		}
	    },pcTimeout);
	}
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
}

room.onPlayerLeave = function(player){
    var name = player.name;
    var date = (new Date(Date.now() + banTimeout)).toLocaleTimeString();

    if(room.getScores() != null){
	if(player.team != 0 && playerList[name].timeSpentInGame > timeLimit){ //Oyunda belli bir süreden uzun süre kalmış oyuncular odadan çıktığında burası devreye girer.
	    if(templist && templist.includes(playerList[name].auth) == false){
		templist.push(playerList[name].auth);
		playerList[name].punishmentRemoval = date;
		setTimeout(function(){
		    if(templist && templist.includes(playerList[name].auth) == true){
			let index = templist.indexOf(playerList[name].auth);
			templist.splice(index,1);
		    }
		},banTimeout);

		room.sendAnnouncement(`${name} from the ${teams[player.team]} has been punished until ${date} due to leaving the room during the match!`,null,0xFFFF00,"bold",1);
	    }
	}
    }
}
