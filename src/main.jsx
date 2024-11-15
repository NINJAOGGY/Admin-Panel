import React from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error('Add your Clerk publishable key to the .env.local file')
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={clerkPubKey}
      navigate={(to) => window.location.href = to}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      SignInUrl="/dashboard"
      SignUpUrl="/dashboard"
      afterSignOutUrl="/sign-in"
    >
      <App />
    </ClerkProvider>
  </React.StrictMode>
);