import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderComponent(formProps) {
    return (
      <div className="field">
        <label>{formProps.label}</label>
        <input
          onChange={formProps.input.onChange}
          value={formProps.input.value}
        />
      </div>
    );
  }
  onFormSubmit = formValues => {
    this.props.onSubmit(formValues);
  };
  render() {
    return (
      <div className="ui form">
        <form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
          <Field
            name="title"
            component={this.renderComponent}
            label="Enter Title"
          />
          <Field
            name="description"
            component={this.renderComponent}
            label="Enter Description"
          />
          <button className="ui button primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "streamForm"
})(StreamForm);
