import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Tag,
  useDisclosure,
  AspectRatio,
  Image,
} from "@chakra-ui/react";
import { gql } from "@apollo/client";
import { ItemModal } from "./ItemModal";
import { Anime } from "@/utils/types";
import ItemCardTag from "./ItemCardTag";

const ItemCard = ({ anime }: { anime: Anime }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card onClick={onOpen}>
        <CardBody>
          <AspectRatio maxW="400px" ratio={3 / 4}>
            <Image
              src={anime.coverImage.large}
              alt={
                "This is an image of an anime with a title of " +
                anime.title.english
              }
              objectFit="cover"
              width="inherit"
            />
          </AspectRatio>
          <ItemCardTag colorScheme="purple" right={4} tagLabel={anime.season} />
          <ItemCardTag
            colorScheme="green"
            left={4}
            tagLabel={anime.averageScore + "%"}
          />

          <Stack mt="6" spacing="3">
            <Heading size={{ base: "xs", sm: "md" }}>
              {anime?.title.english}
            </Heading>
            <Text color="blue.600" fontSize={{ base: "md", sm: "2xl" }}>
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

// Keeping the fragment in the same file where its fields are used as a best practice for better maintainability and scalability
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
