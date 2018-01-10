import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

const validate = values => {

    const errors = {};

    if (!values.title) {
        errors.title = 'Add a title'
    }

    if (!values.body) {
        errors.body = 'Add some comment'
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

class UpdatePostModal extends Component {

  render() {

    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit} className="post-form">
        <Field
          name="title"
          component={renderInputField}
          type="text"
          placeholder="Post title"
          className="Update-post-title"
          label="Title"
        />
        <Field
          name="body"
          type="text"
          placeholder="comment....."
          className="update-post-body"
          component={renderTextareaField}
          label="Comments"
        />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

UpdatePostModal = connect(
  mapStateToProps
)(UpdatePostModal)

export default reduxForm({
  form: 'postForm',
  validate
})(UpdatePostModal)
