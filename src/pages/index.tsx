import {
  Text,
  Code,
  Icon,
  Spinner,
  Stack,
  Flex,
  useColorMode,
  IconButton,
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  ButtonGroup,
} from "@chakra-ui/core";

import { withApollo } from "../utils/withApollo";
import { CreateLinkerButton } from "../components/CreateLinker";
import {
  useLinkersQuery,
  useDeleteLinkerMutation,
  useUpdateLinkerMutation,
  useCreateLinkMutation,
  useUpdateLinkMutation,
} from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";
import { LinkerList } from "../components/Linkers/LinkerList";

const Index = () => {
  useIsAuth();
  return <LinkerList />;
};

export default withApollo({ ssr: false })(Index);
