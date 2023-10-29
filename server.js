'use strict';
import cluster from 'cluster';
import os from 'os';
import http from 'http';
import express from 'express';
const app = express();
import pkg from 'pg';
const { Pool } = pkg;
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import cors from 'cors';
import moment from 'moment';
import jwt from 'jsonwebtoken';
const SECRET_KEY = 'rW7[XT:F4]K#VQmL9^2T9g8Fm';

import sendConfirmationCodeRouter from './routes/send-confirmation-code.js';
import confirmCodeRouter from './routes/confirm-code.js';
import registrationOverRouter from './routes/registration-over.js';
import loginRouter from './routes/login.js';
import forgotRouter from './routes/forgot.js';
import rememberRouter from './routes/remember.js';
import getProfileDataRouter from './routes/getProfileData.js';
import getProfileClientDbRouter from './routes/getProfileClientDb.js';
import getMissionsListRouter from './routes/getMissionsList.js'; 
import getAccountsListRouter from './routes/getAccountsList.js';
import addAccountRouter from './routes/addAccount.js';
import updateAccountsRouter from './routes/updateAccounts.js';
import updateServicesRouter from './routes/updateServices.js';
import changeUserDataRouter from './routes/changeUserData.js';
import paymentRouter from './routes/payment.js';
import trialRouter from './routes/trial.js';

import apiLoadAllRouter from './routes/services/api_load_all.js';
import apiLoadCSVRouter from './routes/services/api_load_csv.js';
import deleteCSVRouter from './routes/services/delete_csv.js';
import deleteAllRouter from './routes/services/delete_all.js';


import { fileURLToPath } from 'url';
import path from 'path';

// Создание транспорта для отправки почты
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '4ap9911@gmail.com',
    pass: 'lgybuaeibxuyodtx'
  }
});
const pool = new Pool({
  user: 'admin',
  host: 'dpg-cijbj915rnut2scmpbpg-a.oregon-postgres.render.com',
  database: 'clients_oqcb',
  password: '198MEsbXujeQeMJSU5N2DkKb6bMD867p',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});
const poolOperations = new Pool({
  user: 'admin',
  host: 'dpg-cijbj915rnut2scmpbpg-a.oregon-postgres.render.com',
  database: 'operations',
  password: '198MEsbXujeQeMJSU5N2DkKb6bMD867p',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});
export default {
  app, jwt, SECRET_KEY, bcrypt, pool, poolOperations,
  moment, transporter, // Экспортируем объекты
};
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {

  app.use(sendConfirmationCodeRouter);
  app.use(confirmCodeRouter);
  app.use(registrationOverRouter);
  app.use(loginRouter);
  app.use(forgotRouter);
  app.use(rememberRouter);
  app.use(getProfileDataRouter);
  app.use(getProfileClientDbRouter);
  app.use(getMissionsListRouter);
  app.use(getAccountsListRouter);
  app.use(addAccountRouter);
  app.use(updateAccountsRouter);
  app.use(updateServicesRouter);
  app.use(changeUserDataRouter);
  app.use(paymentRouter);
  app.use(trialRouter);

  app.use(apiLoadAllRouter);
  app.use(apiLoadCSVRouter);
  app.use(deleteCSVRouter);
  app.use(deleteAllRouter);
  
  
  app.use(cors({
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  }));
  app.use(express.urlencoded({ extended: true, limit: '10mb', parameterLimit: 1000000 }));
  app.use(express.json());
  app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json; charset=UTF-8');
    next();
  });
  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  app.use(express.static(path.join(__dirname, 'src'), {
    setHeaders: (res, path, stat) => {
      if (path.endsWith('.html')) {
        res.set('Content-Type', 'text/html');
      }
      if (path.endsWith('.css')) {
        res.set('Content-Type', 'text/css');
      }
      if (path.endsWith('.js')) {
        res.set('Content-Type', 'text/javascript');
      }
    }
  }));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
  });


  const port = process.env.PORT || 3000;
  http.createServer(app).listen(port, () => {
    console.log(`Worker ${process.pid} started and listening on port ${port}`);
  });
}