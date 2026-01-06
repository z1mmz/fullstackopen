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

  const deleteBlogsMutation = useMutation({
    mutationFn: blogService.removeBlog,
    onSuccess: (_data, id) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.filter((blog) => blog.id !== id)
      );
    },
  });

  const likeBlogsMutation = useMutation({
    mutationFn: (blog) => {
      return blogService.updateBlog(blog.id, {
        ...blog,
        likes: blog.likes + 1,
      });
    },
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.map((blog) =>
          blog.id == updatedBlog.id
            ? { ...blog, likes: updatedBlog.likes }
            : blog
        )
      );
    },
  });

  return {
    blogs: blogsQuery.data ?? [],
    createBlog: (blog) => createBlogsMutation.mutate(blog),
    deleteBlog: (id) => deleteBlogsMutation.mutate(id),
    likeBlog: (blog) => likeBlogsMutation.mutate(blog),
  };
};
