import {
  DraftPlayerText,
  DraftPlayerTextWrapper,
  DraftPlayerVersusText,
  DraftPlayerVersusWrapper,
  DraftPlayersNamePlate,
} from "@/src/styles/Draft";
import { Box } from "@chakra-ui/react";

const DraftFooter: React.FC = () => {
  return (
    <DraftPlayersNamePlate>
      <DraftPlayerTextWrapper aligndraft="left">
        <DraftPlayerText>Apple Silver</DraftPlayerText>
      </DraftPlayerTextWrapper>
      <Box width="14%" />
      <DraftPlayerVersusWrapper>
        <DraftPlayerVersusText>VS</DraftPlayerVersusText>
      </DraftPlayerVersusWrapper>
      <DraftPlayerTextWrapper aligndraft="right">
        <DraftPlayerText>Mema Team</DraftPlayerText>
      </DraftPlayerTextWrapper>
    </DraftPlayersNamePlate>
  );
};

export default DraftFooter;
