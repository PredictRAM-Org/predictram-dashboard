import {CTable,CTableHead,CTableRow,CTableHeaderCell,CTableBody,CTableDataCell} from "@coreui/react"

export default function DeployedContracts({polygontokenaddress,polygonportfolioaddress,kardiatokenaddress,kardiaportfolioaddress}) {
  return (
    <CTable className="mt-2">
  <CTableHead>
    <CTableRow color="primary">
    <CTableHeaderCell scope="col">CHAIN</CTableHeaderCell>
      <CTableHeaderCell scope="col">Token Address</CTableHeaderCell>
      <CTableHeaderCell scope="col">Portfolio Address</CTableHeaderCell>
    </CTableRow>
  </CTableHead>
  <CTableBody>
    <CTableRow>
    <CTableDataCell>POLYGON</CTableDataCell>
      <CTableDataCell>{polygontokenaddress}</CTableDataCell>
      <CTableDataCell>{polygonportfolioaddress}</CTableDataCell>
    </CTableRow>
    <CTableRow>
    <CTableDataCell>KARDIA</CTableDataCell>
      <CTableDataCell>{kardiatokenaddress}</CTableDataCell>
      <CTableDataCell>{kardiaportfolioaddress}</CTableDataCell>
    </CTableRow>
  </CTableBody>
</CTable>
  )
}
