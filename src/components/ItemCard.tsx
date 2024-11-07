import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Tag,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { gql } from "@apollo/client";
import { ItemModal } from "./ItemModal";

const ItemCard = ({
  anime,
}: {
  anime: {
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
  };
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card maxW="sm" onClick={onOpen}>
        <CardBody>
          <Image
            alt={anime.title.english}
            loading="lazy"
            width={230}
            height={320}
            src={anime.coverImage.large}
          />
          <Tag
            color="purple.900"
            colorScheme="purple"
            fontSize="xs"
            position="absolute"
            right={4}
            rounded={2}
            top={2}
          >
            {anime.averageScore}%
          </Tag>
          <Tag
            color="green.900"
            colorScheme="green"
            fontSize="xs"
            position="absolute"
            left={4}
            rounded={2}
            top={2}
          >
            {anime.season}
          </Tag>
          <Stack mt="6" spacing="3">
            <Heading size="md">{anime?.title.english}</Heading>
            <Text color="blue.600" fontSize="2xl">
              {anime.episodes} Episodes
            </Text>
          </Stack>
        </CardBody>
      </Card>
      {isOpen && <ItemModal isOpen={isOpen} onClose={onClose} id={anime.id} />}
    </>
  );
};

export default ItemCard;

ItemCard.fragment = gql`
  fragment ItemCard_page on Page {
    pageInfo {
      currentPage
      hasNextPage
    }
    media(sort: SCORE_DESC, type: ANIME, isAdult: false) {
      id
      title {
        english
      }
      coverImage {
        large
      }
      averageScore
      description
      episodes
      season
      siteUrl
    }
  }
`;
