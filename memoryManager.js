/* memoryManager.js
 * memoryManager.clearDeadCreeps() -- Clears dead creeps from the memory as to create new ones
 * memoryManager.updateSpawnInfo() -- updates spawn Memory info for each spawn based on current creeps
 */
var creepManager = require('creepManager');
exports.guardCount = function(){
    var count = 0;
    for(var i in Game.spawns){
        count += Game.spawns[i].memory.children.alive.guards;
    }
    return count;
}
exports.harvesterCount = function(){
    var count = 0;
    for(var i in Game.spawns){
        count += Game.spawns[i].memory.children.alive.harvesters;
    }
    return count;
}
exports.enemyCount = function(){
    var enemyCount = 0;
    var spawnSpy;
    for(var x in Game.spawns){
        if(Game.spawns[x]){
            spawnSpy = Game.spawns[x];
        }
    }
    var targets = spawnSpy.room.find(Game.HOSTILE_CREEPS);
    if(targets.length) {
        for(var i in targets){
            enemyCount +=1;
        }   
    }
    return enemyCount;
}
exports.clearDeadCreeps = function(){
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            if(!creepManager.getSpawning(i)){
                console.log("Creep " + i + " dead, removing from memory.");
                delete Memory.creeps[i];
            }
        }else{
            if(creepManager.getSpawning(i)){
                creepManager.setSpawning(i,false);
            }
        }
    }
}
exports.updateSpawnInfo = function(){
    for(var i in Game.spawns){
        if(!Game.spawns[i].memory.spawnType){
            Game.spawns[i].memory.spawnType = "init";
        }
        if(!Game.spawns[i].memory.spawnQue){
            Game.spawns[i].memory.spawnQue = {};
        }
        if(!Game.spawns[i].memory.children){
            Game.spawns[i].memory.children = {};
        }
        if(!Game.spawns[i].memory.children.created){
            Game.spawns[i].memory.children.created = 0;
        }
        if(!Game.spawns[i].memory.children.alive){
            Game.spawns[i].memory.children.alive = {};
        }
        Game.spawns[i].memory.children.alive.total = 0;
        Game.spawns[i].memory.children.alive.builders = 0;
        Game.spawns[i].memory.children.alive.harvesters = 0;
        Game.spawns[i].memory.children.alive.guards = 0;
        for(var creepName in Game.creeps){
            var creep = Game.creeps[creepName];
            var parentSpawn = creep.memory.parentSpawn;
            if(parentSpawn){
                Game.spawns[parentSpawn].memory.children.alive.total += 1;
                if(creep.memory.role === 'builder'){
                    Game.spawns[parentSpawn].memory.children.alive.builders += 1;
                }
                if(creep.memory.role === 'harvester'){
                    Game.spawns[parentSpawn].memory.children.alive.harvesters += 1;
                }
                if(creep.memory.role === 'guard'){
                    Game.spawns[parentSpawn].memory.children.alive.guards += 1;
                }
            }
            
        }
    }
}