import { useState } from "react";
import fetcher from "@lib/fetcher";

import Head from "next/head";
import { Container, Card } from "react-bootstrap";
import LocationSelectInput from "@components/inputs/LocationSelectInput";
import InvoiceStatusLabel from "@components/labels/InvoiceStatusLabel";

export default function Locations() {
  const [locationResult, setLocationResult] = useState(null);
  const onLocationCHange = async ({ value }) => {
    const apiUrl = `/api/locations/invoiceSumsGroupedByStatus?locationId=${value}`;
    const result = await fetcher(apiUrl);
    setLocationResult(result);
  };

  return (
    <Container className="mt-3 mb-3">
      <Head>
        <title>Invoice Sums by Location</title>
      </Head>

      <h1>Invoice Sums by Location</h1>

      <LocationSelectInput onChange={onLocationCHange} />

      {locationResult &&
        locationResult.map(({ status, totalValue }, k) => (
          <Card key={k}>
            <Card.Body>
              <h1>
                <InvoiceStatusLabel>{status}</InvoiceStatusLabel>

                <p>
                  {new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP",
                  }).format(totalValue)}
                </p>
              </h1>
            </Card.Body>
          </Card>
        ))}
    </Container>
  );
}
