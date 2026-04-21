const express = require('express');
const router = express.Router();

// GET /api/distributions
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 'DIST-001',
        startDate: '2026-01-15',
        endDate: '2026-01-20',
        commodity: 'Rice',
        quantityPerUnit: 10,
        status: 'active',
        totalBeneficiaries: 50,
        collected: 15
      },
      {
        id: 'DIST-002',
        startDate: '2026-02-01',
        endDate: '2026-02-05',
        commodity: 'Wheat',
        quantityPerUnit: 10,
        status: 'scheduled',
        totalBeneficiaries: 50,
        collected: 0
      }
    ]
  });
});

// GET /api/distributions/:id
router.get('/:id', (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.params.id,
      startDate: '2026-01-15',
      endDate: '2026-01-20',
      commodity: 'Rice',
      quantityPerUnit: 10,
      status: 'active',
      totalBeneficiaries: 50,
      collected: 15,
      remaining: 35
    }
  });
});

// POST /api/distributions
router.post('/', (req, res) => {
  const { startDate, endDate, commodity, quantityPerUnit } = req.body;
  
  res.status(201).json({
    success: true,
    message: 'Distribution created successfully',
    data: {
      id: `DIST-${Date.now()}`,
      startDate,
      endDate,
      commodity,
      quantityPerUnit,
      status: 'scheduled'
    }
  });
});

module.exports = router;