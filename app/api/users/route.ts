import { NextResponse } from 'next/server';
import { strapiClient } from '@/lib/strapi';

export async function GET() {
  try {
    // Fetch posts from Strapi with populate=* to get all related data
    const response = await strapiClient.find('posts?populate=*');
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching posts from Strapi:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
