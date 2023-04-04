import CardItem from './CardItem';

/**
 * Card component in dashboard
 */
const BoardItems = ({ category, type,items, href, item }) => {

  return (
    <div>
      <div className="mt-10 flex items-stretch justify-between">
        <h1 className="text-base align-baseline text-left"> {category}</h1>
        <a
          className="inline-block align-baseline font-bold text-sm text-secondaryDark text-right hover:text-secondary"
          href={href}
        >
          {'View All >'}
        </a>
      </div>

      <div className="flex flex-row">
        {/* if items is empty show none available */}
        {items.length === 0 ? (
          <h1 className="text-sm text-center text-black font-bold mt-5">{'None Available'}</h1>
        ) : null}
        {/* map for items max 2 */}
        {items.slice(0, 2).map((itemSingle) => {
          return (
            <a href={`${item}/${itemSingle.id}`} key={itemSingle.name}>
               {/* {type === 'job' ? (title=(itemSingle.job_title)):null} */}
              <CardItem
                cat={category}
               
                title={itemSingle.name ? itemSingle.name : itemSingle.job_title}
                img={
                  itemSingle[Object.keys(itemSingle).find((key) => key.includes('picture'))] ?? null
                }
              />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default BoardItems;