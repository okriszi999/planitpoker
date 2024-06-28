import { handle as authenticationHandle } from '$lib/auth';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const authorizationHandle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/dashboard')) {
		const session = await event.locals.auth();

		if (!session) {
			const redirectUrl = encodeURIComponent(event.url.pathname);
			throw redirect(303, `/authentication/signin?returnTo=${redirectUrl}`);
		}
	}

	if (event.url.pathname.startsWith('/authentication')) {
		const session = await event.locals.auth();

		if (session?.user) {
			throw redirect(303, '/');
		}
	}

	return resolve(event);
};

export const handle: Handle = sequence(authenticationHandle, authorizationHandle);
