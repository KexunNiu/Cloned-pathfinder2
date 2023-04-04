//The component for the short items in profile
import SectionTitle from '../profile/SectionTitle';

const Form = ({ formStyle, formTitle, content, href }) => (
  <div className="items-center justify-between" style={formStyle}>
    <SectionTitle title={formTitle} />
    <a className="text-secondaryDark underline mt-3" href={href}>
      {href}
    </a>
    <p className="text-md h-10 mt-3 font-medium">{content}</p>
  </div>
);

Form.defaultProps = {
  formStyle: {},
  formTitle: '',
};

export default Form;
