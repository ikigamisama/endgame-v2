import { BossInfoProps } from "@/libs/helpers/types";
import { ArenaCheckbox } from "@/src/styles/Arena";
import { BosstAvatarWrapper, TableTextFont } from "@/src/styles/Settings";
import {
  FormLabelText,
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

const Boss: React.FC = () => {
  const { handleSubmit, control, watch } = useForm<BossInfoProps>({
    defaultValues: {
      id: "",
      boss_name: "",
      picture: "",
      picture_choose: "",
      picture_flash: "",
      is_visible: true,
    },
  });

  const onSubmitBoss: SubmitHandler<BossInfoProps> = (data) => {
    console.log(data);
  };
  return (
    <Box as="section" py={4}>
      <form method="post" onSubmit={handleSubmit(onSubmitBoss)}>
        <FormControl mb="25px">
          <Controller
            render={({ field: { onChange, value, name } }) => (
              <ArenaCheckbox
                size="lg"
                onChange={onChange}
                checked={value}
                name={name}
              >
                Show This Boss
              </ArenaCheckbox>
            )}
            name="is_visible"
            control={control}
          />
        </FormControl>
        <SimpleGrid columns={3} spacing={8}>
          <Flex flex={1} direction="column">
            <TableTextFont>Boss Icon</TableTextFont>
            <Center h="300px">
              <BosstAvatarWrapper>
                <Image
                  src="https://endgame.otakuhobbitoysph.com/cdn/boss/icon/Aeonblight_Drake.png"
                  alt="avatar"
                  width="100%"
                />
              </BosstAvatarWrapper>
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
                name="picture"
                control={control}
              />
            </FormControl>
          </Flex>
          <Flex flex={1} direction="column">
            <TableTextFont>Boss Center</TableTextFont>
            <Center h="300px">
              <BosstAvatarWrapper>
                <Image
                  src="https://endgame.otakuhobbitoysph.com/cdn/boss/flash/Aeonblight_Drake.webp"
                  alt="avatar"
                  width="100%"
                />
              </BosstAvatarWrapper>
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
                name="picture_flash"
                control={control}
              />
            </FormControl>
          </Flex>
          <Flex flex={1} direction="column">
            <TableTextFont>Boss Flash</TableTextFont>
            <Center h="300px">
              <BosstAvatarWrapper>
                <Image
                  src="https://endgame.otakuhobbitoysph.com/cdn/boss/center/Aeonblight_Drake.png"
                  alt="avatar"
                  width="100%"
                />
              </BosstAvatarWrapper>
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
                name="picture_choose"
                control={control}
              />
            </FormControl>
          </Flex>
        </SimpleGrid>
        <FormControl mb="25px">
          <FormLabelText>Boss Name</FormLabelText>
          <Controller
            render={({ field: { onChange, value, name } }) => (
              <FormTextBox
                type="text"
                onChange={onChange}
                value={value}
                name={name}
              />
            )}
            name="boss_name"
            control={control}
          />
        </FormControl>

        <FormSubmitButton type="submit">Create Boss</FormSubmitButton>
      </form>
    </Box>
  );
};

export default Boss;
