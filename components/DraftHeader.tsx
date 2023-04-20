import {
  BackIcon,
  CharacterIcon,
  RestartIcon,
  SwapIcon,
} from "@/libs/includes/icons";

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
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useUserData, userStore } from "@/libs/providers/UserContext";
import { ButtonPopUpNav, FontHeaderPopup } from "@/src/styles";
import { FormLabelText, FormSelect } from "@/src/styles/login";
import { SettingsIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { vision } from "@/libs/includes/color";
import { useState } from "react";
import { CharacterDraftProps, ModalFeatures } from "@/libs/helpers/types";
import {
  EndgameModalContent,
  EndgameModalWrapper,
  ModalEndgameButton,
  ModalTextEndgame,
} from "@/src/styles/Modal";

const ModalFeatureDraft = ({ isOpen, onClose, title }: ModalFeatures) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />

      <EndgameModalContent>
        <EndgameModalWrapper>
          <ModalHeader></ModalHeader>
          <ModalBody>
            <ModalTextEndgame>{title}</ModalTextEndgame>
          </ModalBody>
          <ModalFooter>
            <ModalEndgameButton
              bgColor="#61B162"
              _hover={{
                bgColor: "#61B162",
                boxShadow: "0px 0px 16px 4px rgba(103, 228, 100, 1)",
              }}
            >
              OK
            </ModalEndgameButton>
            <ModalEndgameButton
              bgColor="#95292D"
              onClick={onClose}
              _hover={{
                bgColor: "#95292D",
                boxShadow: "0px 0px 16px 4px rgba(203, 53, 53, 1)",
              }}
            >
              Close
            </ModalEndgameButton>
          </ModalFooter>
        </EndgameModalWrapper>
      </EndgameModalContent>
    </Modal>
  );
};

const DraftHeader: React.FC<CharacterDraftProps> = ({
  onOpenCharacterModal,
  state,
}) => {
  const router = useRouter();

  const [setBackgroundBG] = userStore((state) => [state.setBackgroundBG]);
  const [modalRestartDraft, setModalRestartDraft] = useState<boolean>(false);
  const [modalSwitchDraft, setModalSwitchDraft] = useState<boolean>(false);

  const [arena_id] = userStore((state) => [state.arena_id]);

  const onCloseModalRestartDraft = () => {
    setModalRestartDraft(!modalRestartDraft);
  };

  const onCloseModalSwitchDraft = () => {
    setModalSwitchDraft(!modalSwitchDraft);
  };

  return (
    <>
      <ModalFeatureDraft
        isOpen={modalRestartDraft}
        onClose={onCloseModalRestartDraft}
        title="Are you sure to restart the draft"
      />

      <ModalFeatureDraft
        isOpen={modalSwitchDraft}
        onClose={onCloseModalSwitchDraft}
        title="Are you sure to switch the players"
      />

      <Box as="nav" w="100%">
        <HStack
          px={10}
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          gap={4}
        >
          <Flex flex={1} gap={4} justifyContent="flex-start">
            {state?.user.role === "GM" && (
              <ButtonPopUpNav onClick={() => router.push(`/arena/${arena_id}`)}>
                <BackIcon />
              </ButtonPopUpNav>
            )}
            {state?.user.role === "Drafter" && (
              <ButtonPopUpNav onClick={onOpenCharacterModal}>
                <CharacterIcon />
              </ButtonPopUpNav>
            )}
          </Flex>
          <Flex flex={1} justifyContent="center">
            <BanCharactersListContainer
              width="450px"
              aligndraft="left"
              statusdraft="none"
            >
              <BanCharactersListWrapper width="425px">
                <BanCharacterWrapper
                  aligndraft="left"
                  widthcharacter="25%"
                  colorcharacter={vision["pyro"].color}
                  indexcharacter="55"
                >
                  <Image
                    src="https://endgame.otakuhobbitoysph.com/cdn/characters/ban/Amber.png"
                    w="100%"
                    alt="ban-player-1-character-d"
                  />
                </BanCharacterWrapper>
                <BanCharacterWrapper
                  aligndraft="left"
                  widthcharacter="50%"
                  colorcharacter={vision["cryo"].color}
                  indexcharacter="45"
                >
                  <Image
                    src="https://endgame.otakuhobbitoysph.com/cdn/characters/ban/Aloy.png"
                    w="50%"
                    alt="ban-player-1-character-c"
                  />
                </BanCharacterWrapper>
                <BanCharacterWrapper
                  aligndraft="left"
                  widthcharacter="75%"
                  colorcharacter={vision["dendro"].color}
                  indexcharacter="35"
                >
                  <Image
                    src="https://endgame.otakuhobbitoysph.com/cdn/characters/ban/Alhaitham.png"
                    w="33%"
                    alt="ban-player-1-character-b"
                  />
                </BanCharacterWrapper>
                <BanCharacterWrapper
                  aligndraft="left"
                  widthcharacter="100%"
                  colorcharacter={vision["geo"].color}
                  indexcharacter="25"
                >
                  <Image
                    src="https://endgame.otakuhobbitoysph.com/cdn/characters/ban/Albedo.png"
                    w="25%"
                    alt="ban-player-1-character-a"
                  />
                </BanCharacterWrapper>
              </BanCharactersListWrapper>
            </BanCharactersListContainer>
            <BossDraftContainer>
              <BossDraftWrapper>
                <Image
                  src="https://endgame.otakuhobbitoysph.com/cdn/boss/center/Thunder_Manifestation.png"
                  w="100%"
                  alt="boss-draft"
                />
                <BossNameWrapper>Thunder Manifestation</BossNameWrapper>
              </BossDraftWrapper>
            </BossDraftContainer>
            <BanCharactersListContainer
              width="450px"
              aligndraft="right"
              statusdraft="ban"
            >
              <BanCharactersListWrapper width="425px">
                <BanCharacterWrapper
                  aligndraft="right"
                  widthcharacter="25%"
                  colorcharacter={vision["pyro"].color}
                  indexcharacter="55"
                >
                  <Image
                    src="https://endgame.otakuhobbitoysph.com/cdn/characters/ban/Bennett.png"
                    w="100%"
                    alt="ban-player-2-characte-8"
                  />
                </BanCharacterWrapper>
                <BanCharacterWrapper
                  aligndraft="right"
                  widthcharacter="50%"
                  colorcharacter={vision["electro"].color}
                  indexcharacter="45"
                >
                  <Image
                    src="https://endgame.otakuhobbitoysph.com/cdn/characters/ban/Beidou.png"
                    w="50%"
                    alt="ban-player-2-character-7"
                  />
                </BanCharacterWrapper>
                <BanCharacterWrapper
                  aligndraft="right"
                  widthcharacter="75%"
                  colorcharacter={vision["hydro"].color}
                  indexcharacter="35"
                >
                  <Image
                    src="https://endgame.otakuhobbitoysph.com/cdn/characters/ban/Barbara.png"
                    w="33%"
                    alt="ban-player-2-character-6"
                  />
                </BanCharacterWrapper>
                <BanCharacterWrapper
                  aligndraft="right"
                  widthcharacter="100%"
                  colorcharacter={vision["geo"].color}
                  indexcharacter="25"
                >
                  <Image
                    src="https://endgame.otakuhobbitoysph.com/cdn/characters/ban/Arataki_Itto.png"
                    w="25%"
                    alt="ban-player-2-character-5"
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
                        value={state?.settings.video_bg.mp4
                          .replace("/video/bg/", "")
                          .replace("_bg.mp4", "")}
                        onChange={(e) => {
                          setBackgroundBG({
                            mp4: "/video/bg/" + e.target.value + "_bg.mp4",
                            webm: "/video/bg/" + e.target.value + "_bg.webm",
                          });
                        }}
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

            {state?.user.role === "GM" && (
              <>
                <ButtonPopUpNav
                  onClick={() => {
                    setModalRestartDraft(true);
                  }}
                >
                  <RestartIcon />
                </ButtonPopUpNav>
                <ButtonPopUpNav
                  onClick={() => {
                    setModalSwitchDraft(true);
                  }}
                >
                  <SwapIcon />
                </ButtonPopUpNav>
              </>
            )}
          </Flex>
        </HStack>
      </Box>
    </>
  );
};

export default DraftHeader;
