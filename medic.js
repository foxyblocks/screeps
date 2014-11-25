/* medic.js
 * medic.heal(creep) -- sends creep to nearest guard that is damaged and heals them
 */
 var _ = require('lodash');
 exports.healNearestGuard = function(creep){
    if(creep.memory.role === 'medic') {
	    var guards = _.filter(Game.creeps, {
    		memory: {role: 'guard'}
		});
		var nearGuard = creep.pos.findNearest(guards);
    	if(nearGuard) {
    		if(nearGuard.hits < nearGuard.hitsMax){
    			console.log(nearGuard + " needs to be healed.")
    		}
    		creep.moveTo(nearGuard);
	    	creep.heal(nearGuard);
	    }
    }
 }