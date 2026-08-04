import { AuthCardShell } from "@/components/auth/auth-card-shell"
import { LoginForm } from "@/components/auth/login-form"

export const metadata = {
  title: "Login · CampusHub",
  description: "Login to continue to CampusHub AI workspace.",
}

export default function LoginPage() {
  return (
    <AuthCardShell
      title="Welcome Back! 👋"
      description="Login to continue to CampusHub"
    >
      <LoginForm />
    </AuthCardShell>
  )
}
