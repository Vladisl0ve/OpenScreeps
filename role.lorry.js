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

    let isDoubleSourced = false;
    let sourcesInRoom = creep.room.find(FIND_SOURCES);

    if (sourcesInRoom[1])
      isDoubleSourced = true;

    if (container && container.store[RESOURCE_ENERGY] < creep.carryCapacity && creep.memory.isDelivering) {
      if (!droppedEnergy) {
        let idNextSource = null;
        if (isDoubleSourced && creep.memory.idSource == sourcesInRoom[0].id)
          idNextSource = sourcesInRoom[1].id
        else
          idNextSource = sourcesInRoom[0].id

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

      if (_.sum(creep.carry) == 0)
        creep.memory.isDelivering = true;
      else
        creep.memory.isDelivering = false;

    }
  }
};
