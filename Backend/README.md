# EcoPay Backend

## Environment Variables Required

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL=postgresql://username:password@host:5432/database_name

# Twilio Configuration
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_SERVICE_SID=your_verify_service_sid

# Server
PORT=5000
```

## Database Setup

1. Create a PostgreSQL database
2. Run the setup script:
   ```bash
   psql -d your_database_url -f setup-database.sql
   ```
   Or manually execute the SQL in `setup-database.sql`

## Installation

```bash
npm install
```

## Running the Server

```bash
npm start
```

## Twilio Setup

1. Go to [Twilio Console](https://console.twilio.com/)
2. Get your Account SID and Auth Token
3. Create a Verify Service:
   - Go to Verify > Services
   - Create a new service
   - Copy the Service SID

## API Endpoints

### Send OTP
```
POST /api/otp/send
Body: { "phone": "1234567890", "gmail": "user@example.com" }
```

### Verify OTP
```
POST /api/otp/verify
Body: { "phone": "1234567890", "code": "123456" }
```
