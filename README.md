screeps magiik library
=======
Intended usage ==  To use few "Manager" modules to automate most functions you could need.
Modules will be based on their purpose and what they effect
memoryManager.js will work with storing and retrieving data from the game Memory.
Format:
#module
  * module.function(params) -> returned data
      Purpose of the function
  
  
#memoryManager.js
  * memoryManager.clearDeadCreeps() -> "complete"
      * Clears dead creeps from the memory as to create new ones
  * memoryManager.updateSpawnInfo() -> "complete"
      * updates spawn Memory info for each spawn based on current creeps
  * memoryManager.guardCount() -> count (integer number of guards)
      * returns count of guard Creeps
  * memoryManager.harvesterCount() -> count (integer number of harvesters)
      * returns count of harvester Creeps
  * memoryManager.builderCount() -> count (integer number of builders)
      * returns count of builder Creeps
