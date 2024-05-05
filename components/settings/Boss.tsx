import { BossInfoProps } from "@/libs/helpers/types";
import { UploadIcon } from "@/libs/includes/icons";
import { api } from "@/libs/providers/api";
import { useSettingsStore } from "@/libs/store/settings";
import { ToastBox, ToastText } from "@/src/styles";
import { ArenaCheckbox } from "@/src/styles/Arena";
import { BosstAvatarWrapper, TableTextFont, AudioUploadButton } from "@/src/styles/Settings";
import {
  FormLabelText,
  FormSubmitButton,
  FormTextBox,
} from "@/src/styles/login";
import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  FormControl,
  Image,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

const Boss: React.FC = () => {
  const toast = useToast();
  const queryclient = useQueryClient();
  const { handleSubmit, control, watch, reset, setValue } =
    useForm<BossInfoProps>({
      defaultValues: {
        id: "",
        name: "",
        picture: "",
        picture_choose: "",
        picture_flash: "",
        is_visible: true,
      },
    });

  const [bossInfo, setBossInfo] = useSettingsStore((state) => [
    state.bossInfo,
    state.setBossInfo,
  ]);

  const pickBossIconImage = useRef<HTMLInputElement>(null);
  const pickBossCenterImage = useRef<HTMLInputElement>(null);
  const pickBossFlashImage = useRef<HTMLInputElement>(null);

  const sendAddBoss = useMutation({
    mutationFn: async (newAccount: BossInfoProps) => {
      let submitResponse;
      if (bossInfo.id !== "") {
        submitResponse = await api.put("/boss/edit", newAccount);
      } else {
        submitResponse = await api.post("/boss/add", newAccount);
      }

      return submitResponse.data;
    },
    onSuccess: (data) => {
      toast({
        position: "top-right",
        render: () => (
          <ToastBox
            p={4}
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={4}
          >
            <CheckCircleIcon boxSize={5} />
            <ToastText> {data.message}</ToastText>
          </ToastBox>
        ),
        duration: 3000,
        isClosable: true,
      });
      if (data.success) {
        reset({
          name: "",
          picture: "",
          picture_choose: "",
          picture_flash: "",
          is_visible: true,
        });
        queryclient.invalidateQueries(["bossList"]);
        setBossInfo({
          id: "",
          name: "",
          picture: "",
          picture_choose: "",
          picture_flash: "",
          is_visible: true,
        });
      }
    },
  });

  const watchPicture: any = watch("picture"),
    watchPictureChoose: any = watch("picture_choose"),
    watchPictureFlash: any = watch("picture_flash");

  useEffect(() => {
    setValue("id", bossInfo.id);
    setValue("name", bossInfo.name);
    setValue("picture", bossInfo.picture);
    setValue("picture_choose", bossInfo.picture_choose);
    setValue("picture_flash", bossInfo.picture_flash);
    setValue("is_visible", bossInfo.is_visible);
  }, [bossInfo]);

  const onSubmitBoss: SubmitHandler<BossInfoProps> = (data) => {
    sendAddBoss.mutate(data);
  };

  const handleBossImageUpload = async (file: File, type: string) => {
    try {
      const formData = new FormData();
      formData.append("bossImageFile", file);
      const { data } = await api.post((type === "icon" ? "/boss/icon_upload" : (type === "flash" ? "/boss/flash_upload" : "/boss/center_upload")), formData);

      if (data.success) {
        type === "icon"
          ? setValue("picture", data.path)
          : (type === "flash" ? setValue("picture_choose", data.path) : setValue("picture_flash", data.path));
      }
    } catch (error: any) {
      console.log(error);
    }
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
                value={value}
                name={name}
                defaultChecked={value}
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
                {watchPicture && (
                  <Image src={watchPicture} alt="avatar" width="100%" />
                )}
              </BosstAvatarWrapper>
            </Center>

            <FormControl mb="25px">
              <input
                type="file"
                id="pick_boss_icon"
                ref={pickBossIconImage}
                style={{ display: "none" }}
                name="picture"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (!e.target.files) return;

                  handleBossImageUpload(e.target.files[0], "icon");
                }}
              />
              <AudioUploadButton
                onClick={() => pickBossIconImage?.current?.click()}
                leftIcon={<UploadIcon />}
              >
                Upload Boss Icon
              </AudioUploadButton>
            </FormControl>
          </Flex>
          <Flex flex={1} direction="column">
            <TableTextFont>Boss Center</TableTextFont>
            <Center h="300px">
              <BosstAvatarWrapper>
                {watchPictureFlash && (
                  <Image src={watchPictureFlash} alt="avatar" width="100%" />
                )}
              </BosstAvatarWrapper>
            </Center>

            <FormControl mb="25px">
              <input
                type="file"
                id="pick_boss_center"
                ref={pickBossCenterImage}
                style={{ display: "none" }}
                name="picture_choose"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (!e.target.files) return;

                  handleBossImageUpload(e.target.files[0], "center");
                }}
              />
              <AudioUploadButton
                onClick={() => pickBossCenterImage?.current?.click()}
                leftIcon={<UploadIcon />}
              >
                Upload Boss Center
              </AudioUploadButton>
            </FormControl>
          </Flex>
          <Flex flex={1} direction="column">
            <TableTextFont>Boss Flash</TableTextFont>
            <Center h="300px">
              <BosstAvatarWrapper>
                {watchPictureChoose && (
                  <Image src={watchPictureChoose} alt="avatar" width="100%" />
                )}
              </BosstAvatarWrapper>
            </Center>
            <FormControl mb="25px">
              <input
                type="file"
                id="pick_boss_flash"
                ref={pickBossFlashImage}
                style={{ display: "none" }}
                name="picture_flash"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (!e.target.files) return;

                  handleBossImageUpload(e.target.files[0], "flash");
                }}
              />
              <AudioUploadButton
                onClick={() => pickBossFlashImage?.current?.click()}
                leftIcon={<UploadIcon />}
              >
                Upload Boss Flash
              </AudioUploadButton>
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
            name="name"
            control={control}
          />
        </FormControl>

        <Controller
          render={({ field: { onChange, value, name } }) => (
            <input
              type="hidden"
              onChange={onChange}
              value={value}
              name={name}
            />
          )}
          name="id"
          control={control}
        />

        <FormSubmitButton type="submit">
          {bossInfo.id !== "" ? "Edit" : "Create"} Boss
        </FormSubmitButton>

        {bossInfo.id !== "" && (
          <FormSubmitButton
            type="button"
            mt={8}
            onClick={() => {
              setBossInfo({
                id: "",
                name: "",
                picture: "",
                picture_choose: "",
                picture_flash: "",
                is_visible: "",
              });
            }}
          >
            Reset Forms
          </FormSubmitButton>
        )}
      </form>
    </Box>
  );
};

export default Boss;
