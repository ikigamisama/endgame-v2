import { vision } from "@/libs/includes/color";
import {
  CharacterPickCard,
  CharacterPickCardImg,
  CharacterPickCardInfo,
  CharacterPickCardInfoText,
  CharacterPickCardVision,
  CharacterSearchButton,
  CharacterTextFieldSearch,
} from "@/src/styles/CharacterPick";
import { CharacerListSettingWrapper } from "@/src/styles/Settings";
import { Box, Grid, GridItem, HStack, Image } from "@chakra-ui/react";

const CharacterList: React.FC = () => {
  return (
    <Box w="100%">
      <HStack mb={4} gap={4}>
        <CharacterTextFieldSearch type="text" placeholder="Search Characters" />
        <CharacterSearchButton>Search</CharacterSearchButton>
      </HStack>

      <CharacerListSettingWrapper>
        <Grid templateColumns="repeat(8, 1fr)" gap={4} p={2}>
          {Array(72)
            .fill(0)
            .map((_, index) => (
              <GridItem key={index}>
                <CharacterPickCard>
                  <CharacterPickCardImg rarity="4">
                    <Image
                      src="https://endgame.otakuhobbitoysph.com/cdn/characters/thumbnail/Albedo.png"
                      alt="albedo-character"
                    />
                    <CharacterPickCardVision>
                      {vision["geo"].logoSrc}
                    </CharacterPickCardVision>
                  </CharacterPickCardImg>
                  <CharacterPickCardInfo>
                    <CharacterPickCardInfoText>Ayaka</CharacterPickCardInfoText>
                  </CharacterPickCardInfo>
                </CharacterPickCard>
              </GridItem>
            ))}
        </Grid>
      </CharacerListSettingWrapper>
    </Box>
  );
};

export default CharacterList;
