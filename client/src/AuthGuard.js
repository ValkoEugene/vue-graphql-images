export default (to, from, next) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("-----authGuard redirect");
    next({
      path: "/signin",
    });
  } else {
    next();
  }
};
