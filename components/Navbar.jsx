import { Dropdown, Text, User, Image, Button } from "@nextui-org/react";
import styles from "../styles/navbar.module.css";
import { unsetToken } from "../lib/auth";
import { useFetchUser } from "../lib/authContext";

export const Navbar = ({baseURL}) => {
  const { user, loading } = useFetchUser();
  const logout = () => {
    unsetToken();
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
                name="Usuario"
                src="images/user.png"
              />
            </Dropdown.Trigger>
            <Dropdown.Menu aria-label="User Actions">
              <Dropdown.Item key="profile">
                <Button light>MIS DATOS</Button>
              </Dropdown.Item>

              <Dropdown.Item key="logout" withDivider css={{ height: "$15" }}>
                <Button onClick={logout} color="error">
                  CERRAR SESIÓN
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <>
            <Text h4>SiGMCI</Text>
          </>
        ))}

      <Text
        css={{
          margin: "auto",
        }}
        className={styles.titulo}
        h4
      >
        Sistema de Gestión de Mantenimiento Constructivo a Inmuebles
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
