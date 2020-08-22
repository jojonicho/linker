import React from "react";
import { useLogoutMutation, useMeQuery, MeQuery } from "../generated/graphql";
import styled from "@emotion/styled";
// import { setAccessToken, getAccessToken } from '../lib/accessToken'
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Link as ChakraLink, Icon } from "@chakra-ui/core";

const Nav = styled.nav`
  padding: 2px;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 1.1rem;
  align-items: center;
  position: absolute;
  right: 0;
  backdrop-filter: blur(30px);
`;

const Logout = styled.div`
  display: flex;
  button {
    margin-left: 0.5rem;
    font-weight: bold;
  }
`;

const Message = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: calc(0.4vw + 0.5rem);
`;
const Detail = styled.div`
  margin: 0 0.4rem;
`;
const Img = styled.img`
  width: calc(1vw + 1.75rem);
  height: calc(1vw + 1.75rem);
  border-radius: 50%;
  &:hover {
    filter: brightness(0.8);
  }
`;
interface NavbarProps {
  data: MeQuery;
  loading: boolean;
}

// export const Navbar: React.FC = () => {
export const Navbar: React.FC<NavbarProps> = ({ data, loading }) => {
  const [logout, { client }] = useLogoutMutation();
  const router = useRouter();
  return (
    <Nav>
      {loading ? (
        <>loading...</>
      ) : !loading && data && data.me ? (
        <Logout>
          <Message>
            <Link href="/me">
              <a>
                <Img src={data.me.image} />
              </a>
            </Link>
            <Detail>
              <p>{data.me.username}</p>
            </Detail>
          </Message>
          <Button
            onClick={async () => {
              await logout();
              await client!.resetStore();
              router.push("/");
            }}
          >
            logout
          </Button>
        </Logout>
      ) : (
        <Button onClick={() => router.push("/login")} rightIcon="at-sign">
          Login
        </Button>
      )}
    </Nav>
  );
};
