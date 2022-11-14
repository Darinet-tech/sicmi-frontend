/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  Collapse,
  Grid,
  Input,
  Text,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Layout } from "../../../../components";
import LayoutCliente from "../../../../components/cliente/LayoutCliente";
import TableDemandaMateriales from "../../../../components/solicitud/TableDemandaMaterialesCliente";
import TableOrdenesDeTrabajo from "../../../../components/solicitud/TableOrdenesDeTrabajoCliente";
import { fetcher } from "../../../../lib/api";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../../../lib/auth";
import { useFetchUser } from "../../../../lib/authContext";

export default function showPage({ recursosnorelacionados, tiposmtto }) {
  const { user, loading } = useFetchUser();
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";
  const router = useRouter();

  const [enableSolicitudMateriales, setEnableSolicitudMateriales] =
    useState(false);

  const [enableOrdenTrabajo, setEnableOrdenTrabajo] = useState(false);

  const [cantMateriales, setCantMateriales] = useState(0);
  const [cantMaterialesDisponibles, setCantMaterialesDisponibles] = useState(0);
  const [cantMaterialesEntregados, setCantMaterialesEntregados] = useState(0);

  useEffect(() => {
    cantMaterialesDisponibles == cantMateriales && cantMaterialesDisponibles > 0
      ? setEnableSolicitudMateriales(true)
      : setEnableSolicitudMateriales(false);
  }, [cantMaterialesDisponibles]);

  useEffect(() => {
    cantMaterialesEntregados == cantMateriales && cantMaterialesEntregados > 0
      ? setEnableOrdenTrabajo(true)
      : setEnableOrdenTrabajo(false);
  }, [cantMaterialesEntregados]);

  const [solicitud, setSolicitud] = useState({
    id: "",
    descripcion: "",
    fecha_ini: "",
    fecha_fin: "",
    local: null,
    elaboradopor: null,
    demanda_recursos: [],
    ordenes_de_trabajos: [],
  });

  const loadsolicitud = async (pid) => {
    try {
      const solicitud_loaded = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/solicitudes/${pid}?populate[0]=local&populate[1]=elaboradopor&populate[2]=demanda_recursos&populate[3]=demanda_recursos.recurso&populate[4]=ordenes_de_trabajos&populate[5]=ordenes_de_trabajos.consumos_recursos&populate[6]=ordenes_de_trabajos.tipo_mtto`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      setSolicitud({
        id: solicitud_loaded.data.id,
        descripcion: solicitud_loaded.data.attributes.descripcion,
        fecha_ini: solicitud_loaded.data.attributes.fecha_ini,
        fecha_fin: solicitud_loaded.data.attributes.fecha_fin,
        local: {
          id: solicitud_loaded.data.attributes.local.data
            ? solicitud_loaded.data.attributes.local.data.id
            : null,
          nombre: solicitud_loaded.data.attributes.local.data
            ? solicitud_loaded.data.attributes.local.data.attributes.nombre
            : "",
        },
        elaboradopor: {
          id: solicitud_loaded.data.attributes.elaboradopor.data
            ? solicitud_loaded.data.attributes.elaboradopor.data.id
            : null,
          username: solicitud_loaded.data.attributes.elaboradopor.data
            ? solicitud_loaded.data.attributes.elaboradopor.data.attributes
                .username
            : "",
        },
        demanda_recursos:
          solicitud_loaded.data.attributes.demanda_recursos.data,
        ordenes_de_trabajos:
          solicitud_loaded.data.attributes.ordenes_de_trabajos.data,
      });

      setCantMateriales(
        solicitud_loaded.data.attributes.demanda_recursos.data.length
      );

      let contador_disponibles = 0;
      let contador_entregados = 0;

      solicitud_loaded.data.attributes.demanda_recursos.data.map((ccItem) => {
        if (
          ccItem.attributes.demanda <=
          ccItem.attributes.recurso.data.attributes.libreutilizacion
        ) {
          contador_disponibles++;
        }
        if (ccItem.attributes.entregadodealmacen) {
          contador_entregados++;
        }
      });
      setCantMaterialesDisponibles(contador_disponibles);
      setCantMaterialesEntregados(contador_entregados);
    } catch (error) {
      router.push("/cliente/solicitudes");
    }
  };

  useEffect(() => {
    if (typeof router.query.id === "string") {
      loadsolicitud(router.query.id);
    }
  }, [router.query]);

  return (
    <Layout user={user} titulo="Especialista" baseURL="./../../../">
      <LayoutCliente>
        <Collapse.Group>
          <Collapse title="Datos Generales de la Solicitud de Mantenimiento">
            <Grid.Container gap={2} justify="center">
              <Grid xs={12}>
                <Textarea
                  label="Afectaci&oacute;n"
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  value={solicitud.descripcion}
                  disabled
                />
              </Grid>
              <Grid xs={6}>
                <Input
                  label="Fecha de Inicio"
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  value={solicitud.fecha_ini ? solicitud.fecha_ini : ""}
                  disabled
                />
              </Grid>
              <Grid xs={6}>
                <Input
                  label="Fecha de Cierre"
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  value={solicitud.fecha_fin ? solicitud.fecha_fin : ""}
                  disabled
                />
              </Grid>
              <Grid xs={6}>
                <Input
                  label="Local"
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  value={solicitud.local ? solicitud.local.nombre : ""}
                  disabled
                />
              </Grid>
              <Grid xs={6}>
                <Input
                  label="Elaborado por"
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  value={
                    solicitud.elaboradopor
                      ? solicitud.elaboradopor.username
                      : ""
                  }
                  disabled
                />
              </Grid>
            </Grid.Container>
          </Collapse>
          <Collapse title="Demanda de Materiales">
            {solicitud.demanda_recursos &&
            solicitud.demanda_recursos.length > 0 ? (
              <>
                <TableDemandaMateriales
                  demanda_recursos={solicitud.demanda_recursos}
                  recursosnorelacionados={recursosnorelacionados}
                />
              </>
            ) : (
              <Text h3 color="warning">
                No existen Demandas de Materiales registradas
              </Text>
            )}
          </Collapse>
          <Collapse title="Ordenes de Trabajo">
            {solicitud.ordenes_de_trabajos &&
            solicitud.ordenes_de_trabajos.length > 0 ? (
              <TableOrdenesDeTrabajo
                ordenes_de_trabajos={solicitud.ordenes_de_trabajos}
                tiposmtto={tiposmtto}
              />
            ) : (
              <Text h3 color="warning">
                No existen Ordenes de Trabajo registradas
              </Text>
            )}
          </Collapse>
        </Collapse.Group>
      </LayoutCliente>
    </Layout>
  );
}

export async function getServerSideProps({ req, params }) {
  const jwt =
    typeof window !== "undefined"
      ? getTokenFromLocalCookie()
      : getTokenFromServerCookie(req);

  const idsolicitud = params.id;

  const recursosRelatedResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/recursos?fields[0]=id&filters[demanda_recursos][solicitud][id][$eq]=${idsolicitud}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  const recursosNotRelatedResponse = await fetcher(
    `${
      process.env.NEXT_PUBLIC_STRAPI_URL
    }/recursos?filters[$or][0][demanda_recursos][id][$null]=true${recursosRelatedResponse.data.map(
      (recursorelated, i) => {
        return `&filters[$and][${i + 1}][id][$notIn]=${
          recursorelated.attributes.id
        }`;
      }
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  const tiposMttoResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/tipo-mttos`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  return {
    props: {
      recursosnorelacionados: recursosNotRelatedResponse,
      tiposmtto: tiposMttoResponse,
    },
  };
}
