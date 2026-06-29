
import { useState } from "react";
import { Camera } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../../api/user.api.js";
import useAuth from "../../hooks/useAuth.js";

const ProfileCard = () => {
  const { user, updateUser } = useAuth();
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const { mutate: uploadAvatar, isPending } = useMutation({
    mutationFn: (formData) => userApi.uploadAvatar(formData),
    onSuccess: (res) => {
      const avatar = res?.data?.avatar;
      if (avatar) updateUser({ avatar });
      setPreview(null);
    },
    onError: (err) => {
      setError(err?.response?.data?.message || "Failed to upload avatar");
      setPreview(null);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("avatar", file);
    uploadAvatar(formData);
  };

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <div className="relative">
        <div className="h-24 w-24 overflow-hidden rounded-full bg-white/10 flex items-center justify-center text-2xl text-neutral-300 border border-white/10">
          {preview || user?.avatar ? (
            <img
              src={preview || user.avatar}
              alt={user?.fullName}
              className="h-full w-full object-cover"
            />
          ) : (
            user?.fullName?.[0]?.toUpperCase() || "?"
          )}
        </div>

        <label
          htmlFor="avatar-upload"
          className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#F5E9D7] text-[#0B0B0B] cursor-pointer hover:bg-[#ECDFC8] transition-colors"
        >
          <Camera size={14} />
        </label>
        <input
          id="avatar-upload"
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          className="hidden"
          onChange={handleFileChange}
          disabled={isPending}
        />
      </div>

      {isPending && (
        <p className="text-xs text-neutral-400">Uploading...</p>
      )}
      {error && <p className="text-xs text-red-400">{error}</p>}

      <div className="text-center">
        <h2 className="text-lg font-medium text-white">{user?.fullName}</h2>
        <p className="text-sm text-neutral-400">{user?.email}</p>
        {user?.role === "admin" && (
          <span className="mt-1 inline-flex items-center rounded-full bg-[#F5E9D7]/10 border border-[#F5E9D7]/20 px-2.5 py-0.5 text-xs text-[#F5E9D7]">
            Admin
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;