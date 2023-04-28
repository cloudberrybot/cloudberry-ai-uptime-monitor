import uptimeMonitorEngine from './engine';
import config from './config/uptime-monitor.config.js';

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

function runEngine() {
  (async () => {
    await uptimeMonitorEngine(config);
  })();
}

setInterval(runEngine, config.interval * 1000);

runEngine();

