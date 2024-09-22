import { useUser } from "@clerk/clerk-react";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

export function useFollow(id) {
  const { user } = useUser();
  const toast = useToast();
  const [uFollowers, setUFollowers] = useState([]);
  const [uFollowing, setUFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [addLinks, setAddLinks] = useState({
    bio: "",
    insta: "",
  });

  async function getFollowing() {
    const { data, error } = await supabase
      .from("userfollowing1")
      .select(`following_id,userinfo(profile_name, profile_pic)`)
      .eq("user_id", id);
    if (error) return console.error("get following user err", error);
    if (data && data.length > 0) {
      setUFollowing(data);
    }
  }

  async function getFollowers() {
    const { data, error } = await supabase
      .from("userfollowers")
      .select(`follower_id,userinfo(profile_name, profile_pic,user_name)`)
      .eq("user_id", id);
    if (error) {
      toast({
        title: `Please refresh the page`,
        status: "error",
        isClosable: true,
      });
      return console.error("get followers user err", error);
    }
    if (data?.length > 0) {
      setUFollowers(data);
    }
  }
  useEffect(() => {
    getFollowing();
    getFollowers();
  }, [id]);
  useEffect(() => {
    if (uFollowers.length > 0) {
      const checkFollow = uFollowers.filter(
        (follower) => follower.follower_id === user?.id
      );
      if (checkFollow.length > 0) {
        setIsFollowing(true);
      }
    }
  }, [uFollowers, uFollowing]);

  function handelFollow() {
    async function following() {
      const { data, error } = await supabase
        .from("userfollowing1")
        .insert({
          user_id: user?.id,
          following_id: id,
        })
        .select();
      if (error) return console.error("insert following user err", error);
      if (data?.length > 0) console.log("user has been Followed", data);

      const { data: addData, error: err } = await supabase
        .from("userfollowers")
        .insert({
          user_id: id,
          follower_id: user?.id,
        })
        .select(`follower_id,userinfo(profile_name, profile_pic,user_name)`);
      if (err || error) {
        toast({
          title: `Filed`,
          status: "error",
          isClosable: true,
        });
        return console.error("insert following user err", err);
      }
      if (addData?.length > 0) {
        setUFollowers([addData[0], ...uFollowers.userinfo]);
        setIsFollowing(true);
        toast({
          title: `following success`,
          status: "success",
          isClosable: true,
        });
      }
    }
    async function unFollow() {
      const { data, error } = await supabase
        .from("userfollowing1")
        .delete()
        .eq("following_id", id);

      const { data: an, error: err } = await supabase
        .from("userfollowers")
        .delete()
        .eq("follower_id", user?.id);
      if (err || error) {
        toast({
          title: `filed`,
          status: "error",
          isClosable: true,
        });
        return console.error("unfollow err", err, error);
      } else {
        setIsFollowing(false);
        setUFollowers(
          uFollowers.filter((follower) => follower.follower_id != user?.id)
        );
        toast({
          title: `unfollowed`,
          status: "success",
          isClosable: true,
        });
      }
    }
    if (isFollowing) {
      unFollow();
    } else {
      following();
    }
  }

  async function handAddLinks() {
    var update = {};
    if (addLinks.bio) update.bio = addLinks.bio;
    if (addLinks.insta) update.insta = addLinks.insta;

    const { data: addData, error: err } = await supabase
      .from("userinfo")
      .update(update)
      .eq("id", user?.id)
      .select();
    if (err) return console.error("err add bio", err);
    if (addData.length > 0) window.location.reload();
  }

  return {
    handelFollow,
    uFollowers,
    uFollowing,
    isFollowing,
    handAddLinks,
    setAddLinks,
  };
}
