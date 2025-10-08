// Replace with your Strapi URL
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || '';

// Simple fetch-based Strapi client
export const strapiClient = {
  async find(contentType: string) {
    const response = await fetch(`${STRAPI_URL}/api/${contentType}`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${contentType}: ${response.statusText}`);
    }
    
    return response.json();
  }
};

// Type definitions for your Strapi data
export interface StrapiPost {
  id: number;
  attributes: {
    Name?: string;
    Mobile?: string;
    title?: string;
    content?: string;
    slug?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    // Add any other fields you have in your posts content type
    [key: string]: any;
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
