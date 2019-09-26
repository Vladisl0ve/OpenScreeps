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
  function(name, idSource) {
    return this.createCreep([WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE], name, {
      role: 'miner',
      sourceId: sourceId
    });
  }
