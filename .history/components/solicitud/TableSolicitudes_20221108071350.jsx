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

const TableSolicitudes = ({ unidadesorganizativas, inmuebles, areas, locales }) => {
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
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/solicitudes/${IdDelete}`,
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
              Eliminar Local
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text b size={18}>
            Desea eliminar el registro de Local ?
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
            size={50}
            css={{
              textGradient: "45deg, $yellow600 -20%, $red600 100%",
            }}
            weight="bold"
          >
            Listado de Solicitudes
          </Text>
        </Row>
        <Row>
          <Table
            aria-label="Listado de Locales"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
            selectionMode="single"
          >
            <Table.Header>
              <Table.Column>DESCRIPCIÓN</Table.Column>
              <Table.Column>FECHA INICIO</Table.Column>
              <Table.Column>FECHA FIN</Table.Column>
              <Table.Column>LOCAL</Table.Column>
              <Table.Column>ELABORADA POR</Table.Column>
              <Table.Column hideHeader={true} align="center">
                ACCIONES
              </Table.Column>
            </Table.Header>
            <Table.Body>
              {solicitudes&&
                solicitudes.data &&
                solicitudes.data.map((solicitudItem) => {
                  return (
                    <Table.Row key={solicitudItem.id}>
                      <Table.Cell>
                        <Text b size={14}>
                          {solicitudItem.attributes.descripcion}
                        </Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text b size={14}>
                        {solicitudItem.attributes.fecha_ini}
                        </Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text b size={14}>
                        {solicitudItem.attributes.fecha_fin}
                        </Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text b size={14}>
                          {solicitudItem.attributes.local &&
                            solicitudItem.attributes.local.data.map(
                              (localItem) => {
                                return (
                                  <Text b size={14} key={localItem.id}>
                                    {localItem.attributes.nombre}
                                  </Text>
                                );
                              }
                            )}
                        </Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text b size={14}>
                          {solicitudItem.attributes.elaborado &&
                            solicitudItem.attributes.local.data.map(
                              (localItem) => {
                                return (
                                  <Text b size={14} key={localItem.id}>
                                    {localItem.attributes.nombre}
                                  </Text>
                                );
                              }
                            )}
                        </Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Row justify="center" align="center">
                          <Col css={{ d: "flex" }}>
                            <Tooltip content="Detalles" color="primary">
                              <IconButton onClick={() => {}}>
                                <EyeIcon size={20} fill="#979797" />
                              </IconButton>
                            </Tooltip>
                          </Col>
                          <Col css={{ d: "flex" }}>
                            <Tooltip content="Editar Solicitud" color="success">
                              <IconButton
                                onClick={() => {
                                  router.push(
                                    `/cliente/solicitudes/edit/${solicitudItem.id}`
                                  );
                                }}
                              >
                                <EditIcon size={20} fill="#00ff00" />
                              </IconButton>
                            </Tooltip>
                          </Col>
                          <Col css={{ d: "flex" }}>
                            <Tooltip
                              content="Eliminar Local"
                              color="error"
                              onClick={() => {
                                handlerDelete(solicitudItem.id);
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
        </Row>
      </Grid>
    </>
  );
};

export default TableSolicitudes;