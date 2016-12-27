export const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="step_form_row">
    <label className="step_form_row_label step_form_row_label_icon">{label} <i className="iconfont icon-edit"></i></label>
    <div className="step_form_row_right">
      <input {...input} placeholder={label} type={type} className="step_form_row_right_inputT"/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

export const renderTextArea = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="step_form_row">
    <label className="step_form_row_label">{label}</label>
    <div className="step_form_row_right">
      <textarea {...input} placeholder={label} className="step_form_row_right_textarea"></textarea>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

export const renderSelect = ({ input, label, meta: { touched, error, warning }, children }) => (
  <div className="step_form_row">
    <label className="step_form_row_label">{label}</label>
    <div className="step_form_row_right">
      <select {...input} className="step_form_row_right_select">
        {children}
      </select>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)


export default renderField;