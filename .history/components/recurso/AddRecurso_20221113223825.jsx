import React from "react";
import { Modal, Button, Text, Input } from "@nextui-org/react";
import { useRouter } from "next/router";

import { fetcher } from "../../lib/api";
import { getTokenFromLocalCookie } from "../../lib/auth";

const AddRecurso = ({}) => {
  const router = useRouter();
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";

  const [recurso, setRecurso] = React.useState({
    codigo: "",
    nomenclador: "",
    precio: 0,
    libreutilizacion: 0,
    unidaddemedida: ""
  });

  const handleChange = (e) => {
    setRecurso({ ...recurso, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/recursos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ data: recurso }),
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
        Adicionar Recurso
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
              Adicionar Recurso
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            name="codigo"
            onChange={handleChange}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="C&oacute;digo"
          />
          <Input
            name="nomenclador"
            onChange={handleChange}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Nomenclador"
          />
          <Input
            name="precio"
            onChange={handleChange}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Precio"
          />
          <Input
            name="libreutilizacion"
            onChange={handleChange}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Libre utilizaci&oacute;n"
          />
          <Input
            name="libreutilizacion"
            onChange={handleChange}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Libre utilizaci&oacute;n"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto color="error" onClick={closeHandler}>
            Cancelar
          </Button>
          <Button auto color="success" onClick={handleSubmit}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddRecurso;
