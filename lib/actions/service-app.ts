" user server"

import { getCurrentUser } from "../session";

export const getLoggedInUser = async () => {
  try {
    const user = await getCurrentUser();
    return user;
  } catch (error) {
    throw new Error(`Error getting tenants: ${error.message}`);
  }
}
