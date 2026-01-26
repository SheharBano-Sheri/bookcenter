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
        slug: 'books',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Stationery' },
      update: {},
      create: {
        name: 'Stationery',
        description: 'Pens, pencils, notebooks, and office supplies',
        slug: 'stationery',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Bags' },
      update: {},
      create: {
        name: 'Bags',
        description: 'School bags, backpacks, and carrying cases',
        slug: 'bags',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Accessories' },
      update: {},
      create: {
        name: 'Accessories',
        description: 'Educational accessories and supplies',
        slug: 'accessories',
      },
    }),
  ]);
  console.log('✅ Categories created:', categories.length);

  // Create sample products
  const products = [
    {
      title: 'Math Textbook Grade 10',
      isbn: '978-0123456789',
      sku: 'BOOK-MATH-10',
      description: 'Comprehensive mathematics textbook for 10th grade students covering algebra, geometry, and calculus basics.',
      price: 29.99,
      originalPrice: 34.99,
      stock: 50,
      available: true,
      categoryId: categories[0].id,
      mainImageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop',
      productType: 'Textbooks',
      vendor: 'McGraw-Hill Education',
      tags: 'math,textbook,grade-10,algebra',
      weight: '800g',
      weightGrams: 800,
      variantTitle: 'Paperback',
    },
    {
      title: 'Science Encyclopedia',
      isbn: '978-0987654321',
      sku: 'BOOK-SCI-ENC',
      description: 'Complete science reference book with colorful illustrations and detailed explanations.',
      price: 45.00,
      originalPrice: 55.00,
      stock: 30,
      available: true,
      categoryId: categories[0].id,
      mainImageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&h=500&fit=crop',
      productType: 'Reference Books',
      vendor: 'Dorling Kindersley',
      tags: 'science,encyclopedia,reference,illustrated',
      weight: '1.5kg',
      weightGrams: 1500,
      variantTitle: 'Hardcover',
    },
    {
      title: 'English Literature Collection',
      isbn: '978-1122334455',
      sku: 'BOOK-ENG-LIT',
      description: 'Classic literature anthology featuring works from renowned authors.',
      price: 35.50,
      stock: 40,
      available: true,
      categoryId: categories[0].id,
      mainImageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop',
      productType: 'Literature',
      vendor: 'Penguin Classics',
      tags: 'literature,classics,anthology,reading',
      weight: '600g',
      weightGrams: 600,
      variantTitle: 'Paperback',
    },
    {
      title: 'Pilot G2 Gel Pens (Pack of 12)',
      sku: 'STAT-PEN-G2-12',
      description: 'Smooth writing gel pens in assorted colors, perfect for students and professionals.',
      price: 12.99,
      originalPrice: 15.99,
      stock: 100,
      available: true,
      categoryId: categories[1].id,
      mainImageUrl: 'https://images.unsplash.com/photo-1586281009004-2d0c2c3f8e1f?w=500&h=500&fit=crop',
      productType: 'Writing Instruments',
      vendor: 'Pilot',
      tags: 'pens,stationery,gel-pens,writing',
      weight: '120g',
      weightGrams: 120,
      variantTitle: '12-Pack Assorted',
    },
    {
      title: 'A4 Spiral Notebooks (Set of 5)',
      sku: 'STAT-NB-A4-5',
      description: 'High-quality ruled notebooks with durable spiral binding, 200 pages each.',
      price: 18.99,
      stock: 75,
      available: true,
      categoryId: categories[1].id,
      mainImageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=500&h=500&fit=crop',
      productType: 'Notebooks',
      vendor: 'Oxford',
      tags: 'notebooks,stationery,spiral,ruled',
      weight: '500g',
      weightGrams: 500,
      variantTitle: '5-Pack Bundle',
    },
    {
      title: 'Art Supplies Kit',
      sku: 'STAT-ART-KIT-01',
      description: 'Complete art kit including colored pencils, markers, watercolors, and brushes.',
      price: 39.99,
      originalPrice: 49.99,
      stock: 25,
      available: true,
      categoryId: categories[1].id,
      mainImageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=500&fit=crop',
      productType: 'Art Supplies',
      vendor: 'Crayola',
      tags: 'art,supplies,drawing,painting,kids',
      weight: '800g',
      weightGrams: 800,
      variantTitle: 'Deluxe Set',
    },
    {
      title: 'Premium School Backpack',
      sku: 'BAG-SCH-PREM-01',
      description: 'Durable backpack with multiple compartments, laptop sleeve, and ergonomic design.',
      price: 54.99,
      originalPrice: 69.99,
      stock: 35,
      available: true,
      categoryId: categories[2].id,
      mainImageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
      productType: 'School Bags',
      vendor: 'Nike',
      tags: 'backpack,school,laptop,bags,durable',
      weight: '1.2kg',
      weightGrams: 1200,
      variantTitle: 'Large - Black',
    },
    {
      title: 'Lunch Box with Insulated Bag',
      sku: 'BAG-LUNCH-INS-01',
      description: 'BPA-free lunch box with thermal insulation to keep food fresh.',
      price: 22.99,
      stock: 60,
      available: true,
      categoryId: categories[2].id,
      mainImageUrl: 'https://images.unsplash.com/photo-1625736946883-17c1e2ed68d8?w=500&h=500&fit=crop',
      productType: 'Lunch Bags',
      vendor: 'Thermos',
      tags: 'lunch-box,insulated,school,food-storage',
      weight: '300g',
      weightGrams: 300,
      variantTitle: 'Medium',
    },
    {
      title: 'Scientific Calculator',
      sku: 'ACC-CALC-SCI-01',
      description: 'Advanced scientific calculator with 240+ functions for mathematics and science.',
      price: 28.50,
      stock: 45,
      available: true,
      categoryId: categories[3].id,
      mainImageUrl: 'https://images.unsplash.com/photo-1611867967695-f46a33e91fb3?w=500&h=500&fit=crop',
      productType: 'Calculators',
      vendor: 'Casio',
      tags: 'calculator,scientific,math,school',
      weight: '150g',
      weightGrams: 150,
      variantTitle: 'FX-991EX',
    },
    {
      title: 'Desk Organizer Set',
      sku: 'ACC-DESK-ORG-01',
      description: 'Complete desk organization system with pen holder, paper tray, and accessories.',
      price: 24.99,
      stock: 40,
      available: true,
      categoryId: categories[3].id,
      mainImageUrl: 'https://images.unsplash.com/photo-1584996541613-fc8c7e2e0000?w=500&h=500&fit=crop',
      productType: 'Desk Accessories',
      vendor: 'Staples',
      tags: 'organizer,desk,office,storage',
      weight: '600g',
      weightGrams: 600,
      variantTitle: '5-Piece Set',
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
