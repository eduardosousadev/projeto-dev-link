import { SocialProps } from "../../types/types";

export function Social({ url, children, ...props }: SocialProps) {
  return (
    <a
      href={ url }
      rel="noopener noreferrer"
      target="_blank"
      className="duration-500 text-white hover:text-gray-500"
      { ...props }
    >
      { children }
    </a>
  )
}