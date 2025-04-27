const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const { msgConst } = require('./global/constant');
const { comUtils } = require('./global/utils');
const { envConfig, dbConfig } = require('./config');

/* initial express app */
const app = express();

/* CORS configuration */
const corsOptions = {
  origin: envConfig.CLIENTURL,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
};

/* all important middleware */
app.use(morgan(envConfig.PLATFORM));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* serve uploaded images statically */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* handled missing routes and globally errors */
app.use((req, res, next) => comUtils.missingRoutes(next));
app.use((error, req, res) => comUtils.globalError(res, error));

/* connect database and started server */
dbConfig
  .dbConnect()
  .then(() => {
    app.listen(envConfig.PORT, () => {
      console.log(`${msgConst.server.success} ${envConfig.PORT}`);
    });
  })
  .catch((err) => {
    console.error(msgConst.db.failed, err);
    process.exit(1);
  });
