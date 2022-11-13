import {
  Button,
  Col,
  Input,
  Modal,
  Row,
  Table,
  Text,
  Tooltip,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";
import { fetcher } from "../../lib/api";
import { getTokenFromLocalCookie } from "../../lib/auth";
import { DeleteIcon } from "../icons/DeleteIcon";
import { EditIcon } from "../icons/EditIcon";
import { IconButton } from "../icons/IconButton";
import { StyledBadgeDisponible } from "../StyledBadgeDisponible";
import { StyledBadgeEntregado } from "../StyledBadgeEntregado";

const TableDemandaMateriales = ({
  demanda_recursos,
  recursosnorelacionados,
}) => {
  const router = useRouter();
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";

  //Eliminar Demanda
  const [visibleModalDeleteDemanda, setVisibleModalDeleteDemanda] =
    React.useState(false);

  const [IdDeleteDemanda, setIdDeleteDemanda] = React.useState("");
  const handlerDeleteDemanda = (pid) => {
    setIdDeleteDemanda(pid);
    setVisibleModalDeleteDemanda(true);
  };

  const closeModalDeleteDemandaHandler = () => {
    setVisibleModalDeleteDemanda(false);
  };

  const handleSubmitDeleteDemanda = async (e) => {
    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/demanda-recursos/${IdDeleteDemanda}`,
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

  //Editar Demanda
  const [demanda, setDemanda] = React.useState({
    id: "",
    solicitud: null,
    recurso: null,
    demanda: 0,
  });

  const [recurso, setRecurso] = React.useState({
    id: "",
    nomenclador: "",
  });

  const handleChangeEditDemanda = (e) => {
    setDemanda({ ...demanda, [e.target.name]: e.target.value });
  };

  const [visibleModalEditDemanda, setVisibleModalEditDemanda] =
    React.useState(false);

  const handlerEditDemanda = (pid) => {
    loadEditDemanda(pid);
    setVisibleModalEditDemanda(true);
  };

  const closeModalEditDemandaHandler = () => {
    setVisibleModalEditDemanda(false);
  };

  const handleSubmitEditDemanda = async () => {
    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/demanda-recursos/${demanda.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ data: demanda }),
        }
      );
      router.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadEditDemanda = async (pid) => {
    try {
      const demanda_loaded = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/demanda-recursos/${pid}?populate[0]=solicitud&populate[1]=recurso`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      setDemanda({
        id: demanda_loaded.data.id,
        solicitud: demanda_loaded.data.attributes.solicitud.data.id,
        recurso: demanda_loaded.data.attributes.recurso.data.id,
        demanda: demanda_loaded.data.attributes.demanda,
      });
      setRecurso({
        id: demanda_loaded.data.attributes.recurso.data.id,
        nomenclador:
          demanda_loaded.data.attributes.recurso.data.attributes.nomenclador,
      });
    } catch (error) {
      router.reload();
    }
  };

  return (
    <>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visibleModalDeleteDemanda}
        onClose={closeModalDeleteDemandaHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              Eliminar Demanda
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text b size={18}>
            Desea eliminar el registro de Demanda ?
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            flat
            color="error"
            onClick={closeModalDeleteDemandaHandler}
          >
            Cancelar
          </Button>
          <Button auto onClick={handleSubmitDeleteDemanda}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visibleModalEditDemanda}
        onClose={closeModalEditDemandaHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              Editar Demanda de Material
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <label>Recurso</label>
          <select
            name="recurso"
            onChange={handleChangeEditDemanda}
            className="dropdown-dark"
            value={demanda.recurso}
          >
            <option>Seleccione un Recurso</option>
            <option value={recurso.id}> {recurso.nomenclador} </option>
            {recursosnorelacionados &&
              recursosnorelacionados.data &&
              recursosnorelacionados.data.map((ccItem) => {
                return (
                  <option key={ccItem.id} value={ccItem.id}>
                    {" "}
                    {ccItem.attributes.nomenclador}{" "}
                  </option>
                );
              })}
          </select>
          <Input
            label="Demanda"
            name="demanda"
            onChange={handleChangeEditDemanda}
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Demanda"
            type="number"
            value={demanda.demanda}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto onClick={closeModalEditDemandaHandler} color="error">
            Cancelar
          </Button>
          <Button auto onClick={handleSubmitEditDemanda}>
            Editar
          </Button>
        </Modal.Footer>
      </Modal>
      <Table
        aria-label="Materiales Demandados para la Solicitud"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
        selectionMode="single"
      >
        <Table.Header>
          <Table.Column>RECURSO</Table.Column>
          <Table.Column>DEMANDA</Table.Column>
          <Table.Column>DISPONIBLE</Table.Column>
          <Table.Column>ENTREGADO</Table.Column>
          <Table.Column hideHeader={true} align="center">
            ACCIONES
          </Table.Column>
        </Table.Header>
        <Table.Body>
          {demanda_recursos &&
            demanda_recursos.map((demandaItem) => {
              return (
                <Table.Row key={demandaItem.id}>
                  <Table.Cell>
                    <Text b size={14}>
                      {demandaItem.attributes.recurso &&
                      demandaItem.attributes.recurso.data
                        ? demandaItem.attributes.recurso.data.attributes
                            .nomenclador
                        : ""}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text b size={14}>
                      {demandaItem.attributes.demanda}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <StyledBadgeDisponible
                      type={
                        demandaItem.attributes.demanda <=
                        demandaItem.attributes.recurso.data.attributes
                          .libreutilizacion
                          ? "Disponible"
                          : "NoDisponible"
                      }
                    >
                      {demandaItem.attributes.demanda <=
                      demandaItem.attributes.recurso.data.attributes
                        .libreutilizacion
                        ? "Disponible"
                        : "No Disponible"}
                    </StyledBadgeDisponible>
                  </Table.Cell>
                  <Table.Cell>
                    <StyledBadgeEntregado
                      type={
                        demandaItem.attributes.entregadodealmacen
                          ? "Entregado"
                          : "NoEntregado"
                      }
                    >
                      {demandaItem.attributes.entregadodealmacen
                        ? "Entregado"
                        : "No Entregado"}
                    </StyledBadgeEntregado>
                  </Table.Cell>
                  <Table.Cell>
                    <Row justify="center" align="center">
                      <Col css={{ d: "flex" }}>
                        <Tooltip content="Editar Demanda" color="success">
                          <IconButton
                            onClick={() => {
                              handlerEditDemanda(demandaItem.id);
                            }}
                          >
                            <EditIcon size={20} fill="#00ff00" />
                          </IconButton>
                        </Tooltip>
                      </Col>
                      <Col css={{ d: "flex" }}>
                        <Tooltip
                          content="Eliminar Demanda"
                          color="error"
                          onClick={() => {
                            handlerDeleteDemanda(demandaItem.id);
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
    </>
  );
};

export default TableDemandaMateriales;
