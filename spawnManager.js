/* spawnManager.js
 * spawnManager.evaluate(spawnName,spawnType) -- evaluates needs to spawn based on spawnType
 * spawnManager.clearQue(spawnName) -- clears the que for given spawn
 * spawnManager.queSpawn(spawnName,creepType,level) -- adds a creepType with a given level to the spawn que of spawnName
 * spawnManager.queUrgentSpawn(spawnName,creepType,level) -- same as queSpawn but in the urgentQue which spawns first
 * spawnManager.spawnQue(spawnName,spawnQue) -- spawns the next creep in the given que at a spawn.
 * spawnManager.spawnNext(spawnName) -- checks if there are creeps in the que and spawns them based on urgency
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
     return "complete"
 };
 exports.clearQue = function(spawnName){
     Game.spawns[spawnName].spawnQue = {};
     return "complete"
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
    return "complete"
 };
 exports.queUrgentSpawn = function(spawnName,creepType,level){
    var nextQue = {"creepType": creepType, "level":level};
    var que = Game.spawns[spawnName].memory.spawnUrgentQue;
    var firstNotified = null;
    if(que){
        var queLength = Object.keys(que).length;
        for(var k = 0; k< 100; k++){
                    if(!Game.spawns[spawnName].memory.spawnUrgentQue[k]){
                        if(firstNotified===null){
                            firstNotified=k;
                        }
                    }
                }
        Game.spawns[spawnName].memory.spawnUrgentQue[firstNotified] = nextQue;
    }else{
        Game.spawns[spawnName].memory.spawnUrgentQue[0] = nextQue;
    }
    return "complete"
 };
 exports.spawnQue = function(spawnName,spawnQue){
  //Gets the first slot that isn't empty
  var firstNotified = null
  for(var k = 0; k< 100; k++){
      if(spawnQue[k]){
          if(firstNotified===null){
              firstNotified=k;
          }
          if(k>50){
              this.clearQue(spawnName);
              return "empty"
          }
      }
  }
  //Spawns 1st creep in que
   if(firstNotified != null){
    console.log("...firstNotified : " + firstNotified);
      var creepType = spawnQue[firstNotified].creepType;
      var level = spawnQue[firstNotified].level;
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
   }else{
    return "empty"
   }
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
            console.log("Manager: Spawn, Function: spawnNext.spawnQue(" + spawnName + "queUrgent), spawning next in que");
            this.spawnQue(spawnName, queUrgent);
            return "urgent"
        }else{
            //spawn normal que
            if(queLength){
             console.log("Manager: Spawn, Function: spawnNext.spawnQue(" + spawnName + "que), spawning next in que");
             this.spawnQue(spawnName,que);
             return "normal"
            }
        }
    }else{
        console.log(spawnName + " is working.")
        return "busy"
        //Game.spawns[spawnName].memory.spawnStage = 2;
    }
 }
 
