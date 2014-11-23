/* harvester.js
 * harvester.spawn(spawnName, creepName)    --- spawnName is name of spawn, harvesterName will be calculated (ex harvester1)
 * harvester.harvest(creep) --- makes creep search for the nearest energy block and harvest it.
 */
 exports.spawn = function(spawnName, creepName,level){
      spawnCreep.harvester(spawnName, creepName, level);
  }
 exports.harvest = function (creep) {

	if(creep.energy < creep.energyCapacity) {
	    var source = creep.pos.findNearest(Game.SOURCES);
        creep.moveTo(source);
        creep.harvest(source);
	}
	else {
	    var parentSpawn = Game.spawns[creep.memory.parentSpawn]
		creep.moveTo(parentSpawn)
		creep.transferEnergy(parentSpawn);
	}
};