var playerList = {};
var mutedAuths = [];

var playerMessages = ["PLAYER","ADMIN"];
var messagePrefix = "!";
var commands = ["!mute"];

var muteRange = {Min: 1, Max: 10};

var timeObject = {Seconds: 1000, Minutes: 60000, Hours: 3600000};

var colors = {
    Mute:{
	Admin: 0xFF0000,
	AdminCanSee: 0xFFFF00,
	Already: 0xFFFF00,
	InvalidID: 0xFFFF00,
	InvalidNumber: 0xFFFF00,
	NoSuchPlayer: 0xFF0000,
	OutOfRange: 0xFFFF00,
	Removal: 0x00FF00,
	Self: 0xFFFF00,
	Still: 0xFFFF00,
	Success: 0x00FF00
    },
    NoAuthorization:{
	Mute: 0xFF0000
    },
    Player: [0xFFFFFF,0xFFDB72],
    Unmute: 0x00FF00,
    Welcome: 0xFFFFFF
};

var fonts = {
    Mute:{
	Admin: "bold",
	AdminCanSee: "bold",
	Already: "bold",
	InvalidID: "bold",
	InvalidNumber: "bold",
	NoSuchPlayer: "bold",
	OutOfRange: "bold",
	Removal: "normal",
	Self: "bold",
	Still: "small",
	Success: "normal",
    },
    NoAuthorization:{
	Mute: "bold"
    },
    Player: ["normal","bold"],
    Unmute: "normal",
    Welcome: "normal"
};

var sounds = {
    Mute:{
	Admin: 2,
	AdminCanSee: 1,
	Already: 2,
	InvalidID: 2,
	InvalidNumber: 2,
	NoSuchPlayer: 2,
	OutOfRange: 2,
	Removal: 1,
	Self: 2,
	Still: 0,
	Success: 1,
    },
    NoAuthorization:{
	Mute: 2
    },
    Player: [1,1],
    Unmute: 1,
    Welcome: 1
};

var messages = {
    Mute:{
	Admin: "You cannot mute an administrator!",
	Already: "This player is already muted!",
	InvalidID: "Invalid ID!",
	InvalidNumber: "Invalid number!",
	NoSuchPlayer: "No such a player with the given ID!",
	OutOfRange: `Mute period is bound with ${muteRange.Min} and ${muteRange.Max} minutes`,
	Removal: "has been unmuted!",
	Self: "You cannot mute yourselves!",
	Still: "You are still muted! Only the administration can see your messages",
	Success: ["has been muted by","for"]
    },
    NoAuthorization:{
	Mute: "You have no authorization to mute a player in this room!"
    },
    Unmute: "has been unmuted!",
    Welcome: "Welcome!"
};

var room = HBInit({roomName:"Mute Players",noPlayer:true,public:true,maxPlayers:12});

function isCommand(string){
    return string.startsWith(messagePrefix) == true && (commands.includes(string) == true || commands.includes(string.split(" ")[0]) == true);
}

room.onPlayerChat = function(player,message){
    console.log(`${player.name}: ${message}`);
    var administrators = room.getPlayerList().filter(p => p.admin == true);

    if(isCommand(message) == true){
	if(player.admin == true){
	    var ID = parseInt(message.toLowerCase().split(" ")[1]);

	    if(isNaN(ID)){
		room.sendAnnouncement(`${messages.Mute.InvalidID}`,player.id,colors.Mute.InvalidID,fonts.Mute.InvalidID,sounds.Mute.InvalidID);
		return false;
	    }
	    else{
		var p = room.getPlayerList().find(x => x.id == ID);

		if(!p){
		    room.sendAnnouncement(`${messages.Mute.NoSuchPlayer}`,player.id,colors.Mute.NoSuchPlayer,fonts.Mute.NoSuchPlayer,sounds.Mute.NoSuchPlayer);
		    return false;
		}
		else{
		    if(p.id == player.id){
			room.sendAnnouncement(`${messages.Mute.Self}`,player.id,colors.Mute.Self,fonts.Mute.Self,sounds.Mute.Self);
			return false;
		    }
		    else{
			if(p.admin == true){
			    room.sendAnnouncement(`${messages.Mute.Admin}`,player.id,colors.Mute.Admin,fonts.Mute.Admin,sounds.Mute.Admin);
			    return false;
			}
			else{
			    var time = parseInt(message.toLowerCase().split(" ")[2]);

			    if(isNaN(time)){
				room.sendAnnouncement(`${messages.Mute.InvalidNumber}`,player.id,colors.Mute.InvalidNumber,fonts.Mute.InvalidNumber,sounds.Mute.InvalidNumber);
				return false;
			    }
			    else{
				if(time < muteRange.Min || muteRange.Max < time){
				    room.sendAnnouncement(`${messages.Mute.OutOfRange}`,player.id,colors.Mute.OutOfRange,fonts.Mute.OutOfRange,sounds.Mute.OutOfRange);
				    return false;
				}
				else{
				    if(mutedAuths.includes(playerList[p.name].auth) == true){
					room.sendAnnouncement(`${messages.Mute.Already}`,player.id,colors.Mute.Already,fonts.Mute.Already,sounds.Mute.Already);
					return false;
				    }
				    else{
					room.sendAnnouncement(`${p.name} ${messages.Mute.Success[0]} ${player.name} ${messages.Mute.Success[1]} ${time} ${time == 1 ? "minute." : "minutes."}`,null,colors.Mute.Success,fonts.Mute.Success,sounds.Mute.Success);
					mutedAuths.push(playerList[p.name].auth);
					var pname = p.name;
					var pauth = playerList[pname].auth;
					setTimeout(function(){
					    if(mutedAuths.includes(pauth) == true){
						var index = mutedAuths.indexOf(pauth);
						mutedAuths.splice(index,1);
						room.sendAnnouncement(`${pname} ${messages.Unmute}`,null,colors.Unmute,fonts.Unmute,sounds.Unmute);
					    }
					},time*timeObject.Minutes);
					return false;
				    }
				}
			    }
			}
		    }
		}
	    }
	}
	else{
	    room.sendAnnouncement(`${messages.NoAuthorization.Mute}`,player.id,colors.NoAuthorization.Mute,fonts.NoAuthorization.Mute,sounds.NoAuthorization.Mute);
	    return false;
	}
    }
    else{
	if(player.admin == false && mutedAuths.includes(playerList[player.name].auth) == true){
	    room.sendAnnouncement(`${messages.Mute.Still} (${message})`,player.id,colors.Mute.AdminCanSee,fonts.Mute.AdminCanSee,sounds.Mute.AdminCanSee);
	    administrators.forEach(a => {
		room.sendAnnouncement(`[${playerMessages[Number(player.admin)]}] [${player.id}] ${player.name}: ${message}`,a.id,colors.Mute.Still,fonts.Mute.Still,sounds.Mute.Still);
	    });
	    return false;
	}

	room.sendAnnouncement(`[${playerMessages[Number(player.admin)]}] [${player.id}] ${player.name}: ${message}`,null,colors.Player[Number(player.admin)],fonts.Player[Number(player.admin)],sounds.Player[Number(player.admin)]);
	return false;
    }
}

room.onPlayerJoin = function(player){
    console.log(`${player.name} has joined`);

    room.sendAnnouncement(`${messages.Welcome}`,player.id,colors.Welcome,fonts.Welcome,sounds.Welcome);

    if(playerList[player.name] == undefined){
	playerList[player.name] = {name: player.name, auth: player.auth, conn: player.conn};
    }
    if(mutedAuths.includes(player.auth) == true){
	room.sendAnnouncement(`${messages.Mute.Still}`,player.id,colors.Mute.Still,fonts.Mute.Still,sounds.Mute.Still);
    }
}
