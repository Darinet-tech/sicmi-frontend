import React from "react";
import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";
import { Email } from "../components";
import { Password } from "../components";
import styles from "../styles/authentication.module.css";
import { setToken, unsetToken } from "../lib/auth";
import { useUser } from "../lib/authContext";
import { fetcher } from "../lib/api";

/**/

export const Authentication = () => {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };

  const [data, setData] = React.useState({
    identifier: "",
    password: "",
  });

  const { user, loading } = useUser();

  const handleSubmit = async () => {
    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: data.identifier,
            password: data.password,
          }),
        }
      );
      setToken(responseData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {!loading && !user ? (
        <>
          <Button
            className={styles.button}
            color="warning"
            shadow
            onClick={handler}
          >
            PARA ACCEDER A ESTA PÁGINA DEBE AUTENTICARSE
          </Button>
          <Modal
            closeButton
            blur
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
          >
            <Modal.Header>
              <Text id="modal-title" size={18}>
                Autenticación
              </Text>
            </Modal.Header>
            <Modal.Body>
              <Input
                name="identifier"
                onChange={handleChange}
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
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
      ) : (
        ""
      )}
    </div>
  );
};
