import React from "react";
import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";
import { Email } from "../components/Email"; // Importación explícita
import { Password } from "../components/Password"; // Importación explícita
import styles from "../styles/authentication.module.css";
import { setToken } from "../lib/auth";
import { useUser } from "../lib/authContext";
import { fetcher } from "../lib/api";

export const Authentication = () => {
  const [visible, setVisible] = React.useState(false);
  const [error, setError] = React.useState(null);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    setError(null);
  };

  const [data, setData] = React.useState({ identifier: "", password: "" });
  const { user, loading } = useUser();

  const handleSubmit = async () => {
    try {
      const responseAuth = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identifier: data.identifier,
            password: data.password,
          }),
        }
      );

      if (responseAuth.user) {
        setToken(responseAuth);
        setVisible(false);
      } else {
        setError("Credenciales incorrectas. Verifica tu usuario y contraseña.");
      }
    } catch (error) {
      console.error("Error de autenticación:", error.message);
      setError("Error de conexión. Intenta nuevamente.");
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {!loading && !user && (
        <>
          <Button className={styles.button} color="primary" shadow onClick={handler}>
            PARA ACCEDER A ESTA PÁGINA DEBE AUTENTICARSE
          </Button>
          <Modal closeButton blur open={visible} onClose={closeHandler}>
            <Modal.Header>
              <Text size={18}>Autenticación</Text>
            </Modal.Header>
            <Modal.Body>
              {error && <Text color="error">{error}</Text>}
              <Input
                name="identifier"
                onChange={handleChange}
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Correo electrónico"
                contentLeft={<Email fill="currentColor" />}
              />
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Contraseña"
                contentLeft={<Password fill="currentColor" />}
              />
              <Row justify="space-between">
                <Checkbox>
                  <Text size={14}>Recordar contraseña</Text>
                </Checkbox>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button auto color="success" onPress={handleSubmit}>
                ACEPTAR
              </Button>
              <Button auto color="error" onPress={closeHandler}>
                CANCELAR
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};