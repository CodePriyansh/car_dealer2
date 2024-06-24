import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  let cookie = request.cookies.get('token')
  console.log(cookie,"qwertyuiopoigfdfghjkl;ufdfy") // => { name: 'nextjs', value: 'fast', Path: '/' }
  if(!cookie){
    return NextResponse.redirect(new URL('/login', request.url))
  }
 
  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next()
  return response
}


export const config = {
  matcher: ['/', "/addcar"],
};