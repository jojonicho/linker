import React, { useState, useEffect } from "react";
import {
  useLogoutMutation,
  useMeQuery,
  MeQuery,
  useChangeImageMutation,
} from "../generated/graphql";
import styled from "@emotion/styled";
// import { setAccessToken, getAccessToken } from '../lib/accessToken'
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Button,
  Link as ChakraLink,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  Image,
  IconButton,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { gql } from "@apollo/client";

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
  cursor: pointer;
`;
interface NavbarProps {
  user: MeQuery;
  loading: boolean;
}

// export const Navbar: React.FC = () => {
export const Navbar: React.FC<NavbarProps> = ({ user, loading }) => {
  const router = useRouter();
  const { handleSubmit, formState } = useForm();
  const images = [
    "https://images-ext-1.discordapp.net/external/ZNDgJ2gKt-v92XI3nYgDwx1bd0aBm6N41-MDWU_mfaE/https/imgur.com/TAlz65L.gif",
    "https://images-ext-1.discordapp.net/external/Hq_g8eT-zyW1V9XEy5w3bh08-RquxOJhUgs1Y6qEniE/https/imgur.com/xftxkFF.gif",
    "https://images-ext-2.discordapp.net/external/HcBpqz5Z-GTlhY84YfPwHWpJ_T4nG6BF1iidvkDrzXE/https/imgur.com/yozNjc8.gif",
    "https://images-ext-1.discordapp.net/external/fl-oiDHbQKVxJVVWU1XR6qyn2unZakVHjcqwsXayH_c/https/imgur.com/mSl5Umg.gif.gif",
    "https://images-ext-1.discordapp.net/external/uglykyOnroioO07ceP5ZrwTlkRjf7XMKIt0TJPR3k0Y/https/imgur.com/oI8Gk4g.gif",
    "https://images-ext-1.discordapp.net/external/xIQ5THfX_nW_jh5WTYg9VuIQSQZyW4uXPYn_XEr2rNI/https/imgur.com/ieF92zm.gif",
  ];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [logout, { client }] = useLogoutMutation();
  const [currentImage, setCurrentImage] = useState(
    loading ? "" : user?.me?.image || ""
  );
  useEffect(() => {
    if (!loading && user.me) setCurrentImage(user.me.image);
  }, [loading]);
  const [img] = useChangeImageMutation();
  const onSubmit = async () => {
    await img({
      variables: {
        image: currentImage,
      },
      update: (cache, { data }) => {
        cache.writeFragment({
          id: "User:" + user.me?.id,
          fragment: gql`
            fragment __ on User {
              image
            }
          `,
          data: { image: currentImage } as any,
        });
      },
    });
  };
  return (
    <Nav>
      {loading ? (
        <IconButton aria-label="loading" isLoading />
      ) : !loading && user && user.me ? (
        <Flex align="center" justify="center">
          <Message>
            <Img src={user.me.image} onClick={onOpen} />
            <Detail>
              <p>{user.me.username}</p>
            </Detail>
          </Message>
          <IconButton
            aria-label="logout"
            icon="arrow-right"
            onClick={async () => {
              await logout();
              await client!.resetStore();
              router.push("/");
            }}
          />
          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent rounded="0.4rem">
              <ModalHeader>User Profile</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex align="center" justify="center">
                  <Image
                    mr={3}
                    size="150px"
                    objectFit="cover"
                    rounded="0.4rem"
                    src={currentImage}
                  />
                  <Flex dir="row" wrap="wrap">
                    {images.map((img) => (
                      <Image
                        cursor="pointer"
                        size="75px"
                        objectFit="cover"
                        rounded="0.4rem"
                        src={img}
                        onClick={() => setCurrentImage(img)}
                      />
                    ))}
                  </Flex>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  isLoading={formState.isSubmitting}
                  onClick={handleSubmit(onSubmit)}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      ) : (
        <Button onClick={() => router.push("/login")} rightIcon="at-sign">
          Login
        </Button>
      )}
    </Nav>
  );
};
