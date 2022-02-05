import store from "../store";

export default (to, from, next) => {
  console.log("hii");
  if (store.getters.isAuth) {
    return next();
  }
  return next({ name: "Login" });
};
