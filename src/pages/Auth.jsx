import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../services/firebaseService";
import { Button, Card, Input } from "../components/ui";

function Auth({ setUser }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email.trim() || !password.trim()) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      let result;

      if (mode === "signup") {
        result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        result = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      setUser(result.user);
    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <Card className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            🎬 Stickman Studio AI
          </h1>

          <p className="mt-3 text-slate-400">
            {mode === "login"
              ? "Welcome back! Sign in to continue."
              : "Create your free Stickman Studio account."}
          </p>
        </div>

        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block font-semibold">
              Email
            </label>

            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="bg-slate-950"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Password
            </label>

            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="bg-slate-950"
            />
          </div>

          <Button
            variant="primary"
            onClick={handleSubmit}
            className="w-full"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "🔐 Log In"
              : "🚀 Create Account"}
          </Button>

          <button
            onClick={() =>
              setMode(mode === "login" ? "signup" : "login")
            }
            className="w-full text-center text-slate-400 transition hover:text-white"
          >
            {mode === "login"
              ? "Need an account? Sign up"
              : "Already have an account? Log in"}
          </button>
        </div>
      </Card>
    </div>
  );
}

export default Auth;