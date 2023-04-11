import { ProfileChanges } from "@/libs/helpers/types";
import { avatarList } from "@/libs/includes/avatars";
import { SettingsProfileAvatarWrapper } from "@/src/styles/Settings";
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

const Account: React.FC = () => {
  const { handleSubmit, control, watch } = useForm<ProfileChanges>({
    defaultValues: {
      id: "",
      name: "",
      role: "",
      avatar: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmitProfile: SubmitHandler<ProfileChanges> = (data) => {
    console.log(data);
  };

  const watchAvatar = watch("avatar"),
    watchRole = watch("role");

  return (
    <Box as="section" py={4}>
      <form method="post" onSubmit={handleSubmit(onSubmitProfile)}>
        <SimpleGrid columns={2} spacing={10} mb={4}>
          <Flex flex={1} direction="column">
            <FormControl mb="25px">
              <FormLabelText>Name</FormLabelText>
              <Controller
                render={({ field: { onChange, value, name } }) => (
                  <FormTextBox
                    type="text"
                    onChange={onChange}
                    value={value}
                    name={name}
                  />
                )}
                name="name"
                control={control}
              />
            </FormControl>
            <FormControl mb="25px">
              <FormLabelText>Role</FormLabelText>
              <Controller
                render={({ field: { onChange, value, name } }) => (
                  <FormSelect
                    placeholder="Select Role"
                    onChange={onChange}
                    value={value}
                    name={name}
                  >
                    <option value="GM">GM</option>
                    <option value="Drafter">Drafter</option>
                  </FormSelect>
                )}
                name="role"
                control={control}
              />
            </FormControl>
            {watchRole === "GM" && (
              <>
                <FormControl mb="25px">
                  <FormLabelText>Password</FormLabelText>
                  <Controller
                    render={({ field: { onChange, value, name } }) => (
                      <FormTextBox
                        type="password"
                        onChange={onChange}
                        value={value}
                        name={name}
                      />
                    )}
                    name="password"
                    control={control}
                  />
                </FormControl>
                <FormControl mb="25px">
                  <FormLabelText>Confirm Password</FormLabelText>
                  <Controller
                    render={({ field: { onChange, value, name } }) => (
                      <FormTextBox
                        type="password"
                        onChange={onChange}
                        value={value}
                        name={name}
                      />
                    )}
                    name="confirm_password"
                    control={control}
                  />
                </FormControl>
              </>
            )}
          </Flex>
          <Flex flex={1} direction="column">
            <Center>
              <SettingsProfileAvatarWrapper>
                <Image
                  src={
                    watchAvatar !== ""
                      ? watchAvatar
                      : "https://api.dicebear.com/6.x/adventurer/svg?seed=Baby"
                  }
                  alt="avatar"
                  width="100%"
                />
              </SettingsProfileAvatarWrapper>
            </Center>
            <FormControl mb="25px">
              <FormLabelText>Avatar</FormLabelText>
              <Controller
                render={({ field: { onChange, value, name } }) => (
                  <FormSelect
                    placeContent="Select Avatar"
                    onChange={onChange}
                    value={value}
                    name={name}
                  >
                    {avatarList.map((data, d) => (
                      <option key={d} value={data.img}>
                        {data.name}
                      </option>
                    ))}
                  </FormSelect>
                )}
                name="avatar"
                control={control}
              />
            </FormControl>
          </Flex>
        </SimpleGrid>
        <FormSubmitButton type="submit">Create Account</FormSubmitButton>
      </form>
    </Box>
  );
};

export default Account;
