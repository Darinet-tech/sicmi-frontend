import { useState } from "react";
import useSWR from "swr";
import { useFetchUser } from "../../../lib/authContext";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../../lib/auth";

import { fetcher } from "../../../lib/api";
import { Authentication, Layout } from "../../../components";
import LayoutAdmin from "../../../components/admin/LayoutAdmin";
import AddUsuario from "../../../components/usuario/AddUsuario";
import TableUsuarios from "../../../components/usuario/TableUsuarios";


export default function usuario({ usuarios, roles, uos }) {
  const { user, loading } = useFetchUser();
  const [pageIndex, setPageIndex] = useState(1);
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";

  const { data } = useSWR(
    [
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/users?populate[0]=role&populate[1]=unidadorganizativa`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      },
    ],
    fetcher,
    {
      fallbackData: usuarios,
    }
  );

  return (
    <Layout user={user} titulo="Admin" baseURL="./../">
      <LayoutAdmin>
        {!loading &&
          (user ? (
            <>
              <AddUsuario roles={roles} uos={uos} />

              {usuarios.length === 0 ? (
                <h2>No existen Usuarios registrados</h2>
              ) : (
                <>
                  <TableUsuarios usuarios={data} />
                </>
              )}
            </>
          ) : (
            <main>
              <Authentication />
            </main>
          ))}
      </LayoutAdmin>
    </Layout>
  );
}

export async function getServerSideProps({ req, params }) {
  const jwt =
    typeof window !== "undefined"
      ? getTokenFromLocalCookie()
      : getTokenFromServerCookie(req);

  const usuariosResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/users?populate[0]=role&populate[1]=unidadorganizativa`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  const rolesResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/users-permissions/roles`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  const uoResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/unidadorganizativas`,
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
      usuarios: usuariosResponse,
      roles: rolesResponse,
      uos: uoResponse
    },
  };
}
