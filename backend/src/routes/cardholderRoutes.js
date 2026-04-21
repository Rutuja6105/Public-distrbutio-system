const express = require('express');
const router = express.Router();

// GET /api/cardholders/:id
router.get('/:id', (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.params.id,
      name: 'Rajesh Kumar',
      cardNumber: 'RC-0001',
      familySize: 4,
      address: 'Village Narsinghpur',
      rationCardType: 'BPL'
    }
  });
});

// GET /api/cardholders/:id/distributions
router.get('/:id/distributions', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 'DIST-001',
        date: '2026-01-15',
        endDate: '2026-01-20',
        commodity: 'Rice',
        quantity: 10,
        collected: false
      },
      {
        id: 'DIST-002',
        date: '2026-02-01',
        endDate: '2026-02-05',
        commodity: 'Wheat',
        quantity: 10,
        collected: true,
        collectionDate: '2026-02-02'
      }
    ]
  });
});

module.exports = router;