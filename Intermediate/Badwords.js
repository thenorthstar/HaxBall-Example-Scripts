var playerList = {};
var playerListArray = [];

var badwords = [/[a4@][s$5][s$5]h[o0][l1][e€]+/, /[bß][a4@]rm[iy7]+/, /[bß][a4@][s$5][t₺][a4@]rd+/, /[bß][ıi1][t₺][cç¢]h+/, /[c¢]un[t₺]+/, /f[uü][cç¢]k+/, /[l1]m[a4@][o0]+/, /[l1]mf[a4@][o0]+/, /pu[s5$][s5$][y7]+/, /r[e€][t₺][a4@]rd+/, /[s$5][t₺]fu+/, /wh[o0]r[e€]+/, /w[t₺]f+/];

var roomObject = {
    limits: {
        Chat: {
            Badwords: 2
        }
    },
    maxPlayers: 12,
    name: "Bad words",
    noPlayer: true,
    public: true,
    timeout: {
        Chat: {
            Badwords: 600000
        }
    }
};

var colors = {
    Chat: {
        Admin: {
            Badwords: 0xFF8000,
            Muted: 0xFFFF00
        },
        Badwords: {
            Mute: 0xFF0000,
            Unmute: 0x00FF00,
        },
        Mute: {
            Still: 0xFFFF00
        },
        Player: [0xFFFFFF, 0xFFDB72]
    },
    Join: {
        Muted: 0xFFFF00,
        Welcome: 0xFFFFFF
    },
};

var fonts = {
    Chat: {
        Admin: {
            Badwords: "bold",
            Muted: "bold"
        },
        Badwords: {
            Mute: "bold",
            Unmute: "normal",
        },
        Mute: {
            Still: "bold"
        },
        Player: ["normal", "bold"]
    },
    Join: {
        Muted: "bold",
        Welcome: "normal"
    },
};

var sounds = {
    Chat: {
        Admin: {
            Badwords: 2,
            Muted: 1
        },
        Badwords: {
            Mute: 2,
            Unmute: 1,
        },
        Mute: {
            Still: 2
        },
        Player: [1, 1]
    },
    Join: {
        Muted: 2,
        Welcome: 1
    }
};

var messages = {
    Chat: {
        Badwords: {
            Kick: "You were banned for keeping using bad words.",
            Mute: `was muted for ${roomObject.timeout.Chat.Badwords / 60000 == 1 ? roomObject.timeout.Chat.Badwords / 60000 + " minute. A further attempt will result in ban!" : roomObject.timeout.Chat.Badwords / 60000 + " minutes. A further attempt will result in ban!"}`,
            Unmute: "is now unmuted!"
        },
        Mute: {
            Still: "You are still muted! Only the administration can see your messages."
        }
    },
    Join: {
        Blacklisted: "You are banned forever!",
        Muted: "You have an active mute punishment so you cannot talk before your punishment ends.",
        Welcome: "Welcome!"
    }
};

var kickTypes = {
    Chat: {
        Badwords: true
    },
    Join: {
        Blacklisted: true
    }
};

var room = HBInit({ roomName: roomObject.name, noPlayer: roomObject.noPlayer, public: roomObject.public, maxPlayers: roomObject.maxPlayers });

function getPreviousAccounts(player) {
    return playerListArray.length > 0 && playerListArray.filter(p => p.auth == player.auth || p.conn == player.conn);
}

function isBadword(str) {
    return badwords.filter(b => str.match(b)).length > 0;
}

room.onPlayerChat = function (player, message) {
    var administrators = room.getPlayerList().filter(p => p.admin == true);

    if (isBadword(message) == true) {
        playerList[player.name].badwords++;
        if (playerList[player.name].badwords < roomObject.limits.Chat.Badwords) {
            if (playerList[player.name].muted == false) {
                var name = player.name;
                administrators.forEach(p => {
                    room.sendAnnouncement(`${player.name}: ${message}`, p.id, colors.Chat.Admin.Badwords, fonts.Chat.Admin.Badwords, sounds.Chat.Admin.Badwords);
                });
                room.sendAnnouncement(`${name} ${messages.Chat.Badwords.Mute}`, null, colors.Chat.Badwords.Mute, fonts.Chat.Badwords.Mute, sounds.Chat.Badwords.Mute);
                playerList[name].muted = true;

                setTimeout(function () {
                    if (playerList[name].muted == true) {
                        playerList[name].muted = false;
                        room.sendAnnouncement(`${player.name} ${messages.Chat.Badwords.Unmute}`, null, colors.Chat.Badwords.Unmute, fonts.Chat.Badwords.Unmute, sounds.Chat.Badwords.Unmute);
                    }
                }, roomObject.timeout.Chat.Badwords);
            }
            return false;
        }
        else {
            room.kickPlayer(player.id, `${messages.Chat.Badwords.Kick}`, kickTypes.Chat.Badwords);
            return false;
        }
    }
    if (playerList[player.name].muted == true) {
        room.sendAnnouncement(`${messages.Chat.Mute.Still} (${message})`, player.id, colors.Chat.Mute.Still, fonts.Chat.Mute.Still, sounds.Chat.Mute.Still);
        administrators.forEach(p => {
            room.sendAnnouncement(`${player.name}: ${message}`, p.id, colors.Chat.Admin.Muted, fonts.Chat.Admin.Muted, sounds.Chat.Admin.Muted);
        });
        return false;
    }
    else if (playerList[player.name].muted == false) {
        room.sendAnnouncement(`${player.name}: ${message}`, null, colors.Chat.Player[Number(player.admin)], fonts.Chat.Player[Number(player.admin)], sounds.Chat.Player[Number(player.admin)]);
        return false;
    }
}

room.onPlayerJoin = function (player) {
    if (playerList[player.name] == undefined) {
        playerList[player.name] = { name: player.name, auth: player.auth, conn: player.conn, muted: false, badwords: 0 };
    }
    var accounts = getPreviousAccounts(player);
    if (accounts.length > 0) {
        var blacklisted = accounts.filter(a => a.badwords >= roomObject.limits.Chat.Badwords);
        var muted = accounts.filter(a => a.muted == true);

        if (blacklisted.length > 0) {
            room.kickPlayer(player.id, `${messages.Join.Blacklisted}`, kickTypes.Join.Blacklisted);
        }
        else if (muted.length > 0) {
            room.sendAnnouncement(`${messages.Join.Muted}`, player.id, colors.Join.Muted, fonts.Join.Muted, sounds.Join.Muted);
            playerList[player.name].muted = true;
        }
    }

    playerListArray.push(playerList[player.name]);
    room.sendAnnouncement(`${messages.Join.Welcome}`, player.id, colors.Join.Welcome, fonts.Join.Welcome, sounds.Join.Welcome);
}
