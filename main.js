require('prototype.spawn');
require('prototype.creep');
require('prototype.tower')
module.exports.loop = function() {

  //clear memory function
  for (let name in Memory.creeps) {
    if (Game.creeps[name] == undefined) {
      delete Memory.creeps[name];
    }
  }

  let harvesterRole = require('role.harvester');
  let upgraderRole = require('role.upgrader');
  let builderRole = require('role.builder');
  let repairRole = require('role.repair');
  let room = Game.spawns.Spawn1.room;
  let creepsInRoom = room.find(FIND_MY_CREEPS);
  let harvestersInRoom = 0;
  let upgradersInRoom = 0;
  let buildersInRoom = 0;
  let repairsInRoom = 0;
  let maxEnergy =  room.energyCapacityAvailable - (room.energyCapacityAvailable / 5);

  for (creep of creepsInRoom) {
    if (creep.memory.role == 'harvester')
      harvestersInRoom++;
    if (creep.memory.role == 'builder')
      buildersInRoom++;
    if (creep.memory.role == 'upgrader')
      upgradersInRoom++;
    if (creep.memory.role == 'repair')
      repairsInRoom++;
  }
  if (buildersInRoom == 0)
    maxEnergy = room.energyAvailable

  //console.log(harvestersInRoom)
  if (harvestersInRoom < 3) {
    if (Game.spawns['Spawn1'].createCustomCreep('Harvester' + Game.spawns['Spawn1'].memory.screepsName, maxEnergy, 'harvester') == OK) {
      Game.spawns['Spawn1'].memory.screepsName++;
    }
  } else if (upgradersInRoom < 2) {
    if (Game.spawns['Spawn1'].createCustomCreep('Upgrader' + Game.spawns['Spawn1'].memory.screepsName, maxEnergy, 'upgrader') == OK) {
      Game.spawns['Spawn1'].memory.screepsName++;
    }
  } else if (repairsInRoom < 0) {
    if (Game.spawns['Spawn1'].createCustomCreep('Repair' + Game.spawns['Spawn1'].memory.screepsName, maxEnergy, 'repair') == OK) {
      Game.spawns['Spawn1'].memory.screepsName++;
    }
  } else if (room.energyAvailable > (room.energyCapacityAvailable / 2000)) {
    if (Game.spawns['Spawn1'].createCustomCreep('Builder' + Game.spawns['Spawn1'].memory.screepsName, maxEnergy, 'builder') == OK) {
      Game.spawns['Spawn1'].memory.screepsName++;
    }
  }
  for (var creep of creepsInRoom) {
    if (creep.memory.role == 'harvester')
      harvesterRole.run(creep)

    if (creep.memory.role == 'upgrader')
      upgraderRole.run(creep)

    if (creep.memory.role == 'builder')
      builderRole.run(creep)

    if (creep.memory.role == 'repair')
      repairRole.run(creep)
  }

  //tower-contol point
  var towers = _.filter(Game.structures, (s) => s.structureType == STRUCTURE_TOWER);
  //for each tower
  for (let tower of towers) {
    //run tower logics
    tower.defend();
  }
  //  console.log(Game.spawns['Spawn1'].memory.screepsName)

}
