import React from "react";
import { Button, Form, Header } from "semantic-ui-react";

const styles = {
  select: {
    fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
    margin: "0",
    outline: "0",
    tapHighlightColor: "rgba(255,255,255,0)",
    lineHeight: "1.21428571em",
    padding: ".67857143em 1em",
    fontSize: "1em",
    background: "#fff",
    border: "1px solid rgba(34,36,38,.15)",
    color: "rgba(0,0,0,.87)",
    borderRadius: ".28571429rem",
    boxShadow: "0 0 0 0 transparent inset",
    transition: "color .1s ease,border-color .1s ease",
    flex: "1 0 auto",
    height: "38px"
  }
};

const ActionInputs = props => {
  const { actions, handleDelete } = props;
  return actions.map((action, index) => {
    const nameId = `actionName${index}`;
    const commandId = `actionCommand${index}`;
    const argsId = `actionArgs${index}`;
    const directoryId = `actionDirectory${index}`;
    const actionTypeId = `actionType${index}`;

    return (
      <div className="action-inputs" key={`actionInput${index}`}>
        <Header key={`header${index}`} content={`Action ${index}`}></Header>
        <Form.Group key={`group1-${index}`} widths="equal">
          <Form.Field>
            <label htmlFor={actionTypeId}>Action Type</label>
            <div className="ui fluid input">
              <select
                name={actionTypeId}
                id={actionTypeId}
                data-id={index}
                defaultValue={action.type}
                className="type"
                style={styles.select}
              >
                <option value="custom">Custom</option>
                <option value="docker">Docker</option>
                <option value="git">Git</option>
                <option value="url">Open URL</option>
                <option value="sr">Create SR Box</option>
              </select>
            </div>
          </Form.Field>
          <Form.Field>
            <label htmlFor={nameId}>Name</label>
            <div className="ui fluid input">
              <input
                type="text"
                id={nameId}
                data-id={index}
                defaultValue={action.name}
                name={nameId}
                className="name"
              />
            </div>
          </Form.Field>
        </Form.Group>
        <Form.Group key={`group2-${index}`} widths="equal">
          <Form.Field>
            <label htmlFor={commandId}>Command</label>
            <div className="ui fluid input">
              <input
                type="text"
                id={commandId}
                data-id={index}
                defaultValue={action.command}
                name={commandId}
                className="command"
              />
            </div>
          </Form.Field>
          <Form.Field>
            <label htmlFor={argsId}>Arguments</label>
            <div className="ui fluid input">
              <input
                type="text"
                id={argsId}
                data-id={index}
                defaultValue={action.args}
                name={argsId}
                className="args"
              />
            </div>
          </Form.Field>
          <Form.Field>
            <label htmlFor={directoryId}>Directory<span style={{ fontSize: "10px", color: "#666666" }}> Add __USER__ in place of os user</span></label>
            <div className="ui fluid input">
              <input
                type="text"
                id={directoryId}
                data-id={index}
                defaultValue={action.directory}
                name={directoryId}
                className="directory"
              />
            </div>
          </Form.Field>
          <Form.Field>
            <Button
              type="button"
              data-id={index}
              icon
              negative
              onClick={handleDelete}
              style={{ margin: "11% 0 0" }}
            >
              <i area-hidden="true" class="close icon" />
            </Button>
          </Form.Field>
        </Form.Group>
      </div>
    );
  });
};

export default ActionInputs;
