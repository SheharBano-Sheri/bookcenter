# 📖 Developer Guide - Book Center

## Project Architecture

### Tech Stack
- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Database:** PostgreSQL + Prisma ORM
- **Styling:** Tailwind CSS
- **State:** Zustand (cart)
- **Auth:** JWT (admin only)
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

## Database Schema

### Admin
```typescript
- id: String (CUID)
- email: String (unique)
- password: String (hashed with bcrypt)
- name: String
- createdAt: DateTime
```

### Category
```typescript
- id: String (CUID)
- name: String (unique)
- description: String (optional)
- products: Product[]
```

### Product
```typescript
- id: String (CUID)
- name: String
- description: String
- price: Float
- image: String (optional URL)
- stock: Int
- categoryId: String
- category: Category
- orderItems: OrderItem[]
```

### Order
```typescript
- id: String (CUID)
- customerName: String
- customerPhone: String
- customerAddress: String
- totalAmount: Float
- status: String (pending, processing, shipped, delivered, cancelled)
- items: OrderItem[]
- createdAt: DateTime
```

### OrderItem
```typescript
- id: String (CUID)
- quantity: Int
- price: Float
- orderId: String
- productId: String
```

## API Routes

### Public Routes
- `GET /api/products/[id]` - Get single product

### Order Routes
- `POST /api/orders` - Create new order
  - Body: { customerName, customerPhone, customerAddress, items[], totalAmount }
  - Validates stock availability
  - Decrements product stock
  - Returns created order

### Admin Routes (JWT Protected)

**Authentication**
- `POST /api/admin/login` - Admin login
  - Body: { email, password }
  - Returns JWT in httpOnly cookie
- `POST /api/admin/logout` - Admin logout

**Products**
- `GET /api/admin/products` - List all products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product

**Categories**
- `GET /api/admin/categories` - List categories
- `POST /api/admin/categories` - Create category

**Orders**
- `GET /api/admin/orders` - List all orders
- `PATCH /api/admin/orders/[id]` - Update order status

## Authentication Flow

### Admin Authentication
1. Admin enters credentials at `/admin/login`
2. API validates credentials (`/api/admin/login`)
3. If valid, generates JWT token
4. Token stored in httpOnly cookie
5. Subsequent requests include cookie
6. API routes verify token with `requireAdmin()`

### Token Verification
```typescript
// lib/auth.ts
export async function requireAdmin(): Promise<JWTPayload> {
  const admin = await getAdminFromToken();
  if (!admin) throw new Error('Unauthorized');
  return admin;
}
```

## State Management

### Shopping Cart (Zustand)
Located in `lib/store.ts`

**State:**
- `items: CartItem[]` - Array of cart items
- Persisted in localStorage

**Actions:**
- `addItem(item)` - Add product to cart
- `removeItem(id)` - Remove from cart
- `updateQuantity(id, quantity)` - Change quantity
- `clearCart()` - Empty cart
- `getTotalItems()` - Count items
- `getTotalPrice()` - Calculate total

## Component Structure

### Customer Components
- `Header.tsx` - Navigation with cart indicator
- `Footer.tsx` - Site footer with links
- `ProductCard.tsx` - Product display card

### Page Components
All pages are in the `app/` directory using Next.js App Router

**Customer Pages:**
- `/` - Home with featured products
- `/products` - Product listing with filters
- `/products/[id]` - Product detail
- `/cart` - Shopping cart
- `/checkout` - Checkout form
- `/order-success` - Order confirmation

**Admin Pages:**
- `/admin/login` - Admin authentication
- `/admin/dashboard` - Statistics overview
- `/admin/products` - Product CRUD
- `/admin/categories` - Category management
- `/admin/orders` - Order management

## Utility Functions

### lib/utils.ts
- `formatPrice(price: number)` - Format currency
- `formatDate(date: Date)` - Format date display

### lib/db.ts
- Prisma Client singleton pattern
- Prevents multiple instances in dev mode

## Development Workflow

### Adding a New Product Category

1. **Admin UI:**
   - Login to admin panel
   - Navigate to Categories
   - Click "Add Category"
   - Enter name and description

2. **Programmatically:**
```typescript
await prisma.category.create({
  data: {
    name: "New Category",
    description: "Description"
  }
});
```

### Adding a New Product

1. **Admin UI:**
   - Login to admin panel
   - Navigate to Products
   - Click "Add Product"
   - Fill form and select category

2. **Via API:**
```bash
POST /api/admin/products
{
  "name": "Product Name",
  "description": "Description",
  "price": 29.99,
  "stock": 100,
  "categoryId": "category-id",
  "image": "https://example.com/image.jpg"
}
```

### Customizing Styles

**Colors:**
Edit `tailwind.config.ts` to change theme colors

**Components:**
All components use Tailwind utility classes. Modify classes in component files.

**Global Styles:**
Edit `app/globals.css` for global CSS changes

## Database Management

### View Database (Prisma Studio)
```bash
npx prisma studio
```
Opens GUI at http://localhost:5555

### Create Migration
```bash
npx prisma migrate dev --name migration_name
```

### Reset Database
```bash
npx prisma migrate reset
```
⚠️ This deletes all data!

### Seed Database
```bash
npx prisma db seed
```

## Environment Variables

Required variables in `.env`:

```env
DATABASE_URL="postgresql://..."  # PostgreSQL connection
JWT_SECRET="secret-key"          # For admin JWT tokens
NEXT_PUBLIC_APP_URL="..."        # App base URL
```

## Security Considerations

### Implemented:
✅ JWT authentication for admin
✅ HttpOnly cookies (no XSS)
✅ Password hashing (bcrypt)
✅ Prisma ORM (SQL injection protection)
✅ Input validation
✅ Protected API routes

### For Production:
⚠️ Change default admin password
⚠️ Use strong JWT_SECRET
⚠️ Enable HTTPS
⚠️ Add rate limiting
⚠️ Implement CSRF protection
⚠️ Add input sanitization
⚠️ Set up proper CORS

## Testing

### Manual Testing Checklist

**Customer Flow:**
- [ ] Browse products on home page
- [ ] Filter products by category
- [ ] Search products
- [ ] View product details
- [ ] Add to cart
- [ ] Update cart quantities
- [ ] Remove from cart
- [ ] Complete checkout
- [ ] Receive order confirmation

**Admin Flow:**
- [ ] Login to admin panel
- [ ] View dashboard statistics
- [ ] Create new category
- [ ] Create new product
- [ ] Edit product
- [ ] Delete product
- [ ] View orders
- [ ] Update order status
- [ ] Logout

## Performance Optimization

### Implemented:
- Server-side rendering for SEO
- Image optimization with Next.js Image
- Code splitting (automatic)
- Client-side state persistence

### Future Improvements:
- Add Redis caching
- Implement image CDN
- Add pagination for products
- Optimize database queries
- Add service worker for offline

## Deployment Checklist

- [ ] Set production environment variables
- [ ] Configure production database
- [ ] Build project (`npm run build`)
- [ ] Test production build locally
- [ ] Set up CDN for images
- [ ] Configure domain and SSL
- [ ] Set up monitoring/logging
- [ ] Create database backups
- [ ] Document deployment process

## Common Issues & Solutions

### "Can't reach database server"
**Solution:** Ensure PostgreSQL is running and DATABASE_URL is correct

### "Unauthorized" on admin routes
**Solution:** Login again, token may have expired

### Products not showing
**Solution:** Run `npx prisma db seed` to add sample data

### Build fails
**Solution:** Run `npm install` and delete `.next` folder

## Extending the Project

### Add Email Notifications
1. Install nodemailer or SendGrid
2. Create email service in `lib/email.ts`
3. Send emails on order creation
4. Send admin notifications

### Add Payment Integration
1. Install Stripe/PayPal SDK
2. Create payment API routes
3. Add payment form to checkout
4. Handle webhooks for confirmation

### Add Product Reviews
1. Create Review model in Prisma
2. Add review API endpoints
3. Create review UI components
4. Display average ratings

### Add Customer Accounts
1. Create User model
2. Implement customer authentication
3. Add order history page
4. Add profile management

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)

---

**Need Help?** Check the README.md or QUICKSTART.md for additional guidance.
