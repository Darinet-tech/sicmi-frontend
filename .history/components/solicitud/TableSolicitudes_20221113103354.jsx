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
  Image,
} from "@nextui-org/react";
import { IconButton } from "../icons/IconButton";
import { EyeIcon } from "../icons/EyeIcon";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { useRouter } from "next/router";
import { getTokenFromLocalCookie } from "../../lib/auth";
import { fetcher } from "../../lib/api";



const TableSolicitudes = ({ solicitudes }) => {
  const router = useRouter();

  return (
    <>
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
              <Table.Column>LOCAL</Table.Column>
              <Table.Column>DESCRIPCIÓN</Table.Column>
              <Table.Column>FECHA INICIO</Table.Column>
              <Table.Column>FECHA FIN</Table.Column>
              <Table.Column>ELABORADA POR</Table.Column>
              <Table.Column>DEMANDA DE MAT.</Table.Column>
              <Table.Column>ORDENES DE TRAB.</Table.Column>
              <Table.Column hideHeader={true} align="center">
                ACCIONES
              </Table.Column>
            </Table.Header>
            <Table.Body>
              {solicitudes &&
                solicitudes.data &&
                solicitudes.data.map((solicitudItem) => {
                  return (
                    <Table.Row key={solicitudItem.id}>
                      <Table.Cell>
                        <Text b size={14}>
                          {solicitudItem.attributes.local &&
                          solicitudItem.attributes.local.data
                            ? solicitudItem.attributes.local.data.attributes
                                .nombre
                            : ""}
                        </Text>
                      </Table.Cell>
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
                          {solicitudItem.attributes.elaboradopor &&
                          solicitudItem.attributes.elaboradopor.data
                            ? solicitudItem.attributes.elaboradopor.data
                                .attributes.username
                            : "-"}
                        </Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text b size={14}>
                          {solicitudItem.attributes.demanda_recursos.data
                            ? solicitudItem.attributes.demanda_recursos.data
                                .length
                            : "-"}
                        </Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text b size={14}>
                          {solicitudItem.attributes.ordenes_de_trabajos.data
                            ? solicitudItem.attributes.ordenes_de_trabajos.data
                                .length
                            : "-"}
                        </Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Row justify="center" align="center">
                          <Col css={{ d: "flex" }}>
                            <Tooltip content="Detalles" color="primary">
                              <IconButton
                                onClick={() => {
                                  router.push(
                                    `/cliente/solicitudes/show/${solicitudItem.id}`
                                  );
                                }}
                              >
                                <EyeIcon size={20} fill="#979797" />
                              </IconButton>
                            </Tooltip>
                            
                          </Col>
                        </Row>
                      </Table.Cell>
                      <Table.Cell>
                        <Row justify="center" align="center">
                          <Col css={{ d: "flex" }}>
                            <Tooltip content="Detalles" color="primary">
                              <IconButton
                                onClick={() => {
                                  router.push(
                                    `/cliente/solicitudes/show/${solicitudItem.id}`
                                  );
                                }}
                              >
                                <EyeIcon size={20} fill="#979797" />
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
