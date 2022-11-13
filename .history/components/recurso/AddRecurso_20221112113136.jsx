import React from "react";
import { Modal, Button, Text, Input } from "@nextui-org/react";
import { useRouter } from "next/router";

import { fetcher } from "../../lib/api";
import { getTokenFromLocalCookie } from "../../lib/auth";
import { Password } from "../Password";

const AddRecurso = ({  }) => {
  const router = useRouter();
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";

  const [Recurso, setRecurso] = React.useState({
    id: "",
    codigo: "",
    nomenclador: "",
    precio: "",
    libreutilizacion: ""
  });

  const handleChange = (e) => {
    setRecurso({ ...Recurso, [e.target.name]: e.target.value });
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
          body: JSON.stringify(Recurso),
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
          <label>Rol</label>
          <select name="role" onChange={handleChange} className="dropdown-dark">
            <option>Seleccione un rol</option>
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
          <label>Unidad organizativa</label>
          <select
            name="unidadorganizativa"
            onChange={handleChange}
            className="dropdown-dark"
          >
            <option>Seleccione una unidad organizativa</option>
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
          <Button auto color="success" onClick={handleSubmit}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddUsuario;
