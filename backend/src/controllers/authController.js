const { query } = require('../config/database');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  try {
    const { identifier, password, role } = req.body;

    let sql = '';
    let user = null;

    if (role === 'cardholder') {
      sql = `
        SELECT u.*, c.card_number as identifier 
        FROM users u
        JOIN cardholders c ON u.id = c.user_id
        WHERE c.card_number = $1 AND u.role = $2
      `;
      const result = await query(sql, [identifier, role]);
      user = result.rows[0];
    } 
    else if (role === 'shop_owner') {
      sql = `
        SELECT u.*, s.shop_id as identifier 
        FROM users u
        JOIN shop_owners s ON u.id = s.user_id
        WHERE s.shop_id = $1 AND u.role = $2
      `;
      const result = await query(sql, [identifier, role]);
      user = result.rows[0];
    } 
    else if (role === 'gram_panchayat') {
      sql = `
        SELECT u.*, g.panchayat_id as identifier 
        FROM users u
        JOIN gram_panchayats g ON u.id = g.user_id
        WHERE g.panchayat_id = $1 AND u.role = $2
      `;
      const result = await query(sql, [identifier, role]);
      user = result.rows[0];
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      });
    }

    const token = Buffer.from(JSON.stringify({ 
      id: user.id, 
      role: user.role 
    })).toString('base64');

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        identifier: user.identifier
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};