import {
  Button,
  Badge,
  Stack,
  Input,
  FormLabel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Textarea,
  IconButton,
} from "@chakra-ui/core";

import { Container } from "./Container";
import { useForm } from "react-hook-form";
import {
  useCreateLinkerMutation,
  CreateLinkerMutationVariables,
} from "../generated/graphql";

export const CreateLinkerButton = () => {
  const { handleSubmit, formState, register } = useForm();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [lnk] = useCreateLinkerMutation();
  const onSubmit = async (variables: CreateLinkerMutationVariables) => {
    await lnk({
      variables,
      update: (cache) => {
        cache.evict({ fieldName: "linkers" });
      },
    });
  };
  return (
    <Container
      flexDirection="row"
      position="fixed"
      bottom="0"
      width="100%"
      maxWidth="48rem"
    >
      <IconButton
        aria-label="add"
        icon="add"
        variantColor="pink"
        onClick={onOpen}
      />
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay style={{ backdropFilter: "blur(1px)" }} />
        <ModalContent rounded="0.4rem">
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack p={3}>
                <Stack spacing={3}>
                  <FormLabel>
                    <Badge>Title</Badge>
                  </FormLabel>
                  <Input
                    variant="flushed"
                    placeholder="How to inverse a binary tree"
                    name="title"
                    ref={register}
                  />
                  <FormLabel>
                    <Badge>Description</Badge>
                  </FormLabel>
                  <Textarea
                    variant="filled"
                    name="description"
                    placeholder="dasdladaokdsodakdaoadksd"
                    ref={register}
                  />
                </Stack>
                <Button
                  mt={4}
                  variantColor="teal"
                  isLoading={formState.isSubmitting}
                  onClick={handleSubmit(onSubmit)}
                  type="submit"
                >
                  Submit
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};
