/* creepLevel.js
* creepLevel.getParts(creepType)
*
*
*/
var harvesterParts = {
	"1": [Game.WORK,Game.CARRY,Game.MOVE], // 1xWORK 1xCARRY 1xMOVE
	"2": [Game.WORK, Game.WORK, Game.CARRY, Game.CARRY,Game.MOVE]
}
var guardParts = {
	"1": [Game.ATTACK, Game.ATTACK, Game.MOVE, Game.MOVE],
	"2": [Game.ATTACK, Game.ATTACK, Game.ATTACK, Game.MOVE, Game.MOVE]
}
var builderParts = {
	"1": [Game.WORK, Game.WORK, Game.MOVE, Game.MOVE],
	"2": [Game.WORK, Game.WORK, Game.WORK, Game.MOVE, Game.MOVE]
}
var medicParts = {
	"1":[Game.MOVE,Game.MOVE,Game.HEAL],
	"2":[Game.MOVE,Game.MOVE,Game.HEAL,Game.HEAL]
}

exports.getParts = function(creepType,level){
	if(creepType === "guard"){
		return guardParts[level];
	}
	if(creepType === "harvester"){
		return harvesterParts[level];
	}
	if(creepType === "builder"){
		return builderParts[level];
	}
	if(creepType === "medic"){
		return medicParts[level];
	}
}