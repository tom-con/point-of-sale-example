import LoginForm from "./components/login-form";

export default function Home() {

	return (
		<main>
			<div className="mt-40 mx-4 md:w-1/3 md:flex md:mx-auto">
				<LoginForm />
			</div>
		</main>
	);
}
