import Link from "next/link";
import siteMetadata from "@/data/siteMetadata";
import SocialIcon from "@/components/social-icons";

// To-Do
// const FOOTER_LINKS = [
//   "About",
//   "Terms of Service",
//   "Help improve this page",
// ];

function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon
            kind="mail"
            href={`mailto:${siteMetadata.email}`}
            size={6}
          />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Link href="https://github.com/gbmyt"> Gabriela Taylor</Link>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href={siteMetadata.siteRepo}>{siteMetadata.title}</Link>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          The content of this site is licensed under the MIT License.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
