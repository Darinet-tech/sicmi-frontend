import {
  Button,
  Col,
  Input,
  Modal,
  Row,
  Table,
  Text,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";
import { fetcher } from "../../lib/api";
import { getTokenFromLocalCookie } from "../../lib/auth";
import { DeleteIcon } from "../icons/DeleteIcon";
import { EditIcon } from "../icons/EditIcon";
import { IconButton } from "../icons/IconButton";

const TableOrdenesDeTrabajo = ({ ordenes_de_trabajos, tiposmtto }) => {
  const router = useRouter();
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";

  //Eliminar OrdenDeTrabajo
  const [
    visibleModalDeleteOrdenDeTrabajo,
    setVisibleModalDeleteOrdenDeTrabajo,
  ] = React.useState(false);

  const [IdDeleteOrdenDeTrabajo, setIdDeleteOrdenDeTrabajo] =
    React.useState("");
  const handlerDeleteOrdenDeTrabajo = (pid) => {
    setIdDeleteOrdenDeTrabajo(pid);
    setVisibleModalDeleteOrdenDeTrabajo(true);
  };

  const closeModalDeleteOrdenDeTrabajoHandler = () => {
    setVisibleModalDeleteOrdenDeTrabajo(false);
  };

  const handleSubmitDeleteOrdenDeTrabajo = async (e) => {
    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/orden-de-trabajos/${IdDeleteOrdenDeTrabajo}`,
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

  //Editar OrdenDeTrabajo
  const [orden, setOrdenDeTrabajo] = React.useState({
    id: "",
    solicitud: null,
    tipo_mtto: null,
    numerodeorden: 0,
    observaciones: false,
    fecha_ini: "",
    fecha_fin: "",
  });

  const handleChangeEditOrdenDeTrabajo = (e) => {
    setOrdenDeTrabajo({ ...orden, [e.target.name]: e.target.value });
  };

  const [visibleModalEditOrdenDeTrabajo, setVisibleModalEditOrdenDeTrabajo] =
    React.useState(false);

  const handlerEditOrdenDeTrabajo = (pid) => {
    loadEditOrdenDeTrabajo(pid);
  };

  const closeModalEditOrdenDeTrabajoHandler = () => {
    setVisibleModalEditOrdenDeTrabajo(false);
  };

  const handleSubmitEditOrdenDeTrabajo = async () => {
    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/orden-de-trabajos/${orden.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ data: orden }),
        }
      );
      router.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadEditOrdenDeTrabajo = async (pid) => {
    try {
      const orden_loaded = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/orden-de-trabajos/${pid}?populate[0]=tipo_mtto&populate[1]=consumos_recursos&populate[2]=solicitud`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      setOrdenDeTrabajo({
        id: orden_loaded.data.id,
        solicitud: orden_loaded.data.attributes.solicitud.data.id,
        tipo_mtto: orden_loaded.data.attributes.tipo_mtto.data.id,
        numerodeorden: orden_loaded.data.attributes.numerodeorden,
        observaciones: orden_loaded.data.attributes.observaciones,
        fecha_ini: orden_loaded.data.attributes.fecha_ini,
        fecha_fin: orden_loaded.data.attributes.fecha_fin,
      });

      setVisibleModalEditOrdenDeTrabajo(true);
    } catch (error) {
      router.reload();
    }
  };

  return (
    <>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visibleModalDeleteOrdenDeTrabajo}
        onClose={closeModalDeleteOrdenDeTrabajoHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              Eliminar Orden de Trabajo
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text b size={18}>
            Desea eliminar el registro de Orden de Trabajo ?
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            flat
            color="error"
            onClick={closeModalDeleteOrdenDeTrabajoHandler}
          >
            Cancelar
          </Button>
          <Button auto onClick={handleSubmitDeleteOrdenDeTrabajo}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visibleModalEditOrdenDeTrabajo}
        onClose={closeModalEditOrdenDeTrabajoHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              Editar Orden de Trabajo
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <label>Tipo de Mantenimiento</label>
          <select
            name="tipo_mtto"
            onChange={handleChangeEditOrdenDeTrabajo}
            className="dropdown-dark"
            value={orden.tipo_mtto}
          >
            {tiposmtto &&
              tiposmtto.data &&
              tiposmtto.data.map((ccItem) => {
                return (
                  <option key={ccItem.id} value={ccItem.id}>
                    {" "}
                    {ccItem.attributes.tipo}{" "}
                  </option>
                );
              })}
          </select>
          <Input
            label="N&uacute;mero de Orden"
            name="numerodeorden"
            onChange={handleChangeEditOrdenDeTrabajo}
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="N&uacute;mero de Orden"
            value={orden.numerodeorden}
          />
          <Textarea
            label="Observaciones"
            name="observaciones"
            onChange={handleChangeEditOrdenDeTrabajo}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Observaciones"
            value={orden.observaciones}
          />
          <Input
            label="Fecha de cierre"
            name="fecha_fin"
            onChange={handleChangeEditOrdenDeTrabajo}
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Fecha de cierre"
            value={orden.fecha_fin}
            type="date"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            onClick={closeModalEditOrdenDeTrabajoHandler}
            color="error"
          >
            Cancelar
          </Button>
          <Button auto onClick={handleSubmitEditOrdenDeTrabajo}>
            Editar
          </Button>
        </Modal.Footer>
      </Modal>
      <Table
        aria-label="Ordenes de Trabajo"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
        selectionMode="single"
      >
        <Table.Header>
          <Table.Column>No.</Table.Column>
          <Table.Column>OBSERVACIONES</Table.Column>
          <Table.Column>TIPO DE MTTO.</Table.Column>
          <Table.Column>FECHA DE INICIO</Table.Column>
          <Table.Column>FECHA DE CIERRE</Table.Column>
          <Table.Column hideHeader={true} align="center">
            ACCIONES
          </Table.Column>
        </Table.Header>
        <Table.Body>
          {ordenes_de_trabajos &&
            ordenes_de_trabajos.map((ordenItem) => {
              return (
                <Table.Row key={ordenItem.id}>
                  <Table.Cell>
                    <Text b size={14}>
                      {ordenItem.attributes.numerodeorden}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text b size={14}>
                      {ordenItem.attributes.observaciones}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text b size={14}>
                      {ordenItem.attributes.tipo_mtto &&
                      ordenItem.attributes.tipo_mtto.data
                        ? ordenItem.attributes.tipo_mtto.data.attributes.tipo
                        : ""}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text b size={14}>
                      {ordenItem.attributes.fecha_ini}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text b size={14}>
                      {ordenItem.attributes.fecha_fin}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Row justify="center" align="center">
                      <Col css={{ d: "flex" }}>
                        <Tooltip
                          content="Editar Orden de Trabajo"
                          color="success"
                        >
                          <IconButton
                            onClick={() => {
                              handlerEditOrdenDeTrabajo(ordenItem.id);
                            }}
                          >
                            <EditIcon size={20} fill="#00ff00" />
                          </IconButton>
                        </Tooltip>
                      </Col>
                      <Col css={{ d: "flex" }}>
                        <Tooltip
                          content="Eliminar Orden de Trabajo"
                          color="error"
                          onClick={() => {
                            handlerDeleteOrdenDeTrabajo(ordenItem.id);
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

export default TableOrdenesDeTrabajo;
