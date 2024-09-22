import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { useUser } from "@clerk/clerk-react";
import { BsThreeDots } from "react-icons/bs";

const ThreeDotsMenu = ({ onDeletPost, onDeletComment, userID, userName }) => {
  const { user } = useUser();
  const toast = useToast();
  const handelUrlCopy = () => {
    const copyedLink = `http://localhost:5173/${userName}/${userID}`;
    navigator.clipboard.writeText(copyedLink);
    toast({ description: "Linke copyed" });
  };
  return (
    <>
      <Menu isLazy>
        <MenuButton>
          <BsThreeDots size={20} />
        </MenuButton>
        <MenuList>
          {userID == user?.id ? (
            onDeletPost ? (
              <MenuItem onClick={onDeletPost}>Delet post</MenuItem>
            ) : (
              <MenuItem onClick={onDeletComment}>Delet comment</MenuItem>
            )
          ) : (
            <MenuItem onClick={handelUrlCopy}>Copy profile linke</MenuItem>
          )}
        </MenuList>
      </Menu>
    </>
  );
};

export default ThreeDotsMenu;
