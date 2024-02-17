var room = HBInit({ roomName: "Register & Login", noPlayer: true, public: false, maxPlayers: 20 });

var playerList = {};
var passwordLengths = { min: 4, max: 8 };
var loginTimeout = 15;

function findRegisteredUser(player) {
    if (Object.keys(playerList).length > 0) {
        var otherUserIndex = Object.keys(playerList).findIndex(p => p != player.name && (playerList[p].auth == player.auth || playerList[p].conn == player.conn));
        var otherUserName = otherUserIndex !== -1 ? Object.keys(playerList)[otherUserIndex] : undefined;
        return otherUserName;
    } else {
        return undefined;
    }
}

function isInTheLimits(input, min, max) {
    return min <= input && input <= max;
}

room.onPlayerJoin = function(player) {
    if (playerList[player.name] == undefined) {
        var otherUserName = findRegisteredUser(player);
        if (otherUserName == undefined) {
            room.sendAnnouncement(`You are seeming like unregistered. In order to use the functionality, please get registered in ${loginTimeout} seconds (!register [xxxx])`, player.id, 0xFFFFFF, "bold", 2);
            setTimeout(function() {
                if (playerList[player.name] == undefined || (playerList[player.name] != undefined && playerList[player.name].registered == false)) {
                    room.kickPlayer(player.id, "You are not registered.", false);
                } else {
                    var password = playerList[player.name].password;
                    playerList[player.name] = { name: player.name, auth: player.auth, conn: player.conn, password: password, registered: true, loggedIn: false };
                }
            }, loginTimeout * 1000);
        } else {
            room.kickPlayer(player.id, `Might you have joined as ${otherUserName}?`, false);
        }
    } else {
        room.sendAnnouncement(`Registered user... Please type your password and complete login in ${loginTimeout} seconds (!login [xxxx])`, player.id, 0xFFFFFF, "bold", 2);
        setTimeout(function() {
            if (playerList[player.name].registered == true && playerList[player.name].loggedIn == false) {
                if (player) room.kickPlayer(player.id, "You are not logged in.", false);
            } else {
                if (player) var password = playerList[player.name].password;
                playerList[player.name] = { name: player.name, auth: player.auth, conn: player.conn, password: password, registered: true, loggedIn: true };
            }
        }, loginTimeout * 1000);
    }
}

room.onPlayerLeave = function(player) {
    if (Object.keys(playerList).length > 0) {
        if (playerList[player.name] != undefined && playerList[player.name].loggedIn == true) {
            playerList[player.name].loggedIn = false;
        }
    }
}

room.onPlayerChat = function(player, message) {
    var splitted = message.split(" ");
    if (splitted[0] == "!register") {
        if (playerList[player.name] == undefined || (playerList[player.name] != undefined && playerList[player.name].registered == false)) {
            if (splitted.length == 2) {
                var password = splitted[1];
                if (password != undefined) {
                    if (isInTheLimits(password.length, passwordLengths.min, passwordLengths.max)) {
                        room.sendAnnouncement("You have registered!", player.id, 0x00FF00, "normal", 1);
                        playerList[player.name] = { name: player.name, auth: null, conn: null, password: password, registered: true, loggedIn: false };
                        return false;
                    } else {
                        room.sendAnnouncement(`Your password must be within a length between ${passwordLengths.min} and ${passwordLengths.max}!`, player.id, 0xFF0000, "bold", 2);
                        return false;
                    }
                } else {
                    room.sendAnnouncement("Please type a correct password!", player.id, 0xFF0000, "bold", 2);
                    return false;
                }
            } else {
                room.sendAnnouncement("Your password cannot contain empty character!", player.id, 0xFF0000, "bold", 2);
                return false;
            }
        } else {
            room.sendAnnouncement("You are already registered!", player.id, 0xFFFF00, "bold", 2);
            return false;
        }
    } else if (splitted[0] == "!login") {
        if (playerList[player.name] == undefined) {
            room.sendAnnouncement("You must get registered before logging in!", player.id, 0xFFFF00, "bold", 2);
            return false;
        } else {
            if (playerList[player.name].registered == true) {
                if (playerList[player.name].loggedIn == false) {
                    if (splitted.length == 2) {
                        var password = splitted[1];
                        var passwordToBeChecked = playerList[player.name].password;
                        var passwordCheck = (password == passwordToBeChecked);
                        if (isInTheLimits(password.length, passwordLengths.min, passwordLengths.max)) {
                            if (passwordCheck == true) {
                                room.sendAnnouncement("You have logged in!", player.id, 0x00FF00, "normal", 1);
                                playerList[player.name].loggedIn = true;
                                return false;
                            } else {
                                room.sendAnnouncement("Incorrect password! Try again please!", player.id, 0xFF0000, "bold", 2);
                                return false;
                            }
                        } else {
                            room.sendAnnouncement(`Your password must be within a length between ${passwordLengths.min} and ${passwordLengths.max}!`, player.id, 0xFF0000, "bold", 2);
                            return false;
                        }
                    } else {
                        room.sendAnnouncement("Your password cannot contain empty character!", player.id, 0xFF0000, "bold", 2);
                        return false;
                    }
                } else {
                    room.sendAnnouncement("You are already logged in!", player.id, 0xFFFF00, "bold", 2);
                    return false;
                }
            } else {
                room.sendAnnouncement("You must get registered before logging in!", player.id, 0xFFFF00, "bold", 2);
                return false;
            }
        }
    }
}
