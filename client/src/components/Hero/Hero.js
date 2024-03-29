import styled from "styled-components";
import { Container } from "react-bootstrap";
import ModalComponent from "../Modal/ModalComponent";
import { useContext } from "react";
import { UserContext } from "../../context";
import { Link } from "react-router-dom";

const HeroComponent = styled.header`
  padding: 5rem 0;
  height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1610641564409-7b59f85d1e88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80");
  background-position: center;
  background-size: cover;
`;

const HeaderContainer = styled.div`
  background-color: rgb(5, 148, 112);
  padding: 3rem;
  color: white;
  width: 30.5rem;
`;

const Heading = styled.h1`
  font-size: 5rem;
`;

const SubHeading = styled.h3`
  margin: 1rem 0;
  font-weight: 400;
`;

const MyArticle = styled.div`
  padding: 2rem;
  height: 2rem;
  width: 12rem;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
`;

export default function Hero() {
  const { user } = useContext(UserContext);

  return (
    <HeroComponent>
      <Container>
        <HeaderContainer>
          <Heading>Feed your mind with the best</Heading>
          <SubHeading>
            Grow, learn and become more successful by reading some of the top
            articles by highly reputable individuals
          </SubHeading>
          {!user.data ? (
            <>
              <ModalComponent
                text="Signup"
                variant="primary"
                isSignupFlow={true}
              />
              <ModalComponent
                text="Log in"
                variant="danger"
                isSignupFlow={false}
              />
            </>
          ) : (
            <MyArticle>
              <Link
                to={"/articles"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "1.2rem",
                  fontWeight: "500",
                }}
              >
                My Articles
              </Link>
            </MyArticle>
          )}
        </HeaderContainer>
      </Container>
    </HeroComponent>
  );
}
