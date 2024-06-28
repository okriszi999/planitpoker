import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';
import { GITHUB_CLIENT_ID, GITHUB_SECRET } from '$env/static/private';
import { DrizzleAdapter } from '@auth/drizzle-adapter';

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [
		GitHub({
			clientSecret: GITHUB_SECRET,
			clientId: GITHUB_CLIENT_ID
		})
	]
});
