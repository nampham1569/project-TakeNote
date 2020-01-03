import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Editor from "../components/Editor";
import Note from "../components/Note";
import Masonry from "react-masonry-component";
import "./HomeScreen.css";

const masonryOptions = {
  horizontalOrder: true,
  gutter: 12,
  fitWidth: true
};

export default class HomeScreen extends Component {
  state = {
    isLoggedIn: false,
    currentUser: {
      _id: "",
      email: "",
      firstName: "",
      lastName: ""
    },
    editor: {
      show: false,
      newNote: false,
      content: "",
      noteId: ""
    },
    noteList: [],
  };

  componentDidMount() {
    fetch(`http://localhost:3001/api/notes/`, {
      method: "POST",
      credentials: "include"
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        if (!data.success) {
          this.setState({ isLoggedIn: false });
          window.location.href = "/register";
        } else {
          this.setState({
            isLoggedIn: true,
            currentUser: {
              _id: data.data._id,
              email: data.data.email,
              firstName: data.data.firstName,
              lastName: data.data.lastName
            }
          });
          this.fetchNotes();
          console.log(this.state.currentUser);
          console.log(this.state.editor);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  fetchNotes = () => {
    fetch("http://localhost:3001/api/notes/get-notes", {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data.data);
        if (!data.success) {
          console.log(data.message);
        } else {
          this.setState(prevState => ({
            ...prevState,
            noteList: data.data,
          }));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  createNote = () => {
    console.log(this.state);
    this.setState(prevState => ({
      editor: {
        ...prevState.editor,
        newNote: true
      }
    }));
    this.showEditor();
  };

  editNote = (content, id) => {
    console.log(content, id);
    this.setState(prevState => ({
      editor: {
        ...prevState.editor,
        newNote: false,
        content: content,
        noteId: id
      }
    }));
    this.showEditor();
  };

  showEditor = () => {
    this.setState(
      prevState => ({
        editor: {
          ...prevState.editor,
          show: true
        }
      }),
      () => {
        console.log(this.state.editor);
      }
    );
  };

  hideEditor = () => {
    this.setState(
      prevState => ({
        editor: {
          ...prevState.editor,
          show: false,
          newNote: false,
          content: "",
          noteId: ""
        }
      }),
      () => {
        console.log(this.state.editor);
      }
    );
  };

  render() {
    const childNotes = this.state.noteList.map(note => {
      return (
        <Note
          clickHandler={this.editNote}
          content={note.content}
          key={note._id}
          id={note._id}
        ></Note>
      );
    });

    return (
      <div>
        {this.state.isLoggedIn ? (
          <>
            <Navbar currentUser={this.state.currentUser}></Navbar>
            <div style={{ width: "100%", textAlign: "center" }}>
              <input
                id="createNote"
                placeholder="Add note"
                onClick={this.createNote}
              ></input>
            </div>

            <Editor
              showEditor={this.state.editor.show}
              hideEditor={this.hideEditor}
              content={this.state.editor.content}
              newNote={this.state.editor.newNote}
              author={this.state.currentUser._id}
              noteId={this.state.editor.noteId}
            ></Editor>
            <div className="masonry-container">
              <Masonry options={masonryOptions} className="list-all-notes">
                {childNotes}
              </Masonry>
            </div>
          </>
        ) : null}
      </div>
    );
  }
}
