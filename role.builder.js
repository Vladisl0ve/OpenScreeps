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

    let isDoubleSourced = false;
    let sourcesInRoom = creep.room.find(FIND_SOURCES);

    if (sourcesInRoom[1])
      isDoubleSourced = true;

    //  let nextSourceID = sourcesInRoom[1].id;


    if (building == null) {
      let repair = require('role.repair');
      repair.run(creep);
      return;
    }
    //console.log((!storage || storage.store[RESOURCE_ENERGY] < creep.carryCapacity) && creep.memory.isDelivering)
    if ((!storage || storage.store[RESOURCE_ENERGY] < creep.carryCapacity) && creep.memory.isDelivering) {
      if (container && container.store[RESOURCE_ENERGY] < creep.carryCapacity && creep.memory.isDelivering) {
        if (!droppedEnergy[0]) {
          let idNextSource = null;
          if (isDoubleSourced && creep.memory.idSource == sourcesInRoom[0].id)
            idNextSource = sourcesInRoom[1].id
          else
            idNextSource = sourcesInRoom[0].id

          let nextContainer = Game.getObjectById(idNextSource).pos.findInRange(FIND_STRUCTURES, 1, {
            filter: s => s.structureType == STRUCTURE_CONTAINER
          })[0];
          //  console.log(nextContainer.store[RESOURCE_ENERGY])
          if (nextContainer && nextContainer.store[RESOURCE_ENERGY] > creep.carryCapacity) {
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

    } else if (!container && _.sum(creep.carry) != creep.carryCapacity && creep.memory.isDelivering) {
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source)
        //console.log(creepsInRoom.length)
      }
    }

    if (_.sum(creep.carry) == creep.carryCapacity || !creep.memory.isDelivering) {

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
