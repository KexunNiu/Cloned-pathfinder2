import SectionTitle from './SectionTitle'

//The component for the Background and Description in profile
const LongForm = ({ formTitle, content }) => (
  <div
    className="items-center justify-between"
    style={{ margin: 'auto', marginTop: '15px' }}
  >
    <SectionTitle title={formTitle} />
    <p className="text-md h-48 mt-3 font-medium">{content}</p>
  </div>
)

LongForm.defaultProps = {
  formTitle: true,
  content: true,
}

export default LongForm
