module.exports = {

  run: function(creep) {
    let source = Game.getObjectById(creep.memory.idSource);
    let droppedEnergy = source.pos.findInRange(FIND_DROPPED_RESOURCES, 1, {
      filter: s => s.resourceType == RESOURCE_ENERGY
    });
    let container = source.pos.findInRange(FIND_STRUCTURES, 1, {
      filter: s => s.structureType == STRUCTURE_CONTAINER
    })[0];
    const structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
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

    if (container && _.sum(creep.carry) != creep.carryCapacity && creep.memory.isDelivering) {
      if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(container)
      }

    } else if (_.sum(creep.carry) == creep.carryCapacity || !creep.memory.isDelivering) {

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
