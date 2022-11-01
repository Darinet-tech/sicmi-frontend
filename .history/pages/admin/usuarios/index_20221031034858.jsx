import { useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import useSWR from "swr";
import { useFetchUser } from "../../../lib/authContext";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../../lib/auth";

import { fetcher } from "../../../lib/api";
import { Authentication, Layout } from "../../../components";
import LayoutAdmin from "../../../components/especialista/LayoutAdmin";
import AddUsuario from "../../../components/usuario/AddUsuario";
import TableUsuario from "../../../components/usuario/TableUsuario";

export default function usuario({ usuarios, centrodecostos }) {
  const { user, loading } = useFetchUser();
  const [pageIndex, setPageIndex] = useState(1);
  const jwt = typeof window !== "undefined" ? getTokenFromLocalCookie() : "";

  const { data } = useSWR(
    [
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/usuarios?populate[0]=centrodecosto&pagination[page]=${pageIndex}&pagination[pageSize]=5`,
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
      fallbackData: inmuebles,
    }
  );

  return (
    <Layout user={user} titulo="Especialista" baseURL="./../">
      <LayoutEspecialista>
        {!loading &&
          (user ? (
            <>
              <AddInmueble centrodecostos={centrodecostos} />

              {inmuebles.data.length === 0 ? (
                <h2>No existen Inmuebles registrados</h2>
              ) : (
                <>
                  <TableInmuebles inmuebles={data} />
                  <div className="space-x-2 space-y-2">
                    <button
                      className={`md:p-2 rounded py-2 text-black text-white p-2 ${
                        pageIndex === 1 ? "bg-gray-300" : "bg-blue-400"
                      }`}
                      disabled={pageIndex === 1}
                      onClick={() => setPageIndex(pageIndex - 1)}
                    >
                      {" "}
                      <FaArrowAltCircleLeft />
                    </button>
                    <button
                      className={`md:p-2 rounded py-2 text-black text-white p-2 ${
                        pageIndex === (data && data.meta.pagination.pageCount)
                          ? "bg-gray-300"
                          : "bg-blue-400"
                      }`}
                      disabled={
                        pageIndex === (data && data.meta.pagination.pageCount)
                      }
                      onClick={() => setPageIndex(pageIndex + 1)}
                    >
                      <FaArrowAltCircleRight />
                    </button>
                    <span>{`${pageIndex} de ${
                      data && data.meta.pagination.pageCount
                    }`}</span>
                  </div>
                </>
              )}
            </>
          ) : (
            <main>
              <Authentication />
            </main>
          ))}
      </LayoutEspecialista>
    </Layout>
  );
}

export async function getServerSideProps({ req, params }) {
  const jwt =
    typeof window !== "undefined"
      ? getTokenFromLocalCookie()
      : getTokenFromServerCookie(req);

  const inmueblesResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/inmuebles?populate[0]=centrodecosto&pagination[page]=1&pagination[pageSize]=5`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  const centrosResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/centrodecostos`,
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
      inmuebles: inmueblesResponse,
      centrodecostos: centrosResponse,
    },
  };
}
