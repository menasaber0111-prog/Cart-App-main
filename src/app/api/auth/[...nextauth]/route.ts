// src/app/api/auth/[...nextauth]/route.ts
import { authOptions } from '@/lib/auth';
import NextAuth from 'next-auth';

// Initialize NextAuth with our configuration
const handler = NextAuth(authOptions);

// Export for both GET and POST requests
export { handler as GET, handler as POST };