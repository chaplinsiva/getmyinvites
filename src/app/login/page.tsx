import AuthForm from "./AuthForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string; next?: string; mode?: string }>;
}) {
  const { message, next, mode } = await searchParams;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative bg-slate-50/50 py-20 px-4">
      {/* Background decorations */}
      <div className="absolute top-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-pink-100/40 blur-3xl" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-indigo-100/40 blur-3xl" />
      </div>

      <AuthForm message={message} nextPath={next} initialSignUp={mode === "signup"} />
      
      <div className="mt-12 text-center">
        <p className="text-sm text-slate-500">
          Make My Invites © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
