import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import styled from "styled-components";

const CardsContainer = styled.div`
  display: flex;
  height: 75vh;
  align-items: center;
  justify-content: center;
`;

const CardHeader = styled.div`
  height: 25rem;
  background-color: blue;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PriceCircle = styled.div`
  border: 0.5rem solid white;
  width: 12.5rem;
  height: 12.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0.1rem 0.1rem 1rem rgba(19, 20, 19, 0.342);
`;

const PriceText = styled.p`
  font-size: 3rem;
  color: white;
  text-shadow: 0.1rem 0.1rem 1rem rgba(19, 20, 19, 0.342);
`;

export default function ArticlePlans() {
  const [prices, setPrices] = useState([]);

  const fetchPrices = async () => {
    try {
      const { data: res } = await axios.get("/subs/prices");
      //   console.log(res);
      setPrices(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const createSession = async (priceId) => {
    try {
      const { data: res } = await axios.post("/subs/session", { priceId });

      window.location.href = res.url;
    } catch (error) {
      console.log(error);
    }
  };

  const backgroundColors = {
    Basic: "rgb(104, 219, 104)",
    Standard: "rgb(185, 42, 23, 0.835)",
    Premium: "pink",
  };

  return (
    <Container>
      <CardsContainer>
        {prices.map((price) => {
          return (
            <Card
              key={price.id}
              style={{ width: "18rem", marginRight: "2rem" }}
            >
              <CardHeader
                style={{ backgroundColor: backgroundColors[price.nickname] }}
              >
                <PriceCircle>
                  <PriceText>${price.unit_amount / 100}</PriceText>
                </PriceCircle>
              </CardHeader>
              <Card.Body>
                <Card.Title style={{ fontSize: "2rem" }}>
                  {price.nickname}
                </Card.Title>
                <Button
                  variant="primary"
                  className="mt-2"
                  onClick={() => createSession(price.id)}
                >
                  Buy now
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </CardsContainer>
    </Container>
  );
}
