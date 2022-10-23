import { Card, Text, Button, Image } from "@nextui-org/react";
import { useContext } from "react";
import { UIContext } from "../components/context";
import { Seleccionar } from "./Seleccionar";
import { TablaUsuario } from "./TablaUsuario";

export const Formulario = () => {
  const { seleccion, variable } = useContext(UIContext);
  return (
    <div>
      {variable == "listar_solicitud" ? (
        <Card css={{ marginTop: "10px" }}>
          <Button
            onPress={() => seleccion(3)}
            css={{
              position: "absolute",
              right: "1px",
              top: "1px",
              color: "white",
              backgroundColor: "red",
              height: "25px",
            }}
            auto
          >
            X
          </Button>
          <Card.Body>
          <Text h5 css={{ textAlign: "center" }}>
              SOLICITUDES
            </Text>
            <TablaUsuario />
          </Card.Body>
          
        </Card>
      ) : variable == "crear_inmueble" ? (
        <Card css={{ marginTop: "10px" }}>
          <Button
            onPress={() => seleccion(3)}
            css={{
              position: "absolute",
              right: "1px",
              top: "1px",
              color: "white",
              backgroundColor: "red",
              height: "25px",
            }}
            auto
          >
            X
          </Button>
          <Card.Body>
          <Text h5 css={{ textAlign: "center" }}>
              NUEVO INMUEBLE
            </Text>
            <Seleccionar />
          </Card.Body>
          <Button
            onPress={() => seleccion(3)}
            css={{
              position: "absolute",
              right: "1px",
              bottom: "1px",
              color: "white",
              height: "25px",
            }}
            shadow color="success"
            auto
          >
            GUARDAR
          </Button>
        </Card>
      ) : variable == "listar_inmueble" ? (
        <Card css={{ marginTop: "10px", height: "700px", width: "1400px" }}>
          <Button
            onPress={() => seleccion(3)}
            css={{
              position: "absolute",
              right: "1px",
              top: "1px",
              color: "white",
              backgroundColor: "red",
              height: "25px",
            }}
            auto
          >
            X
          </Button>
          <Card.Body>
          <Text h5 css={{ textAlign: "center" }}>
              INMUEBLES
            </Text>
          </Card.Body>
        </Card>
      ) : variable == "crear_solmtto" ? (
        /* *********************Cliente************************************************* */

        <Card css={{ marginTop: "10px", height: "700px", width: "1400px" }}>
          <Button
            onPress={() => seleccion(3)}
            css={{
              position: "absolute",
              right: "1px",
              top: "1px",
              color: "white",
              backgroundColor: "red",
              height: "25px",
            }}
            auto
          >
            X
          </Button>
          <Card.Body>
          <Text h5 css={{ textAlign: "center" }}>
              NUEVA SOLICITUD
            </Text>
            <Seleccionar />
          </Card.Body>
          <Button
            onPress={() => seleccion(3)}
            css={{
              position: "absolute",
              right: "1px",
              bottom: "1px",
              color: "white",
              height: "25px",
            }}
            shadow color="success"
            auto
          >
            GUARDAR
          </Button>
        </Card>
      ) : variable == "listar_solmtto" ? (
        <Card css={{ marginTop: "10px", height: "700px", width: "1400px" }}>
          <Button
            onPress={() => seleccion(3)}
            css={{
              position: "absolute",
              right: "1px",
              top: "1px",
              color: "white",
              backgroundColor: "red",
              height: "25px",
            }}
            auto
          >
            X
          </Button>
          <Card.Body>
          <Text h5 css={{ textAlign: "center" }}>
              SOLICITUDES
            </Text>
            <TablaUsuario />
          </Card.Body>
        </Card>
      ) : variable == "listar_ordenent" ? (
        <Card css={{ marginTop: "10px", height: "700px", width: "1400px" }}>
          <Button
            onPress={() => seleccion(3)}
            css={{
              position: "absolute",
              right: "1px",
              top: "1px",
              color: "white",
              backgroundColor: "red",
              height: "25px",
            }}
            auto
          >
            X
          </Button>
          <Card.Body>
          <Text h5 css={{ textAlign: "center" }}>
              ÓRDENES DE TRABAJO
            </Text>
            <TablaUsuario />
          </Card.Body>
        </Card>
      ) : variable == "crear_usuario" ? (
        /* *********************Admin************************************************* */

        <Card css={{ marginTop: "10px", height: "700px", width: "1400px" }}>
          <Button
            onPress={() => seleccion(3)}
            css={{
              position: "absolute",
              right: "1px",
              top: "1px",
              color: "white",
              backgroundColor: "red",
              height: "25px",
            }}
            auto
          >
            X
          </Button>
          <Card.Body>
          <Text h5 css={{ textAlign: "center" }}>
              NUEVO USUARIO
            </Text>
            <Seleccionar />
          </Card.Body>
          <Button
            onPress={() => seleccion(3)}
            css={{
              position: "absolute",
              right: "1px",
              bottom: "1px",
              color: "white",
              height: "25px",
            }}
            shadow color="success"
            auto
          >
            GUARDAR
          </Button>
        </Card>
      ) : variable == "listar_usuario" ? (
        <Card css={{ marginTop: "10px", height: "700px", width: "1400px" }}>
          <Button
            onPress={() => seleccion(3)}
            css={{
              position: "absolute",
              right: "1px",
              top: "1px",
              color: "white",
              backgroundColor: "red",
              height: "25px",
            }}
            auto
          >
            X
          </Button>
          <Card.Body>
          <Text h5 css={{ textAlign: "center" }}>
              USUARIOS
            </Text>
            <TablaUsuario />
          </Card.Body>
        </Card>
      ) : variable == "listar_ordenes" ? (
        /* *********************Jefe de Brigada************************************************* */

        <Card css={{ marginTop: "10px", height: "700px", width: "1400px" }}>
          <Button
            onPress={() => seleccion(3)}
            css={{
              position: "absolute",
              right: "1px",
              top: "1px",
              color: "white",
              backgroundColor: "red",
              height: "25px",
            }}
            auto
          >
            X
          </Button>
          <Card.Body>
          <Text h5 css={{ textAlign: "center" }}>
              ÓRDENES DE TRABAJO
            </Text>
            <TablaUsuario />
          </Card.Body>
        </Card>
      ) : variable == "estadisticas" ? (
        /* *********************Supervisor************************************************* */

        <Card css={{ marginTop: "10px", height: "700px", width: "1400px" }}>
          <Button
            onPress={() => seleccion(3)}
            css={{
              position: "absolute",
              right: "1px",
              top: "1px",
              color: "white",
              backgroundColor: "red",
              height: "25px",
            }}
            auto
          >
            X
          </Button>
          <Card.Body>
          <Text h5 css={{ textAlign: "center" }}>
              ESTADÍSTICAS
            </Text>
            <TablaUsuario />
          </Card.Body>
        </Card>
      ) : variable == "mostrar_estadisticas" ? (
        /* *********************Director************************************************* */

        <Card css={{ marginTop: "10px", height: "700px", width: "1400px" }}>
          <Button
            onPress={() => seleccion(3)}
            css={{
              position: "absolute",
              right: "1px",
              top: "1px",
              color: "white",
              backgroundColor: "red",
              height: "25px",
            }}
            auto
          >
            X
          </Button>
          <Card.Body>
            <Text h5 css={{ textAlign: "center" }}>
              ESTADÍSTICAS
            </Text>
            <TablaUsuario />
          </Card.Body>
        </Card>
      ) : variable == "solicitar_sobregiro" ? (
        <Card css={{ marginTop: "10px", height: "700px", width: "1400px" }}>
          <Button
            onPress={() => seleccion(3)}
            css={{
              position: "absolute",
              right: "1px",
              top: "1px",
              color: "white",
              backgroundColor: "red",
              height: "25px",
            }}
            auto
          >
            X
          </Button>
          <Card.Body>
            <Text h5 css={{ textAlign: "center" }}>
              SOLICITUD DE SOBREGIRO
            </Text>
            <Seleccionar />
          </Card.Body>
          <Button
            onPress={() => seleccion(3)}
            css={{
              position: "absolute",
              right: "1px",
              bottom: "1px",
              color: "white",
              height: "25px",
            }}
            shadow color="success"
            auto
          >
            GUARDAR
          </Button>
        </Card>
      ) : variable == "listar_sobregiro" ? (
        <Card css={{ marginTop: "10px", height: "700px", width: "1400px" }}>
          <Button
            onPress={() => seleccion(3)}
            css={{
              position: "absolute",
              right: "1px",
              top: "1px",
              color: "white",
              backgroundColor: "red",
              height: "25px",
            }}
            auto
          >
            X
          </Button>
          <Card.Body>
            <Text h5 css={{ textAlign: "center" }}>
              LISTAR SOBREGIRO
            </Text>
            <TablaUsuario />
          </Card.Body>
        </Card>
      ) : variable == 3 ? (
        <></>
      ) : (
        <></>
      )}
    </div>
  );
};
