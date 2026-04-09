import classes from "./SocialMedia.module.css";

interface SocialMediaProps {
  alt: string;
  src: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "reset" | "button";
  className?: string;
}

const SocialMedia = ({
  src,
  alt,
  onClick,
  type,
  className = "",
}: SocialMediaProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${classes["social-media"]} ${className}`}
    >
      <img src={src} alt={alt} />
    </button>
  );
};

export default SocialMedia;
