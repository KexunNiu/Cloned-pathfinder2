/**
 * Card component
 */
const CardItem = ({ cat, title, img }) => {

  const defaultImg = ''
  {
    cat === "Explore Scholarships" ? (defaultImg = 'defaultSch.png')
    : cat === "Explore Opportunities" ? (defaultImg = 'defaultOpp.png')
      : (defaultImg = 'defaultUser.png')
  }
  return (
    <div className=" group flex flex-col mr-10 mt-5 mx-auto rounded-lg overflow-hidden relative">
      <img
        className="w-60 h-44 group-hover:opacity-80"
        src={img ?? defaultImg}
        layout="fill"
        alt="item background"
      />
      <h2 className="text-sm text-center bg-secondary text-white h-6 group-hover:opacity-80 hover:underline">
        {title}
      </h2>
    </div>
  )
}

export default CardItem
