StructureSpawn.prototype.usualWork =
  function() {
    let room = this.room;

    let status = false;
    let isDoubleSourced = false;
    let sourcesInRoom = room.find(FIND_SOURCES);

    if (sourcesInRoom[1])
      isDoubleSourced = true;

    let nextSourceID = sourcesInRoom[1].id;

    let creepsInRoom = room.find(FIND_MY_CREEPS);
    let harvestersInRoom = 0;
    let upgradersInRoom = 0;
    let buildersInRoom = 0;
    let repairsInRoom = 0;
    let minersInRoom = 0;
    let lorriesInRoom = 0;
    let maxEnergy = room.energyCapacityAvailable - (room.energyCapacityAvailable / 5);

    for (creep of creepsInRoom) {
      if (creep.memory.role == 'harvester')
        harvestersInRoom++;
      if (creep.memory.role == 'builder')
        buildersInRoom++;
      if (creep.memory.role == 'upgrader')
        upgradersInRoom++;
      if (creep.memory.role == 'repair')
        repairsInRoom++;
      if (creep.memory.role == 'miner')
        minersInRoom++;
      if (creep.memory.role == 'lorry')
        lorriesInRoom++;
    }


    if (minersInRoom == 1 && isDoubleSourced) {
      for (creep of creepsInRoom) {
        if (creep.memory.role == 'miner') {
          if (creep.memory.idSource == sourcesInRoom[1].id) {
            nextSourceID = sourcesInRoom[0].id
          }
        }
      }
    }

    if (lorriesInRoom == 1 && isDoubleSourced) {
      for (creep of creepsInRoom) {
        if (creep.memory.role == 'lorry') {
          if (creep.memory.idSource == sourcesInRoom[1].id) {
            nextSourceID = sourcesInRoom[0].id
          }
        }
      }
    }

    if (isDoubleSourced) {
      if (minersInRoom < 1 || lorriesInRoom < 1)
        status = false; // bad conditions of life
      else
        status = true; // fine conditions of life
    } else {
      if (minersInRoom < 1 && lorriesInRoom < 1)
        status = false; // bad conditions of life
      else
        status = true; // fine conditions of life
    }

    if (!status) {
      maxEnergy = room.energyAvailable

      if (harvestersInRoom < 1) {
        if (this.createCustomCreep('Harvester' + this.memory.screepsName + room.name, maxEnergy, 'harvester') == OK) {
          this.memory.screepsName++;
        }
      } else if (minersInRoom < 1) {
        if (this.createMinerCreep('Miner' + this.memory.screepsName + room.name, maxEnergy, nextSourceID) == OK) {
          this.memory.screepsName++;
        }
      } else if (lorriesInRoom < 1) {
        if (this.createLorryCreep('Lorry' + this.memory.screepsName + room.name, maxEnergy, nextSourceID) == OK) {
          this.memory.screepsName++;
        }

      }

    } else {
      if (minersInRoom < 2 && isDoubleSourced) {
        if (this.createMinerCreep('Miner' + this.memory.screepsName + room.name, maxEnergy, nextSourceID) == OK) {
          this.memory.screepsName++;
        }
      } else if (lorriesInRoom < 2 && isDoubleSourced) {
        if (this.createLorryCreep('Lorry' + this.memory.screepsName + room.name, maxEnergy, nextSourceID) == OK) {
          this.memory.screepsName++;
        }
      } else if (upgradersInRoom < 1) {
        if (this.createCustomCreep('Upgrader' + this.memory.screepsName + room.name, maxEnergy, 'upgrader') == OK) {
          this.memory.screepsName++;
        }
      } else if (buildersInRoom < 2) {
        if (this.createCustomCreep('Builder' + this.memory.screepsName + room.name, maxEnergy, 'builder') == OK) {
          this.memory.screepsName++;
        }
      }
    }
  };


StructureSpawn.prototype.createCustomCreep =
  function(name, energy, roleName) {
    // create a balanced body as big as possible with the given energy
    var numberOfParts = Math.floor(energy / 200);
    // make sure the creep is not too big (more than 50 parts)
    numberOfParts = Math.min(numberOfParts, Math.floor(50 / 3));
    var body = [];
    for (let i = 0; i < numberOfParts; i++) {
      body.push(WORK);
    }
    for (let i = 0; i < numberOfParts; i++) {
      body.push(CARRY);
    }
    for (let i = 0; i < numberOfParts; i++) {
      body.push(MOVE);
    }

    let idSourceAvailable = 0;
    if (Game.spawns.Spawn1.memory.screepsName % 2 == 0) {
      idSourceAvailable = '5bbcaac09099fc012e632237'
    } else {
      idSourceAvailable = '5bbcaac09099fc012e632236'
    }

    return this.spawnCreep(body, name, {
      memory: {
        role: roleName,
        isDelivering: true,
        idSource: idSourceAvailable,
        path: null
      }
    })
  };

StructureSpawn.prototype.createMinerCreep =
  function(name, energy, idSource) {

    var numberOfParts = Math.floor(energy / 250);
    var body = [];
    for (let i = 0; i < numberOfParts * 2; i++) {
      body.push(WORK);
    }
    for (let i = 0; i < numberOfParts; i++) {
      body.push(MOVE);
    }

    return this.spawnCreep(body, name, {
      memory: {
        role: 'miner',
        idSource: idSource
      }
    });
  };

StructureSpawn.prototype.createLorryCreep =
  function(name, energy, idSource) {
    var numberOfParts = Math.floor(energy / 150);
    var body = [];
    for (let i = 0; i < numberOfParts * 2; i++) {
      body.push(CARRY);
    }
    for (let i = 0; i < numberOfParts; i++) {
      body.push(MOVE);
    }

    return this.spawnCreep(body, name, {
      memory: {
        role: 'lorry',
        isDelivering: true,
        idSource: idSource
      }
    });
  };
