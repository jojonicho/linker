import React, { useState, useEffect } from "react";
import {
  useLogoutMutation,
  MeQuery,
  useChangeImageMutation,
} from "../../generated/graphql";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import {
  Button,
  useDisclosure,
  Flex,
  Spinner,
  PopoverTrigger,
  Popover,
  Stack,
  IconButton,
  Link,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { gql } from "@apollo/client";
import { DarkModeSwitch } from "../DarkModeSwitch";
import { SettingsPopover } from "./SettingsPopover";
import { ChangeImageModal } from "./ChangeImageModal";

const Message = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: calc(0.4vw + 0.5rem);
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

export const Navbar: React.FC<NavbarProps> = ({ user, loading }) => {
  const router = useRouter();
  const { handleSubmit, formState } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [logout, { client }] = useLogoutMutation();
  const [currentImage, setCurrentImage] = useState(
    loading ? "" : user?.me?.image || ""
  );
  useEffect(() => {
    if (!loading && user && user.me) setCurrentImage(user.me.image);
  }, [loading]);
  const [img] = useChangeImageMutation();
  const onSubmit = async () => {
    await img({
      variables: {
        image: currentImage,
      },
      update: (cache) => {
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
    <Stack
      w="100%"
      direction="row"
      p={2}
      pos="fixed"
      top="0"
      style={{ backdropFilter: "blur(4px)" }}
    >
      <Flex align="center" justify="space-between" w="100%">
        <Link href="/">
          <IconButton aria-label="linker" icon="link" />
        </Link>
        <Flex align="center" justify="center">
          <Message>
            {loading ? (
              <Spinner />
            ) : !loading && user && user.me ? (
              <Popover trigger="click" placement="bottom">
                <PopoverTrigger>
                  <Img src={user.me.image} />
                </PopoverTrigger>
                <SettingsPopover
                  id={user.me.id}
                  username={user.me.username}
                  currentImage={currentImage}
                  onOpen={onOpen}
                  client={client}
                  logout={logout}
                  router={router}
                />
              </Popover>
            ) : (
              <Button onClick={() => router.push("/login")} rightIcon="at-sign">
                Login
              </Button>
            )}
          </Message>

          <ChangeImageModal
            onClose={onClose}
            isOpen={isOpen}
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
            formState={formState}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
          <DarkModeSwitch />
        </Flex>
      </Flex>
    </Stack>
  );
};
