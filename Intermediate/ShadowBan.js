var playerList = {};
var shadowBanList = [];

var playerMessages = ["PLAYER", "ADMIN"];
var messagePrefix = "!";
var commands = ["!shadowban", "!unshadowban"];

var colors = {
    Danger: 0xFF0000,
    Warning: 0xFFFF00,
    Success: 0x00FF00,
    Info: 0xFFFF00,
    Light: 0xFFFF00,
    Player: [0xFFFFFF, 0xFFDB72]
};

var fonts = {
    Danger: "bold",
    Warning: "bold",
    Success: "normal",
    Info: "normal",
    Light: "normal",
    Player: ["normal", "bold"]
};

var sounds = {
    Danger: 2,
    Warning: 1,
    Success: 1,
    Info: 1,
    Light: 1,
    Player: [1, 1]
};

var messages = {
    Announcement: "Example announcement message.",
    Shadowban: {
        Admin: "You cannot shadowban an administrator!",
        Already: "This player is already shadowbanned!",
        InvalidID: "Invalid ID!",
        InvalidNumber: "Invalid number!",
        NoAuthorization: "You have no authorization to shadowban a player in this room!",
        NonExistentPart: "Too much arguments! Please use the command in the following format: !shadowban <ID>",
        NoSuchPlayer: "No such a player with the given ID!",
        Removal: "'s shadowban has been removed!",
        Self: "You cannot shadowban yourselves!",
        Success: "has been shadowbanned by"
    },
    Unshadowban: {
        Admin: "You cannot unshadowban an administrator!",
        Already: "This player is already unshadowbanned!",
        InvalidID: "Invalid ID!",
        InvalidNumber: "Invalid number!",
        NoAuthorization: "You have no authorization to unshadowban a player in this room!",
        NonExistentPart: "Too much arguments! Please use the command in the following format: !unshadowban <ID>",
        NoSuchPlayer: "No such a player with the given ID!",
        Removal: "'s unshadowban has been removed!",
        Self: "You cannot unshadowban yourselves!",
        Success: "has been unshadowbanned by"
    },
    Welcome: "Welcome!"
};

var room = HBInit({ roomName: "Shadow Ban", noPlayer: true, public: true, maxPlayers: 12 });

function findRelatedAccounts(auth, conn) {
    if (playerList.length == 0) return [];
    else return Object.values(playerList).filter(p => p.auth === auth);
}

function isCommand(string) {
    return string.startsWith(messagePrefix) == true && (commands.includes(string) == true || commands.includes(string.split(" ")[0]) == true);
}

room.onPlayerChat = function (player, message) {
    console.log(`${player.name}: ${message}`);
    if (isCommand(message) == true) {
        if (playerList[player.name].shadowBan == true) {
            return false;
        }
        else {
            if (player.admin == true) {
                let splitted = message.toLowerCase().split(" ");
                let command = splitted[0];
                let ID = parseInt(splitted[1]);
                let nonExistentPart = splitted[2];
                let whichCommand = command == commands[0] ? "Shadowban" : command == commands[1] ? "Unshadowban" : null;

                if (whichCommand == null) {
                    return false;
                }
                else {
                    if (isNaN(ID)) {
                        room.sendAnnouncement(`${messages[whichCommand].InvalidID}`, player.id, colors.Danger, fonts.Danger, sounds.Danger);
                        return false;
                    }
                    else {
                        var p = room.getPlayerList().find(x => x.id == ID);
                        if (!p) {
                            room.sendAnnouncement(`${messages[whichCommand].NoSuchPlayer}`, player.id, colors.Danger, fonts.Danger, sounds.Danger);
                            return false;
                        }
                        else {
                            if (p.id == player.id) {
                                room.sendAnnouncement(`${messages[whichCommand].Self}`, player.id, colors.Danger, fonts.Danger, sounds.Danger);
                                return false;
                            }
                            else {
                                if (p.admin == true) {
                                    room.sendAnnouncement(`${messages[whichCommand].Admin}`, player.id, colors.Danger, fonts.Danger, sounds.Danger);
                                    return false;
                                }
                                else {
                                    if (nonExistentPart) {
                                        room.sendAnnouncement(`${messages[whichCommand].NonExistentPart}`, player.id, colors.Danger, fonts.Danger, sounds.Danger);
                                        return false;
                                    }
                                    else {
                                        let check1 = whichCommand == "Shadowban" && shadowBanList.find(m => m.auth === playerList[p.name].auth || m.conn === playerList[p.name].conn);
                                        let check2 = whichCommand == "Unshadowban" && shadowBanList.find(m => m.auth === playerList[p.name].auth || m.conn === playerList[p.name].conn) == undefined;
                                        if (check1 || check2) {
                                            room.sendAnnouncement(`${messages[whichCommand].Already}`, player.id, colors.Warning, fonts.Warning, sounds.Warning);
                                            return false;
                                        }
                                        else {
                                            playerList[p.name].shadowBan = whichCommand == "Shadowban" ? true : false;
                                            if (whichCommand == "Shadowban") shadowBanList.push({ auth: playerList[p.name].auth, conn: playerList[p.name].conn });
                                            else if (whichCommand == "Unshadowban") {
                                                let index = shadowBanList.findIndex(m => m.auth === playerList[p.name].auth || m.conn === playerList[p.name].conn);
                                                if (index !== -1) shadowBanList.splice(index, 1);
                                            }
                                            var players = room.getPlayerList().filter(pp => Object.values(playerList).find(pl => pl.id == pp.id && pl.shadowBan == false));
                                            players.forEach(pp => {
                                                room.sendAnnouncement(`${p.name} ${messages[whichCommand].Success} ${player.name}`, pp.id, colors.Success, fonts.Success, sounds.Success);
                                                return false;
                                            });
                                            return false;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else {
                room.sendAnnouncement("Commands are only for the administration in this test scenario.", player.id, colors.Danger, fonts.Danger, sounds.Danger);
                return false;
            }
        }
    }
    else {
        if (playerList[player.name].shadowBan == true) {
            return false;
        }
        else {
            var players = room.getPlayerList().filter(p => Object.values(playerList).find(pl => pl.id == p.id && pl.shadowBan == false));
            players.forEach(p => {
                room.sendAnnouncement(`[${playerMessages[Number(player.admin)]}] [${player.id}] ${player.name}: ${message}`, p.id, colors.Player[Number(player.admin)], fonts.Player[Number(player.admin)], sounds.Player[Number(player.admin)]);
                return false;
            });
            return false;
        }
    }
}

room.onPlayerJoin = function (player) {
    console.log(`${player.name} has joined`);
    var relatedAccounts = findRelatedAccounts(player.auth, player.conn);

    if (relatedAccounts.length == 0) {
        playerList[player.name] = { id: player.id, name: player.name, auth: player.auth, conn: player.conn, shadowBan: false };
        room.sendAnnouncement(`${messages.Welcome}`, player.id, colors.Light, fonts.Light, sounds.Light);
    }
    else {
        playerList[player.name].id = player.id;
        if (shadowBanList.find(m => m.auth == player.auth)) {
            playerList[player.name].shadowBan = true;
        }
        if (playerList[player.name].shadowBan == false) {
            room.sendAnnouncement(`${messages.Welcome}`, player.id, colors.Light, fonts.Light, sounds.Light);
        }
    }
}

room.onPlayerLeave = function (player) {
    console.log(`${player.name} has left`);
}

var announcementInterval = setInterval(function () {
    var players = room.getPlayerList().filter(p => Object.values(playerList).find(pl => pl.id == p.id && pl.shadowBan == false));
    players.forEach(p => {
        room.sendAnnouncement(`${messages.Announcement}`, p.id, colors.Light, fonts.Light, sounds.Light);
    });
}, 60000);
