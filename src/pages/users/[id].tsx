import React from "react";
import { Stack, Skeleton, Text, Image, Flex } from "@chakra-ui/core";
import { useUserQuery } from "../../generated/graphql";
import { useRouter } from "next/router";
import { withApollo } from "../../utils/withApollo";
import { useSpring, animated } from "react-spring";

const UserPage = ({}) => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = useUserQuery({
    variables: {
      id: Number.parseInt(id!.toString()),
    },
  });
  const spring = useSpring({
    number:
      data && data.user && data.user.linkers ? data.user.linkers.length : 0,
    from: { number: 0, opacity: 0.5 },
    config: {
      duration: 1000,
      mass: 1,
      tension: 500,
      friction: 18,
      clamp: true,
    },
  });
  return (
    <Stack align="center" justify="center" mt={20}>
      {loading ? (
        <Skeleton />
      ) : data && data.user ? (
        <Stack isInline align="center" spacing={6}>
          <Image borderRadius={10} size="10vw" src={data.user.image} />
          <Flex flexDir="column">
            <Text fontWeight="bold" fontSize="xl">
              {data.user.username}
            </Text>
            <Text>
              <Text>
                Created
                <animated.div>
                  {spring.number.interpolate((val) => Math.floor(val))}
                </animated.div>
                Linkers!
              </Text>
            </Text>
          </Flex>
        </Stack>
      ) : (
        <Text>No user found</Text>
      )}
    </Stack>
  );
};
export default withApollo({ ssr: true })(UserPage);
