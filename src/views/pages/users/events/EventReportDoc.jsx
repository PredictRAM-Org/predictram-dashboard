import {
  Document,
  Packer,
  Paragraph,
  TableCell,
  WidthType,
  TextRun,
  TableRow,
  Table,
  ImageRun,
} from "docx";
import { saveAs } from "file-saver";
import predictRAMLogo from "../../../../assets/images/predictramlogo.jpg"; // Ensure the correct path to your image

// Function to format numbers
function formatNumber(value) {
  let num = Number(value);
  if (!isNaN(num)) {
    return num.toFixed(2);
  } else {
    return value;
  }
}

// Function to create a DOCX document
const createDOCX = async (data) => {
  const blob = await (await fetch(predictRAMLogo)).arrayBuffer();
  // Add image
  const imageParagraph = new Paragraph({
    children: [
      new ImageRun({
        data: blob,
        transformation: {
          width: 200,
          height: 100,
        },
      }),
    ],
    alignment: "center",
  });
  // Add title and subtitle
  const title = new Paragraph({
    children: [
      new TextRun({
        text: `Research Report on ${data?.mainTopic}`,
        bold: true,
        color: "#3D449C",
        size: 48,
      }),
    ],
    alignment: "center",
  });

  const subtitle = new Paragraph({
    children: [
      new TextRun({
        text: `Created By ${data?.advisor}`,
        size: 24,
      }),
    ],
    alignment: "center",
  });

  // Function to create a section
  const createSection = (title, content) => {
    return [
      // new Paragraph({
      //   children: [
      //     new TextRun({ text: title, bold: true, color: "#3D449C", size: 36 }),
      //   ],
      // }),
      new Paragraph({
        children: [
          new TextRun({
            text: content ? content.replace(/\n/g, " ") : "",
            size: 24,
          }),
        ],
        spacing: { after: 200 },
      }),
    ];
  };

  // Add sections to the document
  const sections = [
    ...createSection("Executive Summary", data?.execSummary),
    ...createSection("Key Findings", data?.keyFindings),
    ...createSection("Risks and Uncertainties", data?.risks),
    ...createSection("Related Industries", data?.relatedIndustries),
    ...createSection("Global Scenarios", data?.globalScenarios),
  ];

  // Create table for Top Stocks Metrics
  const table = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph("Stock Symbol")],
            width: { size: 10, type: WidthType.PERCENTAGE },
          }),
          new TableCell({
            children: [new Paragraph("Total Value")],
            width: { size: 10, type: WidthType.PERCENTAGE },
          }),
          new TableCell({
            children: [new Paragraph("Correlation with ^NSEI")],
            width: { size: 10, type: WidthType.PERCENTAGE },
          }),
          new TableCell({
            children: [new Paragraph("Annualized Alpha (%)")],
            width: { size: 10, type: WidthType.PERCENTAGE },
          }),
          new TableCell({
            children: [new Paragraph("Annualized Volatility (%)")],
            width: { size: 10, type: WidthType.PERCENTAGE },
          }),
          new TableCell({
            children: [new Paragraph("Sharpe Ratio")],
            width: { size: 10, type: WidthType.PERCENTAGE },
          }),
          new TableCell({
            children: [new Paragraph("Treynor Ratio")],
            width: { size: 10, type: WidthType.PERCENTAGE },
          }),
          new TableCell({
            children: [new Paragraph("Sortino Ratio")],
            width: { size: 10, type: WidthType.PERCENTAGE },
          }),
          new TableCell({
            children: [new Paragraph("Maximum Drawdown")],
            width: { size: 10, type: WidthType.PERCENTAGE },
          }),
          new TableCell({
            children: [new Paragraph("R-Squared")],
            width: { size: 10, type: WidthType.PERCENTAGE },
          }),
          new TableCell({
            children: [new Paragraph("Downside Deviation")],
            width: { size: 10, type: WidthType.PERCENTAGE },
          }),
          new TableCell({
            children: [new Paragraph("Annualized Tracking Error (%)")],
            width: { size: 10, type: WidthType.PERCENTAGE },
          }),
          new TableCell({
            children: [new Paragraph("VaR (95%)")],
            width: { size: 10, type: WidthType.PERCENTAGE },
          }),
        ],
      }),
      ...data?.stockDetails?.map(
        (stock) =>
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph(
                    formatNumber(stock["Stock Symbol"] || "Not Available")
                  ),
                ],
                width: { size: 10, type: WidthType.PERCENTAGE },
              }),
              new TableCell({
                children: [
                  new Paragraph(
                    formatNumber(stock["Total Value"] || "Not Available")
                  ),
                ],
                width: { size: 10, type: WidthType.PERCENTAGE },
              }),
              new TableCell({
                children: [
                  new Paragraph(
                    formatNumber(
                      stock["Correlation with ^NSEI"] || "Not Available"
                    )
                  ),
                ],
                width: { size: 10, type: WidthType.PERCENTAGE },
              }),
              new TableCell({
                children: [
                  new Paragraph(
                    formatNumber(
                      stock["Annualized Alpha (%)"] || "Not Available"
                    )
                  ),
                ],
                width: { size: 10, type: WidthType.PERCENTAGE },
              }),
              new TableCell({
                children: [
                  new Paragraph(
                    formatNumber(
                      stock["Annualized Volatility (%)"] || "Not Available"
                    )
                  ),
                ],
                width: { size: 10, type: WidthType.PERCENTAGE },
              }),
              new TableCell({
                children: [
                  new Paragraph(
                    formatNumber(stock["Sharpe Ratio"] || "Not Available")
                  ),
                ],
                width: { size: 10, type: WidthType.PERCENTAGE },
              }),
              new TableCell({
                children: [
                  new Paragraph(
                    formatNumber(stock["Treynor Ratio"] || "Not Available")
                  ),
                ],
                width: { size: 10, type: WidthType.PERCENTAGE },
              }),
              new TableCell({
                children: [
                  new Paragraph(
                    formatNumber(stock["Sortino Ratio"] || "Not Available")
                  ),
                ],
                width: { size: 10, type: WidthType.PERCENTAGE },
              }),
              new TableCell({
                children: [
                  new Paragraph(
                    formatNumber(stock["Maximum Drawdown"] || "Not Available")
                  ),
                ],
                width: { size: 10, type: WidthType.PERCENTAGE },
              }),
              new TableCell({
                children: [
                  new Paragraph(
                    formatNumber(stock["R-Squared"] || "Not Available")
                  ),
                ],
                width: { size: 10, type: WidthType.PERCENTAGE },
              }),
              new TableCell({
                children: [
                  new Paragraph(
                    formatNumber(stock["Downside Deviation"] || "Not Available")
                  ),
                ],
                width: { size: 10, type: WidthType.PERCENTAGE },
              }),
              new TableCell({
                children: [
                  new Paragraph(
                    formatNumber(
                      stock["Annualized Tracking Error (%)"] || "Not Available"
                    )
                  ),
                ],
                width: { size: 10, type: WidthType.PERCENTAGE },
              }),
              new TableCell({
                children: [
                  new Paragraph(
                    formatNumber(stock["VaR (95%)"] || "Not Available")
                  ),
                ],
                width: { size: 10, type: WidthType.PERCENTAGE },
              }),
            ],
          })
      ),
    ],
    margins: { bottom: 200 },
  });

  //   Add disclaimer
  const disclaimer = (text) =>
    new Paragraph({
      children: [
        new TextRun({
          text: text,
          size: 20,
        }),
      ],
      alignment: "center",
      spacing: { after: 200 },
    });

  // Create a new document
  const doc = new Document({
    sections: [
      {
        children: [
          imageParagraph,
          title,
          subtitle,
          // ...sections,
          ...createSection("Conclusion", data?.conclusion),
          table,
          disclaimer(
            "The information contained herein is for informational and educational purposes only and should not be construed as investment advice. We prohibit any recommendations or solicitation to buy or sell specific securities. Past performance is not necessarily indicative of future results"
          ),
          disclaimer(
            "**Investing in the stock market is subject to market risks. Please consult with a registered financial advisor before making any investment decisions.**"
          ),
          disclaimer("https://predictram.com"),
        ],
      },
    ],
  });

  return doc;
};

// Function to handle DOCX export
const handleExportDocx = async (data, name) => {
  const doc = await createDOCX(data);

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `${name}`);
  });
};

export default handleExportDocx;
