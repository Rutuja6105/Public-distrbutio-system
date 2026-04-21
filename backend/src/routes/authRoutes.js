const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Mock user database (replace with real database later)
const users = [
  {
    id: 1,
    cardNumber: 'RC-0001',
    password: '$2b$10$X8qHXw7ZJZ0rJ3Z0rJ3Z0urJ3Z0rJ3Z0rJ3Z0rJ3Z0rJ3Z0rJ3Z0u', // password123
    role: 'cardholder',
    name: 'Rajesh Kumar'
  },
  {
    id: 2,
    shopId: 'SHOP-001',
    password: '$2b$10$X8qHXw7ZJZ0rJ3Z0rJ3Z0urJ3Z0rJ3Z0rJ3Z0rJ3Z0rJ3Z0rJ3Z0u', // password123
    role: 'shop_owner',
    name: 'Shop Owner 1'
  },
  {
    id: 3,
    panchayatId: 'PANCH-001',
    password: '$2b$10$X8qHXw7ZJZ0rJ3Z0rJ3Z0urJ3Z0rJ3Z0rJ3Z0rJ3Z0rJ3Z0rJ3Z0u', // password123
    role: 'gram_panchayat',
    name: 'Panchayat Officer'
  }
];

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { identifier, password, role } = req.body;

    // Validation
    if (!identifier || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Please provide identifier, password, and role'
      });
    }

    // Find user
    let user;
    if (role === 'cardholder') {
      user = users.find(u => u.cardNumber === identifier && u.role === role);
    } else if (role === 'shop_owner') {
      user = users.find(u => u.shopId === identifier && u.role === role);
    } else if (role === 'gram_panchayat') {
      user = users.find(u => u.panchayatId === identifier && u.role === role);
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // For demo, accept "password123" directly or check hashed password
    const isValidPassword = password === 'password123' || await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Create token (simplified - use JWT in production)
    const token = Buffer.from(JSON.stringify({ id: user.id, role: user.role })).toString('base64');

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        identifier: identifier
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, identifier, password, role } = req.body;

    // Validation
    if (!name || !identifier || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user (mock - save to database in production)
    const newUser = {
      id: users.length + 1,
      name,
      password: hashedPassword,
      role,
      ...(role === 'cardholder' && { cardNumber: identifier }),
      ...(role === 'shop_owner' && { shopId: identifier }),
      ...(role === 'gram_panchayat' && { panchayatId: identifier })
    };

    users.push(newUser);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: {
        id: newUser.id,
        name: newUser.name,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

module.exports = router;
