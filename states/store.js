import { atom, RecoilRoot, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const itemsState = atom({
  key: "items",
  default: [],
});

export const categoryState = atom({
  key: "category",
  default: "top",
});

export const jwtState = atom({
  key: "jwt",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// export default jwtState;
