import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

function InputModel({ onClose, isOpen, setAddLinks, handAddLinks, type }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <InputGroup size="md">
              {type == "insta" && (
                <Input
                  variant="filled"
                  placeholder="Add insatgram link"
                  onChange={(e) => setAddLinks({ insta: e.target.value })}
                />
              )}
              {type == "bio" && (
                <Input
                  variant="filled"
                  placeholder="Add bio"
                  onChange={(e) => setAddLinks({ bio: e.target.value })}
                />
              )}
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => {
                    handAddLinks();
                    onClose();
                  }}
                >
                  Post
                </Button>
              </InputRightElement>
            </InputGroup>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default InputModel;
