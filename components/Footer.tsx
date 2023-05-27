import {
  CreatedByIcon,
  DesignerIcon,
  DeveloperIcon,
} from "@/libs/includes/icons";
import { FooterBox } from "@/src/styles";
import { Flex, SimpleGrid } from "@chakra-ui/react";

const Footer = () => {
  return (
    <FooterBox>
      <SimpleGrid columns={3}>
        <Flex justifyContent="start" alignItems="center" direction="row">
          <DeveloperIcon />
          Developed By: Ikigami
        </Flex>
        <Flex justifyContent="center" alignItems="center" direction="row">
          <CreatedByIcon />
          Created By: Kero
        </Flex>
        <Flex justifyContent="end" alignItems="center" direction="row">
          <DesignerIcon />
          Layout Design By: Kinirits
        </Flex>
      </SimpleGrid>
    </FooterBox>
  );
};

export default Footer;
