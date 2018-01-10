import React from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = values => {

    const errors = {};

    if (!values.author) {
        errors.author = 'Please enter your name'
    }

    if (!values.body) {
        errors.body = 'Please add comment'
    }

    return errors
}

const renderInputField = ({
  input,
  label,
  placeholder,
  type,
  className,
  meta: { touched, error }
}) =>
  <div>
    <label>{ label }</label>
    <div>
      <input { ...input } placeholder={ placeholder } type={ type } className={ className }/>
      { touched && error &&
        <div className="error">{`*${error}`} </div> }
    </div>
  </div>

const renderTextareaField = ({
  input,
  label,
  placeholder,
  type,
  className,
  meta: { touched, error }
}) =>
  <div>
    <label>{ label }</label>
    <div>
      <textarea { ...input } placeholder={ placeholder } type={ type } className={ className }/>
      { touched && error &&
        <div className="error">{`*${error} is required!`} </div> }
    </div>
  </div>

const AddCommentModal = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <Field
        name="author"
        type="text"
        placeholder="Your Name"
        label="Name"
        component={renderInputField}
      />
      <Field
        name="body"
        type="text"
        placeholder="Your comment"
        component={renderTextareaField}
        label="comment"
      />
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'commentForm',
  validate
})(AddCommentModal)
