module.exports = {

  run: function(creep) {
    const source = Game.getObjectById(creep.memory.idSource); //creep.pos.findPathTo(Game.getObjectById(creep.memory.idSource))
    const storage = creep.room.storage;
    let droppedEnergy = source.pos.findInRange(FIND_DROPPED_RESOURCES, 1, {
      filter: s => s.resourceType == RESOURCE_ENERGY
    });
    const building = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    let container = source.pos.findInRange(FIND_STRUCTURES, 1, {
      filter: s => s.structureType == STRUCTURE_CONTAINER
    })[0];

    if (building == null) {
      let repair = require('role.repair');
      repair.run(creep);
    }
    if ((!storage || storage.store[RESOURCE_ENERGY] < creep.carryCapacity) && creep.memory.isDelivering) {
      if (container.store[RESOURCE_ENERGY] < creep.carryCapacity && creep.memory.isDelivering) {
        if (!droppedEnergy[0]) {
          let idNextSource = null;
          if (creep.memory.idSource == '5bbcaac09099fc012e632237')
            idNextSource = '5bbcaac09099fc012e632236'
          else
            idNextSource = '5bbcaac09099fc012e632237'

          let nextContainer = Game.getObjectById(idNextSource).pos.findInRange(FIND_STRUCTURES, 1, {
            filter: s => s.structureType == STRUCTURE_CONTAINER
          })[0];
        //  console.log(nextContainer.store[RESOURCE_ENERGY])
          if (nextContainer.store[RESOURCE_ENERGY] > creep.carryCapacity) {
            container = nextContainer
          }
        } else {
          if (creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(droppedEnergy[0]);
            //console.log(creepsInRoom.length)
          }
        }
      }
    } else {
      container = storage
    }

    //console.log(source)
    if (container && _.sum(creep.carry) != creep.carryCapacity && creep.memory.isDelivering) {
      if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(container)
        //console.log(creepsInRoom.length)
      }

    } else if (_.sum(creep.carry) == creep.carryCapacity || !creep.memory.isDelivering) {

      if (creep.build(building) == ERR_NOT_IN_RANGE) {
        creep.moveTo(building);
        //  console.log(creep.carryCapacity)
      }
      if (_.sum(creep.carry) == 0) {
        creep.memory.isDelivering = true;
      } else {
        creep.memory.isDelivering = false;
      }
    }
  }
};
