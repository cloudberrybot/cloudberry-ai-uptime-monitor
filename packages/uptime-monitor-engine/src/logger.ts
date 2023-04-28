import axios from 'axios';

export type UptimeMonitorLogEntry = {
  url: string;
  status: 'up' | 'down';
  response_time: number;
  content_requirements: 'fulfilled' | 'failed';
};

axios.interceptors.response.use(undefined, (err) => {
  const { config, message } = err;
  if (!config || !config.retry) {
    return Promise.reject(err);
  }
  // retry while Network timeout or Network Error
  if (!(message.includes('timeout') || message.includes('Network Error'))) {
    return Promise.reject(err);
  }
  config.retry -= 1;
  const delayRetryRequest = new Promise((resolve) => {
    setTimeout(() => {
      console.log('retry the request', config.url);
      resolve(false);
    }, config.retryDelay || 1000);
  });
  return delayRetryRequest.then(() => axios(config));
});

export default function log(entry: UptimeMonitorLogEntry) {
  const createdAt = new Date().toISOString();
  let logEntry = createdAt;

  Object.entries(entry).forEach(([field, value]) => {
    logEntry += `, ${field}: ${value}`;
  });

  console.log(`[INFO]: ${logEntry}`);

  try {
    axios
      .post(process.env.API_URL, {
        ...entry,
      })
      .then(function (response) {
        console.log(`[INFO]: uptime event logged successfully`);
      })
      .catch(function (error) {
        console.error(
          '[ERROR]: The uptime engine cannot connect to the API. Please, check the uptime-monitor-service is running and try again.'
        );
      });
  } catch (err) {
    console.log(err);
  }
}
