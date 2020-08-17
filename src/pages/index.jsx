import { useState } from "react";
import useSWR from "swr";
import fetcher from "@lib/fetcher";
import objectToQueryParamsString from "@lib/objectToQueryParamsString";

import Head from "next/head";
import LocationSelectInput from "@components/inputs/LocationSelectInput";
import InvoiceStatusInput from "@components/inputs/InvoiceStatusInput";
import InvoiceStatusLabel from "@components/labels/InvoiceStatusLabel";
import DateRangePicker from "@components/inputs/DateRangePicker";
import { Container, Table, Alert, Row, Col, Card } from "react-bootstrap";

const getInvoicesApiUrl = (filters = {}) => {
  const { dateRange, statusType, locationId } = filters;

  const queryParams = objectToQueryParamsString({
    dateStart: dateRange && dateRange.startDate && dateRange.startDate.toISOString(),
    dateEnd: dateRange && dateRange.endDate && dateRange.endDate.toISOString(),
    statusType,
    locationId,
  });

  return `/api/invoices?${queryParams}`;
};

export async function getServerSideProps() {
  const data = await fetcher(getInvoicesApiUrl());
  return { props: { data } };
}

export default function Index(props) {
  const [dateRange, setFilterDateRange] = useState(null);
  const [statusType, setFilterStatus] = useState(null);
  const [locationId, setFilterLocation] = useState(null);
  const [hasFilterChanged, setHasFilterChanged] = useState(false);

  const onFilterInputChange = (setFilterFunc) => (option) => {
    const value = (option && option.value) || option;
    setFilterFunc(value);
    setHasFilterChanged(true);
  };

  const { data } = useSWR(
    getInvoicesApiUrl({ dateRange, statusType, locationId }),
    fetcher,
    { initialData: hasFilterChanged ? undefined : props.data },
  );

  return (
    <Container>
      <Head>
        <title>Invoices</title>
      </Head>

      <Card className="mt-3 mb-3">
        <Card.Header>Filter</Card.Header>
        <Container className="pt-3 pb-3">
          <Row>
            <Col>
              <DateRangePicker onChange={onFilterInputChange(setFilterDateRange)} />
            </Col>
            <Col>
              <InvoiceStatusInput onChange={onFilterInputChange(setFilterStatus)} />
            </Col>
            <Col>
              <LocationSelectInput onChange={onFilterInputChange(setFilterLocation)} />
            </Col>
          </Row>
        </Container>
      </Card>

      <Alert variant="info">
        Showing {data && data.invoices ? data.invoices.length : 0} invoices.
      </Alert>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Location</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total Value</th>
          </tr>
        </thead>
        <tbody>{renderTableBody(data)}</tbody>
      </Table>
    </Container>
  );
}

function renderTableBody(data) {
  if (!data)
    return (
      <tr>
        <td colSpan={5}>
          <p>Loading...</p>
        </td>
      </tr>
    );

  if (data.invoices.length === 0) {
    return (
      <tr>
        <td colSpan={5}>
          <p>No invoices found.</p>
        </td>
      </tr>
    );
  }

  return data.invoices.map((invoice, invoiceKey) => {
    return (
      <tr key={invoiceKey}>
        <td>{invoice.id}</td>
        <td>{invoice.location.name}</td>
        <td>{new Date(invoice.date).toLocaleDateString("en-GB")}</td>
        <td>
          <InvoiceStatusLabel>{invoice.status}</InvoiceStatusLabel>
        </td>
        <td>
          {new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
          }).format(invoice.totalValue)}
        </td>
      </tr>
    );
  });
}
