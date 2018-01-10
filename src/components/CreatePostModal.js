import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

const validate = values => {

    const errors = {};

    if (!values.author) {
        errors.author = 'Post author'
    }

    if (!values.title) {
        errors.title = 'Post title'
    }

    if (!values.category) {
        errors.category = 'Post category'
    }

    if (!values.body) {
        errors.body = 'At least some text'
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
        <div className="error">{`*${error} is required!`} </div> }
    </div>
  </div>

const renderSelectField = ({
  input,
  label,
  type,
  className,
  meta: { touched, error },
  children
}) =>
<div>
  <label>{ label }</label>
  <div>
    <select className={ className } { ...input }>
      {children}
    </select>
    { touched && error &&
      <div className="error">{`*${error} is required!`} </div> }
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

class CreatePostModal extends Component {

  render() {

    const { handleSubmit, categories } = this.props

    return (
      <form onSubmit={handleSubmit} className="post-form">
      <Field
        name="category"
        component={renderSelectField}
        type="select"
        className="post-form-category"
        label="Category"
      >
        {categories.filter((category) =>
        category.name !== "all").map((category, index) => (
          <option
            value={category.name}
            key={index}>{category.name}
          </option>
        ))}
      </Field>
        <Field
          name="author"
          type="text"
          placeholder="Your Name"
          className="post-form-author"
          label="Author"
          component={renderInputField}
        />
        <Field
          name="title"
          component={renderInputField}
          type="text"
          placeholder="Post title"
          className="post-form-title"
          label="Title"
        />
        <Field
          name="body"
          type="text"
          placeholder="Your comment"
          className="post-form-body"
          component={renderTextareaField}
          label="content"
        />
        <button type="submit" className="post-form-button">Submit</button>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

CreatePostModal = connect(
  mapStateToProps
)(CreatePostModal)

export default reduxForm({
  form: 'postForm',
  validate
})(CreatePostModal)
