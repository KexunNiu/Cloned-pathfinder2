import CardItem from './CardItem';

/**
 * Card component in dashboard
 */
const BoardItem = ({ category, items, href, item }) => {
  // Shuffle items to show random items
  const shuffled_items = items.sort(() => 0.5 - Math.random());
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
        
        {shuffled_items.slice(0, 2).map((itemSingle) => {
          // Check if item is a course, opportunity or scholarship
          if (itemSingle.Course !== undefined) {
            item = '/courses'
          } else if (itemSingle.job_skills !== undefined) {
            item = '/opportunity'
          } else if (itemSingle.amount !== undefined) {
            item = '/scholarship'
          }
          return (
            <a href={`${item}/${itemSingle.id}`} key={itemSingle.name}>
              <CardItem
                cat={category}
                title={itemSingle.name || itemSingle.job_title || itemSingle.Course}
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

export default BoardItem;
