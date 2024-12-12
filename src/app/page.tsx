import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth, signInWithGoogle } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await auth() 

  if(session) { 
    return redirect('/dashboard')
  }

  async function signInAcetion() {
    'use server'
    await signInWithGoogle()
  }

  return (
    <div className="max-w-[1280px] mx-auto p-2 h-screen flex items-center justify-center">
      <Card className="w-[350px] min-h-[200px] flex flex-col items-center justify-center">
        <CardHeader className="w-full">
          <CardTitle>Login Social</CardTitle>
          <CardDescription>Conecte-se com sua conta do google</CardDescription>
        </CardHeader>

        <CardContent className="w-full">
          <form action={signInAcetion}>
            <Button className="w-full">Logar</Button>
          </form>
        </CardContent>

      </Card>
    </div>
  );
}
