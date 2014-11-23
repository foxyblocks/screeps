/* guard.js
 * guard.spawn(spawnName, creepName, level)   -- calls spawnCreep for a guard
 * guard.defend(creep) -- performs role of defending nearest hostilecreep
 */
 exports.spawn = function(spawnName, creepName,level){
      spawnCreep.guard(spawnName, creepName, level);
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