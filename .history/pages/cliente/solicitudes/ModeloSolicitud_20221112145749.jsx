import React from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Modal, Button, Grid, Table } from "@nextui-org/react";
import { TableBody } from "@mui/material";
import { Row } from "antd";


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
        width="800px"
        ref={componentRef}
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Body css={{paddingBottom:'80px'}}>
          <div ref={componentRef} style={{margin:'10px'}}>
            <div>
              <h2>ANEXO 1 REG.1-PE-SG-020/18</h2>
              <h2>SOLICITUD DEL SERVICIO DE MANTENIMIENTO</h2>
            </div>
            <Table>
              <Table.Header>
                <Table.Column>
              REG.1-PE-SG-020/18 SOLICITUD DEL SERVICIO DE MANTENIMIENTO
                </Table.Column>
              </Table.Header>
              <Table.Body>
                <Row></Row>
              </Table.Body>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button css={{position:'absolute',right:'10px',bottom:'10px'}} auto onClick={handlePrint}>Imprimir</Button>
        </Modal.Footer>

      </Modal>
    </div>
  );
}
