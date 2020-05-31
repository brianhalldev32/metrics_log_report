const TWO_HOUR = 3600 * 2000; // ms

const storage = require('../db');

exports.logMetrics = function (metricsKey, value) {
  const timestamp = new Date().getTime();

  if (storage[metricsKey]) {
    storage[metricsKey][timestamp] = value;
  } else {
    storage[metricsKey] = {};
    storage[metricsKey][timestamp] = value;
  }
};

exports.getReports = function (metricsKey) {
  const currentTimestamp = new Date().getTime();

  if (!storage[metricsKey]) {
    return null;
  }

  let result = 0;
  Object.entries(storage[metricsKey]).forEach(([timestamp, value]) => {
    if (timestamp >= currentTimestamp - TWO_HOUR) {
      result += value;
    }
  });

  return result;
};
