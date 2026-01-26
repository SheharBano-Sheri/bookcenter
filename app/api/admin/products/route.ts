import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  try {
    await requireAdmin();

    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const body = await request.json();
    const { 
      title, 
      description, 
      price, 
      mainImageUrl, 
      stock, 
      categoryId,
      isbn,
      sku,
      originalPrice,
      available,
      productType,
      vendor,
      tags,
      weight,
      variantTitle
    } = body;

    if (!title || !price) {
      return NextResponse.json(
        { error: 'Missing required fields (title, price)' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        title,
        description: description || null,
        price: parseFloat(price),
        mainImageUrl: mainImageUrl || null,
        stock: parseInt(stock) || 0,
        categoryId: categoryId || null,
        isbn: isbn || null,
        sku: sku || null,
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        available: available !== undefined ? available : true,
        productType: productType || null,
        vendor: vendor || null,
        tags: tags || null,
        weight: weight || null,
        variantTitle: variantTitle || 'Default Title',
      },
      include: { category: true },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    if ((error as Error).message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
