import api from "./api";

type UpdateProfileRequest = {
  name: string;
  phone: string;
};

async function updateProfile(data: UpdateProfileRequest) {
  await api.patch("/user/", data);
}

export const profileService = {
  updateProfile,
};
