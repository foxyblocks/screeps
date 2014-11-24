/* spawnCreep.js
 * see creepManager for use
 */
 var spawnCost = require('spawnCost');
 var creepLevel = require('creepLevel');
 //var creepManager = require('creepManager');
exports.builder = function(spawnName, creepName, level){
    if(Game.spawns[spawnName]){
        if(Game.spawns[spawnName].energy >= spawnCost.builder(level)){
            if(!Game.creeps[creepName]){
                Game.spawns[spawnName].createCreep(  creepLevel.getParts("builder",level), creepName, {'role':'builder', 'parentSpawn':spawnName, 'spawning':true} );
                Game.spawns[spawnName].memory.children.created += 1;
                console.log("LOG: spawnCreep.builder: " + creepName + " being created at " + spawnName);
            }else
            {
                console.log("ERROR: spawnCreep.builder: " + creepName + " already exists!");
            }
        }else{
            console.log("ERROR: " + spawnName + " has " + Game.spawns[spawnName].energy + "/" + spawnCost.builder(level) + "energy to spawn builder");
        }
    }else{
        console.log("ERROR: spawnCreep.builder: " + spawnName + " doesn't exist!");
    }
};
exports.harvester = function(spawnName, creepName, level){
    if(Game.spawns[spawnName]){
        if(Game.spawns[spawnName].energy >= spawnCost.harvester(level)){
            if(!Game.creeps[creepName]){
                Game.spawns[spawnName].createCreep( creepLevel.getParts("harvester",level), creepName, {'role':'harvester', 'parentSpawn':spawnName, 'spawning':true} );
                Game.spawns[spawnName].memory.children.created += 1;
                console.log("LOG: spawnCreep.harvester: " + creepName + " being created at " + spawnName);
            }else
            {
                console.log("ERROR: spawnCreep.harvester: " + creepName + " already exists!");
            }
        }else{
            console.log("ERROR: " + spawnName + " has " + Game.spawns[spawnName].energy + "/" + spawnCost.harvester(level) + "energy to spawn harvester");
        }
    }else{
        console.log("ERROR: spawnCreep.harvester: " + spawnName + " doesn't exist!");
    }
};
exports.guard = function(spawnName, creepName, level){
    if(Game.spawns[spawnName]){
        if(Game.spawns[spawnName].energy >= spawnCost.guard(level)){
            if(!Game.creeps[creepName]){
                Game.spawns[spawnName].createCreep( creepLevel.getParts("guard",level), creepName, {'role':'guard','parentSpawn':spawnName, 'spawning':true} );
                Game.spawns[spawnName].memory.children.created += 1;
                console.log("LOG: spawnCreep.guard: " + creepName + " being created at " + spawnName);
            }else
            {
                console.log("ERROR: spawnCreep.guard: " + creepName + " already exists!");
            }
        }else{
            console.log("ERROR: " + spawnName + " has " + Game.spawns[spawnName].energy + "/" + spawnCost.guard(level) + "energy to spawn guard");
        }
    }else{
        console.log("ERROR: spawnCreep.guard: " + spawnName + " doesn't exist!");
    }
};