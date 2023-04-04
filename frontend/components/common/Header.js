import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt, faUser, faCaretDown, faBuilding, faInbox, faTableList, faHouse, faUsers, faBriefcase, faBars, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { get, getCurrentUser } from '../utils/Api';
import { deleteAccessToken, setRole, getRole } from '../utils/CookieStorage';
import CONSTANTS from '../constants/constants';
import { getOrDefault } from '../utils/General';
import { IconLinkTabBar, DropdownMenuIconLink, DropdownMenuCustomLink, DropdownMenu } from './Menus';


// Icons shown for different types of users in the profile card
const profileIcons = {
  'Company': faBuilding,
  'Mentor': faUserGraduate,
  'User/YoungPeople': faUser,
};

// Links shown in the navigation bar for different types of users
const navMenuLinks = {
  'Company': [
    { icon: faHouse, text: 'Dashboard', url: '/dashboard' },
    { icon: faUsers, text: 'Users', url: '/regularUsers' },
    { icon: faInbox, text: 'Applications', url: '/AllOpportunities' },
    { icon: faTableList, text: 'Posts', url: '/OpportunityList' },
  ],
  'Mentor': [
    { icon: faHouse, text: 'Dashboard', url: '/dashboard' },
    { icon: faBriefcase, text: 'Opportunities', url: '/opportunities' },
    { icon: faBuilding, text: 'Companies', url: '/companies' },
    { icon: faUsers, text: 'Users', url: '/regularUsers' },
  ],
  'User/YoungPeople': [
    { icon: faHouse, text: 'Dashboard', url: '/dashboard' },
    { icon: faBriefcase, text: 'Opportunities', url: '/opportunities' },
    { icon: faBuilding, text: 'Companies', url: '/companies' },
    { icon: faUsers, text: 'Mentors', url: '/mentors' },
  ],
};

// Links shown in the profile menu for different types of users
// The profile card and logout button will always be shown
const profileMenuLinks = {
  'Company': [],
  'Mentor': [],
  'User/YoungPeople': [
    { icon: faInbox, text: "My Applications", url: "/applications" },
  ],
};


/**
 * A component that displays the profile picture of the current user
 * @param className Additional classes to add to the component. Defaults to 'w-8 h-8'
 * @param pictureUrl The URL of the profile picture to display. A default profile picture will be shown if this is not provided
 */
const ProfilePic = ({ className = 'w-8 h-8', pictureUrl }) => {
  const additionalClasses = `text-secondary rounded-full shadow ${className}`;

  if (pictureUrl) {
    return <img src={pictureUrl} alt="Profile picture" className={`border-4 border-secondary ${additionalClasses}`} />;
  }

  return <FontAwesomeIcon icon={faUserCircle} className={additionalClasses} />;
};


/**
 * A component that displays a dropdown menu on the right side of the header. The menu contains the profile picture of the current user, their name, and a list of links to different pages
 * @param className Additional classes to add to the component. Defaults to ''
 * @param name The name of the current user
 * @param username The username of the current user
 * @param role The role of the current user
 * @param pictureUrl The URL of the profile picture of the current user
 * @param onLogout The function to call when the user clicks the logout button
*/
const UserMenu = ({ className = '', name, username, role, pictureUrl, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  // For opening the menu
  const handleMenuClick = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);


  return (
    <div className={`relative flex flex-row items-center ${className}`}>
      {/* Button to open the menu */}
      <button
        className="flex flex-row items-center justify-center gap-2 h-full p-4 bg-white hover:bg-lighter"
        onClick={handleMenuClick}
      >
        <ProfilePic pictureUrl={pictureUrl} className="w-8 h-8" />
        <span className="text-sm font-medium leading-5 truncate">{name}</span>
        <FontAwesomeIcon icon={faCaretDown} size="sm" className={`text-black transition ${isMenuOpen ? 'rotate-180' : ''}`} />
      </button>
      {/* Menu */}
      <DropdownMenu className="top-16 right-0 origin-top-right" isOpen={isMenuOpen} onCloseClick={handleMenuClick}>
        {/* User profile card */}
        <DropdownMenuCustomLink url="/profile" className="flex-col gap-6">
          <div className="flex flex-row gap-6 justify-center items-center">
            <ProfilePic pictureUrl={pictureUrl} className="w-14 h-14" />
            <div className="flex flex-col gap-2 justify-center">
              <p className="text-lg font-medium leading-5 text-gray-900 truncate">{name}</p>
              <p className="text-sm font-medium leading-5 italic text-secondaryDark truncate">{username}</p>
              <div className="flex flex-row gap-2 items-center">
                <FontAwesomeIcon icon={getOrDefault(profileIcons, role, 'User/YoungPeople')} />
                <p className="text-sm font-medium leading-5 truncate">{role}</p>
              </div>
            </div>
          </div>
          <p className="font-bold text-secondaryDark">View Profile</p>
        </DropdownMenuCustomLink>
        {/* Links */}
        {getOrDefault(profileMenuLinks, role, 'User/YoungPeople').map(({ icon, text, url }) => (
          <DropdownMenuIconLink key={text} icon={icon} text={text} url={url} />
        ))}
        <DropdownMenuIconLink icon={faSignOutAlt} text="Logout" url="/" onClick={onLogout} />
      </DropdownMenu>
    </div >
  );
};


/**
 * A component that displays a tab bar or dropdown menu on the left side of the header (depending on screen size). The menu contains a list of links to different pages
 * @param role The role of the current user
 */
const NavMenu = ({ role }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [links, setLinks] = useState([]);


  // For opening the menu
  const handleMenuClick = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);


  // Get the list of links to display in the menu based on the user's role
  useEffect(() => {
    setLinks(getOrDefault(navMenuLinks, role, 'User/YoungPeople'));
  }, [role]);


  return (
    <>
      {/* Dropdown menu shown when the screen is too small */}
      <div className="relative basis-1/3 flex-1 flex md:hidden flex-row items-center">
        {/* Button to open the menu */}
        <button
          className="flex flex-row items-center justify-center gap-2 h-full p-6 bg-white hover:bg-lighter"
          onClick={handleMenuClick}
        >
          <FontAwesomeIcon icon={faBars} className={`text-black transition ${isMenuOpen ? 'rotate-90' : ''}`} />
        </button>
        {/* Menu */}
        <DropdownMenu className="top-16 left-0 origin-top-left" isOpen={isMenuOpen} onCloseClick={handleMenuClick}>
          {links.map(({ icon, text, url }) => (
            <DropdownMenuIconLink key={text} icon={icon} text={text} url={url} />
          ))}
        </DropdownMenu>
      </div>
       {/* Tab bar is only shown when the screen is wide enough */}
      <IconLinkTabBar className="basis-1/3 flex-1 hidden md:flex" links={links} />
    </>
  );
};


/**
 * Page header component
 */
const Header = () => {
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  // const [role, setRole] = useState('');
  const role = getRole();
  const [pictureUrl, setPictureUrl] = useState('');

  const router = useRouter();


  // Fetch current user id from backend
  useEffect(() => {
    getCurrentUser(({ id, username }) => {
      setId(id);
      setUsername(username);
    }, router);
  });


  // Fetch current user role from backend
  useEffect(() => {
    if (!id) return;

    get(`api/app/profile/${id}`)
      .then((data) => {
        console.debug(data);
        // cookie in CookieStorage
        setRole(data.role);
        setName(`${data.first_name} ${data.last_name}`);
        // setRole(data.role);
        setPictureUrl(data.profile_picture);
        console.log('role',role)
      })
      .catch((e) => {
        console.error(errorMsg);
      });
  }, [id]);


  const handleLogout = useCallback(
    async (e) => {
      // e.preventDefault();

      try {
        deleteAccessToken();
        router.push('/');
      } catch (error) {
        console.error(error);
      }
    }, [router]);


  return (
    <header className="flex flex-row items-stretch justify-between m-h-16 mb-8 bg-white shadow-md">
      <NavMenu role={role} />
      <a className="flex-none flex flex-col justify-center text-xl text-center text-black font-semibold font-heading" href="#">
        <h1>{CONSTANTS.SITE_NAME}
        {role === CONSTANTS.CURRENT_USER_ROLE ? (
        <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">Company</span>
      ):null }
        </h1>
      </a>
       <UserMenu name={name} username={username} role={role} pictureUrl={pictureUrl} onLogout={handleLogout} className="basis-1/3 flex-1 justify-end" />
    </header>
  );
};

export default Header;