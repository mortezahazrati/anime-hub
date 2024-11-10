"use client";

import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { Box, Button, Flex, SimpleGrid, Spinner, Text } from "@chakra-ui/react";

import { useSearchParams } from "next/navigation";
import ItemCard from "./ItemCard";
import { Anime } from "@/utils/types";
import ItemCardContainer from "./ItemCardContainer";

const ItemsList = () => {
  const currentPage = parseInt(useSearchParams().get("page") || "1");

  const { loading, data, error } = useQuery<AnimesData>(GET_MANGAS, {
    variables: { page: currentPage },
  });

  if (error)
    return (
      <Text color="red">
        The following error has occurred. {error.message}. Please try again
        later
      </Text>
    );

  return (
    <Flex
      as="section"
      flexDirection="column"
      flex={1}
      gap={{ base: 4, lg: 8 }}
      width="100%"
    >
      <Flex
        as="aside"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap={{ base: 2, lg: 4 }}
        paddingBottom={{ base: 4, lg: 8 }}
        position="fixed"
        zIndex="sticky"
        top={20}
        left={3}
        width="100%"
      >
        <Box>
          <Button
            size={{ base: "xs", sm: "md" }}
            as={Link}
            href={`/?page=${currentPage - 1}`}
            isDisabled={loading || currentPage <= 1}
            marginRight={2}
          >
            Previous
          </Button>
          <Button
            size={{ base: "xs", sm: "md" }}
            as={Link}
            href={`/?page=${currentPage + 1}`}
            disabled={loading || !data?.Page.pageInfo.hasNextPage}
          >
            Next
          </Button>
        </Box>

        {loading && (
          <Spinner marginRight={10} size={{ base: "xs", sm: "sm" }} />
        )}
      </Flex>
      <Flex
        flexDirection="column"
        flex={1}
        position="relative"
        alignItems="center"
      >
        {data && (
          <SimpleGrid
            as="ul"
            flex={1}
            columns={{ base: 2, md: 3, lg: 5 }}
            paddingX={{ base: 4, lg: 8 }}
            paddingTop={{ base: 4, lg: 8 }}
          >
            {data.Page.media.map((anime) => (
              <ItemCardContainer key={anime.id}>
                <ItemCard anime={anime} />
              </ItemCardContainer>
            ))}
          </SimpleGrid>
        )}
      </Flex>
    </Flex>
  );
};

export default ItemsList;

// Keeping the query document in the same file where it is used as a best practice for better maintainability and scalability
const GET_MANGAS = gql`
  query animes($page: Int!) {
    Page(page: $page, perPage: 10) {
      ...ItemCard_page
    }
  }
  ${ItemCard.fragment}
`;

interface AnimesData {
  Page: {
    media: Anime[];
    pageInfo: { hasNextPage: boolean; currentPage: number };
  };
}
