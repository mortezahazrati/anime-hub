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
import { ReactNode } from "react";

export const ItemModal = ({
  isOpen,
  onClose,
  id,
}: {
  id: number;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { data, error } = useQuery<AnimeData>(GET_MANGA, {
    variables: { id },
  });

  let modalContent: ReactNode = null;

  if (error) modalContent = <Text color="red">An error has occurred.</Text>;

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
              <Card flexDirection="row" overflow="hidden" marginBottom={4}>
                <Image
                  objectFit="cover"
                  src={data.Media.coverImage.large}
                  alt="Caffe Latte"
                  width={230}
                  height={320}
                />

                <Box marginLeft={10}>
                  <CardBody>
                    <Text fontWeight="bold">Characters:</Text>

                    {data.Media.characters.nodes.map(
                      (character: {
                        name: { first: string };
                        image: { medium: string };
                      }) => (
                        <Avatar
                          key={character.name.first}
                          name={character.name.first}
                          src={character.image.medium}
                          size="2xl"
                          marginRight={2}
                        />
                      )
                    )}

                    <HStack my="4">
                      {data.Media.genres.map((genre: string) => (
                        <Badge key={genre}>{genre}</Badge>
                      ))}
                    </HStack>
                  </CardBody>
                  <CardFooter>
                    <a target="blank" href={data.Media.siteUrl}>
                      <Button>Visit Website</Button>
                    </a>
                  </CardFooter>
                </Box>
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
