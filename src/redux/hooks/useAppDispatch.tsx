import {useDispatch} from "react-redux";
import type {store} from "../store/store.tsx";

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>()