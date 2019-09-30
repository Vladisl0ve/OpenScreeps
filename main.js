require('prototype.spawn');
require('prototype.creep');
require('prototype.tower');
module.exports.loop = function() {
  //CLEAR MEMORY
  for (let name in Memory.creeps) {
    if (Game.creeps[name] == undefined) {
      delete Memory.creeps[name];
    }
  }
  //CREEPS TO WORK
  for (let name in Game.creeps) {
    Game.creeps[name].runRole();
  }

  //TOWERS
  var towers = _.filter(Game.structures, (s) => s.structureType == STRUCTURE_TOWER);
  for (let tower of towers) {
    tower.defend();
  }

  //SPAWNS'S WORK STARTS
  for (let spawnName in Game.spawns) {
    Game.spawns[spawnName].usualWork();
  }

  if (Game.cpu.bucket <= 1000) {
    Game.notify('Bucket is under attack: ' + Game.cpu.bucket)
  }
}
