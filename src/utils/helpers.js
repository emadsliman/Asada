import data from "../data/posts.json";

export const { posts, categories, siteInfo } = data;


export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}


export function parseContent(content) {
  let headingIndex = 0;

  return content
    .split("\n\n")
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("## ")) {
        headingIndex += 1;
        return {
          type: "heading",
          id: `section-${headingIndex}`,
          text: block.replace("## ", ""),
        };
      }
      return { type: "paragraph", text: block };
    });
}
