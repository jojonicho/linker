import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Page, View, Document, StyleSheet } from "@react-pdf/renderer";
//@ts-ignore
import styled from "@react-pdf/styled-components";
import { Link } from "../generated/graphql";

// export function printDocument(canvasName: string, title: string) {
//   const input = document.getElementById(canvasName);
//   const pdf = new jsPDF({
//     orientation: "portrait",
//   });
//   if (pdf) {
//     html2canvas(input!, {
//       useCORS: true,
//     }).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save(`${title}.pdf`);
//     });
//   }
// }

const Heading = styled.Text`
  font-size: 17px;
  font-family: "Helvetica";
  margin-bottom: 5px;
`;
const StyledText = styled.Text`
  font-size: 11px;
  font-family: "Helvetica";
`;

const PDFLink = styled.Link`
  color: inherit;
`;

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E2E8F0",
    textDecoration: "none",
  },
  section: {
    margin: 10,
  },
});
export function MyDoc({ linker }: { linker: any }) {
  return (
    <Document>
      <Page size="A4">
        <View style={styles.section}>
          <Heading>{linker.title}</Heading>
          {linker.links &&
            linker.links.map(({ url }: Link) => (
              <StyledText>
                •{" "}
                {url.split("://").length > 1 ? (
                  <PDFLink src={`${url}`}>{`${url}`}</PDFLink>
                ) : url.split(".").length > 1 ? (
                  <PDFLink src={`https://${url}`}>{`${url}`}</PDFLink>
                ) : (
                  url
                )}
              </StyledText>
            ))}
        </View>
      </Page>
    </Document>
  );
}

export function printImage(canvasName: string, title: string) {
  const input = document.getElementById(canvasName);
  html2canvas(input!, {
    useCORS: true,
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    var link = document.createElement("a");
    if (typeof link.download === "string") {
      link.href = imgData;
      link.download = title;

      //Firefox requires the link to be in the body
      document.body.appendChild(link);

      //simulate click
      link.click();

      //remove the link when done
      document.body.removeChild(link);
    } else {
      window.open(imgData);
    }
    // pdf.save(`${title}.pdf`);
  });
}
