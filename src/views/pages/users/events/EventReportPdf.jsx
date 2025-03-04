import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  pdf,
} from "@react-pdf/renderer";
import saveAs from "file-saver";
import predictRAMLogo from "../../../../assets/images/predictramlogo.jpg";
import { useEffect } from "react";

// Styles for the PDF document
const styles = StyleSheet.create({
  body: {
    padding: 20,
    // fontFamily: "Arial",
  },
  title: {
    fontWeight: "extrabold",
    color: "#3D449C",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "extrabold",
    backgroundColor: "#3D449C",
    color: "white",
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
  text: {
    marginBottom: 10,
    backgroundColor: "#DEE2F8",
    borderRadius: 8,
    padding: 6,
    fontSize: "12px",
  },
  table: {
    display: "table",
    width: "auto",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCellHeader: {
    paddingVertical: "5px",
    fontSize: "8px",
    width: "65em",
    textAlign: "center",
    backgroundColor: "#1e285c",
    color: "white",
    border: "1px solid #ddd",
  },
  tableCell: {
    padding: 1,
    fontSize: "8px",
    width: "65em",
    textAlign: "center",
    border: "1px solid #ddd",
  },
  disclaimer: {
    fontSize: 10,
    marginTop: 20,
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});

function formatNumber(value) {
  let num = Number(value);
  if (!isNaN(num)) {
    return num.toFixed(2);
  } else {
    return value;
  }
}

// PDF Document component
const createPDF = (data) => (
  <Document>
    <Page orientation="landscape" size="A4" style={styles.body}>
      <View style={styles.imageContainer}>
        <Image src={predictRAMLogo} style={{ width: 100 }} />
      </View>
      <Text style={styles.title}>Research Report on {data?.mainTopic}</Text>
      <Text style={styles.subtitle}>Created By {data?.advisor}</Text>
      {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>Executive Summary</Text>
        <Text style={styles.text}>
          {data?.execSummary?.replace(/\n/g, " ")}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Findings</Text>
        <Text style={styles.text}>
          {data?.keyFindings?.replace(/\n/g, " ")}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Risks and Uncertainties</Text>
        <Text style={styles.text}>{data?.risks?.replace(/\n/g, " ")}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Related Industries</Text>
        <Text style={styles.text}>
          {data?.relatedIndustries?.replace(/\n/g, " ")}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Global Scenarios</Text>
        <Text style={styles.text}>
          {data?.globalScenarios?.replace(/\n/g, " ")}
        </Text>
      </View> */}
      <View style={styles.section}>
        {/* <Text style={styles.sectionTitle}>Conclusion</Text> */}
        <Text style={styles.text}>{data?.conclusion?.replace(/\n/g, " ")}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Stocks Metrics</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellHeader}>Stock Symbol</Text>
            <Text style={styles.tableCellHeader}>Total Value</Text>
            <Text style={styles.tableCellHeader}>Correlation with ^NSEI</Text>
            <Text style={styles.tableCellHeader}>Annualized Alpha (%)</Text>
            <Text style={styles.tableCellHeader}>
              Annualized Volatility (%)
            </Text>
            <Text style={styles.tableCellHeader}>Sharpe Ratio</Text>
            <Text style={styles.tableCellHeader}>Treynor Ratio</Text>
            <Text style={styles.tableCellHeader}>Sortino Ratio</Text>
            <Text style={styles.tableCellHeader}>Maximum Drawdown</Text>
            <Text style={styles.tableCellHeader}>R-Squared</Text>
            <Text style={styles.tableCellHeader}>Downside Deviation</Text>
            <Text style={styles.tableCellHeader}>
              Annualized Tracking Error (%)
            </Text>
            <Text style={styles.tableCellHeader}>VaR (95%)</Text>
          </View>
          {data?.stockDetails?.map((stock, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCell}>
                {formatNumber(stock["Stock Symbol"] || "Not Available")}
              </Text>
              <Text style={styles.tableCell}>
                {formatNumber(stock["Total Value"] || "Not Available")}
              </Text>
              <Text style={styles.tableCell}>
                {formatNumber(
                  stock["Correlation with ^NSEI"] || "Not Available"
                )}
              </Text>
              <Text style={styles.tableCell}>
                {formatNumber(stock["Annualized Alpha (%)"] || "Not Available")}
              </Text>
              <Text style={styles.tableCell}>
                {formatNumber(
                  stock["Annualized Volatility (%)"] || "Not Available"
                )}
              </Text>
              <Text style={styles.tableCell}>
                {formatNumber(stock["Sharpe Ratio"] || "Not Available")}
              </Text>
              <Text style={styles.tableCell}>
                {formatNumber(stock["Treynor Ratio"] || "Not Available")}
              </Text>
              <Text style={styles.tableCell}>
                {formatNumber(stock["Sortino Ratio"] || "Not Available")}
              </Text>
              <Text style={styles.tableCell}>
                {formatNumber(stock["Maximum Drawdown"] || "Not Available")}
              </Text>
              <Text style={styles.tableCell}>
                {formatNumber(stock["R-Squared"] || "Not Available")}
              </Text>
              <Text style={styles.tableCell}>
                {formatNumber(stock["Downside Deviation"] || "Not Available")}
              </Text>
              <Text style={styles.tableCell}>
                {formatNumber(
                  stock["Annualized Tracking Error (%)"] || "Not Available"
                )}
              </Text>
              <Text style={styles.tableCell}>
                {formatNumber(stock["VaR (95%)"] || "Not Available")}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={{ ...styles.sectionTitle, textAlign: "center" }}>
          Disclaimer
        </Text>
        <Text style={{ ...styles.text, textAlign: "center" }}>
          The information contained herein is for informational and educational
          purposes only and should not be construed as investment advice. We
          prohibit any recommendations or solicitation to buy or sell specific
          securities. Past performance is not necessarily indicative of future
          results.
        </Text>
        <Text style={{ ...styles.text, textAlign: "center" }}>
          **Investing in the stock market is subject to market risks. Please
          consult with a registered financial advisor before making any
          investment decisions.**
        </Text>
        <Text style={{ ...styles.text, textAlign: "center" }}>
          https://predictram.com
        </Text>
      </View>
    </Page>
  </Document>
);

const handleExportPdf = (data, name) => {
  const pdfDoc = createPDF(data);
  const asPdf = pdf([]);
  asPdf.updateContainer(pdfDoc);
  asPdf.toBlob().then((blob) => {
    saveAs(blob, `${name}.pdf`);
  });
};

export default handleExportPdf;
