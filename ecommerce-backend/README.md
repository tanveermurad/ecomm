# E-Commerce Backend REST API

A complete E-Commerce Backend REST API built with **Node.js** and **Express.js**, covering Users and Products with full CRUD, route-level middleware, request validation, API key authentication, and centralized error handling.

## Folder Structure

```
ecommerce-backend/
├── controllers/
│   ├── userController.js      # Business logic for user CRUD
│   └── productController.js   # Business logic for product CRUD
├── middleware/
│   ├── auth.js                # API key authentication (query param)
│   ├── validate.js             # Request body validation
│   └── errorHandler.js         # 404 + centralized error handler
├── routes/
│   ├── users.js                 # Express Router for /api/users
│   └── products.js              # Express Router for /api/products
├── data/
│   └── store.js                 # In-memory data store (seeded sample data)
├── postman/
│   └── ECommerce-API.postman_collection.json
├── server.js                    # App entry point
├── package.json
├── .env.example
└── .gitignore
```

## Setup

```bash
git clone <your-repo-url>
cd ecommerce-backend
npm install
cp .env.example .env
npm start          # or: npm run dev (with nodemon)
```

Server runs at `http://localhost:5000` by default.

## Authentication

Write operations (`POST`, `PUT`, `DELETE`) require an API key passed as a **query parameter**:

```
?apiKey=my-secret-api-key-123
```

(Set your own key in `.env` — see `.env.example`.) Requests without a valid key receive `401 Unauthorized`.

## API Endpoints

### Users (`/api/users`)

| Method | Endpoint          | Protected | Description       |
|--------|-------------------|-----------|--------------------|
| GET    | `/api/users`      | No        | Get all users      |
| GET    | `/api/users/:id`  | No        | Get a single user  |
| POST   | `/api/users`      | Yes       | Create a new user  |
| PUT    | `/api/users/:id`  | Yes       | Update a user      |
| DELETE | `/api/users/:id`  | Yes       | Delete a user      |

### Products (`/api/products`)

| Method | Endpoint             | Protected | Description                          |
|--------|-----------------------|-----------|----------------------------------------|
| GET    | `/api/products`       | No        | Get all products (optional `?category=`) |
| GET    | `/api/products/:id`   | No        | Get a single product                   |
| POST   | `/api/products`       | Yes       | Create a new product                   |
| PUT    | `/api/products/:id`   | Yes       | Update a product                       |
| DELETE | `/api/products/:id`   | Yes       | Delete a product                       |

## Example Requests

**Create a user**
```bash
curl -X POST "http://localhost:5000/api/users?apiKey=my-secret-api-key-123" \
  -H "Content-Type: application/json" \
  -d '{"name":"Bilal Ahmed","email":"bilal@example.com","role":"customer"}'
```

**Create a product**
```bash
curl -X POST "http://localhost:5000/api/products?apiKey=my-secret-api-key-123" \
  -H "Content-Type: application/json" \
  -d '{"name":"Bluetooth Speaker","price":3499,"category":"Electronics","stock":50}'
```

## Response Format

All responses follow a consistent JSON shape:

```json
{ "status": "success", "data": { } }
```

```json
{ "status": "error", "message": "Human-readable error description" }
```

## HTTP Status Codes Used

| Code | Meaning                                |
|------|------------------------------------------|
| 200  | OK — successful GET/PUT/DELETE           |
| 201  | Created — successful POST                |
| 400  | Bad Request — validation failure         |
| 401  | Unauthorized — missing/invalid API key   |
| 404  | Not Found — resource or route not found  |
| 500  | Internal Server Error — unexpected error |

## Middleware

- **`auth.js`** — validates `?apiKey=` on protected routes.
- **`validate.js`** — validates user/product payloads before they reach the controller.
- **`errorHandler.js`** — catches unmatched routes (404) and any thrown/forwarded errors (500), returning consistent JSON.
- **`morgan`** — HTTP request logging (dev format) for every incoming request.

## Testing with Postman

1. Import `postman/ECommerce-API.postman_collection.json` into Postman.
2. Set the collection variables `baseUrl` (default `http://localhost:5000`) and `apiKey` (must match your `.env`).
3. Run **Get All Users** / **Get All Products** first, copy an `id` from the response into the `userId` / `productId` collection variables, then run the rest.
4. The collection includes both success cases and error cases (missing API key, invalid API key, validation errors, not-found errors) for every resource.

## Data Persistence

This project uses an **in-memory store** (`data/store.js`) seeded with sample records, so it runs with zero external setup. Data resets when the server restarts. The controller layer is isolated from storage, so swapping in MongoDB/PostgreSQL later only requires changing `data/store.js` and the controllers' data-access calls.

## Notes for GitHub Submission

- Do not commit `.env` (already in `.gitignore`) — commit `.env.example` instead.
- Suggested repo description: "E-Commerce Backend REST API — Node.js, Express, API key auth, Postman-tested."
