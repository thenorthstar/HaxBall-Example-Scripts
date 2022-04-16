var messageBlocks = {};
var ignoreCommands = ["!chatoff","!chaton"];

var ignoreSetMessages = [
    "You can't ignore your own messages",
    " has been ignored successfully. You won't see their messages.",
    "This player is already ignored.",
    "There's no such a player with the given ID.",
];
var ignoreRemovalMessages = [
    "This operation cannot be executed on yourselves.",
    "'s ignore status has been removed. You can now see their messages.",
    "This player is not in your ignore list.",
    "There's no such a player with the given ID."
]

var ignoreMessageSets = [ignoreSetMessages,ignoreRemovalMessages];

var colors = [0xFFFF00,0x00FF00,0xFFFF00,0xFF0000,0xFFFFFF,0x97FFFF];
var fonts = ["bold","bold","bold","bold","bold","bold"];
var sounds = [2,1,2,2,1,1];

var room = HBInit({roomName:"Ignore Messages from Certain Players",noPlayer:true,public:false,maxPlayers:12});

room.onPlayerJoin = function(player){
    console.log(`${player.name} has joined`);
    if(messageBlocks[player.name] == undefined){
	messageBlocks[player.name] = {name: player.name, blocking: []};
    }
}

room.onPlayerChat = function(player,message){
    console.log(`${player.name}: ${message}`);
    var players = room.getPlayerList();
    var recipients = players.filter(p => messageBlocks[p.name].blocking.includes(player.id) == false);
    var command = message.toLowerCase().split(" ")[0];

    if(ignoreCommands.includes(command) == true){
	var index = ignoreCommands.indexOf(command);
	var ID = parseInt(message.toLowerCase().split(" ")[1]);
	var p = players.find(x => x.id == ID);

	if(p){
	    if(p.id == player.id){
		room.sendAnnouncement(`${ignoreMessageSets[index][0]} (ID: ${ID})`,player.id,colors[0],fonts[0],sounds[0]);
		return false;
	    }
	    else{
		if(messageBlocks[player.name].blocking.includes(p.id) == false){
		    if(index == 0){
			messageBlocks[player.name].blocking.push(p.id);
			room.sendAnnouncement(`${p.name}${ignoreMessageSets[index][1]} (ID: ${ID})`,player.id,colors[1],fonts[1],sounds[1]);
			return false;
		    }
		    else if(index == 1){
			room.sendAnnouncement(`${ignoreMessageSets[index][2]} (ID: ${ID})`,player.id,colors[2],fonts[2],sounds[2]);
			return false;
		    }
		    else{
			console.log("Error");
			return false;
		    }
		}
		else{
		    if(index == 0){
			room.sendAnnouncement(`${ignoreMessageSets[index][2]} (ID: ${ID})`,player.id,colors[2],fonts[2],sounds[2]);
			return false;
		    }
		    else if(index == 1){
			var i = messageBlocks[player.name].blocking.indexOf(p.id);
			messageBlocks[player.name].blocking.splice(i,1);
			room.sendAnnouncement(`${p.name}${ignoreMessageSets[index][1]} (ID: ${ID})`,player.id,colors[1],fonts[1],sounds[1]);
			return false;
		    }
		    else{
			console.log("Error");
			return false;
		    }
		}
	    }
	}
	else{
	    room.sendAnnouncement(`${ignoreMessageSets[index][3]} (ID: ${ID})`,player.id,colors[3],fonts[3],sounds[3]);
	    return false;
	}
    }
    else{
	if(player.admin == false){
	    recipients.forEach(p => {
		room.sendAnnouncement(`${player.name}: ${message}`,p.id,colors[4],fonts[4],sounds[4]);
	    });
	    return false;
	}
	else{
	    recipients.forEach(p => {
		room.sendAnnouncement(`${player.name}: ${message}`,p.id,colors[5],fonts[5],sounds[5]);
	    });
	    return false;
	}
    }
}
