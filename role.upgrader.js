module.exports = {

  run: function(creep) {
    const source = Game.getObjectById(creep.memory.idSource);
    let droppedEnergy = source.pos.findInRange(FIND_DROPPED_RESOURCES, 1, {
      filter: s => s.resourceType == RESOURCE_ENERGY
    });
    //console.log(droppedEnergy)
    const controller = creep.room.controller;
    const storage = creep.room.storage;
    let container = source.pos.findInRange(FIND_STRUCTURES, 1, {
      filter: s => s.structureType == STRUCTURE_CONTAINER
    })[0];


    if ((!storage || storage.store[RESOURCE_ENERGY] < creep.carryCapacity) && creep.memory.isDelivering) {
      if (container.store[RESOURCE_ENERGY] < creep.carryCapacity && creep.memory.isDelivering) {
        if (!droppedEnergy) {
          let idNextSource = null;
          if (creep.memory.idSource == '5bbcaac09099fc012e632237')
            idNextSource = '5bbcaac09099fc012e632236'
          else
            idNextSource = '5bbcaac09099fc012e632237'

          let nextContainer = Game.getObjectById(idNextSource).pos.findInRange(FIND_STRUCTURES, 1, {
            filter: s => s.structureType == STRUCTURE_CONTAINER
          })[0];

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

    if (container && _.sum(creep.carry) != creep.carryCapacity && creep.memory.isDelivering) {
      if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(container);
        //console.log(creepsInRoom.length)
      }

    } else if (_.sum(creep.carry) == creep.carryCapacity || !creep.memory.isDelivering) {

      if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(controller);
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
