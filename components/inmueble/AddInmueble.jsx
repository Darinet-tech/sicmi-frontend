import React from "react";
import { Modal, Button, Text, Input } from "@nextui-org/react";
import { fetcher } from "../../lib/api";
import { getTokenFromLocalCookie, getUOFromLocalCookie } from "../../lib/auth";
import { useRouter } from "next/router";

const AddInmueble = ({ centrodecostos }) => {
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";
  const uo = typeof window !== "undefined" ? getUOFromLocalCookie() : "";

  const router = useRouter();
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const [inmueble, setInmueble] = React.useState({
    descripcion: "",
    direccion: "",
    unidadorganizativa: uo,
  });

  const handleChange = (e) => {
    setInmueble({ ...inmueble, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/inmuebles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ data: inmueble }),
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
        Adicionar Inmueble
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
              Adicionar Inmueble
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            name="descripcion"
            onChange={handleChange}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Descripci&oacute;n"
          />
          <Input
            name="direccion"
            onChange={handleChange}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Direcci&oacute;n"
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

export default AddInmueble;
