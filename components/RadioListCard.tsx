import { ArenaChooseModeBox, ArenaChooseModeWrapper } from "@/src/styles/Arena";
import { useRadio } from "@chakra-ui/react";

export default function RadioListCard(props: any) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const radiobox = getRadioProps();

  return (
    <ArenaChooseModeWrapper as="label">
      <input {...input} />
      <ArenaChooseModeBox
        {...radiobox}
        w="100%"
        cursor="pointer"
        _checked={{
          bg: "#ebebeb",
          color: "#1E223F",
          border: "3px solid #ebebeb"
        }}
      >
        {props.children}
      </ArenaChooseModeBox>
    </ArenaChooseModeWrapper>
  );
}
