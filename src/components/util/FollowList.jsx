import {
  Avatar,
  Box,
  Button,
  Flex,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
function FollowList({ uFollowers, uFollowing, isOpen, onClose }) {
  const navigate = useNavigate();
  return (
    <>
      <Modal onClose={onClose} size={"xs"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          {uFollowers && <ModalHeader>Followers</ModalHeader>}
          {uFollowing && <ModalHeader>Following</ModalHeader>}
          <ModalCloseButton />
          <ModalBody mb={3}>
            <Box w={"full"}>
              <UnorderedList styleType="none">
                {uFollowers &&
                  uFollowers.map((follower) => (
                    <ListItem
                      key={follower.follower_id}
                      _hover={{
                        bg: "#0e252f",
                        transform: "scale(1.05)",
                      }}
                      transition="all 0.3s ease-in-out"
                      p={2}
                      borderRadius={5}
                      ml={-3}
                    >
                      <Box
                        onClick={() =>
                          navigate(
                            `/${follower.userinfo?.user_name}/${follower.follower_id}`
                          )
                        }
                      >
                        <Flex
                          w={"full"}
                          h={"auto"}
                          gap={2}
                          alignItems={"center"}
                        >
                          <Avatar
                            size={"md"}
                            src={follower.userinfo?.profile_pic}
                          />
                          <Text
                            fontSize={"large"}
                            sx={{
                              _firstLetter: { textTransform: "uppercase" },
                            }}
                          >
                            {follower.userinfo?.profile_name}
                          </Text>
                        </Flex>
                      </Box>
                    </ListItem>
                  ))}
                {uFollowing &&
                  uFollowing.map((following) => (
                    <ListItem
                      key={following.following_id}
                      _hover={{
                        bg: "#0e252f",
                        transform: "scale(1.05)",
                      }}
                      transition="all 0.3s ease-in-out"
                      p={2}
                      borderRadius={5}
                      ml={-3}
                    >
                      <Flex w={"full"} h={"auto"} gap={2} alignItems={"center"}>
                        <Avatar
                          size={"md"}
                          src={following.userinfo?.profile_pic}
                        />
                        <Text
                          fontSize={"large"}
                          sx={{ _firstLetter: { textTransform: "uppercase" } }}
                        >
                          {following.userinfo?.profile_name}
                        </Text>
                      </Flex>
                    </ListItem>
                  ))}
              </UnorderedList>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FollowList;
