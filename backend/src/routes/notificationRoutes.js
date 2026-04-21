const express = require('express');
const router = express.Router();

// GET /api/notifications
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        distributionId: 'DIST-001',
        message: 'Distribution starting on 15th January',
        date: '2026-01-10',
        status: 'sent'
      },
      {
        id: 2,
        distributionId: 'DIST-002',
        message: 'New distribution scheduled',
        date: '2026-01-25',
        status: 'sent'
      }
    ]
  });
});

// POST /api/notifications
router.post('/', (req, res) => {
  const { distributionId, message } = req.body;
  
  if (!distributionId || !message) {
    return res.status(400).json({
      success: false,
      message: 'Distribution ID and message are required'
    });
  }
  
  res.status(201).json({
    success: true,
    message: 'Notification sent successfully',
    data: {
      id: Date.now(),
      distributionId,
      message,
      date: new Date().toISOString(),
      status: 'sent'
    }
  });
});

module.exports = router;