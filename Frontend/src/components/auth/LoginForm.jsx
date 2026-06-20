import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import {Input} from "../ui/input.jsx";
import {Button }from "../ui/button.jsx";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const validate = () => {
    const next = {};
    if (!formData.email) next.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      next.email = "Enter a valid email";
    if (!formData.password) next.password = "Password is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setServerError("");
    try {
      const user = await login(formData);
      navigate(user?.role === "admin" ? "/admin" : "/home", { replace: true });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Unable to sign in. Please try again.";
      setServerError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-light tracking-tight text-white mb-2">
          Welcome back
        </h2>
        <p className="text-sm text-neutral-400 font-light">
          Sign in to your UrbanEye account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <div>
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <div className="mt-2 text-right">
            <Link
              to="/forgot-password"
              className="text-xs text-[#F5E9D7]/70 hover:text-[#F5E9D7] transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </div>

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
          {isSubmitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <p className="mt-8 text-sm text-neutral-400 text-center">
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="text-[#F5E9D7] hover:underline underline-offset-4"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}