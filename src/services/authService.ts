import api from "./api";

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignInResponse = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
};

export type MeResponse = {
  id: string;
  name: string;
  email: string;
  role: string;
  products: {
    id: string;
    name: string;
    modes: {
      flashcards: boolean;
      exam: boolean;
      course: boolean;
    };
    status: string;
    expirateAt: string;
  }[];
  statistics: {
    totalQuestionsAnswered: number;
    completedFlashcards: number;
    daysStudiedConsecutively: number;
    percentageQuestionsCorrect: number;
    percentageVideosWatched: number;
    totalQuestionsAnsweredToday: number;
  };
};

export type GetAuthenticatedUserResponse = MeResponse & {
  phone: string;
  active: boolean;
  confirmationCode: string | null;
  subscription: {
    id: string;
    name: string;
  };
  products: {
    id: string;
    name: string;
    modes: {
      flashcards: boolean;
      exam: boolean;
      course: boolean;
    };
    status: string;
    expirateAt: string;
  }[];
};

export type EmailRequest = {
  email: string;
};
export type ConfirmationRequest = {
  confirmation_token: string;
  password: string;
  email: string;
};

export type SignUpRequest = {
  name: string;
  email: string;
  phone: string;
};

export type SignUpResponse = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
};

export type AccountConfirmationRequest = {
  validation_code: string;
  new_password: string;
};

export type CreatePasswordRequest = {
  confirmationToken: string;
  newPassword: string;
};

export type ValidateConfirmationCodeRequest = {
  confirmationCode: string;
};

export type ValidateConfirmationCodeResponse = {
  confirmationToken: string;
};

export type RecoverPasswordRequest = {
  email: string;
};

export type DecodeTokenResponse = SignInResponse;

export type RefreshTokenRequest = {
  refreshToken: string;
};
export type RefreshTokenResponse = SignInResponse;

async function signIn(data: SignInRequest): Promise<void> {
  const { accessToken, refreshToken } = (
    await api.post<SignInResponse>("/auth/signin/", data)
  ).data;

  localStorage.setItem("deulaudo_access_token", accessToken);
  localStorage.setItem("deulaudo_refresh_token", refreshToken);
}

async function signUp(data: SignUpRequest): Promise<SignUpResponse> {
  const response = await api.post<SignUpResponse>("/auth/signup/", data);
  return response.data;
}

function signOut() {
  localStorage.removeItem("deulaudo_access_token");
  localStorage.removeItem("deulaudo_refresh_token");
}

function isUserWithAuthenticationToken(): boolean {
  return !!localStorage.getItem("deulaudo_access_token");
}

async function getAuthenticatedUser(): Promise<GetAuthenticatedUserResponse> {
  const { id, products } = (await api.get<MeResponse>("/auth/me/")).data;
  const userData = (await api.get<GetAuthenticatedUserResponse>(`/user/${id}`))
    .data;
  return {
    ...userData,
    products,
  };
}

async function createPassword(data: CreatePasswordRequest): Promise<void> {
  return api.patch("/auth/create-password", data);
}

async function validateConfirmationCode(
  data: ValidateConfirmationCodeRequest,
): Promise<ValidateConfirmationCodeResponse> {
  const response = await api.post<ValidateConfirmationCodeResponse>(
    "/auth/validate-code",
    data,
  );

  return response.data;
}

async function recoverPassword(data: RecoverPasswordRequest): Promise<void> {
  return api.post("/auth/recover-password", data);
}

async function refreshToken(
  data: RefreshTokenRequest,
): Promise<RefreshTokenResponse> {
  const response = await api.post<RefreshTokenResponse>(
    "/auth/refresh-token/",
    data,
  );
  localStorage.setItem("deulaudo_access_token", response.data.accessToken);
  localStorage.setItem("deulaudo_refresh_token", response.data.refreshToken);

  return response.data;
}

export const authService = {
  isUserWithAuthenticationToken,
  signIn,
  signUp,
  signOut,
  getAuthenticatedUser,
  createPassword,
  validateConfirmationCode,
  recoverPassword,
  refreshToken,
};
