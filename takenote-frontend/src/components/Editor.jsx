import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Editor.css";

class Editor extends Component {
  state = {
    content: "",
    newNote: "",
    noteId: "",
    loading: false,
    errorMessage: ""
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      content: nextProps.content,
      newNote: nextProps.newNote,
      noteId: nextProps.noteId
    });
  }

  handleOnChange = event => {
    this.setState({ content: event });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    if (this.state.newNote) {
      //If create a new note
      fetch("http://localhost:3001/api/notes/create-note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          content: this.state.content,
          author: this.props.author
        })
      })
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          if (!responseData.success) {
            this.setState({
              loading: false,
              errorMessage: responseData.message
            });
          } else {
            window.location.href = "/";
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({
            loading: false,
            errorMessage: err.message
          });
        });
    } else {
      //If edit a note
      fetch("http://localhost:3001/api/notes/edit-note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          content: this.state.content,
          noteId: this.state.noteId
        })
      })
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          if (!responseData.success) {
            this.setState({
              loading: false,
              errorMessage: responseData.message
            });
          } else {
            window.location.href = "/";
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({
            loading: false,
            errorMessage: err.message
          });
        });
    }
  };

  handleClose = event => {
    // event.preventDefault();
    // this.setState({
    //   content: "",
    //   newNote: undefined,
    //   loading: false,
    //   errorMessage: ""
    // });
    this.props.hideEditor();
  };

  render() {
    const showHideClassName = this.props.showEditor
      ? "modal display-block"
      : "modal display-none";
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <form className="form-group" onSubmit={this.handleSubmit}>
            <p className="text-danger">{this.state.errorMessage}</p>
            <ReactQuill
              className="react-quill"
              modules={Editor.modules}
              placeholder="Your note"
              value={this.state.content}
              onChange={this.handleOnChange}
            ></ReactQuill>
            <div className="button-group">
              <button type="submit">Save</button>
              <button
                type="button"
                id="close-button"
                onClick={this.handleClose}
              >
                Close
              </button>
            </div>
          </form>
        </section>
      </div>
    );
  }
}

Editor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"]
  ]
};

export default Editor;
