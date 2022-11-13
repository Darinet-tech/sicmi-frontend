import React from "react";
import { useRef, useState } from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";


export default function ModeloSolicitud() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Listado-Solicitudes",
    onAfterPrint: () => {
      console.log("Reporte Listado de Solicitudes generado exitosamente");
    },
  });
  return (
    <div>
      <Button auto shadow onClick={handler}>
        Mostrar Modelo
      </Button>
      <Modal
        ref={componentRef}
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Button onClick={handlePrint}>Imprimir</Button>
        </Modal.Header>
        <Modal.Body>
          <div ref={componentRef} >
            asdasdadsadasdasdasdasdasdsadasdasd
            asdasdadsadasdasdasdasdasdsadasdasdasd
            asdasdasdasdasd
          </div>
        </Modal.Body>

      </Modal>
    </div>
  );
}
