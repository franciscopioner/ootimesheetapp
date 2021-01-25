import React from "react"
import { Col, Form } from "react-bootstrap"
import { hour } from "./time-util";

const ItemForm = (props) => {
  
  function setHour(e) {
    let hours = hour(e.currentTarget.value)
    props.actions(hours)
  }
  
    return (
        <Col>
          <Form.Group>
            <Form.Label><strong>{props.title}</strong></Form.Label>
            <Form.Control className={props.className} type={props.type} placeholder={props.placeholder} value={props.value} name={props.name} onChange={e => setHour(e)}
            />
          </Form.Group>
        </Col>
    )
}

export default ItemForm;