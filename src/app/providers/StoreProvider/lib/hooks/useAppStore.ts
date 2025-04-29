import { useStore } from "react-redux";
import { AppStore } from "../../config/store";

export const useAppStore = useStore.withTypes<AppStore>();