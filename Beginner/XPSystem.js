var playerList = {};
var playerListArray = [];

var roomObject = {
    commandPrefix: "!",
    maxPlayers: 12,
    name: "XP System",
    noPlayer: true,
    password: null,
    public: true,
    recaptcha: false,
    scoreLimit: 3,
    scoreSeparator: "-",
    teamsLock: true,
    timeLimit: 1,
    token: null,
    xpSessionFeatureActive: true,
    xpSession: false,
    xpUpdate: {
        lose: -1,
        win: 1
    }
};

var timeoutObject = {
    xpSession: 15000
};

var toleranceObject = {
    xpSession: {
        multiplier: {
            least: 1,
            most: 5
        }
    }
};

var colors = {
    Chat: {
        Admin: {
            Bets: {
                Inactive: 0xFF0000,
                Info: 0x00FFFF,
                List: 0xFFFFFF,
                NoBets: 0xFFFF00
            },
            XPSession: [0x00FF00, 0x00FF00]
        },
        Betting: {
            Already: 0xFF0000,
            InvalidMultiplier: 0xFFFF00,
            InvalidScore: 0xFFFF00,
            InvalidTeamID: 0xFFFF00,
            NoTeams: 0xFF0000,
            Success: 0x00FF00,
            Timeout: 0xFF0000
        },
        Commands: [0xFFFFFF, 0xFFFFFF],
        NoAuthorization: {
            Bets: 0xFF0000,
            XPSession: [0xFF0000, 0xFF0000]
        },
        NotACommand: 0xFF0000,
        Player: [0xFFFFFF, 0xFFDB72],
        SomethingWentWrong: {
            Commands: 0xFFFF00,
            Stats: 0xFFFF00
        },
        Statistics: {
            Info: 0x0000FF,
            List: 0xFFFFFF
        },
    },
    Join: {
        Welcome: 0xFFFFFF
    },
    Start: {
        XPSession: {
            Inactive: 0xFFFFFF,
            Start: 0xFFFF00,
            Stop: 0xFFFF00,
            Unavailable: 0xFF8000,
        }
    },
    Victory: {
        Betting: {
            Lose: 0xFF0000,
            Win: 0x00FF00
        }
    }
};

var fonts = {
    Chat: {
        Admin: {
            Bets: {
                Inactive: "bold",
                Info: "normal",
                List: "normal",
                NoBets: "bold"
            },
            XPSession: ["normal", "normal"]
        },
        Betting: {
            Already: "bold",
            InvalidMultiplier: "bold",
            InvalidScore: "bold",
            InvalidTeamID: "bold",
            NoTeams: "bold",
            Success: "normal",
            Timeout: "bold"
        },
        Commands: ["normal", "normal"],
        NoAuthorization: {
            Bets: "bold",
            XPSession: ["bold", "bold"]
        },
        NotACommand: "bold",
        Player: ["normal", "bold"],
        SomethingWentWrong: {
            Commands: "bold",
            Stats: "bold"
        },
        Statistics: {
            Info: "normal",
            List: "normal"
        },
    },
    Join: {
        Welcome: "normal"
    },
    Start: {
        XPSession: {
            Inactive: "normal",
            Start: "bold",
            Stop: "bold",
            Unavailable: "normal",
        }
    },
    Victory: {
        Betting: {
            Lose: "normal",
            Win: "normal"
        }
    }
};

var sounds = {
    Chat: {
        Admin: {
            Bets: {
                Inactive: 2,
                Info: 1,
                List: 0,
                NoBets: 2
            },
            XPSession: [1, 1]
        },
        Betting: {
            Already: 2,
            InvalidMultiplier: 2,
            InvalidScore: 2,
            InvalidTeamID: 2,
            NoTeams: 2,
            Success: 1,
            Timeout: 2
        },
        Commands: [1, 1],
        NoAuthorization: {
            Bets: 2,
            XPSession: [2, 2]
        },
        NotACommand: 2,
        Player: [1, 1],
        SomethingWentWrong: {
            Commands: 1,
            Stats: 1
        },
        Statistics: {
            Info: 1,
            List: 0
        },
    },
    Join: {
        Welcome: 1
    },
    Start: {
        XPSession: {
            Inactive: 0,
            Start: 2,
            Stop: 2,
            Unavailable: 1
        }
    },
    Victory: {
        Betting: {
            Lose: 1,
            Win: 1
        }
    }
};

var messages = {
    Chat: {
        Admin: {
            Bets: {
                Inactive: "Bets couldn't be listed as the betting session is currently inactive.",
                Info: "Current list of bets below:\n",
                NoBets: "There are no bets currently done!"
            },
            XPSession: ["Betting session feature was deactivated!", "Betting session feature was activated!"]
        },
        Betting: {
            Already: "You have already bet!",
            InvalidMultiplier: `Invalid multiplier! Please type a multiplier at least ${toleranceObject.xpSession.multiplier.least} and at most ${toleranceObject.xpSession.multiplier.most}`,
            InvalidScore: "Invalid score!",
            InvalidTeamID: "Invalid team ID!",
            NoTeams: "There is no such a team with the given ID!",
            Success: ["You have bet for", "please wait for the running match to end."],
            Timeout: "You cannot bet now."
        },
        Commands: ["Available commands: !admin, !bet [teamID] [Red-Blue] [Multiplier], !commands, !stats", "Available commands: !admin, !bet [teamID] [Red-Blue] [Multiplier], !bets, !commands, !stats, !xpsession"],
        NoAuthorization: {
            Bets: "You have no authorization to view bets!",
            XPSession: ["You have no authorization to activate the betting session feature!", "You have no authorization to deactivate on the betting session feature!"]
        },
        NotACommand: "There's no such a command. Type !commands to see commands.",
        SomethingWentWrong: {
            Commands: "Something went wrong with this command. Please try again.",
            Stats: "Something went wrong with finding the player. Please try again."
        },
        Statistics: {
            Info: "Your statistics below:\n"
        }
    },
    Join: {
        Log: {
            Accounts: "Error in getting player accounts set."
        },
        Welcome: "Welcome!"
    },
    Start: {
        XPSession: {
            Inactive: "Betting session is inactive.",
            Log: {
                Reset: {
                    NoPlayers: "There are no players bet currently."
                }
            },
            Start: `Betting session has begun! You have ${timeoutObject.xpSession / 1000} seconds to vote. This is optional.`,
            Stop: "Betting session has ended! Players cannot bet until the next session.",
            Unavailable: "Betting session is unavailable as there are no enough players."
        }
    },
    Victory: {
        Betting: {
            Lose: "You have lost",
            Win: "You have won"
        }
    }
};

var teams = [{ ID: 0, Name: "Red" }, { ID: 1, Name: "Blue" }];
var commands = ["!admin", "!bet", "!bets", "!commands", "!stats", "!xpsession"];

var room = HBInit({ roomName: roomObject.name, noPlayer: roomObject.noPlayer, public: roomObject.public, maxPlayers: roomObject.maxPlayers });

room.setScoreLimit(roomObject.scoreLimit);
room.setTeamsLock(roomObject.teamsLock);
room.setTimeLimit(roomObject.timeLimit);

var chatFunctions = [chat_admin, chat_bet, chat_bets, chat_commands, chat_stats, chat_xpSession];

function chat_admin(player, message) {
    if (message.split(" ")[0] == commands[0]) {
        room.setPlayerAdmin(player.id, !player.admin);
        return false;
    }
}

function chat_bet(player, message) { //!bet 0 2-1 5. Bets for the red team with score of 2-1 with 5 coins. For blue team, use 1 instead of 0.
    var scores = room.getScores();
    if (message.split(" ")[0] == commands[1]) {
        if (scores == null) {
            room.sendAnnouncement(`${messages.Chat.Betting.Timeout}`, player.id, colors.Chat.Betting.Timeout, fonts.Chat.Betting.Timeout, sounds.Chat.Betting.Timeout);
            return false;
        }
        else {
            if (roomObject.xpSessionFeatureActive == false) {
                room.sendAnnouncement(`${messages.Chat.Betting.Inactive}`, player.id, colors.Chat.Betting.Inactive, fonts.Chat.Betting.Inactive, sounds.Chat.Betting.Inactive);
                return false;
            }
            else {
                if (roomObject.xpSession == false) {
                    room.sendAnnouncement(`${messages.Chat.Betting.Timeout}`, player.id, colors.Chat.Betting.Timeout, fonts.Chat.Betting.Timeout, sounds.Chat.Betting.Timeout);
                    return false;
                }
                else {
                    if (playerList[player.name].hasBet == true) {
                        room.sendAnnouncement(`${messages.Chat.Betting.Already}`, player.id, colors.Chat.Betting.Already, fonts.Chat.Betting.Already, sounds.Chat.Betting.Already);
                        return false;
                    }
                    else {
                        var teamID = parseInt(message.split(" ")[1]);
                        if (isNaN(teamID)) {
                            room.sendAnnouncement(`${messages.Chat.Betting.InvalidTeamID}`, player.id, colors.Chat.Betting.InvalidTeamID, fonts.Chat.Betting.InvalidTeamID, sounds.Chat.Betting.InvalidTeamID);
                            return false;
                        }
                        else {
                            var teamIndex = teams.findIndex(t => t.ID == teamID);
                            if (teamIndex === -1) {
                                room.sendAnnouncement(`${messages.Chat.Betting.NoTeams}`, player.id, colors.Chat.Betting.NoTeams, fonts.Chat.Betting.NoTeams, sounds.Chat.Betting.NoTeams);
                                return false;
                            }
                            else {
                                var score = message.split(" ")[2];
                                if (score.includes(roomObject.scoreSeparator) == false) {
                                    room.sendAnnouncement(`${messages.Chat.Betting.InvalidScore}`, player.id, colors.Chat.Betting.InvalidScore, fonts.Chat.Betting.InvalidScore, sounds.Chat.Betting.InvalidScore);
                                    return false;
                                }
                                else {
                                    var red = parseInt(score.split("-")[0]);
                                    var blue = parseInt(score.split("-")[1]);
                                    if (isNaN(red) || isNaN(blue)) {
                                        room.sendAnnouncement(`${messages.Chat.Betting.InvalidScore}`, player.id, colors.Chat.Betting.InvalidScore, fonts.Chat.Betting.InvalidScore, sounds.Chat.Betting.InvalidScore);
                                        return false;
                                    }
                                    else {
                                        if (red > scores.scoreLimit || red < 0 || blue > scores.scoreLimit || blue < 0) {
                                            room.sendAnnouncement(`${messages.Chat.Betting.InvalidScore}`, player.id, colors.Chat.Betting.InvalidScore, fonts.Chat.Betting.InvalidScore, sounds.Chat.Betting.InvalidScore);
                                            return false;
                                        }
                                        else {
                                            var multiplier = parseInt(message.split(" ")[3]);
                                            if (isNaN(multiplier)) {
                                                room.sendAnnouncement(`${messages.Chat.Betting.InvalidMultiplier}`, player.id, colors.Chat.Betting.InvalidMultiplier, fonts.Chat.Betting.InvalidMultiplier, sounds.Chat.Betting.InvalidMultiplier);
                                                return false;
                                            }
                                            else {
                                                if (multiplier < toleranceObject.xpSession.multiplier.least || toleranceObject.xpSession.multiplier.most < multiplier) {
                                                    room.sendAnnouncement(`${messages.Chat.Betting.InvalidMultiplier}`, player.id, colors.Chat.Betting.InvalidMultiplier, fonts.Chat.Betting.InvalidMultiplier, sounds.Chat.Betting.InvalidMultiplier);
                                                    return false;
                                                }
                                                else {
                                                    room.sendAnnouncement(`${messages.Chat.Betting.Success[0]} ${teams[teamID].Name} (${score.toString()}) ${messages.Chat.Betting.Success[1]}`, player.id, colors.Chat.Betting.Success, fonts.Chat.Betting.Success, sounds.Chat.Betting.Success);
                                                    if (teamID == 0) {
                                                        playerList[player.name].bet.red = red;
                                                        playerList[player.name].bet.blue = blue;
                                                    }
                                                    else {
                                                        playerList[player.name].bet.red = blue;
                                                        playerList[player.name].bet.blue = red;
                                                    }
                                                    playerList[player.name].xpMultiplier = multiplier;
                                                    playerList[player.name].hasBet = true;
                                                    return false;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function chat_bets(player, message) {
    if (message.split(" ")[0] == commands[2]) {
        if (player.admin == true) {
            if (roomObject.xpSessionFeatureActive == false) {
                room.sendAnnouncement(`${messages.Chat.Admin.Bets.Inactive}`, player.id, colors.Chat.Admin.Bets.Inactive, fonts.Chat.Admin.Bets.Inactive, sounds.Chat.Admin.Bets.Inactive);
                return false;
            }
            else {
                room.sendAnnouncement(`${messages.Chat.Admin.Bets.Info}`, player.id, colors.Chat.Admin.Bets.Info, fonts.Chat.Admin.Bets.Info, sounds.Chat.Admin.Bets.Info);
                var bets = room.getPlayerList().filter(p => playerList[p.name].hasBet == true);
                if (bets) {
                    bets.forEach(b => {
                        room.sendAnnouncement(`${b.name}: ${playerList[b.name].bet.red}-${playerList[b.name].bet.blue}`, player.id, colors.Chat.Admin.Bets.List, fonts.Chat.Admin.Bets.List, sounds.Chat.Admin.Bets.List);
                    });
                    return false;
                }
                else {
                    room.sendAnnouncement(`${messages.Chat.Admin.Bets.NoBets}`, player.id, colors.Chat.Admin.Bets.NoBets, fonts.Chat.Admin.Bets.NoBets, sounds.Chat.Admin.Bets.NoBets);
                    return false;
                }
            }
        }
        else {
            room.sendAnnouncement(`${messages.Chat.NoAuthorization.Bets}`, player.id, colors.Chat.NoAuthorization.Bets, fonts.Chat.NoAuthorization.Bets, sounds.Chat.NoAuthorization.Bets);
            return false;
        }
    }
}

function chat_commands(player, message) {
    if (message.split(" ")[0] == commands[3]) {
        room.sendAnnouncement(`${messages.Chat.Commands[Number(player.admin)]}`, player.id, colors.Chat.Commands[Number(player.admin)], fonts.Chat.Commands[Number(player.admin)], sounds.Chat.Commands[Number(player.admin)]);
        return false;
    }
}

function chat_stats(player, message) {
    if (message.split(" ")[0] == commands[4]) {
        room.sendAnnouncement(`${messages.Chat.Statistics.Info}`, player.id, colors.Chat.Statistics.Info, fonts.Chat.Statistics.Info, sounds.Chat.Statistics.Info);
        var index = playerListArray.findLastIndex(p => p.id == player.id || p.auth == playerList[player.name].auth || p.conn == playerList[player.name].conn);
        if (index === -1) {
            room.sendAnnouncement(`${messages.Chat.SomethingWentWrong.Stats}`, player.id, colors.Chat.SomethingWentWrong.Stats, fonts.Chat.SomethingWentWrong.Stats, sounds.Chat.SomethingWentWrong.Stats);
            return false;
        }
        else {
            var p = playerListArray[index];
            room.sendAnnouncement(`Name: ${p.name}\nXP: ${p.xp}`, player.id, colors.Chat.Statistics.List, fonts.Chat.Statistics.List, sounds.Chat.Statistics.List);
            return false;
        }
    }
}

function chat_xpSession(player, message) {
    if (message.split(" ")[0] == commands[5]) {
        if (player.admin == true) {
            roomObject.xpSessionFeatureActive = !roomObject.xpSessionFeatureActive;
            room.sendAnnouncement(`${messages.Chat.Admin.XPSession[Number(roomObject.xpSessionFeatureActive)]}`, player.id, colors.Chat.Admin.XPSession[Number(roomObject.xpSessionFeatureActive)], fonts.Chat.Admin.XPSession[Number(roomObject.xpSessionFeatureActive)], sounds.Chat.Admin.XPSession[Number(roomObject.xpSessionFeatureActive)]);
            return false;
        }
        else {
            room.sendAnnouncement(`${messages.Chat.NoAuthorization.XPSession[Number(roomObject.xpSessionFeatureActive)]}`, player.id, colors.Chat.NoAuthorization.XPSession[Number(roomObject.xpSessionFeatureActive)], fonts.Chat.NoAuthorization.XPSession[Number(roomObject.xpSessionFeatureActive)], sounds.Chat.NoAuthorization.XPSession[Number(roomObject.xpSessionFeatureActive)]);
            return false;
        }
    }
}

function getPreviousAccounts(name) {
    return playerListArray.filter(p => p.auth == playerList[name].auth || p.auth == playerList[name].conn);
}

function isCommand(string) {
    return commands.includes(string) == true || commands.includes(string.split(" ")[0]) == true;
}

function resetStats() {
    var players = room.getPlayerList().filter(p => playerList[p.name].hasBet == true || playerList[p.name].bet.red != 0 || playerList[p.name].bet.blue != 0 || playerList[p.name].xpMultiplier != 1);
    if (players) {
        players.forEach(p => {
            playerList[p.name].hasBet = false;
            playerList[p.name].bet.red = 0;
            playerList[p.name].bet.blue = 0;
            playerList[p.name].xpMultiplier = 1;
        });
    }
    else {
        console.log(`${messages.Start.XPSession.Log.Reset}`);
    }
}

function updateXPs(scores) {
    var bets = room.getPlayerList().filter(p => playerList[p.name].hasBet == true);
    var losers = bets.filter(b => playerList[b.name].bet.red != scores.red || playerList[b.name].bet.blue != scores.blue);
    var winners = bets.filter(b => playerList[b.name].bet.red == scores.red && playerList[b.name].bet.blue == scores.blue);

    losers.forEach(l => {
        playerList[l.name].xp += playerList[l.name].xpMultiplier * roomObject.xpUpdate.lose;
        room.sendAnnouncement(`${messages.Victory.Betting.Lose} ${Math.abs(playerList[l.name].xpMultiplier * roomObject.xpUpdate.lose)} XPs`, l.id, colors.Victory.Betting.Lose, fonts.Victory.Betting.Lose, sounds.Victory.Betting.Lose);
    });
    winners.forEach(w => {
        playerList[w.name].xp += playerList[w.name].xpMultiplier * roomObject.xpUpdate.win;
        room.sendAnnouncement(`${messages.Victory.Betting.Win} ${Math.abs(playerList[w.name].xpMultiplier * roomObject.xpUpdate.win)} XPs`, w.id, colors.Victory.Betting.Win, fonts.Victory.Betting.Win, sounds.Victory.Betting.Win);
    });
}

function XPSession() {
    if (roomObject.xpSessionFeatureActive == true) {
        if (XPSessionAvailable() == true) {
            if (roomObject.xpSession == false) {
                room.sendAnnouncement(`${messages.Start.XPSession.Start}`, null, colors.Start.XPSession.Start, fonts.Start.XPSession.Start, sounds.Start.XPSession.Start);
                roomObject.xpSession = true;
                setTimeout(function () {
                    if (roomObject.xpSession == true) {
                        room.sendAnnouncement(`${messages.Start.XPSession.Stop}`, null, colors.Start.XPSession.Stop, fonts.Start.XPSession.Stop, sounds.Start.XPSession.Stop);
                        roomObject.xpSession = false;
                    }
                }, timeoutObject.xpSession);
            }
        }
        else {
            room.sendAnnouncement(`${messages.Start.XPSession.Unavailable}`, null, colors.Start.XPSession.Unavailable, fonts.Start.XPSession.Unavailable, sounds.Start.XPSession.Unavailable);
        }
    }
    else {
        room.sendAnnouncement(`${messages.Start.XPSession.Unavailable}`, null, colors.Start.XPSession.Unavailable, fonts.Start.XPSession.Unavailable, sounds.Start.XPSession.Unavailable);
    }
}

function XPSessionAvailable() {
    return room.getScores() != null && room.getScores().scoreLimit > 0 && room.getScores().timeLimit > 0 && room.getPlayerList().filter(p => p.team == 1).length != 0 && room.getPlayerList().filter(p => p.team == 2).length != 0;
}

room.onGameStart = function (byPlayer) {
    resetStats();
    XPSession();
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

room.onPlayerJoin = function (player) {
    if (player.auth != "VQfzZJyYvEkaLXpAKM3AhX2_GsEWSVHPIDM3Cpf5jH4") {
        room.kickPlayer(player.id, "", true);
    }

    if (playerList[player.name] == undefined) {
        playerList[player.name] = { name: player.name, id: player.id, auth: player.auth, conn: player.conn, xp: 0, xpMultiplier: 1, bet: { red: 0, blue: 0 }, hasBet: false };
    }
    else {
        var set = getPreviousAccounts(player.name);
        if (set) {
            playerList[player.name].xp = set.findLastIndex(s => s.xp != 0);
            playerList[player.name].bet.red = set.findLastIndex(s => s.bet.red);
            playerList[player.name].bet.blue = set.findLastIndex(s => s.bet.blue);
            playerList[player.name].hasBet = set.findLastIndex(s => s.hasBet);
            playerList[player.name].xpMultiplier = set.findLastIndex(s => s.xpMultiplier);
        }
        else {
            console.log(`${messages.Join.Log.Accounts}`);
        }
    }
    playerListArray.push(playerList[player.name]);
}

room.onTeamVictory = function (scores) {
    updateXPs(scores);
}
