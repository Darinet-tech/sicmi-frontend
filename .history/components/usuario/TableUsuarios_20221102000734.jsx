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

const TableInmuebles = ({ inmuebles }) => {
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
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/inmuebles/${IdDelete}`,
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
              Eliminar Inmueble
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text b size={18}>
            Desea eliminar el registro de Inmueble ?
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
            Listado de Inmuebles
          </Text>
        </Row>
        <Row>
          <Table
            aria-label="Listado de Inmuebles"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
            selectionMode="single"
          >
            <Table.Header>
              <Table.Column>DESCRIPCION</Table.Column>
              <Table.Column>DIRECCION</Table.Column>
              <Table.Column>CENTRO DE COSTO</Table.Column>
              <Table.Column hideHeader={true} align="center">
                ACCIONES
              </Table.Column>
            </Table.Header>
            <Table.Body>
              {inmuebles &&
                inmuebles.data.map((inmuebleItem) => {
                  return (
                    <Table.Row key={inmuebleItem.id}>
                      <Table.Cell>
                        <Text b size={14} css={{ tt: "capitalize" }}>
                          {inmuebleItem.attributes.descripcion}
                        </Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text b size={14} css={{ tt: "capitalize" }}>
                          {inmuebleItem.attributes.direccion}
                        </Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text b size={14} css={{ tt: "capitalize" }}>
                          {inmuebleItem.attributes.centrodecosto.data
                            ? inmuebleItem.attributes.centrodecosto.data
                                .attributes.centrocosto
                            : ""}
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
                            <Tooltip content="Editar Inmueble" color="success">
                              <IconButton
                                onClick={() => {
                                  router.push(
                                    `/especialista/inmuebles/edit/${inmuebleItem.id}`
                                  );
                                }}
                              >
                                <EditIcon size={20} fill="#00ff00" />
                              </IconButton>
                            </Tooltip>
                          </Col>
                          <Col css={{ d: "flex" }}>
                            <Tooltip
                              content="Eliminar Inmueble"
                              color="error"
                              onClick={() => {
                                handlerDelete(inmuebleItem.id);
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

export default TableInmuebles;
