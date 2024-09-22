import { useEffect, useState } from "react";

export default function useSearch(posts) {
  //-------search function---------
  const [searchQu, setSearchQu] = useState("");
  const [filtPosts, setFiltPosts] = useState(posts);
  useEffect(() => {
    if (searchQu.trim() === "") {
      setFiltPosts(posts);
    } else {
      const filtered = posts.filter(
        (post) =>
          post.desc.toLowerCase().includes(searchQu.toLowerCase()) ||
          post.userinfo.profile_name
            .toLowerCase()
            .includes(searchQu.toLowerCase())
      );
      setFiltPosts(filtered);
    }
  }, [searchQu]);
  return { setSearchQu, filtPosts };
}
