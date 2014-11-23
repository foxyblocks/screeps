var harvester = require('harvester');
var builder = require('builder');
var guard = require('guard');
for(var i in Game.spawns){
    var spawnName = Game.spawns[i].id
    console.log(spawnName)
    Memory.spawns.spawnName = [ {"id": i}];
}
if(Memory.test != true){
    var spawnName = "Spawn1";
    var creepName = "test4";
    harvester.spawn(spawnName,creepName);
    Memory.test = true;
}
// To set Memory just use Memory.variable = data
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