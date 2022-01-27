export default (vars, prefix = "") => {
  for (let key in vars) {
    document.documentElement.style.setProperty("--" + key + prefix, vars[key]);
  }
};
