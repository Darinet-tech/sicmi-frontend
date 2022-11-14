import { Table, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";
import { fetcher } from "../../lib/api";
import { getTokenFromLocalCookie } from "../../lib/auth";

const TableOrdenesDeTrabajo = ({ ordenes_de_trabajos }) => {
  const router = useRouter();
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";

  return (
    <>
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
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </>
  );
};

export default TableOrdenesDeTrabajo;
