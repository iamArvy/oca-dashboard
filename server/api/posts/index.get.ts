import type { ApiListResponse, Posts } from "~/interfaces";

export default defineEventHandler(async (event) => {
  // const query = getQuery(event);
  await requireUserSession(event);
  try {
    const response = await apiRequest<ApiListResponse<Posts>>("posts");
    console.log(response);
    return response;
  } catch (e) {
    throw createError(e);
  }
});
