import store from "../store";

export default (to, from, next) => {
  if (store.getters.isAuth) {
    return next();
  }
  return next({ name: "Login" });
};
