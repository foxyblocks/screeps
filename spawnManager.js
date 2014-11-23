/* spawnManager.js
 * spawnManager.evaluate(spawnName,spawnType) --evaluates needs to spawn based on spawnType
 */
var memoryManager = require('memoryManager');
var creepManager = require('creepManager');
 exports.evaluate = function(spawnName,spawnType){
     if(spawnType === "init"){
         //spawn will be an init type by default unless changed (somewhat balanced)
         if(memoryManager.harvesterCount() < 1){
             this.queSpawn(spawnName,"harvester",1);
         }
         if(memoryManager.harvesterCount() < 10 && memoryManager.enemyCount() < 2){
             this.queSpawn(spawnName,"harvester",1);
         }
         if(memoryManager.guardCount() < (memoryManager.enemyCount()*1.2)){
            this.queSpawn(spawnName,"guard",1);
         }
     }
     this.spawnNext(spawnName);
 };
 exports.clearQue = function(spawnName){
     Game.spawns[spawnName].spawnQue = {};
 };
 exports.queSpawn = function(spawnName,creepType,level){
    var nextQue = {"creepType": creepType, "level":level};
    var que = Game.spawns[spawnName].memory.spawnQue;
    var firstNotified = null;
    if(que){
        var queLength = Object.keys(que).length;
        for(var k = 0; k< 100; k++){
                    if(!Game.spawns[spawnName].memory.spawnQue[k]){
                        if(firstNotified===null){
                            firstNotified=k;
                        }
                    }
                }
        Game.spawns[spawnName].memory.spawnQue[firstNotified] = nextQue;
    }else{
        Game.spawns[spawnName].memory.spawnQue[0] = nextQue;
    }
 };
 exports.queUrgentSpawn = function(spawnName,creepType,level){
    //Same as queSpawn but into the spawnUrgentQue for priority ques such as attacks.
 };
 exports.spawnNext = function(spawnName){
    var que = Game.spawns[spawnName].memory.spawnQue
    var queUrgent = Game.spawns[spawnName].memory.spawnUrgentQue
    if(que){
        var queLength = Object.keys(que).length;
    }
    if(queUrgent){
        var queUrgentLength = Object.keys(queUrgent).length;
    }
    if(!Game.spawns[spawnName].spawning ){
        if(queUrgentLength){
            //spawn urgent que
        }else{
            //spawn normal que
            if(que){
                var firstNotified = null
                for(var k = 0; k< 100; k++){
                    if(Game.spawns[spawnName].memory.spawnQue[k]){
                        if(firstNotified===null){
                            firstNotified=k;
                        }
                        if(k>50){
                            this.clearQue(spawnName);
                        }
                    }
                }
                 if(firstNotified != null){
                    var creepType = Game.spawns[spawnName].memory.spawnQue[firstNotified].creepType;
                    var level = Game.spawns[spawnName].memory.spawnQue[firstNotified].level;
                    //Game.spawns[spawnName].memory.spawnStage = 1;
                    if(creepType === "builder"){
                        creepManager.spawnCreep.builder(spawnName,creepManager.nextCreepName(creepType),level)
                    }
                    if(creepType === "guard"){
                        creepManager.spawnCreep.guard(spawnName,creepManager.nextCreepName(creepType),level)
                    }
                    if(creepType === "harvester"){
                        creepManager.spawnCreep.harvester(spawnName,creepManager.nextCreepName(creepType),level)
                    }
                    delete Game.spawns[spawnName].memory.spawnQue[firstNotified]
                    return "complete"
                 }
            }
        }
    }else{
        console.log(spawnName + " is working.")
        //Game.spawns[spawnName].memory.spawnStage = 2;
    }
 }