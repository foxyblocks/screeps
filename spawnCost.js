/* spawnCost.js
 * spawnCost.builder(level) -- returns cost in energy to build each level of a creep
 * MOVE = 50
 * WORK = 20
 * CARRY = 50
 * ATTACK = 100
 * TOUGH = 5
 */
exports.builder = function(level){
    if(level === 0 || level === 1){
        return 160; // 3xWORK 1xCARRY 1xMOVE
    }else{
        return 160;
    }
};
exports.harvester = function(spawnName, creepName, level){
    if(level === 0 || level === 1){
        return 120; // 1xWORK 1xCARRY 1xMOVE
    }else{
        return 120;
    }
};
exports.guard = function(spawnName, creepName, level){
    if(level === 0 || level === 1){
        return 205; // 1xTOUGH 2xMOVE 1xATTACK
    }else{
        return 205;
    }
};