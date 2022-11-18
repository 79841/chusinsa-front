import { atom, RecoilRoot, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const jwtState = atom({
  key: "jwt",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export default jwtState;
