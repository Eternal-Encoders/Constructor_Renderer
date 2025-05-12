import { useDispatch } from "react-redux";
import { AppDispatch } from "../../config/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();