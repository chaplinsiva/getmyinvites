"use client";

import { useState } from "react";
import { login, signup } from "./actions";

export default function AuthForm({ message }: { message?: string }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPending, setIsPending] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto relative z-10">
      {/* Decorative blurred background blob */}
      <div className="absolute -inset-1 blur-3xl bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 opacity-30 rounded-[2rem] -z-10" />
      
      <div className="bg-white/70 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-8 relative overflow-hidden">
        {/* Top Toggle */}
        <div className="flex bg-slate-100/50 p-1 rounded-2xl mb-8 relative">
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-xl shadow-sm transition-all duration-300 ease-out ${
              isSignUp ? "translate-x-[calc(100%+4px)]" : "translate-x-0"
            }`}
          />
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className={`flex-1 py-2.5 text-sm font-semibold z-10 transition-colors duration-300 ${
              !isSignUp ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            className={`flex-1 py-2.5 text-sm font-semibold z-10 transition-colors duration-300 ${
              isSignUp ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {isSignUp ? "Create an Account" : "Welcome Back"}
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            {isSignUp 
              ? "Start designing your perfect wedding invitations." 
              : "Sign in to continue to your dashboard."}
          </p>
        </div>

        <form 
          action={isSignUp ? signup : login}
          onSubmit={() => setIsPending(true)}
          className="flex flex-col gap-5"
        >
          <div 
            className={`transition-all duration-300 overflow-hidden flex flex-col gap-4 ${
              isSignUp ? "max-h-24 opacity-100 mb-1" : "max-h-0 opacity-0 mb-0"
            }`}
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider" htmlFor="fullName">
                Full Name
              </label>
              <input
                className="w-full bg-white/50 border border-slate-200 focus:border-slate-400 focus:ring-4 focus:ring-slate-100 rounded-xl px-4 py-3 text-slate-900 transition-all outline-none"
                name="fullName"
                id="fullName"
                placeholder="Jane Doe"
                required={isSignUp}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider" htmlFor="email">
              Email Address
            </label>
            <input
              className="w-full bg-white/50 border border-slate-200 focus:border-slate-400 focus:ring-4 focus:ring-slate-100 rounded-xl px-4 py-3 text-slate-900 transition-all outline-none"
              name="email"
              id="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider" htmlFor="password">
              Password
            </label>
            <input
              className="w-full bg-white/50 border border-slate-200 focus:border-slate-400 focus:ring-4 focus:ring-slate-100 rounded-xl px-4 py-3 text-slate-900 transition-all outline-none"
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          {message && (
            <div className="mt-2 p-3 bg-red-50/80 border border-red-200 text-red-600 text-sm text-center rounded-xl animate-in fade-in slide-in-from-bottom-2">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="mt-4 w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3.5 rounded-xl shadow-lg shadow-slate-900/20 active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              isSignUp ? "Create Account" : "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
