const express = require('express');
const router = express.Router();

// GET /api/shops/:id/distributions
router.get('/:id/distributions', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 'DIST-001',
        startDate: '2026-01-15',
        endDate: '2026-01-20',
        totalBeneficiaries: 50,
        collected: 15,
        remaining: 35
      },
      {
        id: 'DIST-002',
        startDate: '2026-02-01',
        endDate: '2026-02-05',
        totalBeneficiaries: 50,
        collected: 35,
        remaining: 15
      }
    ]
  });
});

// GET /api/shops/:id/holders
router.get('/:id/holders', (req, res) => {
  const { distributionId } = req.query;
  
  res.json({
    success: true,
    data: [
      {
        id: 'RC-0001',
        name: 'Rajesh Kumar',
        phone: '9876543210',
        collected: false,
        collectionDate: null
      },
      {
        id: 'RC-0002',
        name: 'Priya Singh',
        phone: '9876543211',
        collected: true,
        collectionDate: '2026-01-15'
      },
      {
        id: 'RC-0003',
        name: 'Amit Patel',
        phone: '9876543212',
        collected: false,
        collectionDate: null
      }
    ]
  });
});

// POST /api/shops/:id/mark-collection
router.post('/:id/mark-collection', (req, res) => {
  const { cardNumber, distributionId, collected } = req.body;
  
  res.json({
    success: true,
    message: `Collection status updated to ${collected ? 'collected' : 'not collected'}`,
    data: {
      cardNumber,
      distributionId,
      collected,
      collectionDate: collected ? new Date().toISOString() : null
    }
  });
});

module.exports = router;