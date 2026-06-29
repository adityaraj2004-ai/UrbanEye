import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";
import { userApi } from "../../api/user.api.js";
import useAuth from "../../hooks/useAuth.js";

const EditProfileForm = () => {
  const { user, updateUser } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => userApi.updateProfile(data),
    onSuccess: (res) => {
      const updated = res?.data?.user;
      if (updated) updateUser(updated);
      setSuccess(true);
      setError("");
      setTimeout(() => setSuccess(false), 3000);
    },
    onError: (err) => {
      setError(err?.response?.data?.message || "Failed to update profile");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    mutate({ fullName, phone });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <Input
        label="Phone (optional)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="e.g. 9876543210"
      />

      {error && <p className="text-sm text-red-400">{error}</p>}
      {success && (
        <p className="text-sm text-green-400">Profile updated successfully</p>
      )}

      <Button type="submit" loading={isPending}>
        Save Changes
      </Button>
    </form>
  );
};

export default EditProfileForm;