import { Card, CardContent } from "../../components/ui/card.jsx";
import ProfileCard from "../../components/profile/ProfileCard.jsx";
import EditProfileForm from "../../components/profile/EditProfileForm.jsx";
import ChangePasswordForm from "../../components/profile/ChangePasswordForm.jsx";

export default function ProfilePage() {
  return (
    <div className="min-h-screen px-4 md:px-8 py-8" style={{ background: "#0B0B0B" }}>
      <div className="mx-auto max-w-xl space-y-8">
        <header>
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white">
            Profile
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Manage your account settings and preferences.
          </p>
        </header>

        <Card>
          <CardContent className="p-6">
            <ProfileCard />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-base font-medium text-white mb-4">
              Edit Profile
            </h2>
            <EditProfileForm />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-base font-medium text-white mb-4">
              Change Password
            </h2>
            <ChangePasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}