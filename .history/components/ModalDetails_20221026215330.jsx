import React from "react";
import {
  Modal,
  Button,
  Text,
  Row,
  Col,
  Tooltip,
} from "@nextui-org/react";

import { IconButton, EyeIcon } from "./icons";
import { TablaUsuario } from "./TablaUsuario";

export function ModalDetails() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  return (
    <div style={{width: 100%;}}>
      <Row justify="center" align="center">
        <Col css={{ d: "flex" }}>
          <Tooltip content="Detalles" color="primary">
            <IconButton onClick={handler}>
              <EyeIcon size={20} fill="#0000ff" />
            </IconButton>
          </Tooltip>
        </Col>
      </Row>

      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        width="100%"
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            DETALLES
          </Text>
        </Modal.Header>
        <Modal.Body>
          
          <TablaUsuario />
        </Modal.Body>
        <Modal.Footer>
          <Button auto color="error" onClick={closeHandler}>
            CERRAR
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
