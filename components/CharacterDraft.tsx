import { CharacterDraftProps } from "@/libs/helpers/types";
import { convertVisionToColor } from "@/libs/includes/color";
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
import { api } from "@/libs/providers/api";
import { useDraftStore } from "@/libs/store/draft";

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
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const CharacterDraft: React.FC<CharacterDraftProps> = ({
  statusCharacterModal,
  onCloseCharacterModal,
}) => {
  const [
    boss,
    characters,
    setCharactersList,
    characterFilterElement,
    setCharacterFilterVision,
    searchCharacter,
    setSearchCharacter,
    searchCharacterList,
    currentCharacterChoose,
    setCurrentCharacterChoice,
  ] = useDraftStore((state) => [
    state.boss,
    state.characters,
    state.setCharactersList,
    state.characterFilterElement,
    state.setCharacterFilterVision,
    state.searchCharacter,
    state.setSearchCharacter,
    state.searchCharacterList,
    state.currentCharacterChoose,
    state.setCurrentCharacterChoice,
  ]);

  const characterListQuery = useQuery({
    queryFn: async () => {
      const listResponse = await api.post("/characters/list", {
        page: "Character List",
      });
      return listResponse.data.list;
    },
    queryKey: ["characterDraftList"],
    onSuccess: (data) => {
      setCharactersList(data);
    },
  });

  const colorConvertVision = (vision: string) => {
    return convertVisionToColor(vision);
  };

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
            <CharacterVisionButton
              isselectedeleemnt={
                characterFilterElement === "all" ? "true" : "false"
              }
              onClick={() => {
                setCharacterFilterVision("all");
                setCharactersList(characterListQuery.data);
                searchCharacterList(searchCharacter, "all");
              }}
            >
              <AllElementVisionIcon />
            </CharacterVisionButton>
            <CharacterVisionButton
              isselectedeleemnt={
                characterFilterElement === "anemo" ? "true" : "false"
              }
              onClick={() => {
                setCharacterFilterVision("anemo");
                setCharactersList(characterListQuery.data);
                searchCharacterList(searchCharacter, "anemo");
              }}
            >
              <AnemoVisionIcon color="#b9b4af" />
            </CharacterVisionButton>
            <CharacterVisionButton
              isselectedeleemnt={
                characterFilterElement === "cryo" ? "true" : "false"
              }
              onClick={() => {
                setCharacterFilterVision("cryo");
                setCharactersList(characterListQuery.data);
                searchCharacterList(searchCharacter, "cryo");
              }}
            >
              <CryoVisionIcon color="#b9b4af" />
            </CharacterVisionButton>
            <CharacterVisionButton
              isselectedeleemnt={
                characterFilterElement === "dendro" ? "true" : "false"
              }
              onClick={() => {
                setCharacterFilterVision("dendro");
                setCharactersList(characterListQuery.data);
                searchCharacterList(searchCharacter, "dendro");
              }}
            >
              <DendroVisionIcon color="#b9b4af" />
            </CharacterVisionButton>
            <CharacterVisionButton
              isselectedeleemnt={
                characterFilterElement === "electro" ? "true" : "false"
              }
              onClick={() => {
                setCharacterFilterVision("electro");
                setCharactersList(characterListQuery.data);
                searchCharacterList(searchCharacter, "electro");
              }}
            >
              <ElectroVisionIcon color="#b9b4af" />
            </CharacterVisionButton>
            <CharacterVisionButton
              isselectedeleemnt={
                characterFilterElement === "geo" ? "true" : "false"
              }
              onClick={() => {
                setCharacterFilterVision("geo");
                setCharactersList(characterListQuery.data);
                searchCharacterList(searchCharacter, "geo");
              }}
            >
              <GeoVisionIcon color="#b9b4af" />
            </CharacterVisionButton>
            <CharacterVisionButton
              isselectedeleemnt={
                characterFilterElement === "hydro" ? "true" : "false"
              }
              onClick={() => {
                setCharacterFilterVision("hydro");
                setCharactersList(characterListQuery.data);
                searchCharacterList(searchCharacter, "hydro");
              }}
            >
              <HydroVisionIcon color="#b9b4af" />
            </CharacterVisionButton>
            <CharacterVisionButton
              isselectedeleemnt={
                characterFilterElement === "pyro" ? "true" : "false"
              }
              onClick={() => {
                setCharacterFilterVision("pyro");
                setCharactersList(characterListQuery.data);
                searchCharacterList(searchCharacter, "pyro");
              }}
            >
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchCharacter(e.target.value);
                }}
              />
              <CharacterSearchButton
                onClick={() => {
                  if (searchCharacter == "") {
                    setCharactersList(characterListQuery.data);
                  } else {
                    searchCharacterList(searchCharacter, "all");
                  }
                }}
              >
                Search
              </CharacterSearchButton>
            </HStack>
            <CharacterListWrapper>
              <Grid templateColumns="repeat(7, 1fr)" gap={4} p={2}>
                {characters.map((charData, index) => (
                  <GridItem key={index}>
                    <CharacterPickCard
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentCharacterChoice(charData);
                      }}
                    >
                      <CharacterPickCardImg rarity={charData.rarity}>
                        <Image
                          src={charData.draft_picture}
                          alt={`${charData.name}-character-image`}
                        />
                        <CharacterPickCardVision>
                          {charData.vision === "anemo" && <AnemoVisionIcon />}
                          {charData.vision === "cryo" && <CryoVisionIcon />}
                          {charData.vision === "dendro" && <DendroVisionIcon />}
                          {charData.vision === "electro" && (
                            <ElectroVisionIcon />
                          )}
                          {charData.vision === "geo" && <GeoVisionIcon />}
                          {charData.vision === "hydro" && <HydroVisionIcon />}
                          {charData.vision === "pyro" && <PyroVisionIcon />}
                        </CharacterPickCardVision>
                      </CharacterPickCardImg>
                      <CharacterPickCardInfo>
                        <CharacterPickCardInfoText>
                          {charData.display_name}
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
              <CharacterPickInfoCardCharacter colorpickedcharacter="">
                <motion.div
                  key={currentCharacterChoose.id}
                  initial={{
                    width: "0%",
                  }}
                  animate={{
                    width: "100%",
                    transition: { duration: 0.5 },
                  }}
                  style={{
                    height: "100%",
                  }}
                >
                  <Box
                    bgColor={colorConvertVision(
                      currentCharacterChoose.vision !== ""
                        ? currentCharacterChoose.vision
                        : ""
                    )}
                    w="100%"
                    height="100%"
                  >
                    <Box className="character-picked-vision-icon">
                      {currentCharacterChoose.vision === "anemo" && (
                        <AnemoVisionIcon />
                      )}
                      {currentCharacterChoose.vision === "cryo" && (
                        <CryoVisionIcon />
                      )}
                      {currentCharacterChoose.vision === "dendro" && (
                        <DendroVisionIcon />
                      )}
                      {currentCharacterChoose.vision === "electro" && (
                        <ElectroVisionIcon />
                      )}
                      {currentCharacterChoose.vision === "geo" && (
                        <GeoVisionIcon />
                      )}
                      {currentCharacterChoose.vision === "hydro" && (
                        <HydroVisionIcon />
                      )}
                      {currentCharacterChoose.vision === "pyro" && (
                        <PyroVisionIcon />
                      )}
                    </Box>
                    {currentCharacterChoose.pick_picture !== "" && (
                      <motion.div
                        key={currentCharacterChoose.pick_picture}
                        initial={{
                          y: -20,
                          opacity: 0,
                        }}
                        animate={{
                          y: 0,
                          opacity: 1,
                          transition: { delay: 0.75, duration: 0.25 },
                        }}
                        style={{
                          height: "100%",
                        }}
                      >
                        <Image
                          className="character-picked-image-pick"
                          src={currentCharacterChoose.pick_picture}
                        />
                      </motion.div>
                    )}

                    {currentCharacterChoose.name !== "" && (
                      <CharacterPickInfoNameWrapper>
                        <CharacterPickInfoNameText>
                          {currentCharacterChoose.name}
                        </CharacterPickInfoNameText>
                      </CharacterPickInfoNameWrapper>
                    )}
                  </Box>
                </motion.div>
              </CharacterPickInfoCardCharacter>
              <CharacterPickInfoCardDetails>
                <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={4}>
                  <GridItem>
                    <HStack alignItems="center">
                      <CharacterPickInfoCardDetailsText>
                        Rarity:
                      </CharacterPickInfoCardDetailsText>
                      <HStack alignItems="center">
                        {Array(currentCharacterChoose.rarity === "4" ? 4 : 5)
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
                      Weapon Type: {currentCharacterChoose.weapon}
                    </CharacterPickInfoCardDetailsText>
                  </GridItem>
                  <GridItem>
                    <CharacterPickInfoCardDetailsText>
                      Element:{" "}
                      {currentCharacterChoose.vision.charAt(0).toUpperCase() +
                        currentCharacterChoose.vision.slice(1)}
                    </CharacterPickInfoCardDetailsText>
                  </GridItem>
                  <GridItem>
                    <CharacterPickInfoCardDetailsText>
                      Nation: {currentCharacterChoose.nation}
                    </CharacterPickInfoCardDetailsText>
                  </GridItem>
                </Grid>

                <CharacterDraftButton drafttype="pick">
                  Pick {currentCharacterChoose.name}
                </CharacterDraftButton>
              </CharacterPickInfoCardDetails>
            </CharacterPickInfoCard>
            <Box position="relative" my={4}>
              <BossAvatarCircle>
                {boss.picture !== "" && (
                  <Image src={boss.picture} alt="avatar" width="100%" />
                )}
              </BossAvatarCircle>
              <BossAvatarNameWrapper>
                <BossAvatarName>{boss.name}</BossAvatarName>
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
                        {/* <CharacterDraftPlayerImg rarity="4">
                          <Image src="https://endgame.otakuhobbitoysph.com/cdn/characters/thumbnail/Bennett.png" />
                        </CharacterDraftPlayerImg> */}
                      </CharacterDraftPlayerWrapper>
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
                      >
                        {/* <CharacterDraftPlayerImg rarity="5">
                          <Image src="https://endgame.otakuhobbitoysph.com/cdn/characters/thumbnail/Kaedehara_Kazuha.png" />
                        </CharacterDraftPlayerImg> */}
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
