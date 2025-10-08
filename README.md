.
├── .env.example              # Environment variables template
├── .gitignore               # Git ignore rules
├── README.md                # Project documentation
├── jest.config.js           # Jest testing configuration
├── package.json             # Project dependencies and scripts
├── src/
│   ├── app.js              # Express application configuration
│   ├── server.js           # HTTP server startup with graceful shutdown
│   ├── config/
│   │   └── env.js          # Environment variable loading and validation
│   ├── controllers/
│   │   ├── healthController.js      # Health check endpoint logic
│   │   └── testEntityController.js  # Test entity CRUD operations
│   ├── middleware/
│   │   ├── errorHandler.js         # Global error handling middleware
│   │   ├── rateLimiter.js          # Rate limiting configuration
│   │   ├── security.js             # Security headers and CORS
│   │   └── validator.js            # Request validation middleware
│   ├── models/
│   │   └── testEntity.js           # In-memory test entity model
│   ├── routes/
│   │   ├── index.js                # Route aggregator
│   │   ├── healthRoutes.js         # Health check routes
│   │   └── testEntityRoutes.js     # Test entity routes
│   ├── utils/
│   │   ├── logger.js               # Winston logging configuration
│   │   ├── responseFormatter.js    # Standardized API responses
│   │   └── testEntityValidator.js  # Entity validation rules
│   └── validators/
└── tests/
    ├── setup.js                    # Jest test configuration
    ├── health.test.js              # Health endpoint tests
    └── testEntity.test.js          # Test entity CRUD tests
