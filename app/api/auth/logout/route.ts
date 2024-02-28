// File: pages/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';


export function POST() {
    const cookieStore = cookies();
    cookieStore.set('authToken', '', { maxAge: -1 });
    return new NextResponse('OK');
}