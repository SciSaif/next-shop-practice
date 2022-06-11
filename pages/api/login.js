import {fetchJson} from "../../lib/api";
import cookie from "cookie";

const {CMS_URL} = process.env;

async function handleLogin(req, res) {
	if (req.method !== "POST") {
		res.status(405).end();
		return;
	}
	const {email, password} = req.body;

	try {
		const {jwt, user} = await fetchJson(`${CMS_URL}/auth/local`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				identifier: email,
				password: password,
			}),
		});

		res.status(200)
			.setHeader(
				"Set-Cookie",
				cookie.serialize("jwt", jwt, {
					path: "/api", // restrick the cookie to the /api path only
					httpOnly: true, // only send the cookie as a header when making request to the server but hide it from the javascript code running in the browser
				})
			)
			.json({
				id: user.id,
				name: user.username,
			});
	} catch (err) {
		console.log(err);
		res.status(401).end();
	}
}

export default handleLogin;
