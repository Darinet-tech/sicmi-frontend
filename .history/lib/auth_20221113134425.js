import Router from "next/router";
import Cookies from "js-cookie";
import { fetcher } from "./api";

export const setToken = (data) => {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.set("id", data.user.id);
  Cookies.set("username", data.user.username);
  Cookies.set("cargo", data.user.cargo);
  Cookies.set("jwt", data.jwt);


  fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me?populate[0]=role&populate[1]=unidadorganizativa`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.jwt}`,
      },
    }
  ).then((data) => {
    Cookies.set("rol", data.role ? data.role.name : "");
    Cookies.set(
      "uo",
      data.unidadorganizativa ? data.unidadorganizativa.id : ""
    );

    redirectByRole();
  });
};

export const unsetToken = () => {
  if (typeof window === "undefined") {
    return;
  }

  Cookies.remove("id");
  Cookies.remove("jwt");
  Cookies.remove("username");
  Cookies.remove("cargo");
  Cookies.remove("rol");
  Cookies.remove("uo");

  Router.asPath == "/" ? Router.reload() : Router.push("/");
};

export const getUserFromLocalCookie = () => {
  const jwt = getTokenFromLocalCookie();
  if (jwt) {
    return fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((data) => {
        return data.username;
      })
      .catch((error) => console.error(error));
  } else {
    return;
  }
};

export const getIdFromLocalCookie = () => {
  return Cookies.get("id");
};

export const redirectByRole = () => {
  const rolename = getRolFromLocalCookie();

  switch (rolename) {
    case "Especialista":
      Router.push("/especialista");
      break;
    case "Cliente":
      Router.push("/cliente");
      break;
    case "Administrador":
      Router.push("/admin");
      break;
    default:
      Router.push("/");
      break;
  }
};

export const getTokenFromLocalCookie = () => {
  return Cookies.get("jwt");
};

export const getTokenFromServerCookie = (req) => {
  if (!req.headers.cookie || "") {
    return undefined;
  }
  const jwtCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith("jwt="));
  if (!jwtCookie) {
    return undefined;
  }
  const jwt = jwtCookie.split("=")[1];
  return jwt;
};

export const getIdFromServerCookie = (req) => {
  if (!req.headers.cookie || "") {
    return undefined;
  }
  const idCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith("id="));
  if (!idCookie) {
    return undefined;
  }
  const id = idCookie.split("=")[1];
  return id;
};

export const getRolFromLocalCookie = () => {
  return Cookies.get("rol");
};

export const getRolFromServerCookie = (req) => {
  if (!req.headers.cookie || "") {
    return undefined;
  }
  const rolCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith("rol="));
  if (!rolCookie) {
    return undefined;
  }
  const rol = rolCookie.split("=")[1];
  return rol;
};

export const getUOFromLocalCookie = () => {
  return Cookies.get("uo");
};

export const getUOFromServerCookie = (req) => {
  if (!req.headers.cookie || "") {
    return undefined;
  }
  const uoCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith("uo="));
  if (!uoCookie) {
    return undefined;
  }
  const uo = uoCookie.split("=")[1];
  return uo;
};

export const getCargoFromLocalCookie = () => {
  return Cookies.get("cargo");
};

export const getUOFromServerCookie = (req) => {
  if (!req.headers.cookie || "") {
    return undefined;
  }
  const uoCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith("uo="));
  if (!uoCookie) {
    return undefined;
  }
  const uo = uoCookie.split("=")[1];
  return uo;
};
