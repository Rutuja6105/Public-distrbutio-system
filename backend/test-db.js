const { query } = require('./src/config/database');

async function testConnection() {
  try {
    console.log('Testing database connection...\n');
    
    const result = await query('SELECT NOW() as time');
    console.log('✅ Database connected!');
    console.log('Time:', result.rows[0].time);
    
    const tables = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('\n📊 Tables:');
    tables.rows.forEach(row => console.log('  ✓', row.table_name));
    
    const users = await query('SELECT COUNT(*) FROM users');
    console.log('\n👥 Users:', users.rows[0].count);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testConnection();