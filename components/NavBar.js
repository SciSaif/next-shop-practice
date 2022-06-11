import React from "react";
import Link from "next/link";
import {useSignOut, useUser} from "../hooks/user";

function NavBar() {
	const user = useUser();
	const signOut = useSignOut();

	return (
		<nav className="px-2 py-1 ">
			<ul className="flex gap-2">
				<li className="text-xl font-extrabold">
					<Link href="/">
						<a href="">Next Shop</a>
					</Link>
				</li>
				<li role="separator" className="flex-1"></li>
				{user ? (
					<>
						{user && (
							<li>
								<Link href="/cart">
									<a href="">Cart</a>
								</Link>
							</li>
						)}
						<li>{user.name}</li>
						<li>
							<button onClick={signOut}>Sign Out</button>
						</li>
					</>
				) : (
					<li>
						<Link href="/sign-in">
							<a href="">Sign in</a>
						</Link>
					</li>
				)}
			</ul>
		</nav>
	);
}

export default NavBar;
