import { CharacterDraftProps } from "@/libs/helpers/types";
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
import { CharacterPickImg } from "@/libs/includes/image";
import {
  CharacterPickModalCloseButton,
  CharacterVisionButton,
  ModalCharacterPickBody,
  ModalCharacterPickWrapper,
  ModalCharacterPickheader,
  ModalCharacterTextHeader,
} from "@/src/styles/CharacterPick";
import { Flex, HStack, Image } from "@chakra-ui/react";

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
              <AnemoVisionIcon color="#b9b4af !important" />
            </CharacterVisionButton>
            <CharacterVisionButton isselectedeleemnt="false">
              <CryoVisionIcon color="#b9b4af !important" />
            </CharacterVisionButton>
            <CharacterVisionButton isselectedeleemnt="false">
              <DendroVisionIcon color="#b9b4af !important" />
            </CharacterVisionButton>
            <CharacterVisionButton isselectedeleemnt="false">
              <ElectroVisionIcon color="#b9b4af !important" />
            </CharacterVisionButton>
            <CharacterVisionButton isselectedeleemnt="false">
              <GeoVisionIcon color="#b9b4af !important" />
            </CharacterVisionButton>
            <CharacterVisionButton isselectedeleemnt="false">
              <HydroVisionIcon color="#b9b4af !important" />
            </CharacterVisionButton>
            <CharacterVisionButton isselectedeleemnt="false">
              <PyroVisionIcon color="#b9b4af !important" />
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
      <ModalCharacterPickBody></ModalCharacterPickBody>
    </ModalCharacterPickWrapper>
  ) : null;
};

export default CharacterDraft;
