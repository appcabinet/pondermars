import createMDX from "@next/mdx";

const nextConfig = {
  /* config options here */
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ["remarkFrontmatter", "remarkMdxFrontmatter"],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
