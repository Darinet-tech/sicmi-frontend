import React from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Modal, Button, Grid, Table, Text } from "@nextui-org/react";
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
        fullScreen
        ref={componentRef}
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Body css={{ paddingBottom: "80px" }}>
          <div ref={componentRef} style={{ margin: "10px" }}>
            <div style={{ textAlign: "center" }}>
              <h5>ANEXO 1 REG.1-PE-SG-020/18</h5>
              <h5>SOLICITUD DEL SERVICIO DE MANTENIMIENTO</h5>
            </div>
            <table border="1px" width="100%">
              <thead>
                <tr>
                  <td>
                    <Text h5 css={{ textAlign: "center" }}>
                      REG.1-PE-SG-020/18 SOLICITUD DEL SERVICIO DE MANTENIMIENTO
                    </Text>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Text h6>Unidad Organizativa:</Text>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Text h6>Nombre del Inmueble:</Text>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Text h6>Área solicitante:</Text>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Text h6>Centro de Costo:</Text>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Text h6>Local donde ocurre la incidencia:</Text>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Text h6>Descripción de las afectaciones:</Text>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Text h6>
                      Descripcionsadasdasdasdasdasdasdasdasdasdasdasdad
                    </Text>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Text h6 css={{ float: "left" }}>
                      Elaborado por:
                    </Text>
                    <tr 
                        <Text h6>Firma:</Text>
                      </td>
                    </tr>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Text h6>Nombre y Apellidos:</Text>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Text h6>Cargo:</Text>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Text h6>Fecha:</Text>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
