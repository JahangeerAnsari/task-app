import React from "react";
import { Form } from "react-bootstrap";

/**
 * @author
 * @function InputField
 **/

const InputField = (props) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{props.label}</Form.Label>
        <Form.Control
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
      </Form.Group>
    </Form>
  );
};

export default InputField;
