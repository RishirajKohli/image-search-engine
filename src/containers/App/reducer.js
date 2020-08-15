import { TOGGLE_THEME } from "./constants";

const initialState = {
  isThemeLight: true,
};
export function app(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_THEME: {
      let isThemeLight = !state.isThemeLight;
      return { ...state, isThemeLight };
    }
    default:
      return state;
  }
}
