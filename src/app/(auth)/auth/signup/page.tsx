import { SignUpForm } from "../_components/sign-up-form";


export default function SignUpPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <SignUpForm className="w-full max-w-5xl" />
    </div>
  );
}