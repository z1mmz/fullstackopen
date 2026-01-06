import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";

import userEvent from "@testing-library/user-event";

test("calls the event handler it received as props with the right details when a new blog is created", async () => {
  const createBlog = vi.fn();
  render(<BlogForm handleBlogSubmit={createBlog} />);
  const test_user = userEvent.setup();

  const inputTitle = screen.getByLabelText("Title:");
  const inputAuthor = screen.getByLabelText("Author:");
  const inputUrl = screen.getByLabelText("Url:");
  const sendButton = screen.getByText("Post");

  await test_user.type(inputTitle, "testing a form...");
  await test_user.type(inputAuthor, "tester");
  await test_user.type(inputUrl, "http://test.com");
  await test_user.click(sendButton);
  console.log("mock", createBlog.mock.calls);
  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing a form...");
  expect(createBlog.mock.calls[0][0].author).toBe("tester");
  expect(createBlog.mock.calls[0][0].url).toBe("http://test.com");
});
