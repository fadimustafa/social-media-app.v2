import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../lib/supabase";
import { useToast } from "@chakra-ui/react";

function usePosts(userID) {
  const toast = useToast();
  const { user } = useUser();
  const [posts, setposts] = useState([]);
  const [repPosts, setRepPosts] = useState([]);

  const [userinfo, setUserinfo] = useState([]);
  const [newPost, SetNewPost] = useState({
    postText: "",
    imgFile: null,
  });
  const [loading, setLoading] = useState(false);

  //--------------user page querys------------
  if (userID) {
    useEffect(() => {
      async function getUserInfo(userID) {
        const { data, error } = await supabase
          .from("userinfo")
          .select()
          .eq("id", userID);
        if (error) {
          toast({
            title: `Something went wrong`,
            status: "error",
            isClosable: true,
          });
          return console.error("get user err", error);
        }
        if (data?.length > 0) setUserinfo(data[0]);
      }
      async function getPostForUserPage(userID) {
        const { data, error } = await supabase
          .from("posts")
          .select(`*, userinfo(profile_name, profile_pic)`)
          .eq("user_id", userID);
        if (error) {
          toast({
            title: `Something went wrong!`,
            status: "error",
            isClosable: true,
          });
          return console.error("get-posts", error);
        }
        if (data?.length > 0) {
          setposts(data);
          posts.sort((a, b) => b.id - a.id);
        }
      }
      async function getRepPosts(userID) {
        const { data, error } = await supabase
          .from("comments")
          .select(
            ` post_id,posts (*,userinfo:user_id (profile_name, profile_pic))`
          )
          .eq("user_id", userID);
        if (error) return console.error("err fech replyed posts" + error);
        if (data?.length > 0) {
          const renamedData = data.map((item) => ({
            created_at: item.posts.created_at,
            id: item.post_id,
            desc: item.posts.desc,
            img: item.posts.img,
            user_id: item.posts.user_id,
            userinfo: {
              profile_name: item.posts.userinfo.profile_name,
              profile_pic: item.posts.userinfo.profile_pic,
            },
          }));
          const sortedData = renamedData.sort((a, b) => b.id - a.id);
          setRepPosts(sortedData);
        }
      }
      getUserInfo(userID);
      getPostForUserPage(userID);
      getRepPosts(userID);
    }, []);
  } else {
    //-------------post page query------------
    useEffect(() => {
      async function getPosts() {
        const { data, error } = await supabase
          .from("posts")
          .select(`*, userinfo(profile_name, profile_pic,user_name)`);
        if (error) {
          toast({
            title: `Something went wrongS`,
            status: "error",
            isClosable: true,
          });
          return console.error("Error fetching posts:", error);
        }
        if (data?.length > 0) {
          const sortedData = [...data].sort((a, b) => b.id - a.id);
          setposts((prevPosts) => [...prevPosts, ...sortedData]);
        }
      }
      getPosts();
    }, []);
  }
  //---------------creat post with or with out image----------
  async function uploadImge(file) {
    const fileName = `${uuidv4()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("imgs")
      .upload(fileName, file);
    if (error) {
      toast({
        title: `Image upload filed`,
        status: "error",
        isClosable: true,
      });
      console.error("Error uploading file:", error);
      return null;
    }
    const { data: publicUrlData } = supabase.storage
      .from("imgs")
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  }

  async function createPostWithImg(imageFile) {
    setLoading(true);
    const imageUrl = await uploadImge(imageFile);
    if (!imageUrl) {
      console.error("Image upload failed");
      return;
    }
    const { data, error } = await supabase
      .from("posts")
      .insert({
        user_id: user?.id,
        desc: newPost.postText,
        img: imageUrl,
      })
      .select(`*, userinfo(profile_name, profile_pic)`);
    if (error) {
      toast({
        title: `Upload Filed`,
        status: "error",
        isClosable: true,
      });
    }
    if (data.length > 0) {
      setposts([data[0], ...posts]);
      toast({
        title: `Post has been added`,
        status: "success",
        isClosable: true,
      });
      SetNewPost({ postText: "", imgFile: null });
      setLoading(false);
    }
  }
  async function createPost() {
    setLoading(true);

    const { data, error } = await supabase
      .from("posts")
      .insert({
        user_id: user?.id,
        desc: newPost.postText,
      })
      .select(`*, userinfo(profile_name, profile_pic)`);
    if (error) {
      toast({
        title: `Upload Filed`,
        status: "error",
        isClosable: true,
      });
      return console.log(error);
    }
    if (data.length > 0) {
      setposts([data[0], ...posts]);
      toast({
        title: `Post has been added`,
        status: "success",
        isClosable: true,
      });
      setLoading(false);
    }
  }
  function uploadFunc() {
    if (newPost.imgFile) {
      createPostWithImg(newPost.imgFile);
    } else if (newPost.postText) {
      createPost();
    }
    SetNewPost({ postText: "", imgFile: null });
  }
  //-----------------delet a post------------
  async function deletPost(postId) {
    const { error: comm } = await supabase
      .from("comments")
      .delete()
      .eq("post_id", postId);

    const { error: like } = await supabase
      .from("likes")
      .delete()
      .eq("post_id", postId);

    const { data: deletPost, err: errDeletPost } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId)
      .select();
    if (errDeletPost || like || comm) {
      toast({
        title: `deleting filed, check your intranet`,
        status: "error",
        isClosable: true,
      });
      return console.error("delet post err", errDeletPost);
    }
    if (deletPost.length > 0) {
      toast({
        title: `Post has been Deleted`,
        status: "success",
        isClosable: true,
      });
      setposts(posts.filter((post) => post.id !== postId));
    }
  }

  return {
    posts,
    SetNewPost,
    newPost,
    uploadFunc,
    deletPost,
    userinfo,
    repPosts,
    loading,
  };
}
export default usePosts;
