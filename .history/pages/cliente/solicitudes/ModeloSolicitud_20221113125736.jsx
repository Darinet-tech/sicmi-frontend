import React from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Modal, Button, Grid, Table, Text, Image } from "@nextui-org/react";
import { TableBody } from "@mui/material";
import { Row } from "antd";
import solicitudes from ".";

export default function ModeloSolicitud({solicitud}) {
  const [visible, setVisible] = React.useState(false);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Modelo-Solicitudes",
    onAfterPrint: () => {
      console.log("Modelo de Solicitudes generado exitosamente");
    },
  });
  return (
    <div>
      <Button auto light onClick={handlePrint}>
        <Image src="/images/icons8-imprimir-96.png" css={{ width:"25px"}}/>
      </Button>
      <Modal
        fullScreen
        ref={componentRef}
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Body css={{ paddingBottom: "80px" }}>
          
        </Modal.Body>
        <Modal.Footer>
          <Button
            css={{ position: "absolute", right: "10px", bottom: "10px" }}
            auto
            onClick={handlePrint}
          >
            Imprimir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
