# Backend API Endpoints - Pending Implementation

**Generated:** 2026-03-23  
**Status:** Required for full platform functionality  
**Priority:** HIGH

---

## Summary

| Category | Endpoints Missing | Priority | Impact |
|----------|-------------------|----------|--------|
| Sessions | 2 | 🔴 HIGH | Schedule page non-functional |
| Bookings | 3 | 🔴 HIGH | Booking flow incomplete |
| Calendar | 1 | 🟡 MEDIUM | Calendar dots missing |
| Availability | 1 | 🟡 MEDIUM | Time slot selection unavailable |
| **TOTAL** | **7** | - | - |

---

## 🔴 HIGH Priority Endpoints

### 1. GET /api/sessions/

**Purpose:** List available tutoring sessions with filters  
**Frontend File:** `src/lib/api/sessions.ts`  
**Hook:** `useSessions(params)`  
**Impact:** Schedule page (`/schedule`) cannot display sessions

**Required Query Parameters:**
```typescript
interface SessionsQueryParams {
  instructor_id?: number;      // Filter by instructor
  date_from?: string;          // ISO date (YYYY-MM-DD)
  date_to?: string;            // ISO date (YYYY-MM-DD)
  type?: "1on1" | "group" | "trial";  // Session type
  language?: string;           // Language filter
  level?: string;              // Level filter (A1, A2, B1, B2, C1, C2)
  status?: "available" | "full" | "cancelled";
  page?: number;               // Pagination
}
```

**Expected Response:**
```json
{
  "count": 50,
  "next": "https://api.example.com/api/sessions/?page=2",
  "previous": null,
  "results": [
    {
      "id": "uuid-string",
      "instructor": {
        "id": 1,
        "name": "John Doe",
        "avatar_url": "https://...",
        "rating": 4.8
      },
      "title": {
        "en": "English Conversation Practice",
        "es": "Práctica de Conversación en Inglés"
      },
      "description": {
        "en": "Improve your speaking skills...",
        "es": "Mejora tus habilidades de conversación..."
      },
      "date": "2026-03-25",
      "start_time": "14:00:00",
      "end_time": "15:00:00",
      "duration_minutes": 60,
      "type": "1on1",
      "language": "English",
      "level": "B1",
      "max_participants": 1,
      "enrolled_count": 0,
      "spots_left": 1,
      "price": "25.00",
      "status": "available",
      "tags": ["conversation", "business"],
      "is_booked_by_current_user": false
    }
  ]
}
```

---

### 2. GET /api/sessions/{id}/

**Purpose:** Get single session details  
**Frontend File:** `src/lib/api/sessions.ts`  
**Hook:** `useSession(id)`  
**Impact:** Session detail modal cannot display information

**Expected Response:** Single session object (same as items in list above)

---

### 3. POST /api/bookings/

**Purpose:** Create a new booking for a session  
**Frontend File:** `src/lib/api/bookings.ts`  
**Hook:** `useCreateBooking()`  
**Impact:** Users cannot book sessions

**Request Body:**
```json
{
  "session_id": "uuid-string",
  "notes": "Optional notes for the instructor"
}
```

**Expected Response:**
```json
{
  "booking": {
    "id": "uuid-string",
    "session_id": "uuid-string",
    "user_id": 123,
    "status": "confirmed",
    "booked_at": "2026-03-23T10:30:00Z",
    "meeting_url": "https://zoom.us/j/...",
    "notes": "Optional notes"
  }
}
```

---

### 4. GET /api/bookings/me/

**Purpose:** List current user's bookings  
**Frontend File:** `src/lib/api/bookings.ts`  
**Hook:** `useBookings()`  
**Impact:** "My Bookings" section cannot display user's reservations

**Expected Response:**
```json
{
  "bookings": [
    {
      "id": "uuid-string",
      "session_id": "uuid-string",
      "session": {
        "title": "English Conversation",
        "date": "2026-03-25",
        "start_time": "14:00:00",
        "instructor_name": "John Doe"
      },
      "status": "confirmed",
      "booked_at": "2026-03-23T10:30:00Z",
      "meeting_url": "https://zoom.us/j/...",
      "cancel_deadline": "2026-03-24T14:00:00Z"
    }
  ]
}
```

---

### 5. PUT /api/bookings/{id}/cancel/

**Purpose:** Cancel an existing booking  
**Frontend File:** `src/lib/api/bookings.ts`  
**Hook:** `useCancelBooking()`  
**Impact:** Users cannot cancel their bookings

**Request Body:**
```json
{
  "reason": "Optional cancellation reason"
}
```

**Expected Response:**
```json
{
  "id": "uuid-string",
  "status": "cancelled",
  "cancelled_at": "2026-03-23T12:00:00Z",
  "cancel_reason": "Optional reason"
}
```

---

## 🟡 MEDIUM Priority Endpoints

### 6. GET /api/calendar/month/

**Purpose:** Get dates with available sessions for calendar dots  
**Frontend File:** `src/lib/api/sessions.ts`  
**Hook:** `useCalendarMonth(year, month)`  
**Impact:** Calendar doesn't show dots indicating available sessions

**Query Parameters:**
- `year`: integer (e.g., 2026)
- `month`: integer (1-12)

**Expected Response:**
```json
{
  "year": 2026,
  "month": 3,
  "dates": ["2026-03-15", "2026-03-16", "2026-03-20", "2026-03-25"]
}
```

---

### 7. GET /api/instructors/{id}/availability/

**Purpose:** Get instructor's available time slots  
**Frontend File:** `src/lib/api/instructors.ts`  
**Hook:** `useInstructorAvailability(id)`  
**Impact:** Cannot show available time slots for specific instructor

**Expected Response:**
```json
{
  "slots": [
    {
      "date": "2026-03-25",
      "start_time": "09:00:00",
      "end_time": "10:00:00",
      "is_booked": false
    },
    {
      "date": "2026-03-25",
      "start_time": "10:00:00",
      "end_time": "11:00:00",
      "is_booked": true
    }
  ]
}
```

---

## Technical Notes for Backend Team

### Authentication

All booking endpoints require authentication via JWT Bearer token:
```
Authorization: Bearer <access_token>
```

### Pagination Format

Use Django REST Framework standard pagination:
```json
{
  "count": 100,
  "next": "https://api.example.com/api/resource/?page=2",
  "previous": null,
  "results": [...]
}
```

### Error Responses

Use consistent error format:
```json
{
  "detail": "Error message",
  "code": "error_code"
}
```

For validation errors:
```json
{
  "field_name": ["Error message 1", "Error message 2"]
}
```

### CORS Configuration

Ensure CORS allows requests from:
- Production: `https://cliltutors.com`
- Development: `http://localhost:3000`

---

## Frontend Implementation Status

All endpoints above have **stubs ready** in the frontend:

| File | Status | Notes |
|------|--------|-------|
| `src/lib/api/sessions.ts` | ✅ Stub ready | Will work immediately once backend implements |
| `src/lib/api/bookings.ts` | ✅ Stub ready | Will work immediately once backend implements |
| `src/lib/queries/index.ts` | ✅ Hooks ready | useSessions, useBookings, useCreateBooking, etc. |

**No frontend changes needed** once backend implements these endpoints. Just deploy and they'll work.

---

**End of Document**
