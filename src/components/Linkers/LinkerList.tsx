import React from "react";
import {
  Box,
  Spinner,
  Stack,
  Flex,
  Editable,
  EditablePreview,
  EditableInput,
  Icon,
  Code,
  Button,
  IconButton,
  useColorMode,
  Link as ChakraLink,
  Text,
  Popover,
  PopoverTrigger,
  useDisclosure,
  PopoverContent,
  PopoverArrow,
  ButtonGroup,
  CloseButton,
} from "@chakra-ui/core";
import { CreateLinkerButton } from "../CreateLinker";
import {
  useLinkersQuery,
  useDeleteLinkerMutation,
  useUpdateLinkerMutation,
  useCreateLinkMutation,
  useUpdateLinkMutation,
  useDeleteLinkMutation,
} from "../../generated/graphql";
import { printImage, MyDoc } from "../../utils/downloadLinker";
import { PDFDownloadLink } from "@react-pdf/renderer";

export const LinkerList = () => {
  const { data, loading, fetchMore, variables } = useLinkersQuery({
    variables: {
      limit: 6,
    },
    notifyOnNetworkStatusChange: true,
  });
  const [del] = useDeleteLinkerMutation();
  const [upd] = useUpdateLinkerMutation();
  const [lnk] = useCreateLinkMutation();
  const [updLnk] = useUpdateLinkMutation();
  const [delLnk] = useDeleteLinkMutation();
  const createLink = async (linkerId: number, url: string) => {
    await lnk({
      variables: {
        linkerId,
        url,
      },
      update: (cache) => {
        cache.evict({ fieldName: "linkers" });
      },
    });
  };
  const editLink = async (linkId: number, url: string) => {
    console.log(url);
    console.log(url === "");
    console.log(linkId);
    if (url === "") {
      await delLnk({
        variables: {
          id: linkId,
        },
        update: (cache) => {
          cache.evict({ fieldName: "linkers" });
        },
      });
    } else {
      await updLnk({
        variables: {
          id: linkId,
          url,
        },
      });
    }
  };

  const deleteLinker = async (id: number) => {
    await del({
      variables: {
        id,
      },
      update: (cache) => {
        cache.evict({ fieldName: "linkers" });
      },
    });
  };
  const editLinkerTitle = async (id: number, title: string) => {
    await upd({
      variables: {
        title,
        id,
      },
    });
  };
  const editLinkerDescription = async (id: number, description: string) => {
    await upd({
      variables: {
        description,
        id,
      },
    });
  };
  function EditableControls({ isEditing, onRequestEdit }: any) {
    return isEditing ? null : (
      <IconButton
        aria-label="add"
        icon="add"
        cursor="pointer"
        position="absolute"
        ml="calc(-25px - 0.2vw)"
        size="xs"
        onClick={onRequestEdit}
      />
    );
  }

  const { colorMode } = useColorMode();

  const bgColor = { light: "gray.50", dark: "gray.700" };
  // if (data && data.linkers) console.log(data.linkers.hasMore);
  const { onOpen } = useDisclosure();
  return (
    <Box mt={20}>
      {loading ? (
        <Spinner />
      ) : (
        <Stack
          align="flex-start"
          justify="center"
          isInline
          // spacing={5}
          flexWrap="wrap"
        >
          <CreateLinkerButton />
          {data &&
            data.linkers &&
            data.linkers.linkers.length > 0 &&
            data.linkers.linkers.map((linker) => (
              <Stack
                id={`linkerCanvas${linker.id}`}
                align="flex-start"
                justify="center"
                width={["90vw", "90vw", "25vw", "30vw"]}
                p={3}
                mb={5}
                ml={3}
                mr={3}
                bg={bgColor[colorMode]}
                wordBreak="break-word"
                borderRadius={5}
                key={linker.id}
              >
                <Flex
                  width="100%"
                  flexDir="row"
                  align="center"
                  justify="space-between"
                >
                  <Text fontWeight="bold">
                    <Editable
                      defaultValue={linker.title}
                      submitOnBlur
                      onSubmit={(title: string) =>
                        editLinkerTitle(linker.id, title)
                      }
                    >
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </Text>
                  <Stack align="flex-start" justify="center" spacing={2}>
                    <Popover trigger="hover" placement="bottom">
                      <PopoverTrigger>
                        <Icon
                          aria-label="menu"
                          name="triangle-down"
                          onClick={onOpen}
                          cursor="pointer"
                        />
                      </PopoverTrigger>
                      <PopoverContent
                        border="0"
                        width="125px"
                        placement="bottom-end"
                      >
                        <Stack spacing={3} p={3} align="flex-end">
                          <Button
                            leftIcon={"small-close"}
                            variantColor="pink"
                            variant="solid"
                            onClick={() => deleteLinker(linker.id)}
                          >
                            Delete
                          </Button>
                          <Button
                            leftIcon={"download"}
                            variantColor="teal"
                            variant="solid"
                            onClick={() =>
                              printImage(
                                `linkerCanvas${linker.id}`,
                                linker.title
                              )
                            }
                          >
                            (PNG)
                          </Button>
                          <PDFDownloadLink
                            document={<MyDoc linker={linker} />}
                            fileName={linker.title}
                          >
                            {({ loading }) =>
                              loading ? (
                                "Loading document..."
                              ) : (
                                <Button
                                  leftIcon={"download"}
                                  variantColor="teal"
                                  variant="solid"
                                >
                                  (PDF)
                                </Button>
                              )
                            }
                          </PDFDownloadLink>
                        </Stack>
                      </PopoverContent>
                    </Popover>
                  </Stack>
                </Flex>
                <Text as="i">
                  <Editable
                    defaultValue={linker.description}
                    submitOnBlur
                    onSubmit={(description: string) =>
                      editLinkerDescription(linker.id, description)
                    }
                  >
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </Text>
                {linker.links &&
                  linker.links.map(({ id, url }) => (
                    <Flex>
                      <Text as="a" key={id}>
                        <Editable
                          defaultValue={url}
                          submitOnBlur
                          onSubmit={(newUrl: string) => editLink(id, newUrl)}
                        >
                          <EditablePreview />
                          <EditableInput />
                          {/* {(props: any) => (
                            <>
                              {props.isEditing && (
                                <IconButton
                                  aria-label="close"
                                  pos="absolute"
                                  ml="calc(-25px - 0.2vw)"
                                  size="xs"
                                  icon="close"
                                  onClick={props.onCancel}
                                />
                              )}
                            </>
                          )} */}
                        </Editable>
                      </Text>
                      {url.split(".").length > 1 && (
                        <ChakraLink
                          href={
                            url.split("://").length > 1 ? url : `https://${url}`
                          }
                          isExternal
                        >
                          <Icon name="external-link" mx="2px" />
                        </ChakraLink>
                      )}
                    </Flex>
                  ))}

                <Text width={"100%"}>
                  <Editable
                    placeholder="add a link ..."
                    isPreviewFocusable={false}
                    onSubmit={(url: string) =>
                      url !== "" && createLink(linker.id, url)
                    }
                  >
                    {(props: any) => (
                      <Flex>
                        <EditableControls {...props} />
                        <EditablePreview />
                        <EditableInput />
                      </Flex>
                    )}
                  </Editable>
                </Text>
                <Code bg="red.200">{linker.user.username}</Code>
              </Stack>
            ))}
          {data && data.linkers && data.linkers.hasMore ? (
            <Flex>
              <Button
                onClick={() => {
                  fetchMore({
                    variables: {
                      limit: variables?.limit,
                      cursor:
                        data.linkers?.linkers[data.linkers.linkers.length - 1]
                          .date,
                    },
                  });
                }}
                isLoading={loading}
                m="auto"
                my={8}
              >
                load more
              </Button>
            </Flex>
          ) : null}
        </Stack>
      )}
    </Box>
  );
};
