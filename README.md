# Better Auth + Supabase Integration Test App

A Next.js 15 web application demonstrating the integration of [Better Auth](https://better-auth.com) with a Supabase PostgreSQL database. This project showcases modern authentication patterns with Google OAuth, email/password authentication, and custom user roles.

## Features

- 🔐 **Authentication**: Email/password and Google OAuth
- 👤 **User Management**: Custom user roles (default: "student")
- 🗄️ **Database**: Supabase PostgreSQL with Drizzle ORM
- 🎨 **UI**: Tailwind CSS with shadcn/ui components
- 🔒 **Session Management**: Server-side session handling

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: Better Auth
- **Database**: Supabase PostgreSQL
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI)
- **TypeScript**: Full type safety

## Project Structure

```
src/
├── app/
│   ├── (auth)/sign-in/         # Sign-in page
│   ├── api/auth/[...all]/      # Better Auth API routes
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── sign-in.tsx             # Sign-in component
│   └── sign-out.tsx            # Sign-out component
├── drizzle/
│   ├── index.tsx               # Database connection
│   └── schema.tsx              # Database schema
└── lib/
    ├── auth.ts                 # Better Auth configuration
    ├── auth-client.ts          # Client-side auth
    └── utils.ts                # Utility functions
```

## Prerequisites

- Node.js 18+
- A Supabase project with PostgreSQL database
- Google OAuth credentials (for social login)

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd supabase-betterauth
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Database Setup

The app uses the following database schema (defined in [`src/drizzle/schema.tsx`](src/drizzle/schema.tsx)):

- **user**: User profiles with custom roles
- **session**: User sessions
- **account**: OAuth account linking
- **verification**: Email verification tokens

Run your database migrations using Drizzle Kit or create the tables manually.

### 5. Configure Google OAuth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins
6. Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Authentication Flow

### Client-Side Authentication

The app uses [`createAuthClient`](src/lib/auth-client.ts) from Better Auth React for client-side operations:

```typescript
import { signIn, signUp, signOut, useSession } from "@/lib/auth-client";
```

### Server-Side Authentication

Server components use the [`auth`](src/lib/auth.ts) instance for session management:

```typescript
const session = await auth.api.getSession({
  headers: await headers(),
});
```

### Google OAuth Flow

The [`SignIn`](src/components/sign-in.tsx) component handles Google authentication:

```typescript
await signIn.social({
  provider: "google",
  callbackURL: "/",
});
```

## Key Configuration

### Better Auth Setup

The authentication is configured in [`src/lib/auth.ts`](src/lib/auth.ts) with:

- Drizzle adapter for Supabase PostgreSQL
- Email/password authentication
- Google OAuth provider
- Custom user roles
- Next.js cookie handling

### Database Connection

Database connection is established in [`src/drizzle/index.tsx`](src/drizzle/index.tsx) using the postgres driver.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## UI Components

The app uses shadcn/ui components configured in [`components.json`](components.json):

- **Style**: New York variant
- **Base Color**: Zinc
- **CSS Variables**: Enabled
- **Icons**: Lucide React

## Deployment

1. **Build the application**:

   ```bash
   npm run build
   ```

2. **Set up environment variables** in your deployment platform

3. **Deploy** to your preferred platform (Vercel, Railway, etc.)

## Environment Variables

| Variable               | Description                                |
| ---------------------- | ------------------------------------------ |
| `DATABASE_URL`         | PostgreSQL connection string from Supabase |
| `GOOGLE_CLIENT_ID`     | Google OAuth client ID                     |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret                 |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for testing and demonstration purposes.

## Resources

- [Better Auth Documentation](https://better-auth.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [shadcn/ui Documentation](https://ui.shadcn.com)
