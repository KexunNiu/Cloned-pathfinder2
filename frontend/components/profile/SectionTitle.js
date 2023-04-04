//Title for some sections
const SectionTitle = ({ title }) => (
  <h2 className="text-3xl font-bold leading-none tracking-tighter mb-2.5">{title}</h2>
)

SectionTitle.defaultProps = {
  title: true,
}

export default SectionTitle
