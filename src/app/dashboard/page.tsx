import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth, signOutWithGoogle } from "@/lib/auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth();

  if(!session) {
      return redirect('/')
  }

  async function signOutAction() {
    "use server";
    await signOutWithGoogle();
  }

  return (
    <div className="max-w-[1280px] mx-auto p-2 h-screen flex items-center justify-center">
      <Card className="w-[350px] flex flex-col">
        <CardHeader>
          <Avatar className="w-14 h-14 mb-4">
            <AvatarImage
              src={session.user?.image as string}
              alt={session.user?.name as string}
            />
            <AvatarFallback className="font-bold">
              {session.user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <CardTitle>{session.user?.name}</CardTitle>
          <CardDescription>{session.user?.email}</CardDescription>
        </CardHeader>

        <CardContent className="w-full">
          <form action={signOutAction}>
            <Button className="w-full" variant={"destructive"}>
              Logout
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
