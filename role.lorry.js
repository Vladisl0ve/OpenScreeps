module.exports = {

  run: function(creep) {
    let source = Game.getObjectById(creep.memory.idSource);
    const storage = creep.room.storage;
    let droppedEnergy = source.pos.findInRange(FIND_DROPPED_RESOURCES, 1, {
      filter: s => s.resourceType == RESOURCE_ENERGY
    })[0];
    let container = source.pos.findInRange(FIND_STRUCTURES, 1, {
      filter: s => s.structureType == STRUCTURE_CONTAINER
    })[0];
    let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
      filter: (s) => (s.structureType == STRUCTURE_TOWER ||
          s.structureType == STRUCTURE_SPAWN ||
          s.structureType == STRUCTURE_EXTENSION) &&
        s.energy < s.energyCapacity
    });

    if (container.store[RESOURCE_ENERGY] < creep.carryCapacity && creep.memory.isDelivering) {
      if (!droppedEnergy) {
        let idNextSource = null;
        if (creep.memory.idSource == '5bbcaac09099fc012e632237')
          idNextSource = '5bbcaac09099fc012e632236'
        else
          idNextSource = '5bbcaac09099fc012e632237'

        let newDroppedEnergy = Game.getObjectById(idNextSource).pos.findInRange(FIND_DROPPED_RESOURCES, 1, {
          filter: s => s.resourceType == RESOURCE_ENERGY
        })[0];
        if (newDroppedEnergy) {
          if (creep.pickup(newDroppedEnergy) == ERR_NOT_IN_RANGE) {
            creep.moveTo(newDroppedEnergy);
            return;
          }
        }

        let nextContainer = Game.getObjectById(idNextSource).pos.findInRange(FIND_STRUCTURES, 1, {
          filter: s => s.structureType == STRUCTURE_CONTAINER
        })[0];
        if (nextContainer.store[RESOURCE_ENERGY] > creep.carryCapacity) {
          container = nextContainer
        }
      } else {
        if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
          creep.moveTo(droppedEnergy);
          //console.log(creepsInRoom.length)
        }
      }
    }
    //  console.log(droppedEnergy[0])
    if (container && _.sum(creep.carry) != creep.carryCapacity && creep.memory.isDelivering) {
      if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(container)
      }

    } else if (_.sum(creep.carry) == creep.carryCapacity || !creep.memory.isDelivering) {
      if (!structure && storage)
        structure = storage
      if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(structure)
      }

      if (_.sum(creep.carry) == 0) {
        creep.memory.isDelivering = true;
      } else {
        creep.memory.isDelivering = false;
      }
    }
  }
};
