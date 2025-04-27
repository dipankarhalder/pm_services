const mongoose = require('mongoose');

const { MONGOURI } = require('./env.config');
const { msgConst } = require('../global/constant');

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(MONGOURI);
    console.log(`${msgConst.db.success}`);
    return connect;
  } catch (err) {
    console.log(`${msgConst.db.failed} ${err.message}`);
    process.exit(1);
  }
};

module.exports = {
  dbConnect,
};
