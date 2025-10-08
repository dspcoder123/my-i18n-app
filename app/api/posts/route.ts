import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
    const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || '';
    
    console.log('Fetching from Strapi URL:', STRAPI_URL);
    
    // Fetch posts from Strapi with populate=* to get all related data
    const url = new URL('/api/posts', STRAPI_URL);
    url.searchParams.append('populate', '*');
    
    console.log('Constructed URL:', url.toString());
    
    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Strapi response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Strapi error response:', errorText);
      throw new Error(`Strapi API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Strapi data received:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching posts from Strapi:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch posts',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
