var Map = `` //Insert your map here
var JMap = JSON.parse(Map);

var roomObject = {
    assistingTouch: undefined,
    goal:{
        avatarSetting:{
            assist: {
                ownGoal: "👟",
                scorer: "⚽️"
            },
            default: null,
            ownGoal: "❌",
            scorer: "⚽️",
            timeout: 5000
        },
        radiusSetting:{
            assist: {
                ownGoal: 25,
                scorer: 35
            },
            ownGoal: 5,
            scorer: 45,
            timeout: 5000
        }
    },
    lastPlayerTouched: undefined,
    lastTeamTouched: 0,
    maxPlayers: 12,
    name: "Player Radius and Avatar Adjusting After Goal",
    noPlayer: true,
    password: null,
    previousPlayerTouched: undefined,
    public: true,
    recaptcha: false,
    scoreLimit: 0,
    teams: [1,2],
    teamsLock: true,
    timeLimit: 3,
    token: null,
    triggerDistance: JMap.ballPhysics.radius + JMap.playerPhysics.radius + 0.01 //JMap.ballPhysics and JMap.playerPhysics must be defined
}

var colors = {
    Goal:{
        Assist: {
            OwnGoal: [0xE56E56,0x5689E5],
            Scorer: [0xE56E56,0x5689E5]
        },
        OwnGoal: [0xE56E56,0x5689E5],
        Scorer: [0xE56E56,0x5689E5],
        Unknown:{
            Player: 0xFFFFFF,
            Team: 0xFFFFFF
        }
    }
}

var fonts = {
    Goal:{
        Assist: {
            OwnGoal: ["normal","normal"],
            Scorer: ["normal","normal"]
        },
        OwnGoal: ["small","small"],
        Scorer: ["bold","bold"],
        Unknown:{
            Player: "normal",
            Team: "normal"
        }
    }
}

var sounds = {
    Goal:{
        Assist: {
            OwnGoal: [1,1],
            Scorer: [1,1]
        },
        OwnGoal: [0,0],
        Scorer: [2,2],
        Unknown:{
            Player: 1,
            Team: 1
        }
    }
}

var messages = {
    Goal:{
        Assist:{
            OwnGoal: ["assistance by","assistance by"],
            Scorer: ["assist by","assist by"]
        },
        OwnGoal: ["🔴 Own goal by","🔵 Own goal by"],
        Scorer: ["🔴 Goal by","🔵 Goal by"],
        Unknown:{
            Player: "Goal by unknown player.",
            Team: "Goal by unknown team."
        }
    }
}

var room = HBInit({ roomName: roomObject.name, noPlayer: roomObject.noPlayer, public: roomObject.public, maxPlayers: roomObject.maxPlayers });

function adjustPlayerRadiusAndAvatar(id,radiusStart,radiusStop,avatarStart,avatarStop,timeout){
    if(room.getPlayerDiscProperties(id) != null && room.getPlayerDiscProperties(id).radius != radiusStart){
        room.setPlayerDiscProperties(id,{radius: radiusStart});
        room.setPlayerAvatar(id,avatarStart);
    }
    setTimeout(function(){
        if(room.getPlayerDiscProperties(id) != null && room.getPlayerDiscProperties(id).radius != radiusStop){
            room.setPlayerDiscProperties(id,{radius: radiusStop});
            room.setPlayerAvatar(id,avatarStop);
        }
    },timeout);
}

function announceGoals(team){
    var lastPlayerTouched = roomObject.lastPlayerTouched;
    var assistingTouch = roomObject.assistingTouch;
    var lastTeamTouched = roomObject.lastTeamTouched;

    if(lastPlayerTouched == undefined){
        room.sendAnnouncement(`${messages.Goal.Unknown.Player}`,null,colors.Goal.Unknown.Player,fonts.Goal.Unknown.Player,sounds.Goal.Unknown.Player); //It's a rare situation but may happen.
    }
    else{
        if(lastTeamTouched == 0){
            room.sendAnnouncement(`${messages.Goal.Unknown.Team}`,null,colors.Goal.Unknown.Team,fonts.Goal.Unknown.Team,sounds.Goal.Unknown.Team); //It's another rare situation but may happen.
        }
        else{
            if(assistingTouch == undefined){
                if(lastTeamTouched == team){
                    room.sendAnnouncement(`${messages.Goal.Scorer[team-1]}: ${lastPlayerTouched.name}`,null,colors.Goal.Scorer[team-1],fonts.Goal.Scorer[team-1],sounds.Goal.Scorer[team-1]);
                    adjustPlayerRadiusAndAvatar(lastPlayerTouched.id,roomObject.goal.radiusSetting.scorer,JMap.playerPhysics.radius,roomObject.goal.avatarSetting.scorer,roomObject.goal.avatarSetting.default,roomObject.goal.radiusSetting.timeout);
                }
                else{
                    room.sendAnnouncement(`${messages.Goal.OwnGoal[team-1]}: ${lastPlayerTouched.name}`,null,colors.Goal.OwnGoal[team-1],fonts.Goal.OwnGoal[team-1],sounds.Goal.OwnGoal[team-1]);
                    adjustPlayerRadiusAndAvatar(lastPlayerTouched.id,roomObject.goal.radiusSetting.ownGoal,JMap.playerPhysics.radius,roomObject.goal.avatarSetting.ownGoal,roomObject.goal.avatarSetting.default,roomObject.goal.radiusSetting.timeout);
                }
            }
            else{
                if(lastTeamTouched == team){
                    room.sendAnnouncement(`${messages.Goal.Scorer[team-1]}: ${lastPlayerTouched.name} ${messages.Goal.Assist.Scorer[team-1]}: ${assistingTouch.name}`,null,colors.Goal.Assist.Scorer[team-1],fonts.Goal.Assist.Scorer[team-1],sounds.Goal.Assist.Scorer[team-1]);
                    adjustPlayerRadiusAndAvatar(lastPlayerTouched.id,roomObject.goal.radiusSetting.scorer,JMap.playerPhysics.radius,roomObject.goal.avatarSetting.scorer,roomObject.goal.avatarSetting.default,roomObject.goal.radiusSetting.timeout);
                    adjustPlayerRadiusAndAvatar(assistingTouch.id,roomObject.goal.radiusSetting.assist.scorer,JMap.playerPhysics.radius,roomObject.goal.avatarSetting.assist.scorer,roomObject.goal.avatarSetting.default,roomObject.goal.radiusSetting.timeout);
                }
                else{
                    if(lastPlayerTouched.team == assistingTouch.team){
                        room.sendAnnouncement(`${messages.Goal.OwnGoal[team-1]}: ${lastPlayerTouched.name} ${messages.Goal.Assist.OwnGoal[team-1]}: ${assistingTouch.name}`,null,colors.Goal.Assist.OwnGoal[team-1],fonts.Goal.Assist.OwnGoal[team-1],sounds.Goal.Assist.OwnGoal[team-1]);
                        adjustPlayerRadiusAndAvatar(lastPlayerTouched.id,roomObject.goal.radiusSetting.ownGoal,JMap.playerPhysics.radius,roomObject.goal.avatarSetting.ownGoal,roomObject.goal.avatarSetting.default,roomObject.goal.radiusSetting.timeout);
                        adjustPlayerRadiusAndAvatar(assistingTouch.id,roomObject.goal.radiusSetting.ownGoal,JMap.playerPhysics.radius,roomObject.goal.avatarSetting.ownGoal,roomObject.goal.avatarSetting.default,roomObject.goal.radiusSetting.timeout);
                    }
                    else{
                        room.sendAnnouncement(`${messages.Goal.OwnGoal[team-1]}: ${lastPlayerTouched.name} ${messages.Goal.Assist.OwnGoal[team-1]}: ${assistingTouch.name}`,null,colors.Goal.Assist.OwnGoal[team-1],fonts.Goal.Assist.OwnGoal[team-1],sounds.Goal.Assist.OwnGoal[team-1]);
                        adjustPlayerRadiusAndAvatar(lastPlayerTouched.id,roomObject.goal.radiusSetting.ownGoal,JMap.playerPhysics.radius,roomObject.goal.avatarSetting.ownGoal,roomObject.goal.avatarSetting.default,roomObject.goal.radiusSetting.timeout);
                        adjustPlayerRadiusAndAvatar(assistingTouch.id,roomObject.goal.radiusSetting.assist.ownGoal,JMap.playerPhysics.radius,roomObject.goal.avatarSetting.assist.ownGoal,roomObject.goal.avatarSetting.default,roomObject.goal.radiusSetting.timeout);
                    }
                }
            }
        }
    }
}

function getLastTouchTheBall() {
    var ballPosition = room.getBallPosition();
    var players = room.getPlayerList();
    for (var i = 0; i < players.length; i++) {
        if (players[i].position != null) {
            var distanceToBall = pointDistance(players[i].position, ballPosition);
            if (distanceToBall < roomObject.triggerDistance) {
                if (roomObject.lastPlayerTouched == undefined || (roomObject.lastPlayerTouched != undefined && roomObject.lastPlayerTouched.id != players[i].id)) {
                    if (roomObject.lastTeamTouched == players[i].team) {
                        roomObject.assistingTouch = roomObject.lastPlayerTouched;
                    }
                    else {
                        roomObject.assistingTouch = undefined;
                    }
                }
                roomObject.lastTeamTouched = players[i].team;
                roomObject.previousPlayerTouched = roomObject.lastPlayerTouched;
                roomObject.lastPlayerTouched = players[i];
            }
        }
    }
    return roomObject.lastPlayerTouched;
}

function pointDistance(p1, p2) {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

function resetTouchers(){
    if (roomObject.lastPlayerTouched != undefined || roomObject.lastTeamTouched != 0) {
        roomObject.lastPlayerTouched = undefined;
        roomObject.lastTeamTouched = 0;
    }
}

room.onGameStart = function (byPlayer) {
    resetTouchers();
}

room.onGameStop = function (byPlayer) {
    resetTouchers();
}

room.onGameTick = function () {
    getLastTouchTheBall();
}

room.onPlayerBallKick = function (player) {
    roomObject.lastPlayerTouched = player;
}

room.onPositionsReset = function () {
    resetTouchers();
}

room.onTeamGoal = function(team){
    announceGoals(team);
}
