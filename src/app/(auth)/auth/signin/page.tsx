import Link from "next/link";
import Image from "next/image";
import { SignInForm } from "../_components/sign-in-form";


export default function SignInPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            ERIS
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <SignInForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/images/auth/signin/hero-signin.jpg"
          alt="Login background"
          fill
          className="object-cover"
          priority
          loading="eager"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
