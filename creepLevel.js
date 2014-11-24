*/ creepLevel.js
* creepLevel.getParts(creepType)
*
*
*/
var harvesterParts = {
	"1": {[Game.WORK,Game.CARRY,Game.MOVE]}, // 1xWORK 1xCARRY 1xMOVE
	"2": {}
}
exports.getParts = function(creepType){
	console.log(harvesterParts.1)
}