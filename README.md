# 🔗 Linkly

A modern, feature-rich URL shortening service built with the MERN stack. Linkly allows users to create short, shareable links with advanced features like password protection, expiration dates, QR code generation, and comprehensive analytics.

![Linkly Banner](https://via.placeholder.com/1200x300?text=Linkly+-+URL+Shortener)

## Features

### Core Functionality

- **URL Shortening** - Convert long URLs into short, memorable links
- **Custom Short URLs** - Create personalized short links (optional)
- **QR Code Generation** - Automatically generate QR codes for each shortened URL
- **Link Analytics** - Track clicks, device types, and geographic data
- **Daily Click Charts** - Visualize link performance over time

### Security & Control

- **Password Protection** - Secure your links with password authentication
- **Link Expiration** - Set expiration dates for time-sensitive links
- **Active Date Control** - Schedule when links become active
- **Link Management** - Edit, delete, and manage all your links from one dashboard

### User Authentication

- **Email/Password Authentication** - Traditional sign-up and login with hashed passwords (Argon2)
- **Google OAuth** - Quick sign-in with Google account
- **JWT Authentication** - Secure session management with HTTP-only cookies
- **Protected Routes** - User-specific dashboards and link management

### Analytics Dashboard

- **Click Tracking** - Monitor total clicks and engagement
- **Device Breakdown** - Analyze traffic by device type (desktop, mobile, tablet)
- **Daily Trends** - View click patterns over time with interactive charts
- **Link Statistics** - Detailed metrics for each shortened URL

## Tech Stack

### Frontend

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Server state management
- **Redux Toolkit** - Global state management
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend

- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Passport.js** - Authentication middleware
- **JWT** - Token-based authentication
- **Argon2** - Password hashing
- **NanoID** - Short URL ID generation
- **QRCode** - QR code generation

## 📁 Project Structure

```
Linkly/
├── backend/
│   ├── app.js                      # Express app entry point
│   ├── package.json
│   └── src/
│       ├── config/                 # Configuration files
│       │   ├── config.js
│       │   ├── mongodb.config.js
│       │   └── passport.config.js
│       ├── controllers/            # Request handlers
│       │   ├── analytics.controllers.js
│       │   ├── auth.controllers.js
│       │   ├── shorturl.controllers.js
│       │   └── user.controllers.js
│       ├── dao/                    # Data Access Objects
│       │   ├── shorturl.dao.js
│       │   └── user.dao.js
│       ├── middlewares/            # Custom middleware
│       │   └── auth.middleware.js
│       ├── models/                 # Database schemas
│       │   ├── clickSchema.js
│       │   ├── shorturlSchema.js
│       │   └── user.model.js
│       ├── routes/                 # API routes
│       │   ├── analytics.routes.js
│       │   ├── auth.routes.js
│       │   ├── shorturl.routes.js
│       │   └── user.routes.js
│       ├── services/               # Business logic
│       │   ├── analytics.services.js
│       │   ├── auth.services.js
│       │   └── shorturl.services.js
│       └── utils/                  # Helper functions
│           ├── errorHandler.js
│           ├── generateId.js
│           ├── generateQrCode.js
│           ├── getDeviceType.js
│           ├── jwtHelper.js
│           └── tryCatchWrapper.js
│
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx                # App entry point
        ├── RootLayout.jsx          # Root layout component
        ├── index.css               # Global styles
        ├── api/                    # API client functions
        │   ├── ShortUrl.api.jsx
        │   └── User.api.jsx
        ├── components/             # Reusable components
        │   ├── EditExpirationModal.jsx
        │   ├── FAQ.jsx
        │   ├── Footer.jsx
        │   ├── GoogleAuthButton.jsx
        │   ├── LoginForm.jsx
        │   ├── NavBar.jsx
        │   ├── PasswordProtectionModal.jsx
        │   ├── RegisterForm.jsx
        │   ├── UrlForm.jsx
        │   ├── UserUrls.jsx
        │   └── Analytics/
        │       ├── DailyClicksChart.jsx
        │       ├── DeviceBreakdownChart.jsx
        │       ├── EmptyAnalytics.jsx
        │       ├── LinkInfoCard.jsx
        │       └── StatCard.jsx
        ├── pages/                  # Page components
        │   ├── AnalyticsPage.jsx
        │   ├── AuthPage.jsx
        │   ├── DashboardPage.jsx
        │   ├── ExpiredLinkPage.jsx
        │   ├── GoogleCallbackPage.jsx
        │   ├── HomePage.jsx
        │   ├── LinkNotActive.jsx
        │   ├── ProtectedLinkPage.jsx
        │   └── UrlsPage.jsx
        ├── routing/                # Route definitions
        │   └── ...
        ├── store/                  # Redux store
        │   ├── store.js
        │   └── slice/
        │       └── authSlice.js
        └── utils/                  # Utility functions
            ├── axiosInstance.js
            └── helper.js
```

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Google OAuth credentials (for Google authentication)

### Backend Setup

1. **Navigate to the backend directory**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment variables**

   Create a `.env` file in the backend directory:

   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # Database
   MONGODB_URI=mongodb://localhost:27017/linkly
   # Or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/linkly

   # JWT Secret
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRES_IN=7d

   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:3000`

### Frontend Setup

1. **Navigate to the frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment variables (optional)**

   Create a `.env` file in the frontend directory if you need to configure the API URL:

   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:5173`

## 🔌 API Endpoints

### Authentication

```
POST   /api/auth/register          # Register new user
POST   /api/auth/login             # Login user
POST   /api/auth/logout            # Logout user
GET    /api/auth/google            # Google OAuth login
GET    /api/auth/google/callback   # Google OAuth callback
GET    /api/auth/check             # Check auth status
```

### URL Management

```
POST   /api/create                 # Create short URL
GET    /api/user/urls              # Get user's URLs
PUT    /api/user/urls/:id          # Update URL
DELETE /api/user/urls/:id          # Delete URL
GET    /:id                        # Redirect to original URL
```

### Analytics

```
GET    /api/analytics/:shortUrl    # Get analytics for a specific URL
```

### User

```
GET    /api/user/profile           # Get user profile
PUT    /api/user/profile           # Update user profile
```

## Usage

### Creating a Short URL

1. **Register/Login** to your account
2. Navigate to the **Dashboard**
3. Enter your long URL in the form
4. **(Optional)** Configure additional settings:
   - Custom short URL
   - Password protection
   - Expiration date
   - Active from date
5. Click **Shorten URL**
6. Copy and share your short link!

### Viewing Analytics

1. Go to **My URLs** page
2. Click on any link to view detailed analytics
3. See metrics including:
   - Total clicks
   - Device breakdown
   - Daily click trends
   - Link information

### Password-Protected Links

When creating a URL:

1. Enable **Password Protection**
2. Set a password
3. Users will need to enter this password before being redirected

### Link Expiration

1. Set an **Expiration Date** when creating a URL
2. After this date, the link will show an expired page instead of redirecting

## Features in Detail

### QR Code Generation

Every shortened URL automatically generates a QR code that can be downloaded and shared. Perfect for marketing materials, business cards, or print media.

### Analytics Dashboard

Track your link performance with:

- **Daily clicks chart** - Interactive line chart showing click trends
- **Device breakdown** - Pie chart categorizing clicks by device type
- **Click statistics** - Total clicks, creation date, and more
- **Link details** - View full URL, expiration status, and settings

### User Dashboard

Centralized control panel where you can:

- Create new short URLs
- View all your links at a glance
- Quick access to analytics
- Edit or delete existing links

## Security Features

- **Argon2 Password Hashing** - Industry-standard password encryption
- **JWT Authentication** - Secure, stateless authentication
- **HTTP-Only Cookies** - Protection against XSS attacks
- **CORS Configuration** - Controlled cross-origin requests
- **Password-Protected Links** - Additional layer of security for sensitive URLs
- **Input Validation** - Server-side validation for all inputs

## Deployment

### Backend Deployment (Recommended: Railway/Render/Heroku)

1. Push your code to GitHub
2. Connect your repository to your hosting platform
3. Set environment variables in the hosting dashboard
4. Deploy!

### Frontend Deployment (Recommended: Vercel/Netlify)

1. Push your code to GitHub
2. Connect your repository to Vercel/Netlify
3. Set the build command: `npm run build`
4. Set the output directory: `dist`
5. Deploy!

### Environment Variables for Production

Update your `.env` files with production URLs and credentials.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Sanvi Kumari

- GitHub: [@sanviii19](https://github.com/sanviii19)
- LinkedIn: [Sanvi Kumari](https://www.linkedin.com/in/sanvi-kumari/)

## Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

---

<div align="center">
  Made with ❤️ using React and Node.js
</div>
