import Resource from "../resources/classes/Resource";

export default (to, from, next) => {
  if (Resource.getResourceById(to.params.resourceId)) {
    return next();
  }
  return next({ name: "Dashboard" });
};
