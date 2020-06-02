import React, { Component } from "react";

class TimerForm extends Component {
  state = {
    title: !!this.props.task.title ? this.props.task.title : "",
    project: !!this.props.task.project ? this.props.task.project : ""
  };

  handleTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleProjectChange = e => {
    this.setState({ project: e.target.value });
  };

  handleSubmit = () => {
    this.props.onFormSubmit({
      id: this.props.id,
      title: this.state.title,
      project: this.state.project
    });
  };

  render() {
    const submitText = this.props.id ? "Update" : "Create";
    return (
      <div className="row">
        <div className="col-sm-10 mx-auto">
          <div className="form-group">
            <label>Title: </label>
            <input
              aria-describedby="titleHelp"
              className="col-sm-10 col-md-5 mx-auto form-control"
              placeholder="title"
              name="title"
              onChange={this.handleTitleChange}
              type="text"
              value={this.state.title}
            />
            <small id="titleHelp" className="form-text text-muted">
              A title is used to identify your activities
            </small>
          </div>

          <div className="form-group">
            <label>Category: </label>
            <input
              className="col-sm-10 col-md-5 mx-auto form-control"
              placeholder="category"
              name="project"
              onChange={this.handleProjectChange}
              type="text"
              value={this.state.project}
            />
          </div>

          <div className="btn-group my-2">
            <button
              onClick={this.handleSubmit}
              className="btn btn-outline-primary"
            >
              {submitText}
            </button>
            <button
              onClick={this.props.onFormClose}
              className="btn btn-outline-danger"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default TimerForm;
