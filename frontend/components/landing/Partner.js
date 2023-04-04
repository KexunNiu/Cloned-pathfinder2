import Link from 'next/link';

/**
 * Getting involved as a company
 */
const Partner = () => {
  return (
    <div className="flex items-center justify-center min-h-[65vh] mb-12 bg-center bg-primary">
      <div>
        <h2 className="text-7xl font-bold text-center p-5 justify-between">Partner with us!</h2>
        <p className="py-5 text-4xl p-5 text-center justify-center grid grid-cols-1">
          Lots of ways to get involved in the community
          <Link href={'/companySignup'}>
            <div className="mt-10">
              <button className="bg-secondaryDark hover:bg-secondary text-white font-bold mt-8w-full mb-4 py-6 px-12 rounded focus:outline-none focus:shadow-outline transition">
                Create opportunities <br /> as a company
              </button>
            </div>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Partner;
