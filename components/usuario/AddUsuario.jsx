import React from "react";
import { Modal, Button, Text, Input } from "@nextui-org/react";
import { useRouter } from "next/router";

import { fetcher } from "../../lib/api";
import { getTokenFromLocalCookie } from "../../lib/auth";
import { Password } from "../Password";

const AddUsuario = ({ roles = [], uos = [] }) => {
  const router = useRouter();
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";

  const [Usuario, setUsuario] = React.useState({
    username: "",
    email: "",
    role: roles.length > 0 ? roles[0].id : "",
    unidadorganizativa: uos.data.length > 0 ? uos.data[0].id : "",
    cargo: "",
    blocked: false,
    confirmed: true,
    provider: "local",
    password: "",
  });

  const handleChange = (e) => {
    setUsuario({ ...Usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(Usuario),
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
        Adicionar Usuario
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
              Adicionar Usuario
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            name="username"
            onChange={handleChange}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Usuario"
            required            
          />
          <Input
            name="email"
            onChange={handleChange}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Correo"
            required
          />

          <Input
            name="cargo"
            onChange={handleChange}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Cargo"
          />

          <select name="role" onChange={handleChange}>
            {Array.isArray(roles.roles) &&
              roles.roles.map((ccItem) => {
                return (
                  <option key={ccItem.id} value={ccItem.id}>
                    {" "}
                    {ccItem.name}{" "}
                  </option>
                );
              })}
          </select>

          <select name="unidadorganizativa" onChange={handleChange}>
            {Array.isArray(uos.data) &&
              uos.data.map((ccItem) => {
                return (
                  <option key={ccItem.id} value={ccItem.id}>
                    {" "}
                    {ccItem.attributes.acronimo} {ccItem.attributes.nombre}
                  </option>
                );
              })}
          </select>

          <Input
           label="Clave de acceso"
            type="password"
            name="password"
            onChange={handleChange}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            contentLeft={<Password fill="currentColor" />}
            required
          />          
        </Modal.Body>
        <Modal.Footer>
          <Button auto color="error" onClick={closeHandler}>
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

export default AddUsuario;
