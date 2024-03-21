import { classNames } from "../utils"

export default function Loader({ size = 'md' }) {

	const sizes = {
		sm: 'h-4 w-4',
		md: 'h-6 w-6',
		lg: 'h-8 w-8',
		xl: 'h-12 w-12',
	}

	return (
		<svg
			className={classNames(`animate-spin stroke-white`, sizes[size])}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 93.73 93.73"
		>
			<path d="m86.23,46.86c0-21.74-17.62-39.36-39.36-39.36-10.25,0-19.58,3.92-26.59,10.33-7.85,7.2-12.78,17.54-12.78,29.03" style={{ fill: "none", strokeLinecap: "round", strokeMiterlimit: 10, strokeWidth: "15px" }} />
			<path d="m86.23,46.86c0,21.74-17.62,39.36-39.36,39.36S7.5,68.6,7.5,46.86" style={{ fill: "none", opacity: .49, strokeMiterlimit: 10, strokeWidth: "15px" }} />
		</svg>
	)
}