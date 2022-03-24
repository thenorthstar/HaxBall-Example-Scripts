var MasterAdmins = [];
var NormalAdmins = [];
var password = "getadmin";

var room = HBInit({roomName:"MASTER ADMINS VS NORMAL ADMINS",noPlayer:true,public:false,maxPlayers:10});

room.onPlayerJoin = function(player){
    console.log(player.name + " has joined.");
}

room.onPlayerLeave = function(player){
    console.log(player.name + " has left.");

    //if(MasterAdmins.includes(player.name) == true){
	//MasterAdmins.splice(MasterAdmins.indexOf(player.name),1);
    //}
    //else if(NormalAdmins.includes(player.name) == true){
	//NormalAdmins.splice(NormalAdmins.indexOf(player.name),1);
    //}
}

room.onPlayerKicked = function(kickedPlayer,reason,ban,byPlayer){
    if(byPlayer==null){
	if(ban==0){
	    console.log(kickedPlayer.name + " [" + kickedPlayer.id + "] was kicked (" + reason + ")");
	    if(MasterAdmins.includes(kickedPlayer.name) == true){
		MasterAdmins.splice(MasterAdmins.indexOf(kickedPlayer.name),1);
	    }
	    else if(NormalAdmins.includes(kickedPlayer.name) == true){
		NormalAdmins.splice(NormalAdmins.indexOf(kickedPlayer.name),1);
	    }
	}
	else if(ban==1){
	    console.log(kickedPlayer.name + " [" + kickedPlayer.id + "] was banned (" + reason + ")");
	    if(MasterAdmins.includes(kickedPlayer.name) == true){
		MasterAdmins.splice(MasterAdmins.indexOf(kickedPlayer.name),1);
	    }
	    else if(NormalAdmins.includes(kickedPlayer.name) == true){
		NormalAdmins.splice(NormalAdmins.indexOf(kickedPlayer.name),1);
	    }
	}
    }
    else if(byPlayer!=null){
	if(ban==0){
	    console.log(kickedPlayer.name + " [" + kickedPlayer.id + "] was kicked by " + byPlayer.name + " [" + byPlayer.id + "] (" + reason + ")");

	    if(byPlayer.id == 0){
		if(MasterAdmins.includes(kickedPlayer.name) == true){
		    MasterAdmins.splice(MasterAdmins.indexOf(kickedPlayer.name),1);
		}
		else if(NormalAdmins.includes(kickedPlayer.name) == true){
		    NormalAdmins.splice(NormalAdmins.indexOf(kickedPlayer.name),1);
		}
	    }
	    else{
		if(kickedPlayer.id == byPlayer.id){
		    if(MasterAdmins.includes(kickedPlayer.name) == true){
			MasterAdmins.splice(MasterAdmins.indexOf(kickedPlayer.name),1);
		    }
		    else if(NormalAdmins.includes(kickedPlayer.name) == true){
			NormalAdmins.splice(NormalAdmins.indexOf(kickedPlayer.name),1);
		    }
		}
		else{
		    if(MasterAdmins.includes(kickedPlayer.name) == true){
			room.kickPlayer(byPlayer.id,"You are unable to kick a master admin in this room.",true);

			if(MasterAdmins.includes(byPlayer.name) == true){
			    MasterAdmins.splice(MasterAdmins.indexOf(byPlayer.name),1);
			}
			else if(NormalAdmins.includes(byPlayer.name) == true){
			    NormalAdmins.splice(NormalAdmins.indexOf(byPlayer.name),1);
			}

			if(MasterAdmins.includes(kickedPlayer.name) == true){
			    MasterAdmins.splice(MasterAdmins.indexOf(kickedPlayer.name),1);
			}
			else if(NormalAdmins.includes(kickedPlayer.name) == true){
			    NormalAdmins.splice(NormalAdmins.indexOf(kickedPlayer.name),1);
			}
		    }
		    else if(NormalAdmins.includes(kickedPlayer.name) == true){
			if(kickedPlayer.id == byPlayer.id){
			    if(MasterAdmins.includes(kickedPlayer.name) == true){
				MasterAdmins.splice(MasterAdmins.indexOf(kickedPlayer.name),1);
			    }
			    else if(NormalAdmins.includes(kickedPlayer.name) == true){
				NormalAdmins.splice(NormalAdmins.indexOf(kickedPlayer.name),1);
			    }
			}
			else{
			    if(MasterAdmins.includes(byPlayer.name) == true){
				if(MasterAdmins.includes(kickedPlayer.name) == true){
				    MasterAdmins.splice(MasterAdmins.indexOf(kickedPlayer.name),1);
				}
				else if(NormalAdmins.includes(kickedPlayer.name) == true){
				    NormalAdmins.splice(NormalAdmins.indexOf(kickedPlayer.name),1);
				}
			    }
			    else{
				room.kickPlayer(byPlayer.id,"You are unable to kick a normal admin in this room.",true);

				if(MasterAdmins.includes(byPlayer.name) == true){ 
				    MasterAdmins.splice(MasterAdmins.indexOf(byPlayer.name),1);
				}
				else if(NormalAdmins.includes(byPlayer.name) == true){
				    NormalAdmins.splice(NormalAdmins.indexOf(byPlayer.name),1);
				}

				if(MasterAdmins.includes(kickedPlayer.name) == true){
				    MasterAdmins.splice(MasterAdmins.indexOf(kickedPlayer.name),1);
				}
				else if(NormalAdmins.includes(kickedPlayer.name) == true){
				    NormalAdmins.splice(NormalAdmins.indexOf(kickedPlayer.name),1);
				}
			    }
			}
		    }
		}
	    }
	}
	else if(ban==1){
	    console.log(kickedPlayer.name + " [" + kickedPlayer.id + "] was banned by " + byPlayer.name + " [" + byPlayer.id + "] (" + reason + ")");

	    if(byPlayer.id == 0){
		if(MasterAdmins.includes(kickedPlayer.name) == true){
		    MasterAdmins.splice(MasterAdmins.indexOf(kickedPlayer.name),1);
		}
		else if(NormalAdmins.includes(kickedPlayer.name) == true){
		    NormalAdmins.splice(NormalAdmins.indexOf(kickedPlayer.name),1);
		}
	    }
	    else{
		if(kickedPlayer.id == byPlayer.id){
		    if(MasterAdmins.includes(kickedPlayer.name) == true){
			MasterAdmins.splice(MasterAdmins.indexOf(kickedPlayer.name),1);
		    }
		    else if(NormalAdmins.includes(kickedPlayer.name) == true){
			NormalAdmins.splice(NormalAdmins.indexOf(kickedPlayer.name),1);
		    }
		}
		else{
		    if(MasterAdmins.includes(kickedPlayer.name) == true){
			room.clearBan(kickedPlayer.id);
			room.kickPlayer(byPlayer.id,"You are unable to ban a master admin in this room.",true);

			if(MasterAdmins.includes(byPlayer.name) == true){
			    MasterAdmins.splice(MasterAdmins.indexOf(byPlayer.name),1);
			}
			else if(NormalAdmins.includes(byPlayer.name) == true){
			    NormalAdmins.splice(NormalAdmins.indexOf(byPlayer.name),1);
			}

			if(MasterAdmins.includes(kickedPlayer.name) == true){
			    MasterAdmins.splice(MasterAdmins.indexOf(kickedPlayer.name),1);
			}
			else if(NormalAdmins.includes(kickedPlayer.name) == true){
			    NormalAdmins.splice(NormalAdmins.indexOf(kickedPlayer.name),1);
			}
		    }
		    else if(NormalAdmins.includes(kickedPlayer.name) == true){
			if(kickedPlayer.id == byPlayer.id){
			    if(MasterAdmins.includes(kickedPlayer.name) == true){
				MasterAdmins.splice(MasterAdmins.indexOf(kickedPlayer.name),1);
			    }
			    else if(NormalAdmins.includes(kickedPlayer.name) == true){
				NormalAdmins.splice(NormalAdmins.indexOf(kickedPlayer.name),1);
			    }
			}
			else{
			    if(MasterAdmins.includes(byPlayer.name) == true){
				if(MasterAdmins.includes(kickedPlayer.name) == true){
				    MasterAdmins.splice(MasterAdmins.indexOf(kickedPlayer.name),1);
				}
				else if(NormalAdmins.includes(kickedPlayer.name) == true){
				    NormalAdmins.splice(NormalAdmins.indexOf(kickedPlayer.name),1);
				}
			    }
			    else{
				room.clearBan(kickedPlayer.id);
				room.kickPlayer(byPlayer.id,"You are unable to ban a normal admin in this room.",true);

				if(MasterAdmins.includes(byPlayer.name) == true){
				    MasterAdmins.splice(MasterAdmins.indexOf(byPlayer.name),1);
				}
				else if(NormalAdmins.includes(byPlayer.name) == true){
				    NormalAdmins.splice(NormalAdmins.indexOf(byPlayer.name),1);
				}

				if(MasterAdmins.includes(kickedPlayer.name) == true){
				    MasterAdmins.splice(MasterAdmins.indexOf(kickedPlayer.name),1);
				}
				else if(NormalAdmins.includes(kickedPlayer.name) == true){
				    NormalAdmins.splice(NormalAdmins.indexOf(kickedPlayer.name),1);
				}
			    }
			}
		    }
		}
	    }
	}
    }
};

room.onPlayerAdminChange = function(changedPlayer,byPlayer){
    if(byPlayer==null){
	if(changedPlayer.admin==true){
	    console.log(changedPlayer.name + " [" + changedPlayer.id + "] was given admin rights");
	
	    if(MasterAdmins.includes(changedPlayer.name) == false){
		MasterAdmins.push(changedPlayer.name);

		if(NormalAdmins.includes(changedPlayer.name) == true){
		    NormalAdmins.splice(NormalAdmins.indexOf(changedPlayer.name),1);
		}
		else{
		    return false;
		}
	    }
	}
	else{
	    console.log(changedPlayer.name + " [" + changedPlayer.id + "]'s admin rights were taken away");

	    if(MasterAdmins.includes(changedPlayer.name) == true){
		MasterAdmins.splice(MasterAdmins.indexOf(changedPlayer.name),1);
	    }
	    else if(NormalAdmins.includes(changedPlayer.name) == true){
		NormalAdmins.splice(NormalAdmins.indexOf(changedPlayer.name),1);
	    }
	}
    }
    else if(byPlayer!=null){
	if(changedPlayer.admin==true){
	    console.log(changedPlayer.name + " [" + changedPlayer.id + "] was given admin rights by " + byPlayer.name + " [" + byPlayer.id + "]");

	    if(byPlayer.id == 0){
		if(MasterAdmins.includes(changedPlayer.name) == false){
		    MasterAdmins.push(changedPlayer.name);

		    if(NormalAdmins.includes(changedPlayer.name) == true){
			NormalAdmins.splice(NormalAdmins.indexOf(changedPlayer.name),1);
		    }
		    else{
			return false;
		    }
		}
	    }
	    else{
		if(NormalAdmins.includes(byPlayer.name) == true){
		    room.sendAnnouncement("You are unable to give admin rights to another user.",byPlayer.id,0xFF0000,"bold",2);
		    room.setPlayerAdmin(byPlayer.id,false);
		    room.setPlayerAdmin(changedPlayer.id,false);
		}
		if(NormalAdmins.includes(changedPlayer.name) == false){
		    NormalAdmins.push(changedPlayer.name);

		    if(MasterAdmins.includes(changedPlayer.name) == true){
			MasterAdmins.splice(MasterAdmins.indexOf(changedPlayer.name),1);
		    }
		    else{
			return false;
		    }
		}
	    }
	}
	else{
	    console.log(changedPlayer.name + " [" + changedPlayer.id + "]'s admin rights were taken away by " + byPlayer.name + " [" + byPlayer.id + "]");

	    if(byPlayer.id == 0){
		if(MasterAdmins.includes(changedPlayer.name) == true){
		    MasterAdmins.splice(MasterAdmins.indexOf(changedPlayer.name),1);
		}
		else if(NormalAdmins.includes(changedPlayer.name) == true){
		    NormalAdmins.splice(NormalAdmins.indexOf(changedPlayer.name),1);
		}
	    }
	    else{
		if(MasterAdmins.includes(changedPlayer.name) == true){
		    if(changedPlayer.id == byPlayer.id){
			MasterAdmins.splice(MasterAdmins.indexOf(changedPlayer.name),1);
		    }
		    else{
			room.kickPlayer(byPlayer.id,"You are unable to change the admin rights of another master admin.",true);
			room.setPlayerAdmin(changedPlayer.id,true);
		    }
		}
		else if(NormalAdmins.includes(changedPlayer.name) == true){
		    if(changedPlayer.id == byPlayer.id){
			NormalAdmins.splice(NormalAdmins.indexOf(changedPlayer.name),1);
		    }
		    else{
			if(MasterAdmins.includes(byPlayer.name) == true){
			    NormalAdmins.splice(NormalAdmins.indexOf(changedPlayer.name),1);
			}
			else{
			    room.kickPlayer(byPlayer.id,"You are unable to change the admin rights of another normal admin.",true);
			}
		    }
		}
	    }
	}
    }
}

room.onPlayerChat = function(player,msg){
    console.log("💬 " + player.name + " [" + player.id + "]: " + msg);
    if(player.admin == true){
	if(MasterAdmins.includes(player.name) == true){
	    if(msg.startsWith("!pw ")==true){
		room.setPassword(msg.slice(4));
		room.sendAnnouncement("Password set",player.id,0x00FF00,"normal",1);
		return false;
	    }
	    else if(msg == password){
		room.setPlayerAdmin(player.id,!player.admin);
		room.sendAnnouncement(player.name + " has left their admin rights by code",undefined,0x00FF00,"bold",0);
		return false;
	    }
	    room.sendAnnouncement("[" + player.id + "][Master Admin]" + player.name + ": " + msg,undefined,0x97FFFF,"bold",1);
	    return false;
	}
	else{
	    if(msg.startsWith("!pw ")==true){
		room.sendAnnouncement("You are unable to set or change password in this room.",player.id,0xFF0000,"bold",2);
		return false;
	    }
	    else if(msg == password){
		room.sendAnnouncement("Normal admins are unable to use the admin password in this room.",player.id,0xFF0000,"bold",2);
		return false;
	    }
	    room.sendAnnouncement("[" + player.id + "][Normal Admin]" + player.name + ": " + msg,undefined,0xFFA500,"bold",1);
	    return false;
	}
    }
    else{
	if(msg == password){
	    room.setPlayerAdmin(player.id,!player.admin);
	    room.sendAnnouncement(player.name + " has got their admin rights by code",undefined,0x00FF00,"bold",0);
	    return false;
	}
	room.sendAnnouncement("[" + player.id + "][Civil Player]" + player.name + ": " + msg,undefined,0xFFFFFF,"bold",1);
	return false;
    }
}

room.onStadiumChange = function(newStadiumName, byPlayer){
    if(byPlayer==null){
	console.log("📁 " + newStadiumName + " was loaded");
    }
    else if(byPlayer!=null){
	console.log("📁 " + byPlayer.name + " [" + byPlayer.id + "] loaded " + newStadiumName);
	if(byPlayer.id == 0){
	    room.sendAnnouncement(byPlayer.name + " loaded " + newStadiumName);
	}
	else{
	    if(MasterAdmins.includes(byPlayer.name) == true){
		room.sendAnnouncement(byPlayer.name + " loaded " + newStadiumName);
	    }
	    else{
		room.sendAnnouncement("You are not authorized to change maps in this room.",byPlayer.id,0xFF0000,"bold",2);
		room.setDefaultStadium("Classic");
	    }
	}
    }
}
