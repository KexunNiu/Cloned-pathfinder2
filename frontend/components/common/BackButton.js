import { useRouter } from 'next/router';

/**
 * Button to go back to previous page
 */
const BackButton = ({ name }) => {
  const router = useRouter();
  return (
    <button
      className="bg-secondaryDark hover:bg-secondary text-white shadow-xl px-4 py-2 font-bold rounded focus:outline-none focus:shadow-outline"
      type="button"
      aria-label="Back Button"
      onClick={() => router.back()}
    >
      {'<'} {name}
    </button>
  );
};


BackButton.defaultProps = {
  name: 'Back',
};

export default BackButton;
