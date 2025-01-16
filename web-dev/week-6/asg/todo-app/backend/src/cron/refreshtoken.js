import cron from "node-cron";
import { generateRefreshToken } from "../utils/auth.js";
const setupRefreshTokenCron = (userRepository) => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const activeUsers = await userRepository.findActiveUsers();
      for (const user of activeUsers) {
        const newRefreshToken = generateRefreshToken(user.id);
        await userRepository.updateRefreshToken(user.id, newRefreshToken);
      }
    } catch (error) {
      console.error("Refresh token cron job failed:", error);
    }
  });
};
