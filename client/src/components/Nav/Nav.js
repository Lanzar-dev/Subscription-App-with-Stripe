import { useContext } from "react";
import { Navbar, NavItem, NavLink } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context";
import styled from "styled-components";

const LeftNavContainer = styled.div`
  margin-left: auto;
  font-weight: 500;
`;

export default function Nav() {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    setUser({ data: null, loading: false, error: null });
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Navbar bg="light" variant="light">
      <NavItem>
        <Link
          to="/"
          className="nav-link"
          style={{ fontWeight: "500", fontSize: "1.5rem" }}
        >
          Home
        </Link>
      </NavItem>
      {user.data && (
        <LeftNavContainer>
          <NavItem>
            <NavLink onClick={handleLogout}>Logout</NavLink>
          </NavItem>
        </LeftNavContainer>
      )}
    </Navbar>
  );
}
