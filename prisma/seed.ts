import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@bookcenter.com' },
    update: {},
    create: {
      email: 'admin@bookcenter.com',
      password: hashedPassword,
      name: 'Admin User',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Books' },
      update: {},
      create: {
        name: 'Books',
        description: 'Educational and recreational books for all ages',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Stationery' },
      update: {},
      create: {
        name: 'Stationery',
        description: 'Pens, pencils, notebooks, and office supplies',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Bags' },
      update: {},
      create: {
        name: 'Bags',
        description: 'School bags, backpacks, and carrying cases',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Accessories' },
      update: {},
      create: {
        name: 'Accessories',
        description: 'Educational accessories and supplies',
      },
    }),
  ]);
  console.log('✅ Categories created:', categories.length);

  // Create sample products
  const products = [
    {
      name: 'Math Textbook Grade 10',
      description: 'Comprehensive mathematics textbook for 10th grade students covering algebra, geometry, and calculus basics.',
      price: 29.99,
      stock: 50,
      categoryId: categories[0].id,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop',
    },
    {
      name: 'Science Encyclopedia',
      description: 'Complete science reference book with colorful illustrations and detailed explanations.',
      price: 45.00,
      stock: 30,
      categoryId: categories[0].id,
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&h=500&fit=crop',
    },
    {
      name: 'English Literature Collection',
      description: 'Classic literature anthology featuring works from renowned authors.',
      price: 35.50,
      stock: 40,
      categoryId: categories[0].id,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop',
    },
    {
      name: 'Pilot G2 Gel Pens (Pack of 12)',
      description: 'Smooth writing gel pens in assorted colors, perfect for students and professionals.',
      price: 12.99,
      stock: 100,
      categoryId: categories[1].id,
      image: 'https://images.unsplash.com/photo-1586281009004-2d0c2c3f8e1f?w=500&h=500&fit=crop',
    },
    {
      name: 'A4 Spiral Notebooks (Set of 5)',
      description: 'High-quality ruled notebooks with durable spiral binding, 200 pages each.',
      price: 18.99,
      stock: 75,
      categoryId: categories[1].id,
      image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=500&h=500&fit=crop',
    },
    {
      name: 'Art Supplies Kit',
      description: 'Complete art kit including colored pencils, markers, watercolors, and brushes.',
      price: 39.99,
      stock: 25,
      categoryId: categories[1].id,
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=500&fit=crop',
    },
    {
      name: 'Premium School Backpack',
      description: 'Durable backpack with multiple compartments, laptop sleeve, and ergonomic design.',
      price: 54.99,
      stock: 35,
      categoryId: categories[2].id,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    },
    {
      name: 'Lunch Box with Insulated Bag',
      description: 'BPA-free lunch box with thermal insulation to keep food fresh.',
      price: 22.99,
      stock: 60,
      categoryId: categories[2].id,
      image: 'https://images.unsplash.com/photo-1625736946883-17c1e2ed68d8?w=500&h=500&fit=crop',
    },
    {
      name: 'Scientific Calculator',
      description: 'Advanced scientific calculator with 240+ functions for mathematics and science.',
      price: 28.50,
      stock: 45,
      categoryId: categories[3].id,
      image: 'https://images.unsplash.com/photo-1611867967695-f46a33e91fb3?w=500&h=500&fit=crop',
    },
    {
      name: 'Desk Organizer Set',
      description: 'Complete desk organization system with pen holder, paper tray, and accessories.',
      price: 24.99,
      stock: 40,
      categoryId: categories[3].id,
      image: 'https://images.unsplash.com/photo-1584996541613-fc8c7e2e0000?w=500&h=500&fit=crop',
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }
  console.log('✅ Sample products created:', products.length);

  console.log('🎉 Database seed completed successfully!');
  console.log('\n📝 Admin credentials:');
  console.log('   Email: admin@bookcenter.com');
  console.log('   Password: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
