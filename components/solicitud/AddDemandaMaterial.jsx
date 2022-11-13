import React from "react";
import { Modal, Button, Text, Input, Textarea } from "@nextui-org/react";
import { fetcher } from "../../lib/api";
import { getIdFromLocalCookie, getTokenFromLocalCookie } from "../../lib/auth";
import { useRouter } from "next/router";

const AddDemandaMaterial = ({ idsolicitud, recursosnorelacionados }) => {
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";
  const router = useRouter();
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const [demanda, setDemanda] = React.useState({
    solicitud: idsolicitud,
    recurso: null,
    demanda: 0,
  });

  const handleChange = (e) => {
    setDemanda({ ...demanda, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/demanda-recursos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ data: demanda }),
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
        Registrar Demanda de Material
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
              Registrar Demanda de Material
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <label>Recurso</label>
          <select
            name="recurso"
            onChange={handleChange}
            className="dropdown-dark"
          >
            <option>Seleccione un Recurso</option>
            {recursosnorelacionados &&
              recursosnorelacionados.data &&
              recursosnorelacionados.data.map((ccItem) => {
                return (
                  <option key={ccItem.id} value={ccItem.id}>
                    {" "}
                    {ccItem.attributes.nomenclador}{" "}
                  </option>
                );
              })}
          </select>
          <Input
            label="Demanda"
            name="demanda"
            onChange={handleChange}
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Demanda"
            type="number"
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

export default AddDemandaMaterial;
