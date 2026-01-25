import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const body = await request.json();
    const { products } = body;

    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { error: 'Invalid data format. Expected array of products.' },
        { status: 400 }
      );
    }

    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[],
    };

    // Process each product
    for (let i = 0; i < products.length; i++) {
      const product = products[i];

      try {
        // Validate required fields
        if (!product.name || !product.price || !product.categoryName) {
          results.failed++;
          results.errors.push(`Row ${i + 1}: Missing required fields (name, price, or category)`);
          continue;
        }

        // Find or create category
        let category = await prisma.category.findUnique({
          where: { name: product.categoryName.trim() },
        });

        if (!category) {
          category = await prisma.category.create({
            data: {
              name: product.categoryName.trim(),
              description: product.categoryDescription || null,
            },
          });
        }

        // Create product
        await prisma.product.create({
          data: {
            name: product.name.trim(),
            description: product.description || '',
            price: parseFloat(product.price),
            stock: parseInt(product.stock || '0'),
            image: product.image || null,
            categoryId: category.id,
          },
        });

        results.success++;
      } catch (error: any) {
        results.failed++;
        results.errors.push(`Row ${i + 1}: ${error.message}`);
      }
    }

    return NextResponse.json({
      message: 'Import completed',
      results,
    });
  } catch (error) {
    if ((error as Error).message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('CSV import error:', error);
    return NextResponse.json(
      { error: 'Failed to import products' },
      { status: 500 }
    );
  }
}
