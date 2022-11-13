/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Collapse, Grid, Input, Textarea } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Layout } from "../../../../components";
import LayoutEspecialista from "../../../../components/especialista/LayoutEspecialista";
import AddDemandaMaterial from "../../../../components/solicitud/AddDemandaMaterial";
import AddOrdenDeTrabajo from "../../../../components/solicitud/AddOrdenDeTrabajo";
import TableDemandaMateriales from "../../../../components/solicitud/TableDemandaMateriales";
import TableOrdenesDeTrabajo from "../../../../components/solicitud/TableOrdenesDeTrabajo";
import { fetcher } from "../../../../lib/api";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../../../lib/auth";
import { useFetchUser } from "../../../../lib/authContext";

export default function showPage({ recursosnorelacionados }) {
  const { user, loading } = useFetchUser();
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";
  const router = useRouter();

  const [enableSolicitudMateriales, setEnableSolicitudMateriales] =
    useState(false);

  const [cantMaterialesDisponibles, setCantMaterialesDisponibles] = useState(0);
  const [cantMateriales, setCantMateriales] = useState(0);

  useEffect(() => {
    cantMaterialesDisponibles == cantMateriales && cantMaterialesDisponibles > 0
      ? setEnableSolicitudMateriales(true)
      : setEnableSolicitudMateriales(false);
  }, [cantMaterialesDisponibles]);

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
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/solicitudes/${pid}?populate[0]=local&populate[1]=elaboradopor&populate[2]=demanda_recursos&populate[3]=demanda_recursos.recurso&populate[4]=ordenes_de_trabajos`,
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

      let contador = 0;

      solicitud_loaded.data.attributes.demanda_recursos.data.map((ccItem) => {
        if (
          ccItem.attributes.demanda <=
          ccItem.attributes.recurso.data.attributes.libreutilizacion
        ) {
          contador++;
        }
      });
      setCantMaterialesDisponibles(contador);
    } catch (error) {
      router.push("/especialista/solicitudes");
    }
  };

  useEffect(() => {
    if (typeof router.query.id === "string") {
      loadsolicitud(router.query.id);
    }
  }, [router.query]);

  return (
    <Layout user={user} titulo="Especialista" baseURL="./../../../">
      <LayoutEspecialista>
        <Collapse.Group>
          <Collapse
            title="Datos Generales de la Solicitud de Mantenimiento"
            expanded
          >
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
            <AddDemandaMaterial
              idsolicitud={solicitud.id}
              recursosnorelacionados={recursosnorelacionados}
            />
            {solicitud.demanda_recursos &&
            solicitud.demanda_recursos.length > 0 ? (
              <>
                <TableDemandaMateriales
                  demanda_recursos={solicitud.demanda_recursos}
                  recursosnorelacionados={recursosnorelacionados}
                />
                <Button
                  ghost
                  auto
                  disabled={!enableSolicitudMateriales}
                  onClick={() => {}}
                >
                  Mostrar Vista Previa de Solicitud de Materiales
                </Button>
              </>
            ) : (
              <h3>No existen Demandas de Materiales registradas</h3>
            )}
          </Collapse>
          <Collapse title="Ordenes de Trabajo">
            <AddOrdenDeTrabajo />
            {solicitud.ordenes_de_trabajos &&
            solicitud.ordenes_de_trabajos.length > 0 ? (
              <TableOrdenesDeTrabajo />
            ) : (
              <h3>No existen Ordenes de Trabajo registradas</h3>
            )}
          </Collapse>
        </Collapse.Group>
      </LayoutEspecialista>
    </Layout>
  );
}

export async function getServerSideProps({ req, params }) {
  const jwt =
    typeof window !== "undefined"
      ? getTokenFromLocalCookie()
      : getTokenFromServerCookie(req);

  const idsolicitud = params.id;

  const recursosResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/recursos?filters[$or][0][demanda_recursos][solicitud][id][$ne]=${idsolicitud}&filters[$or][1][demanda_recursos][id][$null]=true`,
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
      recursosnorelacionados: recursosResponse,
    },
  };
}
