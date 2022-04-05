var colors = {
    Chat: {
        Admin: {
            Collision: [0x00FF00, 0x00FF00]
        },
        Commands: [0xFFFFFF, 0xFFFFFF],
        NoAuthorization: {
            Collision: [0xFF0000, 0xFF0000]
        },
        NotACommand: 0xFF0000,
        Player: [0xFFFFFF, 0xFFDB72],
        SomethingWentWrong: {
            Commands: 0xFFFF00
        }
    },
    Join: {
        Welcome: 0xFFFFFF
    }
};

var fonts = {
    Chat: {
        Admin: {
            Collision: ["normal", "normal"]
        },
        Commands: ["normal", "normal"],
        NoAuthorization: {
            Collision: ["bold", "bold"]
        },
        NotACommand: "bold",
        Player: ["normal", "bold"],
        SomethingWentWrong: {
            Commands: "bold"
        }
    },
    Join: {
        Welcome: "normal"
    }
};

var sounds = {
    Chat: {
        Admin: {
            Collision: [1, 1]
        },
        Commands: [1, 1],
        NoAuthorization: {
            Collision: [2, 2]
        },
        NotACommand: 2,
        Player: [1, 1],
        SomethingWentWrong: {
            Commands: 1
        }
    },
    Join: {
        Welcome: 1
    }
};

var roomObject = {
    collision: true,
    commandPrefix: "!",
    maxPlayers: 20,
    name: "Collision Feature",
    noPlayer: true,
    password: null,
    public: true,
    recaptcha: false,
    scoreLimit: 0,
    teamsLock: true,
    timeLimit: 0,
    token: null
};

var messages = {
    Chat: {
        Admin: {
            Collision: ["Collision feature was deactivated!", "Collision feature was activated!"]
        },
        Commands: ["Available commands: !admin, !commands", "Available commands: !admin, !collision, !commands"],
        NoAuthorization: {
            Collision: ["You have no authorization to activate the collision feature!", "You have no authorization to deactivate on the collision feature!"]
        },
        NotACommand: "There's no such a command. Type !commands to see commands.",
        SomethingWentWrong: {
            Commands: "Something went wrong with this command. Please try again."
        }
    },
    Join: {
        Welcome: "Welcome!"
    }
};

var commands = ["!admin", "!collision", "!commands"];

var room = HBInit({ roomName: roomObject.name, noPlayer: roomObject.noPlayer, public: roomObject.public, maxPlayers: roomObject.maxPlayers });

var cf = room.CollisionFlags;
var pushOff_cGroups = [cf.c0, cf.c1];
var pushOn_cGroups = [cf.red, cf.blue];
var push_cGroups = [pushOff_cGroups, pushOn_cGroups];
var cGroups = [pushOff_cGroups, pushOn_cGroups];

var chatFunctions = [chat_admin, chat_collision, chat_commands];

function chat_admin(player, message) {
    if (message.split(" ")[0] == commands[0]) {
        room.setPlayerAdmin(player.id, !player.admin);
        return false;
    }
}

function chat_collision(player, message) {
    if (message.split(" ")[0] == commands[1]) {
        if (player.admin == true) {
            roomObject.collision = !roomObject.collision;
            var players = room.getPlayerList().filter(p => room.getPlayerDiscProperties(p.id) != null && room.getPlayerDiscProperties(p.id).cGroup != push_cGroups[Number(roomObject.collision)][p.team - 1]);
            players.forEach(p => room.setPlayerDiscProperties(p.id, { cGroup: push_cGroups[Number(roomObject.collision)][p.team - 1] }));       
            room.sendAnnouncement(`${messages.Chat.Admin.Collision[Number(roomObject.collision)]}`, player.id, colors.Chat.Admin.Collision[Number(roomObject.collision)], fonts.Chat.Admin.Collision[Number(roomObject.collision)], sounds.Chat.Admin.Collision[Number(roomObject.collision)]);
            return false;
        }
        else {
            room.sendAnnouncement(`${messages.Chat.NoAuthorization.Collision[Number(roomObject.collision)]}`, player.id, colors.Chat.NoAuthorization.Collision[Number(roomObject.collision)], fonts.Chat.NoAuthorization.Collision[Number(roomObject.collision)], sounds.Chat.NoAuthorization.Collision[Number(roomObject.collision)]);
            return false;
        }
    }
}

function chat_commands(player, message) {
    if (message.split(" ")[0] == commands[2]) {
        room.sendAnnouncement(`${messages.Chat.Commands[Number(player.admin)]}`, player.id, colors.Chat.Commands[Number(player.admin)], fonts.Chat.Commands[Number(player.admin)], sounds.Chat.Commands[Number(player.admin)]);
        return false;
    }
}

function isCommand(string) {
    return commands.includes(string) == true || commands.includes(string.split(" ")[0]) == true;
}

function resetCollisions(){
    var players = room.getPlayerList().filter(p => room.getPlayerDiscProperties(p.id) != null && room.getPlayerDiscProperties(p.id).cGroup != push_cGroups[Number(roomObject.collision)][p.team - 1]);
    players.forEach(p => room.setPlayerDiscProperties(p.id, { cGroup: push_cGroups[Number(roomObject.collision)][p.team - 1] }));
}

room.onGameStart = function(byPlayer){
    resetCollisions();
}

room.onPlayerChat = function (player, message) {
    console.log(`${player.name}: ${message}`);

    if (message.startsWith(roomObject.commandPrefix) == true) {
        if (isCommand(message) == true) {
            var index = commands.indexOf(message.split(" ")[0]);
            index !== -1 ? chatFunctions[index](player, message) : room.sendAnnouncement(`${messages.Chat.SomethingWentWrong.Commands}`, player.id, colors.Chat.SomethingWentWrong.Commands, fonts.Chat.SomethingWentWrong.Commands, sounds.Chat.SomethingWentWrong.Commands);
            return false;
        }
        else {
            room.sendAnnouncement(`${messages.Chat.NotACommand}`, player.id, colors.Chat.NotACommand, fonts.Chat.NotACommand, sounds.Chat.NotACommand);
            return false;
        }
    }
    else {
        room.sendAnnouncement(`${player.name}: ${message}`, null, colors.Chat.Player[Number(player.admin)], fonts.Chat.Player[Number(player.admin)], sounds.Chat.Player[Number(player.admin)]);
        return false;
    }
}
