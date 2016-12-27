export const renderField = ({ input, label, type, placeholder, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={placeholder ? placeholder : label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

export const renderSelect = ({ input, label, options, onChange, disabled, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <select {...input}>
      <option>请选择</option>
      {
        options.map( (item, index) => {
            return (
              <option key={item.key} value={item.key}>{item.value}</option>
            )
        } )
      }
      </select>
      {touched && ((error && <span>{error}</span>) || (warning && <span>warn{warning}</span>))}
    </div>
  </div>
)

export const renderTextarea = ({ input, label, type, placeholder, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <textarea {...input} placeholder={placeholder ? placeholder : label}></textarea>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

export const renderCheckbox = ({ input, label, type, placeholder, meta: { touched, error, warning } }) => (
  <label><input {...input} />{label}</label>
)

export default renderField;