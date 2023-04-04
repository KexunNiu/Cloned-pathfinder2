import Link from 'next/link';

/**
 * Button to go to a specific page
 */
const LinkButton = ({ name, link, title = '', top = false, disabled = false }) => {
  if (top) {
    return (
      <Link href={link}>
        <button
          title={title}
          className="bg-secondaryDark hover:bg-secondary text-white shadow-xl px-4 py-2 font-bold rounded focus:outline-none focus:shadow-outline"
        >
          {name}
        </button>
      </Link>
    );
  } else if (disabled) {
    return (
      <div className="mt-10">
        <button
          title={title}
          className="bg-grey text-white font-bold mt-8w-full mb-4 py-2 px-6 rounded focus:outline-none transition"
          disabled
        >
          {name}
        </button>
      </div>
    );
  }

  return (
    <Link href={link}>
      <div className="mt-10">
        <button
          title={title}
          className="cursor-pointer bg-secondaryDark hover:bg-secondary text-white shadow-xl font-bold mt-8w-full mb-4 py-2 px-6 rounded focus:outline-none focus:shadow-outline transition"
        >
          {name}
        </button>
      </div>
    </Link>
  );
};


export default LinkButton;
