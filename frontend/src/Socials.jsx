import { Facebook, Email, LinkedIn, Twitter, GitHub } from "./ShareIcons/SocialIcons.jsx";

const mailto = `mailto:jdelbalzo99@gmail.com?subject=${encodeURIComponent("Hey, Joe!")}&body=${encodeURIComponent(
  "Hey, Joe! I'd love to work with you.",
)}`;

const links = [
  { label: "Joe Del Balzo's LinkedIn", href: "https://www.linkedin.com/in/joe-delbalzo/", Icon: LinkedIn },
  { label: "Joe Del Balzo's GitHub", href: "https://www.github.com/joedelbalzo", Icon: GitHub },
  { label: "Joe Del Balzo's Facebook", href: "https://www.facebook.com/joedelbalzo/", Icon: Facebook },
  { label: "Joe Del Balzo's Twitter", href: "https://twitter.com/joedelbalzo", Icon: Twitter },
  { label: "Email Joe Del Balzo", href: mailto, external: false, Icon: Email },
];

const Socials = () => {
  return (
    <div className="share-buttons">
      <div className="share-button-line" />

      {links.map(({ label, href, Icon, external = true }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <Icon />
        </a>
      ))}

      <div className="share-button-line" />
    </div>
  );
};

export default Socials;
