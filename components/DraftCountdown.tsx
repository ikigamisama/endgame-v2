import {
  DraftCountdownCard,
  DraftCountdownCardWrapper,
  DraftCountdownText,
  DraftRerollBanner,
} from "@/src/styles/Draft";
import { Flex } from "@chakra-ui/react";

const DraftCountdown = () => {
  return (
    <Flex
      flex={1}
      w="100%"
      direction="row"
      gap={10}
      alignItems="center"
      justifyContent="center"
    >
      <DraftRerollBanner bgColor="#61b162">Reroll</DraftRerollBanner>
      <DraftCountdownCard>
        <DraftCountdownCardWrapper>
          <DraftCountdownText>23</DraftCountdownText>
        </DraftCountdownCardWrapper>
      </DraftCountdownCard>
      <DraftRerollBanner bgColor="#95292d">No Reroll</DraftRerollBanner>
    </Flex>
  );
};

export default DraftCountdown;
