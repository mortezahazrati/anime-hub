import { Tag, TagProps } from "@chakra-ui/react";

// A responsive Tag to behave the same where it's used
const ItemCardTag = ({
  tagLabel,
  ...props
}: { tagLabel: string } & TagProps) => {
  return (
    <Tag
      size={{ base: "md", sm: "lg" }}
      fontSize={{ base: "xs", sm: "md" }}
      position="absolute"
      rounded={2}
      top={2}
      {...props}
    >
      {tagLabel}
    </Tag>
  );
};

export default ItemCardTag;
