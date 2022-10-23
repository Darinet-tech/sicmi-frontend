import { Spacer, styled } from "@nextui-org/react";
import React from "react";
import Select from "react-select";
import  styles  from "../styles/seleccionar.module.css";

const solicitud = [
  { label: "Lámpara fundida", value: "lf" },
  { label: "Tubería partida", value: "tp" },
  { label: "Pintura en mal estado", value: "pme" },
  { label: "Baño tupido", value: "bt" },
];

export const Seleccionar = () => {
  const handleSelectChange = ({ value }) => {
    console.log(value);
  };
  return (
    <div className={styles.seleccionar_container} >
      <Select
        defaultValue={{ label: "Seleccione Inmueble" }}
        options = {solicitud}
        onChange = { handleSelectChange }
        className={styles.select}
      />
      <Spacer></Spacer>
      <Select
        defaultValue={{ label: "Seleccione C.C." }}
        options = {solicitud}
        onChange = { handleSelectChange }
        className={styles.select}
      />
      <Spacer></Spacer>
      <Select
        defaultValue={{ label: "Seleccione" }}
        options = {solicitud}
        onChange = { handleSelectChange }
        className={styles.select}
      />
    </div>
  );
};
