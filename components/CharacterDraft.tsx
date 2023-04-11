import { CharacterDraftProps } from "@/libs/helpers/types";
import { vision } from "@/libs/includes/color";
import {
  AllElementVisionIcon,
  AnemoVisionIcon,
  CloseModalCharacterPick,
  CryoVisionIcon,
  DendroVisionIcon,
  ElectroVisionIcon,
  GeoVisionIcon,
  HydroVisionIcon,
  PyroVisionIcon,
} from "@/libs/includes/icons";
import { CharacterPickImg, StartIcon } from "@/libs/includes/image";

import {
  BossAvatarCircle,
  BossAvatarName,
  BossAvatarNameWrapper,
  CharacterDraftButton,
  CharacterDraftPlayerImg,
  CharacterDraftPlayerWrapper,
  CharacterInfoWrapper,
  CharacterListWrapper,
  CharacterPickCard,
  CharacterPickCardImg,
  CharacterPickCardInfo,
  CharacterPickCardInfoText,
  CharacterPickCardVision,
  CharacterPickInfoCard,
  CharacterPickInfoCardBody,
  CharacterPickInfoCardCharacter,
  CharacterPickInfoCardDetails,
  CharacterPickInfoCardDetailsText,
  CharacterPickInfoCardHeader,
  CharacterPickInfoNameText,
  CharacterPickInfoNameWrapper,
  CharacterPickModalCloseButton,
  CharacterPickWrapper,
  CharacterSearchButton,
  CharacterTextFieldSearch,
  CharacterVisionButton,
  ModalCharacterPickBody,
  ModalCharacterPickWrapper,
  ModalCharacterPickheader,
  ModalCharacterTextHeader,
} from "@/src/styles/CharacterPick";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";

const characterLength = Array(72).fill(0);

const CharacterDraft: React.FC<CharacterDraftProps> = ({
  statusCharacterModal,
  onCloseCharacterModal,
}) => {
  return statusCharacterModal === true ? (
    <ModalCharacterPickWrapper>
      <ModalCharacterPickheader as="nav">
        <HStack w="100%" alignItems="center" justifyContent="space-between">
          <Flex flex={1} direction="row" gap={6} alignItems="center">
            <Image src={CharacterPickImg} w="30px" />
            <ModalCharacterTextHeader>
              Character Selection
            </ModalCharacterTextHeader>
          </Flex>
          <Flex
            flex={1}
            direction="row"
            gap={4}
            alignItems="center"
            justifyContent="center"
          >
            <CharacterVisionButton isselectedeleemnt="true">
              <AllElementVisionIcon />
            </CharacterVisionButton>
            <CharacterVisionButton isselectedeleemnt="false">
              <AnemoVisionIcon color="#b9b4af" />
            </CharacterVisionButton>
            <CharacterVisionButton isselectedeleemnt="false">
              <CryoVisionIcon color="#b9b4af" />
            </CharacterVisionButton>
            <CharacterVisionButton isselectedeleemnt="false">
              <DendroVisionIcon color="#b9b4af" />
            </CharacterVisionButton>
            <CharacterVisionButton isselectedeleemnt="false">
              <ElectroVisionIcon color="#b9b4af" />
            </CharacterVisionButton>
            <CharacterVisionButton isselectedeleemnt="false">
              <GeoVisionIcon color="#b9b4af" />
            </CharacterVisionButton>
            <CharacterVisionButton isselectedeleemnt="false">
              <HydroVisionIcon color="#b9b4af" />
            </CharacterVisionButton>
            <CharacterVisionButton isselectedeleemnt="false">
              <PyroVisionIcon color="#b9b4af" />
            </CharacterVisionButton>
          </Flex>
          <Flex
            flex={1}
            direction="row"
            gap={6}
            alignItems="center"
            justifyContent="flex-end"
          >
            <ModalCharacterTextHeader>
              Seconds Remaining: 23
            </ModalCharacterTextHeader>
            <CharacterPickModalCloseButton onClick={onCloseCharacterModal}>
              <CloseModalCharacterPick />
            </CharacterPickModalCloseButton>
          </Flex>
        </HStack>
      </ModalCharacterPickheader>
      <ModalCharacterPickBody>
        <SimpleGrid columns={2} spacing={4} w="100%">
          <CharacterPickWrapper>
            <HStack my={4} gap={4}>
              <CharacterTextFieldSearch
                type="text"
                placeholder="Search Characters"
              />
              <CharacterSearchButton>Search</CharacterSearchButton>
            </HStack>
            <CharacterListWrapper>
              <Grid templateColumns="repeat(8, 1fr)" gap={4} p={2}>
                {characterLength.map((_, index) => (
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
                        <CharacterPickCardInfoText>
                          Ayaka
                        </CharacterPickCardInfoText>
                      </CharacterPickCardInfo>
                    </CharacterPickCard>
                  </GridItem>
                ))}
              </Grid>
            </CharacterListWrapper>
          </CharacterPickWrapper>
          <CharacterInfoWrapper>
            <CharacterPickInfoCard h="375px">
              <CharacterPickInfoCardCharacter
                colorpickedcharacter={vision["hydro"].color}
              >
                <Box className="character-picked-vision-icon">
                  {vision["hydro"].logoSrc}
                </Box>
                <Image
                  className="character-picked-image-pick"
                  src="https://endgame.otakuhobbitoysph.com/cdn/characters/pick/Yelan.png"
                />
                <CharacterPickInfoNameWrapper>
                  <CharacterPickInfoNameText>Yelan</CharacterPickInfoNameText>
                </CharacterPickInfoNameWrapper>
              </CharacterPickInfoCardCharacter>
              <CharacterPickInfoCardDetails>
                <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={4}>
                  <GridItem>
                    <HStack alignItems="center">
                      <CharacterPickInfoCardDetailsText>
                        Rarity:
                      </CharacterPickInfoCardDetailsText>
                      <HStack alignItems="center">
                        {Array(5)
                          .fill(0)
                          .map((_, index) => (
                            <Image
                              src={StartIcon}
                              w="25px"
                              marginInlineStart="0 !important"
                              key={index}
                            />
                          ))}
                      </HStack>
                    </HStack>
                  </GridItem>
                  <GridItem>
                    <CharacterPickInfoCardDetailsText>
                      Weapon Type: Bow
                    </CharacterPickInfoCardDetailsText>
                  </GridItem>
                  <GridItem>
                    <CharacterPickInfoCardDetailsText>
                      Element: Hydro
                    </CharacterPickInfoCardDetailsText>
                  </GridItem>
                  <GridItem>
                    <CharacterPickInfoCardDetailsText>
                      Nation: Liyue
                    </CharacterPickInfoCardDetailsText>
                  </GridItem>
                </Grid>

                <CharacterDraftButton drafttype="pick">
                  Pick Yelan
                </CharacterDraftButton>
              </CharacterPickInfoCardDetails>
            </CharacterPickInfoCard>
            <Box position="relative" my={4}>
              <BossAvatarCircle>
                <Image
                  src="https://endgame.otakuhobbitoysph.com/cdn/boss/icon/Aeonblight_Drake.png"
                  alt="avatar"
                  width="100%"
                />
              </BossAvatarCircle>
              <BossAvatarNameWrapper>
                <BossAvatarName>AeonBlight</BossAvatarName>
              </BossAvatarNameWrapper>
            </Box>
            <CharacterPickInfoCard h="165px">
              <CharacterPickInfoCardHeader>
                Banned Characters
              </CharacterPickInfoCardHeader>
              <CharacterPickInfoCardBody>
                <SimpleGrid columns={2} spacing={16} w="100%">
                  <Grid templateColumns="repeat(4, 1fr)" gap={2}>
                    <GridItem>
                      <CharacterDraftPlayerWrapper
                        currentdraft="false"
                        drafttype="ban"
                      >
                        <CharacterDraftPlayerImg rarity="4">
                          <Image src="https://endgame.otakuhobbitoysph.com/cdn/characters/thumbnail/Bennett.png" />
                        </CharacterDraftPlayerImg>
                      </CharacterDraftPlayerWrapper>
                    </GridItem>
                    <GridItem>
                      <CharacterDraftPlayerWrapper
                        currentdraft="false"
                        drafttype="ban"
                      >
                        <CharacterDraftPlayerImg rarity="5">
                          <Image src="https://endgame.otakuhobbitoysph.com/cdn/characters/thumbnail/Kamisato_Ayato.png" />
                        </CharacterDraftPlayerImg>
                      </CharacterDraftPlayerWrapper>
                    </GridItem>
                    <GridItem>
                      <CharacterDraftPlayerWrapper
                        currentdraft="false"
                        drafttype="ban"
                      >
                        <CharacterDraftPlayerImg rarity="5">
                          <Image src="https://endgame.otakuhobbitoysph.com/cdn/characters/thumbnail/Yoimiya.png" />
                        </CharacterDraftPlayerImg>
                      </CharacterDraftPlayerWrapper>
                    </GridItem>
                    <GridItem>
                      <CharacterDraftPlayerWrapper
                        currentdraft="true"
                        drafttype="ban"
                      ></CharacterDraftPlayerWrapper>
                    </GridItem>
                  </Grid>
                  <Grid templateColumns="repeat(4, 1fr)" gap={2}>
                    <GridItem>
                      <CharacterDraftPlayerWrapper
                        currentdraft="false"
                        drafttype="ban"
                      ></CharacterDraftPlayerWrapper>
                    </GridItem>
                    <GridItem>
                      <CharacterDraftPlayerWrapper
                        currentdraft="false"
                        drafttype="ban"
                      ></CharacterDraftPlayerWrapper>
                    </GridItem>
                    <GridItem>
                      <CharacterDraftPlayerWrapper
                        currentdraft="false"
                        drafttype="ban"
                      ></CharacterDraftPlayerWrapper>
                    </GridItem>
                    <GridItem>
                      <CharacterDraftPlayerWrapper
                        currentdraft="false"
                        drafttype="ban"
                      ></CharacterDraftPlayerWrapper>
                    </GridItem>
                  </Grid>
                </SimpleGrid>
              </CharacterPickInfoCardBody>
            </CharacterPickInfoCard>
            <CharacterPickInfoCard h="165px">
              <CharacterPickInfoCardHeader>
                Picked Characters
              </CharacterPickInfoCardHeader>
              <CharacterPickInfoCardBody>
                <SimpleGrid columns={2} spacing={16} w="100%">
                  <Grid templateColumns="repeat(4, 1fr)" gap={2}>
                    <GridItem>
                      <CharacterDraftPlayerWrapper
                        currentdraft="false"
                        drafttype="pick"
                      ></CharacterDraftPlayerWrapper>
                    </GridItem>
                    <GridItem>
                      <CharacterDraftPlayerWrapper
                        currentdraft="false"
                        drafttype="pick"
                      ></CharacterDraftPlayerWrapper>
                    </GridItem>
                    <GridItem>
                      <CharacterDraftPlayerWrapper
                        currentdraft="false"
                        drafttype="pick"
                      ></CharacterDraftPlayerWrapper>
                    </GridItem>
                    <GridItem>
                      <CharacterDraftPlayerWrapper
                        currentdraft="false"
                        drafttype="pick"
                      ></CharacterDraftPlayerWrapper>
                    </GridItem>
                  </Grid>
                  <Grid templateColumns="repeat(4, 1fr)" gap={2}>
                    <GridItem>
                      <CharacterDraftPlayerWrapper
                        currentdraft="false"
                        drafttype="pick"
                      ></CharacterDraftPlayerWrapper>
                    </GridItem>
                    <GridItem>
                      <CharacterDraftPlayerWrapper
                        currentdraft="true"
                        drafttype="pick"
                      ></CharacterDraftPlayerWrapper>
                    </GridItem>
                    <GridItem>
                      <CharacterDraftPlayerWrapper
                        currentdraft="false"
                        drafttype="pick"
                      >
                        <CharacterDraftPlayerImg rarity="5">
                          <Image src="https://endgame.otakuhobbitoysph.com/cdn/characters/thumbnail/Tartaglia.png" />
                        </CharacterDraftPlayerImg>
                      </CharacterDraftPlayerWrapper>
                    </GridItem>
                    <GridItem>
                      <CharacterDraftPlayerWrapper
                        currentdraft="false"
                        drafttype="pick"
                      >
                        <CharacterDraftPlayerImg rarity="5">
                          <Image src="https://endgame.otakuhobbitoysph.com/cdn/characters/thumbnail/Kaedehara_Kazuha.png" />
                        </CharacterDraftPlayerImg>
                      </CharacterDraftPlayerWrapper>
                    </GridItem>
                  </Grid>
                </SimpleGrid>
              </CharacterPickInfoCardBody>
            </CharacterPickInfoCard>
          </CharacterInfoWrapper>
        </SimpleGrid>
      </ModalCharacterPickBody>
    </ModalCharacterPickWrapper>
  ) : null;
};

export default CharacterDraft;
