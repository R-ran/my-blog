import { remark } from "remark";
import remarkGfm from "remark-gfm";

export interface Heading {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function extractHeadings(markdown: string): Promise<Heading[]> {
  const processor = remark().use(remarkGfm);
  const tree = processor.parse(markdown);
  
  const headings: Heading[] = [];
  
  function getTextFromNode(node: any): string {
    if (node.type === "text") {
      return node.value || "";
    }
    if (node.type === "link" || node.type === "strong" || node.type === "emphasis") {
      if (node.children) {
        return node.children.map(getTextFromNode).join("");
      }
      return "";
    }
    if (node.children) {
      return node.children.map(getTextFromNode).join("");
    }
    return "";
  }

  function traverse(node: any) {
    if (node.type === "heading" && node.depth === 2) {
      const text = getTextFromNode(node).trim();
      
      if (text) {
        headings.push({
          id: slugify(text),
          text: text,
          level: node.depth,
        });
      }
    }
    
    if (node.children) {
      node.children.forEach(traverse);
    }
  }
  
  traverse(tree);
  
  return headings;
}

