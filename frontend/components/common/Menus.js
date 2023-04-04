import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Backdrop from './Backdrop';


/**
 * A single tab component with an icon and text.
 * @param icon The icon to display. If no icon is provided, only the text will be displayed
 * @param text The text to display. If no text is provided, only the icon will be displayed
 * @param url The URL to navigate to when the tab is clicked
 * @param isActive Whether the tab is active or not. If true, the tab will be highlighted
 */
const TabIconLink = ({ icon, text, url, isActive }) => {
	return (
		<Link href={url}>
			<a title={text} className={`flex flex-row gap-2 items-center p-4 bold bg-white hover:bg-lighter border-y-4 border-transparent ${isActive ? 'border-b-secondary' : ''}`}>
				{icon && <FontAwesomeIcon icon={icon} />}
				{text && <span className="hidden xl:inline">{text}</span>}
			</a>
		</Link>
	);
};


/**
 * A tab bar component that displays a row of tabs with icons and text.
 * @param className Any additional classes to add to the tab bar
 * @param links An array of objects containing the icon, text and URL for each tab
 * @param props Any additional props to add to the tab bar
 */
const IconLinkTabBar = ({ className = '', links, ...props }) => {
	const router = useRouter();
	const { asPath } = router;

	return (
		<nav className={`flex flex-row ${className}`} {...props}>
			{links.map(({ icon, text, url }) => <TabIconLink key={text} icon={icon} text={text} url={url} isActive={asPath === url} />)}
		</nav>
	);
};


/**
 * A single dropdown menu item with an icon and text.
 * @param icon The icon to display. If no icon is provided, only the text will be displayed
 * @param text The text to display. If no text is provided, only the icon will be displayed
 * @param url The URL to navigate to when the menu item is clicked
 * @param isVisible Whether the menu item should be visible or not. Defaults to true
 * @param onClick An optional callback function to be called when the menu item is clicked. If no callback is provided, we will navigate to the given URL instead
*/
const DropdownMenuIconLink = ({ icon, text, url, isVisible = true, onClick }) => {
	if (!isVisible) return null;

	return (
		<Link href={url}>
			<a className="flex flex-row items-center gap-2 p-4 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900" onClick={onClick}>
				{icon && <FontAwesomeIcon icon={icon} className="mr-2 fa-fw" />}
				{text && <span>{text}</span>}
			</a>
		</Link>
	);
};


/**
 * A single dropdown menu item with custom content.
 * @param className Any additional classes to add to the menu item
 * @param url The URL to navigate to when the menu item is clicked
 * @param isVisible Whether the menu item should be visible or not. Defaults to true
 * @param onClick An optional callback function to be called when the menu item is clicked. If no callback is provided, we will navigate to the given URL instead
 * @param children The content to display in the menu item
*/
const DropdownMenuCustomLink = ({ className = '', url, isVisible = true, onClick, children }) => {
	if (!isVisible) return null;

	return (
		<Link href={url}>
			<a className={`flex flex-row items-center gap-2 p-4 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${className}`} onClick={onClick}>
				{children}
			</a>
		</Link>
	);
};


/**
 * A dropdown menu component that displays a list of menu items.
 * @param className Any additional classes to add to the menu
 * @param isOpen Whether the menu should be visible or not
 * @param onCloseClick The function to call when the menu is closed. This is usually a function that sets the isOpen state to false
 * @param children The menu items to display
*/
const DropdownMenu = ({ className = '', isOpen, onCloseClick, children }) => {
	if (!isOpen) return null;

	return (
		<>
			<Backdrop isVisible={isOpen} onClick={onCloseClick} />
			<div className={`absolute w-max bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-20 ${className}`}>
				{children}
			</div>
		</>
	);
};


export { IconLinkTabBar, TabIconLink, DropdownMenuIconLink, DropdownMenuCustomLink, DropdownMenu };
