-- Create users table for OTP authentication
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  gmail VARCHAR(255) NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on phone for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
