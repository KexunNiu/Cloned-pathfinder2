import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faTriangleExclamation, faCircleCheck } from '@fortawesome/free-solid-svg-icons';


/**
 * A base alert component. Takes className, arbitrary props, and child components.
 * @param msg The text to display in the alert. If msg doesn't exist, the alert won't be shown.
 * @param icon The icon to display in the alert
 * @returns
 */
const Alert = ({ msg, icon, className, ...props }) => {
	if (!msg) return null;

	return (
		<span className={`w-full flex flex-row gap-2 flex-1 justify-center items-center rounded border py-2 px-4 font-bold bg-transparent ${className}`}
			{...props}
		>
			<FontAwesomeIcon icon={icon} />
			{msg}
		</span>
	);
};


/**
 * A reusable error alert component. Takes msg and arbitrary props.
 * @param msg The text to display in the alert. If msg doesn't exist, the alert won't be shown.
 */
const ErrorAlert = ({ msg = 'An error has occurred. Please try again', ...props }) => {
	return <Alert className="text-errorDark border-errorDark" msg={msg} icon={faCircleExclamation} {...props} />;
};


/**
 * A reusable warning alert component. Takes text and arbitrary props.
 * @param msg The text to display in the alert. If msg doesn't exist, the alert won't be shown.
 */
const WarningAlert = ({ msg = 'Warning!', ...props }) => {
	return <Alert className="text-warningDark border-warningDark" msg={msg} icon={faTriangleExclamation} {...props} />;
};


/**
 * A reusable success alert component. Takes text and arbitrary props.
 * @param msg The text to display in the alert. If msg doesn't exist, the alert won't be shown.
 */
const SuccessAlert = ({ msg = 'Success!', ...props }) => {
	return <Alert className="text-infoDark border-infoDark" msg={msg} icon={faCircleCheck} {...props} />;
};


export { ErrorAlert, WarningAlert, SuccessAlert };
