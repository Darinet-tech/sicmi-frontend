import { Table, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";
import { fetcher } from "../../lib/api";
import { getTokenFromLocalCookie } from "../../lib/auth";
import { StyledBadgeDisponible } from "../StyledBadgeDisponible";
import { StyledBadgeEntregado } from "../StyledBadgeEntregado";

const TableDemandaMateriales = ({ demanda_recursos }) => {
  const router = useRouter();
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";

  return (
    <>
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
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </>
  );
};

export default TableDemandaMateriales;
