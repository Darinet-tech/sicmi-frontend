import React from "react";
import {
  Modal,
  Button,
  Text,
  Row,
  Col,
  Tooltip,
} from "@nextui-org/react";

import styles from "../styles/modals.module.css";
import { IconButton, DeleteIcon } from "./icons";

export function ModalDelete() {
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
          <Tooltip content="Eliminar" color="error">
            <IconButton onClick={handler}>
              <DeleteIcon size={20} fill="red" />
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
      >
        <Modal.Header>
          <Text id="modal-title" size={15}>
            ¿Realmente desea continuar?
          </Text>
        </Modal.Header>

        <Modal.Footer justify="center" align="center">
          <Button auto color="success" onClick={closeHandler}>
            ACEPTAR
          </Button>
          <Button auto color="error" onClick={closeHandler}>
            CANCELAR
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}