import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";
import styled from "styled-components";

const CardsContainer = styled.div`
  padding: 4rem 0;
  display: flex;
`;
const Card = styled.div`
  height: 50rem;
  width: 32%;
  box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 2rem;
  margin-right: 2rem;
`;
const Image = styled.img`
  width: 100%;
  height: 30rem;
  border-radius: 2rem;
`;
const Header = styled.h2`
  margin-top: 1rem;
  font-size: 1.5rem;
`;

const NoArticlesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20rem 0;
  flex-direction: column;

  & a {
    font-size: 2rem;
    text-decoration: none;
  }
`;
const ErrorHeader = styled.h2`
  font-size: 3rem;
`;

const Content = styled.p``;

const Loading = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const { data: res } = await axios.get("/articles");
      setArticles(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <Container>
      {articles.length ? (
        <CardsContainer>
          {articles.map((article) => (
            <Card key={article._id}>
              <Image src={article.imageUrl} />
              <Header>{article.title}</Header>
              <Content>{article.content}</Content>
            </Card>
          ))}
        </CardsContainer>
      ) : (
        <>
          {loading ? (
            <Loading>Loading...</Loading>
          ) : (
            <NoArticlesContainer>
              <ErrorHeader>You don't have access yet</ErrorHeader>
              <Link to={"/article-plans"}>Buy a plan</Link>
            </NoArticlesContainer>
          )}
        </>
      )}
    </Container>
  );
}
