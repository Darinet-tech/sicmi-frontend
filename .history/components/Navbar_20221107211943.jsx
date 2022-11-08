import { Dropdown, Text, User, Image, Button } from "@nextui-org/react";
import styles from "../styles/navbar.module.css";
import { unsetToken } from "../lib/auth";
import { useFetchUser } from "../lib/authContext";

export const Navbar = ({ baseURL }) => {
  const { user, loading } = useFetchUser();

  const goto = (key) => {
    switch (key) {
      case "profile":
        break;
      case "logout":
        unsetToken();
        break;
      default:
        break;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "60px",

        alignItems: "center",
        justifyContent: "start",
        padding: "0px 20px",
        backgroundColor: "#060247",
      }}
    >
      {!loading &&
        (user ? (
          <Dropdown placement="bottom-left">
            <Dropdown.Trigger>
              <User
                bordered
                as="button"
                size="lg"
                color="primary"
                name={user}
                src={`${baseURL}/images/user.png`}
              />
            </Dropdown.Trigger>
            <Dropdown.Menu aria-label="User Actions" onAction={goto} variant="shadow" css={{ textAlign:"center", font }}>
              <Dropdown.Item key="profile" color="primary">MIS DATOS</Dropdown.Item>

              <Dropdown.Item key="logout" color="error" withDivider css={{ height: "$15" }}>
                CERRAR SESIÓN
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <>
            <Text h4>SiCMI</Text>
          </>
        ))}

      <Text
        css={{
          margin: "auto",
        }}
        className={styles.titulo}
        h4
      >
        Sistema de Control del Mantenimiento a Inmuebles
      </Text>

      <div className="image">
        <Image
          css={{
            marginTop: "auto",
            marginBottom: "auto",
            width: "60px",
            height: "60px",
          }}
          src={`${baseURL}/images/LogoETECSAOK.png`}
          alt=""
        />
      </div>
    </div>
  );
};
