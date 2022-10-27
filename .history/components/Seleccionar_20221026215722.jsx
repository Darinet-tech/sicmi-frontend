import { Spacer, Textarea, Grid } from "@nextui-org/react";
import React from "react";
import Select from "react-select";
import  styles  from "../styles/seleccionar.module.css";

const unidadOrganizativa = [
  { label: "Unidad Organizativa 1", value: "uo1" },
  { label: "Unidad Organizativa 2", value: "uo2" },
  { label: "Unidad Organizativa 3", value: "uo3" },
];
const nombreInmueble = [
  { label: "Inmueble 1", value: "i1" },
  { label: "Inmueble 2", value: "i2" },
  { label: "Inmueble 3", value: "i3" },
];

const areaSolicitante = [
  { label: "Área 1", value: "a1" },
  { label: "Área 2", value: "a2" },
  { label: "Área 3", value: "a3" },
];

const centroCosto = [
  { label: "12RP1001", value: "cc1" },
  { label: "12RP1002", value: "cc2" },
  { label: "12RP1003", value: "cc3" },
];

const localIncidencia = [
  { label: "Local 1", value: "l1" },
  { label: "Local 2", value: "l2" },
  { label: "Local 3", value: "l3" },
];

export const Seleccionar = () => {
  const handleSelectChange = ({ value }) => {
    console.log(value);
  };
  return (
    <div style={{ margin: "auto", width: "100%" }} >
      <Select
        defaultValue={{ label: "Unidad Organizativa" }}
        options = {unidadOrganizativa}
        onChange = { handleSelectChange }
        className={styles.select}
      />
      <Spacer></Spacer>
      <Select
        defaultValue={{ label: "Nombre del Inmueble" }}
        options = {nombreInmueble}
        onChange = { handleSelectChange }
        className={styles.select}
      />
      <Spacer></Spacer>
      <Select
        defaultValue={{ label: "Área solicitante" }}
        options = {areaSolicitante}
        onChange = { handleSelectChange }
        className={styles.select}
      />
      <Spacer></Spacer>
      <Select
        defaultValue={{ label: "Centro de Costo" }}
        options = {centroCosto}
        onChange = { handleSelectChange }
        className={styles.select}
      />
      <Spacer></Spacer>
      <Select      
        defaultValue={{ label: "Local donde ocurre la incidencia" }}
        options = {localIncidencia}
        onChange = { handleSelectChange }
        className={styles.select}
      />
      <Grid.Container gap={2.5} css={{ mt: "4px", padding: "0" }}>
        <Grid>
          <Textarea
            bordered
            color="white"
            status="white"
            helperColor="white"
            helperText="*Opcional"
            label="Descripción de las afectaciones"
            placeholder="Introduzca una breve descripción de la deficiencia o afectación"
            width="400px"
          />
        </Grid>
      </Grid.Container>
    </div>
  );
};
