import { CharacterInfoProps } from "@/libs/helpers/types";
import { PlaySpeakerIcon } from "@/libs/includes/icons";
import { WarpImgGIF } from "@/libs/includes/image";
import { ArenaCheckbox } from "@/src/styles/Arena";
import { DraftBossCard, DraftBossCardBGImg } from "@/src/styles/Draft";
import {
  BossCard,
  ButtonPlayCharacters,
  TableTextFont,
} from "@/src/styles/Settings";
import {
  FormLabelText,
  FormSelect,
  FormSubmitButton,
  FormTextBox,
} from "@/src/styles/login";
import {
  Box,
  Center,
  Flex,
  FormControl,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useSound from "use-sound";

const Characters: React.FC = () => {
  const { handleSubmit, control, watch } = useForm<CharacterInfoProps>({
    defaultValues: {
      id: "",
      character_name: "",
      display_name: "",
      rarity: "",
      vision: "",
      draft_picture: "",
      pick_picture: "",
      flash_picture: "",
      ban_picture: "",
      ban_audio: "",
      pick_audio: "",
      is_visible: true,
    },
  });

  const onSubmitCharacters: SubmitHandler<CharacterInfoProps> = (data) => {
    console.log(data);
  };

  const [playPick] = useSound(
    "https://endgame.otakuhobbitoysph.com/cdn/voice/keqing_p.wav"
  );

  const [playBan] = useSound(
    "https://endgame.otakuhobbitoysph.com/cdn/voice/keqing_b.wav"
  );

  return (
    <Box as="section" py={4}>
      <form method="post" onSubmit={handleSubmit(onSubmitCharacters)}>
        <FormControl mb="25px">
          <Controller
            render={({ field: { onChange, value, name } }) => (
              <ArenaCheckbox
                size="lg"
                onChange={onChange}
                checked={value}
                name={name}
              >
                Show This Character
              </ArenaCheckbox>
            )}
            name="is_visible"
            control={control}
          />
        </FormControl>
        <SimpleGrid columns={2} spacing={8}>
          <Flex flex={1} direction="column">
            <TableTextFont>Character Draft Picture</TableTextFont>
            <Center py={8}>
              <Image
                src="https://endgame.otakuhobbitoysph.com/cdn/characters/thumbnail/Keqing.png"
                alt="avatar"
                width="50%"
              />
            </Center>

            <FormControl mb="25px">
              <FormLabelText>Image Source</FormLabelText>
              <Controller
                render={({ field: { onChange, value, name } }) => (
                  <FormTextBox
                    type="text"
                    onChange={onChange}
                    value={value}
                    name={name}
                  />
                )}
                name="draft_picture"
                control={control}
              />
            </FormControl>
          </Flex>

          <Flex flex={1} direction="column">
            <TableTextFont>Flash Picture</TableTextFont>
            <Center py={4}>
              <BossCard>
                <Box position="relative" zIndex="25" w="100%" h="100%">
                  <DraftBossCardBGImg src={WarpImgGIF} />

                  <Box position="relative" zIndex="50">
                    <Image
                      src="https://endgame.otakuhobbitoysph.com/cdn/characters/flash/Keqing.png"
                      alt="placements-flash"
                      width="100%"
                    />
                  </Box>
                </Box>
              </BossCard>
            </Center>

            <FormControl mb="25px">
              <FormLabelText>Image Source</FormLabelText>
              <Controller
                render={({ field: { onChange, value, name } }) => (
                  <FormTextBox
                    type="text"
                    onChange={onChange}
                    value={value}
                    name={name}
                  />
                )}
                name="flash_picture"
                control={control}
              />
            </FormControl>
          </Flex>
          <Flex flex={1} direction="column">
            <TableTextFont>Character Pick Picture</TableTextFont>
            <Center py={8}>
              <Image
                src="https://endgame.otakuhobbitoysph.com/cdn/characters/pick/Keqing.png"
                alt="avatar"
                width="100%"
              />
            </Center>

            <FormControl mb="25px">
              <FormLabelText>Image Source</FormLabelText>
              <Controller
                render={({ field: { onChange, value, name } }) => (
                  <FormTextBox
                    type="text"
                    onChange={onChange}
                    value={value}
                    name={name}
                  />
                )}
                name="pick_picture"
                control={control}
              />
            </FormControl>
          </Flex>
          <Flex flex={1} direction="column">
            <TableTextFont>Character Ban Picture</TableTextFont>
            <Center py={4}>
              <Image
                src="https://endgame.otakuhobbitoysph.com/cdn/characters/ban/Keqing.png"
                alt="avatar"
                width="48%"
              />
            </Center>
            <FormControl mb="25px">
              <FormLabelText>Image Source</FormLabelText>
              <Controller
                render={({ field: { onChange, value, name } }) => (
                  <FormTextBox
                    type="text"
                    onChange={onChange}
                    value={value}
                    name={name}
                  />
                )}
                name="ban_picture"
                control={control}
              />
            </FormControl>
          </Flex>
        </SimpleGrid>

        <SimpleGrid columns={2} spacing={8} mb={8}>
          <Flex direction="column">
            <ButtonPlayCharacters
              drafttype="pick"
              leftIcon={<PlaySpeakerIcon />}
              onClick={() => playPick()}
            >
              Play Pick Character Sound
            </ButtonPlayCharacters>
            <FormControl mt="25px">
              <FormLabelText>Pick Sound Source</FormLabelText>
              <Controller
                render={({ field: { onChange, value, name } }) => (
                  <FormTextBox
                    type="text"
                    onChange={onChange}
                    value={value}
                    name={name}
                  />
                )}
                name="pick_audio"
                control={control}
              />
            </FormControl>
          </Flex>
          <Flex direction="column">
            <ButtonPlayCharacters
              drafttype="Ban"
              leftIcon={<PlaySpeakerIcon />}
              onClick={() => playBan()}
            >
              Play Ban Character Sound
            </ButtonPlayCharacters>

            <FormControl mt="25px">
              <FormLabelText>Ban Sound Source</FormLabelText>
              <Controller
                render={({ field: { onChange, value, name } }) => (
                  <FormTextBox
                    type="text"
                    onChange={onChange}
                    value={value}
                    name={name}
                  />
                )}
                name="ban_audio"
                control={control}
              />
            </FormControl>
          </Flex>
        </SimpleGrid>

        <SimpleGrid columns={2} spacing={8} mb={4}>
          <FormControl mb="25px">
            <FormLabelText>Character Name</FormLabelText>
            <Controller
              render={({ field: { onChange, value, name } }) => (
                <FormTextBox
                  type="text"
                  onChange={onChange}
                  value={value}
                  name={name}
                />
              )}
              name="character_name"
              control={control}
            />
          </FormControl>
          <FormControl mb="25px">
            <FormLabelText>Display Name</FormLabelText>
            <Controller
              render={({ field: { onChange, value, name } }) => (
                <FormTextBox
                  type="text"
                  onChange={onChange}
                  value={value}
                  name={name}
                />
              )}
              name="display_name"
              control={control}
            />
          </FormControl>
        </SimpleGrid>

        <SimpleGrid columns={2} spacing={8} mb={8}>
          <FormControl mb="25px">
            <FormLabelText>Rarity</FormLabelText>
            <Controller
              render={({ field: { onChange, value, name } }) => (
                <FormSelect
                  placeholder="Select Rarity"
                  onChange={onChange}
                  value={value}
                  name={name}
                >
                  <option value="GM">4 Star</option>
                  <option value="Drafter">5 Star</option>
                </FormSelect>
              )}
              name="rarity"
              control={control}
            />
          </FormControl>
          <FormControl mb="25px">
            <FormLabelText>Vision</FormLabelText>
            <Controller
              render={({ field: { onChange, value, name } }) => (
                <FormSelect
                  placeholder="Select VIsion"
                  onChange={onChange}
                  value={value}
                  name={name}
                >
                  <option value="anemo">Anemo</option>
                  <option value="cryo">Cryo</option>
                  <option value="dendro">Dendro</option>
                  <option value="electro">Electro</option>
                  <option value="geo">Geo</option>
                  <option value="hydro">Hydro</option>
                  <option value="pyro">Pyro</option>
                </FormSelect>
              )}
              name="vision"
              control={control}
            />
          </FormControl>
        </SimpleGrid>

        <FormSubmitButton type="submit">Create Character</FormSubmitButton>
      </form>
    </Box>
  );
};

export default Characters;
