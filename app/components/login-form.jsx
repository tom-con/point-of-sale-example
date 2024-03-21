"use client"

import Button from "./button"
import { useState } from "react"

export default function LoginForm() {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(false)

	async function login(user, pass) {
		setLoading(true)
		const result = await fetch(`/api/users/login`, {
			method: 'POST',
			body: JSON.stringify({
				username: user,
				password: pass
			})
		})
		const { data: body } = await result.json()
		localStorage.setItem('user', JSON.stringify(body))
		setLoading(false)
	}

	return (
		<div className="flex flex-col gap-y-2">
			<input
				className="text-black rounded-md"
				onChange={(event) => setUsername(event.target.value)}
				placeholder="example@email.com"
				type="text"
				value={username}
			/>
			<input
				className="text-black rounded-md"
				onChange={(event) => setPassword(event.target.value)}
				type="password"
				placeholder="password"
				value={password}
			/>
			<Button loading={loading} onClick={() => login(username, password)} text="Login" />
		</div>
	)
}