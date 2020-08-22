import React from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation, MeDocument, MeQuery } from "../generated/graphql";
import { setAccessToken } from "../utils/accessToken";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Link from "next/link";
import { withApollo } from "../utils/withApollo";
import {
  Icon,
  Link as ChakraLink,
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Button,
} from "@chakra-ui/core";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const { register, handleSubmit, errors, formState } = useForm<FormData>({
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
    shouldUnregister: true,
  });
  const [login] = useLoginMutation();
  const onSubmit = async ({ email, password }: any) => {
    const response = await login({
      variables: {
        email,
        password,
      },
      // cache
      update: (cache, { data }) => {
        if (!data) return null;
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: "Query",
            me: data.login,
          },
        });
        // cache.evict({})
      },
    });
    router.push("/");
  };
  return (
    <>
      <LoginContainer>
        {/* <FormContainer> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            isInvalid={Boolean(
              errors.email?.message || errors.password?.message
            )}
          >
            <FormLabel htmlFor="email">email</FormLabel>
            <Input
              placeholder="iloveemilia@rem.com"
              name="email"
              ref={register({
                required: "please provide an email.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
            />

            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
            <FormLabel htmlFor="password">password</FormLabel>
            <Input
              type="password"
              placeholder="password"
              name="password"
              autoComplete="new-password"
              ref={register({
                required: "password pls.",
                pattern: {
                  value: /^.{6,}$/i,
                  message: "password must be atleast 6 characters",
                },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
            <Button
              mt={4}
              variantColor="teal"
              isLoading={formState.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </FormControl>
        </form>
        {/* </FormContainer> */}
        <ChakraLink
          // isExternal
          href="/register"
          flexGrow={1}
          mr={2}
        >
          or Register for an account <Icon name="external-link" mx="2px" />
        </ChakraLink>
      </LoginContainer>
    </>
  );
};

export default withApollo({ ssr: false })(Login);
