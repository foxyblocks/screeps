/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawnCreep'); // -> 'a thing'
 */
exports.builder = function(spawnName, creepName, level){
    if(Game.spawns[spawnName]){
        if(!Game.creeps[creepName]){
            if(level === null || level === 0 || level === 1){
                Game.spawns[spawnName].createCreep( [Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE], creepName, {'role':'builder', 'parent':spawnName} );
            }else{
                Game.spawns[spawnName].createCreep( [Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE], creepName, {'role':'builder', 'parent':spawnName} );
            }
            console.log("LOG: spawnCreep.builder: " + creepName + " being created at " + spawnName);
        }else
        {
            console.log("ERROR: spawnCreep.builder: " + creepName + " already exists!");
        }
    }else{
        console.log("ERROR: spawnCreep.builder: " + spawnName + " doesn't exist!");
    }
};
exports.harvester = function(spawnName, creepName, level){
    if(Game.spawns[spawnName]){
        if(!Game.creeps[creepName]){
            if(level === null || level === 0 || level === 1){
                Game.spawns[spawnName].createCreep( [Game.WORK, Game.CARRY, Game.MOVE], creepName, {'role':'harvester', 'parent':spawnName} );
            }else{
                Game.spawns[spawnName].createCreep( [Game.WORK, Game.CARRY, Game.MOVE], creepName, {'role':'harvester', 'parent':spawnName} );
            }
            console.log("LOG: spawnCreep.harvester: " + creepName + " being created at " + spawnName);
        }else
        {
            console.log("ERROR: spawnCreep.harvester: " + creepName + " already exists!");
        }
    }else{
        console.log("ERROR: spawnCreep.harvester: " + spawnName + " doesn't exist!");
    }
};
exports.guard = function(spawnName, creepName, level){
    if(Game.spawns[spawnName]){
        if(!Game.creeps[creepName]){
            if(level === null || level === 0 || level === 1){
                Game.spawns[spawnName].createCreep( [Game.TOUGH, Game.ATTACK, Game.MOVE, Game.MOVE], creepName, {'role':'guard','parent':spawnName} );
            }else{
                Game.spawns[spawnName].createCreep( [Game.TOUGH, Game.ATTACK, Game.MOVE, Game.MOVE], creepName, {'role':'guard','parent':spawnName} );
            }
            console.log("LOG: spawnCreep.guard: " + creepName + " being created at " + spawnName);
        }else
        {
            console.log("ERROR: spawnCreep.guard: " + creepName + " already exists!");
        }
    }else{
        console.log("ERROR: spawnCreep.guard: " + spawnName + " doesn't exist!");
    }
};