import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

const PDFInmuebles = ({ inmuebles }) => {
  const styles = StyleSheet.create({
    page: { backgroundColor: "tomato" },
    section: { color: "white", textAlign: "center", margin: 30 },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {inmuebles &&
            inmuebles.data.map((inmuebleItem) => {
              return (
                <Text key={inmuebleItem.id}>
                  {inmuebleItem.attributes.descripcion}
                </Text>
              );
            })}
        </View>
      </Page>
    </Document>
  );
};

export default PDFInmuebles;
