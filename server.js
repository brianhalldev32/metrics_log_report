const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const metricsUtils = require('./utils/metrics');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/metric/:key/sum', (req, res) => {
  const report = metricsUtils.getReports(req.params.key);

  // NOTE: If the metric is not logged yet,
  if (!report) {
    return res.status(404).send('Metric Not Found');
  }

  return res.json({
    value: report,
  });
});

app.post('/metric/:key', (req, res) => {
  const metricsValue = Number(req.body.value);

  // NOTE: Invalid data format
  if (!Number.isFinite(metricsValue)) {
    return res.status(400).send('Invalid format');
  }

  metricsUtils.logMetrics(req.params.key, metricsValue);
  return res.status(200).send('OK');
});

app.listen(3000, () => {
  console.log('Listening on 3000 port');
});
