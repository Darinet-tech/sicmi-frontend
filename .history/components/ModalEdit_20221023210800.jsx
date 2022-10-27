import React from "react";
import { Modal, Button, Text, Row, Col, Tooltip } from "@nextui-org/react";

import styles from "../styles/modals.module.css";
import { Seleccionar } from "./Seleccionar";
import { EditIcon, IconButton } from "./icons";

export function ModalEdit() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  return (
    <div className={styles.container}>
      <Row justify="center" align="center">
        <Col css={{ d: "flex" }}>
          <Tooltip content="Editar" color="success">
            <IconButton onClick={handler}>
              <EditIcon size={20} fill="#32cd32" />
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
            Welcome to
            <Text b size={18}>
              NextUI
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Seleccionar />
        </Modal.Body>
        <Modal.Footer>
          <Button auto color="success" onClick={closeHandler}>
            GUARDAR
          </Button>
          <Button auto color="error" onClick={closeHandler}>
            CANCELAR
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
