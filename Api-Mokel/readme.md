## Tech Stack

- Node.js
- Express.js
- Prisma ORM
- MongoDB
- TypeScript

## Prerequisites

- Node.js (v18+ recommended)
- MongoDB database
- npm or yarn

## API Endpoints

### Root Endpoint

- `GET /` - Shows API information and available endpoints

### Locations Endpoints

- `GET /api/locations` - Retrieve all locations
- `POST /api/locations` - Create a new location
- `POST /api/locations/many` - Create many new locations
- `GET /api/locations/:id` - Get a specific location
- `PUT /api/locations/:id` - Update a location
- `DELETE /api/locations/:id` - Delete a location

### Restaurants Endpoints

- `GET /api/restaurants` - Retrieve all restaurants
- `POST /api/restaurants` - Create a new restaurant
- `GET /api/restaurants/:id` - Get a specific restaurant
- `PUT /api/restaurants/:id` - Update a restaurant
- `DELETE /api/restaurants/:id` - Delete a restaurant

## Error Handling

- 400: Bad Request (Invalid input)
- 404: Resource Not Found
- 500: Server Error
