import Image from "next/image";
import Link from "next/link";
import { appName } from "@/config/app";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  className?: string;
}

export default function Logo({ href = "/", className }: LogoProps) {
  const content = (
    <>
      <Image
        src="/logo-light.png"
        alt={`${appName} logo`}
        width={70}
        height={70}
        className=" dark:hidden"
        priority
      />
      <Image
        src="/logo-dark.png"
        alt={`${appName} logo`}
        width={70}
        height={70}
        className="hidden  dark:block"
        priority
      />
      <span className="ml-2 text-lg font-semibold tracking-tight text-foreground">
        {appName}
      </span>
    </>
  );

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      {content}
    </Link>
  );
}
