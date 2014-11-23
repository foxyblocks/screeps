/* spawnCreep.js
 * see creepManager for use
 */
 var spawnCost = require('spawnCost');
 //var creepManager = require('creepManager');
exports.builder = function(spawnName, creepName, level){
    if(Game.spawns[spawnName]){
        if(Game.spawns[spawnName].energy >= spawnCost.builder(level)){
            if(!Game.creeps[creepName]){
                if(level === null || level === 0 || level === 1){
                    Game.spawns[spawnName].createCreep( [Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE], creepName, {'role':'builder', 'parentSpawn':spawnName, 'spawning':true} );
                }else{
                    Game.spawns[spawnName].createCreep( [Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE], creepName, {'role':'builder', 'parentSpawn':spawnName, 'spawning':true} );
                }
                Memory.creeps[creepName].spawning = true;
                Game.spawns[spawnName].memory.children.created += 1;
                console.log("LOG: spawnCreep.builder: " + creepName + " being created at " + spawnName);
            }else
            {
                console.log("ERROR: spawnCreep.builder: " + creepName + " already exists!");
            }
        }else{
            console.log("ERROR: " + spawnName + " has " + Game.spawns[spawnName].energy + "/" + spawnCost.builder(level) + "energy to spawn creep");
        }
    }else{
        console.log("ERROR: spawnCreep.builder: " + spawnName + " doesn't exist!");
    }
};
exports.harvester = function(spawnName, creepName, level){
    if(Game.spawns[spawnName]){
        if(Game.spawns[spawnName].energy >= spawnCost.harvester(level)){
            if(!Game.creeps[creepName]){
                if(level === null || level === 0 || level === 1){
                    Game.spawns[spawnName].createCreep( [Game.WORK, Game.CARRY, Game.MOVE], creepName, {'role':'harvester', 'parentSpawn':spawnName, 'spawning':true} );
                }else{
                    Game.spawns[spawnName].createCreep( [Game.WORK, Game.CARRY, Game.MOVE], creepName, {'role':'harvester', 'parentSpawn':spawnName, 'spawning':true} );
                }
                Game.spawns[spawnName].memory.children.created += 1;
                console.log("LOG: spawnCreep.harvester: " + creepName + " being created at " + spawnName);
            }else
            {
                console.log("ERROR: spawnCreep.harvester: " + creepName + " already exists!");
            }
        }else{
            console.log("ERROR: " + spawnName + " has " + Game.spawns[spawnName].energy + "/" + spawnCost.harvester(level) + "energy to spawn creep");
        }
    }else{
        console.log("ERROR: spawnCreep.harvester: " + spawnName + " doesn't exist!");
    }
};
exports.guard = function(spawnName, creepName, level){
    if(Game.spawns[spawnName]){
        if(Game.spawns[spawnName].energy >= spawnCost.guard(level)){
            if(!Game.creeps[creepName]){
                if(level === null || level === 0 || level === 1){
                    Game.spawns[spawnName].createCreep( [Game.TOUGH, Game.ATTACK, Game.MOVE, Game.MOVE], creepName, {'role':'guard','parentSpawn':spawnName, 'spawning':true} );
                }else{
                    Game.spawns[spawnName].createCreep( [Game.TOUGH, Game.ATTACK, Game.MOVE, Game.MOVE], creepName, {'role':'guard','parentSpawn':spawnName, 'spawning':true} );
                }
                Game.spawns[spawnName].memory.children.created += 1;
                console.log("LOG: spawnCreep.guard: " + creepName + " being created at " + spawnName);
            }else
            {
                console.log("ERROR: spawnCreep.guard: " + creepName + " already exists!");
            }
        }else{
            console.log("ERROR: " + spawnName + " has " + Game.spawns[spawnName].energy + "/" + spawnCost.guard(level) + "energy to spawn creep");
        }
    }else{
        console.log("ERROR: spawnCreep.guard: " + spawnName + " doesn't exist!");
    }
};