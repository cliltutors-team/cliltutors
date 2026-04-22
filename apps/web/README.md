# 💼 CLILTUTORS – Plataforma Web del Centro de Prácticas

¡Bienvenido/a al repositorio oficial de **CLILTUTORS**!

Este proyecto fue desarrollado por estudiantes del programa de **Ingeniería Informática** como parte del **Centro de Prácticas CLILTUTORS**.

Su objetivo es servir como base institucional para el desarrollo, mantenimiento y evolución del sitio web oficial, facilitando la continuidad del proyecto entre diferentes cohortes de practicantes.

---

## 🧭 Propósito del repositorio

Este repositorio contiene el código fuente del sitio web **CLILTUTORS**, construido con **Next.js** y desplegado en **Vercel**.

Está pensado para que:

- Nuevos practicantes puedan integrarse rápidamente.
- El proyecto mantenga coherencia técnica y visual.
- El mantenimiento y despliegue sigan prácticas profesionales reales.

---

## 🧱 Tecnologías principales

- **Next.js 15**
- **React**
- **Bun**
- **Git & GitHub**
- **Vercel**

---

## 🚀 Estructura de ramas

| Rama        | Descripción                           |
| ----------- | ------------------------------------- |
| `main`      | Versión estable (producción)          |
| `develop`   | Integración de nuevas funcionalidades |
| `feature/*` | Nuevas funcionalidades                |
| `hotfix/*`  | Correcciones urgentes                 |

---

## 🧑‍💻 Ejecutar el proyecto en local

```bash
git clone https://github.com/cliltutors-team/cliltutors
cd cliltutors
bun install
bun dev
```

Abrir en: http://localhost:3000

---

## ☁️ Despliegue (Vercel)

- Producción (`main`): https://cliltutors.com
- Desarrollo (`develop`): https://cliltutors-dev.vercel.app

---

## 🏛️ Créditos

Centro de Prácticas CLILTUTORS
Programa de Ingeniería Informática
Año de inicio: 2025

---

## 🔗 Frontend-Backend Integration Status

**Last Updated:** 2026-03-31 | **Backend:** `https://cliltutors-backend.onrender.com`

### Completed Integrations ✅

| Component         | Location                              | Status  |
| ----------------- | ------------------------------------- | ------- |
| API Client        | `src/lib/api/client.ts`               | ✅      |
| Type Definitions  | `src/lib/api/types.ts`                | ✅      |
| React Query Setup | `src/lib/providers/QueryProvider.tsx` | ✅      |
| Auth Hooks        | `src/lib/queries/auth.ts`             | ✅      |
| Course Hooks      | `src/lib/queries/courses.ts`          | ✅      |
| Instructor Hooks  | `src/lib/api/instructors.ts`          | ✅      |
| Session Hooks     | `src/lib/queries/index.ts`            | ✅ NEW! |

### Working API Endpoints ✅

| Endpoint                        | Method | Purpose                     | Auth | Verified    |
| ------------------------------- | ------ | --------------------------- | ---- | ----------- |
| `/api/login/`                   | POST   | User login                  | ❌   | ✅          |
| `/api/register/`                | POST   | User registration (student) | ❌   | ✅          |
| `/api/token/refresh/`           | POST   | Refresh token               | ❌   | ✅          |
| `/api/courses/`                 | GET    | List courses (paginated)    | ❌   | ✅          |
| `/api/courses/:id/`             | GET    | Course detail               | ❌   | ✅          |
| `/api/courses/purchase/:id/`    | POST   | Purchase course             | ✅   | ✅          |
| `/api/instructors/`             | GET    | List instructors            | ✅   | ✅          |
| `/api/instructors/:id/`         | GET    | Instructor detail           | ✅   | ✅          |
| `/api/students/`                | GET    | List students (paginated)   | ✅   | ✅          |
| `/api/admin/create-instructor/` | POST   | Create instructor (admin)   | ✅   | ✅          |
| `/api/sessions/`                | GET    | List sessions (paginated)   | ❌   | ✅ **NEW!** |
| `/api/sessions/:id/`            | GET    | Session detail              | ❌   | ✅ **NEW!** |

### Pending Backend Implementation ❌

| Endpoint                             | Method | Purpose          | Priority | Status             |
| ------------------------------------ | ------ | ---------------- | -------- | ------------------ |
| `/api/bookings/me`                   | GET    | User's bookings  | HIGH     | ❌ Not implemented |
| `/api/bookings`                      | POST   | Create booking   | HIGH     | ❌ Not implemented |
| `/api/bookings/:id/cancel`           | PUT    | Cancel booking   | HIGH     | ❌ Not implemented |
| `/api/calendar/month`                | GET    | Calendar dates   | MEDIUM   | ❌ Not implemented |
| `/api/instructors/:id/availability/` | GET    | Instructor slots | MEDIUM   | ❌ Not implemented |

> **Update:** Sessions endpoints are NOW IMPLEMENTED! Only 5 endpoints remain pending.

### Pages Using Mock Data

| Page           | Mock Source            | Migration Needed                   |
| -------------- | ---------------------- | ---------------------------------- |
| `/schedule`    | `lib/mock/sessions.ts` | Yes - Replace with `useSessions()` |
| `/courses`     | `lib/mock/courses.ts`  | Yes - Use `useCourses()` hook      |
| `/my-learning` | `lib/mock/user.ts`     | Yes - Progress tracking API        |
| `/profile`     | `lib/mock/user.ts`     | Yes - User profile API             |

### Pages Using Live API ✅

- `/instructors` - Uses `useInstructors()`
- `/instructors/[id]` - Uses `useInstructor(id)`
- `/login` - Uses `useLogin()`

### Testing Commands

```bash
# Test backend connectivity
curl https://cliltutors-backend.onrender.com/api/instructors/

# Test login
curl -X POST https://cliltutors-backend.onrender.com/api/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass"}'

# Test missing endpoints (should return 404)
curl https://cliltutors-backend.onrender.com/api/sessions
```

### Migration Path (When Backend Ready)

```diff
# In /schedule page:
- import { useBooking } from '@/src/lib/hooks/useBooking';
+ import { useSessions, useBookings, useCreateBooking } from '@/src/lib/queries';

- const booking = useBooking();
+ const { data: sessionsData } = useSessions(filters);
+ const { data: bookingsData } = useBookings();

- booking.bookSession(sessionId);
+ createBooking.mutate({ sessionId });
```

### Key Files

```
src/lib/
├── api/
│   ├── client.ts # ✅ API client (complete)
│   ├── types.ts # ✅ API types (complete)
│   ├── auth.ts # ✅ Auth API (complete)
│   ├── courses.ts # ✅ Courses API (complete)
│   ├── instructors.ts # ✅ Instructors API (complete)
│   ├── students.ts # ✅ Students API (complete)
│   ├── admin.ts # ✅ Admin API (complete)
│   ├── sessions.ts # ⚠️ Pending backend
│   └── bookings.ts # ⚠️ Pending backend
├── queries/
│   ├── auth.ts # ✅ Auth hooks
│   ├── courses.ts # ✅ Course hooks
│   ├── students.ts # ✅ Student hooks
│   └── admin.ts # ✅ Admin hooks
├── hooks/
│   └── useBooking.tsx # Mock context (replace when backend ready)
└── mock/
    ├── sessions.ts # Mock session data
    └── courses.ts # Mock course data
```

---

## 📋 API Endpoint Validation

### Swagger Spec vs Implementation

| Endpoint                             | Swagger | Frontend | Response Match | Notes                                |
| ------------------------------------ | ------- | -------- | -------------- | ------------------------------------ |
| `POST /api/login/`                   | ✅      | ✅       | ⚠️             | Verify `email` vs `username` field   |
| `POST /api/register/`                | ✅      | ✅       | ⚠️             | Verify `password_confirm` required   |
| `GET /api/courses/`                  | ✅      | ✅       | ✅             | Paginated response matches           |
| `GET /api/courses/{id}/`             | ✅      | ✅       | ✅             | Course schema matches                |
| `POST /api/courses/purchase/{id}/`   | ✅      | ✅       | ⚠️             | Response schema unknown              |
| `GET /api/instructors/`              | ✅      | ✅       | ⚠️             | Profile structure needs verification |
| `GET /api/instructors/{id}/`         | ✅      | ✅       | ⚠️             | Profile structure needs verification |
| `GET /api/students/`                 | ✅      | ✅       | ⚠️             | Pagination needs verification        |
| `POST /api/admin/create-instructor/` | ✅      | ✅       | ⚠️             | Request body needs verification      |

### Course Schema Validation

**Swagger Response:**

```json
{
  "id": 0,
  "title": "string",
  "description": "string",
  "price": "",
  "level": "string",
  "is_published": true,
  "total_lessons": 0,
  "created_at": "2026-03-23T01:42:53.532Z"
}
```

**Frontend Type:** ✅ **MATCHES**

```typescript
interface Course {
  id: number;
  title: string;
  description: string | null;
  price: string;
  level: string | null;
  is_published: boolean;
  total_lessons: number;
  created_at: string;
}
```

### Instructor Schema (Needs Backend Verification)

**Frontend Expects:**

```typescript
interface Instructor {
  id: number;
  username: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  profile: {
    avatar_url: string | null;
    bio: Record<string, string>;
    languages: string[];
    specialties: string[];
    rating: number;
    review_count: number;
    country: string;
    timezone: string;
    hourly_rate: string;
    session_duration: 30 | 60;
    is_active: boolean;
  };
}
```

> ⚠️ **Verify with backend:** The nested `profile` structure and all fields.

### Missing Endpoints (Not in Swagger)

These endpoints are implemented in frontend but **NOT in backend**:

1. **Sessions** - Required for schedule page
2. **Bookings** - Required for booking flow
3. **Calendar** - Required for calendar dots
4. **Instructor Availability** - Required for time slot selection

---

## 🔧 React Query Hooks

| Hook                    | Endpoint                           | Status             |
| ----------------------- | ---------------------------------- | ------------------ |
| `useLogin()`            | POST /api/login/                   | ✅ Working         |
| `useRegister()`         | POST /api/register/                | ✅ Working         |
| `useLogout()`           | Local                              | ✅ Working         |
| `useAuth()`             | Local token check                  | ✅ Working         |
| `useCourses(page?)`     | GET /api/courses/                  | ✅ Working         |
| `useCourse(id)`         | GET /api/courses/{id}/             | ✅ Working         |
| `usePurchaseCourse()`   | POST /api/courses/purchase/{id}/   | ✅ Working         |
| `useInstructors()`      | GET /api/instructors/              | ✅ Working         |
| `useInstructor(id)`     | GET /api/instructors/{id}/         | ✅ Working         |
| `useStudents(page?)`    | GET /api/students/                 | ✅ Working         |
| `useCreateInstructor()` | POST /api/admin/create-instructor/ | ✅ Working         |
| `useSessions(params)`   | GET /api/sessions                  | ❌ Backend missing |
| `useSession(id)`        | GET /api/sessions/{id}             | ❌ Backend missing |
| `useCalendarMonth(y,m)` | GET /api/calendar/month            | ❌ Backend missing |
| `useBookings()`         | GET /api/bookings/me               | ❌ Backend missing |
| `useCreateBooking()`    | POST /api/bookings                 | ❌ Backend missing |
| `useCancelBooking()`    | PUT /api/bookings/{id}/cancel      | ❌ Backend missing |

---

## 🧪 API Testing Commands

```bash
# Test backend connectivity
curl https://cliltutors-backend.onrender.com/api/instructors/

# Test login (verify email vs username)
curl -X POST https://cliltutors-backend.onrender.com/api/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass"}'

# Test courses list (paginated)
curl https://cliltutors-backend.onrender.com/api/courses/

# Test course purchase (needs auth)
curl -X POST https://cliltutors-backend.onrender.com/api/courses/purchase/1/ \
  -H "Authorization: Bearer <token>"

# Test students list (needs auth)
curl https://cliltutors-backend.onrender.com/api/students/ \
  -H "Authorization: Bearer <token>"

# Test missing endpoints (should return 404)
curl https://cliltutors-backend.onrender.com/api/sessions
curl https://cliltutors-backend.onrender.com/api/bookings/me
```

src/lib/
├── api/
│ ├── client.ts # ✅ API client (complete)
│ ├── types.ts # ✅ API types (complete)
│ ├── auth.ts # ✅ Auth API (complete)
│ ├── courses.ts # ✅ Courses API (complete)
│ ├── instructors.ts # ✅ Instructors API (complete)
│ ├── sessions.ts # ⚠️ Pending backend
│ └── bookings.ts # ⚠️ Pending backend
├── queries/
│ ├── auth.ts # ✅ Auth hooks
│ └── courses.ts # ✅ Course hooks
├── hooks/
│ └── useBooking.tsx # Mock context (replace when backend ready)
└── mock/
├── sessions.ts # Mock session data
└── courses.ts # Mock course data

```

---

## 🌐 API Integration Status

### ✅ Working Endpoints (8)
- `/api/login/` POST - JWT authentication
- `/api/register/` POST - User registration
- `/api/courses/` GET - Course listings (paginated)
- `/api/courses/{id}/` GET - Course details
- `/api/sessions/` GET - Session listings with filters
- `/api/sessions/{id}/` GET - Session details

### ❌ Not Implemented (7 critical)
Backend endpoints needed:
1. `GET /api/users/me/` - User profile
2. `GET /api/users/me/dashboard/` - Dashboard data
3. `GET /api/users/me/stats/` - User statistics
4. `GET /api/users/me/progress/` - Course progress
5. `GET /api/users/me/activity/` - Recent activity
6. `/api/bookings/` CRUD - Booking management
7. `GET /api/calendar/month` - Calendar dates

### 🔄 Cold Start Handling
The frontend implements retry logic for Render free tier:
- **8 retry attempts** with exponential backoff
- **90s timeout** for cold starts
- **Graceful fallbacks** for missing endpoints
- **Error boundaries** for API failures

All missing endpoints return empty data instead of crashing.

```

```

```
