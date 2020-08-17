// @flow

import React from "react";
import ace from "ace-builds";
import AceEditor from "react-ace";
import "./YamlEditor.scss";
import extendModes from "./extendModes";

extendModes(ace);

type Props = {
  onChange?: (string) => any,
  yaml: string,
  width?: string,
  height?: string,
};

export default class YamlEditor extends React.Component<Props> {
  render() {
    return (
      <div className="yamleditor-react-container">
        <div
          style={{ width: this.props.width ? this.props.width : "500px" }}
          className="options"
        ></div>
        <div className="container editor">
          <AceEditor
            mode={"yaml"}
            theme="github"
            onChange={(rawStr: string) => {
              if (this.props.onChange) this.props.onChange(rawStr);
            }}
            editorProps={{
              $blockScrolling: true,
            }}
            value={this.props.yaml}
            width={"100%"}
            height={this.props.height ? this.props.height : "500px"}
          />
        </div>
      </div>
    );
  }
}
