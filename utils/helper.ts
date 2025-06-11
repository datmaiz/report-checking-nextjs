export function callAPI(input: string | URL | globalThis.Request, init?: RequestInit) {
	return fetch(input, {
		headers: {
			'Content-Type': 'application/json',
			...init?.headers,
		},
		...init,
	})
}
