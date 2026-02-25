export default defineEventHandler(async (event) => {
  // const query = getQuery(event);
  const response = await apiRequest("posts");
  console.log(response);
  // if (password === "securePassword") {
  //   const user = generateUser(email);
  //   await setUserSession(event, {
  //     user,
  //     secure: {
  //       refreshToken: "sdsd",
  //     },
  //     userId: user.id,
  //     token: "sdfghjkljhf",
  //   });
  //   return {};
  // }
  // throw createError({
  //   statusCode: 401,
  //   message: "Bad credentials",
  // });
});
