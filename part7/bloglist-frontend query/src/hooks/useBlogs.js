import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";

export const useBlogs = () => {
  const queryClient = useQueryClient();

  const blogsQuery = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    retry: false,
  });

  const createBlogsMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: (newBlog) => {
      console.log("newBlog", newBlog);
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
    },
  });

  return {
    blogs: blogsQuery.data ?? [],
    createBlog: (blog) => createBlogsMutation.mutate(blog),
  };
};
