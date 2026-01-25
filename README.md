# 📚 Book Center - E-Commerce Website

A modern, full-featured e-commerce platform for selling books, stationery, school bags, and educational products. Built with Next.js 14, TypeScript, PostgreSQL, and Prisma.

## ✨ Features

### Customer Features
- ✅ Browse products by category
- ✅ Search and filter products
- ✅ Product detail pages with images
- ✅ Shopping cart with persistent state
- ✅ Guest checkout (no login required)
- ✅ Responsive, modern UI
- ✅ Real-time stock availability

### Admin Features
- ✅ Secure JWT-based authentication
- ✅ Dashboard with statistics
- ✅ Product management (CRUD)
- ✅ **CSV Bulk Import** - Upload hundreds of products at once
- ✅ Category management
- ✅ Order tracking and status updates
- ✅ Stock management
- ✅ Image URL support for products

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (Admin only)
- **State Management**: Zustand (Shopping cart)
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- PostgreSQL database running
- npm or yarn package manager

## 🚀 Getting Started

### 1. Clone the Repository

```bash
cd bookcenter
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Update `.env` with your database credentials:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/bookcenter?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Setup Database

Run Prisma migrations to create database tables:

```bash
npx prisma migrate dev --name init
```

### 5. Seed the Database

Populate the database with sample data:

```bash
npx prisma db seed
```

This creates:
- Admin user: `admin@bookcenter.com` / `admin123`
- 4 categories: Books, Stationery, Bags, Accessories
- 10 sample products

### 6. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the store.

## 🔑 Admin Access

Access the admin panel at: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

**Default credentials:**
- Email: `admin@bookcenter.com`
- Password: `admin123`

⚠️ **Important**: Change these credentials in production!

## 📁 Project Structure

```
bookcenter/
├── app/                      # Next.js App Router
│   ├── (customer pages)
│   │   ├── page.tsx         # Home page
│   │   ├── products/        # Product listing & details
│   │   ├── cart/            # Shopping cart
│   │   ├── checkout/        # Checkout page
│   │   └── order-success/   # Order confirmation
│   ├── admin/               # Admin dashboard
│   │   ├── login/           # Admin login
│   │   ├── dashboard/       # Admin overview
│   │   ├── products/        # Product management
│   │   ├── categories/      # Category management
│   │   └── orders/          # Order management
│   └── api/                 # API routes
│       ├── products/        # Product APIs
│       ├── orders/          # Order APIs
│       └── admin/           # Admin APIs
├── components/              # Reusable components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ProductCard.tsx
├── lib/                     # Utilities
│   ├── db.ts               # Prisma client
│   ├── auth.ts             # JWT authentication
│   ├── store.ts            # Zustand cart store
│   └── utils.ts            # Helper functions
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Database seeder
└── public/                 # Static assets
```

## 🗄️ Database Schema

### Tables:
- **Admin**: Admin users with hashed passwords
- **Category**: Product categories
- **Product**: Product catalog with pricing and stock
- **Order**: Customer orders
- **OrderItem**: Line items for each order

## 🎨 Key Features Explained

### Shopping Cart
- Client-side cart using Zustand
- Persists across page refreshes
- Real-time stock validation
- Automatic quantity limits

### Admin Dashboard
- Protected routes with JWT authentication
- Real-time statistics
- CRUD operations for products and categories
- Order status management

### Checkout Process
1. Customer adds products to cart
2. Proceeds to checkout (no login required)
3. Fills delivery information
4. Places order
5. Stock automatically decrements
6. Order confirmation with tracking ID

## 🔐 Security Features

- JWT-based admin authentication
- HttpOnly cookies for token storage
- Password hashing with bcrypt
- Protected API routes
- SQL injection prevention (Prisma)

## 📱 Responsive Design

The website is fully responsive and works on:
- 📱 Mobile devices
- 💻 Tablets
- 🖥️ Desktop computers

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Environment Variables for Production

Make sure to set:
- `DATABASE_URL`: Your production database
- `JWT_SECRET`: Strong secret key
- `NEXT_PUBLIC_APP_URL`: Your domain URL

## 🧪 Development Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Open Prisma Studio (Database GUI)
npx prisma studio

# Create new migration
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset
```

## 🎯 API Endpoints

### Public APIs
- `GET /api/products/[id]` - Get product details

### Admin APIs (Authenticated)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/products` - List all products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product
- `GET /api/admin/categories` - List categories
- `POST /api/admin/categories` - Create category
- `GET /api/admin/orders` - List orders
- `PATCH /api/admin/orders/[id]` - Update order status

### Customer APIs
- `POST /api/orders` - Place new order

## 🎨 Customization

### Adding New Categories
1. Login to admin panel
2. Go to Categories
3. Click "Add Category"
4. Fill in details

### Adding Products
1. **Individual Product:**
   - Login to admin panel
   - Go to Products
   - Click "Add Product"
   - Fill in details and select category
   - Add image URL (use external image hosting)

2. **Bulk Import via CSV:**
   - Go to "Import CSV" in admin panel
   - Download template
   - Fill your product data in CSV format
   - Upload and import
   - See [CSV_IMPORT_GUIDE.md](CSV_IMPORT_GUIDE.md) for details

### Changing Colors
Edit `tailwind.config.ts` to customize the color scheme.

## 📝 To-Do / Future Enhancements

- [ ] Image upload to cloud storage (AWS S3, Cloudinary)
- [ ] Customer accounts and order history
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Advanced search with filters
- [ ] Wishlist functionality
- [ ] Discount codes and promotions

## 🐛 Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check DATABASE_URL in `.env`
- Ensure database exists

### Admin Login Issues
- Make sure you've run the seed script
- Verify JWT_SECRET is set
- Check browser console for errors

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Delete `node_modules` and reinstall
- Ensure all dependencies are installed

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Created with ❤️ for educational purposes.

---

**Happy Coding! 🚀**
