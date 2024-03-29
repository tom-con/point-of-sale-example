"use client"

import { useContext, useState } from "react"

import Button from "./button"
import { UserContext } from '@/app/state/user-context'
import { useRouter } from "next/navigation"

export default function LoginForm() {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(false)
	const { setUser } = useContext(UserContext)
	const router = useRouter()

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
		setUser(body)
		router.push('/stores/2/inventory')
		setLoading(false)
	}

	return (
		<div className="flex flex-col gap-y-2 w-full items-center">
			<input
				className="text-black rounded-md w-full"
				onChange={(event) => setUsername(event.target.value)}
				placeholder="example@email.com"
				type="text"
				value={username}
			/>
			<input
				className="text-black rounded-md w-full"
				onChange={(event) => setPassword(event.target.value)}
				type="password"
				placeholder="password"
				value={password}
			/>
			<div className="w-full md:w-2/3 mt-6">
				<Button loading={loading} onClick={() => login(username, password)} text="Login" />
			</div>
		</div>
	)
}