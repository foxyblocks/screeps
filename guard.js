/* guard.js
 * guard.spawn(spawnName, creepName, level)   -- calls spawnCreep for a guard
 * guard.defend(creep) -- performs role of defending nearest hostilecreep
 */
 exports.defend = function(creep){
    if(creep.memory.role == 'guard') {
	    var neartarget = creep.pos.findNearest(Game.HOSTILE_CREEPS);
    	if(neartarget) {
    		creep.moveTo(neartarget);
	    	creep.attack(neartarget);
	    }
    }
 }