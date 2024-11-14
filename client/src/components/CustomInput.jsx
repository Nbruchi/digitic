/* eslint-disable react/prop-types */
const CustomInput = ({
  id,
  name,
  type,
  value,
  onBlur,
  onChange,
  disabled,
  className,
  placeholder,
}) => {
  return (
    <>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`form-control ${className}`}
      />
    </>
  );
};

export default CustomInput;
