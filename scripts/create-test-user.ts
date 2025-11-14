import bcrypt from 'bcrypt';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function createTestUser() {
  try {
    const email = 'test@reviewmydns.com';
    const password = 'TestPass123!';
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Check if user exists
    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (existing.rows.length > 0) {
      console.log('✅ Test user already exists!');
      console.log('\nLogin Credentials:');
      console.log('Email:', email);
      console.log('Password:', password);
      return;
    }
    
    // Create user
    await pool.query(
      `INSERT INTO users (email, password_hash, first_name, last_name, subscription_plan) 
       VALUES ($1, $2, $3, $4, $5)`,
      [email, passwordHash, 'Test', 'User', 'free']
    );
    
    console.log('✅ Test user created successfully!');
    console.log('\nLogin Credentials:');
    console.log('Email:', email);
    console.log('Password:', password);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await pool.end();
  }
}

createTestUser();
