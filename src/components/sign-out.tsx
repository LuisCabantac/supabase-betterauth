"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={async () =>
          await signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/sign-in");
              },
            },
          })
        }
      >
        Sign out
      </button>
    </div>
  );
}
