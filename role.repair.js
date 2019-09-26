module.exports = {

  run: function(creep) {
    const source = Game.getObjectById(creep.memory.idSource); //creep.pos.findPathTo(Game.getObjectById(creep.memory.idSource))
    let container = source.pos.findInRange(FIND_STRUCTURES, 1, {
      filter: s => s.structureType == STRUCTURE_CONTAINER
    })[0];
    const targets = creep.room.find(FIND_STRUCTURES, {
      filter:
        // structureType: STRUCTURE_ROAD ||
        function(object) {
          return ((object.hits < (object.hitsMax / 1000)) && object.structureType == STRUCTURE_RAMPART)
        }

    });
    targets.sort((a, b) => creep.pos.findClosestByRange(a) - creep.pos.findClosestByRange(b));




    //console.log(source)
    if (container && _.sum(creep.carry) != creep.carryCapacity && creep.memory.isDelivering) {
      if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(container);
        //console.log(creepsInRoom.length)
      }

    } else if (_.sum(creep.carry) == creep.carryCapacity || !creep.memory.isDelivering) {

      if (targets.length > 0) {
        if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
        }
      }

      if (_.sum(creep.carry) == 0) {
        creep.memory.isDelivering = true;
      } else {
        creep.memory.isDelivering = false;
      }
    }
  }
};
