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
        var count = memoryManager.creepCount();
        var quedCreep = false;

        if(count.total.harvester < 4){
          if(memoryManager.enemyCount() < 1){
            if(Game.spawns[spawnName].energy >= spawnCost.harvester(2)){
              if(count.total.guard > 0 && count.total.medic > 0){
                this.queSpawn(spawnName,"harvester",2);
                quedCreep = true;
              }else{
                if(count.total.medic < 1){
                  this.queSpawn(spawnName,"medic",1);
                  quedCreep = true;
                }
                if(count.total.guard < 1){
                  this.queSpawn(spawnName,"guard",1);
                  quedCreep = true;
                }
                
              }
            }else{
              console.log("Need " + (spawnCost.harvester(2) - Game.spawns[spawnName].energy) + " energy to spawn a harvester")
            }
          }
        }
        count = memoryManager.creepCount();
        if(count.total.guard < (memoryManager.enemyCount()*2) || count.total.guard < 1){
          if(Game.spawns[spawnName].energy >= spawnCost.guard(1)){
            this.queSpawn(spawnName,"guard",1);
            quedCreep = true;
          }else{
            console.log("Need " + (spawnCost.guard(1) - Game.spawns[spawnName].energy) + " energy to spawn a guard")
          }
        }
        count = memoryManager.creepCount();
        if(count.alive.guard > 0 ){
          if(count.total.medic < (count.alive.guard) || count.total.medic < 1){
            if(Game.spawns[spawnName].energy >= spawnCost.medic(1)){
              this.queSpawn(spawnName,"medic",1);
              quedCreep = true;
            }else{
              console.log("Need " + (spawnCost.medic(1) - Game.spawns[spawnName].energy) + " energy to spawn a medic")
            }
          }
        }
        count = memoryManager.creepCount();
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
    if(Game.spawns[spawnName].memory.spawnQue[firstNotified] === nextQue){
      console.log("Added " + creepType + " to que")
      return "complete"
    }else{
      return "failed"
    }
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
      delete Game.spawns[spawnName].memory.spawnQue[firstNotified]
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
            //console.log("Manager: Spawn, Function: spawnNext.spawnQue(" + spawnName + ", queUrgent)");
            this.spawnQue(spawnName, queUrgent);
            return "urgent"
        }else{
            //spawn normal que
            if(queLength){
             //console.log("Manager: Spawn, Function: spawnNext.spawnQue(" + spawnName + ", que)");
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
 
