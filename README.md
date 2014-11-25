screeps magiik library
=======
Intended usage ==  To use few "Manager" modules to automate most functions you could need.

Modules will be based on their purpose and what they effect
memoryManager.js will work with storing and retrieving data from the game Memory.

#exampleModule.js
  * exampleModule.function(params) -> returned data
      * Purpose of the function
  
  
#memoryManager.js
  * memoryManager.clearDeadCreeps() => "complete"
      * Clears dead creeps from the memory as to create new ones
  * memoryManager.updateSpawnInfo() => "complete"
      * updates spawn Memory info for each spawn based on current creeps
  * memoryManager.guardCount() => count (integer number of guards)
      * returns count of guard Creeps
  * memoryManager.harvesterCount() => count (integer number of harvesters)
      * returns count of harvester Creeps
  * memoryManager.builderCount() => count (integer number of builders)
      * returns count of builder Creeps

#creepManager.js
 * creepManager.getSpawning(creep) => true or false
     * reads memory to check if a creep is still spawning
 * creepManager.setSpawning(creep,true/false) => "complete" 
     * sets memory of a creep if it is spawning or not (val)
 * creepManager.nextCreepName(creepType) => creepName
     * returns the next available unique creep name based on type
 * creepManager.roleActions() => "complete"
     * makes each creep perform their role action
 * === Access to spawnCreep.js ===
 * creepManager.spawnCreep.creepExists(creepType, creepID) => true or false
     * returns true/false if a creep exists with given ID of given type
 * creepManager.spawnCreep.role(spawnName,creepName,level) 
     * spawns a creep with a role (replace role with a role type)
       * Example: creepManager.spawnCreep.role(spawnName,creepName,level) 

#spawnManager.js
 * spawnManager.evaluate(spawnName,spawnType) => "complete"
   * evaluates needs to spawn based on spawnType
 * spawnManager.clearQue(spawnName)  => "complete"
   * clears the que for given spawn
 * spawnManager.queSpawn(spawnName,creepType,level) => "complete"
   * adds a creepType with a given level to the spawn que of spawnName
 * spawnManager.queUrgentSpawn(spawnName,creepType,level) => "complete"
   * same as queSpawn but in the urgentQue which spawns first
 * spawnManager.spawnQue(spawnName,spawnQue) => status 
   * status = "complete" for success, "empty" for an empty que, "cleared" for que with over 50 empty slots
   * spawns the next creep in the given que at a spawn.
 * spawnManager.spawnNext(spawnName) => status
   * status = "busy" for busy spawn, "normal" for spawning normal, "urgent" for Urgent que
   * checks if there are creeps in the que and spawns them based on urgency
