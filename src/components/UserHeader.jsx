import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import EditeProfile from "./EditeProfile";
import { useFollow } from "../hooks/useFollow.js";
import { useUser } from "@clerk/clerk-react";
import InputModel from "./util/InputModel.jsx";
import FollowList from "./util/FollowList.jsx";
import { useMultiDisclosure } from "../hooks/useMultiDisclosure.js";
function UserHeader({ user }) {
  const { user: clerk } = useUser();
  const {
    handelFollow,
    uFollowers,
    uFollowing,
    isFollowing,
    handAddLinks,
    setAddLinks,
  } = useFollow(user.id);
  const { onOpen, onClose, isOpen } = useMultiDisclosure();
  const toast = useToast();
  return (
    <>
      <VStack gap={4} alignItems={"start"} mb={2} px={5}>
        <Flex justifyContent={"space-between"} w={"full"} alignItems={"center"}>
          <Box>
            <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight={"bold"}>
              {user?.profile_name}
            </Text>
            <Flex gap={2} alignItems={"center"}>
              <Text
                fontSize={"small"}
                bg={"gray.dark"}
                color={"gray.light"}
                borderRadius={5}
                padding={1}
              >
                @{user?.user_name}
              </Text>
            </Flex>
          </Box>
          <Box>
            <Avatar
              src={user?.profile_pic}
              size={{ base: "md", md: "xl" }}
            ></Avatar>
          </Box>
        </Flex>
        <InputModel
          type="bio"
          onClose={() => onClose("model1")}
          isOpen={isOpen("model1")}
          handAddLinks={handAddLinks}
          setAddLinks={setAddLinks}
        />
        <Flex gap={2}>
          <Text size={{ base: "xs", md: "sm" }}>{user.bio}</Text>

          {user.id == clerk?.id && (
            <Text
              fontSize={"small"}
              bg={"gray.dark"}
              color={"gray"}
              borderRadius={5}
              padding={1}
              onClick={() => onOpen("model1")}
              cursor={"pointer"}
            >
              Edit bio
            </Text>
          )}
        </Flex>

        {uFollowers.length > 0 ? (
          <FollowList
            uFollowers={uFollowers}
            isOpen={isOpen("model2")}
            onClose={() => onClose("model2")}
          />
        ) : null}
        {uFollowing.length > 0 ? (
          <FollowList
            uFollowing={uFollowing}
            isOpen={isOpen("model3")}
            onClose={() => onClose("model3")}
          />
        ) : null}
        <Flex justifyContent={"space-between"} w={"full"}>
          <Flex alignItems={"center"} gap={2}>
            <Text
              color={"gray.light"}
              onClick={() => onOpen("model2")}
              cursor={"pointer"}
              size={{ base: "xs", md: "sm" }}
            >
              {uFollowers?.length} followrs
            </Text>
            <Box w="1" h="1" borderRadius={"full"} bg={"gray.light"}></Box>
            <Text
              color={"gray.light"}
              onClick={() => onOpen("model3")}
              cursor={"pointer"}
              size={{ base: "xs", md: "sm" }}
            >
              {uFollowing?.length} following
            </Text>
          </Flex>
          <Flex>
            {user?.id === clerk?.id ? (
              <Button onClick={() => onOpen("model0")}>Edit profile</Button>
            ) : !isFollowing ? (
              <Button
                size={{ base: "sm", md: "md" }}
                variant="outline"
                onClick={() => handelFollow()}
              >
                Follow
              </Button>
            ) : (
              <Button
                size={{ base: "sm", md: "md" }}
                onClick={() => handelFollow()}
              >
                <Text color={"gray.light"}>Unfollow</Text>
              </Button>
            )}
            <Box className="icone-hover">
              {user.id == clerk?.id ? (
                <Menu>
                  <MenuButton>
                    <BsInstagram size={24} cursor={"pointer"} />
                  </MenuButton>
                  <Portal>
                    <MenuList bg={"gray.light"}>
                      <MenuItem
                        bg={"gray.light"}
                        onClick={() => onOpen("model4")}
                      >
                        Add/edit link{" "}
                      </MenuItem>
                      <a href={user?.insta} target="_blank">
                        <MenuItem bg={"gray.light"}>Go to Instgram </MenuItem>
                      </a>
                    </MenuList>
                  </Portal>
                </Menu>
              ) : (
                <a href={user?.insta} target="_blank">
                  {" "}
                  <BsInstagram size={24} cursor={"pointer"} />
                </a>
              )}
            </Box>
            <Box className="icone-hover">
              <Menu>
                <MenuButton>
                  <CgMoreO size={24} cursor={"pointer"} />
                </MenuButton>
                <Portal>
                  <MenuList bg={"gray.light"}>
                    <MenuItem bg={"gray.light"}> Copy profile link</MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </Box>
          </Flex>
        </Flex>
      </VStack>
      <EditeProfile
        isOpen={isOpen("model0")}
        onClose={() => {
          onClose("model0");
          toast({
            title: `Need to sign out to save changes`,
            status: "info",
            isClosable: true,
          });
        }}
      />
      <InputModel
        type="insta"
        onClose={() => onClose("model4")}
        isOpen={isOpen("model4")}
        setAddLinks={setAddLinks}
        handAddLinks={handAddLinks}
      />
    </>
  );
}

export default UserHeader;
