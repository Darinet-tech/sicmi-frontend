import React from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
export default function ModeloSolicitud({ componentRef }) {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  const componentRef = useRef();
  const handlePrintModelo = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Listado-Solicitudes",
    onAfterPrint: () => {
      console.log("Reporte Listado de Solicitudes generado exitosamente");
    },
  });
  return (
    <div>
      <Button auto shadow onClick={handler}>
        Open modal
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header></Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
