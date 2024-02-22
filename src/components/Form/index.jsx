import "./Form.less";

const Form = ({ children, isButtonDisabled, buttonText, submit }) => {
  return (
    <form action="#" className="form" onSubmit={submit} noValidate>
      <div className="form__group">{children}</div>

      <button
        type="submit"
        className={`form__button ${
          isButtonDisabled ? "form__button_disabled" : ""
        }`}
        disabled={isButtonDisabled}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default Form;
