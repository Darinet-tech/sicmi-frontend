import React from "react";
import { Table, Row, Col, Tooltip, Text } from "@nextui-org/react";
import { IconButton } from "./icons/IconButton";
import { EyeIcon } from "./icons/EyeIcon";
import { EditIcon } from "./icons/EditIcon";
import { DeleteIcon } from "./icons/DeleteIcon";

const TableInmuebles = ({ inmuebles }) => {
  return (
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
                <Table.Cell></Table.Cell>
                <Table.Cell>
                  <Row justify="center" align="center">
                    <Col css={{ d: "flex" }}>
                      <Tooltip content="Detalles">
                        <IconButton onClick={() => {}}>
                          <EyeIcon size={20} fill="#979797" />
                        </IconButton>
                      </Tooltip>
                    </Col>
                    <Col css={{ d: "flex" }}>
                      <Tooltip content="Editar Inmueble">
                        <IconButton onClick={() => {}}>
                          <EditIcon size={20} fill="#979797" />
                        </IconButton>
                      </Tooltip>
                    </Col>
                    <Col css={{ d: "flex" }}>
                      <Tooltip
                        content="Eliminar Inmueble"
                        color="error"
                        onClick={() => {}}
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
  );
};

export default TableInmuebles;
