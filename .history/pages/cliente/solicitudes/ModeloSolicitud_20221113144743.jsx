import React from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Modal, Button, Grid, Table, Text, Image } from "@nextui-org/react";
import { TableBody } from "@mui/material";
import { Row } from "antd";
import solicitudes from ".";
import { getCargoFromLocalCookie } from "../../../lib/auth";
import { useFetchUser } from "../../../lib/authContext";

export default function ModeloSolicitud({solicitud}) {
  const { user, loading } = useFetchUser();
  const cargouser = typeof window !== "undefined" ? getCargoFromLocalCookie() : "";
  const [visible, setVisible] = React.useState(false);
  const handler = () => {
    setVisible(true);
  };

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Modelo-Solicitudes",
    onAfterPrint: () => {
      console.log("Modelo de Solicitudes generado exitosamente");
    },
  });
  return (
    <div>
      <Button auto light onClick={handler}>
        <Image src="/images/icons8-imprimir-96.png" css={{ width:"25px"}}/>
      </Button>
      <Modal
        fullScreen
        ref={componentRef}
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Body css={{ paddingBottom: "80px" }}>
          <div ref={componentRef} style={{ margin: "10px" }}>
            <div style={{ textAlign: "center" }}>
              <h5>ANEXO 1 REG.1-PE-SG-020/18</h5>
              <h5>SOLICITUD DEL SERVICIO DE MANTENIMIENTO</h5>
            </div>
            <table
              className="MsoNormalTable"
              border={1}
              cellSpacing={0}
              cellPadding={0}
              style={{
                width:'100%',
                borderCollapse: "collapse",
                border: "none",
                msoBorderAlt: "solid windowtext .5pt",
                msoYftiTbllook: 1184,
                msoPaddingAlt: "0in 5.4pt 0in 5.4pt",
                msoBorderInsideh: ".5pt solid windowtext",
                msoBorderInsidev: ".5pt solid windowtext",
              }}
            >
              <tbody>
                <tr
                  style={{
                    msoYftiIrow: 0,
                    msoYftiFirstrow: "yes",
                    height: "23.15pt",
                  }}
                >
                  <td
                    width={589}
                    colSpan={3}
                    valign="top"
                    style={{
                      width: "441.4pt",
                      border: "solid windowtext 1.0pt",
                      msoBorderAlt: "solid windowtext .5pt",
                      padding: "0in 5.4pt 0in 5.4pt",
                      height: "23.15pt",
                    }}
                  >
                    <p
                      className="MsoNormal"
                      align="center"
                      style={{
                        marginTop: "6.0pt",
                        marginRight: "0in",
                        marginBottom: "0in",
                        marginLeft: "0in",
                        textAlign: "center",
                        lineHeight: "normal",
                      }}
                    >
                      <span
                        lang="ES"
                        style={{
                          fontFamily: '"Arial",sans-serif',
                          msoAnsiLanguage: "ES",
                        }}
                      >
                        REG.1-PE-SG-020/18
                        &nbsp;
                        <b>
                          SOLICITUD DEL SERVICIO DE MANTENIMIENTO                          
                        </b>
                      </span>
                    </p>
                  </td>
                </tr>
                <tr style={{ msoYftiIrow: 1, height: "17.3pt" }}>
                  <td
                    width={589}
                    colSpan={3}
                    valign="top"
                    style={{
                      width: "441.4pt",
                      border: "solid windowtext 1.0pt",
                      borderTop: "none",
                      msoBorderTopAlt: "solid windowtext .5pt",
                      msoBorderAlt: "solid windowtext .5pt",
                      padding: "0in 5.4pt 0in 5.4pt",
                      height: "17.3pt",
                    }}
                  >
                    <p
                      className="MsoNormal"
                      style={{ marginBottom: "0in", lineHeight: "normal" }}
                    >
                      <b>
                        <span
                          lang="ES"
                          style={{
                            fontFamily: '"Arial",sans-serif',
                            msoAnsiLanguage: "ES",
                          }}
                        >
                          Unidad Organizativa: {solicitud.attributes.local.data.attributes.arearesponsable.data.attributes.unidadorganizativa.data.attributes.nombre}
                          
                        </span>
                      </b>
                    </p>
                  </td>
                  <td
                    width={196}
                    valign="top"
                    style={{
                      width: "147.15pt",
                      borderTop: "none",
                      borderLeft: "none",
                      borderBottom: "solid windowtext 1.0pt",
                      borderRight: "solid windowtext 1.0pt",
                      msoBorderTopAlt: "solid windowtext .5pt",
                      msoBorderLeftAlt: "solid windowtext .5pt",
                      msoBorderAlt: "solid windowtext .5pt",
                      padding: "0in 5.4pt 0in 5.4pt",
                    }}
                  >
                    <p
                      className="MsoNormal"
                      align="center"
                      style={{
                        marginBottom: "0in",
                        textAlign: "center",
                        lineHeight: "normal",
                      }}
                    >
                      <b>
                        <span
                          lang="ES"
                          style={{
                            fontFamily: '"Arial",sans-serif',
                            msoAnsiLanguage: "ES",
                          }}
                        >
                          {user}
                        </span>
                      </b>
                    </p>
                  </td>
                </tr>
                <tr style={{ msoYftiIrow: 2 }}>
                  <td
                    width={589}
                    colSpan={3}
                    valign="top"
                    style={{
                      width: "441.4pt",
                      border: "solid windowtext 1.0pt",
                      borderTop: "none",
                      msoBorderTopAlt: "solid windowtext .5pt",
                      msoBorderAlt: "solid windowtext .5pt",
                      padding: "0in 5.4pt 0in 5.4pt",
                    }}
                  >
                    <p
                      className="MsoNormal"
                      style={{ marginBottom: "0in", lineHeight: "normal" }}
                    >
                      <b>
                        <span
                          lang="ES"
                          style={{
                            fontFamily: '"Arial",sans-serif',
                            msoAnsiLanguage: "ES",
                          }}
                        >
                          Nombre del Inmueble: {solicitud.attributes.local.data.attributes.inmueble.data.attributes.descripcion}
                          
                        </span>
                      </b>
                    </p>
                  </td>
                </tr>
                <tr style={{ msoYftiIrow: 3 }}>
                  <td
                    width={589}
                    colSpan={3}
                    valign="top"
                    style={{
                      width: "441.4pt",
                      border: "solid windowtext 1.0pt",
                      borderTop: "none",
                      msoBorderTopAlt: "solid windowtext .5pt",
                      msoBorderAlt: "solid windowtext .5pt",
                      padding: "0in 5.4pt 0in 5.4pt",
                    }}
                  >
                    <p
                      className="MsoNormal"
                      style={{ marginBottom: "0in", lineHeight: "normal" }}
                    >
                      <b>
                        <span
                          lang="ES"
                          style={{
                            fontFamily: '"Arial",sans-serif',
                            msoAnsiLanguage: "ES",
                          }}
                        >
                          Área solicitante: {solicitud.attributes.local.data.attributes.arearesponsable.data.attributes.nombre}
                          
                        </span>
                      </b>
                    </p>
                  </td>
                </tr>
                <tr style={{ msoYftiIrow: 4 }}>
                  <td
                    width={589}
                    colSpan={3}
                    valign="top"
                    style={{
                      width: "441.4pt",
                      border: "solid windowtext 1.0pt",
                      borderTop: "none",
                      msoBorderTopAlt: "solid windowtext .5pt",
                      msoBorderAlt: "solid windowtext .5pt",
                      padding: "0in 5.4pt 0in 5.4pt",
                    }}
                  >
                    <p
                      className="MsoNormal"
                      style={{ marginBottom: "0in", lineHeight: "normal" }}
                    >
                      <b>
                        <span
                          lang="ES"
                          style={{
                            fontFamily: '"Arial",sans-serif',
                            msoAnsiLanguage: "ES",
                          }}
                        >
                          Centro de Costo: {solicitud.attributes.local.data.attributes.arearesponsable.data.attributes.centrodecosto}
                          
                        </span>
                      </b>
                    </p>
                  </td>
                </tr>
                <tr style={{ msoYftiIrow: 5 }}>
                  <td
                    width={589}
                    colSpan={3}
                    valign="top"
                    style={{
                      width: "441.4pt",
                      border: "solid windowtext 1.0pt",
                      borderTop: "none",
                      msoBorderTopAlt: "solid windowtext .5pt",
                      msoBorderAlt: "solid windowtext .5pt",
                      padding: "0in 5.4pt 0in 5.4pt",
                    }}
                  >
                    <p
                      className="MsoNormal"
                      style={{ marginBottom: "0in", lineHeight: "normal" }}
                    >
                      <b>
                        <span
                          lang="ES"
                          style={{
                            fontFamily: '"Arial",sans-serif',
                            msoAnsiLanguage: "ES",
                          }}
                        >
                          Local donde ocurre la incidencia: {solicitud.attributes.local.data.attributes.nombre}
                          
                        </span>
                      </b>
                    </p>
                  </td>
                </tr>
                <tr style={{ msoYftiIrow: 6 }}>
                  <td
                    width={589}
                    colSpan={3}
                    valign="top"
                    style={{
                      width: "441.4pt",
                      border: "solid windowtext 1.0pt",
                      borderTop: "none",
                      msoBorderTopAlt: "solid windowtext .5pt",
                      msoBorderAlt: "solid windowtext .5pt",
                      padding: "0in 5.4pt 0in 5.4pt",
                    }}
                  >
                    <p
                      className="MsoNormal"
                      style={{ marginBottom: "0in", lineHeight: "normal" }}
                    >
                      <b>
                        <span
                          lang="ES"
                          style={{
                            fontFamily: '"Arial",sans-serif',
                            msoAnsiLanguage: "ES",
                          }}
                        >
                          Descripción de las afectaciones:
                        </span>
                      </b>
                    </p>
                  </td>
                </tr>
                <tr style={{ msoYftiIrow: 7, height: "166.25pt" }}>
                  <td
                    width={589}
                    colSpan={3}
                    valign="top"
                    style={{
                      width: "441.4pt",
                      border: "solid windowtext 1.0pt",
                      borderTop: "none",
                      msoBorderTopAlt: "solid windowtext .5pt",
                      msoBorderAlt: "solid windowtext .5pt",
                      padding: "0in 5.4pt 0in 5.4pt",
                      height: "166.25pt",
                    }}
                  >
                    <p
                      className="MsoNormal"
                      style={{
                        marginBottom: "0in",
                        textAlign: "justify",
                        lineHeight: "normal",
                      }}
                    >
                      <span
                        lang="ES"
                        style={{
                          fontFamily: '"Arial",sans-serif',
                          msoAnsiLanguage: "ES",
                        }}
                      >
                        {solicitud.attributes.descripcion}
                      </span>
                    </p>
                  </td>
                </tr>
                <tr style={{ msoYftiIrow: 8 }}>
                  <td
                    width={392}
                    colSpan={2}
                    valign="top"
                    style={{
                      width: "294.25pt",
                      border: "solid windowtext 1.0pt",
                      borderTop: "none",
                      msoBorderTopAlt: "solid windowtext .5pt",
                      msoBorderAlt: "solid windowtext .5pt",
                      padding: "0in 5.4pt 0in 5.4pt",
                    }}
                  >
                    <p
                      className="MsoNormal"
                      style={{ marginBottom: "0in", lineHeight: "normal" }}
                    >
                      <b>
                        <span
                          lang="ES"
                          style={{
                            fontFamily: '"Arial",sans-serif',
                            msoAnsiLanguage: "ES",
                          }}
                        >
                          Elaborado por:
                          
                        </span>
                      </b>
                    </p>
                  </td>
                  <td
                    width={196}
                    valign="top"
                    style={{
                      width: "147.15pt",
                      borderTop: "none",
                      borderLeft: "none",
                      borderBottom: "solid windowtext 1.0pt",
                      borderRight: "solid windowtext 1.0pt",
                      msoBorderTopAlt: "solid windowtext .5pt",
                      msoBorderLeftAlt: "solid windowtext .5pt",
                      msoBorderAlt: "solid windowtext .5pt",
                      padding: "0in 5.4pt 0in 5.4pt",
                    }}
                  >
                    <p
                      className="MsoNormal"
                      align="center"
                      style={{
                        marginBottom: "0in",
                        textAlign: "center",
                        lineHeight: "normal",
                      }}
                    >
                      <b>
                        <span
                          lang="ES"
                          style={{
                            fontFamily: '"Arial",sans-serif',
                            msoAnsiLanguage: "ES",
                          }}
                        >
                          Firma
                          
                        </span>
                      </b>
                    </p>
                  </td>
                </tr>
                <tr style={{ msoYftiIrow: 9 }}>
                  <td
                    width={196}
                    valign="top"
                    style={{
                      width: "147.1pt",
                      border: "solid windowtext 1.0pt",
                      borderTop: "none",
                      msoBorderTopAlt: "solid windowtext .5pt",
                      msoBorderAlt: "solid windowtext .5pt",
                      padding: "0in 5.4pt 0in 5.4pt",
                    }}
                  >
                    <p
                      className="MsoNormal"
                      style={{ marginBottom: "0in", lineHeight: "normal" }}
                    >
                      <span
                        lang="ES"
                        style={{
                          fontFamily: '"Arial",sans-serif',
                          msoAnsiLanguage: "ES",
                        }}
                      >
                        Nombre y Apellidos:
                        
                      </span>
                    </p>
                  </td>
                  <td
                    width={196}
                    valign="top"
                    style={{
                      width: "147.15pt",
                      borderTop: "none",
                      borderLeft: "none",
                      borderBottom: "solid windowtext 1.0pt",
                      borderRight: "solid windowtext 1.0pt",
                      msoBorderTopAlt: "solid windowtext .5pt",
                      msoBorderLeftAlt: "solid windowtext .5pt",
                      msoBorderAlt: "solid windowtext .5pt",
                      padding: "0in 5.4pt 0in 5.4pt",
                    }}
                  >
                    <p
                      className="MsoNormal"
                      align="center"
                      style={{
                        marginBottom: "0in",
                        textAlign: "center",
                        lineHeight: "normal",
                      }}
                    >
                      <b>
                        <span
                          lang="ES"
                          style={{
                            fontFamily: '"Arial",sans-serif',
                            msoAnsiLanguage: "ES",
                          }}
                        >
                          {user}
                        </span>
                      </b>
                    </p>
                  </td>
                  <td
                    width={196}
                    rowSpan={3}
                    valign="top"
                    style={{
                      width: "147.15pt",
                      borderTop: "none",
                      borderLeft: "none",
                      borderBottom: "solid windowtext 1.0pt",
                      borderRight: "solid windowtext 1.0pt",
                      msoBorderTopAlt: "solid windowtext .5pt",
                      msoBorderLeftAlt: "solid windowtext .5pt",
                      msoBorderAlt: "solid windowtext .5pt",
                      padding: "0in 5.4pt 0in 5.4pt",
                    }}
                  >
                    <p
                      className="MsoNormal"
                      align="center"
                      style={{
                        marginBottom: "0in",
                        textAlign: "center",
                        lineHeight: "normal",
                      }}
                    >
                      <b>
                        <span
                          lang="ES"
                          style={{
                            fontFamily: '"Arial",sans-serif',
                            msoAnsiLanguage: "ES",
                          }}
                        >
                          
                        </span>
                      </b>
                    </p>
                  </td>
                </tr>
                <tr style={{ msoYftiIrow: 10 }}>
                  <td
                    width={196}
                    valign="top"
                    style={{
                      width: "147.1pt",
                      border: "solid windowtext 1.0pt",
                      borderTop: "none",
                      msoBorderTopAlt: "solid windowtext .5pt",
                      msoBorderAlt: "solid windowtext .5pt",
                      padding: "0in 5.4pt 0in 5.4pt",
                    }}
                  >
                    <p
                      className="MsoNormal"
                      style={{ marginBottom: "0in", lineHeight: "normal" }}
                    >
                      <span
                        lang="ES"
                        style={{
                          fontFamily: '"Arial",sans-serif',
                          msoAnsiLanguage: "ES",
                        }}
                      >
                        Cargo:
                        
                      </span>
                    </p>
                  </td>
                  <td
                    width={196}
                    valign="top"
                    style={{
                      width: "147.15pt",
                      borderTop: "none",
                      borderLeft: "none",
                      borderBottom: "solid windowtext 1.0pt",
                      borderRight: "solid windowtext 1.0pt",
                      msoBorderTopAlt: "solid windowtext .5pt",
                      msoBorderLeftAlt: "solid windowtext .5pt",
                      msoBorderAlt: "solid windowtext .5pt",
                      padding: "0in 5.4pt 0in 5.4pt",
                    }}
                  >
                    <p
                      className="MsoNormal"
                      align="center"
                      style={{
                        marginBottom: "0in",
                        textAlign: "center",
                        lineHeight: "normal",
                      }}
                    >
                      <b>
                        <span
                          lang="ES"
                          style={{
                            fontFamily: '"Arial",sans-serif',
                            msoAnsiLanguage: "ES",
                          }}
                        >
                          {cargouser!='null'?cargouser:''}
                        </span>
                      </b>
                    </p>
                  </td>
                </tr>
                <tr style={{ msoYftiIrow: 11, msoYftiLastrow: "yes" }}>
                  <td
                    width={196}
                    valign="top"
                    style={{
                      width: "147.1pt",
                      border: "solid windowtext 1.0pt",
                      borderTop: "none",
                      msoBorderTopAlt: "solid windowtext .5pt",
                      msoBorderAlt: "solid windowtext .5pt",
                      padding: "0in 5.4pt 0in 5.4pt",
                    }}
                  >
                    <p
                      className="MsoNormal"
                      style={{ marginBottom: "0in", lineHeight: "normal" }}
                    >
                      <span
                        lang="ES"
                        style={{
                          fontFamily: '"Arial",sans-serif',
                          msoAnsiLanguage: "ES",
                        }}
                      >
                        Fecha:
                        
                      </span>
                    </p>
                  </td>
                  <td
                    width={196}
                    valign="top"
                    style={{
                      width: "147.15pt",
                      borderTop: "none",
                      borderLeft: "none",
                      borderBottom: "solid windowtext 1.0pt",
                      borderRight: "solid windowtext 1.0pt",
                      msoBorderTopAlt: "solid windowtext .5pt",
                      msoBorderLeftAlt: "solid windowtext .5pt",
                      msoBorderAlt: "solid windowtext .5pt",
                      padding: "0in 5.4pt 0in 5.4pt",
                    }}
                  >
                    <p
                      className="MsoNormal"
                      align="center"
                      style={{
                        marginBottom: "0in",
                        textAlign: "center",
                        lineHeight: "normal",
                      }}
                    >
                      <b>
                        <span
                          lang="ES"
                          style={{
                            fontFamily: '"Arial",sans-serif',
                            msoAnsiLanguage: "ES",
                          }}
                        >
                          {solicitud.attributes.fecha_ini}
                        </span>
                      </b>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            css={{ position: "absolute", right: "10px", bottom: "10px" }}
            auto
            onClick={handlePrint}
          >
            Imprimir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
