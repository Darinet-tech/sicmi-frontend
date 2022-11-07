import React from "react";
import { Modal, Button, Text, Input } from "@nextui-org/react";
import { fetcher } from "../../lib/api";
import { getTokenFromLocalCookie, getUOFromLocalCookie } from "../../lib/auth";
import { useRouter } from "next/router";

const AddU = ({ responsables }) => {
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";
  const uo = typeof window !== "undefined" ? getUOFromLocalCookie() : "";

  const router = useRouter();
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const [area, setArea] = React.useState({
    nombre: "",
    responsable: null,
    unidadorganizativa: uo,
  });

  const handleChange = (e) => {
    setArea({ ...area, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/areas`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ data: area }),
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
        Adicionar Area
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
              Adicionar Area
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
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
          <label>Responsable</label>
          <select
            name="responsable"
            onChange={handleChange}
            className="dropdown-dark"
          >
            <option>Seleccione un responsable</option>
            {responsables &&
              responsables.map((ccItem) => {
                return (
                  <option key={ccItem.id} value={ccItem.id}>
                    {" "}
                    {ccItem.username}{" "}
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

export default AddArea;
