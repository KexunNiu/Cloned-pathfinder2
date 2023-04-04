// Title for items in profile.
const Header = ({ name }) => (
  <h1 className="mb-6 text-5xl font-bold tracking-tighter">{name}</h1>
);

Header.defaultProps = {
  name: '',
};

export default Header;
