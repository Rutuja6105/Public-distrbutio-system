const { pool } = require('./src/config/database');
const fs = require('fs');
const path = require('path');

async function runMigrations() {
    const client = await pool.connect();
    
    try {
        console.log('🚀 Starting database migrations...\n');
        
        await client.query('BEGIN');
        
        // Migration files in order - FIXED PATHS (go up one directory)
        const migrationFiles = [
            '../database/migrations/001_create_users_table.sql',
            '../database/migrations/002_create_cardholders_table.sql',
            '../database/migrations/003_create_shop_owners_table.sql',
            '../database/migrations/004_create_panchayats_table.sql',
            '../database/migrations/005_create_distributions_table.sql',
            '../database/migrations/006_create_notifications_table.sql',
            '../database/migrations/007_create_collections_table.sql'
        ];
        
        for (const file of migrationFiles) {
            const filePath = path.join(__dirname, file);
            
            if (fs.existsSync(filePath)) {
                console.log(`📄 Running: ${file}`);
                const sql = fs.readFileSync(filePath, 'utf8');
                
                // Check if file is empty
                if (sql.trim().length === 0) {
                    console.log(`⚠️  File is empty: ${file}\n`);
                    continue;
                }
                
                await client.query(sql);
                console.log(`✅ Completed: ${file}\n`);
            } else {
                console.log(`⚠️  File not found: ${filePath}\n`);
            }
        }
        
        // Run performance indexes
        const indexFile = '../database/indexes/performance_indexes.sql';
        const indexPath = path.join(__dirname, indexFile);
        
        if (fs.existsSync(indexPath)) {
            console.log(`📄 Running: ${indexFile}`);
            const sql = fs.readFileSync(indexPath, 'utf8');
            
            if (sql.trim().length > 0) {
                await client.query(sql);
                console.log(`✅ Completed: ${indexFile}\n`);
            } else {
                console.log(`⚠️  File is empty: ${indexFile}\n`);
            }
        }
        
        await client.query('COMMIT');
        console.log('🎉 All migrations completed successfully!');
        
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Migration failed:', error.message);
        console.error(error);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

runMigrations()
    .then(() => process.exit(0)) 
    .catch(() => process.exit(1));