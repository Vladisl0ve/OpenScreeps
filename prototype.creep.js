var roles = {
  harvester: require('role.harvester'),
  upgrader: require('role.upgrader'),
  builder: require('role.builder'),
  repair: require('role.repair'),
  miner: require('role.miner'),
  lorry: require('role.lorry'),
  claimer: require('role.claimer'),
  pioneer: require('role.pioneer')
};

Creep.prototype.runRole =
  function() {
    roles[this.memory.role].run(this);
  };
