"use client";

import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { Box, Button, Flex, SimpleGrid, Spinner } from "@chakra-ui/react";

import { useSearchParams } from "next/navigation";
import ItemCard from "./ItemCard";

const ItemsList = () => {
  const currentPage = parseInt(useSearchParams().get("page") || "1");

  const { loading, data } = useQuery<AnimesData>(GET_MANGAS, {
    variables: { page: currentPage },
  });

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
        alignItems="center"
        justifyContent="space-between"
        gap={{ base: 2, lg: 4 }}
        paddingBottom={{ base: 4, lg: 8 }}
        position="fixed"
        zIndex="overlay"
        top="20"
      >
        <Button
          as={Link}
          href={`/?page=${currentPage - 1}`}
          isDisabled={loading || currentPage <= 1}
        >
          Previous
        </Button>
        <Button
          as={Link}
          href={`/?page=${currentPage + 1}`}
          disabled={loading || !data?.Page.pageInfo.hasNextPage}
        >
          Next
        </Button>
      </Flex>
      <Flex
        flexDirection="column"
        flex={1}
        position="relative"
        alignItems="center"
      >
        {loading && <Spinner size="sm" />}
        {data && (
          <SimpleGrid
            as="ul"
            flex={1}
            columns={{ base: 2, md: 3, lg: 5 }}
            paddingX={{ base: 4, lg: 8 }}
            paddingTop={{ base: 4, lg: 8 }}
            spacing={{ base: 4, lg: 8 }}
          >
            {data.Page.media.map(
              (anime: {
                id: number;
                title: { english: string };
                status: string;
                coverImage: {
                  large: string;
                };
                description: string;
                averageScore: number;
                episodes: number;
                season: string;
              }) => (
                <Box key={anime.id}>
                  <ItemCard anime={anime} />
                </Box>
              )
            )}
          </SimpleGrid>
        )}
      </Flex>
    </Flex>
  );
};

export default ItemsList;

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
    media: {
      id: number;
      title: { english: string };
      status: string;
      coverImage: {
        large: string;
      };
      description: string;
      averageScore: number;
      episodes: number;
      season: string;
    }[];
    pageInfo: { hasNextPage: boolean; currentPage: number };
  };
}
