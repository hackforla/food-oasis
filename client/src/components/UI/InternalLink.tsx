import {
  Link,
  LinkProps,
  SxProps
} from "@mui/material";
import { Link as ReactRouterLink } from "react-router-dom";

interface InternalLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
  onClick?: () => void;
  sx?: SxProps;
}

export default function InternalLink({
  children,
  href,
  onClick,
  sx,
}: InternalLinkProps) {
  return (
    <Link
      to={href}
      component={ReactRouterLink}
      onClick={onClick}
      sx={sx}
    >
      {children}
    </Link>
  );
}
