/* creepLevel.js
* creepLevel.getParts(creepType)
*
*
*/
var harvesterParts = {
	"1": [Game.WORK,Game.CARRY,Game.MOVE], // 1xWORK 1xCARRY 1xMOVE
	"2": []
}
var guardParts = {
	"1": [Game.ATTACK, Game.ATTACK, Game.MOVE, Game.MOVE],
	"2": []
}
var builderParts = {
	"1": [Game.ATTACK, Game.ATTACK, Game.MOVE, Game.MOVE],
	"2": []
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
}