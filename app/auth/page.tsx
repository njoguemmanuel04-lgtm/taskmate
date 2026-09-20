"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [message, setMessage] = useState("");

  async function handleAuth() {
    setMessage("");

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      setMessage("Account created. Check your email to confirm your account.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      window.location.href = "/";
    }
  }

  return (
    <main style={{ padding: 40, maxWidth: 500, margin: "auto" }}>
      <h1>TaskMate</h1>
      <h2>{mode === "login" ? "Login" : "Create Account"}</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", width: "100%", padding: 12, marginBottom: 12 }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", width: "100%", padding: 12, marginBottom: 12 }}
      />

      <button onClick={handleAuth} style={{ padding: 12, width: "100%" }}>
        {mode === "login" ? "Login" : "Sign Up"}
      </button>

      <button
        onClick={() => setMode(mode === "login" ? "signup" : "login")}
        style={{ marginTop: 12, padding: 10 }}
      >
        {mode === "login"
          ? "Create a new account"
          : "Already have an account? Login"}
      </button>

      {message && <p style={{ marginTop: 20 }}>{message}</p>}
    </main>
  );
}
