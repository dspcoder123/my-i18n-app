import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
    const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || '';
    
    console.log('Testing Strapi connection...');
    console.log('Strapi URL:', STRAPI_URL);
    console.log('Has token:', !!STRAPI_TOKEN);
    
    // Test basic connection with proper URL construction
    const url = new URL('/api/posts', STRAPI_URL);
    url.searchParams.append('populate', '*');
    
    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    
    const status = response.status;
    const headers = Object.fromEntries(response.headers.entries());
    
    let data = null;
    try {
      data = await response.json();
    } catch (e) {
      data = await response.text();
    }
    
    return NextResponse.json({
      success: response.ok,
      status,
      headers,
      data,
      config: {
        url: STRAPI_URL,
        hasToken: !!STRAPI_TOKEN,
        endpoint: '/api/posts'
      }
    });
    
  } catch (error) {
    console.error('Strapi test error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        config: {
          url: process.env.STRAPI_URL || 'http://localhost:1337',
          hasToken: !!process.env.STRAPI_API_TOKEN,
          endpoint: '/api/posts'
        }
      },
      { status: 500 }
    );
  }
}
