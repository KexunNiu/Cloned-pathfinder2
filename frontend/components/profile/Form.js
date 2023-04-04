//The component for the short items in profile
import SectionTitle from './SectionTitle';

const Form = ({ formStyle, formTitle, content }) => (
  <div className="items-center justify-between" style={formStyle}>
    <SectionTitle title={formTitle} />
    <p className="text-content h-10 font-bold">{content}</p>
  </div>
);

Form.defaultProps = {
  formStyle: {},
  formTitle: '',
  content: '',
};

export default Form;
