export const renderField = ({ input, label, type, placeholder, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={placeholder ? placeholder : label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

export const renderSelect = ({ input, label, meta: { touched, error, warning }, options }) => (
  <div>
    <label>{label}</label>
    <div>
      <select {...input}>
      {
        options.map( (item, index) => {
          return (
            <opntion key={item.categoryId} value={item.categoryId}>{item.categoryName}</opntion>
          )
        } )
      }
      </select>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
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

export default renderField;