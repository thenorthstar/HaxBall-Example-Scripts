var rps = ["rock", "paper", "scissors"];
var command = "!rps";

var playerList = {};
var playerListArray = [];

var roomObject = {
    emojis: ["🪨", "📄", "✂️"],
    game: {
        limits: {
            lower: 100,
            upper: 300
        }
    },
    maxPlayers: 2,
    noPlayer: true,
    public: false,
    roomName: "🪨📄✂️ Rock - Paper - Scissors Game 🪨📄✂️"
};

var colors = {
    Chat: {
        Player: [0xFFFFFF, 0xFFDB72],
        RPS: {
            Fail: 0xFF0000,
            Invalid: 0xFFFF00,
            OutOfRange: 0xFFFF00,
            Success: 0x00FF00
        }
    }
};

var fonts = {
    Chat: {
        Player: ["normal", "bold"],
        RPS: {
            Fail: "bold",
            Invalid: "bold",
            OutOfRange: "bold",
            Success: "normal"
        }
    }
};

var sounds = {
    Chat: {
        Player: [1, 1],
        RPS: {
            Fail: 2,
            Invalid: 2,
            OutOfRange: 2,
            Success: 1
        }
    }
};

var messages = {
    Chat: {
        Player: ["PLAYER", "ADMIN"],
        RPS: {
            Fail: ["You have failed! You have lost", "points"],
            Invalid: "Invalid value! Please try again.",
            OutOfRange: `Invalid point! The given point must be between ${roomObject.game.limits.lower} and ${roomObject.game.limits.upper} with a value multiple of 100.`,
            Success: ["Congratulations! You have won! You have gained", "points"]
        }
    }
};

var room = HBInit({ roomName: roomObject.roomName, noPlayer: roomObject.noPlayer, public: roomObject.public, maxPlayers: roomObject.maxPlayers });

function getPreviousAccounts(player) {
    return playerListArray.filter(p => p.auth == player.auth || p.conn == player.conn);
}

function getRandomInteger(length) {
    return Math.floor(Math.random() * length);
}

function getResult(check, response) {
    return (check.toLowerCase() === rps[0] && response.toLowerCase() === rps[2]) || (check.toLowerCase() === rps[1] && response.toLowerCase() === rps[0]) || (check.toLowerCase() === rps[2] && response.toLowerCase() === rps[1]);
}

function updatePlayerPoint(player, point) {
    playerList[player.name].points += point;
}

room.onPlayerChat = function (player, message) {
    if (message.toLowerCase().split(" ")[0] == command) {
        var check = message.toLowerCase().split(" ")[1];
        var index = rps.indexOf(check);
        if (index === -1) {
            room.sendAnnouncement(`${messages.Chat.RPS.Invalid}`, player.id, colors.Chat.RPS.Invalid, fonts.Chat.RPS.Invalid, sounds.Chat.RPS.Invalid);
            return false;
        }
        else {
            var point = parseInt(message.toLowerCase().split(" ")[2]);
            if (isNaN(point)) {
                room.sendAnnouncement(`${messages.Chat.RPS.OutOfRange}`, player.id, colors.Chat.RPS.OutOfRange, fonts.Chat.RPS.OutOfRange, sounds.Chat.RPS.OutOfRange);
                return false;
            }
            else {
                if (point < roomObject.game.limits.lower || roomObject.game.limits.upper < point || point % 100 != 0) {
                    room.sendAnnouncement(`${messages.Chat.RPS.OutOfRange}`, player.id, colors.Chat.RPS.OutOfRange, fonts.Chat.RPS.OutOfRange, sounds.Chat.RPS.OutOfRange);
                    return false;
                }
                else {
                    var randomInt = getRandomInteger(rps.length);
                    var response = rps[randomInt];
                    if (getResult(check, response) == false) {
                        room.sendAnnouncement(`${messages.Chat.RPS.Fail[0]} ${point} ${messages.Chat.RPS.Fail[1]} (${roomObject.emojis[index]} 🆚 ${roomObject.emojis[randomInt]})`, player.id, colors.Chat.RPS.Fail, fonts.Chat.RPS.Fail, sounds.Chat.RPS.Fail);
                        updatePlayerPoint(player, -point);
                        return false;
                    }
                    else {
                        room.sendAnnouncement(`${messages.Chat.RPS.Success[0]} ${point} ${messages.Chat.RPS.Success[1]} (${roomObject.emojis[index]} 🆚 ${roomObject.emojis[randomInt]})`, player.id, colors.Chat.RPS.Success, fonts.Chat.RPS.Success, sounds.Chat.RPS.Success);
                        updatePlayerPoint(player, point);
                        return false;
                    }
                }
            }
        }
    }
    else {
        room.sendAnnouncement(`(${new Date(Date.now()).toLocaleString()}) [${playerList[player.name].points}] [${messages.Chat.Player[Number(player.admin)]}] ${player.name} #${player.id}: ${message}`, null, colors.Chat.Player[Number(player.admin)], fonts.Chat.Player[Number(player.admin)], sounds.Chat.Player[Number(player.admin)]);
        return false;
    }
}

room.onPlayerJoin = function (player) {
    var accounts = getPreviousAccounts(player);

    if (playerList[player.name] == undefined) {
        if (accounts.length == 0) {
            playerList[player.name] = { name: player.name, auth: player.auth, conn: player.conn, points: 600 };
        }
        else {
            var lastAccount = accounts[accounts.length - 1];
            playerList[player.name] = { name: player.name, auth: player.auth, conn: player.conn, points: lastAccount.points };
        }
    }
    else {
        if (accounts.length == 0) {
            playerList[player.name] = { name: player.name, auth: player.auth, conn: player.conn, points: 600 }; //A rare situation, theorically it's almost impossible to happen.
        }
        else {
            var lastAccount = accounts[accounts.length - 1];
            playerList[player.name] = { name: player.name, auth: player.auth, conn: player.conn, points: lastAccount.points };
        }
    }

    playerListArray.push(playerList[player.name]);
}
