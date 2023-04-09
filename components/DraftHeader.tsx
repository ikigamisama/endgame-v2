import {
  BackIcon,
  CharacterIcon,
  RestartIcon,
  SwapIcon,
} from "@/libs/includes/icons";
import {
  CharacterSample1,
  CharacterSample2,
  CharacterSample3,
  CharacterSample4,
  CharacterSample5,
  CharacterSample6,
  CharacterSample7,
  CharacterSample8,
  SampleBossImg,
} from "@/libs/includes/image";
import {
  BanCharacterWrapper,
  BanCharactersListContainer,
  BanCharactersListWrapper,
  BossDraftContainer,
  BossDraftWrapper,
  BossNameWrapper,
} from "@/src/styles/Draft";
import {
  Box,
  Flex,
  FormControl,
  HStack,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { USER_FEATURE, useUserData } from "@/libs/providers/UserContext";
import { ButtonPopUpNav, FontHeaderPopup } from "@/src/styles";
import { FormLabelText, FormSelect } from "@/src/styles/login";
import { SettingsIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { vision } from "@/libs/includes/color";

const DraftHeader: React.FC = () => {
  const router = useRouter();
  const { state, dispatch } = useUserData();
  return (
    <Box as="nav" w="100%">
      <HStack
        px={10}
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        gap={4}
      >
        <Flex flex={1} gap={4} justifyContent="flex-start">
          <ButtonPopUpNav onClick={() => router.push("/arena/123")}>
            <BackIcon />
          </ButtonPopUpNav>
          <ButtonPopUpNav>
            <CharacterIcon />
          </ButtonPopUpNav>
        </Flex>
        <Flex flex={1} justifyContent="center">
          <BanCharactersListContainer aligndraft="left">
            <BanCharactersListWrapper>
              <BanCharacterWrapper
                aligndraft="left"
                widthcharacter="25%"
                colorcharacter={vision["pyro"].color}
                indexcharacter="55"
              >
                <Image
                  src={CharacterSample4}
                  w="100%"
                  height="100%"
                  alt="ban-player-1-character"
                />
              </BanCharacterWrapper>
              <BanCharacterWrapper
                aligndraft="left"
                widthcharacter="50%"
                colorcharacter={vision["cryo"].color}
                indexcharacter="45"
              >
                <Image
                  src={CharacterSample3}
                  w="50%"
                  height="100%"
                  alt="ban-player-1-character"
                />
              </BanCharacterWrapper>
              <BanCharacterWrapper
                aligndraft="left"
                widthcharacter="75%"
                colorcharacter={vision["dendro"].color}
                indexcharacter="35"
              >
                <Image
                  src={CharacterSample2}
                  w="33%"
                  height="100%"
                  alt="ban-player-1-character"
                />
              </BanCharacterWrapper>
              <BanCharacterWrapper
                aligndraft="left"
                widthcharacter="100%"
                colorcharacter={vision["geo"].color}
                indexcharacter="25"
              >
                <Image
                  src={CharacterSample1}
                  w="25%"
                  height="100%"
                  alt="ban-player-1-character"
                />
              </BanCharacterWrapper>
            </BanCharactersListWrapper>
          </BanCharactersListContainer>
          <BossDraftContainer>
            <BossDraftWrapper>
              <Image
                src={SampleBossImg}
                w="100%"
                height="100%"
                alt="boss-draft"
              />

              <BossNameWrapper>Thunder Manifestation</BossNameWrapper>
            </BossDraftWrapper>
          </BossDraftContainer>
          <BanCharactersListContainer aligndraft="right">
            <BanCharactersListWrapper>
              <BanCharacterWrapper
                aligndraft="right"
                widthcharacter="25%"
                colorcharacter={vision["pyro"].color}
                indexcharacter="55"
              >
                <Image
                  src={CharacterSample8}
                  w="100%"
                  height="100%"
                  alt="ban-player-1-character"
                />
              </BanCharacterWrapper>
              <BanCharacterWrapper
                aligndraft="right"
                widthcharacter="50%"
                colorcharacter={vision["electro"].color}
                indexcharacter="45"
              >
                <Image
                  src={CharacterSample7}
                  w="50%"
                  height="100%"
                  alt="ban-player-1-character"
                />
              </BanCharacterWrapper>
              <BanCharacterWrapper
                aligndraft="right"
                widthcharacter="75%"
                colorcharacter={vision["hydro"].color}
                indexcharacter="35"
              >
                <Image
                  src={CharacterSample6}
                  w="33%"
                  height="100%"
                  alt="ban-player-1-character"
                />
              </BanCharacterWrapper>
              <BanCharacterWrapper
                aligndraft="right"
                widthcharacter="100%"
                colorcharacter={vision["geo"].color}
                indexcharacter="25"
              >
                <Image
                  src={CharacterSample5}
                  w="25%"
                  height="100%"
                  alt="ban-player-1-character"
                />
              </BanCharacterWrapper>
            </BanCharactersListWrapper>
          </BanCharactersListContainer>
        </Flex>
        <Flex flex={1} gap={4} justifyContent="flex-end">
          <Box>
            <Popover placement="bottom-start">
              <PopoverTrigger>
                <ButtonPopUpNav>
                  <SettingsIcon boxSize={7} />
                </ButtonPopUpNav>
              </PopoverTrigger>
              <PopoverContent bgColor="#1e223f">
                <FontHeaderPopup fontWeight="semibold" p={4}>
                  Settings
                </FontHeaderPopup>
                <PopoverArrow />

                <PopoverBody px={4} pb={5}>
                  <FormControl>
                    <FormLabelText>Background Video</FormLabelText>
                    <FormSelect
                      placeContent="random"
                      value={state.settings.video_bg.mp4
                        .replace("/video/bg/", "")
                        .replace("_bg.mp4", "")}
                      onChange={(e) =>
                        dispatch({
                          type: USER_FEATURE.UPDATE_SETTINGS,
                          payload: {
                            video_bg: {
                              mp4: "/video/bg/" + e.target.value + "_bg.mp4",
                              webm: "/video/bg/" + e.target.value + "_bg.webm",
                            },
                          },
                        })
                      }
                    >
                      <option value="stars">Default</option>
                      <option value="anemo">Anemo</option>
                      <option value="cryo">Cryo</option>
                      <option value="dendro">Dendro</option>
                      <option value="electro">Electro</option>
                      <option value="geo">Geo</option>
                      <option value="hydro">Hydro</option>
                      <option value="pyro">Pyro</option>
                    </FormSelect>
                  </FormControl>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
          <ButtonPopUpNav>
            <RestartIcon />
          </ButtonPopUpNav>
          <ButtonPopUpNav>
            <SwapIcon />
          </ButtonPopUpNav>
        </Flex>
      </HStack>
    </Box>
  );
};

export default DraftHeader;
