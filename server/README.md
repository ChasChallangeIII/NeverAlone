# NeverAlone API

**NeverAlone** is a smart safety solution designed to help individuals feel more secure in public spaces. By pressing a discreet IoT button, users trigger an incoming call simulation, making them appear occupied. They can later fill out a survey in the mobile app to describe why they felt unsafe. Anonymized data can be shared with municipalities to improve urban safety measures.

## 🌐 Live API

* **Production:** [https://neveralone.onrender.com](https://neveralone.onrender.com)
* **Local:** `http://localhost:8080`

## 📦 Getting Started

```bash
git clone https://github.com/ChasChallangeIII/NeverAlone
cd server
npm install
npm run dev
```

### 🛠️ Environment Variables

Create a `.env` file in the `server` directory with the following content:

```env
PORT=
JWT_SECRET=
NODE_ENV=development
POSTGRES_URL=
```

---

## 📘 API Reference

> All endpoints require **Bearer token authentication** unless specified otherwise.

| Method | Endpoint                        | Description                     | Auth |
| ------ | ------------------------------- | ------------------------------- | ---- |
| POST   | `/auth/signup`                  | Create a new user account       | ❌    |
| POST   | `/auth/signin`                  | Sign in and receive a JWT token | ❌    |
| DELETE | `/auth/account/{deletecommand}` | Delete a user account           | ✅    |

### 📝 Reports

| Method | Endpoint              | Description                | Auth |
| ------ | --------------------- | -------------------------- | ---- |
| POST   | `/api/reports`        | Submit a report            | ✅    |
| GET    | `/admin/reports`      | Admin: Get all reports     | ✅    |
| GET    | `/admin/reports/{id}` | Admin: Get specific report | ✅    |
| PUT    | `/admin/reports/{id}` | Admin: Update report       | ✅    |
| DELETE | `/admin/reports/{id}` | Admin: Delete report       | ✅    |

### 💬 Report Comments

| Method | Endpoint                            | Description                    | Auth |
| ------ | ----------------------------------- | ------------------------------ | ---- |
| GET    | `/admin/comments`                   | Admin: Get all comments        | ✅    |
| GET    | `/admin/comments/report/{reportId}` | Admin: Get comments for report | ✅    |
| POST   | `/admin/comments/{reportId}`        | Admin: Post comment on report  | ✅    |
| PUT    | `/admin/comments/{id}`              | Admin: Update comment          | ✅    |
| DELETE | `/admin/comments/{id}`              | Admin: Delete comment          | ✅    |

### 👥 Contacts

| Method | Endpoint                    | Description         | Auth |
| ------ | --------------------------- | ------------------- | ---- |
| POST   | `/api/contacts`             | Add a contact       | ✅    |
| GET    | `/api/contacts`             | Get user's contacts | ✅    |
| DELETE | `/api/contacts/{contactId}` | Remove a contact    | ✅    |
| GET    | `/api/contacts/search`      | Search contacts     | ✅    |

### 🌐 Community

| Method | Endpoint                                 | Description         | Auth |
| ------ | ---------------------------------------- | ------------------- | ---- |
| GET    | `/api/community/posts`                   | Get all posts       | ✅    |
| POST   | `/api/community/posts`                   | Create new post     | ✅    |
| PUT    | `/api/community/posts/{postId}`          | Update a post       | ✅    |
| DELETE | `/api/community/posts/{postId}`          | Delete a post       | ✅    |
| GET    | `/api/community/posts/{postId}/comments` | Get post comments   | ✅    |
| POST   | `/api/community/posts/{postId}/comments` | Add comment to post | ✅    |
| PUT    | `/api/community/comments/{commentId}`    | Edit comment        | ✅    |
| DELETE | `/api/community/comments/{commentId}`    | Delete comment      | ✅    |

### 👪 Groups

| Method | Endpoint                      | Description    | Auth |
| ------ | ----------------------------- | -------------- | ---- |
| POST   | `/api/groups/`                | Create a group | ✅    |
| GET    | `/api/groups/`                | Get all groups | ✅    |
| PATCH  | `/api/groups/join/{groupid}`  | Join a group   | ✅    |
| PATCH  | `/api/groups/leave/{groupid}` | Leave a group  | ✅    |

### 👤 Admin Users

| Method | Endpoint       | Description          | Auth |
| ------ | -------------- | -------------------- | ---- |
| GET    | `/admin/users` | Admin: Get all users | ✅    |

---

## 🔐 Authentication

This API uses **JWT Bearer Tokens** for securing private routes.

Include the following in the `Authorization` header:

```
Authorization: Bearer <your_token_here>
```

---

## 📎 Repository

[GitHub – ChasChallangeIII/NeverAlone](https://github.com/ChasChallangeIII/NeverAlone)

---
