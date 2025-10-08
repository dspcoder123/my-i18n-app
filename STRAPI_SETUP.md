# Strapi Integration Setup

This guide will help you set up the Strapi integration for your blog page.

## Prerequisites

- Your Strapi CMS is running and accessible
- You have created a content type in Strapi with fields: `Name` and `Mobile`

## Setup Steps

### 1. Configure Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_api_token_here
```

Replace:
- `STRAPI_URL` with your actual Strapi server URL
- `STRAPI_API_TOKEN` with your actual Strapi API token

### 2. Strapi Content Type Setup

In your Strapi admin panel:

1. Go to **Content-Type Builder**
2. Create a new Collection Type called `posts`
3. Add the following fields:
   - **Name**: Text field (Short text)
   - **Mobile**: Text field (Short text)
   - **title**: Text field (Short text) - optional
   - **content**: Rich text field - optional
   - **slug**: Text field (Short text) - optional
4. Save the content type

### 3. Configure Permissions

1. Go to **Settings** > **Roles**
2. Select **Public** role
3. Under **Posts**:
   - Enable **find** permission
4. Save the changes

### 4. Generate API Token (Optional but Recommended)

1. Go to **Settings** > **API Tokens**
2. Click **Create new API Token**
3. Name it (e.g., "Next.js Blog Integration")
4. Select **Read-only** token type
5. Copy the generated token and add it to your `.env.local` file

## Usage

1. Start your Next.js development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/blog` to see the Strapi integration in action

3. The blog page will display all posts from your Strapi CMS with their Name, Mobile, title, and content fields

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your Strapi server allows requests from your Next.js app
2. **401 Unauthorized**: Check your API token and permissions
3. **404 Not Found**: Verify your content type name matches what's in the API route
4. **Empty Data**: Ensure you have published entries in your Strapi content type

### Customizing the Content Type Name

If your Strapi content type is not named `posts`, update the API route:

1. Open `app/api/posts/route.ts`
2. Change `'posts'` to your actual content type name
3. Update the route file name and folder structure accordingly

## Features

- ✅ Fetches data from Strapi CMS with `populate=*` parameter
- ✅ Displays Name, Mobile, title, content, and slug fields
- ✅ Responsive design with Tailwind CSS
- ✅ Loading states and error handling
- ✅ TypeScript support
- ✅ Clean, modern UI
- ✅ Flexible field display (shows available fields dynamically)

## Next Steps

You can extend this integration by:
- Adding more fields to display
- Implementing search and filtering
- Adding pagination
- Creating forms to submit data to Strapi
- Adding image support
