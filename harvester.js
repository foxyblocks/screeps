/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester'); // -> 'a thing'
 */
 /*
 * harvester.spawn(spawnName, creepName)    --- spawnName is name of spawn, harvesterName will be calculated (ex harvester1)
 * harvester.harvest(creep) --- makes creep search for the nearest energy block and harvest it.
 *
 */
 exports.spawn = function(spawnName, creepName){
     Game.spawns[spawnName].createCreep( [Game.WORK, Game.CARRY, Game.MOVE], creepName, {'role':'harvester'} );
 }
 exports.harvest = function (creep) {

	if(creep.energy < creep.energyCapacity) {
	    var source = creep.pos.findNearest(Game.SOURCES);
        creep.moveTo(source);
        creep.harvest(source);
	}
	else {
		creep.moveTo(Game.spawns.Spawn1);
		creep.transferEnergy(Game.spawns.Spawn1)
	}
}