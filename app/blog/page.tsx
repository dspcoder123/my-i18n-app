'use client';

import { useState, useEffect } from 'react';
import '../custom.css';

interface Post {
  id: number;
  attributes?: {
    Name?: string;
    Mobile?: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
    [key: string]: any;
  };
  // Handle direct field access (if attributes is not present)
  Name?: string;
  Mobile?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

interface StrapiResponse {
  data: Post[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to safely get field values
  const getFieldValue = (post: Post, field: string): string | undefined => {
    return post.attributes?.[field] || post[field as keyof Post] as string;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/posts');
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || `HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data: StrapiResponse = await response.json();
        console.log('Raw Strapi data:', data);
        setPosts(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>📊 Blog Posts Dashboard</h1>
          <p className="subtitle">Strapi CMS Data Management</p>
          <p>View and manage all your blog posts from Strapi CMS</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="features" style={{padding: '60px 0'}}>
        <div className="container">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">No posts found</h2>
              <p className="text-gray-600 mb-4">No posts are available from your Strapi CMS.</p>
              <button 
                onClick={() => window.location.reload()} 
                className="btn btn-primary"
              >
                Refresh Data
              </button>
            </div>
          ) : (
            <div className="posts-container">
              {/* Stats Cards */}
              <div className="stats-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px'}}>
                <div className="stat-card" style={{background: 'white', padding: '30px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}}>
                  <div style={{fontSize: '2.5rem', marginBottom: '10px'}}>📊</div>
                  <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#667eea'}}>{posts.length}</div>
                  <div style={{color: '#666'}}>Total Posts</div>
                </div>
                <div className="stat-card" style={{background: 'white', padding: '30px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}}>
                  <div style={{fontSize: '2.5rem', marginBottom: '10px'}}>✅</div>
                  <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#28a745'}}>{posts.length}</div>
                  <div style={{color: '#666'}}>Active Posts</div>
                </div>
                <div className="stat-card" style={{background: 'white', padding: '30px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}}>
                  <div style={{fontSize: '2.5rem', marginBottom: '10px'}}>🔄</div>
                  <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#ffc107'}}>Live</div>
                  <div style={{color: '#666'}}>Status</div>
                </div>
              </div>

              {/* Beautiful Table */}
              <div className="table-container" style={{background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}}>
                <div className="table-header" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '30px'}}>
                  <h2 style={{margin: '0', fontSize: '1.8rem', fontWeight: 'bold'}}>📋 Posts Data Table</h2>
                  <p style={{margin: '10px 0 0 0', opacity: '0.9'}}>Showing {posts.length} post{posts.length !== 1 ? 's' : ''} from Strapi CMS</p>
                </div>
                
                <div className="table-wrapper" style={{overflowX: 'auto'}}>
                  <table className="data-table" style={{width: '100%', borderCollapse: 'collapse'}}>
                    <thead>
                      <tr style={{background: '#f8f9fa'}}>
                        <th style={{padding: '20px', textAlign: 'left', fontWeight: '600', color: '#333', borderBottom: '2px solid #e9ecef'}}>#</th>
                        <th style={{padding: '20px', textAlign: 'left', fontWeight: '600', color: '#333', borderBottom: '2px solid #e9ecef'}}>👤 Name</th>
                        <th style={{padding: '20px', textAlign: 'left', fontWeight: '600', color: '#333', borderBottom: '2px solid #e9ecef'}}>📱 Mobile</th>
                        <th style={{padding: '20px', textAlign: 'left', fontWeight: '600', color: '#333', borderBottom: '2px solid #e9ecef'}}>📅 Created</th>
                        <th style={{padding: '20px', textAlign: 'left', fontWeight: '600', color: '#333', borderBottom: '2px solid #e9ecef'}}>🎯 Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((post, index) => {
                        const name = getFieldValue(post, 'Name');
                        const mobile = getFieldValue(post, 'Mobile');
                        const createdAt = getFieldValue(post, 'createdAt');
                        
                        return (
                          <tr key={post.id} className="table-row" style={{
                            borderBottom: '1px solid #f1f3f4',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f8f9ff';
                            e.currentTarget.style.transform = 'translateX(5px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'white';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}>
                            <td style={{padding: '20px', fontWeight: 'bold', color: '#667eea', fontSize: '1.1rem'}}>
                              #{post.id}
                            </td>
                            <td style={{padding: '20px'}}>
                              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                                <div style={{
                                  width: '45px',
                                  height: '45px',
                                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'white',
                                  fontWeight: 'bold',
                                  fontSize: '1.2rem',
                                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                                }}>
                                  {name ? name.charAt(0).toUpperCase() : 'P'}
                                </div>
                                <div>
                                  <div style={{fontWeight: '600', color: '#333', fontSize: '1rem'}}>
                                    {name || 'No Name'}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td style={{padding: '20px', fontSize: '1rem', color: '#333'}}>
                              <span style={{
                                background: '#e8f5e8',
                                color: '#28a745',
                                padding: '6px 12px',
                                borderRadius: '20px',
                                fontSize: '0.9rem',
                                fontWeight: '500'
                              }}>
                                📱 {mobile || 'N/A'}
                              </span>
                            </td>
                            <td style={{padding: '20px', fontSize: '0.95rem', color: '#666'}}>
                              {createdAt ? new Date(createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              }) : 'N/A'}
                            </td>
                            <td style={{padding: '20px'}}>
                              <span style={{
                                background: '#d4edda',
                                color: '#155724',
                                padding: '8px 16px',
                                borderRadius: '25px',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                border: '1px solid #c3e6cb'
                              }}>
                                <span style={{
                                  width: '8px',
                                  height: '8px',
                                  background: '#28a745',
                                  borderRadius: '50%',
                                  animation: 'pulse 2s infinite'
                                }}></span>
                                Active
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="container">
          <p>📊 Blog Dashboard powered by Strapi CMS & Next.js</p>
        </div>
      </footer>
    </div>
  );
}
