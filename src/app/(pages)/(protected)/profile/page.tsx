"use client";

import PageLayout from "@/components/PageLayout";
import ProfileCard from "@/features/profile/components/ProfileCard";
import withAuth from "@/hocs/withAuth";

const ProfilePage = () => {
  return (
    <PageLayout headerType="back" headerTitle="Perfil">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <ProfileCard />
        </div>
      </div>
    </PageLayout>
  );
};

export default withAuth(ProfilePage);
