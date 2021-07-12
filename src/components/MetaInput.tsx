import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  chakra,
  IconButton,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
  InputLeftElement,
} from '@chakra-ui/react';
import { useField } from '@unform/core';
import { FaTelegramPlane } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';

interface MetaInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  hasSubmitButton?: boolean;
}

const MetaInput: React.FC<MetaInputProps> = ({
  name,
  hasSubmitButton,
  size = '2rem',
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleInputFocused = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <InputGroup
      mb={rest.type === 'hidden' || rest.hidden ? 0 : 4}
      bg="white"
      rounded="md"
      border={rest.hidden ? 0 : '2px solid'}
      borderColor={
        isFocused
          ? 'brand.300'
          : !!error
          ? 'red.500'
          : isFilled
          ? 'green.600'
          : 'white'
      }
    >
      {!!error && (
        <Tooltip hasArrow label={error} bg="red.600" placement="top-start">
          <InputLeftElement title={error} p={2} roundedLeft="md">
            <Icon as={FiAlertCircle} color="red.500" />
          </InputLeftElement>
        </Tooltip>
      )}
      <Input
        name={name}
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        pl={`${!!error ? 12 : 4}`}
        borderColor="#ddd"
        _focus={{
          borderColor: 'transparent',
        }}
        _placeholder={{
          color: '#666',
        }}
        {...rest}
      />

      {hasSubmitButton && (
        <InputRightElement p={1}>
          <IconButton
            icon={<FaTelegramPlane />}
            aria-label="Inscrever-se"
            type="submit"
            colorScheme="brand"
            _focus={{ outline: 'none' }}
            _active={{ outline: 'none' }}
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default chakra(MetaInput);
