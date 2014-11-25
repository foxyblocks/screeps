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
var spawnCost = require('spawnCost')
 exports.evaluate = function(spawnName,spawnType){
     if(spawnType === "init"){
         //spawn will be an init type by default unless changed (somewhat balanced)
         var count = {
          "alive" : {
            "harvester" : memoryManager.harvesterCount(),
            "guard" : memoryManager.guardCount(),
            "builder" : memoryManager.builderCount(),
            "medic" : memoryManager.medicCount()
          },
          "qued" : {
            "harvester" : memoryManager.queHarvesterCount(),
            "guard" : memoryManager.queGuardCount(),
            "builder" : memoryManager.queBuilderCount(),
            "medic" : memoryManager.queMedicCount()
          },
          "total" : {
            "harvester" : memoryManager.queHarvesterCount() + memoryManager.harvesterCount(),
            "guard" : memoryManager.queGuardCount() + memoryManager.guardCount(),
            "builder" : memoryManager.queBuilderCount() + memoryManager.builderCount(),
            "medic" : memoryManager.medicCount() + memoryManager.queMedicCount()
          }
         }
         var quedCreep = false;
         if(count.total.harvester < 4 && memoryManager.enemyCount() < 2 && Game.spawns[spawnName].energy >= (spawnCost.harvester(1) + spawnCost.guard(1))){
           if(count.total.guard > 0 ){
             console.log("Added harvester to que")
             this.queSpawn(spawnName,"harvester",1);
             quedCreep = true;
            }else{
              console.log("Added guard to que")
              this.queSpawn(spawnName,"guard",1);
              quedCreep = true;
            }
          }
         if(count.alive.guard > 0 && count.total.medic < (count.alive.guard / 2)){
          console.log("Added medic to que")
            this.queSpawn(spawnName,"medic",1);
            quedCreep = true;
         }
         if(count.total.guard < (memoryManager.enemyCount()*2) || count.total.guard < 1){
            console.log("Added guard to que")
            this.queSpawn(spawnName,"guard",1);
            quedCreep = true;
         }
         if(quedCreep === false){
            console.log("No actions required");
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
              break;
          }
          if(k>50){
              this.clearQue(spawnName);
              return "empty"
          }
      } 
  }
  //Spawns 1st creep in que
   if(firstNotified != null){
      var creepType = spawnQue[firstNotified].creepType;
      var level = spawnQue[firstNotified].level;
      if(creepType === "builder"){
          creepManager.spawnCreep.builder(spawnName,level)
      }
      if(creepType === "guard"){
          creepManager.spawnCreep.guard(spawnName,level)
      }
      if(creepType === "harvester"){ 
          creepManager.spawnCreep.harvester(spawnName,level)
      }
      if(creepType === "medic"){
          creepManager.spawnCreep.medic(spawnName,level);
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
            console.log("Manager: Spawn, Function: spawnNext.spawnQue(" + spawnName + ", queUrgent)");
            this.spawnQue(spawnName, queUrgent);
            return "urgent"
        }else{
            //spawn normal que
            if(queLength){
             console.log("Manager: Spawn, Function: spawnNext.spawnQue(" + spawnName + ", que)");
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
 
