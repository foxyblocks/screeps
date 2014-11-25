/* medic.js
 * medic.heal(creep) -- sends creep to nearest guard that is damaged and heals them
 */
 var _ = require('lodash');
 exports.healNearestGuard = function(creep){
    if(creep.memory.role === 'medic') {
	    var guards = _.filter(Game.creeps, {
    		memory: {role: 'guard'}
		});
		var nearGuard = creep.pos.findNearest(Game.MY_CREEPS, {
		    filter: function(object) {
		        return object.memory.role == "guard";
		    }
		});
    	if(nearGuard) {
    		if(nearGuard.hits < nearGuard.hitsMax){
    			console.log(nearGuard.name + " needs to be healed.")
    			creep.moveTo(nearGuard);
	    		creep.heal(nearGuard);
    		}else{
    			creep.moveTo(nearGuard);
    		}
	    }else{
	    	console.log(guards)
			creep.moveTo(Game.spawns[creep.memory.parentSpawn]);
		}
    }
 }