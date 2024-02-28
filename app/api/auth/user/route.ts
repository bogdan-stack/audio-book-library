
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function GET() {
    const cookieStore = cookies();
    const token = cookieStore.get('authToken');
    if (!token) {
        return NextResponse.json(
            { message: 'Unauthorized' },
            { status: 401 }
        );
    }
    
    const { value } = token;
    const secret = process.env.JWT_SECRET || '';

    try {
        const decoded = verify(value, secret);

    return new Response(JSON.stringify(decoded), {
        status: 200,
    });
    } catch (e) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    };
  }