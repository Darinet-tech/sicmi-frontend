import React from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Modal, Button } from "@nextui-org/react";


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
        <Modal.Body css={{paddingBottom:'80px'}}>
          <div ref={componentRef} >
            <h3>Tipo de solicitud: asd</h3>
            <p>Departamento Capital Humano	</p>
            Pintura Pared Lateral Derecha	2022-11-08		clientedtij
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button css={{position:'absolute',right:'10px',bottom:'10px'}} auto onClick={handlePrint}>Imprimir</Button>
        </Modal.Footer>

      </Modal>
    </div>
  );
}
