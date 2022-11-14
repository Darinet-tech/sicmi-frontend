import React from "react";
import { Modal, Button, Text, Input, Textarea } from "@nextui-org/react";
import { fetcher } from "../../lib/api";
import { useRouter } from "next/router";
import { getTokenFromLocalCookie } from "../../lib/auth";

const AddOrdenDeTrabajo = ({ idsolicitud, tiposmtto, enableOrdenTrabajo }) => {
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";
  const router = useRouter();
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const [orden, setOrden] = React.useState({
    solicitud: idsolicitud,
    tipo_mtto: null,
    numerodeorden: "",
    observaciones: "",
    fecha_ini: new Date(),
  });

  const handleChange = (e) => {
    setOrden({ ...orden, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/orden-de-trabajos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ data: orden }),
        }
      );
      router.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Button ghost auto disabled={!enableOrdenTrabajo} onClick={handler}>
        Registrar Orden de Trabajo
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              Registrar Orden de Trabajo
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <label>Tipo de Mantenimiento</label>
          <select
            name="tipo_mtto"
            onChange={handleChange}
            className="dropdown-dark"
          >
            <option>Seleccione un Tipo de Mantenimiento</option>
            {tiposmtto &&
              tiposmtto.data &&
              tiposmtto.data.map((ccItem) => {
                return (
                  <option key={ccItem.id} value={ccItem.id}>
                    {" "}
                    {ccItem.attributes.tipo}{" "}
                  </option>
                );
              })}
          </select>
          <Input
            label="N&uacute;mero de Orden"
            name="numerodeorden"
            onChange={handleChange}
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="N&uacute;mero de Orden"
          />
          <Textarea
            label="Observaciones"
            name="observaciones"
            onChange={handleChange}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Observaciones"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto onClick={closeHandler} color="error">
            Cancelar
          </Button>
          <Button auto onClick={handleSubmit} color="success">
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddOrdenDeTrabajo;
