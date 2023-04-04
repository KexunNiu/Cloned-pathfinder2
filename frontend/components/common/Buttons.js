import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash, faCheck, faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';


/**
 * A base button component with an outline. Takes className, arbitrary props, and child components.
 * @param className Additional classes to apply to the button.
 * @param children Child components to render inside the button.
 */
const OutlinedButton = ({ className, children, ...props }) => {
	return (
		<button
			className={`flex flex-row gap-2 flex-1 justify-center items-center rounded border py-2 px-4 font-bold bg-transparent hover:text-white ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};


/**
 * A base button component with a solid background. Takes className, arbitrary props, and child components.
 * @param className Additional classes to apply to the button.
 * @param children Child components to render inside the button.
 */
const SolidButton = ({ className, children, ...props }) => {
	return (
		<button
			className={`flex flex-row gap-2 flex-1 justify-center items-center rounded py-2 px-4 font-bold bg-secondaryDark text-white hover:bg-secondary ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};


/**
 * A reusable delete button component. Takes text, arbitrary props, and child components.
 * @param className Additional classes to apply to the button.
 * @param text Text to display on the button.
 * @param children Child components to render inside the button.
 */
const DeleteButton = ({ text = 'Delete', children, ...props }) => {
	return (
		<OutlinedButton className="text-errorDark border-errorDark hover:bg-error" {...props}>
			<FontAwesomeIcon icon={faTrash} />
			{text}
		</OutlinedButton>
	);
};


/**
 * A reusable edit button component. Takes text, arbitrary props, and child components.
 * @param className Additional classes to apply to the button.
 * @param text Text to display on the button.
 * @param children Child components to render inside the button.
 */
const EditButton = ({ text = 'Edit', children, ...props }) => {
	return (
		<OutlinedButton className="text-secondaryDark border-secondaryDark hover:bg-secondary" {...props}>
			<FontAwesomeIcon icon={faPenToSquare} />
			{text}
		</OutlinedButton>
	);
};


/**
 * A reusable view button component. Takes text, arbitrary props, and child components.
 * @param text Text to display on the button.
 * @param className Additional classes to apply to the button.
 * @param children Child components to render inside the button.
 */
const ViewButton = ({ text = 'View', children, ...props }) => {
	return (
		<OutlinedButton className="text-secondaryDark border-secondaryDark hover:bg-secondary" {...props}>
			<FontAwesomeIcon icon={faEye} />
			{text}
		</OutlinedButton>
	);
};


/**
 * A reusable delete button component. Takes text, arbitrary props, and child components.
 * @param text Text to display on the button.
 * @param className Additional classes to apply to the button.
 * @param children Child components to render inside the button.
 */
const CancelButton = ({ text = 'Cancel', children, ...props }) => {
	return (
		<SolidButton className="bg-errorDark hover:bg-error" {...props}>
			<FontAwesomeIcon icon={faXmark} />
			{text}
		</SolidButton>
	);
};


/**
 * A reusable confirm button component. Takes text, arbitrary props, and child components.
 * @param text Text to display on the button.
 * @param className Additional classes to apply to the button.
 * @param children Child components to render inside the button.
 */
const ConfirmButton = ({ text = 'Confirm', children, ...props }) => {
	return (
		<SolidButton className="bg-secondaryDark hover:bg-secondary" {...props}>
			<FontAwesomeIcon icon={faCheck} />
			{text}
		</SolidButton>
	);
};


export { SolidButton, OutlinedButton, DeleteButton, EditButton, ViewButton, CancelButton, ConfirmButton };
