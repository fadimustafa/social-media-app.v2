import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { UserProfile } from "@clerk/clerk-react";
const EditeProfile = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent
          w={"full"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <ModalBody>
            <ModalCloseButton zIndex={3} color={"black"} left={625} />
            <UserProfile />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditeProfile;
