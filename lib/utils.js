export default async function post(endpoint, data = {}) {
	const res = await fetch(endpoint, {
		method: 'POST',
		// credentials: 'include',
		body: JSON.stringify(data || {}),
		headers: {
			'Content-Type': 'application/json'
		}
	})
	 res.data = await res.json();
	 return res;
}

export async function get(endpoint) {
	const res = await fetch(endpoint);
  return await res.json()
}

export async function remove(endpoint, data = {}) {
	const res = await fetch(endpoint, {
		method: 'DELETE', 
		body: JSON.stringify(data || {}),
		headers: {
			'Content-Type': 'application/json'
		}
	})
	 res.data = await res.json();
	 return res;
}
