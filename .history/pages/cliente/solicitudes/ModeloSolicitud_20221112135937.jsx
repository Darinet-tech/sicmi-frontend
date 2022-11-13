 import { Modal } from "@nextui-org/react";

export default function ModeloSolicitud({componentRef}) {
  return (
    <Modal ref={componentRef}>
      <Modal.Header>Hola</Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  )
}
