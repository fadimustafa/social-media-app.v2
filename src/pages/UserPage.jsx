import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import Hader from "../components/Hader";
import SharingComp from "../components/SharingComp";
import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import usePosts from "../hooks/usePosts.js";
import TimeLinePosts from "../components/TimeLinePosts.jsx";
import useSearch from "../hooks/useSearch.js";
import { useUser } from "@clerk/clerk-react";

function UserPage() {
  const { user } = useUser();
  const { id } = useParams();
  const {
    userinfo,
    posts,
    SetNewPost,
    newPost,
    uploadFunc,
    deletPost,
    repPosts,
  } = usePosts(id);
  const { setSearchQu, filtPosts } = useSearch(posts);

  return (
    <>
      <Hader setSearchQu={setSearchQu} />
      <UserHeader user={userinfo} />
      <Tabs isFitted variant="line">
        <TabList mb="1em">
          <Tab>Posts</Tab>
          <Tab>Replays</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {user?.id == id && (
              <SharingComp
                SetNewPost={SetNewPost}
                newPost={newPost}
                uploadFunc={() => uploadFunc()}
              />
            )}

            {filtPosts.length > 0 ? (
              filtPosts.map((post) => (
                <TimeLinePosts
                  post={post}
                  key={post.id}
                  deletPost={deletPost}
                />
              ))
            ) : filtPosts.length == 0 && posts?.length > 0 ? (
              posts.map((post) => (
                <TimeLinePosts
                  post={post}
                  deletPost={deletPost}
                  key={post.id}
                />
              ))
            ) : (
              <Flex justifyContent={"center"} my={10}>
                <Text>No posts yet!</Text>
              </Flex>
            )}
          </TabPanel>
          <TabPanel>
            {repPosts.length > 0 ? (
              repPosts.map((post) => (
                <TimeLinePosts
                  post={post}
                  key={post.id}
                  deletPost={deletPost}
                />
              ))
            ) : (
              <Flex justifyContent={"center"} my={10}>
                <Text>No posts yet!</Text>
              </Flex>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default UserPage;
