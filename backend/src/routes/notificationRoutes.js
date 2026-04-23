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
  const { distributionId, message, mobileNumber, type } = req.body;
  
  if (!message) {
    return res.status(400).json({
      success: false,
      message: 'Message is required'
    });
  }

  if (type === 'specific' && !mobileNumber) {
    return res.status(400).json({
      success: false,
      message: 'Mobile number is required for specific notifications'
    });
  }
  
  res.status(201).json({
    success: true,
    message: `Notification sent successfully${mobileNumber ? ' to ' + mobileNumber : ''}`,
    data: {
      id: Date.now(),
      distributionId: distributionId || 'N/A',
      message,
      mobileNumber,
      type: type || 'all',
      date: new Date().toISOString(),
      status: 'sent'
    }
  });
});

module.exports = router;