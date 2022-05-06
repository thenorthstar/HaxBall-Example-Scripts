var rps = ["rock", "paper", "scissors"];
var command = "!rps";

var colors = {
    Chat: {
        RPS: {
            Fail: 0xFF0000,
            Invalid: 0xFFFF00,
            Success: 0x00FF00
        }
    }
};

var fonts = {
    Chat: {
        RPS: {
            Fail: "bold",
            Invalid: "bold",
            Success: "normal"
        }
    }
};

var sounds = {
    Chat: {
        RPS: {
            Fail: 2,
            Invalid: 2,
            Success: 1
        }
    }
};

var messages = {
    Chat: {
        RPS: {
            Fail: "You have failed!",
            Invalid: "Invalid value! Please try again.",
            Success: "Congratulations! You have won!"
        }
    }
};

var roomObject = {
    emojis: ["🪨", "📄", "✂️"],
    maxPlayers: 2,
    noPlayer: true,
    public: true,
    roomName: "🪨📄✂️ Rock - Paper - Scissors Game 🪨📄✂️"
};

var room = HBInit({ roomName: roomObject.roomName, noPlayer: roomObject.noPlayer, public: roomObject.public, maxPlayers: roomObject.maxPlayers });

function getRandomInteger(length) {
    return Math.floor(Math.random() * length);
}

function getResult(check, response) {
    return (check.toLowerCase() === rps[0] && response.toLowerCase() === rps[2]) || (check.toLowerCase() === rps[1] && response.toLowerCase() === rps[0]) || (check.toLowerCase() === rps[2] && response.toLowerCase() === rps[1]);
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
            var randomInt = getRandomInteger(rps.length);
            var response = rps[randomInt];
            if (getResult(check, response) == false) {
                room.sendAnnouncement(`${messages.Chat.RPS.Fail} (${roomObject.emojis[index]} 🆚 ${roomObject.emojis[randomInt]})`, player.id, colors.Chat.RPS.Fail, fonts.Chat.RPS.Fail, sounds.Chat.RPS.Fail);
                return false;
            }
            else {
                room.sendAnnouncement(`${messages.Chat.RPS.Success} (${roomObject.emojis[index]} 🆚 ${roomObject.emojis[randomInt]})`, player.id, colors.Chat.RPS.Success, fonts.Chat.RPS.Success, sounds.Chat.RPS.Success);
                return false;
            }
        }
    }
}
