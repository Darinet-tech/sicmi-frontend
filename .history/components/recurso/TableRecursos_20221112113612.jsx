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
import { StyledBadge } from "../StyledBadge";

const TableRecursos = ({ recursos }) => {
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
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/recursos/${IdDelete}`,
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
              Eliminar Recurso
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text b size={18}>
            Desea eliminar el recurso seleccionado ?
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
            Listado de Recursos
          </Text>
        </Row>
        <Row>
          <Table
            aria-label="Listado de Recursos"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
            selectionMode="single"
          >
            <Table.Header>
              <Table.Column>USUARIO</Table.Column>
              <Table.Column>CORREO</Table.Column>
              <Table.Column>CARGO</Table.Column>
              <Table.Column>ROL</Table.Column>
              <Table.Column>UO</Table.Column>
              <Table.Column>BLOQUEADO</Table.Column>
              <Table.Column hideHeader={true} align="center">
                ACCIONES
              </Table.Column>
            </Table.Header>
            <Table.Body>
              {usuarios &&
                usuarios.map((userItem) => {
                  return (
                    <Table.Row key={userItem.id}>
                      <Table.Cell>
                        <Text b size={14} >
                          {userItem.username}
                        </Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text b size={14} >
                          {userItem.email}
                        </Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text b size={14} >
                          {userItem.cargo}
                        </Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text b size={14} >
                          {userItem.role ? userItem.role.name : ""}
                        </Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text b size={14} >
                          {userItem.unidadorganizativa
                            ? userItem.unidadorganizativa.nombre
                            : ""}
                        </Text>
                      </Table.Cell>
                      <Table.Cell>
                        {userItem.blocked}
                        <StyledBadge type={userItem.blocked ? "Bloqueado" : "Activo"}>
                          {userItem.blocked ? "Bloqueado" : "Activo"}
                        </StyledBadge>
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
                            <Tooltip content="Editar Usuario" color="success">
                              <IconButton
                                onClick={() => {
                                  router.push(
                                    `/admin/usuarios/edit/${userItem.id}`
                                  );
                                }}
                              >
                                <EditIcon size={20} fill="#00ff00" />
                              </IconButton>
                            </Tooltip>
                          </Col>
                          <Col css={{ d: "flex" }}>
                            <Tooltip
                              content="Eliminar Usuario"
                              color="error"
                              onClick={() => {
                                handlerDelete(userItem.id);
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

export default TableUsuarios;
