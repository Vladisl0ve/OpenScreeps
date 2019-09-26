module.exports = {

  run: function(creep) {
    const source = Game.getObjectById(creep.memory.idSource);
    const controller = creep.room.controller;
    let container = source.pos.findInRange(FIND_STRUCTURES, 1, {
      filter: s => s.structureType == STRUCTURE_CONTAINER
    })[0];

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
