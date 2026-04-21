const express = require('express');
const router = express.Router();

// GET /api/panchayat/:id/analytics
router.get('/:id/analytics', (req, res) => {
  res.json({
    success: true,
    data: {
      totalCardholders: 500,
      activeDistributions: 2,
      completionRate: 65,
      totalShops: 10,
      monthlyDistribution: [
        { month: 'Jan', distributed: 450 },
        { month: 'Feb', distributed: 480 },
        { month: 'Mar', distributed: 490 }
      ]
    }
  });
});

// GET /api/panchayat/:id/shops
router.get('/:id/shops', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 'SHOP-001',
        name: 'Ration Shop 1',
        owner: 'Shop Owner 1',
        location: 'Area A',
        status: 'active'
      },
      {
        id: 'SHOP-002',
        name: 'Ration Shop 2',
        owner: 'Shop Owner 2',
        location: 'Area B',
        status: 'active'
      }
    ]
  });
});

module.exports = router;
