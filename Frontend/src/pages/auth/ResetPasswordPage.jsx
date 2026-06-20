import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout.jsx";
import { authApi } from "../../api/auth.api.js";
import {Input} from "../../components/ui/input.jsx";
import {Button} from "../../components/ui/button.jsx";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
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
    if (!formData.password) next.password = "Password is required";
    else if (formData.password.length < 8)
      next.password = "Password must be at least 8 characters";
    if (!formData.confirmPassword)
      next.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      next.confirmPassword = "Passwords do not match";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!token) {
      setServerError("Reset token is missing or invalid.");
      return;
    }

    setIsSubmitting(true);
    setServerError("");
    try {
      await authApi.resetPassword(token, {
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      navigate("/login", { replace: true });
    } catch (err) {
      setServerError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to reset password. The link may have expired."
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
            Reset password
          </h2>
          <p className="text-sm text-neutral-400 font-light">
            Choose a new password for your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <Input
            label="New password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <Input
            label="Confirm password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Re-enter your new password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
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
            {isSubmitting ? "Updating…" : "Update password"}
          </Button>
        </form>

        <p className="mt-8 text-sm text-neutral-400 text-center">
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