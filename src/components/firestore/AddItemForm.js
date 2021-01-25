import React, { useState } from "react";
import { firebase } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext"
import { Form, Button, Card, Row } from "react-bootstrap"
import { timeStrToMins, minsToStrTime } from "./time-util";
import ItemForm from "./ItemForm"

const AddItemForm = () => {

  const { currentUser } = useAuth()
  const [dayStart, setDayStart] = useState("");
  const [dayStartS, setDayStartS] = useState(480)
  const [lunchStart, setLunchStart] = useState("");
  const [lunchStartS, setLunchStartS] = useState(720)
  const [lunchEnd, setLunchEnd] = useState("");
  const [lunchEndS, setLunchEndS] = useState(780)
  const [dayEnd, setDayEnd] = useState("");
  const [dayEndS, setDayEndS] = useState(1020)
  const [verify, setVerify] = useState("")
  const [verifyText, setVerifyText] = useState("")
  const dailyRequired = 8 * 60
  let date = Date.now()
  let overTime = ""
  
  
  function fnDayStart(e) {
    setDayStart(e)
    setDayStartS(timeStrToMins(e))
  }
  function fnLunchStart(e) {
    setLunchStart(e)
    setLunchStartS(timeStrToMins(e))
  }
  function fnLunchEnd(e) {
    setLunchEnd(e)
    setLunchEndS(timeStrToMins((e)))
  }
  function fnDayEnd(e) {
    setDayEnd(e)
    setDayEndS(timeStrToMins(e))
  }
  function tip(addClass, addText) {
    setTimeout(() => {
      setVerify("")
      setVerifyText("")
    }, 4000);
    setVerify(addClass)
    setVerifyText(addText)
  }
  
  const calcDaySummary = (e) => {
    e.preventDefault()
    overTime = dayEndS - dayStartS - (lunchEndS - lunchStartS);
    overTime = overTime - dailyRequired
    validation()
  }
  
  const validation = () => {
    if(!lunchStart ||
       !lunchEnd ||
       !dayStart ||
       !dayEnd
      ){
      tip("is-invalid", "Por favor, preencha todos os campos")
    }else{
      if(dayStartS >= lunchStartS ||
         lunchStartS >= lunchEndS ||
         dayStartS >= dayEndS ||
         lunchEndS >= dayEndS ||
         dayStartS < 480 ||
         overTime > 120
         ){
        tip("is-invalid", "Por favor, verifique os horários digitados e tente novamente.")
      }else{
        overTime = minsToStrTime(overTime)
        submit()
      }
    }
  }
  
  const submit = () => {
    firebase
      .firestore()
      .collection(currentUser.uid)
      .add({
        dayStart,
        lunchStart,
        lunchEnd,
        dayEnd,
        overTime,
        date
      })
      .then(() => setDayStart(""), setLunchStart(""), setLunchEnd(""), setDayEnd(""), overTime = "")
      tip("is-valid", "Horários registrados com sucesso!");
  };
 

  return (
    <Card>
      <Card.Body>
        <h3>Adicionar horários</h3>
        <Form onSubmit={calcDaySummary}>
          <Row>
            <ItemForm className={verify} title="Início do dia" type="text" placeholder="-- : --" value={dayStart} name="dayStart" actions={fnDayStart} />
            <ItemForm className={verify} title="Início do almoço" type="text" placeholder="-- : --" value={lunchStart} name="lunchStart" actions={fnLunchStart} />
            <ItemForm className={verify} title="Fim do almoço" type="text" placeholder="-- : --" value={lunchEnd} name="lunchEnd" actions={fnLunchEnd} />
            <ItemForm className={verify} title="Fim do dia" type="text" placeholder="-- : --" value={dayEnd} name="dayEnd" actions={fnDayEnd} />
          </Row>
          <p id="verifyText">{verifyText}</p>
          <Button className="float-right" type="onSubmit">Salvar</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
export default AddItemForm;