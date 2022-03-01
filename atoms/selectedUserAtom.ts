import { atom } from "recoil";

export const selectedUserState = atom({
  key: "pr",
  default: {
    user_name: "",
    avatar_url: "",
    user_url: "",
    total_points: 0,
    pr_urls: [
      {
        url: "",
        difficulty: "",
        phase: 0,
      },
    ],
    full_name: "",
    college: "",
    rank: 0,
  },
});
