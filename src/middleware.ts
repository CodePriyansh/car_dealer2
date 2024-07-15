import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {

  let token = request.cookies.get('token')
  console.log(token,"qwertyuiopoigfdfghjkl;ufdfy") 
  if(!token){
    return NextResponse.redirect(new URL('/login', request.url))
  }
 
  const response = NextResponse.next()

  // response.cookies.set('token', token.value, {
  //   // httpOnly: true,
  //   secure: process.env.NODE_ENV === 'production',
  //   sameSite: 'strict',
  //   maxAge: 30 * 24 * 60 * 60 // 30 days in seconds
  // })
  return response
}


export const config = {
  matcher: ['/', "/addcar"],
};