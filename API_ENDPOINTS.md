# API Endpoints Documentation

## Base URL
- Development: `http://localhost:3001` or `http://localhost:3002`
- Production: `https://connectwithafrica.org`

---

## Donation Endpoints

### 1. General Donation Initiation
**Endpoint:** `POST /api/v1/user/donations/initiate`

**Description:** Initiates a general donation (not tied to a specific campaign) and creates a Monnify payment link.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-1234",
  "amount": 100,
  "donationType": "one-time",
  "designation": "where-most-needed"
}
```

**Response (Success):**
```json
{
  "success": true,
  "checkoutUrl": "https://checkout.monnify.com/...",
  "reference": "GEN_DON_1707568845123_abc123...",
  "message": "Donation initiated successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Name, email, and amount are required"
}
```

**Field Details:**
- `name`: Donor's name or organization name (required)
- `email`: Donor's email address (required)
- `phone`: Donor's phone number (optional)
- `amount`: Donation amount in NGN (required, must be > 0)
- `donationType`: Either `"one-time"` or `"monthly"` (default: "one-time")
- `designation`: Where to apply donation - `"where-most-needed"` or `"medical-container"` (default: "where-most-needed")

---

### 2. Get Donations (Admin)
**Endpoint:** `GET /api/v1/user/donations/get`

**Description:** Retrieves all donations with optional filtering and pagination.

**Query Parameters:**
```
?email=john@example.com&status=completed&limit=50&skip=0
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "123abc...",
      "name": "John Doe",
      "email": "john@example.com",
      "amount": 100,
      "status": "completed",
      "reference": "GEN_DON_1707568845123_abc123...",
      "createdAt": "2025-02-09T10:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 50,
    "limit": 50,
    "skip": 0,
    "hasMore": false
  },
  "stats": {
    "totalAmount": 5000,
    "totalCount": 25
  }
}
```

---

### 3. Donation Webhook (Monnify)
**Endpoint:** `POST /api/v1/user/donations/webhook`

**Description:** Webhook endpoint that Monnify calls to confirm successful payment.

**Authorization:** Verified using Monnify signature header

**Automatic Actions:**
- Updates donation status to `"completed"`
- Sends confirmation email to donor
- Records payment timestamp

---

## Campaign Donation Endpoints (Existing)

### 1. Campaign Donation Initiation
**Endpoint:** `POST /api/v1/user/campaigns/donate/initiate`

**Request Body:**
```json
{
  "campaignId": "507f1f77bcf86cd799439011",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1-555-1234",
  "amount": 50
}
```

**Response:**
```json
{
  "success": true,
  "checkoutUrl": "https://checkout.monnify.com/...",
  "reference": "DON_1707568845123_abc123..."
}
```

---

## Newsletter Endpoints

### 1. Subscribe to Newsletter
**Endpoint:** `POST /api/v1/user/newsletter/subscribe`

**Description:** Subscribe an email address to the newsletter.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Thank you for subscribing! Check your email for confirmation."
}
```

**Response (Duplicate):**
```json
{
  "success": true,
  "message": "You're already subscribed to our newsletter"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Valid email address is required"
}
```

**Automatic Actions:**
- Stores email in `subscribers` collection
- Sends confirmation email with newsletter details
- Creates unsubscribe token for future use

---

## Contact Endpoint (Existing)

### 1. Submit Contact Form
**Endpoint:** `POST /api/v1/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-1234",
  "subject": "Inquiry about partnerships",
  "message": "I'm interested in exploring partnership opportunities...",
  "type": "partnership"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your message has been sent successfully"
}
```

---

## CORS Configuration

**Allowed Origins:**
- `http://localhost:3000`
- `http://localhost:3001`
- `http://localhost:3002`
- `https://connectafrica-fawn.vercel.app`

All API endpoints enforce CORS policy. If you get a "CORS policy" error, the origin is not in the allowed list.

---

## Environment Variables Required

```env
# Database
MONGODB_URI=<mongodb-connection-string>

# Email Service
EMAIL_USER=<gmail-address>
EMAIL_PASSWORD=<gmail-app-password>

# Monnify Payment Gateway
MONNIFY_API_KEY=<monnify-api-key>
MONNIFY_SECRET_KEY=<monnify-secret-key>
MONNIFY_BASE_URL=https://api.monnify.com
MONNIFY_CONTRACT_CODE=<monnify-contract-code>

# Frontend URL
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

---

## Error Handling

All endpoints return errors in this format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Optional detailed error message"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created (for POST endpoints)
- `400` - Bad Request (validation error)
- `403` - CORS blocked
- `404` - Not Found
- `500` - Internal Server Error

---

## Integration Examples

### Frontend: Subscribe to Newsletter
```typescript
const handleNewsletterSubscribe = async (email: string) => {
  try {
    const response = await fetch("/api/v1/user/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (data.success) {
      console.log("Subscribed successfully!");
    }
  } catch (error) {
    console.error("Subscription failed:", error);
  }
};
```

### Frontend: Initiate General Donation
```typescript
const handleDonate = async (formData) => {
  try {
    const response = await fetch("/api/v1/user/donations/initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.success) {
      // Redirect to checkout
      window.location.href = data.checkoutUrl;
    }
  } catch (error) {
    console.error("Donation failed:", error);
  }
};
```

---

## Testing the APIs

### Using cURL:

**Subscribe to Newsletter:**
```bash
curl -X POST http://localhost:3001/api/v1/user/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

**Initiate Donation:**
```bash
curl -X POST http://localhost:3001/api/v1/user/donations/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "amount":100,
    "donationType":"one-time",
    "designation":"where-most-needed"
  }'
```

---

## Database Collections

### Donations Collection
```json
{
  "_id": ObjectId,
  "name": String,
  "email": String,
  "phone": String | null,
  "amount": Number,
  "donationType": "one-time" | "monthly",
  "designation": String,
  "reference": String (unique),
  "status": "pending" | "completed" | "failed",
  "createdAt": Date,
  "updatedAt": Date,
  "completedAt": Date | null,
  "amountPaid": Number | null
}
```

### Subscribers Collection
```json
{
  "_id": ObjectId,
  "email": String (unique),
  "subscribedAt": Date,
  "status": "active" | "inactive",
  "unsubscribeToken": String
}
```

---

**Last Updated:** February 9, 2026
**API Version:** v1
