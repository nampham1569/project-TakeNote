import React, { Component } from "react";
import renderHTML from "react-render-html";
import "./Note.css"

export default class Note extends Component {
  render() {
    return (
      <div
        className="note-border"
        style={{
          maxWidth: "300px",
          maxHeight: "350px",
          overflow: "hidden"
        }}
        onClick={() => {
          this.props.clickHandler(this.props.content, this.props.id);
        }}
      >
        {renderHTML(this.props.content)}
      </div>
    );
  }
}
