import cookie from "cookie";

function handleLogout(req, res) {
	res.status(200)
		.setHeader(
			"Set-Cookie",
			cookie.serialize("jwt", "", {
				path: "/api",
				expires: new Date(0), // 0 ms past the epoch, i.e. in the past, so already expired
			})
		)
		.json({});
}

export default handleLogout;
