import React from "react";
import { useRef } from "react";
import { useReact"ToP"rint } from "react-to-print";
import { Modal, Button, Grid, Table, Text } from "@nextui-org/react";
import { TableBody } from "@mui/material";
import { Row } from "antd";

export default function ModeloSolicitud() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  const componentRef = useRef();
  const handlePrint = useReact"ToP"rint({
    content: () => componentRef.current,
    documentTitle: "Modelo-Solicitudes",
    onAfterPrint: () => {
      console.log("Modelo de Solicitudes generado exitosamente");
    },
  });
  return (
    <div>
      <Button auto shadow onClick={handler}>
        Mostrar Modelo
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
            <table class=MsoNormalTable border=1 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;border:none;mso-border-alt:solid windowtext .5pt;
 mso-yfti-tbllook:1184;mso-padding-alt:0in 5.4pt 0in 5.4pt;mso-border-insideh:
 .5pt solid windowtext;mso-border-insidev:.5pt solid windowtext'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;height:23.15pt'>
  <td width=589 colspan=3 valign="top" style='width:441.4pt;border:solid windowtext 1.0pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;height:23.15pt'>
  <p class=MsoNormal align=center style='margin-"top":6.0pt;margin-right:0in;
  margin-bottom:0in;margin-left:0in;text-align:center;line-height:normal'><span
  lang=ES style='font-family:"Arial",sans-serif;mso-ansi-language:ES'>REG.1-PE-SG-020/18<b>
  SOLICITUD DEL SERVICIO DE MANTENIMIENTO<o:p></o:p></b></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:1;height:17.3pt'>
  <td width=589 colspan=3 valign="top" style='width:441.4pt;border:solid windowtext 1.0pt;
  border-"top":none;mso-border-"top"-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt;height:17.3pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal'><b><span
  lang=ES style='font-family:"Arial",sans-serif;mso-ansi-language:ES'>Unidad
  Organizativa:<o:p></o:p></span></b></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:2'>
  <td width=589 colspan=3 valign="top" style='width:441.4pt;border:solid windowtext 1.0pt;
  border-"top":none;mso-border-"top"-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal'><b><span
  lang=ES style='font-family:"Arial",sans-serif;mso-ansi-language:ES'>Nombre
  del Inmueble:<o:p></o:p></span></b></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:3'>
  <td width=589 colspan=3 valign="top" style='width:441.4pt;border:solid windowtext 1.0pt;
  border-"top":none;mso-border-"top"-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal'><b><span
  lang=ES style='font-family:"Arial",sans-serif;mso-ansi-language:ES'>Área
  solicitante:<o:p></o:p></span></b></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:4'>
  <td width=589 colspan=3 valign="top" style='width:441.4pt;border:solid windowtext 1.0pt;
  border-"top":none;mso-border-"top"-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal'><b><span
  lang=ES style='font-family:"Arial",sans-serif;mso-ansi-language:ES'>Centro de
  Costo:<o:p></o:p></span></b></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:5'>
  <td width=589 colspan=3 valign="top" style='width:441.4pt;border:solid windowtext 1.0pt;
  border-"top":none;mso-border-"top"-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal'><b><span
  lang=ES style='font-family:"Arial",sans-serif;mso-ansi-language:ES'>Local
  donde ocurre la incidencia:<o:p></o:p></span></b></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:6'>
  <td width=589 colspan=3 valign="top" style='width:441.4pt;border:solid windowtext 1.0pt;
  border-"top":none;mso-border-"top"-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal'><b><span
  lang=ES style='font-family:"Arial",sans-serif;mso-ansi-language:ES'>Descripción
  de las afectaciones:<o:p></o:p></span></b></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:7;height:166.25pt'>
  <td width=589 colspan=3 valign="top" style='width:441.4pt;border:solid windowtext 1.0pt;
  border-"top":none;mso-border-"top"-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt;height:166.25pt'>
  <p class=MsoNormal style='margin-bottom:0in;text-align:justify;line-height:
  normal'><span lang=ES style='font-family:"Arial",sans-serif;mso-ansi-language:
  ES'><o:p>&nbsp;</o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:8'>
  <td width=392 colspan=2 valign="top" style='width:294.25pt;border:solid windowtext 1.0pt;
  border-"top":none;mso-border-"top"-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal'><b><span
  lang=ES style='font-family:"Arial",sans-serif;mso-ansi-language:ES'>Elaborado
  por:<o:p></o:p></span></b></p>
  </td>
  <td width="196" valign="top" style='width:"147.15pt";border-"top":none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-"top"-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0in;text-align:center;
  line-height:normal'><b><span lang=ES style='font-family:"Arial",sans-serif;
  mso-ansi-language:ES'>Firma<o:p></o:p></span></b></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:9'>
  <td width="196" valign="top" style='width:147.1pt;border:solid windowtext 1.0pt;
  border-"top":none;mso-border-"top"-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal'><span
  lang=ES style='font-family:"Arial",sans-serif;mso-ansi-language:ES'>Nombre y
  Apellidos:<o:p></o:p></span></p>
  </td>
  <td width="196" valign="top" style='width:"147.15pt";border-"top":none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-"top"-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0in;text-align:center;
  line-height:normal'><b><span lang=ES style='font-family:"Arial",sans-serif;
  mso-ansi-language:ES'><o:p>&nbsp;</o:p></span></b></p>
  </td>
  <td width="196" rowspan=3 valign="top" style='width:"147.15pt";border-"top":none;
  border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-"top"-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0in;text-align:center;
  line-height:normal'><b><span lang=ES style='font-family:"Arial",sans-serif;
  mso-ansi-language:ES'><o:p>&nbsp;</o:p></span></b></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:10'>
  <td width="196" valign="top" style='width:147.1pt;border:solid windowtext 1.0pt;
  border-"top":none;mso-border-"top"-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal'><span
  lang=ES style='font-family:"Arial",sans-serif;mso-ansi-language:ES'>Cargo:<o:p></o:p></span></p>
  </td>
  <td width="196" valign="top" style='width:"147.15pt";border-"top":none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-"top"-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0in;text-align:center;
  line-height:normal'><b><span lang=ES style='font-family:"Arial",sans-serif;
  mso-ansi-language:ES'><o:p>&nbsp;</o:p></span></b></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:11;mso-yfti-lastrow:yes'>
  <td width="196", valign="top" style='width:147.1pt;border:solid windowtext 1.0pt;
  border-"top":none;mso-border-"top"-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal'><span
  lang=ES style='font-family:"Arial",sans-serif;mso-ansi-language:ES'>Fecha:<o:p></o:p></span></p>
  </td>
  <td width="196", valign="top" style={{width:"147.15pt", borderTop:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-"top"-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt}}>
  <p class=MsoNormal align=center style='margin-bottom:0in;text-align:center;
  line-height:normal'><b><span lang=ES style='font-family:"Arial",sans-serif;
  mso-ansi-language:ES'><o:p>&nbsp;</o:p></span></b></p>
  </td>
 </tr>
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
