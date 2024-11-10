import { gql, useQuery } from "@apollo/client";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";

export const ItemModal = ({
  isOpen,
  onClose,
  id,
}: {
  id: number;
  isOpen: boolean;
  onClose: () => void;
}) => {
  // 1- Supplying AnimeData for more type safety, and better code intelligence
  // 2- I could provide this anime details from the parent component, however, this is the best way of doing this.
  // Because the data formats are different and the parent will have to fetch unnecessary data.
  const { data, error } = useQuery<AnimeData>(GET_MANGA, {
    variables: { id },
  });

  // TODO: improve error handling
  if (error)
    return (
      <Text color="red">
        The following error has occurred. {error.message}. Please try again
        later
      </Text>
    );

  return (
    <Modal onClose={onClose} size="full" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent alignItems="center" justifyContent="center">
        {!data ? (
          <Spinner />
        ) : (
          <>
            <ModalHeader>{data.Media.title.english}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Card maxW="full" marginBottom={4}>
                <CardBody display="flex" flexWrap="wrap" gap={10}>
                  <Image
                    objectFit="cover"
                    src={data.Media.coverImage.large}
                    alt="Caffe Latte"
                    width={230}
                    height={320}
                  />
                  <Box
                    flexDirection="column"
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Text marginBottom={{ base: 1, lg: 4 }} fontWeight="bold">
                        Characters:
                      </Text>
                      <Box display="flex" flexWrap="wrap">
                        {data.Media.characters.nodes.map(
                          (character: {
                            name: { first: string };
                            image: { medium: string };
                          }) => (
                            <Avatar
                              key={character.name.first}
                              name={character.name.first}
                              src={character.image.medium}
                              size={{ base: "md", lg: "xl" }}
                              marginRight={2}
                              marginBottom={2}
                            />
                          )
                        )}
                      </Box>
                    </Box>
                    <Box display="flex" flexWrap="wrap" gap={1}>
                      {data.Media.genres.map((genre: string) => (
                        <Badge key={genre}>{genre}</Badge>
                      ))}
                    </Box>
                  </Box>
                </CardBody>
                <CardFooter>
                  <a target="blank" href={data.Media.siteUrl}>
                    <Button size={{ base: "xs", sm: "md" }}>
                      Visit Website
                    </Button>
                  </a>
                </CardFooter>
              </Card>

              <Text
                fontWeight="medium"
                dangerouslySetInnerHTML={{
                  __html: data.Media.description,
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

// Keeping the query document in the same file where it is used as a best practice for better maintainability and scalability
const GET_MANGA = gql`
  query media($id: Int!) {
    Media(id: $id) {
      title {
        english
      }
      siteUrl
      description
      episodes
      genres
      coverImage {
        large
      }
      characters(perPage: 5, sort: ROLE_DESC) {
        nodes {
          image {
            medium
          }
          name {
            first
          }
          id
        }
      }
    }
  }
`;

interface AnimeData {
  Media: {
    title: { english: string };
    coverImage: { large: string };
    characters: {
      nodes: { name: { first: string }; image: { medium: string } }[];
    };
    genres: string[];
    siteUrl: string;
    description: string;
  };
}
