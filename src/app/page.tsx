import SignIn from "@/components/sign-in";
import SignOut from "@/components/sign-out";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import Image from "next/image";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div>
      <ul>
        {session ? (
          <li key={session.user.id} className="flex gap-2 items-center">
            {session.user.image && (
              <Image
                src={session.user.image}
                alt={`${session.user.name}'s image`}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <div>
              <p>{session.user.email}</p>
              <p>{session.user.role}</p>
            </div>
          </li>
        ) : null}
      </ul>
      {session ? <SignOut /> : <SignIn />}
    </div>
  );
}
