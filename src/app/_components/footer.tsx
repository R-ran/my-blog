import Container from "@/app/_components/container";
import { EXAMPLE_PATH } from "@/lib/constants";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            更多详细了解.
          </h3>
          <div className="flex items-center gap-4">
            <a
              href="https://www.xiaohongshu.com" target="_blank" rel="noopener noreferrer">
             <Image
             src="/icons/xhs.svg"
             alt="小红书"
             width={32}
             height={32}
             className="hover:opacity-80 transition-opacity"
             />
            </a>
            <a
              href="https://www.weibo.com" target="_blank" rel="noopener noreferrer">
             <Image
             src="/icons/wb.svg"
             alt="微博"
             width={32}
             height={32}
             className="hover:opacity-80 transition-opacity"
             />
            </a>
            <a
              href="https://www.douyin.com" target="_blank" rel="noopener noreferrer">
             <Image
             src="/icons/dy.svg"
             alt="抖音"
             width={32}
             height={32}
             className="hover:opacity-80 transition-opacity"
             />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
