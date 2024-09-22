import TimeLinePosts from "../components/TimeLinePosts";
import SharingComp from "../components/SharingComp";
import Hader from "../components/Hader.jsx";
import { Flex, Link, Text } from "@chakra-ui/react";
import usePosts from "../hooks/usePosts.js";
import useSearch from "../hooks/useSearch.js";
const PostPage = () => {
  const { posts, SetNewPost, newPost, uploadFunc, deletPost, loading } =
    usePosts();
  const { setSearchQu, filtPosts } = useSearch(posts);

  return (
    <>
      <Hader setSearchQu={setSearchQu} />
      <SharingComp
        SetNewPost={SetNewPost}
        newPost={newPost}
        uploadFunc={() => uploadFunc()}
        loading={loading}
      />

      {filtPosts.length > 0 ? (
        filtPosts.map((post) => (
          <TimeLinePosts post={post} deletPost={deletPost} key={post.id} />
        ))
      ) : filtPosts.length == 0 && posts?.length > 0 ? (
        posts.map((post) => (
          <TimeLinePosts post={post} deletPost={deletPost} key={post.id} />
        ))
      ) : (
        <Flex justifyContent={"center"} my={10}>
          <Text>Loading...</Text>
        </Flex>
      )}
    </>
  );
};

export default PostPage;
