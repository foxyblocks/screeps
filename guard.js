/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('guard'); // -> 'a thing'
 */
 exports.spawn = function(spawnName, creepName){
     Game.spawns[spawnName].createCreep( [Game.TOUGH, Game.ATTACK, Game.MOVE, Game.MOVE], creepName, {'role':'guard'} );
 }
 exports.defend = function(creep){
    if(creep.memory.role == 'guard') {
	    var neartarget = creep.pos.findNearest(Game.HOSTILE_CREEPS);
    	if(neartarget) {
    		creep.moveTo(neartarget);
	    	creep.attack(neartarget);
	    }
    }
 }