"use client"

import Button from './components/button'

export default function Home() {

	return (
		<main>
			<Button onClick={() => { localStorage.setItem("USER_TYPE", "STORE") }} text="Store User" />
			<Button onClick={() => { localStorage.setItem("USER_TYPE", "BUSINESS") }} text="Business User" />
		</main>
	);
}
