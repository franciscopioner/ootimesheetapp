import React, { useState, useEffect } from "react";
import { firebase } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext"
import { Button, Table, Card } from "react-bootstrap"

const ItemList = () => {

  const { currentUser } = useAuth()
  const useItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
      const unsubscribe = firebase
        .firestore() 
        .collection(currentUser.uid)
        .onSnapshot(snapshot => {
          const listItems = snapshot.docs.map(doc => ({
            id: doc.id, 
            ...doc.data() 
          }));
          console.log(listItems)
          setItems(listItems); 
        });
      return () => unsubscribe();
    }, []);
    return items;
  };

  const deleteItem = id => {
    firebase
      .firestore()
      .collection(currentUser.uid)
      .doc(id)
      .delete();
  };
  
  const listItem = useItems();
  const ordenedList = listItem.sort((a, b) => a.date - b.date)
  return (
    <Card>
    <Table>
      <thead>
        <tr>
          <td><strong>Início do dia</strong></td>
          <td><strong>Inicio do almoço</strong></td>
          <td><strong>Fim do almoço</strong></td>
          <td><strong>Fim do dia</strong></td>
          <td><strong>Saldo</strong></td>
          <td></td>
        </tr>
      </thead>
      {ordenedList.length === 0 ?
      <tbody>
        <tr>
          <td colSpan="6" align="center">Sem registros</td>
        </tr>
      </tbody>
      : ordenedList.map(item => (
        <tbody key={item.id}>
          <tr>
            <td>{item.dayStart}</td>
            <td>{item.lunchStart}</td>
            <td>{item.lunchEnd}</td>
            <td>{item.dayEnd}</td>
            <td>{item.overTime}</td>
            <td>
              <Button onClick={() => deleteItem(item.id)}><i class="fas fa-trash"></i></Button>
            </td>
          </tr>
        </tbody>
      ))}
    </Table>
    </Card>
  );
};
export default ItemList;