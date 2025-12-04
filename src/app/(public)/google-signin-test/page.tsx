
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import jwt_decode from 'jwt-decode';

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}

export default function GoogleSignInTestPage() {
  const [user, setUser] = useState<GoogleUser | null>(null);

  function handleCallbackResponse(response: any) {
    console.log("Encoded JWT ID token: " + response.credential);
    const userObject: GoogleUser = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    // Hide the sign-in button after successful login
    const signInButton = document.getElementById('google-signin-button');
    if (signInButton) {
      signInButton.hidden = true;
    }
  }

  function handleSignOut() {
    setUser(null);
    const signInButton = document.getElementById('google-signin-button');
    if (signInButton) {
      signInButton.hidden = false;
    }
  }

  useEffect(() => {
    // This is to ensure the global 'google' object is available
    if (typeof window !== 'undefined' && (window as any).google) {
      (window as any).google.accounts.id.initialize({
        client_id: '715065461048-bkljrne8vnsgg2i6fbcrg87bmdf0n0um.apps.googleusercontent.com',
        callback: handleCallbackResponse,
      });

      (window as any).google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        { theme: 'outline', size: 'large' }
      );

      // Optional: a one-tap prompt for returning users
      // (window as any).google.accounts.id.prompt();
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-24">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Direct Google Sign-In Test</CardTitle>
          <CardDescription>
            This page demonstrates Google Sign-In without using Firebase. This is isolated from the main alumni portal.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-6">
          
          <div id="google-signin-button"></div>

          {user && (
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Sign-In Successful!</h2>
              <Avatar className="h-24 w-24 mx-auto border-2 border-primary">
                <AvatarImage src={user.picture} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-lg">{user.name}</p>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              <Button onClick={handleSignOut}>Sign Out</Button>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
