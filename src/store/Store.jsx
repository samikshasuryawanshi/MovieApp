import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/movieSlice";
import tvReducer from "./reducers/tvSlice";
import peopleReducer from "./reducers/peopleSlice";

export const store = configureStore({
    reducer: {
        movie: movieReducer,
        tv: tvReducer,
        people: peopleReducer,
    },
})
