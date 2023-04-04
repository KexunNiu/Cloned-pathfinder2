/**
 * A pill component with a solid background. Takes className, arbitrary props, and child components
 * @param {*} param0
 * @returns
 */
const SolidPill = ({ children, className, ...props }) => {
	return (
		<span className={`flex flex-row gap-2 justify-center items-center rounded-full py-2 px-4 font-bold text-white ${className}`}
			{...props}
		>
			{children}
		</span>
	);
};


export { SolidPill };
