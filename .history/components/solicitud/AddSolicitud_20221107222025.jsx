import React from "react";
import { Modal, Button, Text, Input } from "@nextui-org/react";
import { fetcher } from "../../lib/api";
import { getTokenFromLocalCookie, getUOFromLocalCookie } from "../../lib/auth";
import { useRouter } from "next/router";

const AddSolicitud = ({ areas, inmuebles }) => {
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";

  const router = useRouter();
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const [solicitud, setSolicitud] = React.useState({
    nombre: "",
    arearesponsable: null,
    inmueble: null,
  });

  const handleChange = (e) => {
    setSolicitud({ ...solicitud, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/solicitudes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ data: solicitud }),
        }
      );
      router.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Button ghost auto onClick={handler}>
        Registrar Solicitud
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
              Registrar Solicitud
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <label>Unidad Organizativa</label>
          <select
            name="unidadorganizativa"
            onChange={handleChange}
            className="dropdown-dark"
          >
            <option>Seleccione una Unidad</option>
            {inmuebles &&
              inmuebles.data &&
              inmuebles.data.map((ccItem) => {
                return (
                  <option key={ccItem.id} value={ccItem.id}>
                    {" "}
                    {ccItem.attributes.descripcion}{" "}
                  </option>
                );
              })}
          </select>
          <Input
            name="nombre"
            onChange={handleChange}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Nombre"
          />

          <label>Area Responsable</label>
          <select
            name="arearesponsable"
            onChange={handleChange}
            className="dropdown-dark"
          >
            <option>Seleccione un area responsable</option>
            {areas &&
              areas.data &&
              areas.data.map((ccItem) => {
                return (
                  <option key={ccItem.id} value={ccItem.id}>
                    {" "}
                    {ccItem.attributes.nombre}{" "}
                  </option>
                );
              })}
          </select>
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

export default AddSolicitud;
