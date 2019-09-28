var roles = {
  harvester: require('role.harvester'),
  upgrader: require('role.upgrader'),
  builder: require('role.builder'),
  repair: require('role.repair'),
  miner: require('role.miner'),
  lorry: require('role.lorry')
};

Creep.prototype.runRole =
  function() {
    roles[this.memory.role].run(this);
  };
