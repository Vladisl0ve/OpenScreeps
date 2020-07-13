require('prototype.spawn')
require('prototype.creep')
require('prototype.tower')
module.exports.loop = function () {
  let harvesterRole = require('role.harvester')
  let upgraderRole = require('role.upgrader')
  let builderRole = require('role.builder')
  let repairRole = require('role.repair')
  let minerRole = require('role.miner')
  let lorryRole = require('role.lorry')
  // clear memory function
  for (let name in Memory.creeps) {
    if (Game.creeps[name] == undefined) {
      delete Memory.creeps[name]
    }
  }
 //tut na4netsa funkcja (Spawn ThatSpawn) {

  //spawner info
  let room = Game.spawns.ThatSpawn.room
  let status = false
  let stageSpawn = -1
  let sources = room.find(FIND_SOURCES)

  //creeps info
  let creepsInRoom = room.find(FIND_MY_CREEPS)
  let harvestersInRoom = 0
  let upgradersInRoom = 0
  let buildersInRoom = 0
  let repairsInRoom = 0
  let minersInRoom = 0
  let lorriesInRoom = 0
  let maxEnergy = room.energyCapacityAvailable - (room.energyCapacityAvailable / 5)

  for (creep of creepsInRoom) {
    if (creep.memory.role == 'harvester') {
      harvestersInRoom++
    }
    if (creep.memory.role == 'builder') {
      buildersInRoom++
    }
    if (creep.memory.role == 'upgrader') {
      upgradersInRoom++
    }
    if (creep.memory.role == 'repair') {
      repairsInRoom++
    }
    if (creep.memory.role == 'miner') {
      minersInRoom++
    }
    if (creep.memory.role == 'lorry') {
      lorriesInRoom++
    }
  }

  if ((minersInRoom == 0 && lorriesInRoom == 0) || room.find(FIND_MY_STRUCTURES, {
    filter: { structureType: STRUCTURE_EXTENSION }
  }).length == 0) {
    stageSpawn = 0
  } else {
    stageSpawn = 1
  }

  switch(stageSpawn) {
    case 0:
    if(harvestersInRoom < 1){
      if (ThatSpawn.createCustomCreep('Harvester' + ThatSpawn.memory.screepsName, maxEnergy, 'harvester') == OK)
        ThatSpawn.memory.screepsName++
          }
      else if (upgradersInRoom < 2) {
       if (ThatSpawn.createCustomCreep('Upgrader' + ThatSpawn.memory.screepsName, maxEnergy, 'upgrader') == OK) {
         ThatSpawn.memory.screepsName++;
          }
      }
      break;
    case 1:
      break:
  }



  /*

  if (minersInRoom < 1 || lorriesInRoom < 1) {
    status = false
  } // bad conditions of life
  else {
    status = true
  } // fine conditions of life

  // console.log(nextMinersID)
  if (!status) {
    maxEnergy = room.energyAvailable

    // console.log(harvestersInRoom)
    if (harvestersInRoom < 1) {
      if (Game.spawns['Spawn1'].createCustomCreep('Harvester' + Game.spawns['Spawn1'].memory.screepsName, maxEnergy, 'harvester') == OK) {
        Game.spawns['Spawn1'].memory.screepsName++
      }
    } else if (minersInRoom < 1) {
      if (Game.spawns['Spawn1'].createMinerCreep('Miner' + Game.spawns['Spawn1'].memory.screepsName, maxEnergy, nextMinersID) == OK) {
        Game.spawns['Spawn1'].memory.screepsName++
      }
    } else if (lorriesInRoom < 1) {
      if (Game.spawns['Spawn1'].createLorryCreep('Lorry' + Game.spawns['Spawn1'].memory.screepsName, maxEnergy, nextMinersID) == OK) {
        Game.spawns['Spawn1'].memory.screepsName++
      }
    }
    // else if (upgradersInRoom < 2) {
    //   if (Game.spawns['Spawn1'].createCustomCreep('Upgrader' + Game.spawns['Spawn1'].memory.screepsName, maxEnergy, 'upgrader') == OK) {
    //     Game.spawns['Spawn1'].memory.screepsName++;
    //   }
    // } else if (repairsInRoom < 0) {
    //   if (Game.spawns['Spawn1'].createCustomCreep('Repair' + Game.spawns['Spawn1'].memory.screepsName, maxEnergy, 'repair') == OK) {
    //     Game.spawns['Spawn1'].memory.screepsName++;
    //   }
    // } else if (buildersInRoom < 1) {
    //   if (room.energyAvailable > (room.energyCapacityAvailable / 2000)) {
    //     if (Game.spawns['Spawn1'].createCustomCreep('Builder' + Game.spawns['Spawn1'].memory.screepsName, maxEnergy, 'builder') == OK) {
    //       Game.spawns['Spawn1'].memory.screepsName++;
    //     }
    //   }
    // }
  } else {


    */
    if (minersInRoom < 2) {
      if (Game.spawns['Spawn1'].createMinerCreep('Miner' + Game.spawns['Spawn1'].memory.screepsName, maxEnergy, nextMinersID) == OK) {
        Game.spawns['Spawn1'].memory.screepsName++
      }
    } else if (lorriesInRoom < 2) {
      if (Game.spawns['Spawn1'].createLorryCreep('Lorry' + Game.spawns['Spawn1'].memory.screepsName, maxEnergy, nextMinersID) == OK) {
        Game.spawns['Spawn1'].memory.screepsName++
      }
    } else if (upgradersInRoom < 4) {
      if (Game.spawns['Spawn1'].createCustomCreep('Upgrader' + Game.spawns['Spawn1'].memory.screepsName, maxEnergy, 'upgrader') == OK) {
        Game.spawns['Spawn1'].memory.screepsName++
      }
    } else if (buildersInRoom < 3) {
      if (Game.spawns['Spawn1'].createCustomCreep('Builder' + Game.spawns['Spawn1'].memory.screepsName, maxEnergy, 'builder') == OK) {
        Game.spawns['Spawn1'].memory.screepsName++
      }
    }
  }
  for (var creep of creepsInRoom) {
    if (creep.memory.role == 'harvester') {
      harvesterRole.run(creep)
    }

    if (creep.memory.role == 'upgrader') {
      upgraderRole.run(creep)
    }

    if (creep.memory.role == 'builder') {
      builderRole.run(creep)
    }

    if (creep.memory.role == 'repair') {
      repairRole.run(creep)
    }

    if (creep.memory.role == 'miner') {
      minerRole.run(creep)
    }

    if (creep.memory.role == 'lorry') {
      lorryRole.run(creep)
    }
  }

  // tower-contol point
  var towers = _.filter(Game.structures, (s) => s.structureType == STRUCTURE_TOWER)
  // for each tower
  for (let tower of towers) {
    // run tower logics
    tower.defend()
  }
  //  console.log(Game.spawns['Spawn1'].memory.screepsName)
}
