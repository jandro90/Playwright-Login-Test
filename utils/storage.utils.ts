import { Page } from "@playwright/test";

// I haven't used this data, but it's just an example of helpers, which help you search for resources in a reusable way.

export const getUserAuthToken = async (page: Page) => {
    const userAuthToken: string | null = await page.evaluate(() => localStorage.getItem('X-State-Authorization'));
    return userAuthToken;
}
