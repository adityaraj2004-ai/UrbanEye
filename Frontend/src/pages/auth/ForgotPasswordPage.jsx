import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout.jsx";
import { authApi } from "../../api/auth.api.js";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setServerError("");

    if (!email) return setError("Email is required");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email");

    setIsSubmitting(true);
    try {
      await authApi.forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      setServerError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to send reset link. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full">
        <div className="mb-8">
          <h2 className="text-3xl font-light tracking-tight text-white mb-2">
            Forgot password
          </h2>
          <p className="text-sm text-neutral-400 font-light">
            Enter your email and we&apos;ll send you a reset link
          </p>
        </div>

        {success ? (
          <div className="rounded-md border border-[#F5E9D7]/20 bg-[#F5E9D7]/5 px-4 py-4">
            <p className="text-sm text-[#F5E9D7]">
              If an account exists for <span className="font-medium">{email}</span>,
              a password reset link has been sent. Check your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <Input
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
                setServerError("");
              }}
              error={error}
            />

            {serverError && (
              <div className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3">
                <p className="text-sm text-red-300">{serverError}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="filled"
              size="lg"
              loading={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Sending…" : "Send reset link"}
            </Button>
          </form>
        )}

        <p className="mt-8 text-sm text-neutral-400 text-center">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-[#F5E9D7] hover:underline underline-offset-4"
          >
            Back to sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}