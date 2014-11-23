var harvester = require('harvester');
var builder = require('builder');
var guard = require('guard');
var spawnCost = require('spawnCost');
var spawnCreep = require('spawnCreep');

for(var i in Game.spawns){
    var spawnName = Game.spawns[i].id;
    if(Game.spawns[i].memory.id != spawnName){
        Game.spawns[i].memory.id = i;
    }
}
// To set Memory just use Memory.variable = data
// Perform Role Actions
for(var name in Game.creeps) {
    var creep = Game.creeps[name];
    if(creep.memory.role == 'guard'){
        guard.defend(creep);
    }
    if(creep.memory == 'harvester' || creep.memory.role =='harvester') {
        harvester.harvest(creep);
    }

    if(creep.memory.role == 'builder') {
        builder.build(creep);
    }
    
}