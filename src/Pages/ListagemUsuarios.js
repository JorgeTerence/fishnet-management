import React, { useContext } from "react";
import { TitleContext } from "../App";

const ListagemUsuarios = () => {
  const setTitle = useContext(TitleContext);
  setTitle("Usuários");
  return (
    <>
      <h1>Em desenvolvimento</h1>
    </>
  );
};

export default ListagemUsuarios;
