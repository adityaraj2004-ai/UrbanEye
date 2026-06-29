import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";
import { userApi } from "../../api/user.api.js";

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => userApi.changePassword(data),
    onSuccess: () => {
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrors({});
      setTimeout(() => setSuccess(false), 3000);
    },
    onError: (err) => {
      setErrors({
        submit: err?.response?.data?.message || "Failed to change password",
      });
    },
  });

  const validate = () => {
    const next = {};
    if (!currentPassword) next.currentPassword = "Current password is required";

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (!newPassword || newPassword.length < 6) {
      next.newPassword = "Password must be at least 6 characters";
    } else if (!passwordRegex.test(newPassword)) {
      next.newPassword = "Password must contain uppercase, lowercase and a number";
    }

    if (newPassword !== confirmPassword)
      next.confirmPassword = "Passwords do not match";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    mutate({ currentPassword, newPassword, confirmPassword });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Current Password"
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        error={errors.currentPassword}
      />
      <Input
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        error={errors.newPassword}
      />
      <Input
        label="Confirm New Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
      />

      {errors.submit && <p className="text-sm text-red-400">{errors.submit}</p>}
      {success && (
        <p className="text-sm text-green-400">Password changed successfully</p>
      )}

      <Button type="submit" loading={isPending}>
        Change Password
      </Button>
    </form>
  );
};

export default ChangePasswordForm;