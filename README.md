# Stock Portfolio Tracker - Doy Again 📉

A modern, full-stack web application for tracking your stock portfolio with real-time prices, profit/loss calculations, wishlist management, and market news. Built with Next.js, TypeScript, MongoDB, and modern authentication.

# 🚀 Released Version
https://doy-again.vercel.app/

## ✨ Features

### 📊 Portfolio Management
- **Real-time Stock Prices** - Integration with Finnhub API
- **Profit/Loss Tracking** - Automatic calculation of realized and unrealized P/L
- **Portfolio Summary** - Overview of total investment, current value, and net P/L
- **Stock Logos** - Visual identification with automatic 2-letter fallback
- **Sortable Columns** - Sort by any column (symbol, units, price, P/L, etc.)
- **Auto-fill Symbol** - Click from stock details to pre-fill add/edit forms

### ⭐ Wishlist
- **Track Stocks** - Save stocks you're interested in without buying
- **Add Notes** - Personal notes for each wishlist item
- **Target Price** - Set your desired entry price
- **Quick Actions** - Add to portfolio or remove from wishlist
- **View Details** - Click any stock to see full analysis

### 💼 Transaction Management
- **Buy/Sell Stocks** - Easy interface for managing your positions
- **Transaction History** - Complete record of all trades
- **Time Filters** - View transactions by day, week, month, or all time
- **Realized P/L Tracking** - See profits/losses from completed trades

### 📰 Market News
- **Latest News** - Top market news from Finnhub
- **News Tab** - Dedicated page for authenticated users
- **Article Cards** - Images, headlines, summaries, and sources
- **External Links** - Click to read full articles

### 🔍 Stock Details & Search
- **Comprehensive Analysis** - Company info, metrics, recommendations
- **Analyst Ratings** - Buy/Hold/Sell recommendations
- **News Sentiment** - Market sentiment analysis
- **Global Search** - Search any stock from navbar
- **Auto-complete** - Smart suggestions with logos
- **Public Access** - View stock details without signing in

### 🔐 User Authentication
- **Modal-based Auth** - Seamless sign in/up without page redirects
- **JWT Authentication** - Secure token-based auth
- **Password Security** - Bcrypt hashing with validation
- **Personal Data** - Each user has private portfolio
- **Session Management** - 7-day token expiration

### 🎨 Modern UI/UX
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Beautiful Gradients** - Modern blue-purple gradient theme
- **Interactive Elements** - Hover effects and smooth transitions
- **Motivational Quotes** - Rotating investor quotes on portfolio
- **Landing Page** - Beautiful entry page for non-authenticated users

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **MongoDB** (Local or Atlas)
- **API Keys** (Optional but recommended):
  - Finnhub API key (for real-time prices)
  - Alpha Vantage API key (for fallback)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd doy-again
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # MongoDB Connection (Local or Atlas)
   MONGODB_URI=mongodb://localhost:27017/doy-again
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/doy-again?retryWrites=true&w=majority
   
   # JWT Secret (REQUIRED - Change this!)
   JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
   
   # Stock Data APIs (At least one recommended)
   FINNHUB_API_KEY=your_finnhub_api_key_here
   ALPHAVANTAGE_API_KEY=your_alphavantage_api_key_here
   ```

4. **Get API Keys (Optional)**
   
   **Finnhub (Recommended - Primary API):**
   - Visit: https://finnhub.io/register
   - Free tier: 60 calls/minute
   - Fast and reliable
   
   **Alpha Vantage (Fallback API):**
   - Visit: https://www.alphavantage.co/support/#api-key
   - Free tier: 5 calls/minute, 500/day
   - Automatic fallback if Finnhub fails

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### First Time Setup

1. **Create an Account**
   - Click "Sign Up" on the sign-in page
   - Enter your name, email, and password
   - Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number

2. **Add Your First Stock**
   - Click "+ Add Stock" button
   - Search for a stock symbol (e.g., AAPL, MSFT, NVDA)
   - Enter the number of units and purchase price
   - Click "Add Stock"

3. **View Your Portfolio**
   - See all your stocks with real-time prices
   - View total cost, current value, and profit/loss
   - Track unrealized and realized P/L

### Managing Stocks

**Buy More:**
- Click "Edit" on any stock
- Select "Buy More"
- Enter units and price
- Average price is automatically recalculated

**Sell Stocks:**
- Click "Edit" on any stock
- Select "Sell"
- Enter units and sale price
- Realized P/L is automatically calculated

**View Transaction History:**
- Click "📊 View History" button
- Filter by time period (Day, Week, Month, All Time)
- See all buy/sell transactions with P/L

## 🏗️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Context** - Global state management

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing

### External APIs
- **Finnhub** - Primary stock data API
- **Alpha Vantage** - Fallback stock data API
- **Financial Modeling Prep** - Stock logos CDN

## 📁 Project Structure

```
doy-again/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # API routes
│   │   │   ├── auth/             # Authentication endpoints
│   │   │   │   ├── signin/       # Sign in
│   │   │   │   └── signup/       # Sign up
│   │   │   ├── portfolio/        # Portfolio endpoints
│   │   │   │   └── stocks/       # Stock CRUD operations
│   │   │   ├── wishlist/         # Wishlist endpoints
│   │   │   │   └── [symbol]/     # Wishlist item operations
│   │   │   ├── stocks/           # Stock details
│   │   │   │   └── [symbol]/     # Get stock information
│   │   │   ├── market-news/      # Market news endpoint
│   │   │   ├── search-stocks/    # Stock search autocomplete
│   │   │   └── stock-price/      # Real-time price fetching
│   │   ├── portfolio/            # Portfolio pages
│   │   │   ├── add/              # Add stock page
│   │   │   ├── edit/[symbol]/    # Edit stock page (buy/sell)
│   │   │   └── history/          # Transaction history page
│   │   ├── wishlist/             # Wishlist pages
│   │   │   └── page.tsx          # Wishlist management
│   │   ├── stocks/               # Stock pages
│   │   │   └── [symbol]/         # Stock details page
│   │   ├── news/                 # News page
│   │   │   └── page.tsx          # Market news
│   │   └── page.tsx              # Landing page
│   ├── components/               # React components
│   │   ├── PortfolioTable.tsx    # Stock list table
│   │   ├── PortfolioSummary.tsx  # Portfolio overview
│   │   ├── AddStockForm.tsx      # Stock input form
│   │   ├── StockLogo.tsx         # Logo with fallback
│   │   ├── Navbar.tsx            # Navigation with search
│   │   ├── AuthModal.tsx         # Sign in/up modal
│   │   └── ProtectedRoute.tsx    # Auth wrapper
│   ├── contexts/                 # React contexts
│   │   └── AuthContext.tsx       # Authentication state
│   ├── lib/                      # Utilities and configs
│   │   ├── auth/                 # Auth utilities
│   │   │   ├── middleware.ts     # JWT validation
│   │   │   └── utils.ts          # Password hashing
│   │   ├── db/                   # Database
│   │   │   ├── connection.ts     # MongoDB connection
│   │   │   ├── models.ts         # Stock model
│   │   │   ├── wishlistModel.ts  # Wishlist model
│   │   │   └── userModel.ts      # User model
│   │   └── utils/                # Helper functions
│   │       ├── auth-fetch.ts     # Authenticated fetch
│   │       ├── calculations.ts   # P/L calculations
│   │       ├── logos.ts          # Logo URLs
│   │       ├── realPrices.ts     # Stock price fetching
│   │       └── stockDetails.ts   # Stock data aggregation
│   └── types/                    # TypeScript types
│       └── index.ts              # Shared interfaces
├── .env.local                    # Environment variables (create this)
├── .env.example                  # Environment template
├── README.md                     # This file
├── TRANSACTION_CLEANUP.md        # Transaction refactoring docs
└── package.json                  # Dependencies
```

## 🔒 Security Features

- **Password Hashing** - Bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **Password Validation** - Enforced complexity requirements
- **Data Isolation** - User-specific database queries
- **Protected Routes** - Authentication required for portfolio pages
- **Secure API Endpoints** - Token validation on all protected routes

## 🧮 Calculations

### Average Price
When buying more of an existing stock:
```
New Avg Price = (Old Avg Price × Old Units + New Price × New Units) / Total Units
```

### Unrealized P/L
Profit/loss on stocks you still own:
```
Unrealized P/L = (Current Price - Average Price) × Units
```

### Realized P/L
Profit/loss from selling stocks:
```
Realized P/L = (Sale Price - Average Price) × Units Sold
```

### Net P/L
Total profit/loss:
```
Net P/L = Unrealized P/L + Realized P/L
```

## 🌐 API Fallback Strategy

The app uses a multi-API approach for reliability:

1. **Stock Search:**
   - Try Finnhub first (60 calls/min)
   - Fallback to Alpha Vantage (5 calls/min)
   - If both fail, manual symbol entry still works

2. **Real-time Prices:**
   - Try Finnhub first (fast, reliable)
   - Fallback to Alpha Vantage
   - If both fail, use your average purchase price

3. **Stock Logos:**
   - Financial Modeling Prep CDN
   - Automatic 2-letter fallback if logo unavailable

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/doy-again
```

**MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/doy-again?retryWrites=true&w=majority
```

**Special Characters in Password:**
URL encode them: `@` → `%40`, `#` → `%23`, etc.

### API Keys Not Working

- Verify keys are correct in `.env.local`
- Restart dev server after adding keys
- Check API rate limits (Finnhub: 60/min, Alpha Vantage: 5/min)
- App works without API keys (manual symbol entry, no real-time prices)

### Authentication Issues

- Make sure `JWT_SECRET` is set in `.env.local`
- Clear browser localStorage and try again
- Check browser console for errors

## � Documentation

### Transaction Cleanup Process

For detailed information about the transaction cleanup and refactoring process, see:
- **[TRANSACTION_CLEANUP.md](./TRANSACTION_CLEANUP.md)** - Complete documentation of:
  - Transaction model removal and migration
  - Portfolio calculation changes
  - API endpoint updates
  - Type system refactoring
  - Testing and validation steps

This document provides a comprehensive guide to understanding how the portfolio system evolved from a transaction-based model to a simplified stock-based model.

## �📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Built with ❤️ using Next.js, TypeScript, and MongoDB

---

**Happy Trading! 📈**

# 🚀 Let's try and see your money losing 😜
https://doy-again.vercel.app/
