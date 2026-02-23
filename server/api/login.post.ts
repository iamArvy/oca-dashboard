import { z } from "zod";
import { faker } from "@faker-js/faker";
const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
// Generate a fake user
export const generateUser = (email: string) => {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email,
    role: faker.helpers.arrayElement(["admin", "user", "editor"]),
    permissions: faker.helpers.arrayElements(
      ["read", "write", "delete", "update"],
      faker.number.int({ min: 1, max: 3 }),
    ),
    avatar: faker.image.avatar(),
    createdAt: faker.date.past().toISOString(),
  };
};

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse);

  if (password === "securePassword") {
    const user = generateUser(email);
    await setUserSession(event, {
      user,
      secure: {
        refreshToken: "sdsd",
      },
      userId: user.id,
      token: "sdfghjkljhf",
    });
    return {};
  }
  throw createError({
    statusCode: 401,
    message: "Bad credentials",
  });
});
