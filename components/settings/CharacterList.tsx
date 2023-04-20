import { CharacterInfoProps } from "@/libs/helpers/types";
import {
  AnemoVisionIcon,
  CryoVisionIcon,
  DendroVisionIcon,
  ElectroVisionIcon,
  GeoVisionIcon,
  HydroVisionIcon,
  PyroVisionIcon,
} from "@/libs/includes/icons";
import { api } from "@/libs/providers/api";
import { useSettingsStore } from "@/libs/store/settings";
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
import {
  Box,
  Center,
  Grid,
  GridItem,
  HStack,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

const CharacterList: React.FC = () => {
  const [
    characterList,
    setCharacterList,
    setCharacterInfo,
    searchCharacter,
    setSearchCharacter,
    searchCharacterList,
  ] = useSettingsStore((state) => [
    state.characterList,
    state.setCharacterList,
    state.setCharacterInfo,
    state.searchCharacter,
    state.setSearchCharacter,
    state.searchCharacterList,
  ]);

  const characterListQuery = useQuery({
    queryKey: ["characterList"],
    queryFn: async () => {
      const listResponse = await api.post("/characters/list", {
        page: "Settings",
      });
      return listResponse.data.list;
    },
    onSuccess: (data) => {
      setCharacterList(data);
    },
  });

  const onSetEditCharacter = (boss: CharacterInfoProps) => {
    setCharacterInfo(boss);
  };

  return (
    <Box w="100%">
      <HStack mb={4} gap={4}>
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
              setCharacterList(characterListQuery.data);
            } else {
              searchCharacterList(searchCharacter);
            }
          }}
        >
          Search
        </CharacterSearchButton>
      </HStack>

      {characterListQuery.isLoading ? (
        <Center height="300px">
          <Spinner
            thickness="15px"
            speed="0.5s"
            emptyColor="#ECDEB5"
            color="#1E223F"
            width="150px"
            height="150px"
          />
        </Center>
      ) : (
        <CharacerListSettingWrapper>
          <Grid templateColumns="repeat(8, 1fr)" gap={4} p={2}>
            {characterList.map((char, index) => (
              <GridItem key={index}>
                <CharacterPickCard onClick={() => onSetEditCharacter(char)}>
                  <CharacterPickCardImg rarity={char.rarity}>
                    <Image src={char.draft_picture} alt="albedo-character" />
                    <CharacterPickCardVision>
                      {char.vision === "anemo" && <AnemoVisionIcon />}
                      {char.vision === "cryo" && <CryoVisionIcon />}
                      {char.vision === "dendro" && <DendroVisionIcon />}
                      {char.vision === "electro" && <ElectroVisionIcon />}
                      {char.vision === "geo" && <GeoVisionIcon />}
                      {char.vision === "hydro" && <HydroVisionIcon />}
                      {char.vision === "pyro" && <PyroVisionIcon />}
                    </CharacterPickCardVision>
                  </CharacterPickCardImg>
                  <CharacterPickCardInfo>
                    <CharacterPickCardInfoText>
                      {char.display_name}
                    </CharacterPickCardInfoText>
                  </CharacterPickCardInfo>
                </CharacterPickCard>
              </GridItem>
            ))}
          </Grid>
        </CharacerListSettingWrapper>
      )}
    </Box>
  );
};

export default CharacterList;
