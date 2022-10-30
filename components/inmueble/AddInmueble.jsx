import React from "react";
import { Modal, Button, Text, Input } from "@nextui-org/react";
import { fetcher } from "../../lib/api";
import { getTokenFromLocalCookie } from "../../lib/auth";
import { useRouter } from "next/router";

const AddInmueble = ({ centrodecostos }) => {
  const router = useRouter();
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const [inmueble, setInmueble] = React.useState({
    descripcion: "",
    direccion: "",
    centrodecosto: "",
  });

  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";

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
            labelPlaceholder="Descripci&oacute;n"
          />
          <Input
            name="direccion"
            onChange={handleChange}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            labelPlaceholder="Direcci&oacute;n"
          />
          <select name="centrodecosto" onChange={handleChange}>
            {centrodecostos &&
              centrodecostos.data.map((ccItem) => {
                return (
                  <option key={ccItem.id} value={ccItem.id}>
                    {" "}
                    {ccItem.attributes.centrocosto}{" "}
                  </option>
                );
              })}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Cancelar
          </Button>
          <Button auto onClick={handleSubmit}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddInmueble;
