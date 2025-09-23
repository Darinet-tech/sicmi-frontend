import React from "react";
import {
  Table,
  Row,
  Col,
  Tooltip,
  Modal,
  Button,
  Text,
  Grid,
} from "@nextui-org/react";
import { IconButton } from "../icons/IconButton";
import { EyeIcon } from "../icons/EyeIcon";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { useRouter } from "next/router";
import { getTokenFromLocalCookie } from "../../lib/auth";
import { fetcher } from "../../lib/api";

const TableUnidadorganizativa = ({ unidadesorganizativas }) => {
  const router = useRouter();

  const [visible, setVisible] = React.useState(false);
  const [IdDelete, setIdDelete] = React.useState("");
  const handlerDelete = (pid) => {
    setIdDelete(pid);
    setVisible(true);
  };

  const closeHandler = () => {
    setVisible(false);
  };

  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";

  const handleSubmitDelete = async (e) => {
    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/unidadorganizativas/${IdDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      router.reload();
    } catch (error) {
      console.log(error.message);
    }
  };
  
  return (

    
    <>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              Eliminar Unidad Organizativa
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text b size={18}>
            Desea eliminar el registro de Unidad Organizativa ?
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Cancelar
          </Button>
          <Button auto onClick={handleSubmitDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      <Grid>
        <Row>
          <Text
            h1
            size={60}
            css={{
              textGradient: "45deg, $yellow600 -20%, $red600 100%",
            }}
            weight="bold"
          >
            Listado de Unidades Organizativas
          </Text>
        </Row>
        <Row>
        <Grid.Container css={{ maxWidht: "100%", padding: "20px"}}>
          <Table
            aria-label="Listado de Unidades Organizativas"
            css={{
              height: "auto",
              minWidth: "100%",
              tableLayout: "fixed" // Esto es clave para que respete los anchos
            }}
            selectionMode="single"
          >
            <Table.Header>
              <Table.Column css={{ textAlign: "center", width: "30%" }}>NOMBRE</Table.Column>
              <Table.Column css={{ textAlign: "center", width: "20%" }}>ACRÓNIMO</Table.Column>
              <Table.Column css={{ textAlign: "center", width: "20%" }}>INMUEBLES</Table.Column>
              <Table.Column css={{ textAlign: "center", width: "20%" }}>ACCIONES</Table.Column>
            </Table.Header>
            <Table.Body>
              {unidadesorganizativas &&
                unidadesorganizativas.data.map((uoItem) => {
                  return (
                    <Table.Row key={uoItem.id}>
                      <Table.Cell css={{ width: "40%", whiteSpace: "normal", wordWrap: "break-word" }}>
                        <Text b size={14}>
                          {uoItem.attributes.nombre}
                        </Text>
                      </Table.Cell>
                      <Table.Cell css={{ width: "20%", textAlign: "center" }}>
                        <Text b size={14}>
                          {uoItem.attributes.acronimo}
                        </Text>
                      </Table.Cell>
                      <Table.Cell css={{ width: "20%", textAlign: "center" }}>
                        <Text b size={14}>
                          {uoItem.attributes.inmuebles &&
                            uoItem.attributes.inmuebles.data &&
                            uoItem.attributes.inmuebles.data.length}
                        </Text>
                      </Table.Cell>
                      <Table.Cell css={{ width: "20%", textAlign: "center" }}>
                        <Row justify="center" align="center">
                          <Col css={{ d: "flex" }}>
                            <Tooltip content="Detalles" color="primary">
                              <IconButton onClick={() => {}}>
                                <EyeIcon size={20} fill="#979797" />
                              </IconButton>
                            </Tooltip>
                          </Col>
                          <Col css={{ d: "flex" }}>
                            <Tooltip content="Editar" color="success">
                              <IconButton
                                onClick={() => {
                                  router.push(
                                    `/admin/unidadorganizativa/edit/${uoItem.id}`
                                  );
                                }}
                              >
                                <EditIcon size={20} fill="#00ff00" />
                              </IconButton>
                            </Tooltip>
                          </Col>
                          <Col css={{ d: "flex" }}>
                            <Tooltip
                              content="Eliminar"
                              color="error"
                              onClick={() => {
                                handlerDelete(uoItem.id);
                              }}
                            >
                              <IconButton>
                                <DeleteIcon size={20} fill="#FF0080" />
                              </IconButton>
                            </Tooltip>
                          </Col>
                        </Row>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
        </Grid.Container>
        </Row>
      </Grid>
    </>
  );
};

export default TableUnidadorganizativa;