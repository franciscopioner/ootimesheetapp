import React from "react";
import ItemList from "./ItemList";
import AddItemForm from "./AddItemForm";
import Menu from "../menu/Menu"

const Panel = () => {
  return (
    <div>
      <Menu />
      <h3>Lista dos dias trabalhados</h3>
      <ItemList />
      <AddItemForm />
    </div>
  );
};

export default Panel;