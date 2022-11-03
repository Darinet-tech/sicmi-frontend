import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

const PDFInmuebles = ({ inmuebles }) => {
  const styles = StyleSheet.create({
    page: { backgroundColor: "tomato" },
    section: { color: "white", textAlign: "center", margin: 30 },
    thead: {
      width: "100%",
    },
    trow: {
      width: "100%",
      height: "45",
    },
    th: {
      width: "30%",
      textAlign: "center",
      border: 1,
    },
  });

  return (
    <Document>
      <Page size="A4">
        <View style={styles.thead}>
          <View style={styles.trow}>
            <View style={styles.th}>
              <Text>DESCRIPCION</Text>
            </View>
            <View style={styles.th}>
              <Text>DIRECCION</Text>
            </View>
            <View style={styles.th}>
              <Text>CENTRO DE COSTO</Text>
            </View>
          </View>
        </View>
        {inmuebles &&
          inmuebles.data.map((inmuebleItem) => {
            return (
              <View style={styles.thead} key={inmuebleItem.id}>
                <View style={styles.trow}>
                  <View style={styles.th}>
                    <Text>{inmuebleItem.attributes.descripcion}</Text>
                  </View>
                  <View style={styles.th}>
                    <Text>{inmuebleItem.attributes.direccion}</Text>
                  </View>
                  <View style={styles.th}>
                    <Text>
                      {inmuebleItem.attributes.centrodecosto.data
                        ? inmuebleItem.attributes.centrodecosto.data.attributes
                            .centrocosto
                        : ""}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
      </Page>
    </Document>
  );
};

export default PDFInmuebles;
