var commandPrefix = "!";
var commands = [["!commands", 0, false], ["!size", 1, true]]; //[command,usage bound,available during the game]; 0 means unlimited usage.
var playerList = {};
var playerListArray = [];
var radiusBounds = { Lower: 1, Upper: 100 };

var colors = {
    onPlayerChat: {
        Commands: [0xFFFFFF, 0xFFDB72],
        GameNotActive: 0xFFFF00,
        Invalid: {
            Number: 0xFFFF00,
            OutOfBounds: 0xFFFF00
        },
        IsNotACommand: 0xFF0000,
        NotInGame: 0xFF0000,
        Player: [0xFFFFFF, 0xFFDB72],
        Size: {
            Fail: {
                RightExpired: 0xFF0000
            },
            Success: 0x00FF00
        }
    }
};

var fonts = {
    onPlayerChat: {
        Commands: ["normal", "bold"],
        GameNotActive: "bold",
        Invalid: {
            Number: "bold",
            OutOfBounds: "bold"
        },
        IsNotACommand: "bold",
        NotInGame: "bold",
        Player: ["normal", "bold"],
        Size: {
            Fail: {
                RightExpired: "bold"
            },
            Success: "normal"
        }
    }
};

var sounds = {
    onPlayerChat: {
        Commands: [1, 1],
        GameNotActive: 2,
        Invalid: {
            Number: 1,
            OutOfBounds: 1
        },
        IsNotACommand: 2,
        NotInGame: 2,
        Player: [1, 1],
        Size: {
            Fail: {
                RightExpired: 2
            },
            Success: 1
        }
    }
};

var messages = {
    onPlayerChat: {
        Commands: ["Available Commands: !commands, !size", "Available Commands: !commands, !size"], //Can also be done dynamically with different arrays for player/admin.
        GameNotActive: "The feature will be available when the game is running.",
        Invalid: {
            Number: "The value you have typed is not a number.",
            OutOfBounds: `The input value is invalid. Please type a number between ${radiusBounds.Lower} and ${radiusBounds.Upper}.`
        },
        IsNotACommand: "is not a command. Please type !commands to see available command list.",
        NotInGame: "You cannot use this property unless you are actively playing.",
        Player: ["[PLAYER]", "[ADMIN]"],
        Size: {
            Fail: {
                RightExpired: "Your right for sizing radiuses has expired. Please try it in another match."
            },
            Success: "Your radius set to"
        }
    }
};

var roomObject = {
    maxPlayers: 2,
    noPlayer: true,
    public: true,
    roomName: "Radius Setting with Command Usage",
};

var room = HBInit({ roomName: roomObject.roomName, noPlayer: roomObject.noPlayer, public: roomObject.public, maxPlayers: roomObject.maxPlayers });

var chatFunctions = [chat_commands, chat_size];

function chat_commands(player, message) {
    room.sendAnnouncement(`${messages.onPlayerChat.Commands[Number(player.admin)]}`, player.id, colors.onPlayerChat.Commands[Number(player.admin)], fonts.onPlayerChat.Commands[Number(player.admin)], sounds.onPlayerChat.Commands[Number(player.admin)]);
    return false;
}

function chat_size(player, message) {
    var value = message.split(" ")[1];
    if (isNaN(value)) {
        room.sendAnnouncement(`${messages.onPlayerChat.Invalid.Number}`, player.id, colors.onPlayerChat.Invalid.Number, fonts.onPlayerChat.Invalid.Number, sounds.onPlayerChat.Invalid.Number);
        return false;
    }
    else {
        if (ifRadiusOutOfBounds(value, radiusBounds.Lower, radiusBounds.Upper) == true) {
            room.sendAnnouncement(`${messages.onPlayerChat.Invalid.OutOfBounds}`, player.id, colors.onPlayerChat.Invalid.OutOfBounds, fonts.onPlayerChat.Invalid.OutOfBounds, sounds.onPlayerChat.Invalid.OutOfBounds);
            return false;
        }
        else {
            if (ifPlayerIsInGame(player) == false) {
                room.sendAnnouncement(`${messages.onPlayerChat.NotInGame}`, player.id, colors.onPlayerChat.NotInGame, fonts.onPlayerChat.NotInGame, sounds.onPlayerChat.NotInGame);
                decreaseCommandUsages(player,1);
                return false;
            }
            else {
                setPlayerRadius(player,value);
                room.sendAnnouncement(`${messages.onPlayerChat.Size.Success} ${value}`, player.id, colors.onPlayerChat.Size.Success, fonts.onPlayerChat.Size.Success, sounds.onPlayerChat.Size.Success);
                return false;
            }
        }
    }
}

function decreaseCommandUsages(player,index) {
    if (playerList[player.name].commandUsages[index][0] > 0) {
        playerList[player.name].commandUsages[index][0]--;
    }
}

function handleCommandUsageBounds(player, message, index, bound) {
    if (playerList[player.name].commandUsages[index] > 0) {
        if (playerList[player.name].commandUsages[index][0] < bound) {
            chatFunctions[index](player, message);
        }
        else {
            if (playerList[player.name].commandUsages[index][1] == false) {
                playerList[player.name].commandUsages[index][1] = true;
            }
        }
    }
}

function ifPlayerIsInGame(player) {
    return room.getPlayerDiscProperties(player.id) != null;
}

function ifRadiusOutOfBounds(radius, lowerBound, upperBound) {
    return radius < lowerBound || upperBound < radius;
}

function increaseCommandUsages(player, message, index, bound) {
    if (isCommand(message) == true) {
        if (playerList[player.name].commandUsages[index][0] < bound) {
            playerList[player.name].commandUsages[index][0]++;
        }
        handleCommandUsageBounds(player, message, index, commands[index][1]);
    }
}

function isCommand(message) {
    return commands.filter(c => c[0] == message || c[0] == message.split(" ")[0]).length == 1;
}

function resetCommandUsages(player) {
    playerList[player.name].commandUsages.forEach(c => {
        c[0] = 0;
        c[1] = false;
    });
}

function setPlayerRadius(player, radius) {
    if (ifPlayerIsInGame(player) == true) {
        room.setPlayerDiscProperties(player.id, { radius: radius });
    }
}

room.onGameStart = function (byPlayer) {
    room.getPlayerList().forEach(p => resetCommandUsages(p));
}

room.onPlayerChat = function (player, message) {
    if (message.startsWith(commandPrefix) == true) {
        if (isCommand(message) == true) {
            var index = commands.findIndex(c => c[0] == message || c[0] == message.split(" ")[0]);
            if (index === -1) {
                room.sendAnnouncement(`${messages.onPlayerChat.IsNotACommand}`, player.id, colors.onPlayerChat.IsNotACommand, fonts.onPlayerChat.IsNotACommand, sounds.onPlayerChat.IsNotACommand);
                return false;
            }
            else {
                if (commands[index][2] == false) {
                    chatFunctions[index](player, message);
                    return false;
                }
                else {
                    if (room.getScores() == null) {
                        room.sendAnnouncement(`${messages.onPlayerChat.GameNotActive}`, player.id, colors.onPlayerChat.GameNotActive, fonts.onPlayerChat.GameNotActive, sounds.onPlayerChat.GameNotActive);
                        return false;
                    }
                    else {
                        increaseCommandUsages(player, message, index, commands[index][1]);
                        return false;
                    }
                }
            }
        }
        else {
            room.sendAnnouncement(`${messages.onPlayerChat.IsNotACommand}`, player.id, colors.onPlayerChat.IsNotACommand, fonts.onPlayerChat.IsNotACommand, sounds.onPlayerChat.IsNotACommand);
            return false;
        }
    }
    else {
        room.sendAnnouncement(`${messages.onPlayerChat.Player[Number(player.admin)]}[${player.name}]: ${message}`, null, colors.onPlayerChat.Player[Number(player.admin)], fonts.onPlayerChat.Player[Number(player.admin)], sounds.onPlayerChat.Player[Number(player.admin)]);
        return false;
    }
}

room.onPlayerJoin = function (player) {
    if (playerList[player.name] == undefined) {
        playerList[player.name] = { name: player.name, id: player.id, auth: player.auth, conn: player.conn, commandUsages: [] };
        for (var c = 0; c < commands.length; c++) {
            playerList[player.name].commandUsages.push([0, false]);
        }
    }
}

//YET TO BE TESTED!!!
