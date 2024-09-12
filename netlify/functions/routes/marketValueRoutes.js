const express = require('express');
const router = express.Router();
const MarketValue = require('../models/addMarketValues');

router.post('/addMarketValues', async (req, res) => {
  try {
    const { carats, date } = req.body;

    if (!carats || !date) {
      return res.status(400).send({ status: 'error', message: 'Carats and date are required.' });
    }

    const marketValue = await MarketValue.create({
      carats,
      date
    });

    res.send({ status: 'success', data: marketValue });
  } catch (error) {
    res.status(500).send({ status: 'error', message: 'Something went wrong.', error: error.message });
  }
});

module.exports = router;